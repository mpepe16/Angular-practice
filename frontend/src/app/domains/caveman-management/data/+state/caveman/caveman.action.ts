import {createAction, props} from '@ngrx/store';
import { Caveman, CreateCavemanDto, UpdateCavemanDto } from "../../entities/caveman";

// Load Cavemen

export const loadCavemen = createAction(
  '[Caveman] Load Cavemen',
  props<{ userId: string }>() 
);

export const loadCavemenSuccess = createAction(
  '[Caveman] Load Cavemen Success',
  props<{ cavemen: Caveman[] }>()
);


export const loadCavemenFailure = createAction(
  '[Caveman] Load Cavemen Failure',
  props<{ error: any }>()
);

// Create Caveman

export const createCaveman = createAction(
  '[Caveman] Create Caveman',
  props<{ userId: string, caveman: CreateCavemanDto  }>() 
);
export const createCavemanSuccess = createAction(
  '[Caveman] Create Caveman Success',
  props<{ caveman: Caveman }>()
);

export const createCavemanFailure = createAction(
  '[Caveman] Create Caveman Failure',
  props<{ error: any }>()
);

// Update Caveman

export const updateCaveman = createAction(
  '[Caveman] Update Caveman',
  props<{ userId: string, cavemanId: string, update: UpdateCavemanDto }>() 
);

export const updateCavemanSuccess = createAction(
  '[Caveman] Update Caveman Success',
  props<{ caveman: Caveman }>()
);

export const updateCavemanFailure = createAction(
  '[Caveman] Update Caveman Failure',
  props<{ error: any }>()
);

// Delete Caveman
export const deleteCaveman = createAction(
  '[Caveman] Delete Caveman',
  props<{ userId: string, cavemanId: string }>() 
);

export const deleteCavemanSuccess = createAction(
  '[Caveman] Delete Caveman Success',
  props<{ cavemanId: string }>()
);

export const deleteCavemanFailure = createAction(
  '[Caveman] Delete Caveman Failure',
  props<{ error: any }>()
);

// Load Caveman by ID

export const loadCaveman = createAction(
  '[Caveman] Load Caveman',
  props<{ userId: string, cavemanId: string }>()
);

export const loadCavemanSuccess = createAction(
  '[Caveman] Load Caveman Success',
  props<{ caveman: Caveman }>()
);

export const loadCavemanFailure = createAction(
  '[Caveman] Load Caveman Failure',
  props<{ error: any }>()
);

