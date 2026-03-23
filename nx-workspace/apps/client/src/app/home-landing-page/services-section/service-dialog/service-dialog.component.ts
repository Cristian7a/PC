import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { Divider } from 'primeng/divider';
import { Service } from '../../../api/models/services';
import { ImageUrlService } from '../../../utils/imageUrl.utils';
// TODO: Importar Router cuando el cotizador exista
// import { Router } from '@angular/router';

@Component({
  selector: 'app-service-dialog',
  imports: [CommonModule, TranslatePipe, Dialog, Button, Avatar, Divider],
  templateUrl: './service-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDialogComponent {
  readonly imageUrl = inject(ImageUrlService);
  // TODO: Inyectar Router
  // private readonly router = inject(Router);

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

  // Lógica actual: Cierra el modal y manda a cotizar
  consultAvailability(): void {
    this.closeDialog();

    // Pequeño delay de 150ms para permitir que la animación de cierre del modal
    // termine antes de hacer el scroll (Mejora la experiencia de usuario)
    setTimeout(() => {
      const element = document.getElementById('contacto');
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }

  // TODO: Función futura para cuando tengas la ruta del cotizador
  /*
  addToQuotation(): void {
    this.closeDialog();
    // Ejemplo: Mandar al cotizador preseleccionando este servicio
    this.router.navigate(['/cotizador'], { queryParams: { service: this.service()?.id } });
  }
  */
}
