import { createSelector } from "@ngrx/store";

import { AppState } from "../reducers";
import { Case } from "../interfaces/cases.interface";

const selectCasesState = ( state: AppState) => state;

export const selectAllCases = createSelector(
  selectCasesState, 
  state => state.cases.cases
);

export const selectStatusSelected = createSelector(
  selectCasesState, 
  state => state.cases.statusSelected
);

export const selectClientSelected = createSelector(
  selectCasesState, 
  state => state.cases.clientSelected
);

