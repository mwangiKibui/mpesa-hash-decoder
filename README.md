## Mpesa Hash Decoder

This package is meant to decode the hashed MSIDNs. The use case on receipt of a notification from Mpesa once a customer has paid to your Paybill Number.

The MSISDN received from Mpesa Confirmation Endpoint is normally hashed. This package will assist in decoding it to give you plain text MSISDN.

Also you can query the hashed equivalent of a MSISDN.

### Installation

```bash
npm install mpesa-hash-decoder
```

### Usage

#### Import

```js
import {decodeMsisdn,fetchHashed} from 'mpesa-hash-decoder'; // Typescript
const  {decodeMsisdn,fetchHashed} = require('mpesa-hash-decoder'); // Javascript
```

#### Decoding hashed value

```js
    let result = await decodeMsisdn('string-value-of-your-hash');
    // Expected output.
    {
        phone:"decoded_msisdn",
        hashed:"hashed_equivalent"
    }
```

#### Fetching the hashed value

```js
    let result = await fetchHashed('string-value-of-your-msisdn');
    // Expected output.
    {
        phone:"decoded_msisdn",
        hashed:"hashed_equivalent"
    }
```

