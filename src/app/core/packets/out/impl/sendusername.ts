import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { BasicResponse } from 'src/app/core/http/basicresponse';

export class SendUsernameOut extends OutPacket {
    
    private username: string;
    private connectionId: string;

    constructor(username: string, connectionId: string = null) {
        super();
        this.username = username;
        this.connectionId = connectionId;
    }
    
    prepareSend(): Promise<BasicResponse> {
        let username = this.username;
        let connectionId = this.connectionId;
        return super.sendPacket(PacketType.SendUsername, {username, connectionId}).then(success => {
            return success;
        }, err => {
            console.log('we got an error');
            return err;
        });
    }

    

}