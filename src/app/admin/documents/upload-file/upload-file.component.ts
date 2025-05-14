import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadFileService } from '../../../Services/upload-file.service';
@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  isVisible = true;
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;

  constructor(private uploadFileService: UploadFileService) { }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    this.resetState();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      for (let i = 0; i <= 91; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.uploadProgress = i;
      }
      this.uploadFileService.uploadFile(this.selectedFile).subscribe(async (res: any) => {
        console.log(res);
        this.uploadProgress = 100;
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.hide();
      }, (error: any) => {
        console.error('Error uploading file:', error);
      });      
      this.fileUploaded.emit(this.selectedFile);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      this.isUploading = false;
    }
  }

  private resetState() {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.isUploading = false;
  }
}
