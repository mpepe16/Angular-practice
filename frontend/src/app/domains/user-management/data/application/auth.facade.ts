import { User } from './../entities/user.entities';
// src/app/features/auth/store/auth.facade.ts

import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UserActions from '../+state/user.actions';
import * as UserSelectors from '../+state/user.selectors';
import { LoginRequest, RegisterRequest } from "../entities/user.entities";



@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly _store: Store = inject(Store);
  accessToken$ = this._store.pipe(select(UserSelectors.selectAccessToken));
  isAuthenticated$ = this._store.select(UserSelectors.selectIsAuthenticated);
  currentUser$ = this._store.select(UserSelectors.selectCurrentUser);
  error$ = this._store.select(UserSelectors.selectAuthError);
  isLoading$ = this._store.select(UserSelectors.selectIsLoading);
  currentUserId$ = this._store.pipe(select(UserSelectors.selectUserId));
  constructor() {
    this._store.dispatch(UserActions.checkAuthStatus());
  }

  login(credentials: LoginRequest): void {
    console.log('Dispatching loginUser action with credentials:', credentials);
    this._store.dispatch(UserActions.loginUser({ credentials }));
  }

  register(credentials: RegisterRequest): void {
    console.log('Dispatching registerUser action with credentials:', credentials);
    this._store.dispatch(UserActions.registerUser({ credentials }));
  }

  logout(): void {
    this._store.dispatch(UserActions.logoutUser());
  }
}