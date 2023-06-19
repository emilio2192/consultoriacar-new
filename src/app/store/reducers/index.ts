import { 
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  UPDATE
 } from "@ngrx/store";
import {InitialState as AuthState, authReducer }from "./auth.reducer";
import { userReducer, InitialState as UserState } from "./user.reducer";
import { caseReducer, InitialState as CaseState } from "./case.reducer";

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
    // console.log({type: action.type});
    // if(action.type === INIT || action.type === UPDATE){
    //   const storageValue = await localForage.getItem('state');
    //   console.log({storageValue});
    //   if(storageValue){
    //     try {
    //       console.log({storageValue});
    //       return storageValue as unknown as AppState;
    //     } catch (error) {
    //       localForage.removeItem('state');
    //     }
    //   }
    // }
    // const nextState = reducer(state, action);
    
    // return Promise.resolve(nextState);
    return reducer(state, action);
  }
 }

export const metaReducers: MetaReducer<AppState>[] = [resetData];