import {createAction, props} from '@ngrx/store';
import { Case } from '../interfaces/cases.interface';


export const loadedCases = createAction(
  '[Cases] loaded cases',
  props<{cases: Case[]}>()
);

export const setClientSelected = createAction(
  '[Cases] set client',
  props<{client:string}>()
);

export const setStatusSelected = createAction(
  '[Cases] set status selected',
  props<{status:boolean}>()
);