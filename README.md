## Mpesa Hash Decoder

This package is meant to decode the hashed phone numbers. The use case on receipt of a notification from Mpesa once a customer has paid to your Paybill Number.

The phone number received from Mpesa Confirmation Endpoint is normally hashed. This package will assist in decoding it to give you plain text phone number.

Also you can query the hashed equivalent of a phone number.

### Installation

```bash
npm install mpesa-hash-decoder
```

### Usage

#### Import

```js
import {decodePhone,fetchHashed} from 'mpesa-hash-decoder'; // Typescript
const  {decodePhone,fetchHashed} = require('mpesa-hash-decoder'); // Javascript
```

#### Decoding hashed value

```js
    let result = await decodePhone('string-value-of-your-hash');
    // Expected output.
    {
        phone:"decoded_phone_number",
        hashed:"hashed_equivalent"
    }
```

#### Fetching the hashed value

```js
    let result = await decodePhone('string-value-of-your-phone');
    // Expected output.
    {
        phone:"decoded_phone_number",
        hashed:"hashed_equivalent"
    }
```

