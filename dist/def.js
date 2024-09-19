// base.js
import { concat, Uint8BE, Uint16BE, Uint24BE, Uint32BE, maxBytes, uint } from "@aicone/byte";
import { getUint8, getUint16, getUint24, getUint32 } from "@aicone/byte";
var Struct = class extends Uint8Array {
  #member;
  /**
   * @param  {...Uint8Array} uint8s  
   */
  constructor(...uint8s) {
    super(uint8s && uint8s.length > 0 ? concat(...uint8s) : void 0);
    if (uint8s && uint8s.length > 0 && uint8s.some((e) => !(e instanceof Uint8Array))) {
      throw TypeError(`all arguments must be Uint8Array`);
    }
    this.#member = uint8s;
  }
  /**
   * 
   * @returns {Uint8Array[]} array of Uint8Array
   */
  get member() {
    return this.#member;
  }
};
var Fixed = class _Fixed extends Uint8Array {
  /**
   * 
   * @param {number} l - the length of byte > 0
   * @returns 
   */
  static length(l) {
    l = uint(l);
    return {
      /**
       * 
       * @param {...Uint8Array} b - the byte to create
       * @returns 
       */
      bytes(...b) {
        if (b.length !== l)
          throw TypeError(`b.length [${b.length}] !== l [${l}]`);
        return new _Fixed(l, ...b);
      }
    };
  }
  /**
   * 
   * @param {number} l 
   * @param  {...Uint8Array} v 
   */
  constructor(l, ...v) {
    if (v.length !== l)
      throw TypeError(`v.length [${v.length}] !== l [${l}]`);
    super(concat(...v));
  }
};
var Minmax = class _Minmax extends Uint8Array {
  /**
   * 
   * @param {number} m - the minimum length of byte
   * @returns 
   */
  static min(m) {
    m = uint(m);
    return {
      /**
       * 
       * @param {number} M - the maximum of byte length
       * @returns 
       */
      max(M) {
        M = uint(M);
        return {
          /**
           * 
           * @param {...Uint8Array} b 
           */
          byte(...b) {
            return new _Minmax(m, M, ...b);
          }
        };
      }
    };
  }
  #member;
  #min;
  #max;
  /**
   * @param {number} m - minimum length
   * @param {number} M - maximum length
   * @param  {...Uint8Array} b 
   */
  constructor(m, M, ...b) {
    const l = b.reduce((ac, ar) => ac + (ar?.length ?? 0), 0);
    if (l < m)
      throw TypeError(`bytes should have a min length of ${m}`);
    if (l > M)
      throw TypeError(`bytes should have a max length of ${M}`);
    const byteLength = maxBytes(M);
    if (byteLength > 4)
      throw TypeError(`maximum byte length is 4 in Minmax class`);
    const length = Uints[`Uint${8 * byteLength}`](l);
    super(concat(length, ...b));
    this.#member = [length, ...b];
    this.#min = m;
    this.#max = M;
  }
  get member() {
    return this.#member;
  }
  get min() {
    return this.#min;
  }
  get max() {
    return this.#max;
  }
};
var Uint8 = class _Uint8 extends Uint8Array {
  static new(v) {
    return new _Uint8(v);
  }
  /**
   * 
   * @param {uint} int 
   */
  constructor(int) {
    int = uint(int);
    super(Uint8BE(int, 1).buffer);
  }
  value() {
    return getUint8(this);
  }
};
var Uint16 = class _Uint16 extends Uint8Array {
  static new(v) {
    return new _Uint16(v);
  }
  /**
   * 
   * @param {uint} int 
   */
  constructor(int) {
    int = uint(int);
    super(Uint16BE(int).buffer);
  }
  value() {
    return getUint16(this);
  }
};
var Uint24 = class _Uint24 extends Uint8Array {
  static new(v) {
    return new _Uint24(v);
  }
  /**
   * 
   * @param {uint} int 
   */
  constructor(int) {
    int = uint(int);
    super(Uint24BE(int).buffer);
  }
  value() {
    return getUint24(this);
  }
};
var Uint32 = class _Uint32 extends Uint8Array {
  static new(v) {
    return new _Uint32(v);
  }
  /**
   * 
   * @param {uint} int 
   */
  constructor(int) {
    int = uint(int);
    super(Uint32BE(int).buffer);
  }
  value() {
    return getUint32(this);
  }
};
var Enum = class _Enum {
  // store value -> key map
  #reverse = {};
  // property for sign of max value in Enum
  static max = Symbol("max");
  // for max value (if any)
  #maxvalue;
  // property to store class to wrap the value
  static class = Symbol("class");
  // the class (if any)
  #class;
  // bytes length (if any)
  #byteLength;
  /**
   * 
   * @param {{any:any}} object 
   */
  constructor(object) {
    if (Object.hasOwn(object, _Enum.max)) {
      this.#maxvalue = Array.isArray(object[_Enum.max]) ? 256 ** object[_Enum.max].length - 1 : object[_Enum.max];
      this.#byteLength = maxBytes(this.#maxvalue);
    }
    if (Object.hasOwn(object, _Enum.class)) {
      if (object[_Enum.class]?.constructor.toString().match(/^class/) == false)
        throw TypeError(`expected class but got ${object[_Enum.class]?.constructor}`);
      this.#class = object[_Enum.class];
    }
    for (const prop in object) {
      this.#reverse[object[prop]] = prop;
      Object.defineProperty(
        this,
        prop,
        {
          value: this.#wrap(object[prop]),
          writable: false,
          enumerable: true
        }
      );
    }
  }
  /**
   * return keys or properties
   * @returns {any[]} [any]
   */
  keys() {
    return Object.keys(this);
  }
  /**
   * return values
   * @returns {any[]} [any]
   */
  values() {
    return Object.values(this);
  }
  /**
   * return key for value supplied or null if not found
   * @param {any} value 
   * @returns {any} key
   */
  key(value) {
    return this.#reverse[value] ?? null;
  }
  /**
   * return value for key supplied or null if not found
   * @param {any} key 
   * @returns {any} value
   */
  value(key) {
    return this[key] ?? null;
  }
  maxvalue() {
    return this.#maxvalue ?? null;
  }
  #uintOrArrayOfByte(value) {
    if (typeof value == "number") {
      value = uint(value);
      if (value > this.#maxvalue)
        throw TypeError(`value: ${value} can't be > than ${this.#maxvalue}`);
      return this.#byteLength ? Uint8BE(value, this.#byteLength) : value;
    }
    if (Array.isArray(value)) {
      if (value.length > this.#byteLength)
        throw TypeError(`length of value is > than ${this.#byteLength}`);
      return this.#byteLength ? new Uint8Array(value) : value;
    }
    if (this.#byteLength)
      throw TypeError(`expected value is either uint or arrayofbytes [0-255] `);
    return value;
  }
  #wrap(value) {
    if (this.#class)
      return new this.#class(value);
    return value;
  }
};
var Uints = class {
  static Uint8(v) {
    class Length extends Uint8 {
      constructor(v2) {
        super(v2);
      }
    }
    ;
    return new Length(v);
  }
  static Uint16(v) {
    class Length extends Uint16 {
      constructor(v2) {
        super(v2);
      }
    }
    ;
    return new Length(v);
  }
  static Uint24(v) {
    class Length extends Uint24 {
      constructor(v2) {
        super(v2);
      }
    }
    ;
    return new Length(v);
  }
  static Uint32(v) {
    class Length extends Uint32 {
      constructor(v2) {
        super(v2);
      }
    }
    ;
    return new Length(v);
  }
};

// alert.js
var AlertLevel = class extends Uint8 {
  constructor(value) {
    super(value);
  }
};
var AlertDescription = class extends Uint8 {
  constructor(value) {
    super(value);
  }
};
var Alert = class _Alert extends Struct {
  static level = new Enum({
    /**@type {1} warning */
    warning: 1,
    /**@type {2} fatal */
    fatal: 2,
    /**@type {255} [Enum.max] */
    [Enum.max]: 255,
    [Enum.class]: AlertLevel
  });
  static description = new Enum({
    /**@type {0} close_notify */
    close_notify: 0,
    /**@type {10} unexpected_message */
    unexpected_message: 10,
    /**@type {20} bad_record_mac */
    bad_record_mac: 20,
    /**@type {21} decryption_failed_RESERVED */
    decryption_failed_RESERVED: 21,
    /**@type {22} record_overflow */
    record_overflow: 22,
    /**@type {30} decompression_failure_RESERVED */
    decompression_failure_RESERVED: 30,
    /**@type {40} handshake_failure */
    handshake_failure: 40,
    /**@type {41} no_certificate_RESERVED */
    no_certificate_RESERVED: 41,
    /**@type {42} bad_certificate */
    bad_certificate: 42,
    /**@type {43} unsupported_certificate */
    unsupported_certificate: 43,
    /**@type {44} certificate_revoked */
    certificate_revoked: 44,
    /**@type {45} certificate_expired */
    certificate_expired: 45,
    /**@type {46} certificate_unknown */
    certificate_unknown: 46,
    /**@type {47} illegal_parameter */
    illegal_parameter: 47,
    /**@type {48} unknown_ca */
    unknown_ca: 48,
    /**@type {49} access_denied */
    access_denied: 49,
    /**@type {50} decode_error */
    decode_error: 50,
    /**@type {51} decrypt_error */
    decrypt_error: 51,
    /**@type {60} export_restriction_RESERVED */
    export_restriction_RESERVED: 60,
    /**@type {70} protocol_version */
    protocol_version: 70,
    /**@type {71} insufficient_security */
    insufficient_security: 71,
    /**@type {80} internal_error */
    internal_error: 80,
    /**@type {86} inappropriate_fallback */
    inappropriate_fallback: 86,
    /**@type {90} user_canceled */
    user_canceled: 90,
    /**@type {100} no_renegotiation_RESERVED */
    no_renegotiation_RESERVED: 100,
    /**@type {109} missing_extension */
    missing_extension: 109,
    /**@type {110} unsupported_extension */
    unsupported_extension: 110,
    /**@type {111} certificate_unobtainable_RESERVED */
    certificate_unobtainable_RESERVED: 111,
    /**@type {112} unrecognized_name */
    unrecognized_name: 112,
    /**@type {113} bad_certificate_status_response */
    bad_certificate_status_response: 113,
    /**@type {114} bad_certificate_hash_value_RESERVED */
    bad_certificate_hash_value_RESERVED: 114,
    /**@type {115} unknown_psk_identity */
    unknown_psk_identity: 115,
    /**@type {116} certificate_required */
    certificate_required: 116,
    /**@type {120} no_application_protocol */
    no_application_protocol: 120,
    /**@type {255} Enum.max */
    [Enum.max]: 255,
    [Enum.class]: AlertDescription
  });
  static {
    const { level, description } = _Alert;
    this.close_notify = new _Alert(level.warning, description.close_notify);
    this.unexpected_message = new _Alert(level.fatal, description.unexpected_message);
    this.bad_record_mac = new _Alert(level.fatal, description.bad_record_mac);
    this.decryption_failed_RESERVED = new _Alert(level.warning, description.decryption_failed_RESERVED);
    this.record_overflow = new _Alert(level.fatal, description.record_overflow);
    this.decompression_failure_RESERVED = new _Alert(level.warning, description.decompression_failure_RESERVED);
    this.handshake_failure = new _Alert(level.fatal, description.handshake_failure);
    this.no_certificate_RESERVED = new _Alert(level.warning, description.no_certificate_RESERVED);
    this.bad_certificate = new _Alert(level.fatal, description.bad_certificate);
    this.unsupported_certificate = new _Alert(level.fatal, description.unsupported_certificate);
    this.certificate_revoked = new _Alert(level.fatal, description.certificate_revoked);
    this.certificate_expired = new _Alert(level.fatal, description.certificate_expired);
    this.certificate_unknown = new _Alert(level.fatal, description.certificate_unknown);
    this.illegal_parameter = new _Alert(level.fatal, description.illegal_parameter);
    this.unknown_ca = new _Alert(level.fatal, description.unknown_ca);
    this.access_denied = new _Alert(level.fatal, description.access_denied);
    this.decode_error = new _Alert(level.fatal, description.decode_error);
    this.decrypt_error = new _Alert(level.fatal, description.decrypt_error);
    this.export_restriction_RESERVED = new _Alert(level.warning, description.export_restriction_RESERVED);
    this.protocol_version = new _Alert(level.fatal, description.protocol_version);
    this.insufficient_security = new _Alert(level.fatal, description.insufficient_security);
    this.internal_error = new _Alert(level.fatal, description.internal_error);
    this.inappropriate_fallback = new _Alert(level.fatal, description.inappropriate_fallback);
    this.user_canceled = new _Alert(level.warning, description.user_canceled);
    this.no_renegotiation_RESERVED = new _Alert(level.warning, description.no_renegotiation_RESERVED);
    this.missing_extension = new _Alert(level.fatal, description.missing_extension);
    this.unsupported_extension = new _Alert(level.fatal, description.unsupported_extension);
    this.certificate_unobtainable_RESERVED = new _Alert(level.warning, description.certificate_unobtainable_RESERVED);
    this.unrecognized_name = new _Alert(level.fatal, description.unrecognized_name);
    this.bad_certificate_status_response = new _Alert(level.fatal, description.bad_certificate_status_response);
    this.bad_certificate_hash_value_RESERVED = new _Alert(level.warning, description.bad_certificate_hash_value_RESERVED);
    this.unknown_psk_identity = new _Alert(level.fatal, description.unknown_psk_identity);
    this.certificate_required = new _Alert(level.fatal, description.certificate_required);
    this.no_application_protocol = new _Alert(level.fatal, description.no_application_protocol);
  }
  /**
   * @typedef {number} uint 
   * @param {("warning"|"fatal")|(1|2)|Uint8Array} _level 
   * @param {("close_notify"|"unexpected_message"|"bad_record_mac"|"decryption_failed_RESERVED"|"record_overflow"|"decompression_failure_RESERVED"|"handshake_failure"|"no_certificate_RESERVED"|"bad_certificate"|"unsupported_certificate"|"certificate_revoked"|"certificate_expired"|"certificate_unknown"|"illegal_parameter"|"unknown_ca"|"access_denied"|"decode_error"|"decrypt_error"|"export_restriction_RESERVED"|"protocol_version"|"insufficient_security"|"internal_error"|"inappropriate_fallback"|"user_canceled"|"no_renegotiation_RESERVED"|"missing_extension"|"unsupported_extension"|"certificate_unobtainable_RESERVED"|"unrecognized_name"|"bad_certificate_status_response"|"bad_certificate_hash_value_RESERVED"|"unknown_psk_identity"|"certificate_required"|"no_application_protocol")|(0|10|20|21|22|30|40|41|42|43|44|45|46|47|48|49|50|51|60|70|71|80|86|90|100|109|110|111|112|113|114|115|116|120)} _desc
   */
  constructor(level, desc) {
    super(level, desc);
  }
  /**
   * return the meaning of alert message in human readable format
   * @returns {string} formated as`"alert[code]-description[code]"`
   */
  meaning() {
    const { level, description } = _Alert;
    const lev = this[0];
    const des = this[1];
    return `${level.key(lev)}[${lev}]-${description.key(des)}[${des}]`;
  }
};

// keyexchange.js
var ProtocolVersion = class _ProtocolVersion extends Uint16 {
  static version = {
    TLS12: new _ProtocolVersion(771),
    TLS13: new _ProtocolVersion(772),
    legacy: new _ProtocolVersion(771)
  };
  /**
   * 
   * @param {0x0303|0x0304} ver - TLS version (1.2 or 1.3) 
   */
  constructor(ver) {
    super(ver);
  }
  meaning() {
    if (this.value() == 771)
      return `TLS v1.2 - legacy_version[0x0303]`;
    if (this.value() == 772)
      return `TLS v1.3 - [0x0304]`;
    throw TypeError(`Uknown version ${this.value}`);
  }
};
var Random = class _Random extends Uint8Array {
  static new() {
    return new _Random();
  }
  constructor() {
    super(crypto.getRandomValues(new Uint8Array(32)));
  }
};
var CipherSuite = class _CipherSuite extends Uint8Array {
  static TLS_AES_128_GCM_SHA256 = new _CipherSuite(1);
  static TLS_AES_256_GCM_SHA384 = new _CipherSuite(2);
  /**
   * @param {0x01|0x02} code 
   */
  constructor(code = 1) {
    super([19, code]);
  }
  meaning() {
    if (this.at(1) == 1)
      return "TLS_AES_128_GCM_SHA256[0x13, 0x01]";
    if (this.at(1) == 2)
      return "TLS_AES_256_GCM_SHA384[0x13, 0x02]";
    throw TypeError(`Unknown cipher - ${this[1]}`);
  }
  get AEAD() {
    if (this.at(1) == 1)
      return 128;
    if (this.at(1) == 2)
      return 256;
    return -1;
  }
  get SHA() {
    if (this.at(1) == 1)
      return 256;
    if (this.at(1) == 2)
      return 384;
    return -1;
  }
};
var CipherSuites = class _CipherSuites extends Minmax {
  ciphers = {
    TLS_AES_128_GCM_SHA256: new CipherSuite(1),
    TLS_AES_256_GCM_SHA384: new CipherSuite(2)
  };
  static new() {
    return new _CipherSuites();
  }
  constructor() {
    super(2, 65534, new CipherSuite(1), new CipherSuite(2));
  }
};

// extension/namedgroup.js
var NamedGroup = class extends Uint16 {
  #value;
  //
  constructor(v) {
    super(v);
    this.#value = v;
  }
  get name() {
    return NamedGroupList.namedGroup.key(this.#value);
  }
};
var NamedGroupList = class _NamedGroupList extends Struct {
  static list() {
    return new _NamedGroupList();
  }
  static namedGroup = new Enum({
    /* unallocated_RESERVED(0x0000), */
    /* Elliptic Curve Groups (ECDHE) */
    //obsolete_RESERVED(0x0001..0x0016),
    /**@type {0x0017} secp256r1  */
    secp256r1: 23,
    /**@type {0x0018} secp384r1  */
    secp384r1: 24,
    /**@type {0x0019} secp521r1  */
    secp521r1: 25,
    //obsolete_RESERVED(0x001A..0x001C),
    /**@type {0x001D} x25519  */
    x25519: 29,
    /**@type {0x001E} x448  */
    x448: 30,
    /* Finite Field Groups (DHE) */
    /**@type {0x0100} ffdhe2048  */
    ffdhe2048: 256,
    /**@type {0x0101} ffdhe3072  */
    ffdhe3072: 257,
    /**@type {0x0102} ffdhe3072  */
    ffdhe4096: 258,
    /**@type {0x0103} ffdhe3072  */
    ffdhe6144: 259,
    /**@type {0x0104} ffdhe3072  */
    ffdhe8192: 260,
    /* Reserved Code Points */
    /* ffdhe_private_use(0x01FC..0x01FF),
    ecdhe_private_use(0xFE00..0xFEFF),
    obsolete_RESERVED(0xFF01..0xFF02), */
    /**@type {0xFFFF} max  */
    [Enum.max]: 65535,
    [Enum.class]: NamedGroup
  });
  constructor() {
    const { namedGroup } = _NamedGroupList;
    const named_group_list = [
      namedGroup.secp256r1,
      namedGroup.secp384r1,
      namedGroup.secp521r1,
      namedGroup.x25519
    ];
    super(
      Minmax.min(2).max(65534).byte(...named_group_list)
      //new OpaqueVar(concat(...named_group_list), 2, 65534)
    );
  }
};

// deps.js
import { concat as concat2, uint8array } from "@aicone/byte";
import { p521 } from "npm:@noble/curves@1.6.0/p521";

// extension/keyshare.js
var KeyShareEntry = class extends Struct {
  #NamedGroup = NamedGroup;
  /**
   * 
   * @param {NamedGroup} group - NamedGroup 
   * @param {Uint8Array} key_exchange - PublicKey
   */
  constructor(group, ...key_exchange) {
    super(
      group,
      Minmax.min(1).max(2 ** 16 - 1).byte(...key_exchange)
      //new OpaqueVar(key_exchange, 1, 2 ** 16 - 1)
    );
  }
};
var KeyShareClientHello = class extends Struct {
  /**
   * 
   * @param {...KeyShareEntry} clientShares -A list of offered KeyShareEntry values in descending order of client preference.
   */
  constructor(...clientShares2) {
    super(
      Minmax.min(0).max(2 ** 16 - 1).byte(...clientShares2)
      //new OpaqueVar(concat(...clientShares), 0, 2 ** 16 - 1)
    );
  }
};
var KeyShareHelloRetryRequest = class _KeyShareHelloRetryRequest extends Struct {
  static {
    const { namedGroup } = NamedGroupList;
    this.secp256r1 = function() {
      return new _KeyShareHelloRetryRequest(namedGroup.secp256r1);
    };
    this.secp384r1 = function() {
      return new _KeyShareHelloRetryRequest(namedGroup.secp384r1);
    };
    this.secp521r1 = function() {
      return new _KeyShareHelloRetryRequest(namedGroup.secp521r1);
    };
    this.x25519 = function() {
      return new _KeyShareHelloRetryRequest(namedGroup.x25519);
    };
  }
  constructor(selected_group) {
    super(selected_group);
  }
};
var KeyShareServerHello = class extends Struct {
  /**
   * 
   * @param {KeyShareEntry} server_share
   */
  constructor(server_share) {
    if (server_share instanceof KeyShareEntry == false)
      throw TypeError(`Expected KeyShareEntry Object`);
    super(server_share);
  }
};
function keyShareServerHello(server_share) {
  return new KeyShareServerHello(server_share);
}
async function cryptokey(algo) {
  return await crypto.subtle.generateKey(algo, true, ["deriveKey", "deriveBits"]);
}
var Algo = class {
  static ecdh = {
    256: ecdh(256),
    384: ecdh(384),
    521: ecdh(521)
  };
  static x25519 = { name: "X25519" };
};
function ecdh(byte) {
  return {
    name: "ECDH",
    namedCurve: `P-${byte}`
  };
}
var Key = class {
  /**@type {CryptoKeyPair} #keypair - CryptoKeyPair */
  #keypair;
  /**
   * 
   * @param {CryptoKeyPair} v 
   */
  constructor(v) {
    this.#keypair = v;
  }
  async keyShareEntry() {
    if (this.#keypair instanceof P521)
      return this.#keypair.keyShareEntry();
    const arrayBufferPublicKey = await crypto.subtle.exportKey("raw", this.#keypair.publicKey);
    const { name, namedCurve } = this.#keypair.publicKey.algorithm;
    const { namedGroup } = NamedGroupList;
    if (name == "X25519")
      return new KeyShareEntry(namedGroup.x25519, new Uint8Array(arrayBufferPublicKey));
    if (name == "ECDH") {
      const algo = namedCurve.split("-")[1];
      return new KeyShareEntry(namedGroup[`secp${algo}r1`], new Uint8Array(arrayBufferPublicKey));
    }
    return false;
  }
  /**
   * 
   * @returns {Promise<JsonWebKey>} privateKey
   */
  async privateKeyJwk() {
    if (this.#keypair instanceof P521)
      return false;
    return await crypto.subtle.exportKey("jwk", this.#keypair.privateKey);
  }
  /**
   * 
   * @param {CryptoKey} v - publicKey in CryptoKey object 
   * @param {number} l - positive integer divisible by 8 
   * @return {Uint8Array} sharedkey
   */
  async sharedKey(v, l) {
    if (this.#keypair instanceof P521)
      return this.#keypair.sharedKey(v);
    const { name } = this.#keypair.privateKey.algorithm;
    const sk = await crypto.subtle.deriveBits({ name, public: v }, this.#keypair.privateKey, l);
    return new Uint8Array(sk);
  }
  get algorithm() {
    if (this.#keypair instanceof P521)
      return { name: "ECDH", namedCurve: "P-521" };
    return this.#keypair.privateKey.algorithm;
  }
};
var Keys = class {
  #ecdh256;
  #ecdh384;
  #ecdh521;
  #x25519;
  /**
   * 
   * @param {Array<Key>} keys 
   */
  constructor(...keys) {
    for (const e of keys) {
      const { name, namedCurve } = e.algorithm;
      if (name == "X25519") {
        this.#x25519 = e;
        continue;
      }
      if (name == "ECDH") {
        if (namedCurve.includes("256")) {
          this.#ecdh256 = e;
          continue;
        }
        if (namedCurve.includes("384")) {
          this.#ecdh384 = e;
          continue;
        }
        if (namedCurve.includes("521")) {
          this.#ecdh521 = e;
          continue;
        }
      }
    }
  }
  get ecdh256() {
    return this.#ecdh256;
  }
  get ecdh384() {
    return this.#ecdh384;
  }
  get ecdh521() {
    return this.#ecdh521;
  }
  get x25519() {
    return this.#x25519;
  }
  /**
   * 
   * @returns KeyShareClientHello
   * Clients MUST NOT offer multiple KeyShareEntry values
  for the same group.  Clients MUST NOT offer any KeyShareEntry values
  for groups not listed in the client's "supported_groups" extension.
  Servers MAY check for violations of these rules and abort the
  handshake with an "illegal_parameter" alert if one is violated.
   */
  async keyShareClientHello() {
    return new KeyShareClientHello(
      await this.x25519.keyShareEntry(),
      await this.ecdh521.keyShareEntry(),
      await this.ecdh384.keyShareEntry(),
      await this.ecdh256.keyShareEntry()
    );
  }
};
var ClientShares = class _ClientShares {
  static keys;
  static async keyShareClientHello() {
    _ClientShares.keys = new Keys(
      new Key(await cryptokey(Algo.x25519)),
      new Key(new P521()),
      // using p521 from noble as deno doesn't support yet
      new Key(await cryptokey(Algo.ecdh["384"])),
      new Key(await cryptokey(Algo.ecdh["256"]))
    );
    return await _ClientShares.keys.keyShareClientHello();
  }
};
var P521 = class extends Uint8Array {
  constructor() {
    super(p521.utils.randomPrivateKey());
  }
  keyShareEntry() {
    const { namedGroup } = NamedGroupList;
    return new KeyShareEntry(namedGroup.secp521r1, p521.getPublicKey(this));
  }
  /**
   * 
   * @param {Uint8Array} publicKey 
   * @returns sharedSecret
   */
  sharedKey(publicKey) {
    return p521.getSharedSecret(this, publicKey);
  }
};
var ServerShare = class _ServerShare {
  static key;
  static async x25519() {
    _ServerShare.key = new Key(await cryptokey(Algo.x25519));
    return await _ServerShare.keyShareServerHello();
  }
  static async p521() {
    _ServerShare.key = new Key(new P521());
    return await _ServerShare.keyShareServerHello();
  }
  static async p384() {
    _ServerShare.key = new Key(await cryptokey(Algo.ecdh["384"]));
    return await _ServerShare.keyShareServerHello();
  }
  static async p256() {
    _ServerShare.key = new Key(await cryptokey(Algo.ecdh["256"]));
    return await _ServerShare.keyShareServerHello();
  }
  static async keyShareServerHello() {
    return new KeyShareServerHello(await _ServerShare.key.keyShareEntry());
  }
};

// extension/signaturescheme.js
var SignatureAlgorithm = class extends Uint16 {
  constructor(value) {
    super(value);
  }
};
var SignatureSchemeList = class _SignatureSchemeList extends Struct {
  static list() {
    return new _SignatureSchemeList();
  }
  static new() {
    return new _SignatureSchemeList();
  }
  static SignatureScheme = new Enum({
    /* RSASSA-PKCS1-v1_5 algorithms */
    /* rsa_pkcs1_sha256(0x0401),
    rsa_pkcs1_sha384(0x0501),
    rsa_pkcs1_sha512(0x0601), */
    /* ECDSA algorithms */
    /** 
     * @type {0x0403} ecdsa_secp256r1_sha256 */
    ecdsa_secp256r1_sha256: 1027,
    /**@type {0x0503} ecdsa_secp384r1_sha384 */
    ecdsa_secp384r1_sha384: 1283,
    /**@type {0x0603} ecdsa_secp521r1_sha512 */
    ecdsa_secp521r1_sha512: 1539,
    /* RSASSA-PSS algorithms with public key OID rsaEncryption */
    /**@type {0x0804} rsa_pss_rsae_sha256 */
    rsa_pss_rsae_sha256: 2052,
    /**@type {0x0805} rsa_pss_rsae_sha384 */
    rsa_pss_rsae_sha384: 2053,
    /**@type {0x0806} rsa_pss_rsae_sha512 */
    rsa_pss_rsae_sha512: 2054,
    /* EdDSA algorithms */
    /* ed25519(0x0807),
    ed448(0x0808), */
    /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
    /**@type {0x0809} rsa_pss_pss_sha256 */
    rsa_pss_pss_sha256: 2057,
    /**@type {0x080a} rsa_pss_pss_sha384 */
    rsa_pss_pss_sha384: 2058,
    /**@type {0x080b} rsa_pss_pss_sha512 */
    rsa_pss_pss_sha512: 2059,
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
    [Enum.max]: 65535,
    [Enum.class]: SignatureAlgorithm
  });
  constructor() {
    const { SignatureScheme } = _SignatureSchemeList;
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
    ];
    super(
      Minmax.min(2).max(65534).byte(...supported_signature_algorithms)
      //new OpaqueVar(supported_signature_algorithms, 2, 65534)
    );
  }
};

// extension/pskeyexchange.js
var PskKeyExchangeModes = class _PskKeyExchangeModes extends Struct {
  /**
   * the server MUST NOT supply a "key_share" values
   * @returns Uint8(0)
   */
  static psk_ke() {
    return new _PskKeyExchangeModes(new Uint8(0));
  }
  /**
   * the client and server MUST supply "key_share" values
   * @returns Uint8(1)
   */
  static psk_dhe_ke() {
    return new _PskKeyExchangeModes(new Uint8(1));
  }
  /**
   * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
   * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
     client and server MUST supply "key_share" values as described in
     Section 4.2.8.
   */
  constructor(...ke_mode) {
    super(
      Minmax.min(1).max(255).byte(...ke_mode)
      //new OpaqueVar(ke_mode, 1, 255)
    );
  }
};

// extension/supportedversion.js
var SupportedVersions = class _SupportedVersions extends Struct {
  /**
   * 
   * @returns SupportedVersions - for client new Uint8Array([2, 3, 4])
   */
  static client() {
    return new _SupportedVersions(true);
  }
  /**
   * 
   * @returns SupportedVersions - for server new Uint8Array([3, 4])
   */
  static server() {
    return new _SupportedVersions();
  }
  /**
   * 
   * @returns SupportedVersions - for server new Uint8Array([3, 4])
   */
  static retry() {
    return new _SupportedVersions();
  }
  /**
   * 
   * @param {boolean} client - true if it is for client 
   */
  constructor(client) {
    const versions = client ? new Uint8Array([4, 3, 3, 3, 4]) : new Uint8Array([3, 4]);
    super(versions);
  }
};

// extension/servername.js
import { uint8array as uint8array2 } from "@aicone/byte";
var ServerName = class extends Struct {
  /**
   * 
   * @param {...Uint8Array|string} hostname 
   */
  constructor(...hostname) {
    hostname = hostname.map((e) => uint8array2(e));
    super(
      new Uint8(0),
      // NameType - host_name(0)
      Minmax.min(1).max(65535).byte(...hostname)
      //new OpaqueVar(hostname, 1, 65535)//<1..2^16-1>
    );
  }
};
var ServerNameList = class _ServerNameList extends Struct {
  /**
   * ServerNameList
   * @param  {...string} serverName
   * @return ServerNameList 
   */
  static list(...serverName) {
    serverName = serverName.map((name) => new ServerName(name));
    return new _ServerNameList(...serverName);
  }
  /**
   * 
   * @param {ServerName} server_name_list <1..2^16-1>
   */
  constructor(...server_name_list) {
    super(
      Minmax.min(1).max(2 ** 16 - 1).byte(...server_name_list)
      //new OpaqueVar(server_name_list, 1, 2 ** 16 - 1)
    );
  }
};

// extension/extension.js
var ExtensionType = class extends Uint16 {
  #value;
  constructor(v) {
    super(v);
    this.#value = v;
  }
  get name() {
    return Extension.types.key(this.#value);
  }
};
var Extension = class _Extension extends Struct {
  static types = new Enum({
    /** @type {0} :     server_name */
    server_name: 0,
    /* RFC 6066 */
    /** @type {1} :     max_fragment_length */
    max_fragment_length: 1,
    /* RFC 6066 */
    /** @type {5} :     status_request */
    status_request: 5,
    /* RFC 6066 */
    /** @type {10} :     supported_groups */
    supported_groups: 10,
    /* RFC 8422, 7919 */
    /** @type {13} :     signature_algorithms */
    signature_algorithms: 13,
    /* RFC 8446 */
    /** @type {14} :     use_srtp */
    use_srtp: 14,
    /* RFC 5764 */
    /** @type {15} :     heartbeat */
    heartbeat: 15,
    /* RFC 6520 */
    /** @type {16} :     application_layer_protocol_negotiation */
    application_layer_protocol_negotiation: 16,
    /* RFC 7301 */
    /** @type {18} :     signed_certificate_timestamp */
    signed_certificate_timestamp: 18,
    /* RFC 6962 */
    /** @type {19} :     client_certificate_type */
    client_certificate_type: 19,
    /* RFC 7250 */
    /** @type {20} :     server_certificate_type */
    server_certificate_type: 20,
    /* RFC 7250 */
    /** @type {21} :     padding */
    padding: 21,
    /* RFC 7685 */
    /** @type {35} :     session_ticket */
    session_ticket: 35,
    /* [RFC5077][RFC8447] */
    /** @type {41} :     pre_shared_key */
    pre_shared_key: 41,
    /* RFC 8446 */
    /** @type {42} :     early_data */
    early_data: 42,
    /* RFC 8446 */
    /** @type {43} :     supported_versions */
    supported_versions: 43,
    /* RFC 8446 */
    /** @type {44} :     cookie */
    cookie: 44,
    /* RFC 8446 */
    /** @type {45} :     psk_key_exchange_modes */
    psk_key_exchange_modes: 45,
    /* RFC 8446 */
    /** @type {46} :     RESERVED */
    RESERVED: 46,
    /* Used but never assigned */
    /** @type {47} :     certificate_authorities */
    certificate_authorities: 47,
    /* RFC 8446 */
    /** @type {48} :     oid_filters */
    oid_filters: 48,
    /* RFC 8446 */
    /** @type {49} :     post_handshake_auth */
    post_handshake_auth: 49,
    /* RFC 8446 */
    /** @type {50} :     signature_algorithms_cert */
    signature_algorithms_cert: 50,
    /* RFC 8446 */
    /** @type {51} :     key_share */
    key_share: 51,
    /* RFC 8446 */
    /** @type {65535} :     Max */
    [Enum.max]: 65535,
    [Enum.class]: ExtensionType
  });
  /**
   * 
   * @param {number} extensionType 
   * @param {Uint8Array} extension_data 
   */
  static new(extension_data, extensionType) {
    return new _Extension(extension_data, extensionType);
  }
  static extensions = {
    server_name: {
      /**
       * 
       * @param  {...string} serverName 
       * @returns Extension
       */
      serverNames(...serverName) {
        return new _Extension(ServerNameList.list(...serverName), _Extension.types.server_name);
      }
    },
    supported_groups: new _Extension(NamedGroupList.list(), _Extension.types.supported_groups),
    signature_algorithms: new _Extension(SignatureSchemeList.list(), _Extension.types.signature_algorithms),
    supported_versions: {
      client: new _Extension(SupportedVersions.client(), _Extension.types.supported_versions),
      server: new _Extension(SupportedVersions.server(), _Extension.types.supported_versions)
    },
    psk_key_exchange_modes: new _Extension(PskKeyExchangeModes.psk_dhe_ke(), _Extension.types.psk_key_exchange_modes),
    key_share: {
      async client() {
        return new _Extension(await ClientShares.keyShareClientHello(), _Extension.types.key_share);
      },
      //
      server: {
        async x25519() {
          return new _Extension(await ServerShare.x25519(), _Extension.types.key_share);
        },
        async p521() {
          return new _Extension(await ServerShare.p521(), _Extension.types.key_share);
        },
        async p384() {
          return new _Extension(await ServerShare.p384(), _Extension.types.key_share);
        },
        async p256() {
          return new _Extension(await ServerShare.p256(), _Extension.types.key_share);
        }
      }
      //
    }
  };
  /**
   * 
   * @param {number} extensionType 
   * @param {Uint8Array} extension_data 
   */
  constructor(extension_data, extensionType) {
    extensionType = extensionType_(extensionType);
    extension_data = uint8array(extension_data);
    super(
      extensionType,
      Minmax.min(0).max(2 ** 16 - 1).byte(extension_data)
      //new OpaqueVar(extension_data, 0, 2 ** 16 - 1)
    );
  }
};
function extensionType_(extType) {
  if (extType instanceof ExtensionType)
    return extType;
  throw TypeError(`Invalid parameter, expected number or Uint16`);
}
var Extensions = class _Extensions extends Minmax {
  /**
   * @param {number} m - minimum length
   * @param {number} M - maximum length
   * @param  {...Extension} extensions 
   */
  static new(m, M, ...extensions) {
    return new _Extensions(m, M, ...extensions);
  }
  /**
   * @param {number} m - minimum length
   * @param {number} M - maximum length
   * @param  {...Extension} extensions 
   */
  constructor(m, M, ...extensions) {
    super(m, M, ...extensions);
  }
};

// serverhello.js
var ServerHello = class _ServerHello extends Struct {
  /**
   * 
   * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
   * @param {CipherSuite} cipher 
   * @param {Extension} serverShareExtension 
   */
  static new(sessionId, cipher, serverShareExtension) {
    return new _ServerHello(sessionId, cipher, serverShareExtension);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
   * @param {CipherSuite} cipher 
   * @param {Extension} serverShareExtension 
   */
  constructor(sessionId, cipher, serverShareExtension) {
    const extensions = Extensions.new(
      6,
      2 ** 16 - 1,
      Extension.SupportedVersions.server,
      serverShareExtension
    );
    super(
      ProtocolVersion.version.legacy,
      Random.new(),
      sessionId,
      cipher,
      LegacyCompressionMethod.new(),
      extensions
    );
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.server_hello(this);
  }
};
var LegacyCompressionMethod = class _LegacyCompressionMethod extends Uint8 {
  static new() {
    return new _LegacyCompressionMethod();
  }
  constructor() {
    super(0);
  }
};

// ticket.js
var NewSessionTicket = class _NewSessionTicket extends Struct {
  #Extension = Extension;
  /**
   * 
   * @param {Uint8Array} ticket 
   * @param {Uint8Array} extension 
   * @returns 
   */
  static new(ticket, ...extensions) {
    return new _NewSessionTicket(ticket, ...extensions);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {Uint8Array} ticket 
   * @param {...Extension} extensions 
   */
  constructor(ticket, ...extensions) {
    const lifetime = new Uint32(7200);
    const ageAdd = new Uint32(0);
    const nonce = Minmax.min(0).max(255).byte(new Uint8(0));
    const opaqueTicket = Minmax.min(1).max(2 ** 16 - 1).byte(ticket);
    super(
      lifetime,
      ageAdd,
      nonce,
      opaqueTicket,
      Extensions.new(0, 2 ** 16 - 2, ...extensions)
    );
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.new_session_ticket(this);
  }
};

// update.js
var EndOfEarlyData = class _EndOfEarlyData extends Struct {
  static new() {
    return new _EndOfEarlyData();
  }
  payload = this.wrap;
  handshake = this.wrap;
  constructor() {
    super();
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.end_of_early_data(this);
  }
};
var KeyUpdateRequest = class extends Uint8 {
  /**
   * 
   * @param {0|1} v 
   */
  constructor(v) {
    if ([0, 1].includes(v) == false)
      throw TypeError(`Expected value 0 or 1`);
    super(v);
  }
};
var KeyUpdate = class _KeyUpdate extends Struct {
  static {
    const types = {
      /**@type {Uint8[0]} update_not_requested */
      update_not_requested: 0,
      /**@type {Uint8[1]} update_requested */
      update_requested: 1,
      [Enum.max]: 255,
      [Enum.class]: KeyUpdateRequest
    };
    this.types = new Enum(types);
  }
  static {
    this.update_not_requested = new _KeyUpdate(_KeyUpdate.types.update_not_requested);
    this.update_requested = new _KeyUpdate(_KeyUpdate.types.update_requested);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {KeyUpdateRequest} request_update //Uint8[0]|Uint8[1]
   */
  constructor(request_update) {
    if (request_update instanceof KeyUpdateRequest == false)
      throw TypeError(`Expected KeyUpdateRequest type`);
    super(request_update);
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.key_update(this);
  }
};

// params.js
var DistinguishedName = class extends Minmax {
  /**
   * 
   * @param {...Uint8Array} distinguishedName 
   */
  constructor(...distinguishedName) {
    super(1, 2 ** 16 - 1, ...distinguishedName);
  }
};
var CertificateAuthoritiesExtension = class extends Struct {
  /**
   * 
   * @param {...DistinguishedName} authority 
   */
  constructor(...authority) {
    super(
      new Minmax(3, 2 ** 16 - 1, ...authority)
    );
  }
};
var Certificate_extension_oid = class extends Minmax {
  /**
   * 
   * @param  {...Uint8Array} oids 
   */
  constructor(...oids) {
    super(1, 2 ** 8 - 1, ...oids);
  }
};
var Certificate_extension_values = class extends Minmax {
  /**
   * 
   * @param  {...Uint8Array} values 
   */
  constructor(...values) {
    super(0, 2 ** 16 - 1, ...values);
  }
};
var OIDFilter = class _OIDFilter extends Struct {
  /**
   * 
   * @param  {...Uint8Array} oids 
   * @returns 
   */
  static certificate_extension_oid(...oids) {
    oids = new Certificate_extension_oid(...oids);
    return {
      /**
       * 
       * @param  {...Uint8Array} values 
       * @returns 
       */
      certificate_extension_values(...values) {
        values = new Certificate_extension_values(...values);
        return new _OIDFilter(oids, values);
      }
    };
  }
  /**
   * 
   * @param {Certificate_extension_oid} certificate_extension_oid 
   * @param {Certificate_extension_values} certificate_extension_values 
   */
  constructor(certificate_extension_oid, certificate_extension_values) {
    if (certificate_extension_oid instanceof Certificate_extension_oid == false)
      throw TypeError(`Expected Certificate_extension_oid type`);
    if (certificate_extension_values instanceof Certificate_extension_values == false)
      throw TypeError(`Expected certificate_extension_values type`);
    super(
      certificate_extension_oid,
      certificate_extension_values
    );
  }
};
var OIDFilterExtension = class extends Struct {
  /**
   * 
   * @param {OIDFilter} OIDFilter 
   */
  constructor(...OIDFilters) {
    super(
      new Minmax(0, 2 ** 16 - 1, ...OIDFilters)
    );
  }
};
var PostHandshakeAuth = class extends Struct {
  constructor() {
    super();
  }
};
var EncryptedExtensions = class _EncryptedExtensions extends Struct {
  static new(...extensions) {
    return new _EncryptedExtensions(...extensions);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {...Extension} extensions 
   */
  constructor(...extensions) {
    if (extensions.length > 0) {
      if (extensions.every((e) => e instanceof Extension) == false)
        throw TypeError(`Expected ...Extension`);
    }
    super(
      Extensions.new(0, 2 ** 16 - 1, ...extensions)
    );
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.encrypted_extensions(this);
  }
};
var CertificateRequest = class _CertificateRequest extends Struct {
  /**
   * 
   * @param {Uint8Array} signature_algorithms - Uint8Array of signature algorithm
   */
  static new(signature_algorithms = SignatureSchemeList.list()) {
    return new _CertificateRequest(signature_algorithms);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {Uint8Array} signature_algorithms - Uint8Array of signature algorithm
   */
  constructor(signature_algorithms = SignatureSchemeList.list()) {
    super(
      new Uint8(0),
      Extensions.new(2, 2 ** 16 - 1, Extension.new(signature_algorithms, Extension.types.signature_algorithms))
    );
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.certificate_request(this);
  }
};

// auth.js
var CertificateType = class extends Uint8 {
  constructor(value) {
    super(value);
  }
};
var CertificateEntry = class extends Struct {
  /**
   * 
   * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
   * @param {Uint16} extensions - optional with default value of Uint8Array([0,0])
   */
  constructor(certificate, extensions = new Uint16(0)) {
    super(
      Minmax.min(1).max(2 ** 24 - 1).byte(certificate),
      //cert_data,
      extensions
    );
  }
};
var Certificate = class _Certificate extends Struct {
  static {
    const types = {
      /**@type {Uint8[0]} X509 - description */
      X509: 0,
      /**@type {Uint8[1]} OpenPGP - description */
      OpenPGP: 1,
      /**@type {Uint8[2]} RawPublicKey - description */
      RawPublicKey: 2,
      /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
      [Enum.max]: 255,
      [Enum.class]: CertificateType
    };
    this.types = new Enum(types);
  }
  static new(certificate_list, certificate_request_context = new Uint8(0)) {
    return new _Certificate(certificate_list, certificate_request_context);
  }
  /**
   * 
   * @param  {...Uint8Array} certs 
   * @returns 
   */
  static certificateEntries(...certs) {
    const certificate_list = Minmax.min(0).max(2 ** 24 - 1).byte(...certs);
    return {
      /**
       * 
       * @param  {Uint8Array} reqContexts 
       * @returns 
       */
      contexts(reqContexts) {
        const certificate_request_context = Minmax.min(0).max(2 ** 8 - 1).byte(reqContexts);
        return new _Certificate(certificate_list, certificate_request_context);
      }
    };
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {CertificateEntry[]} certificate_list - list of CertificateEntry
   * @param {Uint8Array[]} certificate_request_context - optional with default value of new Uint8(0)
   */
  constructor(certificate_list, certificate_request_context = new Uint8(0)) {
    super(
      certificate_request_context,
      certificate_list
    );
  }
  /**
  * 
  * @returns Hanshake message
  */
  wrap() {
    return Handshake.certificate(this);
  }
};
var CertificateVerify = class _CertificateVerify extends Struct {
  static {
    const { SignatureScheme } = SignatureSchemeList;
    this.algorithm = {
      /* RSASSA-PKCS1-v1_5 algorithms */
      /* rsa_pkcs1_sha256(0x0401),
      rsa_pkcs1_sha384(0x0501),
      rsa_pkcs1_sha512(0x0601), */
      /* ECDSA algorithms */
      ecdsa_secp256r1_sha256: sign(SignatureScheme.ecdsa_secp256r1_sha256),
      ecdsa_secp384r1_sha384: sign(SignatureScheme.ecdsa_secp384r1_sha384),
      ecdsa_secp521r1_sha512: sign(SignatureScheme.ecdsa_secp521r1_sha512),
      /* RSASSA-PSS algorithms with public key OID rsaEncryption */
      rsa_pss_rsae_sha256: sign(SignatureScheme.rsa_pss_rsae_sha256),
      rsa_pss_rsae_sha384: sign(SignatureScheme.rsa_pss_rsae_sha384),
      rsa_pss_rsae_sha512: sign(SignatureScheme.rsa_pss_rsae_sha512),
      /* EdDSA algorithms */
      /* ed25519(0x0807),
      ed448(0x0808), */
      /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
      rsa_pss_pss_sha256: sign(SignatureScheme.rsa_pss_pss_sha256),
      rsa_pss_pss_sha384: sign(SignatureScheme.rsa_pss_rsae_sha384),
      rsa_pss_pss_sha512: sign(SignatureScheme.rsa_pss_pss_sha512)
    };
  }
  static new(algorithm, signature) {
    return new _CertificateVerify(algorithm, signature);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {Uint8Array} algorithm SignatureScheme algorithm
   * @param {Uint8Array} signature 
   */
  constructor(algorithm, signature) {
    super(
      algorithm,
      Minmax.min(0).max(2 ** 16 - 1).byte(signature)
    );
  }
  /**
  * 
  * @returns Hanshake message
  */
  wrap() {
    return Handshake.certificate_verify(this);
  }
};
var Finished = class _Finished extends Struct {
  static new(verify_data) {
    return new _Finished(verify_data);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {Uint8Array} verify_data - with length the same as hash length
   */
  constructor(verify_data) {
    super(verify_data);
  }
  /**
  * 
  * @returns Hanshake message
  */
  wrap() {
    return Handshake.finished(this);
  }
};
function sign(algorithm) {
  return {
    /**
     * 
     * @param {Uint8Array} signature 
     * @returns 
     */
    signature(...signatures) {
      return new CertificateVerify(algorithm, ...signatures);
    }
  };
}

// msghash.js
var MessageHash = class _MessageHash extends Uint8Array {
  static {
    this.SHA256 = async function(msg) {
      msg = uint8array(msg);
      const buffer = await crypto.subtle.digest({ name: "SHA-256" }, msg);
      return {
        buffer,
        messageHash: new _MessageHash(buffer)
      };
    }, this.SHA384 = async function(msg) {
      msg = uint8array(msg);
      const buffer = await crypto.subtle.digest({ name: "SHA-384" }, msg);
      return {
        buffer,
        messageHash: new _MessageHash(buffer)
      };
    }, this.SHA512 = async function(msg) {
      msg = uint8array(msg);
      const buffer = await crypto.subtle.digest({ name: "SHA-512" }, msg);
      return {
        buffer,
        messageHash: new _MessageHash(buffer)
      };
    };
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   * 
   * @param {ArrayBuffer} msg 
   */
  constructor(msg) {
    super(msg);
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.message_hash(this);
  }
};

// handshake.js
var HandshakeType = class extends Uint8 {
  constructor(v) {
    super(v);
  }
};
var Handshake = class _Handshake extends Struct {
  static {
    const types = {
      /**@type {Uint8[0]} hello_request_RESERVED */
      hello_request_RESERVED: 0,
      /**@type {Uint8[1]} client_hello */
      client_hello: 1,
      //*Key Exchange
      /**@type {Uint8[2]} server_hello */
      server_hello: 2,
      //*Key Exchange
      /**@type {Uint8[3]} hello_verify_request_RESERVED */
      hello_verify_request_RESERVED: 3,
      /**@type {Uint8[4]} new_session_ticket */
      new_session_ticket: 4,
      //*Ticket Establishment
      /**@type {Uint8[5]} end_of_early_data */
      end_of_early_data: 5,
      //*Updating Keys
      /**@type {Uint8[6]} hello_retry_request_RESERVED */
      hello_retry_request_RESERVED: 6,
      /**@type {Uint8[8]} encrypted_extensions */
      encrypted_extensions: 8,
      //*Server Parameters Messages
      /**@type {Uint8[11]} certificate */
      certificate: 11,
      //*Authentication Messages
      /**@type {Uint8[12]} server_key_exchange_RESERVED */
      server_key_exchange_RESERVED: 12,
      /**@type {Uint8[13]} certificate_request */
      certificate_request: 13,
      //*Server Parameters Messages
      /**@type {Uint8[14]} server_hello_done_RESERVED */
      server_hello_done_RESERVED: 14,
      /**@type {Uint8[15]} certificate_verify */
      certificate_verify: 15,
      //*Authentication Messages
      /**@type {Uint8[16]} client_key_exchange_RESERVED */
      client_key_exchange_RESERVED: 16,
      /**@type {Uint8[20]} finished */
      finished: 20,
      //*Authentication Messages
      /**@type {Uint8[21]} certificate_url_RESERVED */
      ertificate_url_RESERVED: 21,
      /**@type {Uint8[22]} certificate_status_RESERVED */
      certificate_status_RESERVED: 22,
      /**@type {Uint8[23]} supplemental_data_RESERVED */
      supplemental_data_RESERVED: 23,
      /**@type {Uint8[24]} key_update */
      key_update: 24,
      //*Updating Keys
      /**@type {Uint8[254]} message_hash */
      message_hash: 254,
      /**@type {Uint8[255]} [Enum.max] */
      [Enum.max]: 255,
      [Enum.class]: HandshakeType
    };
    this.types = new Enum(types);
    this.client_hello = function(msg) {
      if (msg instanceof ClientHello == true)
        return new _Handshake(msg, this.types.client_hello);
      throw TypeError(`msg is not ClientHello class`);
    };
    this.server_hello = function(msg) {
      if (msg instanceof ServerHello == true)
        return new _Handshake(msg, this.types.server_hello);
      throw TypeError(`msg is not ServerHello class`);
    };
    this.new_session_ticket = function(msg) {
      if (msg instanceof NewSessionTicket == true)
        return new _Handshake(msg, this.types.new_session_ticket);
      throw TypeError(`msg is not NewSessionTicket class`);
    };
    this.end_of_early_data = function(msg) {
      if (msg instanceof EndOfEarlyData == true)
        return new _Handshake(msg, this.types.end_of_early_data);
      throw TypeError(`msg is not EndOfEarlyData class`);
    };
    this.encrypted_extensions = function(msg) {
      if (msg instanceof EncryptedExtensions == true)
        return new _Handshake(msg, types.encrypted_extensions);
      throw TypeError(`msg is not EncryptedExtensions class`);
    };
    this.certificate = function(msg) {
      if (msg instanceof Certificate == true)
        return new _Handshake(msg, this.types.certificate);
      throw TypeError(`msg is not Certificate class`);
    };
    this.certificate_request = function(msg) {
      if (msg instanceof CertificateRequest == true)
        return new _Handshake(msg, this.types.certificate_request);
      throw TypeError(`msg is not CertificateRequest class`);
    };
    this.certificate_verify = function(msg) {
      if (msg instanceof CertificateVerify == true)
        return new _Handshake(msg, this.types.certificate_verify);
      throw TypeError(`msg is not CertificateVerify class`);
    };
    this.finished = function(msg) {
      if (msg instanceof Finished == true)
        return new _Handshake(msg, this.types.finished);
      throw TypeError(`msg is not Finished class`);
    };
    this.key_update = function(msg) {
      if (msg instanceof KeyUpdate == true)
        return new _Handshake(msg, this.types.key_update);
      throw TypeError(`msg is not KeyUpdate class`);
    };
    this.message_hash = function(msg) {
      if (msg instanceof MessageHash == true)
        return new _Handshake(msg, this.types.message_hash);
      throw TypeError(`msg is not MessageHash class`);
    };
  }
  /**
   * 
   * @param {Uint8Array} message - with additional "type" property
   * @param {HandshakeType} type - description
   */
  constructor(message, type) {
    const length = new Uint24(message.length);
    super(
      type,
      length,
      //*uint24 
      message
    );
  }
  get sequence() {
    return {
      type: new Uint8(),
      length: new Uint24(),
      message: new Uint8Array()
    };
  }
};

// clienthello.js
var clientShares = await ClientShares.keyShareClientHello();
var SessionId = class _SessionId extends Minmax {
  static new() {
    return new _SessionId();
  }
  constructor() {
    super(
      0,
      32,
      new Uint8Array(Array.from(
        crypto.randomUUID().replaceAll("-", ""),
        (e) => e.charCodeAt(0)
      ))
    );
  }
};
var LegacyCompressionMethods = class _LegacyCompressionMethods extends Minmax {
  static new() {
    return new _LegacyCompressionMethods();
  }
  constructor() {
    super(1, 2 ** 8 - 1, new Uint8(0));
  }
};
var ClientHello = class _ClientHello extends Struct {
  clientShares;
  /**
   * 
   * @param  {...string} serverNames 
   * @returns Promise for ClientHello
   */
  static new(...serverNames) {
    return new _ClientHello(...serverNames);
  }
  payload = this.wrap;
  handshake = this.wrap;
  /**
   *
   * @param {...string} serverNames - Server Name Indication i.e. "localhost"
   */
  constructor(...serverNames) {
    const exts = [
      Extension.extensions.server_name.serverNames(...serverNames),
      Extension.extensions.supported_groups,
      Extension.extensions.signature_algorithms,
      Extension.extensions.supported_versions.client,
      Extension.extensions.psk_key_exchange_modes,
      Extension.new(clientShares, Extension.types.key_share)
    ];
    super(
      ProtocolVersion.version.legacy,
      Random.new(),
      SessionId.new(),
      CipherSuites.new(),
      LegacyCompressionMethods.new(),
      Extensions.new(
        8,
        2 ** 16 - 1,
        ...exts
      )
    );
    this.clientShares = clientShares;
    this.sessionId = this.member[2];
    this.cipherSuites = this.member[3];
  }
  /**
   * 
   * @returns Hanshake message
   */
  wrap() {
    return Handshake.client_hello(this);
  }
};

// record.js
import { concat as concat3 } from "@aicone/byte";
var ContentType = class extends Uint8 {
  constructor(value) {
    super(value);
  }
};
var TLSPlaintext = class _TLSPlaintext extends Struct {
  static {
    const types = {
      /**@type {Uint8[0]} invalid - description */
      invalid: 0,
      /**@type {Uint8[20]} change_cipher_spec - description */
      change_cipher_spec: 20,
      /**@type {Uint8[21]} alert - description */
      alert: 21,
      /**@type {Uint8[22]} handshake - description */
      handshake: 22,
      /**@type {Uint8[23]} application_data - description */
      application_data: 23,
      /**@type {Uint8[24]} heartbeat - description */
      heartbeat: 24,
      /* RFC 6520 */
      [Enum.max]: 255,
      [Enum.class]: ContentType
    };
    this.contentType = new Enum(types);
    this.alert = function(fragment) {
      return new _TLSPlaintext(fragment, this.contentType.alert);
    };
    this.application_data = function(fragment) {
      return new _TLSPlaintext(fragment, this.contentType.application_data);
    };
    this.change_cipher_spec = function(payload = ChangeCipherSpec.new()) {
      return new _TLSPlaintext(payload, this.contentType.change_cipher_spec);
    };
    this.handshake = function(msg) {
      return new _TLSPlaintext(msg.wrap(), this.contentType.handshake);
    };
    this.heartbeat = function(fragment) {
      return new _TLSPlaintext(fragment, this.contentType.heartbeat);
    };
    this.invalid = function(fragment) {
      return new _TLSPlaintext(fragment, this.contentType.invalid);
    };
  }
  /**
   * 
   * @param {Uint8Array} fragment - the data being transmitted
   * @param {ContentType} type - description
   */
  constructor(fragment, type) {
    const length = new Uint16(fragment.length);
    super(
      type,
      ProtocolVersion.version.legacy,
      //*uint16
      length,
      //*uint16
      fragment
    );
  }
};
var TLSInnerPlaintext = class _TLSInnerPlaintext extends Struct {
  static {
    const { contentType } = TLSPlaintext;
    this.alert = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.alert, zeros);
    };
    this.application_data = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.application_data, zeros);
    };
    this.change_cipher_spec = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.change_cipher_spec, zeros);
    };
    this.handshake = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.handshake, zeros);
    };
    this.heartbeat = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.heartbeat, zeros);
    };
    this.invalid = function(content, zeros) {
      return new _TLSInnerPlaintext(content, contentType.invalid, zeros);
    };
  }
  /**
   * 
   * @param {TLSPlaintext} content 
   * @param {ContentType} type 
   * @param {number} zeros 
   */
  constructor(content, type, zeros) {
    content = content_(content);
    type = contentType_(type);
    zeros = zeros_(zeros);
    const args = [content, type];
    if (zeros && zeros.length)
      args.push(zeros);
    super(...args);
  }
};
function content_(content) {
  if (content instanceof TLSPlaintext == false)
    throw TypeError(`Content must be TLSPlaintext class`);
  return content;
}
function contentType_(type) {
  if (type instanceof ContentType)
    return type;
  throw TypeError(`Uknown type - ${type}`);
}
function zeros_(length) {
  length = Number(length);
  if (length && typeof length == "number")
    return new Uint8Array(length);
  return false;
}
var TLSCiphertext = class _TLSCiphertext extends Struct {
  /**
   * 
   * @param {Uint8Array} encryptedRecord 
   */
  static new(encryptedRecord) {
    return new _TLSCiphertext(encryptedRecord);
  }
  /**
   * 
   * @param {Uint8Array} encryptedRecord 
   */
  constructor(encryptedRecord) {
    const length = new Uint16(encryptedRecord.length);
    super(
      TLSPlaintext.contentType.application_data,
      /* type.application_data[23] */
      ProtocolVersion.version.legacy,
      /* TLS v1.2 */
      length,
      //*uint16
      encryptedRecord
    );
    this.encryptedRecord = encryptedRecord;
    this.header = concat3(TLSPlaintext.contentType.application_data, ProtocolVersion.version.legacy, length);
  }
};
var ChangeCipherSpec = class _ChangeCipherSpec extends Uint8 {
  static new() {
    return new _ChangeCipherSpec();
  }
  constructor() {
    super(1);
  }
};
export {
  Alert,
  Certificate,
  CertificateAuthoritiesExtension,
  CertificateEntry,
  CertificateRequest,
  CertificateVerify,
  Certificate_extension_oid,
  Certificate_extension_values,
  ChangeCipherSpec,
  CipherSuite,
  CipherSuites,
  ClientHello,
  ClientShares,
  DistinguishedName,
  EncryptedExtensions,
  EndOfEarlyData,
  Enum,
  Extension,
  Extensions,
  Finished,
  Fixed,
  Handshake,
  Key,
  KeyShareClientHello,
  KeyShareEntry,
  KeyShareHelloRetryRequest,
  KeyShareServerHello,
  KeyUpdate,
  Keys,
  MessageHash,
  Minmax,
  NamedGroup,
  NamedGroupList,
  NewSessionTicket,
  OIDFilter,
  OIDFilterExtension,
  PostHandshakeAuth,
  ProtocolVersion,
  PskKeyExchangeModes,
  Random,
  ServerHello,
  ServerName,
  ServerNameList,
  ServerShare,
  SignatureSchemeList,
  Struct,
  SupportedVersions,
  TLSCiphertext,
  TLSInnerPlaintext,
  TLSPlaintext,
  Uint16,
  Uint24,
  Uint32,
  Uint8,
  Uints,
  keyShareServerHello
};
