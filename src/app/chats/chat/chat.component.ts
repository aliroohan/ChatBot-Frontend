import { Component } from '@angular/core';
import { MainChatComponent } from "../main-chat/main-chat.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MainChatComponent, SideBarComponent, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isSidebarVisible = false;

  onFileUploaded(file: File) {
    console.log(file);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  onSidebarVisibilityChange(visible: boolean) {
    this.isSidebarVisible = visible;
  }
}
