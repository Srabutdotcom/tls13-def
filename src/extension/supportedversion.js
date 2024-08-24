import { OpaqueVar, ProtocolVersion, Struct } from "../mod.js";
import { concat } from "@aicone/byte"

//LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.1
export class SupportedVersions extends Struct {
   constructor(client) {
      /* const tls12 = new ProtocolVersion(0x0303);
      const tls13 = new ProtocolVersion(0x0304); */
      //const versions = client ? new OpaqueVar(concat(tls12,tls13), 2, 254) : tls13
      const versions = client ? new Uint8Array([2, 3, 4]) : new Uint8Array([3, 4])
      super(versions)
   }
}

export function supportedVersion() {
   return {
      client: new SupportedVersions(true) ,
      server: new SupportedVersions()
   }
}

const svClient = supportedVersion().client;
const svServer = supportedVersion().server;
debugger;
