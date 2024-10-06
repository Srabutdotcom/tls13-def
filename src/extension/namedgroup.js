// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/namedgroup.d.ts"

/**
 * !B.3.1.4.  Supported Groups Extension
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.4
 */

import { Uint16, Enum, Struct, Minmax } from "../base.js";
import { Byte } from "../deps.js"

/**
 * NamedGroup - a single namedGroup i.e. 0x001D - X25519
 */
export class NamedGroup extends Uint16 {
   #value; //
   /**
    * @param {number} v 
    */
   static a(v) { return new NamedGroup(v) }
   /* Elliptic Curve Groups (ECDHE) */
   //obsolete_RESERVED(0x0001..0x0016),
   static secp256r1 = NamedGroup.a(0x0017)
   static secp384r1 = NamedGroup.a(0x0018)
   static secp521r1 = NamedGroup.a(0x0019)
   static x25519 = NamedGroup.a(0x001D)
   static x448= NamedGroup.a(0x001E)
   /* Finite Field Groups (DHE) */
   static ffdhe2048 = NamedGroup.a(0x0100)
   static ffdhe3072 = NamedGroup.a(0x0101)
   static ffdhe4096 = NamedGroup.a(0x0102)
   static ffdhe6144 = NamedGroup.a(0x0103)
   static ffdhe8192 = NamedGroup.a(0x0104)
   /**
    * 
    * @param {number} v 
    */
   constructor(v) {
      super(v)
      this.#value = v
   }
   /**
    * @return {string} description
    */
   get name() { return NamedGroupList.namedGroup.key(this.#value) }
   toString(){ return this.name}
}

/**
 * NamedGroupList - contain list of NamedGroup from 0x0017 - secp256r1 to 0x0104 - ffdhe8192
 * ```
 * struct {
      NamedGroup named_group_list<2..2^16-1>;
   } NamedGroupList;
   ```
 */
export class NamedGroupList extends Struct {
   #named_group_list
   /**
    * 
    * @return {NamedGroupList} 
    */
   static list() { return new NamedGroupList }
   /**
    * create new NamedGroupList
    * @param  {...NamedGroup} ngl - Uint16 - named_group_list
    */
   static a(...ngl){ return new NamedGroupList(...ngl)}
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
   /**
    * @param  {...NamedGroup} ngl - Uint16 - named_group_list
    */
   constructor(...ngl) {
      const named_group_list = ngl.length ? ngl : [
         NamedGroup.secp256r1,
         NamedGroup.secp384r1,
         NamedGroup.secp521r1,
         NamedGroup.x25519,
      ]

      super(
         Minmax.min(2).max(65534).byte(...named_group_list)//new OpaqueVar(concat(...named_group_list), 2, 65534)
      )
      this.#named_group_list = named_group_list
   }
   get named_group_list(){return this.#named_group_list}
   /**
    * @param {Uint8Array} data 
    */
   static parse(data) {
      let pos = 0;
      const named_group_list = []
      /* const length = Byte.get.BE.b16(data) */; pos += 2;
      while (true) {
         const namedGroup = new NamedGroup(Byte.get.BE.b16(data, pos)); pos += 2;
         named_group_list.push(namedGroup)
         if (pos >= data.length - 1) break
      }
      //return named_group_list
      return new NamedGroupList(...named_group_list)
   }
}

//[0, 18, 0, 29, 0, 23, 0, 24, 0, 25, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4]