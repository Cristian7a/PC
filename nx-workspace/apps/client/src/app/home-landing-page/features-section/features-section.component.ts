import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [AvatarModule, AnimateOnScrollModule],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesSectionComponent {
  readonly features = [
    {
      title: 'Elegancia',
      description: 'Servicio de etiqueta que eleva el nivel de tu evento.',
      icon: 'pi pi-star',
    },
    {
      title: 'Puntualidad',
      description: 'Llegamos antes para asegurar que todo esté perfecto.',
      icon: 'pi pi-clock',
    },
    {
      title: 'Profesionalismo',
      description: 'Personal altamente capacitado y discreto.',
      icon: 'pi pi-briefcase',
    },
  ];
}
