import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      console.error('API Error interceptado:', error);

      let errorSummary = 'Error';
      let errorMsg = 'Ha ocurrido un problema inesperado.';

      // Personalización según el código de estado (preparado para tu backend)
      if (error.status === 0) {
        errorSummary = 'Sin conexión';
        errorMsg = 'No pudimos contactar con el servidor. Revisa tu internet.';
      } else if (error.status >= 400 && error.status < 500) {
        errorSummary = 'Aviso';
        // Si tu backend envía un mensaje específico, lo mostramos
        errorMsg = error.error?.message || 'Revisa los datos enviados y vuelve a intentarlo.';
      } else if (error.status >= 500) {
        errorSummary = 'Error del Servidor';
        errorMsg = 'Nuestros servidores están teniendo problemas. Intenta más tarde.';
      }

      // Disparamos el Toast global (con una duración de 5 segundos)
      messageService.add({
        severity: 'error',
        summary: errorSummary,
        detail: errorMsg,
        life: 5000,
      });

      return throwError(() => error);
    }),
  );
};
