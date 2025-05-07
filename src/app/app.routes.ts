import { Routes } from '@angular/router';
import { RegisterComponent } from './admin/register/register.component';
import { OtpComponent } from './admin/otp/otp.component';
import { LoginComponent } from './admin/login/login.component';
import { AproveComponent } from './admin/aprove/aprove.component';
import { RejectComponent } from './admin/reject/reject.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { RegisterComponent as UserRegisterComponent } from './user/register/register.component';
import { LoginComponent as UserLoginComponent } from './user/login/login.component';
import { OtpComponent as UserOtpComponent } from './user/otp/otp.component';
import { ResetPasswordComponent as UserResetPasswordComponent } from './user/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin/register/otp', component: OtpComponent },
  { path: 'approve-user/:token', component: AproveComponent},
  { path: 'reject-user/:token', component: RejectComponent},
  { path: 'admin/reset-password', component: ResetPasswordComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/otp', component: UserOtpComponent },
  { path: 'user/reset-password', component: UserResetPasswordComponent },
  { path: '**', redirectTo: 'login' }
];
