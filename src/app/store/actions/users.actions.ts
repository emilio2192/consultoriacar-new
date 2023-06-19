import { createAction, props } from "@ngrx/store";
import {User} from '../interfaces/user.interface';
export const loadUsers = createAction(
  '[Users] load users'  
);

export const successUsersLoaded = createAction(
  '[Users] loaded users',
  props<{users: User[]}>()
);
