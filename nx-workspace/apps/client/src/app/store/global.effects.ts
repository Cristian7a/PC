import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GlobalActions } from './global.actions';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { UserRequestService } from '../api/user-request.service';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
import { APP_ROUTES } from '../app.routes';

@Injectable()
export class GlobalEffects {
  private readonly actions$ = inject(Actions);
  private readonly userRequestService = inject(UserRequestService);
  private readonly router = inject(Router);

  tryLogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.submitLogIn),
      filter(({ email, password }) => !!email && !!password),
      exhaustMap(({ email, password }) =>
        this.userRequestService.logIn({ email, password }).pipe(
          map(({ token, refreshToken, id }) =>
            GlobalActions.logInSuccess({ token, refreshToken, id }),
          ),
          catchError(() => of(GlobalActions.logInFailure())),
        ),
      ),
    ),
  );

  authTokenSetFunnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.logInSuccess, GlobalActions.loadTokenFromLocalStorage),
      map(({ token, refreshToken, id }) => GlobalActions.setAuthToken({ token, refreshToken, id })),
    ),
  );

  authTokenSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.setAuthToken),
      map(({ token, refreshToken, id }) => {
        if (token && refreshToken && id) {
          // Here we are forcing to have token, refreshToken and id defined to be able to navigate
          localStorage.setItem(AppSettings.authTokenLocalStorageKey, token);
          localStorage.setItem(AppSettings.refreshAuthTokenLocalStorageKey, refreshToken);
          localStorage.setItem(AppSettings.idRefreshAuthTokenLocalStorageKey, id);
          return GlobalActions.routeToHome();
        } else {
          localStorage.removeItem(AppSettings.authTokenLocalStorageKey);
          localStorage.removeItem(AppSettings.refreshAuthTokenLocalStorageKey);
          localStorage.removeItem(AppSettings.idRefreshAuthTokenLocalStorageKey);
          return GlobalActions.routeToLogin();
        }
      }),
    ),
  );

  routeToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GlobalActions.routeToHome),
        tap(() => {
          if (this.router.url.indexOf('/login') !== -1) {
            this.router.navigate([`/${APP_ROUTES.home}`]);
          }
        }),
      ),
    { dispatch: false },
  );

  routeToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GlobalActions.routeToLogin),
        tap(() => {
          this.router.navigate([`/${APP_ROUTES.login}`]);
        }),
      ),
    { dispatch: false },
  );

  routeToErrorPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GlobalActions.routeToErrorPage),
        tap(({ error }) => {
          this.router.navigate([`/${APP_ROUTES.errorPage}`, error]);
        }),
      ),
    { dispatch: false },
  );
}
