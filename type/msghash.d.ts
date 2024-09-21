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
     * @return {Handshake} message
     */
    wrap(): Handshake;
}
import { Handshake } from "../src/handshake.js";
