var createHash = require('create-hash');
var varuint = require('varuint-bitcoin');

export function sha256(b) {
    return createHash('sha256').update(b).digest();
}

export function hash256(buffer) {
    return sha256(sha256(buffer));
}

export function hash160(buffer) {
    return createHash('ripemd160').update(sha256(buffer)).digest();
}

export function magicHash(message, messagePrefix) {
    messagePrefix = messagePrefix || '\u0018Metaverse Signed Message:\n';
    if (!Buffer.isBuffer(messagePrefix)) messagePrefix = Buffer.from(messagePrefix, 'utf8');

    var messageVISize = varuint.encodingLength(message.length);
    var buffer = Buffer.allocUnsafe(messagePrefix.length + messageVISize + message.length);
    messagePrefix.copy(buffer, 0);
    varuint.encode(message.length, buffer, messagePrefix.length);
    buffer.write(message, messagePrefix.length + messageVISize);
    return hash256(buffer);
}