import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, Observable, of, catchError } from 'rxjs';
import { ServicesCustomerService } from '../api/customer/services-customer.service';
import { Service } from '../api/models/services';

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
