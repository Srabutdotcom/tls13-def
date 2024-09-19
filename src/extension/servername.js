// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/servername.d.ts"

/**
 * ! 3.  Server Name Indication
 * LINK - https://datatracker.ietf.org/doc/html/rfc6066#section-3
 * TLS does not provide a mechanism for a client to tell a server the
   name of the server it is contacting.  It may be desirable for clients
   to provide this information to facilitate secure connections to
   servers that host multiple 'virtual' servers at a single underlying
   network address.
 */

import { Minmax, Struct, Uint8 } from "../base.js";
import { uint8array } from "@aicone/byte"

/**
 * enum {
 * 
          host_name(0), (255)
      } NameType;

 * struct {
 * 
          NameType name_type;
          select (name_type) {
              case host_name: HostName;
          } name;
      } ServerName;
 */
export class ServerName extends Struct {
   /**
    * 
    * @param {...Uint8Array|string} hostname 
    */
   constructor(...hostname) {
      hostname = hostname.map(e=>uint8array(e))
      super(
         new Uint8(0), // NameType - host_name(0)
         Minmax.min(1).max(65535).byte(...hostname)//new OpaqueVar(hostname, 1, 65535)//<1..2^16-1>
      )
   }
}
/**
 * ServerNameList
 */
export class ServerNameList extends Struct {
   /**
    * ServerNameList
    * @param  {...string} serverName
    * @return ServerNameList 
    */
   static list(...serverName) {
      serverName = serverName.map(name => new ServerName(name));
      return new ServerNameList(...serverName)
   }
   /**
    * 
    * @param {...ServerName} server_name_list <1..2^16-1>
    */
   constructor(...server_name_list) {
      super(
         Minmax.min(1).max(2**16-1).byte(...server_name_list)//new OpaqueVar(server_name_list, 1, 2 ** 16 - 1)
      )
   }
}
