/**
 * !B.3.1.4.  Supported Groups Extension
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.4
 */

import { Enum, OpaqueVar, Struct } from "../mod.js";
import { concat } from "@aicone/byte"

export const namedGroup = {
   /* unallocated_RESERVED(0x0000), */

   /* Elliptic Curve Groups (ECDHE) */
   //obsolete_RESERVED(0x0001..0x0016),
   /**@type {[0x00, 0x17]} secp256r1  */
   secp256r1: new Uint8Array([0x00, 0x17]),
   /**@type {[0x00, 0x18]} secp384r1  */
   secp384r1: new Uint8Array([0x00, 0x18]),
   /**@type {[0x00, 0x19]} secp521r1  */
   secp521r1: new Uint8Array([0x00, 0x19]),
   //obsolete_RESERVED(0x001A..0x001C),
   /**@type {[0x00, 0x1D]} x25519  */
   x25519: new Uint8Array([0x00, 0x1D]),
   /**@type {[0x00, 0x1E]} x448  */
   x448: new Uint8Array([0x00, 0x1E]),

   /* Finite Field Groups (DHE) */
   /**@type {[0x01, 0x00]} ffdhe2048  */
   ffdhe2048: new Uint8Array([0x01, 0x00]),
   /**@type {[0x01, 0x01]} ffdhe3072  */
   ffdhe3072: new Uint8Array([0x01, 0x01]),
   /**@type {[0x01, 0x02]} ffdhe3072  */
   ffdhe4096: new Uint8Array([0x01, 0x02]),
   /**@type {[0x01, 0x03]} ffdhe3072  */
   ffdhe6144: new Uint8Array([0x01, 0x03]),
   /**@type {[0x01, 0x04]} ffdhe3072  */
   ffdhe8192: new Uint8Array([0x01, 0x04]),

   /* Reserved Code Points */
   /* ffdhe_private_use(0x01FC..0x01FF),
   ecdhe_private_use(0xFE00..0xFEFF),
   obsolete_RESERVED(0xFF01..0xFF02), */
   /**@type {[0xFF, 0xFF]} max  */
   [Enum.max]: new Uint8Array([0xFF, 0xFF])
}

export const NamedGroup = new Enum(namedGroup)

export class NamedGroupList extends Struct {
   constructor() {
      const named_group_list = [
         NamedGroup.secp256r1,
         NamedGroup.secp384r1,
         NamedGroup.secp521r1,
         NamedGroup.x25519
      ]

      super(
         new OpaqueVar(concat(...named_group_list), 2, 65534)
      )
   }
}
