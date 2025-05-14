import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public value: string = '';
  public admin: string = '';
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (user) {
      this.admin = "user";
    } else if (admin) {
      this.admin = "admin";
    } else {
      this.admin = '';
    }
  }
}
