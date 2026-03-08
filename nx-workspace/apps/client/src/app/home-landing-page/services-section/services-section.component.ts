import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Service } from '../../api/models/services';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlService } from '../../utils/imageUrl.utils';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-services-section',
  imports: [Card, Button, TranslatePipe, NgOptimizedImage, Tag, Dialog, Divider, CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  readonly services = signal<Service[]>([]);
  readonly imageUrl = inject(ImageUrlService);

  readonly visible = signal<boolean>(false);
  readonly selectedService = signal<Service | null>(null);

  showDialog(service: Service) {
    this.selectedService.set(service);
    this.visible.set(true);
  }

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['services'];
    if (resolvedData) {
      this.services.set(resolvedData);
    }
  }

  ngOnDestroy(): void {
    return;
  }
}
