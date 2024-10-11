/**
 * return messageHash using specified hash algorithm
 * @extends {Uint8Array}
 */
export class MessageHash extends Uint8Array {
    /**
     * @param {Uint8Array} msg
     * @return
     */
    static SHA256(msg: Uint8Array): Promise<{
        /**@type {ArrayBuffer} buffer - description */
        buffer: ArrayBuffer;
        messageHash: MessageHash;
    }>;
    /**
     * @param {Uint8Array} msg
     * @return
     */
    static SHA384(msg: Uint8Array): Promise<{
        /**@type {ArrayBuffer} buffer - description */
        buffer: ArrayBuffer;
        messageHash: MessageHash;
    }>;
    /**
     * @param {Uint8Array} msg
     * @return
     */
    static SHA512(msg: Uint8Array): Promise<{
        /**@type {ArrayBuffer} buffer - description */
        buffer: ArrayBuffer;
        messageHash: MessageHash;
    }>;
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
