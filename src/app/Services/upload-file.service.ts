import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    console.log('File being uploaded:', file);
    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData created:', formData);
    return this.http.post('http://localhost:4000/api/upload', formData);
  }
}