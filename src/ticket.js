// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/ticket.d.ts"

/**
 * !B.3.4.  Ticket Establishment
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.4
 * *DONE - verified
 */

import { Struct, Uint32, Uint8 } from "./base.js";
import { Extension, Extensions } from "./extension/extension.js";
import { Handshake } from "./handshake.js";
import { Byte } from "./deps.js"

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
   #lifetime
   #ageAdd
   #nonce
   #ticket
   #extensions
   /**
    * @param {Uint32} lifetime - default: Uint32(7200) - Indicates the lifetime in seconds as a 32-bit
      unsigned integer in network byte order from the time of ticket
      issuance.  Servers MUST NOT use any value greater than
      604800 seconds (7 days).  The value of zero indicates that the
      ticket should be discarded immediately.  Clients MUST NOT cache
      tickets for longer than 7 days, regardless of the ticket_lifetime,
      and MAY delete tickets earlier based on local policy.  A server
      MAY treat a ticket as valid for a shorter period of time than what
      is stated in the ticket_lifetime.
    * @param {Uint32} ageAdd - default: Uint32(0) - A securely generated, random 32-bit value that is
      used to obscure the age of the ticket that the client includes in
      the "pre_shared_key" extension.  The client-side ticket age is
      added to this value modulo 2^32 to obtain the value that is
      transmitted by the client.  The server MUST generate a fresh value
      for each ticket it sends.
    * @param {Uint8Array} nonce - opaque ticket_nonce<0..255>; Uint8Array A per-ticket value that is unique across all tickets
      issued on this connection.
    * @param {Uint8Array} ticket - opaque ticket<1..2^16-1>; The value of the ticket to be used as the PSK identity.  The
      ticket itself is an opaque label.  It MAY be either a database
      lookup key or a self-encrypted and self-authenticated value.
    * @param {Uint8Array} extensions - Extension extensions<0..2^16-2>;
    * @return
    */
   static a(lifetime, ageAdd, nonce , ticket, extensions) {
      return new NewSessionTicket(lifetime, ageAdd, nonce, ticket, extensions)
   }
   payload = this.wrap
   handshake = this.wrap
   /**
    * @constructor
    * @param {Uint32} lifetime - default: Uint32(7200) - Indicates the lifetime in seconds as a 32-bit
      unsigned integer in network byte order from the time of ticket
      issuance.  Servers MUST NOT use any value greater than
      604800 seconds (7 days).  The value of zero indicates that the
      ticket should be discarded immediately.  Clients MUST NOT cache
      tickets for longer than 7 days, regardless of the ticket_lifetime,
      and MAY delete tickets earlier based on local policy.  A server
      MAY treat a ticket as valid for a shorter period of time than what
      is stated in the ticket_lifetime.
    * @param {Uint32} ageAdd - default: Uint32(0) - A securely generated, random 32-bit value that is
      used to obscure the age of the ticket that the client includes in
      the "pre_shared_key" extension.  The client-side ticket age is
      added to this value modulo 2^32 to obtain the value that is
      transmitted by the client.  The server MUST generate a fresh value
      for each ticket it sends.
    * @param {Uint8Array} nonce - opaque ticket_nonce<0..255>; Uint8Array A per-ticket value that is unique across all tickets
      issued on this connection.
    * @param {Uint8Array} ticket - opaque ticket<1..2^16-1>; The value of the ticket to be used as the PSK identity.  The
      ticket itself is an opaque label.  It MAY be either a database
      lookup key or a self-encrypted and self-authenticated value.
    * @param {Uint8Array} extensions - Extension extensions<0..2^16-2>;
    */
   constructor(lifetime = new Uint32(7200), ageAdd = new Uint32(0), nonce = new Uint8(0), ticket, extensions = Extensions.newSessionTicket()) {
      super(
         lifetime, // lifetime
         ageAdd, // ageAdd
         nonce, // nonce
         ticket, // opaqueTicket
         extensions 
      )
      this.#lifetime = lifetime
      this.#ageAdd = ageAdd
      this.#nonce = nonce
      this.#ticket = ticket
      this.#extensions = extensions
   }
   get lifetime(){return this.#lifetime}
   get ageAdd(){return this.#ageAdd}
   get nonce(){return this.#nonce}
   get ticket(){return this.#ticket}
   get extensions(){return this.#extensions}
   /**
    * @return {Handshake} message
    */
   wrap() {
      return Handshake.new_session_ticket(this)
   }
   static sequence = [
      {
         name: "ticket_lifetime",
         value(octet) {
            return octet.subarray(0,4);
         }
      },
      {
         name: "ticket_age_add",
         value(octet) {
            return octet.subarray(0,4);;
         }
      },
      {
         name: "ticket_nonce",
         value(octet) {
            const length = Byte.get.BE.b8(octet);
            return octet.subarray(0, 1 + length);
         }
      },
      {
         name: "ticket",
         value(octet) {
            const length = Byte.get.BE.b16(octet);
            return octet.subarray(0, 2 + length);
         }
      },
      {
         name: "extensions",
         value(octet) {
            const length = Byte.get.BE.b16(octet);
            const value = octet.subarray(2, 2 + length);
            return Extension.parse(value, "newSessionTicket")
         }
      },
   ]
   
   /**
    * Parse NewSessionTicket
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {NewSessionTicket}
    */
   static parse(octet) {
      const data = {}
      let offset = 0;
      for (const { name, value } of NewSessionTicket.sequence) {
         data[name] = value(octet.subarray(offset));
         offset += data[name].length
      }
      const { ticket_lifetime, ticket_age_add, ticket_nonce, ticket, extensions } = data
      return NewSessionTicket.a(ticket_lifetime, ticket_age_add, ticket_nonce, ticket, extensions)
   }
}

// npx -p typescript tsc ./src/ticket.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist