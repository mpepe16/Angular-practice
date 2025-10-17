
import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CavemanActions from '../+state/caveman/caveman.action'; 
import * as CavemanSelectors from '../+state/caveman/caveman.selectors';
import { State } from '../+state/caveman/caveman.reducer';
@Injectable({ providedIn: 'root' })
export class CavemanFacade {
    private readonly _store: Store = inject(Store);
  allCavemans$ = this._store.pipe(select(CavemanSelectors.selectCavemans));
  isLoading$ = this._store.pipe(select(CavemanSelectors.selectCavemanLoading));
  error$ = this._store.pipe(select(CavemanSelectors.selectCavemanError));

  constructor(private readonly store: Store<State>) {} 

  loadAllCavemans(): void {
    console.log('Dispatching loadCavemans action...');
    this.store.dispatch(CavemanActions.loadCavemans());
  }
}