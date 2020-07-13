import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'src/app/core/services/online/message.service';
import { BasicResponse } from 'src/app/core/http/basicresponse';
import { MainComponent } from '../main.component';
import { ResizeService } from 'src/app/core/services/offline/resizeevent.service'
import { IWindowSizeProps } from 'src/app/shared/models/window';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public messageContainerHeight: number = 500;

  constructor(public messageService: MessageService,
    public resizeService: ResizeService) { }

  @ViewChild('messageContainer')
  messageContainer: ElementRef;

  ngOnInit(): void {
    this.messageService.scrollMessages$.subscribe((move) => {
      if (move) {
        this.scrollTextBottom();
      }
    });

    this.messageService._receivedMessage.subscribe((response: BasicResponse) => {
      if (response) {
        this.scrollTextBottom();
      }
    });

    this.resizeService.resizeEvent.subscribe((data: IWindowSizeProps) => {
      this.messageContainerHeight = (data.height - 136);
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
