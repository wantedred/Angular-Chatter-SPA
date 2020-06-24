import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { BasicResponse } from 'src/app/core/http/basicresponse';

export class RequestAllUsers extends OutPacket {

    prepareSend(): Promise<BasicResponse> {
        return super.sendPacket(PacketType.RequestallUsers).then(success => {
            return success
        }, err => {
            console.log('we got an error');
            return err;
        });
    }
    
}