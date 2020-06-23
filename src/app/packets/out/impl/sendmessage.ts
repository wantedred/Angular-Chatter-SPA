import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { Message } from 'src/app/models/message';
import { NetworkResponse } from 'src/app/models/networkresponse';

export class SendMessage extends OutPacket {
    
    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    prepareSend(): Promise<NetworkResponse> {
        return super.sendPacket(PacketType.SendMessage, this.message).then(success => {
            return success
        }, err => {
            console.log('we got an error');
            return err;
        });
    }
    
}