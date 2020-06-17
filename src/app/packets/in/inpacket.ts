import { Packet } from '../packet';
import { EventEmitter } from '@angular/core';

/**
 * Abstract class for incoming packets - Tristan Wynn
 */
export abstract class InPacket extends Packet {

    /**
     * The generic emitter the packetmanager uses
     */
    private genericEmitter = new EventEmitter<InPacket>();

    // /**
    //  * The emitter we subscribe to for changes
    //  */
    // private static emitter = new EventEmitter<any>();

    // /**
    //  * The getters for the emitter we subscribe to
    //  */
    // public static getEmitter() {
    //     return this.emitter;
    // }

    /**
     * the getter for the generic emitter
     */
    public getGenericEmitter() {
        return this.genericEmitter;
    }

}