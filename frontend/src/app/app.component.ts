
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { AuthFacade } from "./domains/user-management/data/application/auth.facade";
import { LogoutComponent } from "./domains/user-management/ui-components/logout/logout/logout.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet,LogoutComponent, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'angular-practice';
  isAuthenticated$: Observable<boolean>;
  constructor(public authFacade: AuthFacade) { 
    this.isAuthenticated$ = this.authFacade.isAuthenticated$;
  }

  ngOnInit() {
  }
}