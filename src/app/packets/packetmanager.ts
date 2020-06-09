import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { OutPacket } from './out/outpacket';

@Injectable({
    providedIn: 'root'
})
export class PacketManager {

    public static _hubConnection: HubConnection;
    public static connectionIsEstablished = false;  

    constructor() {
    }

    public static async sendPacket(outPacket: OutPacket) : Promise<boolean> {
        return await outPacket.prepareSend();
    }

    public static connect() {
        this.createConnection();
        this.startConnection();
    }

    private static createConnection() {  
        PacketManager._hubConnection = new HubConnectionBuilder()  
          .withUrl('https://localhost:44368/MessageHub') 
          .build();  
    }

    private static startConnection(): void {  
        PacketManager._hubConnection  
          .start()  
          .then(() => {  
            PacketManager.connectionIsEstablished = true;  
            console.log('Hub connection started');  
            //PacketManager.connectionEstablished.emit(true);
          })  
          .catch(err => {  
            console.log('Error while establishing connection, retrying...');  
            setTimeout(function () { this.startConnection(); }, 5000);  
          });  
      }

}