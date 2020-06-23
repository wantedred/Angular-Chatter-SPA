import { HubConnection } from '@microsoft/signalr';
import { Connection } from '../connection';

/**
 * Packet class - Tristan Wynn
 */
export class Packet {

    /**
     * Store the connection inside the packet
     */
    protected static _hubConnection: HubConnection = null;

    /**
     * The constrcutor following the singleton pattern
     */
    constructor() {
        if (Packet._hubConnection == null) {
            console.log('setting hub connection');
            Packet._hubConnection = Connection.hubConnection;
        }
    }

}