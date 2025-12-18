import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthFacade } from "../../data/application/auth.facade";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [          
    ReactiveFormsModule
  ],
  standalone: true
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade 
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authFacade.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.isLoading = loading;
    });

    this.authFacade.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      this.errorMessage = error ? (error.error?.message || 'Login failed. Please check your email and password.') : null;
    });
  }

  onSubmit(): void {
   

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authFacade.login({ email, password }); // Dispatch action
    } else {
      this.errorMessage = 'Please fill out all required fields.';
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid. Marking all controls as touched.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}