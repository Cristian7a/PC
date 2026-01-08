import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarLandingPageComponent } from '../navbar-landing-page/navbar-landing-page.component';
import { DownbarLandingPageComponent } from '../downbar-landing-page/downbar-landing-page.component';
import { FloatingSocialLinksComponent } from '../floating-social-links/floating-social-links.component';
import { ScrollNavigatorComponent } from '../scroll-navigator/scroll-navigator.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    RouterModule,
    NavbarLandingPageComponent,
    DownbarLandingPageComponent,
    FloatingSocialLinksComponent,
    ScrollNavigatorComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
