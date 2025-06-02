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
import { ChatComponent } from './chats/chat/chat.component';
import { DocumentsComponent } from './admin/documents/documents.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { HomeComponent } from './home/home.component';
import { provideClientHydration } from '@angular/platform-browser';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
     component: HomeComponent },
  { path: 'admin/login', 
    component: LoginComponent 
  },
  { path: 'admin/signup',
     component: RegisterComponent
  },
  { path: 'admin/signup/otp',
     component: OtpComponent 
  },
  { path: 'approve-user/:token',
     component: AproveComponent,
     providers: [
    {
      provide: provideClientHydration(),
      useValue: 'client'
    }
    ]
  },
  { path: 'reject-user/:token', 
    component: RejectComponent,
    providers: [
    {
      provide: provideClientHydration(),
      useValue: 'client'
    }
  ]
  },
  { path: 'admin/reset-password', component: ResetPasswordComponent },
  { path: 'admin/documents', component: DocumentsComponent, canActivate: [adminGuard]},
  { path: 'user/signup', component: UserRegisterComponent },
  { path: 'user/signup/otp', component: UserOtpComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/reset-password', component: UserResetPasswordComponent },
  { path: 'chat/:id', 
    component: ChatComponent, 
    canActivate: [userGuard],
    providers: [
      {
        provide: provideClientHydration(),
        useValue: 'client'
      }
    ]

   },
  { path: '**', redirectTo: 'home' }
];
