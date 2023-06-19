import { createReducer, on } from "@ngrx/store";
import { saveSessionUid, saveCurrentUser } from "../actions/auth.actions";

export interface InitialState {
  sessionUid: null | string;
  currentUser: null | any
}
export const initialState:InitialState = {
  sessionUid:null,
  currentUser: null
};

export const authReducer = createReducer(
  initialState,
  on(saveSessionUid, (state, {uid}) => ({
    ...state,
    currentUser: state.currentUser,
    sessionUid: uid
  })),
  on(saveCurrentUser, (state, {user}) => ({
    ...state,
    sessionUid: state.sessionUid,
    currentUser: user
  }))
);
