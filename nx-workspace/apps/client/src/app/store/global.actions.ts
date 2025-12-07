import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GlobalActions = createActionGroup({
  source: 'Global Actions',
  events: {
    'Submit Log In': props<{ email: string; password: string }>(),
    'Log In Success': props<{ token: string; refreshToken: string; id: string }>(),
    'Log In Failure': emptyProps(),
    'Load token from LocalStorage': props<{ token: string; refreshToken: string; id: string }>(),
    'Set Auth Token': props<{
      token: string | undefined;
      refreshToken: string | undefined;
      id: string | undefined;
    }>(),
    'Route To Home': emptyProps(),
    'Route To Login': emptyProps(),
    'Route To Error Page': props<{ error: '401' }>(),
  },
});
