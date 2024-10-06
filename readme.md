## tls13def

**tls13def** is a collection of tls1.3 definitions

### Usage

```javascript
import { ClientHello, ServerHello } from 'mod.js';

//create ClientHello message
const clientHello = ClientHello.default('smpt.hello.mail')
//create record of clientHello
const recordCH = TLSPlainText.handshake(clientHello)

//create ServerHello message
const serverHello = ServerHello.new(sessionId, cipher, serverShareExtension);
//create record of serverHello 
const recordSH = TLSPlainText.handshake(serverHello)

```

### Contributing

Contributions to improve the library are welcome. Please open an issue or pull request on the GitHub repository.

### Donation
- https://paypal.me/aiconeid 

### License
MIT
