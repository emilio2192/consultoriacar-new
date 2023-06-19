import {createAction, props} from '@ngrx/store';
import { Case } from '../interfaces/cases.interface';


export const loadedCases = createAction(
  '[Cases] loaded cases',
  props<{cases: Case[]}>()
);