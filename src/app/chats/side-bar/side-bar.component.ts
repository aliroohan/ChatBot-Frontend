import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnChanges {
  @Input() isVisible = true;
  @Output() visibilityChange = new EventEmitter<boolean>();

  chats: { id: number; title: string; date: Date }[] = [
    { id: 1, title: 'Chat 1', date: new Date() },
    { id: 2, title: 'Chat 2', date: new Date() },
  ];

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.visibilityChange.emit(this.isVisible);
    }
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
    this.visibilityChange.emit(this.isVisible);
  }

  startNewChat() {
    
    console.log('Starting new chat');
  }

  selectChat(chatId: number) {
    
    console.log('Selected chat:', chatId);
  }
}
