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
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Meseros',
        description:
          'Personal uniformado y capacitado para el servicio de alimentos y bebidas, garantizando una atención cordial y eficiente en todo tipo de celebraciones.',
        image: '/assets/services/meseros.jpg',
        icon: 'pi pi-user',
        price: 350,
        packages: null,
        rating: 4.8,
        features: [
          'Atención basada en etiqueta y protocolo',
          'Servicio atento y personalizado a invitados',
          'Coordinación puntual para servicio de brindis',
          'Apoyo logístico en corte y distribución de pastel',
          'Soporte auxiliar en áreas de cocina (Galopina)',
        ],
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Lavaloza',
        description:
          'Personal dedicado a mantener la higiene y orden de la vajilla, cristalería y cocina durante el evento, permitiendo un flujo constante en el servicio.',
        image: '/assets/services/lavaloza.jpg',
        icon: 'pi pi-sync',
        price: 650,
        packages: null,
        rating: 4.5,
        features: [
          'Lavado exclusivo de cristalería, loza y plaqué',
          'Mantenimiento del orden en la zona de servicio',
          'Altos estándares de higiene y cuidado',
          'Flujo de trabajo ágil y discreto',
        ],
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Valet Parking',
        description:
          'Servicio de recepción y resguardo de vehículos por conductores profesionales, brindando comodidad y seguridad total a sus invitados desde su llegada.',
        image: '',
        icon: 'pi pi-star',
        price: 500,
        packages: null,
        rating: 4.9,
        features: [
          'Recepción fluida y cordial de invitados',
          'Resguardo meticuloso de los vehículos',
          'Gestión rigurosa y segura de llaves',
          'Logística eficiente para evitar cuellos de botella',
        ],
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Bartender',
        description:
          'Servicio profesional en barra para la preparación ágil de bebidas y coctelería, asegurando un trato amable y el abastecimiento constante de sus invitados.',
        image: '/assets/services/bartender.jpg',
        icon: 'pi pi-bolt',
        price: 600,
        packages: null,
        rating: 4.7,
        features: [
          'Preparación eficiente de coctelería estándar',
          'Servicio fluido y atención cordial en barra',
          'Manejo organizado y cuidadoso de los insumos',
          'Mantenimiento de limpieza en la estación de bebidas',
        ],
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Mesa de Dulces',
        description:
          'Diseño y montaje de estaciones de confitería, postres y snacks personalizados según la temática de su evento, creando un festín visual y gustativo.',
        image: '/assets/services/mesa-dulces.jpg',
        icon: 'pi pi-gift',
        price: 1500,
        packages: null,
        rating: 4.6,
        features: [
          'Diseño y montaje estético de la estación',
          'Selección cuidada de confitería y snacks',
          'Adaptación visual a la paleta de colores del evento',
          'Distribución simétrica y elegante de los elementos',
        ],
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Decoración',
        description:
          'Servicio de disposición estética y alquiler de equipo: platos, cubiertos, copas y mantelería. Todo lo necesario para una presentación elegante y profesional en sus mesas.',
        image: '/assets/services/decoración.jpg',
        icon: 'pi pi-sparkles',
        price: 1800,
        packages: null,
        rating: 4.4,
        features: [
          'Montaje meticuloso de mesas y estaciones',
          'Disposición elegante de mantelería y detalles',
          'Cuidado en la armonía y estética visual',
          'Logística puntual de entrega y recolección',
        ],
      },
    ];
    return of(services);
  }
}
