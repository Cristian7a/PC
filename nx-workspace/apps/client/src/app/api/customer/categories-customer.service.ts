import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesCustomerService {
  getCategories(): Observable<Category[]> {
    const categories: Category[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Boda',
        description: 'Celebraciones nupciales, recepciones y banquetes de matrimonio.',
        icon: 'pi pi-heart',
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        name: 'Convivio',
        description: 'Congresos, fiestas de fin de año y reuniones empresariales.',
        icon: 'pi pi-briefcase',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'XV Años',
        description: 'Fiestas de quinceañeras con temática, montaje y protocolo.',
        icon: 'pi pi-star',
      },
      {
        id: '8f4c1c71-c049-497d-aa76-464a30dbf202',
        name: 'Bautizo / Primera Comunión',
        description: 'Celebraciones religiosas, familiares e íntimas.',
        icon: 'pi pi-home',
      },
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        name: 'Cumpleaños / Aniversario',
        description: 'Fechas exclusivas, aniversarios y veladas de alto nivel.',
        icon: 'pi pi-moon',
      },
      {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'Otro',
        description: 'Cualquier otro tipo de celebración o evento especial.',
        icon: 'pi pi-sparkles',
      },
    ];
    return of(categories);
  }
}
