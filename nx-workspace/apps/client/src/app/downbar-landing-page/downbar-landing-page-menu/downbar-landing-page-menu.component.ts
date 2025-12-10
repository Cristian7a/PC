import { Component, ChangeDetectionStrategy, inject, model } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-downbar-landing-page-menu',
  imports: [
    DrawerModule,
    TranslatePipe,
    RouterModule,
    ButtonModule,
    DividerModule,
    CardModule,
    CommonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    TooltipModule,
    NgOptimizedImage,
  ],
  templateUrl: './downbar-landing-page-menu.component.html',
  styleUrl: './downbar-landing-page-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownbarLandingPageMenuComponent {
  private readonly translateService = inject(TranslateService);

  readonly visible = model<boolean>(false);

  options = [
    {
      route: '/',
      label: this.translateService.instant('pages.home'),
      icon: 'pi pi-home',
    },
    {
      route: 'services',
      label: this.translateService.instant('pages.services'),
      icon: 'pi pi-briefcase',
    },
    {
      route: 'reviews',
      label: this.translateService.instant('pages.reviews'),
      icon: 'pi pi-star',
    },
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

  contactOptions = [
    {
      title: this.translateService.instant('menu.contact.fastActions.email.title'),
      content: 'platoycopa.oficial@gmail.com',
      icon: 'pi pi-envelope',
      route: 'mailto:platoycopa.oficial@gmail.com',
    },
    {
      title: this.translateService.instant('menu.contact.fastActions.phone.title'),
      content: '2223780903',
      icon: 'pi pi-phone',
      route: 'tel:2223780903',
    },
    {
      title: this.translateService.instant('menu.contact.fastActions.quoation.title'),
      content: this.translateService.instant('menu.contact.fastActions.quoation.content'),
      icon: 'pi pi-calculator',
      route: '/quotation',
    },
  ];

  socials = [
    {
      label: 'Facebook',
      icon: 'pi pi-facebook',
      link: 'https://www.facebook.com/platoycopa',
    },
    {
      label: 'Instagram',
      icon: 'pi pi-instagram',
      link: 'https://www.instagram.com/platoycopa',
    },
    {
      label: 'Whatsapp',
      icon: 'pi pi-whatsapp',
      link: 'https://twitter.com/platoycopa',
    },
    {
      label: 'Tiktok',
      icon: 'pi pi-tiktok',
      link: 'https://www.tiktok.com/@platoycopa',
    },
  ];

  services = [
    {
      name: 'Meseros',
      icon: 'pi pi-user',
    },
    {
      name: 'Lavaloza',
      icon: 'pi pi-refresh',
    },
    {
      name: 'Valet parking',
      icon: 'pi pi-car',
    },
    {
      name: 'Decoración',
      icon: 'pi pi-palette',
    },
    {
      name: 'Mesa de dulces',
      icon: 'pi pi-gift',
    },
    {
      name: 'Renta de loza',
      icon: 'pi pi-briefcase',
    },
    {
      name: 'Bartender',
      icon: 'pi pi-sort-alt',
    },
  ];

  closeMenu(): void {
    this.visible.set(false);
  }
}
