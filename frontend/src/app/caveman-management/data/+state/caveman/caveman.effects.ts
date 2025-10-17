import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs'; 
// import { concatLatestFrom } from '@ngrx/operators'; 
// import { Store } from '@ngrx/store'; 

import * as CavemanActions from './caveman.action';
import { CavemanService } from "../../infrastructure/caveman.services";
import { Caveman } from "../../entities/caveman";


@Injectable()
export class CavemanEffects {
  // --- Dependency Injection ---
  // This is the modern Angular (14+) way of injecting dependencies,
  // replacing constructor-based injection.
  private readonly actions$: Actions = inject(Actions);
  private readonly cavemanDataService: CavemanService = inject(CavemanService);

  // If you need to query the Store for selectors in the future
  // (e.g., for filtering or sorting parameters, as we saw in AdvisoryFeedEffects),
  // you can add the Store injection as well:
  // private readonly store: Store = inject(Store);

  // --- Effects Definition ---

  loadCavemans$ = createEffect(() =>
    this.actions$.pipe(
      // Listen for the 'loadCavemans' action
      // This effect is triggered when the loadCavemans action is dispatched.
      ofType(CavemanActions.loadCavemans),

      switchMap(() =>
        // Call the service to get all cavemen
        this.cavemanDataService.getAllCaveman().pipe(
          // If the call is successful, transform the response into a 'loadCavemansSuccess' action.
          map((cavemans: Caveman[]) => CavemanActions.loadCavemansSuccess({ cavemans })),
          // If an error occurs, catch it and dispatch a 'loadCavemansFailure' action.
          catchError(error => of(CavemanActions.loadCavemansFailure({ error })))
        )
        )
      )
    )
  

  // createCaveman$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CavemanActions.createCaveman),
  //     switchMap(({ newCaveman }) =>
  //       this.cavemanDataService.createCaveman(newCaveman).pipe(
  //         map(caveman => CavemanActions.createCavemanSuccess({ caveman })),
  //         catchError(error => of(CavemanActions.createCavemanFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // updateCaveman$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CavemanActions.updateCaveman),
  //     switchMap(({ id, changes }) =>
  //       this.cavemanDataService.updateCaveman(id, changes).pipe(
  //         map(caveman => CavemanActions.updateCavemanSuccess({ caveman })),
  //         catchError(error => of(CavemanActions.updateCavemanFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // deleteCaveman$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CavemanActions.deleteCaveman),
  //     switchMap(({ id }) =>
  //       this.cavemanDataService.deleteCaveman(id).pipe(
  //         map(() => CavemanActions.deleteCavemanSuccess({ id })),
  //         catchError(error => of(CavemanActions.deleteCavemanFailure({ error })))
  //       )
  //     )
  //   )
  // );
}