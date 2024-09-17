/**!SECTION
 * !B.3.2.  Server Parameters Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.2
 * *DONE - verified
 */

import { Uint8 } from "./base.js";
import { Minmax, Struct } from "./base.js";
import { Extension, Extensions } from "./extension/extension.js";
import { SignatureSchemeList } from "./extension/signaturescheme.js";
import { Handshake } from "./handshake.js";

/**
 * 
 * opaque DistinguishedName<1..2^16-1>
 */
export class DistinguishedName extends Minmax {
   /**
    * 
    * @param {...Uint8Array} distinguishedName 
    */
   constructor(...distinguishedName) {
      super(1, 2 ** 16 - 1, ...distinguishedName)//<1..2^16-1>
   }
}
/**
 * struct {
 * 
          DistinguishedName authorities<3..2^16-1>;
      } CertificateAuthoritiesExtension;
 */
export class CertificateAuthoritiesExtension extends Struct {
   /**
    * 
    * @param {...DistinguishedName} authority 
    */
   constructor(...authority) {
      super(
         new Minmax(3, 2 ** 16 - 1, ...authority)
      )
   }
}
/**
 * opaque certificate_extension_oid<1..2^8-1>;
 */
export class Certificate_extension_oid extends Minmax {
   /**
    * 
    * @param  {...Uint8Array} oids 
    */
   constructor(...oids) { super(1, 2 ** 8 - 1, ...oids) }
}
/**
 * opaque certificate_extension_values<0..2^16-1>;
 */
export class Certificate_extension_values extends Minmax {
   /**
    * 
    * @param  {...Uint8Array} values 
    */
   constructor(...values) { super(0, 2 ** 16 - 1, ...values) }
}
/**
 * struct {
 * 
         opaque certificate_extension_oid<1..2^8-1>;
         opaque certificate_extension_values<0..2^16-1>;
   } OIDFilter;
 */
export class OIDFilter extends Struct {
   /**
    * 
    * @param  {...Uint8Array} oids 
    * @returns 
    */
   static certificate_extension_oid(...oids) {
      oids = new Certificate_extension_oid(...oids)
      return {
         /**
          * 
          * @param  {...Uint8Array} values 
          * @returns 
          */
         certificate_extension_values(...values) {
            values = new Certificate_extension_values(...values);
            return new OIDFilter(oids, values)
         }
      }
   }
   /**
    * 
    * @param {Certificate_extension_oid} certificate_extension_oid 
    * @param {Certificate_extension_values} certificate_extension_values 
    */
   constructor(certificate_extension_oid, certificate_extension_values) {
      if (certificate_extension_oid instanceof Certificate_extension_oid == false) throw TypeError(`Expected Certificate_extension_oid type`)
      if (certificate_extension_values instanceof Certificate_extension_values == false) throw TypeError(`Expected certificate_extension_values type`)
      super(
         certificate_extension_oid,
         certificate_extension_values
      )
   }
}

/**
 * struct {
 * 
       OIDFilter filters<0..2^16-1>;
    } OIDFilterExtension;
 */
export class OIDFilterExtension extends Struct {
   /**
    * 
    * @param {OIDFilter} OIDFilter 
    */
   constructor(...OIDFilters) {
      super(
         new Minmax(0, 2 ** 16 - 1, ...OIDFilters)
      )
   }
}

/**
 * struct {} PostHandshakeAuth;
 */
export class PostHandshakeAuth extends Struct {
   constructor() { super() }
}

/**
 * struct {
 * 
       Extension extensions<0..2^16-1>;
   } EncryptedExtensions;
 */
export class EncryptedExtensions extends Struct {
   static new(...extensions){ return new EncryptedExtensions(...extensions)}
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {...Extension} extensions 
    */
   constructor(...extensions) {
      if (extensions.length > 0) {
         if (extensions.every(e => e instanceof Extension) == false) throw TypeError(`Expected ...Extension`)
      }
      super(
         Extensions.new(0, 2 ** 16 - 1, ...extensions)
      )
   }
   /**
    * 
    * @returns Hanshake message
    */
   wrap(){
      return Handshake.encrypted_extensions(this)
   }
}

/**
 * struct {
 * 
       opaque certificate_request_context<0..2^8-1>;
       Extension extensions<2..2^16-1>;
   } CertificateRequest;

   certificate_request_context:  This field SHALL be zero
      length unless used for the post-handshake authentication exchanges
      described in Section 4.6.2.

   extensions:  A set of extensions describing the parameters of the
      certificate being requested.  The "signature_algorithms" extension
      MUST be specified, and other extensions may optionally be included
      if defined for this message.  Clients MUST ignore unrecognized
      extensions.
   
 */
export class CertificateRequest extends Struct {
   /**
    * 
    * @param {Uint8Array} signature_algorithms - Uint8Array of signature algorithm
    */
   static new(signature_algorithms=SignatureSchemeList.list()) { return new CertificateRequest(signature_algorithms) }
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {Uint8Array} signature_algorithms - Uint8Array of signature algorithm
    */
   constructor(signature_algorithms=SignatureSchemeList.list()) {
      super(
         new Uint8(0),
         Extensions.new(2, 2 ** 16 - 1, Extension.new(signature_algorithms, Extension.types.signature_algorithms))
      )
   }
   /**
    * 
    * @returns Hanshake message
    */
   wrap(){
      return Handshake.certificate_request(this)
   }
}

