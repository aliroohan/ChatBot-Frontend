import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { DataService } from '../../Services/data.service';
import { UserAuthService } from '../../Services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: UserAuthService,
    private data: DataService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    console.log('Login form submitted:', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('User logged in:', response);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.removeItem('admin');
        this.router.navigate(['/chat/:id']);
      },
      (error) => {
        console.error('Error logging in:', error.message);
      }
    );
  }

  register() {
    this.router.navigate(['user/signup']);
  }

  forgotPassword() {
    this.data.value = 'forgot';
    this.router.navigate(['user/reset-password']);
  }
}
