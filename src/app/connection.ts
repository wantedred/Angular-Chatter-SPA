import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { EventEmitter } from '@angular/core';

export class Connection {

    /**
     * The connection for the web socket
     */
    public static hubConnection: HubConnection;
    
    /**
     * Where the connection is established
     */
    public static connectionIsEstablished = false;
    
    /**
     * Emitter for the connection established
     */
    public static connectionEstablishedEmitter = new EventEmitter<boolean>();

    /**
     * static method for connecting
     */
    public static startConnecting() {
        this.buildConnection();
        this.connect();
    }

    /**
     * Starts building the connection for the websocket
     */
    private static buildConnection() {
        Connection.hubConnection = new HubConnectionBuilder()  
        .withUrl('https://localhost:44368/MessageHub') 
        .build();  
    }

    /**
     * Connects to the server using a webscoekt 
     */
    private static connect() {
        Connection.hubConnection  
        .start()  
        .then(() => {  
            Connection.connectionIsEstablished = true;
            Connection.connectionEstablishedEmitter.emit(true);
            console.log('Hub connection started');  
        })  
        .catch(err => {  
          console.log('Error while establishing connection, retrying...');  
          setTimeout(function () { this.startConnection(); }, 5000);  
        }); 
    }

}