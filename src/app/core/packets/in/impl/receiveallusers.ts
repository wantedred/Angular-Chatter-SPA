import { InPacket } from '../inpacket';
import { EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';

export class ReceiveAllUsers extends InPacket {

    public static emitter: EventEmitter<ReceiveAllUsersProps> = new EventEmitter(true);
    
    constructor() {
        super();
        this.getGenericEmitter().subscribe(data => {
            ReceiveAllUsers.emitter.emit(data);
        });
    }
}

export interface ReceiveAllUsersProps {
    users: Array<User>;
}