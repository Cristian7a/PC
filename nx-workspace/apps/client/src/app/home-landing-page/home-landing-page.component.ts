import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { ReviewsSectionComponent } from './reviews-section/reviews-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';

@Component({
  selector: 'app-home-landing-page',
  imports: [
    ServicesSectionComponent,
    AboutSectionComponent,
    ContactSectionComponent,
    HeroSectionComponent,
    GallerySectionComponent,
    ReviewsSectionComponent,
    FeaturesSectionComponent,
    FooterSectionComponent,
  ],
  templateUrl: './home-landing-page.component.html',
  styleUrl: './home-landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLandingPageComponent {}
