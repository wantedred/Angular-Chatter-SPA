import { InPacket } from '../inpacket';
import { EventEmitter } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class ReceiveMessage extends InPacket {

    public static emitter: EventEmitter<ReceiveMessageProps> = new EventEmitter(true);

    constructor() {
        super();
        this.getGenericEmitter().subscribe(data => {
            ReceiveMessage.emitter.emit(data);
        })
    }

}

export interface ReceiveMessageProps {
    message: Message;
}