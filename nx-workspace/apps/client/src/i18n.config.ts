import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/i18n/${lang}.json?v=${Date.now()}`);
  }
}

export const createCustomTranslateLoader = (http: HttpClient) => {
  return new CustomTranslateLoader(http);
};
