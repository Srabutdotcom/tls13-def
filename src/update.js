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
 * EndOfEarlyData - If the server sent an "early_data" extension in EncryptedExtensions,
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
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.5
   
   struct {
   
         empty
    } EndOfEarlyData;
 */
export class EndOfEarlyData extends Struct {
   static new() { return new EndOfEarlyData }
   payload = this.wrap
   handshake = this.wrap
   constructor() { super() }
   /**
    * 
    * @returns Hanshake message
    */
   wrap() {
      return Handshake.end_of_early_data(this)
   }
}

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
 * The KeyUpdate handshake message is used to indicate that the sender
   is updating its sending cryptographic keys.  This message can be sent
   by either peer after it has sent a Finished message.  Implementations
   that receive a KeyUpdate message prior to receiving a Finished
   message MUST terminate the connection with an "unexpected_message"
   alert.  After sending a KeyUpdate message, the sender SHALL send all
   its traffic using the next generation of keys, computed as described
   in Section 7.2.  Upon receiving a KeyUpdate, the receiver MUST update
   its receiving keys.
 * 
   enum {

          update_not_requested(0), update_requested(1), (255)
      } KeyUpdateRequest;

 * struct {
 * 
          KeyUpdateRequest request_update;
      } KeyUpdate;

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

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.3
 */
export class KeyUpdate extends Struct {
   static {
      const types = {
         /**@type {Uint8[0]} update_not_requested */
         update_not_requested: 0,
         /**@type {Uint8[1]} update_requested */
         update_requested: 1,
         [Enum.max]: 255,
         [Enum.class]: KeyUpdateRequest
      }
      /**
       * @type {types} this.types - description
       */
      this.types = new Enum(types)
   }
   static {
      this.update_not_requested = new KeyUpdate(KeyUpdate.types.update_not_requested)
      this.update_requested = new KeyUpdate(KeyUpdate.types.update_requested)
   }
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {KeyUpdateRequest} request_update //Uint8[0]|Uint8[1]
    */
   constructor(request_update) {
      if ((request_update instanceof KeyUpdateRequest) == false) throw TypeError(`Expected KeyUpdateRequest type`)
      super(request_update)
   }
   /**
    * 
    * @returns Hanshake message
    */
   wrap() {
      return Handshake.key_update(this)
   }
}



