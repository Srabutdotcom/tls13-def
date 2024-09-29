/**
 * ServerName
 * ```
 * enum {
      host_name(0), (255)
   } NameType;

 * struct {
      NameType name_type;
      select (name_type) {
         case host_name: HostName;
      } name;
   } ServerName;
   
   opaque HostName<1..2^16-1>;
   ```
 */
export class ServerName extends Struct {
    /**
     *
     * @param {Uint8Array|string} hostname
     */
    static a(hostname: Uint8Array | string): ServerName;
    /**
     * @param {Uint8Array|string} hostname
     */
    constructor(hostname: Uint8Array | string);
    /**
     * @return {string} hostname
     */
    get hostname(): string;
    #private;
}
/**
 * ServerNameList
 * ```
 * struct {
      NameType name_type;
      select (name_type) {
         case host_name: HostName;
      } name;
   } ServerName;

   enum {
         host_name(0), (255)
   } NameType;

   opaque HostName<1..2^16-1>;

   struct {
         ServerName server_name_list<1..2^16-1>
   } ServerNameList;
   ```
 */
export class ServerNameList extends Struct {
    /**
     * ServerNameList
     * @param  {...string} serverName
     * @return ServerNameList
     */
    static list(...serverName: string[]): ServerNameList;
    /**
     *
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): {
        hostname: Uint8Array;
    }[];
    /**
     * @param {...ServerName} server_name_list <1..2^16-1>
     */
    constructor(...server_name_list: ServerName[]);
}
import { Struct } from "../../src/base.js";
