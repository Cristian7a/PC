import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

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
  private readonly translateService = inject(TranslateService);
  tabs = [
    { route: '/', label: this.translateService.instant('pages.home'), icon: 'pi pi-home' },
    {
      route: 'services',
      label: this.translateService.instant('pages.services'),
      icon: 'pi pi-briefcase',
    },
    { route: 'reviews', label: this.translateService.instant('pages.reviews'), icon: 'pi pi-star' },
    {
      route: 'gallery',
      label: this.translateService.instant('pages.gallery'),
      icon: 'pi pi-images',
    },
    {
      route: 'about',
      label: this.translateService.instant('pages.about'),
      icon: 'pi pi-info-circle',
    },
    {
      route: 'contact',
      label: this.translateService.instant('pages.contact'),
      icon: 'pi pi-envelope',
    },
  ];

  ngOnInit(): void {
    console.log('Componente iniciado');
  }

  ngOnDestroy(): void {
    console.log('Componente destruido');
  }
}
