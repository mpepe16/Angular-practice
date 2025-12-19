
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CavemanListComponent } from './domains/caveman-management/ui-components/caveman-list/caveman-list.component';
import { AuthGuard } from "./guards/auth.guard";
export const routes: Routes = [
  {
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'auth', 
    loadChildren: () => import('./domains/user-management/auth.module').then(m => m.AuthModule),
    /* providers: [ 
      provideState(AUTH_FEATURE_KEY, authReducer),
      provideEffects(AuthEffects)
    ] */
  },
   {
    path: 'caves',
    component: CavemanListComponent, 
    canActivate: [AuthGuard] 
  },

  { path: '**', redirectTo: '' } 
];