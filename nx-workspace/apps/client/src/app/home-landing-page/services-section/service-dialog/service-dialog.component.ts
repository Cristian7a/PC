import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { Divider } from 'primeng/divider';
import { Service } from '../../../api/models/services';
import { ImageUrlService } from '../../../utils/imageUrl.utils';

@Component({
  selector: 'app-service-dialog',
  imports: [CommonModule, TranslatePipe, Dialog, Button, Avatar, Divider],
  templateUrl: './service-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDialogComponent {
  readonly imageUrl = inject(ImageUrlService);

  readonly visible = input.required<boolean>();
  readonly service = input.required<Service | null>();

  readonly closed = output<void>();

  readonly isDialogScrolled = signal<boolean>(false);

  onDialogScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isDialogScrolled.set(target.scrollTop > 30);
  }

  closeDialog(): void {
    this.closed.emit();
  }
}
