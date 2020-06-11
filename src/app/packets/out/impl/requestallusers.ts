import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';

export class RequestAllUsers extends OutPacket {

    prepareSend(): Promise<boolean> {
        return super.sendPacket(PacketType.RequestallUsers).then(success => {
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