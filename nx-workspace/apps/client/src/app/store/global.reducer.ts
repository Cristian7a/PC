import { createReducer, on } from '@ngrx/store';
import { GlobalActions } from './global.actions';
import { GlobalState, initialState } from './global.state';

export const globalReducer = createReducer(
  initialState,
  on(
    GlobalActions.setAuthToken,
    (state, { token }): GlobalState => ({
      ...state,
      authToken: token,
    }),
  ),
);
