/**
 * enum {
 *
          host_name(0), (255)
      } NameType;

 * struct {
 *
          NameType name_type;
          select (name_type) {
              case host_name: HostName;
          } name;
      } ServerName;
 */
export class ServerName extends Struct {
    /**
     *
     * @param {...Uint8Array|string} hostname
     */
    constructor(...hostname: (Uint8Array | string)[]);
}
/**
 * ServerNameList
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
     * @param {...ServerName} server_name_list <1..2^16-1>
     */
    constructor(...server_name_list: ServerName[]);
}
import { Struct } from "../base.js";
