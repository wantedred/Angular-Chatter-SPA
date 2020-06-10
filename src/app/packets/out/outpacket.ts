import { PacketType } from '../packettype';
import { Packet } from '../packet';

/**
 * Abstract class for outgoing packets - Tristan Wynn
 */
export abstract class OutPacket extends Packet  {
    
    /**
     * Precondition checks before sending the packet
     */
    abstract prepareSend() : Promise<boolean>;

    /**
     * 
     * @param packetType - The type of packet we're sending
     * @param data - The data the outgoing packet is sending
     */
    protected sendPacket(packetType: PacketType, data: any): Promise<boolean> {
        return new Promise((resolved) => {
            Packet._hubConnection.
            invoke(packetType, data).then(success => {
                //console.log(this.chatService.connectionIsEstablished);
                resolved(success);
            }, rejected => {
                //console.log(this.chatService.connectionIsEstablished);
                resolved(false);
            });
        });
    }
}