// base.js
import { concat, Uint8BE, Uint16BE, Uint24BE, Uint32BE, maxBytes, uint, uint8array } from "@aicone/byte";
import { getUint8, getUint16, getUint24, getUint32 } from "@aicone/byte";
var Struct2 = class extends Uint8Array {
  #member;
  /**
   * @param  {...Uint8Array} uint8s  
   */
  constructor(...uint8s) {
    if (!uint8s || uint8s.length == 0) {
      super();
    } else if (uint8s.some((e) => e instanceof Uint8Array == false)) {
      throw TypeError(`all arguments must be Uint8Array`);
    } else {
      super(concat(...uint8s));
    }
    this.#member = uint8s;
  }
  /**
   * 
   * @returns {Uint8Array[]} array of Uint8Array
   */
  member() {
    return this.#member;
  }
};
var VectorFix = class extends Uint8Array {
  /**
   * 
   * @param {Uint8Array} _uint8array - data
   * @param {uint} length - length uint
   */
  constructor(_uint8array = new Uint8Array(), length = 0) {
    _uint8array = uint8array(_uint8array);
    length = uint(length);
    if (_uint8array.length !== length)
      throw TypeError(`_uint8array.length [${_uint8array.length}] !== length [${length}]`);
    super(_uint8array.buffer);
  }
};
var OpaqueFix = VectorFix;
var VectorVar = class extends Uint8Array {
  #member;
  /**
   * 
   * @param {Uint8Array} _uint8array 
   * @param {uint} min 
   * @param {uint} max 
   */
  constructor(_uint8array = new Uint8Array(), min = 0, max = 0) {
    _uint8array = uint8array(_uint8array);
    min = uint(min);
    max = uint(max);
    if (_uint8array.length < min)
      throw TypeError(`value should have a min length of ${min}`);
    if (_uint8array.length > max)
      throw TypeError(`value should have a max length of ${max}`);
    const length = Uint8BE(_uint8array.length, maxBytes(max));
    super(concat(length, _uint8array));
    this.#member = {
      length,
      data: _uint8array
    };
  }
  /**
   * 
   * @returns {Uint8Array[]} array of Uint8Array
   */
  member() {
    return this.#member;
  }
};
var OpaqueVar = VectorVar;
var Uint82 = class extends Uint8Array {
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
var Uint162 = class extends Uint8Array {
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
var Uint24 = class extends Uint8Array {
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
var Uint32 = class extends Uint8Array {
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
  // as property for sign of max value in Enum
  static max = Symbol("max");
  // for max value (if any)
  #maxvalue;
  /**
   * 
   * @param {{any:any}} object 
   */
  constructor(object) {
    for (const prop in object) {
      this.#reverse[object[prop]] = prop;
      Object.defineProperty(
        this,
        prop,
        {
          value: object[prop],
          writable: false,
          enumerable: true
        }
      );
    }
    if (Object.hasOwn(object, _Enum.max))
      this.#maxvalue = object[_Enum.max];
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
};

// alert.js
var _level = {
  /**@type {1} warning */
  warning: 1,
  /**@type {2} fatal */
  fatal: 2,
  /**@type {255} [Enum.max] */
  [Enum.max]: 255
};
var desc = {
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
  [Enum.max]: 255
};
var Alert = class _Alert extends Struct2 {
  /**
   * @type {_level} Alert.level - level of alert
   */
  static level = new Enum(_level);
  /**
   * @type {desc} Alert.description - description of alert
   */
  static description = new Enum(desc);
  /**
   * @typedef {number} uint 
   * @param {("warning"|"fatal")|(1|2)|Uint8Array} _level 
   * @param {("close_notify"|"unexpected_message"|"bad_record_mac"|"decryption_failed_RESERVED"|"record_overflow"|"decompression_failure_RESERVED"|"handshake_failure"|"no_certificate_RESERVED"|"bad_certificate"|"unsupported_certificate"|"certificate_revoked"|"certificate_expired"|"certificate_unknown"|"illegal_parameter"|"unknown_ca"|"access_denied"|"decode_error"|"decrypt_error"|"export_restriction_RESERVED"|"protocol_version"|"insufficient_security"|"internal_error"|"inappropriate_fallback"|"user_canceled"|"no_renegotiation_RESERVED"|"missing_extension"|"unsupported_extension"|"certificate_unobtainable_RESERVED"|"unrecognized_name"|"bad_certificate_status_response"|"bad_certificate_hash_value_RESERVED"|"unknown_psk_identity"|"certificate_required"|"no_application_protocol")|(0|10|20|21|22|30|40|41|42|43|44|45|46|47|48|49|50|51|60|70|71|80|86|90|100|109|110|111|112|113|114|115|116|120)} _desc
   */
  constructor(_level2, _desc) {
    if (_level2 instanceof Uint8Array) {
      super(_level2[0], _level2[1]);
    } else {
      _level2 = level(_level2);
      _desc = description(_desc);
      super(_level2, _desc);
    }
  }
  /**
   * return the meaning of alert message in human readable format
   * @returns {string} formated as`"alert[code]-description[code]"`
   */
  meaning() {
    const level2 = this[0];
    const desc2 = this[1];
    return `${_Alert.level.key(level2)}[${level2}]-${_Alert.description.key(desc2)}[${desc2}]`;
  }
};
function level(_level2) {
  let code;
  if (typeof _level2 == "string") {
    code = Alert.level.value(_level2);
    if (!code)
      throw TypeError(`Uknown level :${_level2}`);
  }
  if (typeof _level2 == "number") {
    const desc2 = Alert.level.key(_level2);
    if (!desc2)
      throw TypeError(`Uknown code: ${_level2}`);
    code = _level2;
  }
  if (!code)
    throw TypeError(`Uknown level :${_level2}`);
  return new Uint82(code);
}
function description(desc2) {
  let code;
  if (typeof desc2 == "string") {
    code = Alert.description.value(desc2);
    if (!code)
      throw TypeError(`Uknown level :${desc2}`);
  }
  if (typeof desc2 == "number") {
    const _desc = Alert.description.key(desc2);
    if (!_desc)
      throw TypeError(`Uknown code: ${desc2}`);
    code = desc2;
  }
  if (!code)
    throw TypeError(`Uknown level :${desc2}`);
  return new Uint82(code);
}

// keyexchange.js
var ProtocolVersion = class extends Uint162 {
  /**
   * 
   * @param {0x0303|0x0304} ver - TLS version (1.2 or 1.3) 
   */
  constructor(ver) {
    ver = version(ver);
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
function version(ver) {
  if ([771, 772].includes(ver) == false)
    throw TypeError(`Unexpected version - ${ver}`);
  return ver;
}
var legacy_version = new ProtocolVersion(771);
var Random = class extends OpaqueFix {
  constructor() {
    const rnd32 = crypto.getRandomValues(new Uint8Array(32));
    super(rnd32, 32);
  }
};

// record.js
import { concat as concat2 } from "@aicone/byte";
var contentType = {
  /**@type {0} invalid */
  invalid: 0,
  /**@type {20} change_cipher_spec */
  change_cipher_spec: 20,
  /**@type {21} alert */
  alert: 21,
  /**@type {22} handshake */
  handshake: 22,
  /**@type {23} application_data */
  application_data: 23,
  /**@type {24} heartbeat */
  heartbeat: 24,
  /* RFC 6520 */
  /**@type {255} [Enum.max] */
  [Enum.max]: 255
};
var ContentType = new Enum(contentType);
var TLSPlaintext = class extends Struct2 {
  /**
   * 
   * @param {Uint8Array} fragment - the data being transmitted
   */
  constructor(fragment) {
    fragment = fragment_(fragment);
    const length = new Uint162(fragment.length);
    super(
      fragment.type,
      legacy_version,
      //*uint16
      length,
      //*uint16
      fragment
    );
  }
};
function fragment_(fragment) {
  const { type } = fragment;
  if (!type)
    throw TypeError(`Fragment doesn't have type`);
  if (ContentType.keys().includes(type) == false)
    throw TypeError(`Unknown fragment type - ${type}`);
  return fragment;
}
var TLSInnerPlaintext = class extends Struct2 {
  /**
   * 
   * @param {TLSPlaintext} content 
   * @param {string|number} contentType 
   * @param {number} zeros 
   */
  constructor(content, contentType2, zeros) {
    content = content_(content);
    contentType2 = contentType_(contentType2);
    zeros = zeros_(zeros);
    const args = [content, contentType2];
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
  const typeOf = typeof type;
  if (typeOf == "number" && ContentType.values().includes(type) == false)
    throw TypeError(`Uknown type - ${type}`);
  if (typeOf == "string" && ContentType.keys().includes(type) == false)
    throw TypeError(`Uknown type - ${type}`);
  return new Uint82(type);
}
function zeros_(length) {
  if (length)
    return new Uint8Array(length);
  return false;
}
var TLSCiphertext = class extends Struct2 {
  /**
   * 
   * @param {Uint8Array} encryptedRecord 
   */
  constructor(encryptedRecord) {
    const length = new Uint162(encryptedRecord.length);
    super(
      new Uint82(23),
      /* ContentType.application_data[23] */
      legacy_version,
      /* TLS v1.2 */
      length,
      //*uint16
      encryptedRecord
    );
    this.encryptedRecord = encryptedRecord;
    this.header = concat2(new Uint82(23), legacy_version, length);
  }
};
var ChangeCipherSpec = new Uint8Array([20, 3, 3, 0, 1, 1]);

// handshake.js
var handshakeType = {
  /**@type {0} hello_request_RESERVED */
  hello_request_RESERVED: 0,
  /**@type {1} client_hello */
  client_hello: 1,
  //*Key Exchange
  /**@type {2} server_hello */
  server_hello: 2,
  //*Key Exchange
  /**@type {3} hello_verify_request_RESERVED */
  hello_verify_request_RESERVED: 3,
  /**@type {4} new_session_ticket */
  new_session_ticket: 4,
  //*Ticket Establishment
  /**@type {5} end_of_early_data */
  end_of_early_data: 5,
  //*Updating Keys
  /**@type {6} hello_retry_request_RESERVED */
  hello_retry_request_RESERVED: 6,
  /**@type {8} encrypted_extensions */
  encrypted_extensions: 8,
  //*Server Parameters Messages
  /**@type {11} certificate */
  certificate: 11,
  //*Authentication Messages
  /**@type {12} server_key_exchange_RESERVED */
  server_key_exchange_RESERVED: 12,
  /**@type {13} certificate_request */
  certificate_request: 13,
  //*Server Parameters Messages
  /**@type {14} server_hello_done_RESERVED */
  server_hello_done_RESERVED: 14,
  /**@type {15} certificate_verify */
  certificate_verify: 15,
  //*Authentication Messages
  /**@type {16} client_key_exchange_RESERVED */
  client_key_exchange_RESERVED: 16,
  /**@type {20} finished */
  finished: 20,
  //*Authentication Messages
  /**@type {21} certificate_url_RESERVED */
  ertificate_url_RESERVED: 21,
  /**@type {22} certificate_status_RESERVED */
  certificate_status_RESERVED: 22,
  /**@type {23} supplemental_data_RESERVED */
  supplemental_data_RESERVED: 23,
  /**@type {24} key_update */
  key_update: 24,
  //*Updating Keys
  /**@type {254} message_hash */
  message_hash: 254,
  /**@type {255} [Enum.max] */
  [Enum.max]: 255
};
var HandshakeType = new Enum(handshakeType);
var Handshake = class extends Struct2 {
  type = ContentType.handshake;
  /**
   * 
   * @param {Uint8Array} message - with additional "type" property
   */
  constructor(message) {
    message = message_(message);
    const length = new Uint24(message.length);
    super(
      message.type,
      length,
      //*uint24 
      message
    );
  }
};
function message_(msg) {
  const { type } = msg;
  if (!type)
    throw TypeError(`msg doesn't have type`);
  if (HandshakeType.keys().includes(type) == false)
    throw TypeError(`Unknown msg type - ${type}`);
  return msg;
}

// auth.js
var certificateType = {
  /**@type {0} X509 */
  X509: 0,
  /**@type {1} OpenPGP */
  OpenPGP: 1,
  /**@type {2} RawPublicKey */
  RawPublicKey: 2,
  /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
  /**@type {255} Enum.max */
  [Enum.max]: 255
};
var CertificateType = new Enum(certificateType);
var CertificateEntry = class extends Struct {
  /**
   * 
   * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
   * @param {Uint8Array([0,0])} extensions - optional with default value of Uint8Array([0,0])
   */
  constructor(certificate, extensions = new Uint16(0)) {
    const opaqueCert = new OpaqueVar(certificate, 1, 2 ** 24 - 1);
    super(
      opaqueCert,
      extensions
    );
  }
};
var Certificate = class extends Struct {
  type = HandshakeType.certificate;
  /**
   * 
   * @param {CertificateEntry[]} certificateEntries - list of CertificateEntry
   * @param {OpaqueVar} certificate_request_context - optional with default value of new Uint8(0)
   */
  constructor(certificateEntries, certificate_request_context = new Uint8(0)) {
    const certificate_list = new OpaqueVar(certificateEntries, 0, 2 ** 24 - 1);
    super(
      certificate_request_context,
      certificate_list
    );
  }
};
var CertificateVerify = class extends Struct {
  type = HandshakeType.certificate_verify;
  /**
   * 
   * @param {Uint8Array} algorithm SignatureScheme algorithm
   * @param {Uint8Array} signature 
   */
  constructor(algorithm, signature) {
    const opaqueSignature = new OpaqueVar(signature, 0, 2 ** 16 - 1);
    super(
      algorithm,
      opaqueSignature
    );
  }
};
var Finished = class extends Struct {
  type = HandshakeType.finished;
  /**
   * 
   * @param {Uint8Array} verify_data - with length the same as hash length
   */
  constructor(verify_data) {
    super(verify_data);
  }
};
export {
  Alert,
  Certificate,
  CertificateEntry,
  CertificateType,
  CertificateVerify,
  ChangeCipherSpec,
  ContentType,
  Enum,
  Finished,
  Handshake,
  HandshakeType,
  OpaqueFix,
  OpaqueVar,
  ProtocolVersion,
  Random,
  Struct2 as Struct,
  TLSCiphertext,
  TLSInnerPlaintext,
  TLSPlaintext,
  Uint162 as Uint16,
  Uint24,
  Uint32,
  Uint82 as Uint8,
  VectorFix,
  VectorVar,
  legacy_version
};
