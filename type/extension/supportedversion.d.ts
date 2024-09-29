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
    static a(versions: SelectedVersion | Versions): SupportedVersions;
    /**
     *
     * @returns SupportedVersions - for client new Uint8Array([2, 3, 4])
     */
    static client(): SupportedVersions;
    /**
     *
     * @returns SupportedVersions - for server new Uint8Array([3, 4])
     */
    static server(): SupportedVersions;
    /**
     *
     * @returns SupportedVersions - for server new Uint8Array([3, 4])
     */
    static retry(): SupportedVersions;
    /**
     * @param {Uint8Array} data
     * @param {"ClientHello"|"ServerHello"|"KeyShareHelloRetryRequest"} klas - description
     */
    static parse(data: Uint8Array, klas: "ClientHello" | "ServerHello" | "KeyShareHelloRetryRequest"): SupportedVersions | SelectedVersion;
    /**
     * @param {SelectedVersion|Versions} versions - description
     */
    constructor(versions: SelectedVersion | Versions);
}
import { Struct } from "../../src/base.js";
declare class SelectedVersion extends ProtocolVersion {
    /**
     *
     * @param {number} val
     */
    static a(val: number): SelectedVersion;
    /**
     *
     * @param {number} val
     */
    constructor(val: number);
}
declare class Versions extends Minmax {
    /**
     *
     * @param  {...ProtocolVersion} versions
     */
    static a(...versions: ProtocolVersion[]): Versions;
    /**
     *
     * @param  {...ProtocolVersion} versions
     */
    constructor(...versions: ProtocolVersion[]);
}
import { ProtocolVersion } from "../../src/keyexchange.js";
import { Minmax } from "../../src/base.js";
export {};
