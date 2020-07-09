import { EventEmitter } from '@angular/core';
import { HubConnectionBuilder, HubConnection, HttpTransportType, LogLevel, JsonHubProtocol } from '@microsoft/signalr';
import { ServerConfigurations } from 'src/app/configs/serverconfiguration';
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
        .withUrl(
            ServerConfigurations.PREFIXURL +
            ServerConfigurations.MAINHUB
        , HttpTransportType.LongPolling)
        .withHubProtocol(new JsonHubProtocol())
        .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
        .build();

        Connection.hubConnection.keepAliveIntervalInMilliseconds = 1000 * 15;
        Connection.hubConnection.serverTimeoutInMilliseconds = 1000 * 30;
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
        })  
        .catch(err => {  
          console.log('Error while establishing connection, retrying...');  
          setTimeout(function () { this.startConnection(); }, 5000);  
        }); 
    }

}