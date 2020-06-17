import { Injectable } from '@angular/core';
import { OutPacket } from './out/outpacket';
import { ReceiveUsername } from './in/impl/receiveusername';
import { Connection } from '../connection';
import { ReceiveAllUsers } from './in/impl/receiveallusers';
import { ReceiveMessage } from './in/impl/receivemessage';

@Injectable({
    providedIn: 'root'
})
export class PacketManager {

    /**
    * The Dictonary for incoming packets containing <packetName, GenericEmitter>
    */
    private static inPackets = new Map();

    /**
     * The queue for when the server is offline or switching hosts
     */
    private static packetQueue = new Array<OutPacket>();

    /**
     * This method is used to send a packet out
     * @param outPacket - The packet class we are sending out
     */
    public static async sendPacket(outPacket: OutPacket) : Promise<boolean> {
      if (!Connection.connectionIsEstablished) {
        this.packetQueue.push(outPacket);
        //TDOD: FINISH PACKET QUEUE
      } else {
        return await outPacket.prepareSend();
      }
    }

    /**
     * Prepares the incoming packets
     */
    public static prepareInPackets() {
      this.populateInPackets();

      for (let [key, value] of PacketManager.inPackets.entries()) {
        Connection.hubConnection.on(key, (data: any) => {
          value.emit(data);
        })
      }
    }

    /**
     * Populates the Map with incoming packets
     */
    private static populateInPackets() {
      PacketManager.inPackets.set('ReceiveUsername', new ReceiveUsername().getGenericEmitter());
      PacketManager.inPackets.set('ReceiveAllUsers', new ReceiveAllUsers().getGenericEmitter());
      PacketManager.inPackets.set('NewMessage', new ReceiveMessage().getGenericEmitter());
    }

}