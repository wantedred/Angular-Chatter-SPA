import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { BasicResponse } from 'src/app/core/http/basicresponse';
import { Message } from 'src/app/shared/models/message';

export class SendMessage extends OutPacket {
    
    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    prepareSend(): Promise<BasicResponse> {
        return super.sendPacket(PacketType.SendMessage, this.message).then(success => {
            return success
        }, err => {
            console.log('we got an error');
            return err;
        });
    }
    
}