class TLSContentType extends Uint8Array {
   // Static mapping of content types according to TLS 1.3 specification
   static TYPES = {
       INVALID: 0,
       CHANGE_CIPHER_SPEC: 20,
       ALERT: 21,
       HANDSHAKE: 22,
       APPLICATION_DATA: 23,
       HEARTBEAT: 24  // From RFC 6520
   };

   // Reverse mapping for byte to name lookup
   static TYPES_BY_BYTE = Object.entries(TLSContentType.TYPES)
       .reduce((acc, [key, value]) => ({...acc, [value]: key}), {});

   constructor(input) {
       // Call super with a single byte buffer first
       super(1);

       // Then process the input and set the value
       let value;
       if (input instanceof Uint8Array) {
           if (input.length === 0) {
               throw new Error('Uint8Array cannot be empty');
           }
           value = input[0];
       } else if (typeof input === 'number') {
           if (!Number.isInteger(input) || input < 0 || input > 255) {
               throw new Error('Byte value must be an integer between 0 and 255');
           }
           value = input;
       } else if (typeof input === 'string') {
           const normalizedName = input.toUpperCase();
           if (!(normalizedName in TLSContentType.TYPES)) {
               throw new Error(`Unknown content type: ${input}`);
           }
           value = TLSContentType.TYPES[normalizedName];
       } else {
           throw new Error('Input must be either a Uint8Array, byte (number), or content type name (string)');
       }

       // Set the value
       this[0] = value;

       // Initialize metadata properties
       Object.defineProperties(this, {
           'byte': {
               value: this[0],
               writable: false,
               enumerable: true
           },
           'name': {
               value: TLSContentType.TYPES_BY_BYTE[this[0]] || 'UNKNOWN',
               writable: false,
               enumerable: true
           },
           'isValid': {
               value: this[0] in TLSContentType.TYPES_BY_BYTE,
               writable: false,
               enumerable: true
           }
       });
   }

   // Get content type value
   getValue() {
       return this[0];
   }

   // Get string representation
   toString() {
       return this.name;
   }

   // Check if content type is valid according to TLS 1.3
   isValidType() {
       return this.isValid;
   }

   // Clone the content type
   clone() {
       return new TLSContentType(this);
   }

   // Compare with another content type
   equals(other) {
       if (other instanceof TLSContentType) {
           return this[0] === other[0];
       } else if (other instanceof Uint8Array) {
           return this[0] === other[0];
       } else if (typeof other === 'number') {
           return this[0] === other;
       } else if (typeof other === 'string') {
           return this.name === other.toUpperCase();
       }
       return false;
   }

   // Static methods
   static getValidTypes() {
       return Object.keys(TLSContentType.TYPES).filter(type => type !== 'INVALID');
   }

   static isValidByte(byte) {
       return byte in TLSContentType.TYPES_BY_BYTE;
   }

   static isValidUint8Array(array) {
       if (array.length === 0) return false;
       return this.isValidByte(array[0]);
   }

   // Static factory methods
   static fromByte(byte) {
       return new TLSContentType(byte);
   }

   static fromString(name) {
       return new TLSContentType(name);
   }

   static fromUint8Array(array) {
       return new TLSContentType(array);
   }

   // Predefined content types
   static get INVALID() { return new TLSContentType(TLSContentType.TYPES.INVALID); }
   static get CHANGE_CIPHER_SPEC() { return new TLSContentType(TLSContentType.TYPES.CHANGE_CIPHER_SPEC); }
   static get ALERT() { return new TLSContentType(TLSContentType.TYPES.ALERT); }
   static get HANDSHAKE() { return new TLSContentType(TLSContentType.TYPES.HANDSHAKE); }
   static get APPLICATION_DATA() { return new TLSContentType(TLSContentType.TYPES.APPLICATION_DATA); }
   static get HEARTBEAT() { return new TLSContentType(TLSContentType.TYPES.HEARTBEAT); }
}
