// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/params.d.ts"

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
 * CertificateAuthoritiesExtension
 * ```
 * struct {
 *    DistinguishedName authorities<3..2^16-1>;
   } CertificateAuthoritiesExtension;
   ```
 */
export class CertificateAuthoritiesExtension extends Struct {
   #distinguishedName
   /**
    * Create CertificateAuthoritiesExtension
    * @param {...DistinguishedName} authorities
    */
   static a(...authorities){ return new CertificateAuthoritiesExtension(...authorities)}
   /**
    * 
    * @param {...DistinguishedName} authorities 
    */
   constructor(...authorities) {
      super(
         new Minmax(3, 2 ** 16 - 1, ...authorities)
      )
      this.#distinguishedName = authorities
   }
   get distinguishedName(){return this.#distinguishedName}
}
/**
 * Certificate_extension_oid
 * `opaque certificate_extension_oid<1..2^8-1>;`
 */
export class Certificate_extension_oid extends Minmax {
   #oid
   /**
    * Create Certificate_extension_oid
    * @param  {Uint8Array} oid 
    */
   static a(oid){ return new Certificate_extension_oid(oid)}
   /**
    * 
    * @param  {Uint8Array} oid 
    */
   constructor(oid) { 
      super(1, 2 ** 8 - 1, oid)
      this.#oid = oid
   }
   get oid(){return this.#oid}
}
/**
 * Certificate_extension_values
 * `opaque certificate_extension_values<0..2^16-1>;`
 */
export class Certificate_extension_values extends Minmax {
   #certificate_extension_values
   /**
    * Create Certificate_extension_values
    * @param  {...Uint8Array} values 
    */
   static a(...values){ return new Certificate_extension_values(...values)}
   /**
    * 
    * @param  {...Uint8Array} values 
    */
   constructor(...values) { 
      super(0, 2 ** 16 - 1, ...values)
      this.#certificate_extension_values = values
   }
   get certificate_extension_values(){return this.#certificate_extension_values}
}
/**
 * OIDFilter
 * ```
 * struct {
      opaque certificate_extension_oid<1..2^8-1>;
      opaque certificate_extension_values<0..2^16-1>;
   } OIDFilter;
   ```
 */
export class OIDFilter extends Struct {
   #oid
   #certificate_extension_values
   /**
    * 
    * @param  {...Uint8Array} oids 
    * @returns 
    */
   static certificate_extension_oid(oids) {
      oids = new Certificate_extension_oid(oids)
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
      this.#oid = certificate_extension_oid
      this.#certificate_extension_values = certificate_extension_values
   }
   get oid(){return this.#oid}
   get certificate_extension_values(){return this.#certificate_extension_values}
}

/**
 * OIDFilterExtension
 * ```
 * struct {
      OIDFilter filters<0..2^16-1>;
   } OIDFilterExtension;
   ```
 */
export class OIDFilterExtension extends Struct {
   #oidFilters
   /**
    * Create OIDFilterExtension
    * @param  {...OIDFilter} OIDFilters 
    * @returns 
    */
   static a(...OIDFilters){ return new OIDFilterExtension(...OIDFilters)}
   /**
    * 
    * @param {...OIDFilter} OIDFilters 
    */
   constructor(...OIDFilters) {
      super(
         new Minmax(0, 2 ** 16 - 1, ...OIDFilters)
      )
      this.#oidFilters = OIDFilters
   }
   get oidFilters(){return this.#oidFilters}
}

/**
 * PostHandshakeAuth
 * ```
 * struct {} PostHandshakeAuth;
 * ```
 */
export class PostHandshakeAuth extends Struct {
   static a(){return new PostHandshakeAuth}
   constructor() { super() }
}

/**
 * EncryptedExtensions
 * ```
 * struct {
      Extension extensions<0..2^16-1>;
   } EncryptedExtensions;
   ```
 */
export class EncryptedExtensions extends Struct {
   #extensions
   /**
    * Create EncryptedExtensions
    * @param {...Extension} extensions 
    */
   static a(...extensions){ return new EncryptedExtensions(...extensions)}
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
         Extensions.encryptedExtensions(...extensions)
      )
      this.#extensions = extensions
   }
   get extensions(){return this.#extensions}
   /**
    * 
    * @return {Handshake} message
    */
   wrap(){
      return Handshake.encrypted_extensions(this)
   }
}

/**
 * CertificateRequest
 * ```
 * struct {
      opaque certificate_request_context<0..2^8-1>;
      Extension extensions<2..2^16-1>;
   } CertificateRequest;
   ```

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
   #signature_algo
   /**
    * Create CertificateRequest
    * @param {SignatureSchemeList} signature_algorithms - Uint8Array of signature algorithm
    */
   static a(signature_algorithms=SignatureSchemeList.list()) { return new CertificateRequest(signature_algorithms) }
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {SignatureSchemeList} signature_algorithms - Uint8Array of signature algorithm
    */
   constructor(signature_algorithms=SignatureSchemeList.list()) {
      super(
         new Uint8(0),
         Extensions.certificateRequest(Extension.a(signature_algorithms, Extension.types.signature_algorithms))
      )
      this.#signature_algo = signature_algorithms
   }
   get signature_algo(){ return this.#signature_algo}
   /**
    * 
    * @return {Handshake} message
    */
   wrap(){
      return Handshake.certificate_request(this)
   }
}

//npx -p typescript tsc ./src/params.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist

