import { createAction, props } from "@ngrx/store";

export const saveSessionUid = createAction(
  '[Auth Component] Save Token',
  props<{uid:string}>()
);

export const saveCurrentUser = createAction(
  '[Auth Component] Save current user',
  props<{user: any}>()
);


export const logOutAction = createAction(
  '[Auth Component] logout'
);


export const cleanStore = createAction(
  '[Auth Component] clean store'
);