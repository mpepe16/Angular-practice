import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Caveman } from "../../entities/caveman";
import * as CavemanActions from './caveman.action';

export const CAVEMAN_FEATURE_KEY = 'caveman'; 

export interface CavemanState extends EntityState<Caveman> {
  selectedCavemanId: string | null;
  isLoading: boolean;
  error: any | null;
}

export const adapter: EntityAdapter<Caveman> = createEntityAdapter<Caveman>();

export const initialState: CavemanState = adapter.getInitialState({
  selectedCavemanId: null,
  isLoading: false,
  error: null,
});

export const cavemanReducer = createReducer(
  initialState,
  on(CavemanActions.loadCavemen, (state) => ({ ...state, isLoading: true, error: null })),
  on(CavemanActions.loadCavemenSuccess, (state, { cavemen }) =>
    adapter.setAll(cavemen, { ...state, isLoading: false, error: null })
  ),
  on(CavemanActions.loadCavemenFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(CavemanActions.loadCaveman, (state) => ({ ...state, isLoading: true, error: null })),
  on(CavemanActions.loadCavemanSuccess, (state, { caveman }) =>
    adapter.upsertOne(caveman, { ...state, selectedCavemanId: caveman.id, isLoading: false, error: null })
  ),
  on(CavemanActions.loadCavemanFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(CavemanActions.createCaveman, (state) => ({ ...state, isLoading: true, error: null })),
  on(CavemanActions.createCavemanSuccess, (state, { caveman }) =>
    adapter.addOne(caveman, { ...state, isLoading: false, error: null })
  ),
  on(CavemanActions.createCavemanFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(CavemanActions.updateCaveman, (state) => ({ ...state, isLoading: true, error: null })),
  on(CavemanActions.updateCavemanSuccess, (state, { caveman }) =>
    adapter.upsertOne(caveman, { ...state, isLoading: false, error: null })
  ),
  on(CavemanActions.updateCavemanFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(CavemanActions.deleteCaveman, (state) => ({ ...state, isLoading: true, error: null })),
  on(CavemanActions.deleteCavemanSuccess, (state, { cavemanId }) =>
    adapter.removeOne(cavemanId, { ...state, isLoading: false, error: null })
  ),
  on(CavemanActions.deleteCavemanFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);