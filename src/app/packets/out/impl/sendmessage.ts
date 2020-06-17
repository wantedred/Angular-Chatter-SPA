import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { Message } from 'src/app/models/message';

export class SendMessage extends OutPacket {
    
    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    prepareSend(): Promise<boolean> {
        return super.sendPacket(PacketType.SendMessage, this.message).then(success => {
            if (!success) {
                //throw an error in the username form
                console.log('Cant get all users');
                return false;
              }

              return true;
        }, err => {
            console.log('we got an error');
            return false;
        });
    }
    
}