import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../Services/user-auth.service';

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
  passwordStrength = 0;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: UserAuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.required]]
    });

    // Watch for password changes to update strength
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.updatePasswordStrength(password);
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updatePasswordStrength(password: string) {
    let strength = 0;
    if (password && password.length >= 6) strength += 25;
    if (password && /[A-Z]/.test(password)) strength += 25;
    if (password && /[0-9]/.test(password)) strength += 25;
    if (password && /[^A-Za-z0-9]/.test(password)) strength += 25;
    this.passwordStrength = strength;
  }

  getPasswordStrengthText(): string {
    if (this.passwordStrength <= 25) return 'Weak';
    if (this.passwordStrength <= 50) return 'Fair';
    if (this.passwordStrength <= 75) return 'Good';
    return 'Strong';
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
        console.log('User registered:', response);
        this.router.navigate(['/user/signup/otp'], { queryParams: { email: this.registerForm.value.email } });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error registering user:', error.message);
      }
    );
  }

  login() {
    this.router.navigate(['/user/login']);
  }
}
