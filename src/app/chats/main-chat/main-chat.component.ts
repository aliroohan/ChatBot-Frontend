import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketConnectionsService } from '../../Services/socket-connections.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.css'
})
export class MainChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;
  messages: { content: string; isUser: boolean }[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  private messageSubscription: Subscription | null = null;
  private shouldFocusInput: boolean = false;
  chatTitle: string = 'New Chat';

  constructor(
    private socketService: SocketConnectionsService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      this.socketService.connect(user.token);
      
      this.messageSubscription = this.socketService.getMessage().subscribe(
        (response) => {
          this.messages.push({ content: response.message.content, isUser: false });
          this.isLoading = false;
        },
        (error) => {
          console.error('Error receiving message:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('No token found in localStorage');
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.socketService.disconnect();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    
    if (this.shouldFocusInput && this.messageInput?.nativeElement) {
      this.messageInput.nativeElement.focus();
      
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message to chat
    this.messages.push({ content: this.newMessage, isUser: true });
    this.isLoading = true;

    // Send message through socket
    this.socketService.sendMessage(this.newMessage);
    this.newMessage = '';
    
    // Set flag to focus input in next view check
    this.shouldFocusInput = true;
  }

  signOut() {
    // Clear local storage
    localStorage.removeItem('user');
    // Disconnect socket
    this.socketService.disconnect();
    // Navigate to login
    this.router.navigate(['/']);
  }
}
