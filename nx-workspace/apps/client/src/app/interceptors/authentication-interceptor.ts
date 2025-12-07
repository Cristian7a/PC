import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { AppSettings } from '../app.settings';
import { selectAuthToken } from '../store/global.selectors';
import { UserRequestService } from '../api/user-request.service';
import { GlobalActions } from '../store/global.actions';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const authToken$ = store.select(selectAuthToken);
  const userRequestService = inject(UserRequestService);

  return authToken$.pipe(
    take(1),
    switchMap((authToken) => {
      const tokenValue = authToken || localStorage.getItem(AppSettings.authTokenLocalStorageKey);
      if (tokenValue) {
        const clonedRequest = getRequestWithAuthorizationHeader(req, tokenValue);
        return next(clonedRequest);
      } else {
        return next(req);
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        // We are handling refresh logic here instead of using the global state to prevent an infinite loop
        const refreshToken = localStorage.getItem(AppSettings.refreshAuthTokenLocalStorageKey);
        const id = localStorage.getItem(AppSettings.idRefreshAuthTokenLocalStorageKey);
        if (refreshToken && id) {
          return userRequestService.refreshToken(refreshToken, id).pipe(
            switchMap(({ token, refreshToken, id }) => {
              const clonedRequest = getRequestWithAuthorizationHeader(req, token);
              store.dispatch(GlobalActions.setAuthToken({ token, refreshToken, id }));
              return next(clonedRequest);
            }),
          );
        }
      }
      return throwError(() => error);
    }),
  );
};

const getRequestWithAuthorizationHeader = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
};
