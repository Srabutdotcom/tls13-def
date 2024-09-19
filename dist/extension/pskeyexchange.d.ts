/**
 * enum {
  
         psk_ke(0), psk_dhe_ke(1), (255)
      } PskKeyExchangeMode;
 *
 * struct {
 *
          PskKeyExchangeMode ke_modes<1..255>;
      } PskKeyExchangeModes;
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
     * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
     * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
       client and server MUST supply "key_share" values as described in
       Section 4.2.8.
     */
    constructor(...ke_mode: any[]);
}
import { Struct } from "../base.js";
