/**
 * NewSessionTicket
 * ```
 * struct {
      uint32 ticket_lifetime;
      uint32 ticket_age_add;
      opaque ticket_nonce<0..255>;
      opaque ticket<1..2^16-1>;
      Extension extensions<0..2^16-2>;
   } NewSessionTicket;
   ```
   At any time after the server has received the client Finished
   message, it MAY send a NewSessionTicket message.  This message
   creates a unique association between the ticket value and a secret
   PSK derived from the resumption master secret (see Section 7).

   The client MAY use this PSK for future handshakes by including the
   ticket value in the "pre_shared_key" extension in its ClientHello
   (Section 4.2.11).  Servers MAY send multiple tickets on a single
   connection, either immediately after each other or after specific
   events (see Appendix C.4).  For instance, the server might send a new
   ticket after post-handshake authentication in order to encapsulate
   the additional client authentication state.  Multiple tickets are
   useful for clients for a variety of purposes, including:

   -  Opening multiple parallel HTTP connections.

   -  Performing connection racing across interfaces and address
      families via (for example) Happy Eyeballs [RFC8305] or related
      techniques.

   Any ticket MUST only be resumed with a cipher suite that has the same
   KDF hash algorithm as that used to establish the original connection.

   Clients MUST only resume if the new SNI value is valid for the server
   certificate presented in the original session and SHOULD only resume
   if the SNI value matches the one used in the original session.  The
   latter is a performance optimization: normally, there is no reason to
   expect that different servers covered by a single certificate would
   be able to accept each other's tickets; hence, attempting resumption
   in that case would waste a single-use ticket.  If such an indication
   is provided (externally or by any other means), clients MAY resume
   with a different SNI value.

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.1
   @extends {Struct}
 */
   export class NewSessionTicket extends Struct {
    /**
     *
     * @param {Uint8Array} ticket
     * @param {...Extension} extension
     * @return
     */
    static a(ticket: Uint8Array, ...extension: Extension[]): NewSessionTicket;
    /**
     *
     * @param {Uint8Array} ticket
     * @param {...Extension} extension
     */
    constructor(ticket: Uint8Array, ...extension: Extension[]);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
     * @return {Handshake} message
     */
    wrap(): Handshake;
    #private;
}
import { Struct } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
import { Extension } from "../src/extension/extension.js";
