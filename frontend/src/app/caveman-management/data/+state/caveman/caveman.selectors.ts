import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cavemanAdapter, cavemanFeatureKey, State } from "./caveman.reducer";

export const getCavemanState = createFeatureSelector<State>(cavemanFeatureKey)
const {selectAll} = cavemanAdapter.getSelectors();
export const  getCavemanLoaded = createSelector(
  (state: any) => state.caveman,
  (cavemanState) => !cavemanState.loading
);
export const selectCavemans = createSelector(getCavemanState, (state) => selectAll(state));
export const selectCavemanLoading = createSelector(
  getCavemanState,
  (state) => state.loading
);
export const selectCavemanError = createSelector(
  getCavemanState,
  (state) => state.error
);