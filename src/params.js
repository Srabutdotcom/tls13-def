/**!SECTION
 * !B.3.2.  Server Parameters Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.2
 * *DONE - verified
 */

import { HandshakeType, OpaqueVar, Extension } from "./mod.js";

/**
 * opaque DistinguishedName<1..2^16-1>
 */
export class DistinguishedName extends OpaqueVar {
   /**
    * 
    * @param {Uint8Array} distinguishedName 
    */
   constructor(distinguishedName) {
      super(distinguishedName, 1, 2 ** 16 - 1)//<1..2^16-1>
   }
}
/**
 * CertificateAuthoritiesExtension
 */
export class CertificateAuthoritiesExtension extends Struct {
   /**
    * 
    * @param {DistinguishedName} DistinguishedName 
    */
   constructor(DistinguishedName) {
      const authorities = new OpaqueVar(DistinguishedName, 3, 2 ** 16 - 1);
      super(authorities)
   }
}
/**
 * OIDFilter
 */
export class OIDFilter extends Struct {
   /**
    * 
    * @param {Uint8Array} certificate_extension_oid 
    * @param {Uint8Array} certificate_extension_values 
    */
   constructor(certificate_extension_oid, certificate_extension_values) {
      super(
         new OpaqueVar(certificate_extension_oid, 1, 2 ** 8 - 1),
         new OpaqueVar(certificate_extension_values, 0, 2 ** 16 - 1)
      )
   }
}
/**
 * OIDFilterExtension
 */
export class OIDFilterExtension extends Struct {
   /**
    * 
    * @param {OIDFilter} OIDFilter 
    */
   constructor(OIDFilter) {
      const filters = new OpaqueVar(OIDFilter, 0, 2 ** 16 - 1);
      super(filters)
   }
}

/**
 * PostHandshakeAuth
 */
export class PostHandshakeAuth extends Struct {
   constructor() { super() }
}

/**
 * EncryptedExtensions
 */
export class EncryptedExtensions extends Struct {
   type = HandshakeType.encrypted_extensions
   /**
    * 
    * @param {Extension} Extension 
    */
   constructor(Extension) {
      const extensions = new OpaqueVar(Extension, 0, 2 ** 16 - 1);
      super(extensions)
   }
}
/**
 * CertificateRequest
 */
export class CertificateRequest extends Struct {
   type = HandshakeType.certificate_request
   /**
    * 
    * @param {Uint8Array} certificate_request_context 
    * @param {Extension} Extension 
    */
   constructor(certificate_request_context, Extension) {
      const extensions = new OpaqueVar(Extension, 2, 2 ** 16 - 1);
      super(
         new OpaqueVar(certificate_request_context, 0, 2 ** 8 - 1),
         extension
      )
   }
}