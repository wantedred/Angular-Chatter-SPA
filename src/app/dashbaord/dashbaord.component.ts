import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';
import { PopupService } from '../services/offline/popup.service';
import { Popup } from '../models/popup';


@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})

export class DashbaordComponent implements OnInit {

  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  
  @ViewChild('textArea') 
  txtArea: ElementRef;

  @ViewChild('messageContainer')
  messageContainer: ElementRef;

  textHeight: number = Number(75);

  constructor(  
    private chatService: ChatService,  
    private _ngZone: NgZone,
    private popupService: PopupService
  ) {  
    //this.subscribeToEvents();  
  }  

  ngOnInit(): void {
    let username = "wanted";  
    let type = "sent";  
    let message = 'new new new new';  
    let date = new Date();  

    for (let i = 0; i < 20; i++) {
      this.messages.push(new Message(username, type, message, date));
    }

    this.popupService.showPopup(new Popup(
      "Choose your display name",
      "Display Name",
      "display name",
      "Save",
      "Cancel"
    ))

    this.popupService.leftAction.subscribe(res => {
      console.log('left action got pressed');
    });

    this.popupService.rightAction.subscribe(res => {
      console.log('right action got pressed');
    });
  }

  

  prepareMessageSend() {
    let textMessage : string = this.txtArea.nativeElement.value;
    console.log('you sent: ', this.txtArea);
    if (textMessage.length <= 0) {
      console.log('message length less than 0');
      return;
    }

    this.sendMessage(textMessage);
  }

  sendMessage(message: string): void {
    this.chatService.sendMessage(
      new Message(
        "wanted",
        "sent",
        message,
        new Date()
      )
    ).then(result => {
      if (result) {
        this.scrollTextBottom();
        this.clearText();
      } else {
        //TODO: Make a message saying message failed to send
      }
    });

    
    
    // if (this.txtMessage) {  
    //   this.message = new Message();  
    //   this.message.clientId = this.uniqueID;  
    //   this.message.type = "sent";  
    //   this.message.text = this.txtMessage;  
    //   this.message.date = new Date();  
    //   this.messages.push(this.message);  
    //   this.chatService.sendMessage(this.message);  
    //   this.txtMessage = '';  
    // }
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        // if (message.clientId !== this.uniqueID) {  
        //   message.type = "received";  
        //   this.messages.push(message);  
        // }  
      });  
    });  
  }

  stopNewLine(event) {
      event.preventDefault();
  }

  scrollTextBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  clearText() {
    this.txtArea.nativeElement.value = '';
  }

  onTextChange() {
    let height: number = +this.txtArea.nativeElement.style.height.split('p')[0] + 60;
    if (+height > 60) {
      return;
    }
    
    if (this.textHeight != height) {
       this.textHeight = height;
    }
  }

}  
