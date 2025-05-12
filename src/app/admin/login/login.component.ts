import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/adminAuth.service';
import { DataService } from '../../Services/data.service';

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
    private authService: AuthService,
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
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error logging in:', error.message);
      }
    );
  }

  forgotPassword() {
    this.data.value = 'forgot';

    this.router.navigate(['admin/reset-password']);
  }

  register() {
    this.router.navigate(['admin/register']);
  }
} 