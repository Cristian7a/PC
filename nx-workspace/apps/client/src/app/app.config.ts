import {
  ApplicationConfig,
  InjectionToken,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { createCustomTranslateLoader } from '../i18n.config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { GlobalEffects } from './store/global.effects';
import { globalReducer } from './store/global.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authenticationInterceptor } from './interceptors/authentication-interceptor';
import { definePreset } from '@primeng/themes';

/**
 * The API path. What comes after the host. E.g. in http://localhost:8080/api/v1, the API path is /api/v1.
 */
export const ANGULAR_TEMPLATE_API = new InjectionToken('ANGULAR_TEMPLATE_API');

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fbf8ed',
      100: '#f5efd3',
      200: '#ebdca8',
      300: '#e2c87d',
      400: '#dab95d',
      500: '#e5c76b',
      600: '#b79f56',
      700: '#897740',
      800: '#5c502b',
      900: '#2e2815',
      950: '#17140b',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      global: globalReducer,
    }),
    provideStoreDevtools({
      logOnly: !isDevMode(),
      name: 'client',
    }),
    provideEffects(GlobalEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: ANGULAR_TEMPLATE_API,
      useValue: '/api/v1',
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: true,
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: createCustomTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
};
