import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../Services/data.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private data: DataService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    console.log('Registration form submitted:', this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('User registered:', response);
        this.data.value = 'register';
        this.router.navigate(['user/otp'], { 
          queryParams: { email: this.registerForm.value.email }
        });
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  login() {
    this.router.navigate(['user/login']);
  }
}
