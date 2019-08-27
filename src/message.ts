import { magicHash, hash160 } from './crypto';
var bs58check = require('bs58check');
var secp256k1 = require('secp256k1');
var wif = require('wif')

export class Message {

    static encodeSignature(signature, recovery, compressed) {
        if (compressed) recovery += 4;
        return Buffer.concat([Buffer.alloc(1, recovery + 27), signature]);
    }

    static decodeSignature(buffer) {
        if (buffer.length !== 65) throw new Error('Invalid signature length');

        var flagByte = buffer.readUInt8(0) - 27;
        if (flagByte > 7) throw new Error('Invalid signature parameter')

        return {
            compressed: !!(flagByte & 4),
            recovery: flagByte & 3,
            signature: buffer.slice(1)
        };
    }

    static verify(message, address, signature, avatar = 'Metaverse') {
        if (!Buffer.isBuffer(signature)) signature = Buffer.from(signature, 'hex');

        var parsed = this.decodeSignature(signature);
        var hash = magicHash(message, `\u0018${avatar} Signed Message:\n`);
        var publicKey = secp256k1.recover(hash, parsed.signature, parsed.recovery, parsed.compressed);

        var actual = hash160(publicKey);
        var expected = bs58check.decode(address).slice(1);
        if (!Buffer.isBuffer(expected)) expected = Buffer.from(expected, 'hex');

        return Buffer.compare(actual, expected) == 0;
    }

    static signWIF(message: string, WIF: string, avatar = 'Metaverse') {
        const pk = wif.decode(WIF)
        return this.signPK(message, pk.privateKey, pk.compressed, avatar)
    }

    static signPK(message: string, privateKey, compressed: boolean, avatar = 'Metaverse') {
        var hash = magicHash(message, `\u0018${avatar} Signed Message:\n`);
        var sigObj = secp256k1.sign(hash, privateKey);
        return this.encodeSignature(sigObj.signature, sigObj.recovery, compressed);
    }
}