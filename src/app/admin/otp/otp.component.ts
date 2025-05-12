import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/adminAuth.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  submitted = false;
  email: string = '';
  remainingTime: number = 60;
  otpTimer: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.otpForm = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });

    this.startCountdown();
  }

  startCountdown() {
    this.remainingTime = 60;
    clearInterval(this.otpTimer);

    this.otpTimer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.otpTimer);
      }
    }, 1000);
  }

  get formControls() {
    return this.otpForm.controls;
  }

  onDigitInput(event: any, nextInput: any) {
    if (event.target.value.length === 1) {
      nextInput.focus();
    }
  }

  resendOtp() {
    console.log('Resending OTP to', this.email);
    this.startCountdown();
  }

  onSubmit() {
    this.submitted = true;

    if (this.otpForm.invalid) {
      return;
    }

    const otp =
      this.otpForm.value.digit1 +
      this.otpForm.value.digit2 +
      this.otpForm.value.digit3 +
      this.otpForm.value.digit4;

    this.authService.verifyOtp({ otp, email: this.email }).subscribe(
      (response) => {
        console.log('OTP verified:', response);
        this.router.navigate(['admin/login']);
      },
      (error) => {
        console.error('Error verifying OTP:', error);
      }
    );
  }
}
