import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [AvatarModule, AnimateOnScrollModule, TranslatePipe],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesSectionComponent {
  readonly features = [
    {
      titleKey: 'features.elegance.title',
      descriptionKey: 'features.elegance.description',
      icon: 'pi pi-star',
    },
    {
      titleKey: 'features.punctuality.title',
      descriptionKey: 'features.punctuality.description',
      icon: 'pi pi-clock',
    },
    {
      titleKey: 'features.professionalism.title',
      descriptionKey: 'features.professionalism.description',
      icon: 'pi pi-briefcase',
    },
  ];
}
