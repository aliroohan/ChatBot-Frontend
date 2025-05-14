import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DocumentsService, Document } from '../../Services/documents.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, UploadFileComponent, HttpClientModule],
  providers: [DocumentsService],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [{
    id: 1,
    title: 'Project Proposal',
    description: 'Initial project proposal document',
    file_path: '/uploads/proposal.pdf',
    file_type: 'application/pdf',
    upload_date: '2024-03-20',
    uploader_id: 1,
    status: 'active'
  },
  {
    id: 2,
    title: 'Meeting Minutes',
    description: 'Minutes from the last team meeting',
    file_path: '/uploads/minutes.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    upload_date: '2024-03-19',
    uploader_id: 1,
    status: 'active'
  }];
  showUploadModal = false;

  constructor(
    private documentsService: DocumentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentsService.getDocuments().subscribe(
      (response) => {
        this.documents = response;
      },
      (error) => {
        console.error('Error loading documents:', error);
      }
    );
  }

  onFileUploaded() {
    this.loadDocuments();
    this.showUploadModal = false;
  }

  deleteDocument(documentId: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentsService.deleteDocument(documentId).subscribe(
        () => {
          this.loadDocuments();
        },
        (error) => {
          console.error('Error deleting document:', error);
        }
      );
    }
  }

  signOut() {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}
