import { Extension, ExtensionType, HandshakeType, NamedGroupList, OpaqueVar, Random, ServerName, ServerNameList, SignatureSchemeList, Struct, Uint8 } from "./mod.js";

/**
 * SessionId
 */
export class SessionId extends OpaqueVar {
   constructor() {
      const uuid = crypto.randomUUID().replaceAll('-', '')
      const sessionId = new Uint8Array(Array.from(uuid, e => e.charCodeAt(0)));
      super(sessionId, 0, 32)
   }
}

/**
 * ClientHello
 */
export class ClientHello extends Struct {
   type = HandshakeType.client_hello;
   /**
    * 
    * @param {string} SNI - Server Name Indication i.e. "localhost"
    */
   constructor(SNI, keyShareEntries) {
      const random = new Random;
      const sessionId = new SessionId;
      const compression = new Uint8Array([1, 0]);
      const cipherSuites = new Uint8Array([0, 4, 0x13, 0x01, 0x13, 0x02])
      const extensions = [
         new Extension(ExtensionType.server_name, new ServerNameList(new ServerName(SNI))),
         new Extension(ExtensionType.supported_groups, new NamedGroupList),
         new Extension(ExtensionType.signature_algorithms, new SignatureSchemeList),
         new Extension(ExtensionType.supported_versions, new SupportedVersions('client')),
         new Extension(ExtensionType.psk_key_exchange_modes, new PskKeyExchangeModes),
         new Extension(ExtensionType.key_share, new KeyShareClientHello(keyShareEntries)),
      ]

      super(
         protocolVersion,
         random,
         sessionId,
         cipherSuites,
         compression,
         new OpaqueVar(concat(...extensions), 8, 2 ** 16 - 1)
      )

   }
}