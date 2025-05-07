import { Routes } from '@angular/router';
import { RegisterComponent } from './admin/register/register.component';
import { OtpComponent } from './admin/otp/otp.component';
import { LoginComponent } from './admin/login/login.component';
import { AproveComponent } from './admin/aprove/aprove.component';
import { RejectComponent } from './admin/reject/reject.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin/register/otp', component: OtpComponent },
  { path: 'approve-user/:token', component: AproveComponent},
  { path: 'reject-user/:token', component: RejectComponent},
  { path: 'admin/reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'login' }
];
