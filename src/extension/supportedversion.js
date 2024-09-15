import { Struct } from "../base.js";

/**
 * 
 * struct {
 * 
          select (Handshake.msg_type) {
              case client_hello:
                   ProtocolVersion versions<2..254>;

              case server_hello: // and HelloRetryRequest 
              ProtocolVersion selected_version;
            };
        } SupportedVersions;

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
    * 
    * @returns SupportedVersions - for client new Uint8Array([2, 3, 4])
    */
   static client(){ return new SupportedVersions(true)}
   /**
    * 
    * @returns SupportedVersions - for server new Uint8Array([3, 4])
    */
   static server(){ return new SupportedVersions()}
   /**
    * 
    * @returns SupportedVersions - for server new Uint8Array([3, 4])
    */
   static retry(){ return new SupportedVersions()}
   /**
    * 
    * @param {boolean} client - true if it is for client 
    */
   constructor(client) {
      const versions = client ? new Uint8Array([2, 3, 4]) : new Uint8Array([3, 4])
      super(versions)
   }
}
