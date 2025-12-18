import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CAVEMAN_FEATURE_KEY, CavemanState, adapter } from './caveman.reducer';

// Feature Selector
export const selectCavemanState = createFeatureSelector<CavemanState>(CAVEMAN_FEATURE_KEY);

// Entity Selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllCavemen = createSelector(
  selectCavemanState,
  selectAll 
);

export const selectCavemanEntities = createSelector(
  selectCavemanState,
  selectEntities
);

export const selectSelectedCavemanId = createSelector(
  selectCavemanState,
  (state: CavemanState) => state.selectedCavemanId
);

export const selectSelectedCaveman = createSelector(
  selectCavemanEntities,
  selectSelectedCavemanId,
  (entities: CavemanState['entities'], selectedId: CavemanState['selectedCavemanId']) =>
    (selectedId ? entities[selectedId] : undefined) 
);

export const selectCavemanLoading = createSelector(
  selectCavemanState,
  (state: CavemanState) => state.isLoading 
);

export const selectCavemanError = createSelector(
  selectCavemanState,
  (state: CavemanState) => state.error 
);