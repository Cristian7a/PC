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
    //5 mejores
    {
      id: '1',
      url: '/assets/Images/Meseros/10.jpeg',
      title: 'Evento 20 de Julio, 2025',
      category: 'Boda',
      spanClass: 'col-span-2 row-span-2',
    },
    {
      id: '2',
      url: '/assets/Images/Meseros/12.jpeg',
      title: 'Evento 28 de Junio, 2025',
      category: 'XV Años',
      spanClass: 'col-span-1 row-span-2',
    },
    {
      id: '3',
      url: '/assets/Images/Meseros/5.jpeg',
      title: 'Evento 22 de Diciembre, 2025',
      category: 'Boda',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '4',
      url: '/assets/Images/Meseros/7.jpeg',
      title: 'Evento 1 del 26 de Julio, 2025',
      category: 'Graduación',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '5',
      url: '/assets/Images/Meseros/4.jpeg',
      title: 'Evento 20 de Diciembre, 2025',
      category: 'Boda',
      spanClass: 'col-span-2 row-span-1',
    },
    {
      id: '6',
      url: '/assets/Images/Meseros/11.jpeg',
      title: 'Evento 5 de Julio, 2025',
      category: 'Bautizo / Primera Comunión',
      spanClass: 'col-span-1 row-span-1',
    },
    {
      id: '7',
      url: '/assets/Images/Meseros/13.jpeg',
      title: 'Evento 28 de Junio, 2025',
      category: 'XV Años',
      spanClass: 'col-span-1 row-span-1',
    },

    // Meseros
    {
      id: '8',
      url: '/assets/Images/Meseros/1.jpeg',
      title: 'Evento 21 de Junio, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '9',
      url: '/assets/Images/Meseros/2.jpeg',
      title: 'Evento 18 de Mayo, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '10',
      url: '/assets/Images/Meseros/3.jpeg',
      title: 'Evento 19 de Diciembre, 2025',
      category: 'Convivio',
    },
    {
      id: '11',
      url: '/assets/Images/Meseros/6.jpeg',
      title: 'Evento 20 de Diciembre, 2025',
      category: 'Boda',
    },
    {
      id: '12',
      url: '/assets/Images/Meseros/8.jpeg',
      title: 'Evento 2 del 26 de Julio, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '13',
      url: '/assets/Images/Meseros/9.jpeg',
      title: 'Evento 2 del 26 de Julio, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '14',
      url: '/assets/Images/Meseros/14.jpeg',
      title: 'Evento 28 de Junio, 2025',
      category: 'XV Años',
    },
    {
      id: '15',
      url: '/assets/Images/Meseros/15.jpeg',
      title: 'Evento 28 de Junio, 2025',
      category: 'XV Años',
    },
    {
      id: '16',
      url: '/assets/Images/Meseros/16.jpeg',
      title: 'Evento 20 de Septiembre, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '17',
      url: '/assets/Images/Meseros/17.jpeg',
      title: 'Evento 20 de Septiembre, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '18',
      url: '/assets/Images/Meseros/18.jpeg',
      title: 'Evento 20 de Septiembre, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '19',
      url: '/assets/Images/Meseros/19.jpeg',
      title: 'Evento 20 de Septiembre, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '20',
      url: '/assets/Images/Meseros/20.jpeg',
      title: 'Evento 20 de Septiembre, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '21',
      url: '/assets/Images/Meseros/21.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },

    // Decoración
    {
      id: '22',
      url: '/assets/Images/Decoracion/1.jpeg',
      title: 'Evento 21 de Junio, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '23',
      url: '/assets/Images/Decoracion/2.jpeg',
      title: 'Evento 21 de Junio, 2025',
      category: 'Bautizo / Primera Comunión',
    },

    //Eventos
    {
      id: '24',
      url: '/assets/Images/Eventos/1.jpeg',
      title: 'Evento 28 de Junio, 2025',
      category: 'XV Años',
    },
    {
      id: '25',
      url: '/assets/Images/Eventos/2.jpeg',
      title: 'Evento 20 de Diciembre, 2025',
      category: 'Boda',
    },
    {
      id: '26',
      url: '/assets/Images/Eventos/3.jpeg',
      title: 'Evento 19 de Diciembre, 2025',
      category: 'Convivio',
    },
    {
      id: '27',
      url: '/assets/Images/Eventos/4.jpeg',
      title: 'Evento 12 de Diciembre, 2025',
      category: 'Otro',
    },
    {
      id: '28',
      url: '/assets/Images/Eventos/5.jpeg',
      title: 'Evento 19 de Diciembre, 2025',
      category: 'Convivio',
    },
    {
      id: '29',
      url: '/assets/Images/Eventos/6.jpeg',
      title: 'Evento 12 de Diciembre, 2025',
      category: 'Otro',
    },
    {
      id: '30',
      url: '/assets/Images/Eventos/7.jpeg',
      title: 'Evento 6 de Diciembre, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '31',
      url: '/assets/Images/Eventos/8.jpeg',
      title: 'Evento 6 de Diciembre, 2025',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '32',
      url: '/assets/Images/Eventos/9.jpeg',
      title: 'Evento 1 del 26 de Julio, 2025',
      category: 'Graduación',
    },
    {
      id: '33',
      url: '/assets/Images/Eventos/10.jpeg',
      title: 'Evento 29 de Junio, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '34',
      url: '/assets/Images/Eventos/11.jpeg',
      title: 'Evento 29 de Junio, 2025',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '35',
      url: '/assets/Images/Eventos/12.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '36',
      url: '/assets/Images/Eventos/13.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '37',
      url: '/assets/Images/Eventos/14.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '38',
      url: '/assets/Images/Eventos/15.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },

    //Galopina
    {
      id: '39',
      url: '/assets/Images/Galopina/1.jpeg',
      title: 'Evento 7 de Marzo, 2026',
      category: 'Bautizo / Primera Comunión',
    },
    {
      id: '40',
      url: '/assets/Images/Galopina/2.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },
    {
      id: '41',
      url: '/assets/Images/Galopina/3.jpeg',
      title: 'Evento 21 de Marzo, 2026',
      category: 'Cumpleaños / Aniversario',
    },

    //Lavaloza
    {
      id: '42',
      url: '/assets/Images/Lavaloza/1.jpeg',
      title: 'Evento 7 de Marzo, 2026',
      category: 'Bautizo / Primera Comunión',
    },
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
