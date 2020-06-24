import { InPacket } from '../inpacket';
import { EventEmitter } from '@angular/core';

export class ReceiveUsername extends InPacket {

    public static emitter: EventEmitter<ReceiveUsernameProps> = new EventEmitter(true);

    constructor() {
        super();
        this.getGenericEmitter().subscribe(data => {
            ReceiveUsername.emitter.emit(data);
        })
    }
}

export interface ReceiveUsernameProps {
    newUsername: string;
    removeUser: boolean;
}