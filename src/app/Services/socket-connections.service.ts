import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionsService {
  private socket: Socket | null = null;
  private messageSubject = new Subject<any>();

  constructor() { }

  connect(token: string): void {
    this.socket = io("http://localhost:3000", {
      query: { token: token }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('llm-response', (data) => {
      const parsed = JSON.parse(data);
      console.log('LLM Response:', parsed);
      this.messageSubject.next(parsed);
    });
  }

  sendMessage(content: string): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    const message = {
      content
    };
    this.socket.emit('message', JSON.stringify(message));
  }

  joinChat(chatId: string): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    this.socket.emit('join-chat', chatId);
  }

  getMessage() {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
