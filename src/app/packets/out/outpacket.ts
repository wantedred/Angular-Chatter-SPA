import { PacketType } from '../packettype';
import { Packet } from '../packet';

export abstract class OutPacket extends Packet  {
    
    abstract prepareSend() : Promise<boolean>;

    protected sendPacket(packetType: PacketType, member): Promise<boolean> {
        return new Promise((resolved) => {
            Packet._hubConnection.
            invoke(packetType, member).then(success => {
                //console.log(this.chatService.connectionIsEstablished);
                resolved(success);
            }, rejected => {
                //console.log(this.chatService.connectionIsEstablished);
                resolved(false);
            });
        });
    }
}