import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';

const selectAuth = (state: AppState) => state.auth;


export const selectCurrentUser = createSelector(
  selectAuth,
  state => state.currentUser
);