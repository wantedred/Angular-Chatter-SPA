import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})

export class DashbaordComponent implements OnInit {

  title = 'ClientApp';  
  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  message = new Message();  
  
  @ViewChild('autosize') 
  txtAreaAutosize: CdkTextareaAutosize;

  textHeight: number = Number(75);

  constructor(  
    private chatService: ChatService,  
    private _ngZone: NgZone
  ) {  
    //this.subscribeToEvents();  
  }  

  ngOnInit(): void {
    this.message.clientId = "0";  
    this.message.type = "sent";  
    this.message.text = 'new new new new';  
    this.message.date = new Date();  

    for (let i = 0; i < 20; i++) {
      this.messages.push(new Message());
    }
  }

  onTextChange(height) {
    let newHeight: number = height.split('p')[0];
    if (+newHeight > 60) {
      return;
    }
    
    if (this.textHeight != (+newHeight + 60)) {
      //console.log('old height value: ' + this.textHeight + ', new height value: ' + newHeight);
      this.textHeight = (+newHeight + 60);
    }
    console.log('HTML Height: ', newHeight);
    //console.log('Stored Height: ', this.textHeight);
    //console.log('second if: ', +this.textHeight != (+newHeight + 30));
  }

  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.clientId = this.uniqueID;  
      this.message.type = "sent";  
      this.message.text = this.txtMessage;  
      this.message.date = new Date();  
      this.messages.push(this.message);  
      this.chatService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.clientId !== this.uniqueID) {  
          message.type = "received";  
          this.messages.push(message);  
        }  
      });  
    });  
  }
}  
