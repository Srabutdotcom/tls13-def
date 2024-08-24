/**
 * !B.3.4.  Ticket Establishment
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.4
 * *DONE - verified
 */

import { OpaqueVar, Struct, Uint8 } from "./mod.js";

/**
 * NewSessionTicket
 */
export class NewSessionTicket extends Struct {
   type = HandshakeType.new_session_ticket;
   /**
    * 
    * @param {Uint8Array} ticket 
    * @param {Uint8} extension 
    */
   constructor(ticket, extension = new Uint8(0)) {
      const lifetime = new Uint32(7200)//in second
      const ageAdd = new Uint32(0)//in second
      const nonce = new OpaqueVar(new Uint8(0), 0, 255);
      const opaqueTicket = new OpaqueVar(ticket, 1, 2 ** 16 - 1);
      const extensions = new OpaqueVar(extension, 0, 2 ** 16 - 2);
      super(
         lifetime,
         ageAdd,
         nonce,
         opaqueTicket,
         extensions
      )
   }
}