import {createReducer, on} from '@ngrx/store';
import * as casesActions from '../actions/cases.actions';
import { Case } from '../interfaces/cases.interface';

export interface InitialState {
  cases: Case[];
}

export const initialState: InitialState = {
  cases:[]
};

export const caseReducer = createReducer(
  initialState, 
  on(casesActions.loadedCases, (state, cases) => ({
    ...state, 
    cases: cases.cases as unknown as Case[]
  }))
);