import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http:HttpClient) { }



  approveUser(token: string) {
    return this.http.post(`${this.baseUrl}/approve/${token}`, {});
  }

  rejectUser(token: string) {
    return this.http.post(`${this.baseUrl}/reject/${token}`, {});
  }


  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  resendOtp(email: any) {
    return this.http.post(`${this.baseUrl}/generate-otp`, { email });
  }

  verifyOtp(otp: any) {
    return this.http.post(`${this.baseUrl}/verify-otp`, otp);
  }

  forgetPassword(email: any) {
    return this.http.post(`${this.baseUrl}/forget-password`, { email });
  }

  resetPassword(data: any) {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }


}
