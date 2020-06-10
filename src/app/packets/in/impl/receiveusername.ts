import { InPacket } from '../inpacket';
import { EventEmitter } from '@angular/core';

export class ReceiveUsername extends InPacket {

    protected emitter: EventEmitter<ReceiveUsernameProps>;

    constructor() {
        super();
        ReceiveUsername.getGenericEmitter().subscribe(data => {
            this.emitter.emit(data);
        })
    }
}

export interface ReceiveUsernameProps {
    newUsername: string;
}