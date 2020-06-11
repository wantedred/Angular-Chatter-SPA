import { InPacket } from '../inpacket';
import { User } from 'src/app/models/user';

export class ReceiveAllUsers extends InPacket {

    protected emitter: import("@angular/core").EventEmitter<any>;
    
    constructor() {
        super();
        ReceiveAllUsers.getGenericEmitter().subscribe(data => {
            this.emitter.emit(data);
        });
    }
}

export interface ReceiveAllUsersProps {
    users: Array<User>;
}