import { Component } from '@angular/core';
import { AuthFacade } from "../../../data/application/auth.facade";
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";
@Component({
  selector: 'app-logout',
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  isAuthenticated$: Observable<boolean>;
  constructor(private authFacade: AuthFacade ) {
     this.isAuthenticated$ = this.authFacade.isAuthenticated$;
  }
  onLogout(): void {
    this.authFacade.logout(); 
  }
  
}
