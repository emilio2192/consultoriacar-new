import {createReducer, on} from '@ngrx/store';
import * as casesActions from '../actions/cases.actions';
import { Case } from '../interfaces/cases.interface';

export interface InitialState {
  clientSelected: string | null;
  statusSelected: boolean;
  cases: Case[];
}

export const initialState: InitialState = {
  clientSelected: null,
  statusSelected: true,
  cases:[]
};

export const caseReducer = createReducer(
  initialState, 
  on(casesActions.loadedCases, (state, cases) => ({
    ...state, 
    cases: cases.cases as unknown as Case[]
  })),
  on(casesActions.setClientSelected, (state, client) => ({
    ...state, 
    clientSelected: client.client
  })),
  on(casesActions.setStatusSelected, (state, status) => ({
    ...state, 
    statusSelected: status.status
  })),
);