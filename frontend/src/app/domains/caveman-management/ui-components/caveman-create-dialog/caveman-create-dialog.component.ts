// src/app/domains/caveman-management/ui/caveman-create-dialog/caveman-create-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Szükséges az ngModel-hez


interface CavemanDialogData {
  name: string;
  age: number;
  location: string;
}

@Component({
  selector: 'app-caveman-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule 
  ],
  template: `
    <h1 mat-dialog-title>Add New Caveman</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name" name="name">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Age</mat-label>
        <input matInput type="number" [(ngModel)]="data.age" name="age">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Location</mat-label>
        <input matInput [(ngModel)]="data.location" name="location">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Add</button>
    </div>
  `,
  styleUrls: ['./caveman-create-dialog.component.css'] 
})
export class CavemanCreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CavemanCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CavemanDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}