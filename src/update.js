/**
 * !B.3.5.  Updating Keys
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.5
 * *DONE - verified
 */

import { Enum, HandshakeType, Struct, Uint8 } from "./mod.js";

/**
 * EndOfEarlyData - If the server sent an "early_data" extension in EncryptedExtensions
   the client MUST send an EndOfEarlyData message after receiving the
   server Finished.
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.5
 */
export class EndOfEarlyData extends Struct {
   type = HandshakeType.end_of_early_data
   constructor() { super() }
}

const keyUpdateRequest_ = {
   /**@type {0} update_not_requested */
   update_not_requested: 0,
   /**@type {1} update_requested */
   update_requested: 1,
   /**@type {255} max */
   [Enum.max]: 255
}

export const KeyUpdateRequest = new Enum({ keyUpdateRequest_ })

/**
 * KeyUpdate
 */
export class KeyUpdate extends Struct {
   type = HandshakeType.key_update;
   /**
    * 
    * @param {Uint8[0]|Uint8[1]} request_update 
    */
   constructor(request_update) {
      request_update = requestUpdate(request_update)
      super(request_update)
   }
}

function requestUpdate(request_update){
   if((typeof request_update =="number")&&[0,1].includes(request_update)){
      return new Uint8(request_update)
   }
   if((request_update instanceof Uint8Array)&&[0,1].includes(request_update[0])){
      return request_update
   }
   throw TypeError(`invalid parameter - ${request_update}`)
}

export function keyUpdateRequest() {
   return {
      update_not_requested(){ return new KeyUpdate(keyUpdateRequest_.update_not_requested)},
      update_requested(){ return new KeyUpdate(keyUpdateRequest_.update_requested)}
   }
}

/* const updateRequested = keyUpdateRequest().update_requested();
debugger; */