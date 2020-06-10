import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../models/message';
import { PopupService } from '../services/offline/popup.service';
import { Popup } from '../models/popup';
import { User } from '../models/user';
import { PacketManager } from '../packets/packetmanager';
import { SendUsernameOut } from '../packets/out/impl/sendusername';
import { Connection } from '../connection';

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

  user: User = null;

  constructor(  
    //private chatService: ChatService,  
    private _ngZone: NgZone,
    private popupService: PopupService
  ) {  
    //this.subscribeToEvents();  
  }  

  async ngOnInit(): Promise<void> {
    if (!Connection.connectionIsEstablished) {
      console.log('we are not good');
      Connection.startConnecting();
  }
    let username = "wanted";  
    let type = "sent";  
    let message = 'new new new new';  
    let date = new Date();  

    for (let i = 0; i < 20; i++) {
      this.messages.push(new Message(username, type, message, date));
    }
    // this.chatService.testMethod1().then(result => {
    //   if (result) {
    //     console.log('testing 123');
    //   } else {
    //     //TODO: Make a message saying message failed to send
    //   }
    // });;
    this.popupService.showPopup(new Popup(
      "Choose your display name",
      "Display Name",
      "display name",
      "Save",
      "Cancel"
    ));

    //SAVE
    this.popupService.leftAction.subscribe(async username => {
      if (username.length < 2 || username.length > 12) {
        console.log('username must be three to twelve characters long');
        return;
      }

      var status = await PacketManager.sendPacket(new SendUsernameOut(username));
      console.log('dashboard: ', status);
      // if (username.length < 2 || username.length > 12) {
      //   console.log('username must be three to twelve characters long');
      // }

      // this.chatService.sendUsername(username).then(success => {
      //   if (!success) {
      //     //throw an error in the username form
      //     console.log('username is taken');
      //     return;
      //   }

      //   this.user = new User('', username);
      //   console.log(this.user.username);
      //   //populate usernames on the list
      // }, err => {
      //   console.log('we got an error');
      //   //server is down? retry connection?
      // });
    });

    //CANCEL
    this.popupService.rightAction.subscribe(() => {
      //send a toast that user can't send messages until giving a name
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
    // this.chatService.sendMessage(
    //   new Message(
    //     "wanted",
    //     "sent",
    //     message,
    //     new Date()
    //   )
    // ).then(result => {
    //   if (result) {
    //     this.scrollTextBottom();
    //     this.clearText();
    //   } else {
    //     //TODO: Make a message saying message failed to send
    //   }
    // });

    
    
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
  // private subscribeToEvents(): void {  
  
  //   this.chatService.messageReceived.subscribe((message: Message) => {  
  //     this._ngZone.run(() => {  
  //       // if (message.clientId !== this.uniqueID) {  
  //       //   message.type = "received";  
  //       //   this.messages.push(message);  
  //       // }  
  //     });  
  //   });  
  // }

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
