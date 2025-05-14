import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Document {
  id: number;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  upload_date: string;
  uploader_id: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private baseUrl = 'http://localhost:4000/api/documents';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl);
  }

  deleteDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${documentId}`);
  }
} 