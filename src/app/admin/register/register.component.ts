import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/adminAuth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  isLoading = false;
  passwordChecks = {
    minLength: false,
    hasNumber: false,
    hasLetter: false
  };

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false, [Validators.required]]
    });

    // Watch for password changes to update validation
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.updatePasswordChecks(password);
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updatePasswordChecks(password: string) {
    this.passwordChecks.minLength = password ? password.length >= 6 : false;
    this.passwordChecks.hasNumber = password ? /[0-9]/.test(password) : false;
    this.passwordChecks.hasLetter = password ? /[a-zA-Z]/.test(password) : false;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    console.log('Register form submitted:', this.registerForm.value);
    
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Admin registered:', response);
        this.router.navigate(['/admin/signup/otp'], { queryParams: { email: this.registerForm.value.email } });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error registering admin:', error.message);
      }
    );
  }

  login() {
    this.router.navigate(['/admin/login']);
  }
}
