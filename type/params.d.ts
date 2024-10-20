/**
 * opaque DistinguishedName<1..2^16-1>
 * @extends {Minmax}
 */
export class DistinguishedName extends Minmax {
    /**
     *
     * @param {...Uint8Array} distinguishedName
     */
    constructor(...distinguishedName: Uint8Array[]);
}
/**
 * CertificateAuthoritiesExtension
 * ```
 * struct {
 *    DistinguishedName authorities<3..2^16-1>;
   } CertificateAuthoritiesExtension;
   ```
   @extends {Struct}
 */
export class CertificateAuthoritiesExtension extends Struct {
    /**
     * Create CertificateAuthoritiesExtension
     * @param {...DistinguishedName} authorities
     */
    static a(...authorities: DistinguishedName[]): CertificateAuthoritiesExtension;
    /**
     *
     * @param {...DistinguishedName} authorities
     */
    constructor(...authorities: DistinguishedName[]);
    get distinguishedName(): DistinguishedName[];
    #private;
}
/**
 * Certificate_extension_oid
 * `opaque certificate_extension_oid<1..2^8-1>;`
 * @extends {Minmax}
 */
export class Certificate_extension_oid extends Minmax {
    /**
     * Create Certificate_extension_oid
     * @param  {Uint8Array} oid
     */
    static a(oid: Uint8Array): Certificate_extension_oid;
    /**
     *
     * @param  {Uint8Array} oid
     */
    constructor(oid: Uint8Array);
    get oid(): Uint8Array;
    #private;
}
/**
 * Certificate_extension_values
 * `opaque certificate_extension_values<0..2^16-1>;`
 * @extends {Minmax}
 */
export class Certificate_extension_values extends Minmax {
    /**
     * Create Certificate_extension_values
     * @param  {...Uint8Array} values
     */
    static a(...values: Uint8Array[]): Certificate_extension_values;
    /**
     *
     * @param  {...Uint8Array} values
     */
    constructor(...values: Uint8Array[]);
    get certificate_extension_values(): Uint8Array[];
    #private;
}
/**
 * OIDFilter
 * ```
 * struct {
      opaque certificate_extension_oid<1..2^8-1>;
      opaque certificate_extension_values<0..2^16-1>;
   } OIDFilter;
   ```
   @extends {Struct}
 */
export class OIDFilter extends Struct {
    /**
     *
     * @param  {...Uint8Array} oids
     * @returns
     */
    static certificate_extension_oid(oids: Uint8Array[]): {
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
    get oid(): Certificate_extension_oid;
    get certificate_extension_values(): Certificate_extension_values;
    #private;
}
/**
 * OIDFilterExtension
 * ```
 * struct {
      OIDFilter filters<0..2^16-1>;
   } OIDFilterExtension;
   ```
   @extends {Struct}
 */
export class OIDFilterExtension extends Struct {
    /**
     * Create OIDFilterExtension
     * @param  {...OIDFilter} OIDFilters
     * @returns
     */
    static a(...OIDFilters: OIDFilter[]): OIDFilterExtension;
    /**
     *
     * @param {...OIDFilter} OIDFilters
     */
    constructor(...OIDFilters: OIDFilter[]);
    get oidFilters(): OIDFilter[];
    #private;
}
/**
 * PostHandshakeAuth
 * ```
 * struct {} PostHandshakeAuth;
 * ```
 * @extends {Struct}
 */
export class PostHandshakeAuth extends Struct {
    static a(): PostHandshakeAuth;
    constructor();
}
/**
 * EncryptedExtensions
 * ```
 * struct {
      Extension extensions<0..2^16-1>;
   } EncryptedExtensions;
   ```
   @extends {Struct}
 */
export class EncryptedExtensions extends Struct {
    /**
     * Create EncryptedExtensions
     * @param {...Extension} extensions
     */
    static a(...extensions: Extension[]): EncryptedExtensions;
    /**
     * Parse EncryptedExtensions
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {Extension}
     */
    static parse(octet: Uint8Array): Extension;
    /**
     *
     * @param {...Extension} extensions
     */
    constructor(...extensions: Extension[]);
    payload: () => Handshake;
    handshake: () => Handshake;
    get extensions(): Extension[];
    /**
     *
     * @return {Handshake} message
     */
    wrap(): Handshake;
    #private;
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
   @extends {Struct}
 */
export class CertificateRequest extends Struct {
    /**
     * Create CertificateRequest
     * @param {SignatureSchemeList} signature_algorithms - Uint8Array of signature algorithm
     */
    static a(signature_algorithms?: Uint8Array): CertificateRequest;
    /**
     *
     * @param {SignatureSchemeList} signature_algorithms - Uint8Array of signature algorithm
     */
    constructor(signature_algorithms?: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    get signature_algo(): SignatureSchemeList;
    /**
     *
     * @return {Handshake} message
     */
    wrap(): Handshake;
    #private;
}
import { Minmax } from "../src/base.js";
import { Struct } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
import { Extension } from "../src/extension/extension.js";
import { SignatureSchemeList } from "../src/extension/signaturescheme.js";
