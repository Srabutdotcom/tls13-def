// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/update.d.ts"

/**
 * !B.3.5.  Updating Keys
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.5
 * *DONE - verified
 */

import { Enum, Struct, Uint8 } from "./base.js";
import { Handshake } from "./handshake.js";

/**
 * EndOfEarlyData 
 * ```   
   struct {
      empty
   } EndOfEarlyData;
   ```
    - If the server sent an "early_data" extension in EncryptedExtensions,
   the client MUST send an EndOfEarlyData message after receiving the
   server Finished.  If the server does not send an "early_data"
   extension in EncryptedExtensions, then the client MUST NOT send an
   EndOfEarlyData message.  This message indicates that all 0-RTT
   application_data messages, if any, have been transmitted and that the
   following records are protected under handshake traffic keys.
   Servers MUST NOT send this message, and clients receiving it MUST
   terminate the connection with an "unexpected_message" alert.  This
   message is encrypted under keys derived from the
   client_early_traffic_secret.
   https://datatracker.ietf.org/doc/html/rfc8446#section-4.5
   @extends {Struct}
 */
export class EndOfEarlyData extends Struct {
   static a() { return new EndOfEarlyData }
   payload = this.wrap
   handshake = this.wrap
   constructor() { super() }
   /**
    * 
    * @return {Handshake} message
    */
   wrap() {
      return Handshake.end_of_early_data(this)
   }
}

/**
 * KeyUpdateRequest
 *
 * @extends {Uint8}
 */
class KeyUpdateRequest extends Uint8 {
   /**
    * 
    * @param {0|1} v 
    */
   constructor(v) {
      if ([0, 1].includes(v) == false) throw TypeError(`Expected value 0 or 1`)
      super(v)
   }
}


/**
 * KeyUpdate
 * ```
   enum {
      update_not_requested(0), update_requested(1), (255)
   } KeyUpdateRequest;

 * struct {
      KeyUpdateRequest request_update;
   } KeyUpdate;
   ```

request_update:  Indicates whether the recipient of the KeyUpdate
      should respond with its own KeyUpdate.  If an implementation
      receives any other value, it MUST terminate the connection with an
      "illegal_parameter" alert.

      If the request_update field is set to "update_requested", then the
   receiver MUST send a KeyUpdate of its own with request_update set to
   "update_not_requested" prior to sending its next Application Data
   record.  This mechanism allows either side to force an update to the
   entire connection, but causes an implementation which receives multiple 
   KeyUpdates while it is silent to respond with a single
   update.  Note that implementations may receive an arbitrary number of
   messages between sending a KeyUpdate with request_update set to
   "update_requested" and receiving the peer's KeyUpdate, because those
   messages may already be in flight.  However, because send and receive
   keys are derived from independent traffic secrets, retaining the
   receive traffic secret does not threaten the forward secrecy of data
   sent before the sender changed keys.

   If implementations independently send their own KeyUpdates with
   request_update set to "update_requested" and they cross in flight,
   then each side will also send a response, with the result that each
   side increments by two generations.

   Both sender and receiver MUST encrypt their KeyUpdate messages with
   the old keys.  Additionally, both sides MUST enforce that a KeyUpdate
   with the old key is received before accepting any messages encrypted
   with the new key.  Failure to do so may allow message truncation

   The KeyUpdate handshake message is used to indicate that the sender
   is updating its sending cryptographic keys.  This message can be sent
   by either peer after it has sent a Finished message.  Implementations
   that receive a KeyUpdate message prior to receiving a Finished
   message MUST terminate the connection with an "unexpected_message"
   alert.  After sending a KeyUpdate message, the sender SHALL send all
   its traffic using the next generation of keys, computed as described
   in Section 7.2.  Upon receiving a KeyUpdate, the receiver MUST update
   its receiving keys.

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.3
   @extends {Struct}
 */
export class KeyUpdate extends Struct {
   #keyUpdate
   /**@static */
   static typeDesc = {
      /**@type {0} update_not_requested */
      update_not_requested: 0,
      /**@type {1} update_requested */
      update_requested: 1,
   }

   /**@type {KeyUpdate.typeDesc} types - converted to KeyUpdateRequest */
   static types = new Enum(KeyUpdate.typeDesc, 255, KeyUpdateRequest)

   static update_not_requested = new KeyUpdate(KeyUpdate.types.update_not_requested)
   static update_requested = new KeyUpdate(KeyUpdate.types.update_requested)
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {KeyUpdateRequest} request_update //Uint8[0]|Uint8[1]
    */
   constructor(request_update) {
      if ((request_update instanceof KeyUpdateRequest) == false) throw TypeError(`Expected KeyUpdateRequest type`)
      super(request_update)
      this.#keyUpdate = request_update;
   }
   /**
    * 
    * @return {Handshake} message
    */
   wrap() {
      return Handshake.key_update(this)
   }
   /**
    * 
    * @return {'update_not_requested'|'update_requested'}
    */
   toString(){return KeyUpdate.types.key(this.#keyUpdate)}
}

// npx -p typescript tsc ./src/update.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist


