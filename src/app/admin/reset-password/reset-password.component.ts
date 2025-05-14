import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/adminAuth.service';

// Custom validator to check if passwords match
export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const controlValue = formGroup.controls[controlName].value;
    const matchingControlValue = formGroup.controls[matchingControlName].value;

    return controlValue === matchingControlValue ? null : { mustMatch: true };
  };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  remainingTime: number = 60;
  otpTimer: any;
  otpSent = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const emailParam = params['email'] || '';
      if (emailParam) {
        this.resetPasswordForm.get('email')?.setValue(emailParam);
      }
    });
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  sendOtp(): void {
    this.resetPasswordForm.get('email')?.markAsTouched();
    
    if (this.resetPasswordForm.get('email')?.invalid) {
      return;
    }
    
    const email = this.resetPasswordForm.get('email')?.value;
    
    
    this.authService.resendOtp(email).subscribe(
      (response: any) => {
        console.log('OTP sent successfully');
        this.otpSent = true;
        this.startOtpTimer();
      },
      (error: any) => {
        console.error('Error sending OTP:', error);
      }
    );
  }

  startOtpTimer(): void {
    this.remainingTime = 60;
    clearInterval(this.otpTimer);
    this.otpTimer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.otpTimer);
      }
    }, 1000);
  }

  resendOtp(): void {
    const email = this.resetPasswordForm.get('email')?.value;
    
    if (email) {
      this.authService.resendOtp(email).subscribe(
        (response: any) => {
          console.log('OTP resent successfully');
          this.startOtpTimer();
        },
        (error: any) => {
          console.error('Error resending OTP:', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.resetPasswordForm.invalid) {
      return;
    }
    
    const resetData = {
      email: this.resetPasswordForm.get('email')?.value,
      otp: this.formControls['otp'].value,
      newPassword: this.formControls['password'].value
    };
    
    console.log('Reset password form submitted:', resetData);
    
    // Call auth service to reset password
    this.authService.resetPassword(resetData).subscribe(
      (response: any) => {
        console.log('Password reset successful');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error resetting password:', error);
      }
    );
  }

  backToLogin(): void {
    this.router.navigate(['admin/login']);
  }
}