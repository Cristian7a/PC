import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // <-- Importado
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageUrlService } from '../../utils/imageUrl.utils';
import { FullGalleryComponent } from './full-gallery/full-gallery.component';
import { GalleryImage } from '../../api/models/gallery';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    AnimateOnScrollModule,
    ButtonModule,
    GalleriaModule,
    NgOptimizedImage,
    FullGalleryComponent,
  ],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySectionComponent implements OnInit {
  readonly imageUrl = inject(ImageUrlService);
  private readonly route = inject(ActivatedRoute); // <-- Inyectado

  readonly galleriaVisible = signal<boolean>(false);
  readonly activeIndex = signal<number>(0);
  readonly fullGalleryVisible = signal<boolean>(false);

  readonly galleryImages = signal<GalleryImage[]>([]);

  ngOnInit(): void {
    // Al igual que con reviews, atrapamos la data del resolver
    const resolvedData = this.route.snapshot.data['gallery'];
    if (resolvedData) {
      this.galleryImages.set(resolvedData);
    }
  }

  openViewer(index: number): void {
    this.activeIndex.set(index);
    this.galleriaVisible.set(true);
  }
}
