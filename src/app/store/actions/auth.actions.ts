import { createAction, props } from "@ngrx/store";

export const saveSessionUid = createAction(
  '[Auth Component] Save Token',
  props<{uid:string}>()
);

export const saveCurrentUser = createAction(
  '[Auth Component] Save current user',
  props<{user: any}>()
);
