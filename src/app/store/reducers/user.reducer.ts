import { createReducer, on } from "@ngrx/store";
import * as userActions from '../actions/users.actions';
import {User} from '../interfaces/user.interface';


export interface InitialState {
  users: User[];
}

export const initialState: InitialState = {
  users: []
}

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsers, state => state),
  on(userActions.successUsersLoaded, (state, users) => ({
    ...state,
    users: users.users as unknown as User[]
  }))
);