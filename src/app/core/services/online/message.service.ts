import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { BasicResponse } from 'src/app/core/http/basicresponse';
import { ReceiveMessage } from '../../packets/in/impl/receivemessage';
import { PacketManager } from '../../packets/packetmanager';
import { SendMessage } from '../../packets/out/impl/sendmessage';
import { Message } from 'src/app/shared/models/message';
import { element } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = [];

  public _receivedMessage: EventEmitter<BasicResponse> = new EventEmitter(true);
  public _sentMessage: EventEmitter<BasicResponse> = new EventEmitter(true);

  constructor(
    private userService: UserService
  ) { this.listenForMessages(); }

  public listenForMessages() : void {
    ReceiveMessage.emitter.subscribe((message: Message) => {
      for (let i = 0; i < this.userService.blockedUsers.length; i++) {
        let currentUser = this.userService.blockedUsers[i];
        if (currentUser.username === message.username) {
          return;
        }
      }

      if (this.userService.user !== null && this.userService.user.username === message.username) {
        message.type = 'sent';
      }
      
      this.messages.push(new Message(message.username, message.type, message.text, new Date(message.date)));
      this._receivedMessage.emit(new BasicResponse(true, null));
    });
  }

  public sendMessage(message: string) {
    console.log('trying to send message');
    PacketManager.sendPacket(new SendMessage(new Message(
      this.userService.user.username,
      "received",
      message,
      new Date()
    ))).then((response: BasicResponse) => {
      console.log('got a message response back: ', response);
      this._sentMessage.emit(response);
    });
  }

}
