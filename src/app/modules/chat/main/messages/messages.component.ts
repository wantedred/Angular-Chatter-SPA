import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'src/app/core/services/online/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  @ViewChild('messageContainer')
  messageContainer: ElementRef;

  ngOnInit(): void {
    this.messageService.scrollMessages$.subscribe((move) => {
      if (move) {
        this.scrollTextBottom();
      }
    });
  
  }

  public isMyMessage(messageType: string) : boolean {
    return messageType === 'sent';
  }

  public parseDate(date: Date): string {
    return date.toLocaleTimeString(
      [], 
      {hour: '2-digit', minute: '2-digit'}
    );
  }

  scrollTextBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }



}
