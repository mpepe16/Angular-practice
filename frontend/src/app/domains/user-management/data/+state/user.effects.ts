

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from "../infrastructure/user.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../entities/user.entities";

@Injectable()
export class AuthEffects {
  loginUser$;
  registerUser$;
  loginSuccessNavigate$;
  registerSuccessNavigate$
  logoutUser$;
  checkAuthStatus$;
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {

    this.loginUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loginUser),
        concatMap(action =>
          this.userService.login(action.credentials).pipe(
            map(response => {
              console.log('Login successful. Backend response:', response);
              console.log('Value of response.accessToken:', response.accessToken);
              localStorage.setItem('authToken', response.accessToken);
              console.log('Login successful, token stored.', response);
              return UserActions.loginUserSuccess({ authResponse: response });
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error?.message || 'Login failed. Please try again.';
              return of(UserActions.loginUserFailure({ error: errorMessage }));
            })
          )
        )
      );
    });

    this.registerUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.registerUser),
        concatMap(action =>
          this.userService.register(action.credentials).pipe( // Use userService.register
            map(response => {

              console.log('Registration successful. Backend response:', response);
              console.log('Value of response.accessToken:', response.accessToken);
              localStorage.setItem('authToken', response.accessToken);
              console.log('Token stored in localStorage after registration.', response.accessToken);
              // Assuming the AuthResponse contains a 'user' property
              return UserActions.registerUserSuccess({ authResponse: response });
            }),
            catchError((error: HttpErrorResponse) => {
              const errorMessage = error.error?.message || 'Registration failed. Please try again.';
              return of(UserActions.registerUserFailure({ error: errorMessage }));
            })
          )
        )
      );
    });

    this.loginSuccessNavigate$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UserActions.loginUserSuccess),
          tap(() => {
            this.router.navigate(['/caves']);
          })
        ),
      { dispatch: false }
    );

    this.registerSuccessNavigate$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UserActions.registerUserSuccess),
          tap(() => {
            this.router.navigate(['/caves']);
          })
        ),
      { dispatch: false }
    );

    this.logoutUser$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UserActions.logoutUser),
          tap(() => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/auth/login']);
          })
        ),
      { dispatch: false }
    );

    // This effect run at app start to check auth status since token is stored in localStorage
    this.checkAuthStatus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.checkAuthStatus),
        tap(() => console.log('AuthEffects: checkAuthStatus action received.')),
        map(() => {
          const token = localStorage.getItem('authToken');
          const refreshToken = localStorage.getItem('refreshToken'); // Feltételezve, hogy tárolsz refresh tokent is
          console.log('AuthEffects: checkAuthStatus$ - Requested token from localStorage:', token);

          let isAuthenticated = false;
          let user: User | null = null;
          let currentAccessToken: string | null = null;
          let currentRefreshToken: string | null = null;

          if (token && token.length > 0) {
            if (!this.jwtHelper.isTokenExpired(token)) {
              isAuthenticated = true;
              currentAccessToken = token; // <--- IMPORTANT: Store the valid token
              currentRefreshToken = refreshToken; // <--- Assuming you want to keep the refresh token as well
              try {
                const decodedToken = this.jwtHelper.decodeToken(token);
                user = {
                  id: decodedToken.sub, // Assuming 'sub' is the ID
                  email: decodedToken.email, // Assuming 'email' is the email
                  name: decodedToken.name ?? '', // Default value if not in token
                  age: Number(decodedToken.age ?? 0), // Default value if not in token
                  password: '', // We do not store password from token; just to satisfy type
                  // Add other necessary user data from the token
                };
                console.log('AuthEffects: Token is valid. User:', user);
              } catch (e) {
                console.error('AuthEffects: Error during token decoding: ', e);
                isAuthenticated = false;
                user = null;
                currentAccessToken = null; // If decoding fails, remove the token
                currentRefreshToken = null;
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
              }
            } else {
              console.log('AuthEffects: A token lejárt, eltávolítva a localStorage-ból.');
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              isAuthenticated = false;
              user = null;
              currentAccessToken = null;
              currentRefreshToken = null;
            }
          } else {
            console.log('AuthEffects: Nincs token a localStorage-ban, vagy üres.');
          }

          console.log('AuthEffects: Dispatching setAuthStatus with isAuthenticated:', isAuthenticated, 'and user:', user);
          return UserActions.setAuthStatus({
            isAuthenticated, user,
            accessToken: currentAccessToken, // <--- IMPORTANT: Pass the actual token!
            refreshToken: currentRefreshToken // <--- IMPORTANT: Pass the actual refresh token!
          });
        })
      )
    );

  }
}

