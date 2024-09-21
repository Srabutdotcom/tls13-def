// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/signaturescheme.d.ts"

/**
 * !B.3.1.3.  Signature Algorithm Extension
 * LINK https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1.3
 */

import { Enum, Minmax, Struct, Uint16 } from "../base.js";

export class SignatureAlgorithm extends Uint16 {
   constructor(value){super(value)}
}
/**
 * SignatureSchemeList
 */
export class SignatureSchemeList extends Struct {
   static list(){return new SignatureSchemeList}
   static new(){return new SignatureSchemeList}
   static SignatureScheme = new Enum({
      /* RSASSA-PKCS1-v1_5 algorithms */
      /* rsa_pkcs1_sha256(0x0401),
      rsa_pkcs1_sha384(0x0501),
      rsa_pkcs1_sha512(0x0601), */
   
      /* ECDSA algorithms */
      /** 
       * @type {0x0403} ecdsa_secp256r1_sha256 */
      ecdsa_secp256r1_sha256: 0x0403,
      /**@type {0x0503} ecdsa_secp384r1_sha384 */
      ecdsa_secp384r1_sha384: 0x0503,
      /**@type {0x0603} ecdsa_secp521r1_sha512 */
      ecdsa_secp521r1_sha512: 0x0603,
   
      /* RSASSA-PSS algorithms with public key OID rsaEncryption */
      /**@type {0x0804} rsa_pss_rsae_sha256 */
      rsa_pss_rsae_sha256: 0x0804,
      /**@type {0x0805} rsa_pss_rsae_sha384 */
      rsa_pss_rsae_sha384: 0x0805,
      /**@type {0x0806} rsa_pss_rsae_sha512 */
      rsa_pss_rsae_sha512: 0x0806,
   
      /* EdDSA algorithms */
      /* ed25519(0x0807),
      ed448(0x0808), */
   
      /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
      /**@type {0x0809} rsa_pss_pss_sha256 */
      rsa_pss_pss_sha256: 0x0809,
      /**@type {0x080a} rsa_pss_pss_sha384 */
      rsa_pss_pss_sha384: 0x080a,
      /**@type {0x080b} rsa_pss_pss_sha512 */
      rsa_pss_pss_sha512: 0x080b,
      
      /* Legacy algorithms */
      /* rsa_pkcs1_sha1(0x0201),
      ecdsa_sha1(0x0203), */
   
      /* Reserved Code Points */
      /* obsolete_RESERVED(0x0000..0x0200),
      dsa_sha1_RESERVED(0x0202),
      obsolete_RESERVED(0x0204..0x0400),
      dsa_sha256_RESERVED(0x0402),
      obsolete_RESERVED(0x0404..0x0500),
      dsa_sha384_RESERVED(0x0502),
      obsolete_RESERVED(0x0504..0x0600),
      dsa_sha512_RESERVED(0x0602),
      obsolete_RESERVED(0x0604..0x06FF),
      private_use(0xFE00..0xFFFF), */
      [Enum.max] : 0xFFFF,
      [Enum.class] : SignatureAlgorithm
   })
   constructor() {
      const { SignatureScheme } = SignatureSchemeList
      const supported_signature_algorithms = [
         SignatureScheme.ecdsa_secp256r1_sha256,
         SignatureScheme.ecdsa_secp384r1_sha384,
         SignatureScheme.ecdsa_secp521r1_sha512,
         SignatureScheme.rsa_pss_rsae_sha256,
         SignatureScheme.rsa_pss_rsae_sha384,
         SignatureScheme.rsa_pss_rsae_sha512,
         SignatureScheme.rsa_pss_pss_sha256,
         SignatureScheme.rsa_pss_pss_sha384,
         SignatureScheme.rsa_pss_pss_sha512
      ]
      
      super(
         Minmax.min(2).max(65534).byte(...supported_signature_algorithms)//new OpaqueVar(supported_signature_algorithms, 2, 65534)
      )// <2..2^16-2>)
   }
}

