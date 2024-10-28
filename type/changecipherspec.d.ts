/**
 * ChangeCipherSpec
 * ```
 * produce Uint8[1]
 * ```
 * https://www.rfc-editor.org/rfc/rfc5246#section-7.1
 * @extends {Uint8}
 */
export class ChangeCipherSpec extends Uint8 {
    static a(): ChangeCipherSpec;
    /**
     * parse octet if value.at(0) == 1 return ChangeCipherSpec
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {ChangeCipherSpec}
     */
    static parse(octet: Uint8Array): ChangeCipherSpec;
    constructor();
}
import { Uint8 } from "../src/base.js";
