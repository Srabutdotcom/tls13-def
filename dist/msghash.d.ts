/**
 * return messageHash using specified hash algorithm
 */
export class MessageHash extends Uint8Array {
    /**
     *
     * @param {ArrayBuffer} msg
     */
    constructor(msg: ArrayBuffer);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
     *
     * @returns Hanshake message
     */
    wrap(): Handshake;
}
import { Handshake } from "./handshake.js";
