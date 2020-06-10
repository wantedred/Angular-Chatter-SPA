import { Packet } from '../packet';
import { EventEmitter } from '@angular/core';

/**
 * Abstract class for incoming packets - Tristan Wynn
 */
export abstract class InPacket extends Packet {

    /**
     * The generic emitter the packetmanager uses
     */
    private static genericEmitter = new EventEmitter<InPacket>();

    /**
     * The emitter we subscribe to for changes
     */
    protected abstract emitter = new EventEmitter<any>();

    /**
     * The getters for the emitter we subscribe to
     */
    public getEmitter() {
        return this.emitter;
    }

    /**
     * the getter for the generic emitter
     */
    public static getGenericEmitter() {
        return this.genericEmitter;
    }

}