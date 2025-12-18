
import { createAction, props } from '@ngrx/store';
import { AuthResponse, LoginRequest, RegisterRequest, User } from "../entities/user.entities";


// Login Actions
export const loginUser = createAction(
  '[Auth] Login User',
  props<{ credentials: LoginRequest }>()
);

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ authResponse: AuthResponse }>()
);

export const loginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>()
);

// Register Actions
export const registerUser = createAction(
  '[Auth] Register User',
  props<{ credentials: RegisterRequest }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ authResponse: AuthResponse }>()
);

export const registerUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>()
);

// Logout Action
export const logoutUser = createAction(
  '[Auth] Logout User'
);
export const checkAuthStatus = createAction('[Auth] Check Auth Status');
export const setAuthStatus = createAction(
  '[Auth] Set Auth Status',
  props<{
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null; 
    refreshToken: string | null; 
  }>()
);