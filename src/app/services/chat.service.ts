import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Message } from '../models/message';
import { Observable, observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    this.createConnection();  
    // this.registerOnServerEvents();  
    this.startConnection();  
  }  

  sendMessage(message: Message) : Promise<boolean> {
    return new Promise((resolved) => {
      this._hubConnection.invoke('NewMessage', message).then(value => {
        resolved(true);
      }, rejected => {
        resolved(false);
      });
    });

    // return new Observable(observer => {
    //   observer.next(this._hubConnection.invoke('NewMessage', message));
    // });
     //return this._hubConnection.invoke('NewMessage', message);
  }
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl('https://localhost:44368/MessageHub') 
      .build();  
  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('MessageReceived', (data: any) => {  
      console.log('got the message: ', data);
      this.messageReceived.emit(data);  
    });  
  }  
}   