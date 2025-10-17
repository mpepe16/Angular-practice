
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { loadCavemans, loadCavemansFailure, loadCavemansSuccess } from "./caveman.action";
import { Caveman } from "../../entities/caveman";


export const cavemanFeatureKey = 'caveman';

export interface State extends EntityState<Caveman> {
    loading: boolean;
    error: any;

}

export const cavemanAdapter: EntityAdapter<Caveman> = createEntityAdapter<Caveman>({});

export const initialState: State = cavemanAdapter.getInitialState({
    loading: false,
    error: null,

});

export const cavemanReducer = createReducer(
    initialState,
    on(loadCavemans, (state) => ({ ...state, loading: true })),
    on(loadCavemansSuccess, (state, { cavemans }) =>
        cavemanAdapter.addMany(cavemans, { ...state, loading: false })
    ),
    on(loadCavemansFailure, (state, { error }) => ({ ...state, loading: false, error }),
));
    
export function reducer(state: State | undefined, action: Action) {
    return cavemanReducer(state, action);
}