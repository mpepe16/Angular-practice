import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CavemanListComponent } from "./caveman-management/ui-components/caveman-list/caveman-list.component";
@Component({
  selector: 'app-root',
  imports: [ HeaderComponent,CavemanListComponent],
  templateUrl: './app.component.html',
  standalone:true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practice';
}
