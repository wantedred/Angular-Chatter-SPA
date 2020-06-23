import { OutPacket } from '../outpacket';
import { PacketType } from '../../packettype';
import { NetworkResponse } from 'src/app/models/networkresponse';

export class RequestAllUsers extends OutPacket {

    prepareSend(): Promise<NetworkResponse> {
        return super.sendPacket(PacketType.RequestallUsers).then(success => {
            return success
        }, err => {
            console.log('we got an error');
            return err;
        });
    }
    
}