import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
// TODO: Cuando el cotizador exista, importar Router
// import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe, Button, AnimateOnScrollModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly translateService = inject(TranslateService);
  // TODO: Inyectar el Router
  // private readonly router = inject(Router);

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Ajuste para el navbar fijo (igual que el que tienes en el Footer/Navbar)
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // TODO: Implementar esta función cuando se lance la página del cotizador
  /*
  goToQuotator(): void {
    this.router.navigate(['/cotizador']);
  }
  */
}
