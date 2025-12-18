import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs'; 
import * as CavemanActions from './caveman.action';
import { CavemanService } from "../../infrastructure/caveman.services";



@Injectable()
export class CavemanEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly cavemanService: CavemanService = inject(CavemanService);

  // --- Effects Definition ---

  loadCavemen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CavemanActions.loadCavemen),
      tap(action => console.log('[CavemanEffects] loadCavemen dispatched', action)),
      concatMap(action =>
      this.cavemanService.findAllCavemen(action.userId).pipe(
        tap(response => console.log('[CavemanService] findAllCavemen response:', response)),
        map(cavemen => {
        console.log('[CavemanEffects] loadCavemen success', cavemen);
        return CavemanActions.loadCavemenSuccess({ cavemen });
        }),
        catchError(error => {
        console.error('[CavemanEffects] loadCavemen failure', error);
        return of(CavemanActions.loadCavemenFailure({ error }));
        })
      )
      )
    );
  });
  loadCaveman$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CavemanActions.loadCaveman),
      concatMap(action =>
        this.cavemanService.findCavemanById(action.userId, action.cavemanId).pipe(
          map(caveman => CavemanActions.loadCavemanSuccess({ caveman })),
          catchError(error => of(CavemanActions.loadCavemanFailure({ error })))
        )
      )
    );
  });

  createCaveman$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CavemanActions.createCaveman),
      concatMap(action =>
        this.cavemanService.createCaveman(action.userId, action.caveman).pipe(
          map(caveman => CavemanActions.createCavemanSuccess({ caveman })),
          catchError(error => of(CavemanActions.createCavemanFailure({ error })))
        )
      )
    );
  });

  updateCaveman$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CavemanActions.updateCaveman),
      concatMap(action =>
        this.cavemanService.updateCaveman(action.userId, action.cavemanId, action.update).pipe(
          map(caveman => CavemanActions.updateCavemanSuccess({ caveman })),
          catchError(error => of(CavemanActions.updateCavemanFailure({ error })))
        )
      )
    );
  });

  deleteCaveman$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CavemanActions.deleteCaveman),
      concatMap(action =>
        this.cavemanService.deleteCaveman(action.userId, action.cavemanId).pipe(
          map(() => CavemanActions.deleteCavemanSuccess({ cavemanId: action.cavemanId })),
          catchError(error => of(CavemanActions.deleteCavemanFailure({ error })))
        )
      )
    );
  });
  
}