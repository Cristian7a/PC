import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarLandingPageComponent } from '../navbar-landing-page/navbar-landing-page.component';
import { DownbarLandingPageComponent } from '../downbar-landing-page/downbar-landing-page.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, NavbarLandingPageComponent, DownbarLandingPageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
