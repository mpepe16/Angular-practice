

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './user.actions';
import { User } from "../entities/user.entities";

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: Omit<User, 'password'> | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: any | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginUser, AuthActions.registerUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginUserSuccess, AuthActions.registerUserSuccess, (state, { authResponse }) => ({
    ...state,
    isAuthenticated: true,
    user: authResponse.user,
    accessToken: authResponse.accessToken,
    refreshToken: authResponse.refreshToken || null,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginUserFailure, AuthActions.registerUserFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: error,
  })),

  on(AuthActions.logoutUser, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
    isLoading: false,
  })),
   on(AuthActions.setAuthStatus, (state, { isAuthenticated, user, accessToken, refreshToken }) => ({ // <--- IMPORTANT: Updated to include tokens
    ...state,
    isAuthenticated,
    user: user,
    accessToken: accessToken, // <--- IMPORTANT: Store the accessToken!
    refreshToken: refreshToken, // <--- IMPORTANT: Store the refreshToken!
  })),
);