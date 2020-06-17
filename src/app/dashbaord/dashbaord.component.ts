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
import { ReceiveMessage } from '../packets/in/impl/receivemessage';
import { SendMessage } from '../packets/out/impl/sendmessage';

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
    private popupService: PopupService
  ) {  
    //this.subscribeToEvents();  
  }  

  ngOnInit(): void {
    //gets the users in the chat
    this.getUsersInChat();

    ReceiveUsername.emitter.subscribe((data: ReceiveUsernameProps) => {
      console.log('got a new username');
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

    var receiveuserssub = ReceiveAllUsers.emitter.subscribe((data: ReceiveAllUsersProps) => {
        if (data.users == null || undefined) {
          receiveuserssub.unsubscribe();
          return;
        }
        
        data.users.forEach((element: User) => {
          this.users.push(element);
        });
        receiveuserssub.unsubscribe();
    });

    this.popupService.showPopup(new Popup(
      "Choose your display name",
      "Display Name",
      "display name",
      "Save",
      "Cancel"
    ));

    //SAVE
    this.popupService.leftAction.subscribe(async (username: string) => {
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

    ReceiveMessage.emitter.subscribe((message: Message) => {
      console.log('got a new message: ', message);

      if (this.user !== null && this.user.username === message.username) {
        message.type = 'sent';
      }
      this.messages.push(new Message(message.username, message.type, message.text, new Date(message.date)));
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
    PacketManager.sendPacket(new SendMessage(new Message(
      this.user.username,
      "received",
      message,
      new Date()
    ))).then(success => {
      if (success) {
        this.scrollTextBottom();
        this.clearText();
      } else {
        this.scrollTextBottom();//message saying failed to send
      }
    }, rejected => {
      this.scrollTextBottom();//message saying failed to send
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
