import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ANGULAR_TEMPLATE_API } from '../../app.config';
import { Observable, of } from 'rxjs';
import { Service } from '../models/services';

@Injectable({
  providedIn: 'root',
})
export class ServicesCustomerService {
  private http = inject(HttpClient);
  private api = inject(ANGULAR_TEMPLATE_API);

  getServices(): Observable<Service[]> {
    const services: Service[] = [
      {
        id: '1',
        name: 'Meseros',
        description:
          'Personal uniformado y capacitado para el servicio de alimentos y bebidas, garantizando una atención cordial y eficiente en todo tipo de celebraciones.',
        image: '/assets/services/meseros.jpg',
        icon: 'pi pi-user',
        price: 0,
        packages: null,
        rating: 4.8,
        features: [
          'Servicio profesional de protocolo',
          'Atención personalizada a invitados',
          'Montaje y desmontaje de mesas',
          'Manejo experto de charolas',
        ],
      },
      {
        id: '2',
        name: 'Lavaloza',
        description:
          'Personal dedicado a mantener la higiene y orden de la vajilla, cristalería y cocina durante el evento, permitiendo un flujo constante en el servicio.',
        image: '/assets/services/lavaloza.jpg',
        icon: 'pi pi-sync',
        price: 0,
        packages: null,
        rating: 4.5,
        features: [
          'Limpieza profunda de loza y plaqué',
          'Organización de equipo de cocina',
          'Higiene garantizada',
          'Personal ágil y discreto',
        ],
      },
      {
        id: '3',
        name: 'Valet Parking',
        description:
          'Servicio de recepción y resguardo de vehículos por conductores profesionales, brindando comodidad y seguridad total a sus invitados desde su llegada.',
        image: '',
        icon: 'pi pi-star',
        price: 0,
        packages: null,
        rating: 4.9,
        features: [
          'Conductores con licencia vigente',
          'Seguro de responsabilidad civil',
          'Control estricto de llaves',
          'Recepción amable y rápida',
        ],
      },
      {
        id: '4',
        name: 'Bartender',
        description:
          'Expertos en coctelería clásica y moderna que preparan bebidas con estilo, rapidez y el balance perfecto de sabores para su barra libre.',
        image: '/assets/services/bartender.jpg',
        icon: 'pi pi-bolt',
        price: 0,
        packages: null,
        rating: 4.7,
        features: [
          'Mixología personalizada',
          'Show de barra opcional',
          'Conocimiento de destilados premium',
          'Servicio de cristalería especializada',
        ],
      },
      {
        id: '5',
        name: 'Mesa de Dulces',
        description:
          'Diseño y montaje de estaciones de confitería, postres y snacks personalizados según la temática de su evento, creando un festín visual y gustativo.',
        image: '/assets/services/mesa-dulces.jpg',
        icon: 'pi pi-gift',
        price: 0,
        packages: null,
        rating: 4.6,
        features: [
          'Decoración temática incluida',
          'Variedad de postres artesanales',
          'Opciones saludables y para niños',
          'Reposteria de alta calidad',
        ],
      },
      {
        id: '6',
        name: 'Decoración',
        description:
          'Alquiler de equipo de alta gama: platos, cubiertos, copas y mantelería fina. Todo lo necesario para un montaje elegante y profesional.',
        image: '/assets/services/decoración.jpg',
        icon: 'pi pi-sparkles',
        price: 0,
        packages: null,
        rating: 4.4,
        features: [
          'Vajilla de porcelana y cerámica',
          'Cristalería de cristal templado',
          'Mantelería en diversos colores',
          'Entrega y recolección a domicilio',
        ],
      },
    ];
    return of(services);
  }
}
