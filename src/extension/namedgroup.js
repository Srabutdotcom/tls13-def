// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/namedgroup.d.ts"

/**
 * !B.3.1.4.  Supported Groups Extension
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.4
 */

import { Uint16, Enum, Struct, Minmax } from "../base.js";

export class NamedGroup extends Uint16 {
   #value; //
   constructor(v) {
      super(v)
      this.#value = v
   }
   get name() { return NamedGroupList.namedGroup.key(this.#value) }
}

export class NamedGroupList extends Struct {
   static list() { return new NamedGroupList }
   static namedGroup = new Enum({
      /* unallocated_RESERVED(0x0000), */

      /* Elliptic Curve Groups (ECDHE) */
      //obsolete_RESERVED(0x0001..0x0016),
      /**@type {0x0017} secp256r1  */
      secp256r1: 0x0017,
      /**@type {0x0018} secp384r1  */
      secp384r1: 0x0018,
      /**@type {0x0019} secp521r1  */
      secp521r1: 0x0019,
      //obsolete_RESERVED(0x001A..0x001C),
      /**@type {0x001D} x25519  */
      x25519: 0x001D,
      /**@type {0x001E} x448  */
      x448: 0x001E,

      /* Finite Field Groups (DHE) */
      /**@type {0x0100} ffdhe2048  */
      ffdhe2048: 0x0100,
      /**@type {0x0101} ffdhe3072  */
      ffdhe3072: 0x0101,
      /**@type {0x0102} ffdhe3072  */
      ffdhe4096: 0x0102,
      /**@type {0x0103} ffdhe3072  */
      ffdhe6144: 0x0103,
      /**@type {0x0104} ffdhe3072  */
      ffdhe8192: 0x0104,

      /* Reserved Code Points */
      /* ffdhe_private_use(0x01FC..0x01FF),
      ecdhe_private_use(0xFE00..0xFEFF),
      obsolete_RESERVED(0xFF01..0xFF02), */
      /**@type {0xFFFF} max  */
      [Enum.max]: 0xFFFF,
      [Enum.class]: NamedGroup
   })
   constructor() {
      const { namedGroup } = NamedGroupList;
      const named_group_list = [
         namedGroup.secp256r1,
         namedGroup.secp384r1,
         namedGroup.secp521r1,
         namedGroup.x25519,
      ]

      super(
         Minmax.min(2).max(65534).byte(...named_group_list)//new OpaqueVar(concat(...named_group_list), 2, 65534)
      )
   }
}

