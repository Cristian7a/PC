import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SkeletonModule } from 'primeng/skeleton';

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

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
export class FullGalleryComponent {
  readonly visible = input.required<boolean>();

  readonly closed = output<void>();

  readonly galleriaVisible = signal<boolean>(false);
  readonly activeIndex = signal<number>(0);

  // ESTADOS DEL SMART NAV
  readonly showFloatingMenu = signal<boolean>(false);
  private lastScrollTop = 0;

  // ESTADOS DE PAGINACIÓN POR LOTES (Batched Infinite Scroll)
  readonly isLoading = signal<boolean>(false);
  readonly currentPage = signal<number>(1);
  readonly hasMoreData = signal<boolean>(true);

  // CONFIGURACIÓN DEL LOTE: Límite inicial 4 (1 inicial + 3 automáticas). Luego sumará de 3 en 3.
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

  // TODO: En producción, este array debería iniciar vacío: images = signal<GalleryItem[]>([])
  // Lo dejo con los datos iniciales para que no veas la galería en blanco antes de conectar tu API
  readonly images = signal<GalleryItem[]>([
    { src: '/assets/services/meseros.jpg', alt: 'Servicio de etiqueta', category: 'waiters' },
    { src: '/assets/services/mesa-dulces.jpg', alt: 'Mesa de postres', category: 'setup' },
    { src: '/assets/services/bartender.jpg', alt: 'Coctelería de autor', category: 'drinks' },
    { src: '/assets/services/decoración.jpg', alt: 'Montaje de eventos', category: 'setup' },
    { src: '/assets/services/renta-loza.jpg', alt: 'Cristalería fina', category: 'setup' },
    { src: '/assets/services/lavaloza.jpg', alt: 'Servicio en cocina', category: 'waiters' },
    { src: '/assets/services/default.png', alt: 'Detalle de servicio', category: 'all' },
  ]);

  readonly filteredImages = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all' ? this.images() : this.images().filter((img) => img.category === cat);
  });

  // DETECTOR DE SCROLL
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const currentScroll = target.scrollTop;

    // 1. Smart Nav Logic
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

    // 2. Infinite Scroll Logic
    if (!this.requireManualLoad() && this.hasMoreData()) {
      if (target.scrollHeight - currentScroll <= target.clientHeight + 300) {
        this.loadMoreImages();
      }
    }
  }

  // EL RESET DEL CICLO: Ocurre al hacer clic en "Explorar más contenido"
  loadMoreManual(): void {
    this.autoLoadLimit.update((limit) => limit + 3);
    this.loadMoreImages();
  }

  // MÉTODO LIMPIO PARA PRODUCCIÓN
  loadMoreImages(): void {
    if (this.isLoading() || !this.hasMoreData()) return;

    this.isLoading.set(true);

    // ESLINT FIX: Agregamos "_" para ignorar la variable hasta que conectes el backend
    const _nextPage = this.currentPage() + 1;

    // TODO: INTEGRACIÓN CON BACKEND (Sustituye este comentario por tu servicio HTTP)
    /*
    this.tuServicioDeGaleria.getImages(_nextPage, this.selectedCategory()).subscribe({
      next: (nuevasFotos: GalleryItem[]) => {
        if (!nuevasFotos || nuevasFotos.length === 0) {
          // Ya no hay más fotos en el backend
          this.hasMoreData.set(false);
        } else {
          // Inyectamos fotos y actualizamos la página
          this.images.update(current => [...current, ...nuevasFotos]);
          this.currentPage.set(_nextPage);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando más imágenes:', error);
        this.isLoading.set(false);
      }
    });
    */

    // Borrar esta línea cuando conectes el backend (está aquí solo para que los Skeletons no se queden cargando infinitamente ahora mismo)
    this.isLoading.set(false);
  }

  // GESTOR DE CAMBIO DE CATEGORÍA LIMPIO
  changeCategory(category: string): void {
    if (this.selectedCategory() === category) return;

    this.selectedCategory.set(category);

    // Reseteamos el paginador
    this.currentPage.set(1);
    this.autoLoadLimit.set(4);
    this.hasMoreData.set(true);

    // Vaciamos las imágenes y prendemos los skeletons
    this.images.set([]);
    this.isLoading.set(true);

    // TODO: INTEGRACIÓN CON BACKEND AL CAMBIAR DE TAB (Sustituye este comentario por tu servicio HTTP)
    /*
    this.tuServicioDeGaleria.getImages(1, this.selectedCategory()).subscribe({
      next: (fotosIniciales: GalleryItem[]) => {
        this.images.set(fotosIniciales);
        
        // Si la categoría no tiene fotos, mostramos el Empty State
        if (!fotosIniciales || fotosIniciales.length === 0) {
           this.hasMoreData.set(false);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando categoría:', error);
        this.isLoading.set(false);
      }
    });
    */

    // Borrar esta línea cuando conectes el backend
    this.isLoading.set(false);
  }

  closeDialog(): void {
    // 1. Reseteamos el estado del menú flotante
    this.showFloatingMenu.set(false);

    // 2. Reseteamos el registro del scroll para que empiece limpio la próxima vez
    this.lastScrollTop = 0;

    // 3. Emitimos el cierre (ahora se llama closed en vez de onClose)
    this.closed.emit();
  }

  openViewer(index: number): void {
    this.activeIndex.set(index);
    this.galleriaVisible.set(true);
  }
}
