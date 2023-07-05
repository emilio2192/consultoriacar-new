import { 
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  UPDATE
 } from "@ngrx/store";
import {InitialState as AuthState,initialState as initAuth, authReducer }from "./auth.reducer";
import { userReducer, InitialState as UserState, initialState as initUser } from "./user.reducer";
import { caseReducer, InitialState as CaseState, initialState as initCases } from "./case.reducer";

export interface AppState {
  auth: AuthState,
  users: UserState,
  cases: CaseState
}

 export const reducers:ActionReducerMap<AppState> = {
  auth: authReducer,
  users: userReducer,
  cases: caseReducer
 }


 export const resetData = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  
  return  (state, action): AppState => {
    if(action.type === '[Auth Component] clean store'){
      return reducer({
        auth: initAuth,
        users: initUser,
        cases: initCases
      }, action);
    }
    return reducer(state, action);
  }
 }

export const metaReducers: MetaReducer<AppState>[] = [resetData];