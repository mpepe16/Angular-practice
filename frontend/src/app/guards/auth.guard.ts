// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFacade } from "../domains/user-management/data/application/auth.facade";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacade.isAuthenticated$.pipe(
      take(1), // Only take the latest value and complete
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // If authenticated, allow access
        } else {
          // If not authenticated, redirect to the login page
          // The returnUrl query parameter allows redirecting back after login
          return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }
}