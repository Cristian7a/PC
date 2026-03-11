import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-contact-section',
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    ButtonModule,
    AnimateOnScrollModule,
  ],
  templateUrl: './contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  contactForm = {
    name: '',
    eventType: '',
    date: '',
    message: '',
  };

  readonly isSubmitting = signal<boolean>(false);

  submitContact() {
    this.isSubmitting.set(true);
    // Aquí irá tu lógica para enviar por WhatsApp o a tu backend
    console.log('Enviando Smart Brief...', this.contactForm);

    setTimeout(() => {
      this.isSubmitting.set(false);
      // Limpiar formulario o mostrar mensaje de éxito
    }, 1500);
  }

  goToDetailedPlanner() {
    // Aquí en el futuro navegarás a tu ruta del cotizador
    console.log('Navegando al Planificador Detallado...');
  }
}
