import { PacketType } from '../packettype';
import { Packet } from '../packet';
import { BasicResponse } from 'src/app/core/http/basicresponse';

/**
 * Abstract class for outgoing packets - Tristan Wynn
 */
export abstract class OutPacket extends Packet  {
    
    /**
     * Precondition checks before sending the packet
     */
    abstract prepareSend() : Promise<BasicResponse>;

    /**
     * 
     * @param packetType - The type of packet we're sending
     * @param data - The data the outgoing packet is sending
     */
    protected sendPacket(packetType: PacketType, data: any = undefined): Promise<BasicResponse> {
        return new Promise((resolved) => {
            if (data === undefined) {
                console.log('im undefined?');
                Packet._hubConnection.
                invoke(packetType).then(success => {
                    //console.log(this.chatService.connectionIsEstablished);
                    resolved(success);
                }, rejected => {
                    //console.log(this.chatService.connectionIsEstablished);
                    resolved(rejected);
                })
            } else {
                console.log('im not undefined?');
                Packet._hubConnection.
                invoke(packetType, data).then(success => {
                    //console.log(this.chatService.connectionIsEstablished);
                    resolved(success);
                }, rejected => {
                    //console.log(this.chatService.connectionIsEstablished);
                    resolved(rejected);
                });
            }
        });
    }
}