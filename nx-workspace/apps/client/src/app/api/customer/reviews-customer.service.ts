import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ANGULAR_TEMPLATE_API } from '../../app.config';
import { Observable, of } from 'rxjs';
import { Review } from '../models/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewsCustomerService {
  private http = inject(HttpClient);
  private api = inject(ANGULAR_TEMPLATE_API);

  getReviews(): Observable<Review[]> {
    const reviews: Review[] = [
      {
        id: 1,
        author: 'Mariana L.',
        comment:
          'El servicio fue excepcional. Los meseros estuvieron siempre atentos a las copas de los invitados y con una presentación impecable. ¡Hicieron de nuestra boda un éxito!',
        rating: 5,
        images: [
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200',
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
        ],
      },
      {
        id: 2,
        author: 'Roberto F.',
        comment:
          'Contratamos el equipo para una cena de fin de año. El servicio de los platillos fluyó a tiempo y el personal demostró mucha experiencia.',
        rating: 4,
        images: ['https://images.unsplash.com/photo-1414235077428-338988a2e8c0?q=80&w=1200'],
      },
      {
        id: 3,
        author: 'Elena G.',
        comment:
          'Todo fluyó de maravilla. Se encargaron de toda la logística de las bebidas y el montaje, nosotros solo nos dedicamos a disfrutar de la fiesta.',
        rating: 5,
        images: [],
      },
      {
        id: 4,
        author: 'Familia Sánchez',
        comment:
          'Excelente actitud de servicio. Montaron la cristalería rapidísimo y al final dejaron el área de cocina impecable.',
        rating: 5,
        images: [
          'https://images.unsplash.com/photo-1572655513511-2eb26d246c4f?q=80&w=1200',
          'https://images.unsplash.com/photo-1578362688005-4f7fdf0f40d3?q=80&w=1200',
          'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200',
        ],
      },
    ];
    return of(reviews);
  }
}
