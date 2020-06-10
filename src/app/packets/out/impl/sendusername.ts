import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';

export class SendUsernameOut extends OutPacket {
    
    private username: string;

    constructor(username: string) {
        super();
        this.username = username;
    }
    
    prepareSend(): Promise<boolean> {
        return super.sendPacket(PacketType.SendUsername, this.username).then(success => {
            if (!success) {
                //throw an error in the username form
                console.log('username is taken');
                return false;
              }

              return true;
        }, err => {
            console.log('we got an error');
            return false;
        });
    }

    

}