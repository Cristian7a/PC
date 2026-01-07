import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-hero-section',
  imports: [Card, TranslatePipe, Avatar, Button],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly translateService = inject(TranslateService);

  heroCards = [
    {
      icon: 'pi pi-trophy',
      title: this.translateService.instant('home.service.title'),
      description: this.translateService.instant('home.service.description'),
    },
    {
      icon: 'pi pi-sparkles',
      title: this.translateService.instant('home.experience.title'),
      description: this.translateService.instant('home.experience.description'),
    },
    {
      icon: 'pi pi-clock',
      title: this.translateService.instant('home.avaliable.title'),
      description: this.translateService.instant('home.avaliable.description'),
    },
  ];
}
