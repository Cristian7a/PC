import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SkeletonModule } from 'primeng/skeleton';
import { GalleryCustomerService } from '../../../api/customer/gallery-customer.service';
import { GalleryImage } from '../../../api/models/gallery';
import { LazyLoadingPagination } from '../../../api/models/pagination';

@Component({
  selector: 'app-full-gallery',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    DialogModule,
    ButtonModule,
    GalleriaModule,
    SkeletonModule,
  ],
  templateUrl: './full-gallery.component.html',
  styleUrl: './full-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullGalleryComponent implements OnInit {
  private readonly galleryService = inject(GalleryCustomerService);

  readonly visible = input.required<boolean>();
  readonly closed = output<void>();

  readonly galleriaVisible = signal<boolean>(false);
  readonly activeIndex = signal<number>(0);

  readonly showFloatingMenu = signal<boolean>(false);
  private lastScrollTop = 0;

  readonly isLoading = signal<boolean>(false);
  readonly currentPage = signal<number>(1);
  readonly hasMoreData = signal<boolean>(true);
  readonly autoLoadLimit = signal<number>(4);

  readonly requireManualLoad = computed(() => {
    return this.currentPage() >= this.autoLoadLimit() && this.hasMoreData();
  });

  readonly categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Meseros', value: 'waiters' },
    { label: 'Montajes', value: 'setup' },
    { label: 'Coctelería', value: 'drinks' },
    { label: 'Eventos Corporativos', value: 'corp' },
    { label: 'Bodas', value: 'weddings' },
  ];

  readonly selectedCategory = signal<string>('all');

  readonly images = signal<GalleryImage[]>([]);
  readonly filteredImages = computed(() => this.images());

  ngOnInit(): void {
    this.fetchImages(1, this.selectedCategory(), true);
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const currentScroll = target.scrollTop;

    const threshold = 180;
    if (currentScroll > threshold) {
      if (currentScroll < this.lastScrollTop - 15) {
        this.showFloatingMenu.set(true);
      } else if (currentScroll > this.lastScrollTop + 15) {
        this.showFloatingMenu.set(false);
      }
    } else {
      this.showFloatingMenu.set(false);
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    if (!this.requireManualLoad() && this.hasMoreData()) {
      if (target.scrollHeight - currentScroll <= target.clientHeight + 300) {
        this.loadMoreImages();
      }
    }
  }

  loadMoreManual(): void {
    this.autoLoadLimit.update((limit) => limit + 3);
    this.loadMoreImages();
  }

  loadMoreImages(): void {
    if (this.isLoading() || !this.hasMoreData()) return;
    const nextPage = this.currentPage() + 1;
    this.fetchImages(nextPage, this.selectedCategory(), false);
  }

  changeCategory(category: string): void {
    if (this.selectedCategory() === category) return;

    this.selectedCategory.set(category);
    this.currentPage.set(1);
    this.autoLoadLimit.set(4);
    this.hasMoreData.set(true);
    this.images.set([]);

    this.fetchImages(1, category, true);
  }

  private fetchImages(page: number, category: string, isInitialLoad: boolean): void {
    this.isLoading.set(true);

    this.galleryService.getImages(page, 6, category).subscribe({
      // TIPADO FUERTE: TypeScript ahora sabe que 'response' es LazyLoadingPagination<GalleryImage>
      next: (response: LazyLoadingPagination<GalleryImage>) => {
        if (isInitialLoad) {
          this.images.set(response.data);
        } else {
          this.images.update((current) => [...current, ...response.data]);
        }

        this.currentPage.set(response.page);
        this.hasMoreData.set(response.hasMore);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching gallery:', error);
        this.isLoading.set(false);
      },
    });
  }

  closeDialog(): void {
    this.showFloatingMenu.set(false);
    this.lastScrollTop = 0;
    this.closed.emit();
  }

  openViewer(index: number): void {
    this.activeIndex.set(index);
    this.galleriaVisible.set(true);
  }
}
