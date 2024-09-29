// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/supportedversion.d.ts"

import { Minmax, Struct } from "../base.js";
import { ProtocolVersion } from "../keyexchange.js";
import { Byte } from "../deps.js"

/**
 * SupportedVersions
 * ```
 * struct {
      select (Handshake.msg_type) {
         case client_hello:
               ProtocolVersion versions<2..254>;

         case server_hello: // and HelloRetryRequest 
         ProtocolVersion selected_version;
      };
   } SupportedVersions;
   ```

 * The "supported_versions" extension is used by the client to indicate
   which versions of TLS it supports and by the server to indicate which
   version it is using.  The extension contains a list of supported
   versions in preference order, with the most preferred version first.
   Implementations of this specification MUST send this extension in the
   ClientHello containing all versions of TLS which they are prepared to
   negotiate (for this specification, that means minimally 0x0304, but
   if previous versions of TLS are allowed to be negotiated, they MUST
   be present as well).

   https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.1
 */
export class SupportedVersions extends Struct {
   /**
    * @param {SelectedVersion|Versions} versions - description 
    */
   static a(versions) { return new SupportedVersions(versions) }
   /**
    * 
    * @returns SupportedVersions - for client new Uint8Array([2, 3, 4])
    */
   static client() { return new SupportedVersions(Versions.a(ProtocolVersion.version.TLS13)) }
   /**
    * 
    * @returns SupportedVersions - for server new Uint8Array([3, 4])
    */
   static server() { return new SupportedVersions(SelectedVersion.a()) }
   /**
    * 
    * @returns SupportedVersions - for server new Uint8Array([3, 4])
    */
   static retry() { return new SupportedVersions(SelectedVersion.a()) }
   /**
    * @param {SelectedVersion|Versions} versions - description 
    */
   constructor(versions) {
      super(versions)
   }
   /**
    * @param {Uint8Array} data 
    * @param {"ClientHello"|"ServerHello"|"KeyShareHelloRetryRequest"} klas - description
    */
   static parse(data, klas) {
      if (klas == "ClientHello") {
         let pos = 0;
         const versions = []
         /* const length = Byte.get.BE.b8(data) */; pos += 1;
         while (true) {
            const code = Byte.get.BE.b16(data, pos); pos += 2;
            versions.push(ProtocolVersion.a(code));
            if (pos >= data.length - 1) break
         }
         return SupportedVersions.a(Versions.a(...versions))
      }
      return SelectedVersion.a(Byte.get.BE.b16(data))
   }
}

class Versions extends Minmax {
   /**
    * 
    * @param  {...ProtocolVersion} versions 
    */
   static a(...versions) { return new Versions(...versions) }
   /**
    * 
    * @param  {...ProtocolVersion} versions 
    */
   constructor(...versions) {
      super(2, 254, ...versions)
   }
}

class SelectedVersion extends ProtocolVersion {
   /**
    * 
    * @param {ProtocolVersion} val 
    */
   static a(val) { return new SelectedVersion(val) }
   /**
    * 
    * @param {ProtocolVersion} val 
    */
   constructor(val) {
      super(val ?? ProtocolVersion.version.TLS13.value())
   }
}
