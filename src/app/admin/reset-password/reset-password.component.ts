import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  currentStep = 1;
  maskedEmail = '';
  remainingTime = 0;
  passwordStrength = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private data: DataService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    // Watch for password changes to update strength
    this.resetPasswordForm.get('password')?.valueChanges.subscribe(password => {
      this.updatePasswordStrength(password);
    });
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
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

  sendOtp() {
    if (this.formControls['email'].invalid) return;
    
    this.isLoading = true;
    this.maskedEmail = this.maskEmail(this.formControls['email'].value);
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 2;
      this.startTimer();
    }, 2000);
  }

  maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  }

  startTimer() {
    this.remainingTime = 60;
    const timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  verifyOtp() {
    if (this.formControls['otp'].invalid) return;
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 3;
    }, 1500);
  }

  resendOtp() {
    this.sendOtp();
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.resetPasswordForm.invalid) return;
    
    if (this.formControls['password'].value !== this.formControls['confirmPassword'].value) {
      this.formControls['confirmPassword'].setErrors({ mustMatch: true });
      return;
    }
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Password reset successful');
      this.router.navigate(['/admin/login']);
    }, 2000);
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  backToLogin() {
    this.router.navigate(['/admin/login']);
  }
}