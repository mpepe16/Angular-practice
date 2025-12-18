import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <--- Fontos: importáld a ReactiveFormsModule-t is itt!
import { CommonModule } from '@angular/common'; // <--- Fontos: importáld a CommonModule-t is itt!
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthFacade } from "../../data/application/auth.facade";

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [          
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
    }, { validator: this.passwordMatchValidator });

    this.authFacade.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.isLoading = loading;
    });

    this.authFacade.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      this.errorMessage = error ? (error.error?.message || 'Registration failed. Please try again.') : null;
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    console.log('Register form submitted with values:', this.registerForm.value);
    // Check if the form is valid
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      // Mark all fields as touched to show validation errors
      this.registerForm.markAllAsTouched();
      return;
    }

    // Check if the passwords match using the custom validator's error
    if (this.registerForm.hasError('mismatch')) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // If everything is valid, proceed to register
    const { username, email, password, age } = this.registerForm.value;
    // Important:backend waits for name field instead of username
    // Check the backend expectations and adjust accordingly.
    console.log('Dispatching register action with:', { username, email, password, age });
    this.authFacade.register({ name: username, email, password, age });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}