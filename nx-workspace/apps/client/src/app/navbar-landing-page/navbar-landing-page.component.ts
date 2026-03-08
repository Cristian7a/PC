import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService } from '../services/theme.service';
import { NAV_SECTIONS } from '../shared/constants/navigation.constants';

@Component({
  selector: 'app-navbar-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
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
export class NavbarLandingPageComponent implements AfterViewInit, OnDestroy {
  readonly activeTab = signal<string>('inicio');
  readonly isScrolled = signal<boolean>(false);

  private observer?: IntersectionObserver;
  private themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabs = NAV_SECTIONS;
  isDarkMode = this.themeService.isDarkMode;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollSpy();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupScrollSpy(): void {
    const options = {
      root: null,
      rootMargin: '-25% 0px -70% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeTab.set(entry.target.id);
        }
      });
    }, options);

    this.tabs.forEach((tab) => {
      const element = this.document.getElementById(tab.fragment);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }
}
