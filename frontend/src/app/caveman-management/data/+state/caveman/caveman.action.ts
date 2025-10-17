import {createAction, props} from '@ngrx/store';

export const loadCavemans = createAction(
  "[Caveman] Load Cavemans"
);
export const loadCavemansSuccess = createAction(
  "[Caveman] Load Cavemans Success",
  props<{ cavemans: any[] }>()
);
export const loadCavemansFailure = createAction(
  "[Caveman] Load Cavemans Failure",
  props<{ error: any }>()
);