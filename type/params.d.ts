/**
 *
 * opaque DistinguishedName<1..2^16-1>
 */
export class DistinguishedName extends Minmax {
    /**
     *
     * @param {...Uint8Array} distinguishedName
     */
    constructor(...distinguishedName: Uint8Array[]);
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
    constructor(...authority: DistinguishedName[]);
}
/**
 * opaque certificate_extension_oid<1..2^8-1>;
 */
export class Certificate_extension_oid extends Minmax {
    /**
     *
     * @param  {...Uint8Array} oids
     */
    constructor(...oids: Uint8Array[]);
}
/**
 * opaque certificate_extension_values<0..2^16-1>;
 */
export class Certificate_extension_values extends Minmax {
    /**
     *
     * @param  {...Uint8Array} values
     */
    constructor(...values: Uint8Array[]);
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
    static certificate_extension_oid(...oids: Uint8Array[]): {
        /**
         *
         * @param  {...Uint8Array} values
         * @returns
         */
        certificate_extension_values(...values: Uint8Array[]): OIDFilter;
    };
    /**
     *
     * @param {Certificate_extension_oid} certificate_extension_oid
     * @param {Certificate_extension_values} certificate_extension_values
     */
    constructor(certificate_extension_oid: Certificate_extension_oid, certificate_extension_values: Certificate_extension_values);
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
    constructor(...OIDFilters: any[]);
}
/**
 * struct {} PostHandshakeAuth;
 */
export class PostHandshakeAuth extends Struct {
    constructor();
}
/**
 * struct {
 *
       Extension extensions<0..2^16-1>;
   } EncryptedExtensions;
 */
export class EncryptedExtensions extends Struct {
    static "new"(...extensions: any[]): EncryptedExtensions;
    /**
     *
     * @param {...Extension} extensions
     */
    constructor(...extensions: Extension[]);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
     *
     * @returns Hanshake message
     */
    wrap(): Handshake;
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
    static "new"(signature_algorithms?: Uint8Array): CertificateRequest;
    /**
     *
     * @param {Uint8Array} signature_algorithms - Uint8Array of signature algorithm
     */
    constructor(signature_algorithms?: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
     *
     * @returns Hanshake message
     */
    wrap(): Handshake;
}
import { Minmax } from "../src/base.js";
import { Struct } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
import { Extension } from "../src/extension/extension.js";
