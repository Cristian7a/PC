import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { ANGULAR_TEMPLATE_API } from '../../app.config';
import { GalleryImage } from '../models/gallery';
import { LazyLoadingPagination } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class GalleryCustomerService {
  private http = inject(HttpClient);
  private api = inject(ANGULAR_TEMPLATE_API);

  // MOCK DATABASE
  private mockDatabase: GalleryImage[] = [
    {
      id: '1',
      url: '/assets/services/meseros.jpg',
      title: 'Servicio de etiqueta',
      category: 'waiters',
      spanClass: 'col-span-2 row-span-2',
    },
    {
      id: '2',
      url: '/assets/services/mesa-dulces.jpg',
      title: 'Mesa de postres',
      category: 'setup',
      spanClass: 'col-span-1 row-span-2',
    },
    {
      id: '3',
      url: '/assets/services/bartender.jpg',
      title: 'Coctelería de autor',
      category: 'drinks',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '4',
      url: '/assets/services/decoración.jpg',
      title: 'Montaje de eventos',
      category: 'setup',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '5',
      url: '/assets/services/renta-loza.jpg',
      title: 'Cristalería fina',
      category: 'setup',
      spanClass: 'col-span-2 row-span-1',
    },
    {
      id: '6',
      url: '/assets/services/lavaloza.jpg',
      title: 'Servicio en cocina',
      category: 'waiters',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '7',
      url: '/assets/services/default.png',
      title: 'Detalle de servicio',
      category: 'corp',
      spanClass: 'col-span-1 row-span-1',
    },
    { id: '8', url: '/assets/services/meseros.jpg', title: 'Atención boda', category: 'weddings' },
    { id: '9', url: '/assets/services/bartender.jpg', title: 'Barra libre', category: 'drinks' },
  ];

  // 1. Obtener destacadas para el Home Landing Page (Sin paginación, solo un array simple)
  getFeaturedImages(): Observable<GalleryImage[]> {
    const featured = this.mockDatabase.filter((img) => img.spanClass);
    return of(featured).pipe(delay(300));
  }

  // 2. Obtener imágenes con Lazy Loading usando tu nueva interfaz genérica
  getImages(
    page: number,
    limit: number,
    category: string,
  ): Observable<LazyLoadingPagination<GalleryImage>> {
    const filtered =
      category === 'all'
        ? this.mockDatabase
        : this.mockDatabase.filter((img) => img.category === category);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    // Utilizamos exactamente la estructura que definiste
    const response: LazyLoadingPagination<GalleryImage> = {
      data: paginatedData,
      total: filtered.length,
      page: page,
      perPage: limit,
      hasMore: endIndex < filtered.length,
    };

    return of(response).pipe(delay(600));
  }
}
