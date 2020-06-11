import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Message } from '../models/message';
import { PopupService } from '../services/offline/popup.service';
import { Popup } from '../models/popup';
import { User } from '../models/user';
import { PacketManager } from '../packets/packetmanager';
import { SendUsernameOut } from '../packets/out/impl/sendusername';
import { Connection } from '../connection';
import { ReceiveUsername, ReceiveUsernameProps } from '../packets/in/impl/receiveusername';
import { RequestAllUsers } from '../packets/out/impl/requestallusers';
import { ReceiveAllUsers, ReceiveAllUsersProps } from '../packets/in/impl/receiveallusers';
import { element } from 'protractor';

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
  users: User[] = Array<User>();

  constructor(  
    //private chatService: ChatService,  
    private _ngZone: NgZone,
    private popupService: PopupService
  ) {  
    //this.subscribeToEvents();  
  }  

  async ngOnInit(): Promise<void> {
    let username = "wanted";  
    let type = "sent";  
    let message = 'new new new new';  
    let date = new Date();
    this.getUsersInChat();  

    for (let i = 0; i < 20; i++) {
      this.messages.push(new Message(username, type, message, date));
    }

    new ReceiveUsername().getEmitter().subscribe((data: ReceiveUsernameProps) => {
      if (data.removeUser) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username === data.newUsername) {
            this.users.splice(i, 1);
          }
        }
      } else {
        this.users.push(new User(null, data.newUsername));
      }
    });

    var receiveuserssub = new ReceiveAllUsers().getEmitter().subscribe((data: ReceiveAllUsersProps) => {
        if (data.users == null || undefined) {
          console.log('im null on getting new users');
          receiveuserssub.unsubscribe();
          return;
        }

        data.users.forEach(element => {
          this.users.push(element);
        });

        //Removing first element, keeps placing empty one
        this.users.splice(0, 1);
        /**
         * Work on why angular isnt getting list of users from server
         */
        receiveuserssub.unsubscribe();
    });
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

      let status: boolean = await PacketManager.sendPacket(new SendUsernameOut(username));

      if (!status) {
        //TODO: throw an error in the username form
        console.log('username is taken');
        return;
      }

      this.user = new User('', username);
      this.popupService.clearPopup();
    });

    //CANCEL
    this.popupService.rightAction.subscribe(() => {
      this.popupService.clearPopup();
      //send a toast that user can't send messages until giving a name
    });
  }

  private getUsersInChat() {
    if (this.users.length > 0) {
      return;
    }

    if (!Connection.connectionIsEstablished) {
      Connection.connectionEstablishedEmitter.subscribe(async success => {
        if (success) {
          PacketManager.sendPacket(new RequestAllUsers());
        }
      })
    } else {
      PacketManager.sendPacket(new RequestAllUsers());
    }
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
