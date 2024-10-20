/**
 * RecordSizeLimit
 *
 * @export
 * @class RecordSizeLimit
 * @extends {Uint16}
 */
export class RecordSizeLimit extends Uint16 {
    /**
     * Parse RecordSizeLimit
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {RecordSizeLimit}
     */
    static parse(octet: Uint8Array): RecordSizeLimit;
}
import { Uint16 } from "../../src/base.js";
