import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-scroll-navigator',
  standalone: true,
  imports: [Button, CommonModule],
  templateUrl: './scroll-navigator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollNavigatorComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isAtTop = signal(true);
  readonly isPastHero = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY || this.document.documentElement.scrollTop;
      const vh = window.innerHeight;

      this.isAtTop.set(scrollY < 50);
      this.isPastHero.set(scrollY > vh * 0.8);
    }
  }

  handleScrollAction() {
    if (this.isPastHero()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const hero = this.document.getElementById('inicio');
      const nextSection = hero?.nextElementSibling;

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  }
}
