import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ANGULAR_TEMPLATE_API } from '../app.config';
import { Observable } from 'rxjs';
import { AppRoles } from './models/roles';

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  private readonly http = inject(HttpClient);
  private readonly angularTemplateApi = inject(ANGULAR_TEMPLATE_API);

  getCurrentUser() {
    return this.http.get<{ email: string }>(`${this.angularTemplateApi}/a/whoami`);
  }

  getCurrentUserRole() {
    return this.http.get<{ role: AppRoles }>(`${this.angularTemplateApi}/a/whoami/role`);
  }

  logIn(args: { email: string; password: string }): Observable<{
    token: string;
    refreshToken: string;
    id: string;
  }> {
    const { email, password } = args;
    return this.http.post<{
      token: string;
      refreshToken: string;
      id: string;
    }>(`${this.angularTemplateApi}/auth/login`, { email, password });
  }

  refreshToken(refreshToken: string, id: string) {
    return this.http.post<{
      token: string;
      refreshToken: string;
      id: string;
    }>(`${this.angularTemplateApi}/auth/refresh`, {
      refreshToken,
      id,
    });
  }

  registerUser() {
    throw new Error('Method not implemented.');
  }

  updateUserRole() {
    throw new Error('Method not implemented.');
  }
}
