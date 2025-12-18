

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./ui-components/login/login.component";
import { RegisterComponent } from "./ui-components/register/register.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Fontos: forChild a feature modulokhoz
    LoginComponent, // Importáld a standalone komponenseket
    RegisterComponent, // Importáld a standalone komponenseket
    // Ezen sorokat távolítsd el, mivel a gyökérben történik a regisztráció:
    // StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    // EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }