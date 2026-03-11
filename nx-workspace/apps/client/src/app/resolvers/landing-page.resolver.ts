import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, Observable, of, catchError } from 'rxjs';
import { ServicesCustomerService } from '../api/customer/services-customer.service';
import { ReviewsCustomerService } from '../api/customer/reviews-customer.service';
import { GalleryCustomerService } from '../api/customer/gallery-customer.service'; // <-- Importado
import { Service } from '../api/models/services';
import { Review } from '../api/models/reviews';
import { GalleryImage } from '../api/models/gallery'; // <-- Importado

export const servicesCustomerResolver: ResolveFn<Service[] | null> = (
  route: ActivatedRouteSnapshot,
): Observable<Service[] | null> => {
  const servicesCustomerService = inject(ServicesCustomerService);
  return servicesCustomerService.getServices().pipe(
    map((services) => services),
    catchError((error) => {
      console.error('Failed to load services:', error);
      return of(null);
    }),
  );
};

export const reviewsCustomerResolver: ResolveFn<Review[] | null> = (
  route: ActivatedRouteSnapshot,
): Observable<Review[] | null> => {
  const reviewsCustomerService = inject(ReviewsCustomerService);
  return reviewsCustomerService.getReviews().pipe(
    map((reviews) => reviews),
    catchError((error) => {
      console.error('Failed to load reviews:', error);
      return of(null);
    }),
  );
};

export const galleryCustomerResolver: ResolveFn<GalleryImage[] | null> = (
  route: ActivatedRouteSnapshot,
): Observable<GalleryImage[] | null> => {
  const galleryCustomerService = inject(GalleryCustomerService);
  return galleryCustomerService.getFeaturedImages().pipe(
    map((images) => images),
    catchError((error) => {
      console.error('Failed to load gallery:', error);
      return of(null);
    }),
  );
};
