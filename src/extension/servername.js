/**
 * ! 3.  Server Name Indication
 * LINK - https://datatracker.ietf.org/doc/html/rfc6066#section-3
 */

import { OpaqueVar, Struct } from "../mod.js";
import { uint8array } from "@aicone/byte"

/**
 * ServerName - SNI
 */
export class ServerName extends Struct {
   /**
    * 
    * @param {string|Uint8Array} hostname 
    */
   constructor(hostname) {
      hostname = uint8array(hostname)
      const NameType = new Uint8(0)
      super(
         NameType,
         new OpaqueVar(hostname, 1, 65535)//<1..2^16-1>
      )
   }
}
/**
 * ServerNameList
 */
export class ServerNameList extends Struct {
   /**
    * 
    * @param {ServerName} server_name_list <1..2^16-1>
    */
   constructor(server_name_list) {
      super(
         new OpaqueVar(server_name_list,1, 2 ** 16 - 1)
      )
   }
}