## tls13def

**tls13def** is a collection of tls1.3 definitions

### Usage

```javascript
import * as tls13def from 'tls13def.js';
//create Alert
const tlsAlert = alert().level.fatal().description.bad_certificate()
const meaning = tlsAlert.meaning() // "fatal[2]-bad_certificate[42]"

```

### Contributing

Contributions to improve the library are welcome. Please open an issue or pull request on the GitHub repository.

### Donation
- https://paypal.me/aiconeid 

### License
MIT
