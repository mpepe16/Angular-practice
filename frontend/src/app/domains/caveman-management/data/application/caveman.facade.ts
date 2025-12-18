
import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CavemanActions from '../+state/caveman/caveman.action';
import * as CavemanSelectors from '../+state/caveman/caveman.selectors';
import { AuthFacade } from "../../../user-management/data/application/auth.facade";
import { filter, take, tap } from "rxjs";
import { Caveman, CreateCavemanDto, UpdateCavemanDto } from "../entities/caveman";
@Injectable({ providedIn: 'root' })
export class CavemanFacade {
  private readonly _store: Store = inject(Store);
  private readonly authFacade: AuthFacade = inject(AuthFacade);
  allCavemans$ = this._store.pipe(select(CavemanSelectors.selectAllCavemen));
  isLoading$ = this._store.pipe(select(CavemanSelectors.selectCavemanLoading));
  error$ = this._store.pipe(select(CavemanSelectors.selectCavemanError));

  constructor() {
    this.authFacade.currentUserId$.subscribe(userId => {
      console.log('CavemanFacade constructor: AuthFacade.currentUserId$ emitted:', userId);
    });
  }

   private withUserId(callback: (userId: string) => void): void {
    console.log('CavemanFacade: withUserId called, subscribing to currentUserId$');
    this.authFacade.currentUserId$.pipe(
      tap(userId => console.log('CavemanFacade: currentUserId$ emitted inside pipe:', userId)), // Látjuk, mit ad ki az Observable
      filter(userId => {
        const isValid = !!userId;
        console.log('CavemanFacade: Filtering userId:', userId, '-> isValid:', isValid);
        return isValid;
      }),
      take(1),
      tap(userId => console.log('CavemanFacade: Filtered userId passed, about to call callback with:', userId))
    ).subscribe(userId => {
      console.log('CavemanFacade: Callback called with userId:', userId);
      callback(userId!);
    }, error => {
      console.error('CavemanFacade: Error in currentUserId$ subscription:', error);
    }, () => {
      console.log('CavemanFacade: currentUserId$ subscription completed.');
    });
  }

  loadCaveman(cavemanId: string): void {
    this.withUserId(userId => {
      this._store.dispatch(CavemanActions.loadCaveman({ userId, cavemanId }));
    });
  }

   loadCavemen(): void {
    console.log('CavemanFacade: loadCavemen() method called.');
    this.withUserId(userId => {
      console.log('CavemanFacade: Dispatching loadCavemen action with userId:', userId);
      this._store.dispatch(CavemanActions.loadCavemen({ userId }));
    });
  
}
  createCaveman(caveman: CreateCavemanDto): void {
    this.withUserId(userId => {
      this._store.dispatch(CavemanActions.createCaveman({ userId, caveman }));
    });
  }

  updateCaveman(cavemanId: string, update: UpdateCavemanDto): void {
    this.withUserId(userId => {
      this._store.dispatch(CavemanActions.updateCaveman({ userId, cavemanId, update }));
    });
  }

  deleteCaveman(cavemanId: string): void {
    this.withUserId(userId => {
      this._store.dispatch(CavemanActions.deleteCaveman({ userId, cavemanId }));
    });
  }
}