<p align="center">
  <a href="https://bitident.com">
    <img src="https://bitident.com/assets/img/bitident.png" alt="Bitident">
  </a>
  <br>
  <a href="https://travis-ci.org/canguruhh/bitidentjs">
     <img src="https://travis-ci.org/canguruhh/bitidentjs.png?branch=master" alt="Build status">
  </a>
  <br>
  Library for decentralized authentication requests on the Metaverse Blockchain
  <a href="https://bitident.com">bitident.com</a>
</p>

## Installation
Install using npm:
``` bash
npm install bitident
```

## Setup
### NodeJS
``` javascript
const Bitident = require('bitident');
```
<a href="https://nodei.co/npm/bitident/"><img src="https://nodei.co/npm/bitident.png?downloads=true&downloadRank=true&stars=true"></a>

## Usage
### Request encoding
``` javascript
const { Request } = require('bitident')
const request = new Request({
            callback: "https://bitident.com/api/confirm/ewTcfzQUa0q48CXepYpy",
            sourceSignature: "1f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f0838",
            source: "bitident",
            target: "cangr",
            time: 1566288211,
            timeout: 300,
            type: "auth",
            version: 1,
            network: 'mainnet',
}).encode('hex')

// 010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f0838
```
This will encode the given request.

### Request encoding
``` javascript
const { Request } = require('bitident')
Request.decode('010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f0838', 'hex')
```

### Sign
``` javascript
const { Message } = require('bitident')

const encodedToken = '010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f0838'

// Key in wallet import format
const WIF = 'cVDvajLTHCCC4wEjb76ZQbkWgAZAVTHLhkHYW1JWqzy8s1Jponak';

const signature = Message.signWIF(encodedToken, WIF, YOUR_AVATAR_NAME)
```
You can also use the private key directly to sign using:
``` javascript
Message.signPK(encodedToken, privateKey, compressed, avatar)
```

### Verify signature

``` javascript
const valid = Message.verify(encodedToken, address, signature, avatar)
```

The following example shows how to verify the source signature for a request.

``` javascript
const encodedSignedToken = '010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f0838'
// decode and remove sourceSignature first if you validate the source signature
const signedToken = Request.decode(encodedSignedToken)
const sourceSignature = signedToken.sourceSignature
signedToken.sourceSignature = ''

const encodedUnsignedToken = signedToken.encode('hex')

// get the address for the source avatar (connect for example to a fullnode)
// this is not part of this library. you can use mvs-blockchain-js if you want
// to use the explorer
const sourceAddress = getAddressForAvatar(signedToken.source)

// perform the actual verification
const valid = Message.verify(encodedUnsignedToken, sourceAddress, sourceSignature, signedToken.source)
```

## Testing
To run the unit tests just execute:
``` bash
npm test
```
## Licence

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
