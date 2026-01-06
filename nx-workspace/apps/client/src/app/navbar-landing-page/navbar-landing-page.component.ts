import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar-landing-page',
  imports: [
    ToolbarModule,
    TabsModule,
    ButtonModule,
    NgOptimizedImage,
    RouterModule,
    TranslatePipe,
    TooltipModule,
  ],
  templateUrl: './navbar-landing-page.component.html',
  styleUrl: './navbar-landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLandingPageComponent implements OnInit, OnDestroy {
  readonly activeTab = signal<string>('inicio');
  readonly isDarkMode = signal<boolean>(false);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly translateService = inject(TranslateService);

  tabs = [
    { fragment: 'inicio', label: this.translateService.instant('pages.home'), icon: 'pi pi-home' },
    {
      fragment: 'servicios',
      label: this.translateService.instant('pages.services'),
      icon: 'pi pi-briefcase',
    },
    {
      fragment: 'reseñas',
      label: this.translateService.instant('pages.reviews'),
      icon: 'pi pi-star',
    },
    {
      fragment: 'galería',
      label: this.translateService.instant('pages.gallery'),
      icon: 'pi pi-images',
    },
    {
      fragment: 'nosotros',
      label: this.translateService.instant('pages.about'),
      icon: 'pi pi-info-circle',
    },
    {
      fragment: 'contacto',
      label: this.translateService.instant('pages.contact'),
      icon: 'pi pi-envelope',
    },
  ];

  ngOnInit(): void {
    const html = this.document.documentElement;

    this.isDarkMode.set(html.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      this.isDarkMode.set(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      this.activeTab.set(fragment || 'inicio');
    });
  }

  toggleTheme(): void {
    const html = this.document.documentElement;
    // toggle devuelve true si añadió la clase, false si la quitó
    const isDark = html.classList.toggle('dark');

    this.isDarkMode.set(isDark);
    localStorage.setItem('user-theme', isDark ? 'dark' : 'light');
  }

  ngOnDestroy(): void {
    // Limpieza si es necesaria
    console.log('componente destruido');
  }
}
