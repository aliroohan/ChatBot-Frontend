import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public value: string = '';
  public admin: string = '';
  constructor() { }
}
