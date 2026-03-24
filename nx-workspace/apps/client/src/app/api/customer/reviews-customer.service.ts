import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ANGULAR_TEMPLATE_API } from '../../app.config';
import { Observable, of, delay } from 'rxjs';
import { Review } from '../models/reviews';
import { CreateReviewDto } from 'packages/validation';

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
        author: 'Mariana & José (Boda)',
        comment:
          'El servicio fue excepcional. Los meseros estuvieron siempre atentos a las copas de los invitados y con una presentación impecable. El montaje del evento lució bellísimo. ¡Hicieron de nuestra boda de diciembre un éxito total!',
        rating: 5,
        images: [
          '/assets/Images/Meseros/4.jpeg',
          '/assets/Images/Meseros/6.jpeg',
          '/assets/Images/Eventos/2.jpeg',
        ],
      },
      {
        id: 2,
        author: 'Familia Sánchez (XV Años)',
        comment:
          'Excelente actitud de servicio para los XV años de nuestra hija. Montaron la cristalería rapidísimo, se encargaron de toda la logística de las bebidas y los meseros fueron súper amables. Nosotros solo nos dedicamos a disfrutar de la fiesta.',
        rating: 5,
        images: ['/assets/Images/Meseros/12.jpeg', '/assets/Images/Eventos/1.jpeg'],
      },
      {
        id: 3,
        author: 'Roberto F. (Convivio)',
        comment:
          'Contratamos el equipo para la posada de fin de año de la empresa. El servicio de los platillos fluyó a tiempo y el personal demostró mucha experiencia. Sin duda los volvemos a llamar para el próximo año.',
        rating: 4,
        images: [],
      },
      {
        id: 4,
        author: 'Elena G. (Bautizo)',
        comment:
          'Todo fluyó de maravilla en el bautizo de mi hijo. Muy puntuales, la decoración quedó hermosa y los meseros amables y respetuosos en todo momento. Los volvería a contratar sin dudarlo.',
        rating: 5,
        images: ['/assets/Images/Meseros/1.jpeg', '/assets/Images/Decoracion/1.jpeg'],
      },
      {
        id: 5,
        author: 'Carlos M. (Cumpleaños)',
        comment:
          'Celebramos un cumpleaños muy especial y el servicio le dio un toque muy elegante a la cena privada. La barra libre estuvo espectacular y la atención fue de primer nivel de principio a fin.',
        rating: 5,
        images: [],
      },
    ];

    return of(reviews);
  }

  createReview(payload: CreateReviewDto): Observable<{ success: boolean; message: string }> {
    console.log(
      '🌐 Servicio [ReviewsCustomerService]: Enviando payload al Backend simulado...',
      payload,
    );

    return of({
      success: true,
      message: '¡Su memoria ha sido guardada con éxito!',
    }).pipe(delay(1500));
  }
}
