import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './register/otp/otp.component';
import { LoginComponent } from './login/login.component';
import { AproveComponent } from './admin/aprove/aprove.component';
import { RejectComponent } from './admin/reject/reject.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/otp', component: OtpComponent },
  { path: 'approve-user/:token', component: AproveComponent},
  { path: 'reject-user/:token', component: RejectComponent},
  { path: '**', redirectTo: 'login' }
];
