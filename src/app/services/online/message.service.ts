import { Injectable, EventEmitter, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Observable, observable } from 'rxjs';
import { ReceiveMessage } from 'src/app/packets/in/impl/receivemessage';
import { UserService } from './user.service';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { NetworkResponse } from 'src/app/models/networkresponse';
import { SendMessage } from 'src/app/packets/out/impl/sendmessage';
import { PacketManager } from 'src/app/packets/packetmanager';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = [];

  public _receivedMessage: EventEmitter<NetworkResponse> = new EventEmitter(true);
  public _sentMessage: EventEmitter<NetworkResponse> = new EventEmitter(true);

  constructor(
    private userService: UserService
  ) { this.listenForMessages(); }

  public listenForMessages() : void {
    ReceiveMessage.emitter.subscribe((message: Message) => {
      if (this.userService.user !== null && this.userService.user.username === message.username) {
        message.type = 'sent';
      }
      this.messages.push(new Message(message.username, message.type, message.text, new Date(message.date)));
      this._receivedMessage.emit(new NetworkResponse(true, null));
    });
  }

  public sendMessage(message: string) : void {
    console.log('trying to send message');
    PacketManager.sendPacket(new SendMessage(new Message(
      this.userService.user.username,
      "received",
      message,
      new Date()
    ))).then((response: NetworkResponse) => {
      console.log('got a message response back: ', response);
      this._sentMessage.emit(response);
    });
  }

}
