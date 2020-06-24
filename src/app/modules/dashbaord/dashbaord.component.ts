import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopupService, PopupType } from 'src/app/core/services/offline/popup.service';
import { UserService } from 'src/app/core/services/online/user.service';
import { MessageService } from 'src/app/core/services/online/message.service';
import { Popup, PoppedProps } from 'src/app/shared/models/popup';
import { BasicResponse } from 'src/app/core/http/basicresponse';
import { PacketManager } from 'src/app/core/packets/packetmanager';
import { SendUsernameOut } from 'src/app/core/packets/out/impl/sendusername';
import { User } from 'src/app/shared/models/user';
import { Connection } from 'src/app/core/http/connection';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})

export class DashbaordComponent implements OnInit {
  
  @ViewChild('textArea') 
  txtArea: ElementRef;

  @ViewChild('messageContainer')
  messageContainer: ElementRef;

  textHeight: number = Number(60);

  constructor(  
    private popupService: PopupService,
    public userService: UserService,
    public messageService: MessageService
  ) {  
    //this.subscribeToEvents();  
  }  

  ngOnInit(): void {
    //gets the users in the chat
    this.popupService.showPopup(new Popup(
      "Choose your display name",
      "Display Name",
      "display name",
      [
        PopupType.SAVE,
        PopupType.CANCEL
      ]
      )).subscribe(async (popped: PoppedProps) => {
      if (popped.action === PopupType.SAVE) {
        let username : string = popped.text;
          if (username.length < 2 || username.length > 12) {
          console.log('username must be three to twelve characters long');
          return;
        }

        let status: BasicResponse = await PacketManager.sendPacket(new SendUsernameOut(username));
        if (!status.success) {
          //TODO: throw an error in the username form
          console.log('username is taken');
          return;
        }

        this.userService.user = new User('', username);
        this.popupService.clearPopup();
      }

      if (popped.action === PopupType.CANCEL) {
        this.popupService.clearPopup();
        //send a toast that user can't send messages until giving a name
      }
    });

    this.messageService._receivedMessage.subscribe(
      (data: BasicResponse) => {
        if (data.success) {
          this.scrollTextBottom();
        }
    });

    Connection.hubConnection.onreconnected((connectionId) => {
      if (this.userService.user === null) {
        return;
      }

      PacketManager.sendPacket(new SendUsernameOut(this.userService.user.username, this.userService.user.Id))
        .then((response: BasicResponse) =>{
          if (response.success) {
            this.userService.user.Id = connectionId;
            console.log('got reconneted and updated userid');
          }
        });
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
    this.messageService.sendMessage(textMessage);
  }

  sendMessage(message: string): void {
    console.log('trying to listen dashboard');
    this.messageService._sentMessage.subscribe(
      (response: BasicResponse) => {
        console.log('got a response back dashboard', response);
        if (response.success) {
          this.scrollTextBottom();
          this.clearText();
        } else {
          this.scrollTextBottom();//message saying failed to send
        }
      }
    )
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
    console.log('text height: ', this.textHeight);
    console.log('new height', height);
    if (+height > 130) {
      console.log('height is over 60');
      return;
    }
    
    if (this.textHeight != height) {
       this.textHeight = height;
       this.scrollTextBottom();
    }
  }

}  
