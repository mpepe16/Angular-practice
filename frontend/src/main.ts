


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'; // <-- EZ A KULCS!
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { cavemanFeatureKey, reducer } from "./app/caveman-management/data/+state/caveman/caveman.reducer";
import { CavemanEffects } from "./app/caveman-management/data/+state/caveman/caveman.effects";


bootstrapApplication(AppComponent, {
  providers: [
    // Basic angular HTTP Client provider
    provideHttpClient(),

    // NgRx Store configuration
    provideStore({
      // Register the caveman feature state with its reducer
      [cavemanFeatureKey]: reducer
    }),

    // NgRx Effects configuration
    // *** THIS IS THE IMPORTANT PART! ***
    // Make sure it appears EXACTLY LIKE THIS, and that CavemanEffects is included in the array!
    provideEffects([CavemanEffects]),
    // ***************************

    // NgRx Devtools (optional, for development purposes)
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
}).catch(err => console.error(err));