import { ChatService } from "../services/chat.service";
import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { PacketManager } from './packetmanager';

@Injectable({
    providedIn: 'root'
})
export class Packet {

    protected static _hubConnection: HubConnection = null;

    constructor(hubConnection: HubConnection = null) {
        if (Packet._hubConnection == null) {
            console.log('setting hub connection');
            Packet._hubConnection = PacketManager._hubConnection;
        }
    }

}