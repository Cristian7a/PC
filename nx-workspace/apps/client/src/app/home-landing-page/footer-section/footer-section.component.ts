import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SOCIAL_LINKS } from '../../shared/constants/socials.constants';
import { CONTACT_CHANNELS } from '../../shared/constants/contact.constants';

@Component({
  selector: 'app-footer-section',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './footer-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSectionComponent {
  readonly currentYear = new Date().getFullYear();
  readonly socialLinks = SOCIAL_LINKS;
  readonly contactChannels = CONTACT_CHANNELS;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Ajuste para considerar el fixed navbar si existe
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
