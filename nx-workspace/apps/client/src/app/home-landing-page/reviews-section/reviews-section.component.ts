import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- 1. VUELVE A IMPORTAR ESTO
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { Review } from '../../api/models/reviews';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // <-- 2. AGRÉGALO AQUÍ
    TranslatePipe,
    CarouselModule,
    AvatarModule,
    RatingModule,
    TooltipModule,
    GalleriaModule,
    ButtonModule,
    AnimateOnScrollModule,
    AddReviewDialogComponent,
  ],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsSectionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly reviews = signal<Review[]>([]);
  readonly displayGalleria = signal<boolean>(false);
  readonly selectedImages = signal<string[]>([]);

  readonly addReviewVisible = signal<boolean>(false);

  readonly responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['reviews'];
    if (resolvedData) {
      this.reviews.set(resolvedData);
    }
  }

  openGallery(images: string[]): void {
    this.selectedImages.set(images);
    this.displayGalleria.set(true);
  }
}
