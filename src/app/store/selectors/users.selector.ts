import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import { User } from "../interfaces/user.interface";

const selectUsersState = (state: AppState) => state.users.users;


export const selectAllUsers = createSelector(
  selectUsersState, 
  state => state
);

export const selectUserByUid = createSelector(
  selectUsersState, 
  (state: User[], props:{uid:string}) => state.filter((user) => user.uid === props.uid)
);