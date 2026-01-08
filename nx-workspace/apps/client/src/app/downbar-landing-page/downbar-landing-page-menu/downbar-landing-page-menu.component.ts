import { Component, ChangeDetectionStrategy, inject, model, input } from '@angular/core';
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
import { NAV_SECTIONS } from '../../shared/constants/navigation.constants';
import { SOCIAL_LINKS } from '../../shared/constants/socials.constants';
import { CONTACT_CHANNELS } from '../../shared/constants/contact.constants';

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
  readonly activeFragment = input<string>('inicio');
  readonly options = NAV_SECTIONS;
  readonly socials = SOCIAL_LINKS;
  readonly contactChannels = CONTACT_CHANNELS;

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
