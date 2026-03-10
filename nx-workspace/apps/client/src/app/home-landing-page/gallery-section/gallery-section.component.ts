import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageUrlService } from '../../utils/imageUrl.utils';
import { FullGalleryComponent } from './full-gallery/full-gallery.component';

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
export class GallerySectionComponent {
  readonly imageUrl = inject(ImageUrlService);

  readonly galleriaVisible = signal<boolean>(false);
  readonly activeIndex = signal<number>(0);

  readonly fullGalleryVisible = signal<boolean>(false);

  // TODO: Esto se obtendrá del servicio, implementar servicio
  readonly galleryImages = [
    {
      src: '/assets/services/meseros.jpg',
      alt: 'Servicio de etiqueta',
      spanClass: 'col-span-2 row-span-2',
    },
    {
      src: '/assets/services/mesa-dulces.jpg',
      alt: 'Mesa de postres',
      spanClass: 'col-span-1 row-span-2',
    },
    {
      src: '/assets/services/bartender.jpg',
      alt: 'Coctelería de autor',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      src: '/assets/services/decoración.jpg',
      alt: 'Montaje de eventos',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      src: '/assets/services/renta-loza.jpg',
      alt: 'Cristalería fina',
      spanClass: 'col-span-2 row-span-1',
    },
    {
      src: '/assets/services/lavaloza.jpg',
      alt: 'Servicio en cocina',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      src: '/assets/services/default.png',
      alt: 'Detalle de servicio',
      spanClass: 'col-span-1 row-span-1',
    },
  ];

  openViewer(index: number): void {
    this.activeIndex.set(index);
    this.galleriaVisible.set(true);
  }
}
