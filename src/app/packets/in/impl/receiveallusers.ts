import { InPacket } from '../inpacket';
import { User } from 'src/app/models/user';
import { EventEmitter } from '@angular/core';

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