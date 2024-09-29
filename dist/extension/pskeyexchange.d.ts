/**
 * PskKeyExchangeModes
 * ```
 * enum {
      psk_ke(0), psk_dhe_ke(1), (255)
   } PskKeyExchangeMode;
 *
 * struct {
      PskKeyExchangeMode ke_modes<1..255>;
   } PskKeyExchangeModes;
   ```
 */
export class PskKeyExchangeModes extends Struct {
    /**
     * the server MUST NOT supply a "key_share" values
     * @returns Uint8(0)
     */
    static psk_ke(): PskKeyExchangeModes;
    /**
     * the client and server MUST supply "key_share" values
     * @returns Uint8(1)
     */
    static psk_dhe_ke(): PskKeyExchangeModes;
    /**
     *
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): TypeError | PskKeyExchangeModes;
    /**
     * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
     * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
       client and server MUST supply "key_share" values as described in
       Section 4.2.8.
       @param {...PskKeyExchangeMode} ke_mode - description
     */
    constructor(...ke_mode: PskKeyExchangeMode[]);
}
import { Struct } from "../base.js";
declare class PskKeyExchangeMode extends Uint8 {
    static psk_ke: PskKeyExchangeMode;
    static psk_dhe_ke: PskKeyExchangeMode;
    /**
     * @return {'psk_ke'|'psk_dhe_ke'} description
     */
    get name(): "psk_ke" | "psk_dhe_ke";
    #private;
}
import { Uint8 } from "../base.js";
export {};
