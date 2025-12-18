import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CavemanListComponent } from "../caveman-list/caveman-list.component";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"; 
import { Caveman } from "../../data/entities/caveman";
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CavemanFacade } from "../../data/application/caveman.facade";
import { CavemanCreateDialogComponent } from "../caveman-create-dialog/caveman-create-dialog.component";


@Component({
  selector: 'app-caveman-home',
  standalone: true,
  imports: [
    CommonModule,
    CavemanListComponent,
    ReactiveFormsModule,
    FormsModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    // If provideAnimations() is not used in app.config.ts, it could be imported here,
    // but application-wide configuration is preferred.
    // BrowserAnimationsModule
  ],
  templateUrl: './caveman-home.component.html',
  styleUrls: ['./caveman-home.component.css'],
})

export class CavemanHomeComponent {
  readonly cavemanFacade: CavemanFacade = inject(CavemanFacade);
  loadingCavemen = false;
  showList = false;
  createCaveManForm = new FormControl('')
  cavemanToCreate : Omit<Caveman, 'id'> = {
    name: '',
    age: 0,
    location: ""
  };
  constructor(public dialog: MatDialog) {}
  toggleList(): void {
    this.showList = !this.showList;
    if (this.showList) {
      this.loadCavemen();
    }
  }
    loadCavemen() {
    this.loadingCavemen = true;
    }

    openCreateCavemanDialog(): void {
    // Data to pass to the dialog
    const dialogRef = this.dialog.open(CavemanCreateDialogComponent, {
      width: '300px',
      data: { ...this.cavemanToCreate } // We pass a copy to avoid direct modification
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result:', result);
      if (result) { // If the result is not null/undefined (i.e., the user clicked the "Add" button)
        this.cavemanToCreate = result; // We update the cavemanToCreate object
        // Here we dispatch the action through the facade
        this.cavemanFacade.createCaveman(this.cavemanToCreate); // Assuming there is such a method in the facade
      }
    });
  }
  addNewCaveman(): void {
    this.openCreateCavemanDialog();
  }
}
