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
import { Byte, uint8array } from "../deps.js"

class HostName extends Uint8 {
   static a = new HostName
   constructor() { super(0) }
}

/**
 * ServerName
 * ```
 * enum {
      host_name(0), (255)
   } NameType;

 * struct {
      NameType name_type;
      select (name_type) {
         case host_name: HostName;
      } name;
   } ServerName;
   
   opaque HostName<1..2^16-1>;
   ```
 */
export class ServerName extends Struct {
   #hostname
   /**
    * 
    * @param {Uint8Array|string} hostname 
    */
   static a(hostname) { return new ServerName(hostname) }
   /**
    * @param {Uint8Array|string} hostname 
    */
   constructor(hostname) {
      hostname = uint8array(hostname)
      super(
         HostName.a, // NameType - host_name(0)
         Minmax.min(1).max(65535).byte(hostname)//new OpaqueVar(hostname, 1, 65535)//<1..2^16-1>
      )
      this.#hostname = hostname
   }
   /**
    * @return {string} hostname
    */
   get hostname() {
      const dec = new TextDecoder;
      return dec.decode(this.#hostname)
   }
   toString() { return this.hostname }
}
/**
 * ServerNameList
 * ```
 * struct {
      NameType name_type;
      select (name_type) {
         case host_name: HostName;
      } name;
   } ServerName;

   enum {
         host_name(0), (255)
   } NameType;

   opaque HostName<1..2^16-1>;

   struct {
         ServerName server_name_list<1..2^16-1>
   } ServerNameList;
   ```
 */
export class ServerNameList extends Struct {
   #serverNames = []
   /**
    * ServerNameList
    * @param  {...string} serverName
    * @return ServerNameList 
    */
   static list(...serverName) {
      if (serverName.length == 0) throw TypeError(`Expected at least one servername`)
      serverName = serverName.map(name => new ServerName(name))
      return new ServerNameList(...serverName)
   }
   /**
    * @param {...ServerName} server_name_list <1..2^16-1>
    */
   constructor(...server_name_list) {
      super(
         Minmax.min(1).max(2 ** 16 - 1).byte(...server_name_list)//new OpaqueVar(server_name_list, 1, 2 ** 16 - 1)
      )
      for (const serverName of server_name_list) {
         this.#serverNames.push(serverName.hostname)
      }
   }
   get serverNames() { return this.#serverNames }

   /**
    * 
    * @param {Uint8Array} data 
    */
   static parse(data) {
      if (data.length == 0) return new Uint8Array;
      let pos = 0;
      const serverNames = []
      const lengthTotal = Byte.get.BE.b16(data); pos += 2;
      while (true) {
         /* const name_type = Byte.get.BE.b8(data, pos) */; pos += 1
         // TODO throw Error if name_type !== 0 
         const length = Byte.get.BE.b16(data, pos); pos += 2;
         const hostname = data.subarray(pos, pos + length); pos += length;
         serverNames.push(hostname);
         //serverNames.push({hostname})
         if (pos >= lengthTotal - 1) break
      }
      //return serverNames
      return ServerNameList.list(...serverNames)
   }
}

//npx -p typescript tsc ./src/extension/servername.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
