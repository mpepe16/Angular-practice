import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'; 

import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./guards/auth.guard";

// Auth Feature Imports
import { AUTH_FEATURE_KEY, authReducer } from './domains/user-management/data/+state/user.reducer';
import { AuthEffects } from './domains/user-management/data/+state/user.effects';
import { CavemanEffects } from "./domains/caveman-management/data/+state/caveman/caveman.effects";
import { CAVEMAN_FEATURE_KEY, cavemanReducer } from "./domains/caveman-management/data/+state/caveman/caveman.reducer";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { JwtModule } from '@auth0/angular-jwt';
import { CavemanHomeComponent } from "./domains/caveman-management/ui-components/caveman-home/caveman-home.component";
export function tokenGetter() {
  return localStorage.getItem('authToken');
}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/user-management/auth.module').then(m => m.AuthModule),
    // The AuthModule is lazy-loaded, but the Auth NgRx state is eager-loaded in app.config.ts.
    // This is a valid pattern, but if you want to treat the Auth state as lazy-loaded as well,
    // then you should use provideState and provideEffects in the AuthModule.
  },
   {
    path: 'caves',
    component: CavemanHomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:3000'], 
          disallowedRoutes: [], 
        }
      })
    ), 
    provideStore(
      { 
        [AUTH_FEATURE_KEY]: authReducer,
        [CAVEMAN_FEATURE_KEY]: cavemanReducer, 
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
        },
      }
    ),
    provideEffects(
      AuthEffects,
      CavemanEffects, 
    ),

    provideStoreDevtools({
      maxAge: 25, 
      logOnly: false, 
      autoPause: true, 
    }),
  ]
};