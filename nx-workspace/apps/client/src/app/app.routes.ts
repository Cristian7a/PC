import { Route } from '@angular/router';
import { authenticatedGuard, unauthenticatedGuard } from './guards/authenticated.guard';

export const APP_ROUTES = {
  landingPage: {
    root: '',
  },
  login: 'login',
  home: 'home',
  errorPage: 'error',
};

export const appRoutes: Route[] = [
  {
    path: APP_ROUTES.landingPage.root,
    loadComponent: () =>
      import('./landing-page/landing-page.component').then((c) => c.LandingPageComponent),
  },
  /*
  {
    path: APP_ROUTES.login,
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
    canActivate: [unauthenticatedGuard],
  },
  {
    path: APP_ROUTES.home,
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
    canActivate: [authenticatedGuard],
  },
  {
    path: `${APP_ROUTES.errorPage}/:errorCode`,
    loadComponent: () =>
      import('./router-error/router-error-wrapper.component').then(
        (c) => c.RouterErrorWrapperComponent,
      ),
  },*/
  { path: '', redirectTo: APP_ROUTES.home, pathMatch: 'full' },
  { path: '**', redirectTo: `${APP_ROUTES.errorPage}/404` },
];
