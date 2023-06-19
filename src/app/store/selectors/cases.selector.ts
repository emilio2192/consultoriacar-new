import { createSelector } from "@ngrx/store";

import { AppState } from "../reducers";
import { Case } from "../interfaces/cases.interface";

const selectCasesState = ( state: AppState) => state.cases.cases;

export const selectAllCases = createSelector(
  selectCasesState, 
  state => state
);
