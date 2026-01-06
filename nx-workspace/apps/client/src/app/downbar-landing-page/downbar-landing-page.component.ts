import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { TabsModule } from 'primeng/tabs';
import { DownbarLandingPageMenuComponent } from './downbar-landing-page-menu/downbar-landing-page-menu.component';
import { filter, Subscription } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';

export interface DownbarOption {
  type: 'link' | 'action';
  id: string;
  label: string;
  icon: string;
  fragment?: string;
  action?: 'call' | 'menu';
}

@Component({
  selector: 'app-downbar-landing-page',
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterModule,
    TabsModule,
    DownbarLandingPageMenuComponent,
    RouterModule,
    TooltipModule,
    TranslatePipe,
  ],
  templateUrl: './downbar-landing-page.component.html',
  styleUrl: './downbar-landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownbarLandingPageComponent implements OnInit, OnDestroy {
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private routerSubscription!: Subscription;

  readonly activeTab = signal<string>('/');
  options: DownbarOption[] = [
    {
      type: 'link',
      id: 'home',
      fragment: 'inicio',
      label: this.translateService.instant('pages.home'),
      icon: 'pi pi-home',
    },
    {
      type: 'link',
      id: 'services',
      fragment: 'servicios',
      label: this.translateService.instant('pages.services'),
      icon: 'pi pi-briefcase',
    },
    {
      type: 'action',
      id: 'call',
      action: 'call',
      label: this.translateService.instant('pages.call'),
      icon: 'pi pi-phone',
    },
    {
      type: 'link',
      id: 'gallery',
      fragment: 'galeria',
      label: this.translateService.instant('pages.gallery'),
      icon: 'pi pi-images',
    },
    {
      type: 'action',
      id: 'menu',
      action: 'menu',
      label: this.translateService.instant('pages.menu'),
      icon: 'pi pi-bars',
    },
  ];

  isMenuVisible = false;

  ngOnInit(): void {
    this.updateActiveTabFromUrl();

    this.routerSubscription = this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveTabFromUrl();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onTabClick(option: DownbarOption): void {
    if (option.type === 'action' && option.action === 'menu') {
      this.isMenuVisible = true;
    } else if (option.type === 'link' && option.fragment) {
      this.activeTab.set(option.fragment);
    }
  }

  onMenuVisibilityChange(isVisible: boolean) {
    this.isMenuVisible = isVisible;
  }

  private updateActiveTabFromUrl() {
    const url = this.router.url.split('?')[0];

    const currentRoute = (url ?? '/') === '/' ? '/' : (url ?? '').substring(1);

    this.activeTab.set(currentRoute);
  }
}
