import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { ContactFormDTO } from 'packages/validation';

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class ContactCustomerService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  private readonly WEB3FORMS_KEY = 'ff64c9f6-2729-4fad-a03e-d9754be8535a';
  private readonly WHATSAPP_NUMBER = '522223780903';

  /**
   * Procesa el envío del formulario:
   * 1. Envía respaldo a Web3Forms.
   * 2. Retorna la URL de WhatsApp lista para abrir.
   */
  processContactForm(data: ContactFormDTO): Observable<Web3FormsResponse> {
    const formattedDate =
      data.date instanceof Date
        ? data.date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'N/A';

    const categoryName = data.category?.name || data.category || 'No especificada';

    const backupPayload = {
      access_key: this.WEB3FORMS_KEY,
      name: data.name,
      event_date: formattedDate,
      category: categoryName,
      message: data.message,
      from_site: 'Plato y Copa',
    };

    // Primero aseguramos el backup y luego permitimos al componente redirigir
    return this.http
      .post<Web3FormsResponse>('https://api.web3forms.com/submit', backupPayload)
      .pipe(
        tap(() => {
          // Al terminar con éxito (o error, manejado en el componente),
          // ya tenemos los datos seguros en el correo.
        }),
      );
  }

  /**
   * Construye la URL de WhatsApp con el mensaje formateado
   */
  generateWhatsAppUrl(data: ContactFormDTO): string {
    const formattedDate =
      data.date instanceof Date
        ? data.date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'N/A';

    const intro = this.translate.instant('contact.whatsapp.intro');
    const lName = this.translate.instant('contact.whatsapp.label_name');
    const lDate = this.translate.instant('contact.whatsapp.label_date');
    const lEvent = this.translate.instant('contact.whatsapp.label_event');
    const lDetails = this.translate.instant('contact.whatsapp.label_details');
    const footer = this.translate.instant('contact.whatsapp.footer');

    const whatsappText = `${intro}\n\n${lName} ${data.name}\n${lDate} ${formattedDate}\n${lEvent} ${data.category}\n${lDetails} ${data.message}\n\n${footer}`;

    return `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
  }
}
