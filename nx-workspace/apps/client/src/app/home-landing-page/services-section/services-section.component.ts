import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Service } from '../../api/models/services';
import { ImageUrlService } from '../../utils/imageUrl.utils';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    Avatar,
    Button,
    Card,
    CommonModule,
    Dialog,
    Divider,
    NgOptimizedImage,
    Tag,
    TooltipModule,
    TranslatePipe,
    AnimateOnScrollModule,
  ],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  readonly imageUrl = inject(ImageUrlService);

  readonly services = signal<Service[]>([]);
  readonly visible = signal<boolean>(false);
  readonly selectedService = signal<Service | null>(null);

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['services'];
    if (resolvedData) {
      this.services.set(resolvedData);
    }
  }

  showDialog(service: Service): void {
    this.selectedService.set(service);
    this.visible.set(true);
  }

  ngOnDestroy(): void {
    return;
  }
}
