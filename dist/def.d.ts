export var Alert: {
    new (_level2: any, _desc: ("close_notify" | "unexpected_message" | "bad_record_mac" | "decryption_failed_RESERVED" | "record_overflow" | "decompression_failure_RESERVED" | "handshake_failure" | "no_certificate_RESERVED" | "bad_certificate" | "unsupported_certificate" | "certificate_revoked" | "certificate_expired" | "certificate_unknown" | "illegal_parameter" | "unknown_ca" | "access_denied" | "decode_error" | "decrypt_error" | "export_restriction_RESERVED" | "protocol_version" | "insufficient_security" | "internal_error" | "inappropriate_fallback" | "user_canceled" | "no_renegotiation_RESERVED" | "missing_extension" | "unsupported_extension" | "certificate_unobtainable_RESERVED" | "unrecognized_name" | "bad_certificate_status_response" | "bad_certificate_hash_value_RESERVED" | "unknown_psk_identity" | "certificate_required" | "no_application_protocol") | (0 | 10 | 20 | 21 | 22 | 30 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 60 | 70 | 71 | 80 | 86 | 90 | 100 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 120)): {
        [index: number]: number;
        /**
         * return the meaning of alert message in human readable format
         * @returns {string} formated as`"alert[code]-description[code]"`
         */
        meaning(): string;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    /**
     * @type {_level} Alert.level - level of alert
     */
    level: {
        [x: symbol]: 255;
        /**@type {1} warning */
        warning: 1;
        /**@type {2} fatal */
        fatal: 2;
    };
    /**
     * @type {desc} Alert.description - description of alert
     */
    description: {
        [x: symbol]: 255;
        /**@type {0} close_notify */
        close_notify: 0;
        /**@type {10} unexpected_message */
        unexpected_message: 10;
        /**@type {20} bad_record_mac */
        bad_record_mac: 20;
        /**@type {21} decryption_failed_RESERVED */
        decryption_failed_RESERVED: 21;
        /**@type {22} record_overflow */
        record_overflow: 22;
        /**@type {30} decompression_failure_RESERVED */
        decompression_failure_RESERVED: 30;
        /**@type {40} handshake_failure */
        handshake_failure: 40;
        /**@type {41} no_certificate_RESERVED */
        no_certificate_RESERVED: 41;
        /**@type {42} bad_certificate */
        bad_certificate: 42;
        /**@type {43} unsupported_certificate */
        unsupported_certificate: 43;
        /**@type {44} certificate_revoked */
        certificate_revoked: 44;
        /**@type {45} certificate_expired */
        certificate_expired: 45;
        /**@type {46} certificate_unknown */
        certificate_unknown: 46;
        /**@type {47} illegal_parameter */
        illegal_parameter: 47;
        /**@type {48} unknown_ca */
        unknown_ca: 48;
        /**@type {49} access_denied */
        access_denied: 49;
        /**@type {50} decode_error */
        decode_error: 50;
        /**@type {51} decrypt_error */
        decrypt_error: 51;
        /**@type {60} export_restriction_RESERVED */
        export_restriction_RESERVED: 60;
        /**@type {70} protocol_version */
        protocol_version: 70;
        /**@type {71} insufficient_security */
        insufficient_security: 71;
        /**@type {80} internal_error */
        internal_error: 80;
        /**@type {86} inappropriate_fallback */
        inappropriate_fallback: 86;
        /**@type {90} user_canceled */
        user_canceled: 90;
        /**@type {100} no_renegotiation_RESERVED */
        no_renegotiation_RESERVED: 100;
        /**@type {109} missing_extension */
        missing_extension: 109;
        /**@type {110} unsupported_extension */
        unsupported_extension: 110;
        /**@type {111} certificate_unobtainable_RESERVED */
        certificate_unobtainable_RESERVED: 111;
        /**@type {112} unrecognized_name */
        unrecognized_name: 112;
        /**@type {113} bad_certificate_status_response */
        bad_certificate_status_response: 113;
        /**@type {114} bad_certificate_hash_value_RESERVED */
        bad_certificate_hash_value_RESERVED: 114;
        /**@type {115} unknown_psk_identity */
        unknown_psk_identity: 115;
        /**@type {116} certificate_required */
        certificate_required: 116;
        /**@type {120} no_application_protocol */
        no_application_protocol: 120;
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var Certificate: {
    new (certificateEntries: {}[], certificate_request_context?: {
        new (_uint8array?: Uint8Array, min?: number, max?: number): {
            [index: number]: number;
            "__#2@#member": {
                length: any;
                data: Uint8Array;
            };
            /**
             *
             * @returns {Uint8Array[]} array of Uint8Array
             */
            member(): Uint8Array[];
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: ArrayBufferLike;
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin(target: number, start: number, end?: number): any;
            every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
            fill(value: number, start?: number, end?: number): any;
            filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
            find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
            findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
            forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
            indexOf(searchElement: number, fromIndex?: number): number;
            join(separator?: string): string;
            lastIndexOf(searchElement: number, fromIndex?: number): number;
            readonly length: number;
            map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
            reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
            reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
            reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
            reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
            reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
            reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
            reverse(): Uint8Array;
            set(array: ArrayLike<number>, offset?: number): void;
            slice(start?: number, end?: number): Uint8Array;
            some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
            sort(compareFn?: (a: number, b: number) => number): any;
            subarray(begin?: number, end?: number): Uint8Array;
            toLocaleString(): string;
            toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
            toString(): string;
            valueOf(): Uint8Array;
            entries(): IterableIterator<[number, number]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<number>;
            includes(searchElement: number, fromIndex?: number): boolean;
            at(index: number): number | undefined;
            findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
            findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
            findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
            toReversed(): Uint8Array;
            toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
            with(index: number, value: number): Uint8Array;
            [Symbol.iterator](): IterableIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8Array";
        };
        readonly BYTES_PER_ELEMENT: number;
        of(...items: number[]): Uint8Array;
        from(arrayLike: ArrayLike<number>): Uint8Array;
        from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
        from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
    }): {
        type: any;
    };
};
export var CertificateEntry: {
    new (certificate: Uint8Array, extensions?: any): {};
};
export var CertificateType: {
    "__#3@#reverse": {};
    "__#3@#maxvalue": any;
    /**
     * return keys or properties
     * @returns {any[]} [any]
     */
    keys(): any[];
    /**
     * return values
     * @returns {any[]} [any]
     */
    values(): any[];
    /**
     * return key for value supplied or null if not found
     * @param {any} value
     * @returns {any} key
     */
    key(value: any): any;
    /**
     * return value for key supplied or null if not found
     * @param {any} key
     * @returns {any} value
     */
    value(key: any): any;
    maxvalue(): any;
};
export var CertificateVerify: {
    new (algorithm: Uint8Array, signature: Uint8Array): {
        type: any;
    };
};
export var ChangeCipherSpec: Uint8Array;
export var ContentType: {
    "__#3@#reverse": {};
    "__#3@#maxvalue": any;
    /**
     * return keys or properties
     * @returns {any[]} [any]
     */
    keys(): any[];
    /**
     * return values
     * @returns {any[]} [any]
     */
    values(): any[];
    /**
     * return key for value supplied or null if not found
     * @param {any} value
     * @returns {any} key
     */
    key(value: any): any;
    /**
     * return value for key supplied or null if not found
     * @param {any} key
     * @returns {any} value
     */
    value(key: any): any;
    maxvalue(): any;
};
export var Enum: {
    new (object: {
        any: any;
    }): {
        "__#3@#reverse": {};
        "__#3@#maxvalue": any;
        /**
         * return keys or properties
         * @returns {any[]} [any]
         */
        keys(): any[];
        /**
         * return values
         * @returns {any[]} [any]
         */
        values(): any[];
        /**
         * return key for value supplied or null if not found
         * @param {any} value
         * @returns {any} key
         */
        key(value: any): any;
        /**
         * return value for key supplied or null if not found
         * @param {any} key
         * @returns {any} value
         */
        value(key: any): any;
        maxvalue(): any;
    };
    max: symbol;
};
export var Finished: {
    new (verify_data: Uint8Array): {
        type: any;
    };
};
export var Handshake: {
    new (message: Uint8Array): {
        [index: number]: number;
        type: any;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var HandshakeType: {
    "__#3@#reverse": {};
    "__#3@#maxvalue": any;
    /**
     * return keys or properties
     * @returns {any[]} [any]
     */
    keys(): any[];
    /**
     * return values
     * @returns {any[]} [any]
     */
    values(): any[];
    /**
     * return key for value supplied or null if not found
     * @param {any} value
     * @returns {any} key
     */
    key(value: any): any;
    /**
     * return value for key supplied or null if not found
     * @param {any} key
     * @returns {any} value
     */
    value(key: any): any;
    maxvalue(): any;
};
export var OpaqueFix: {
    new (_uint8array?: Uint8Array, length?: number): {
        [index: number]: number;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var OpaqueVar: {
    new (_uint8array?: Uint8Array, min?: number, max?: number): {
        [index: number]: number;
        "__#2@#member": {
            length: any;
            data: Uint8Array;
        };
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var ProtocolVersion: {
    new (ver: 771 | 772): {
        [index: number]: number;
        meaning(): "TLS v1.2 - legacy_version[0x0303]" | "TLS v1.3 - [0x0304]";
        value(): any;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var Random: {
    new (): {
        [index: number]: number;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
declare var Struct2: {
    new (...uint8s: Uint8Array[]): {
        [index: number]: number;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var TLSCiphertext: {
    new (encryptedRecord: Uint8Array): {
        [index: number]: number;
        encryptedRecord: Uint8Array;
        header: any;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var TLSInnerPlaintext: {
    new (content: {
        [index: number]: number;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    }, contentType2: any, zeros: number): {
        [index: number]: number;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var TLSPlaintext: {
    new (fragment: Uint8Array): {
        [index: number]: number;
        "__#1@#member": Uint8Array[];
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
declare var Uint162: {
    new (int: number): {
        [index: number]: number;
        value(): any;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var Uint24: {
    new (int: number): {
        [index: number]: number;
        value(): any;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var Uint32: {
    new (int: number): {
        [index: number]: number;
        value(): any;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
declare var Uint82: {
    new (int: number): {
        [index: number]: number;
        value(): any;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var VectorFix: {
    new (_uint8array?: Uint8Array, length?: number): {
        [index: number]: number;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var VectorVar: {
    new (_uint8array?: Uint8Array, min?: number, max?: number): {
        [index: number]: number;
        "__#2@#member": {
            length: any;
            data: Uint8Array;
        };
        /**
         *
         * @returns {Uint8Array[]} array of Uint8Array
         */
        member(): Uint8Array[];
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: ArrayBufferLike;
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin(target: number, start: number, end?: number): any;
        every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        fill(value: number, start?: number, end?: number): any;
        filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
        find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
        findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
        forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
        indexOf(searchElement: number, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: number, fromIndex?: number): number;
        readonly length: number;
        map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
        reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        reverse(): Uint8Array;
        set(array: ArrayLike<number>, offset?: number): void;
        slice(start?: number, end?: number): Uint8Array;
        some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
        sort(compareFn?: (a: number, b: number) => number): any;
        subarray(begin?: number, end?: number): Uint8Array;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
        toString(): string;
        valueOf(): Uint8Array;
        entries(): IterableIterator<[number, number]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<number>;
        includes(searchElement: number, fromIndex?: number): boolean;
        at(index: number): number | undefined;
        findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
        findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
        findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
        toReversed(): Uint8Array;
        toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
        with(index: number, value: number): Uint8Array;
        [Symbol.iterator](): IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    };
    readonly BYTES_PER_ELEMENT: number;
    of(...items: number[]): Uint8Array;
    from(arrayLike: ArrayLike<number>): Uint8Array;
    from<T>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => number, thisArg?: any): Uint8Array;
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
};
export var legacy_version: {
    [index: number]: number;
    meaning(): "TLS v1.2 - legacy_version[0x0303]" | "TLS v1.3 - [0x0304]";
    value(): any;
    readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBufferLike;
    readonly byteLength: number;
    readonly byteOffset: number;
    copyWithin(target: number, start: number, end?: number): any;
    every(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
    fill(value: number, start?: number, end?: number): any;
    filter(predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any): Uint8Array;
    find(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number | undefined;
    findIndex(predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any): number;
    forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    lastIndexOf(searchElement: number, fromIndex?: number): number;
    readonly length: number;
    map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
    reverse(): Uint8Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Uint8Array;
    some(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): boolean;
    sort(compareFn?: (a: number, b: number) => number): any;
    subarray(begin?: number, end?: number): Uint8Array;
    toLocaleString(): string;
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions): string;
    toString(): string;
    valueOf(): Uint8Array;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    at(index: number): number | undefined;
    findLast<S extends number>(predicate: (value: number, index: number, array: Uint8Array) => value is S, thisArg?: any): S;
    findLast(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number | undefined;
    findLastIndex(predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any): number;
    toReversed(): Uint8Array;
    toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;
    with(index: number, value: number): Uint8Array;
    [Symbol.iterator](): IterableIterator<number>;
    readonly [Symbol.toStringTag]: "Uint8Array";
};
export { Struct2 as Struct, Uint162 as Uint16, Uint82 as Uint8 };
