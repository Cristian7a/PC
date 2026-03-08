import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { Review } from '../../api/models/reviews';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    CarouselModule,
    FormsModule,
    GalleriaModule,
    RatingModule,
    TooltipModule,
    TranslatePipe,
  ],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsSectionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly reviews = signal<Review[]>([]);
  readonly responsiveOptions = [
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];

  readonly displayGalleria = signal<boolean>(false);
  readonly selectedImages = signal<string[]>([]);
  readonly activeIndex = signal<number>(0);

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['reviews'];
    if (resolvedData) {
      this.reviews.set(resolvedData);
    }
  }

  openGallery(images: string[] | undefined): void {
    if (images && images.length > 0) {
      this.selectedImages.set(images);
      this.activeIndex.set(0);
      this.displayGalleria.set(true);
    }
  }
}
