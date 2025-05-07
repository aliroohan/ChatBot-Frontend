import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../Services/user-auth.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  submitted = false;
  remainingTime: number = 60;
  otpTimer: any;
  email: string = '';
  isRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: UserAuthService,
    private data: DataService
  ) {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
  }

  ngOnInit(): void {
    // Get email from route params
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      if (!this.email) {
        this.router.navigate(['user/login']);
      }
    });

    this.startOtpTimer();
  }

  get formControls() {
    return this.otpForm.controls;
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
    if (this.email) {
      this.authService.resendOtp(this.email).subscribe(
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

    if (this.otpForm.invalid) {
      return;
    }

    const otpData = {
      email: this.email,
      otp: this.formControls['otp'].value,
    };

    this.authService.verifyOtp(otpData).subscribe(
      (response: any) => {
        console.log('OTP verified successfully');
        this.router.navigate(['user/login']);
      },
      (error: any) => {
        console.error('Error verifying OTP:', error);
      }
    );
  }

  backToLogin(): void {
    this.router.navigate(['user/login']);
  }
}
