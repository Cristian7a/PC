export class AppSettings {
  static get authTokenLocalStorageKey() {
    return 'ANGULAR_TEMPLATE_AUTH_TOKEN';
  }

  static get refreshAuthTokenLocalStorageKey() {
    return 'ANGULAR_TEMPLATE_API_REFRESH_AUTH_TOKEN';
  }

  static get idRefreshAuthTokenLocalStorageKey() {
    return 'ANGULAR_TEMPLATE_API_ID_REFRESH_AUTH_TOKEN';
  }
}
