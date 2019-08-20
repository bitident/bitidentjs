const varuint = require('varuint-bitcoin');

export function encodeVarStr(str, encoding: BufferEncoding = 'utf-8'): Buffer{
    const data = Buffer.from(str, encoding)
    return Buffer.concat([
        varuint.encode(data.length),
        data,
    ])
}

export function decodeVarStr(buffer: Buffer, config = {offset: 0}, encoding: BufferEncoding = 'utf-8'): string{
    const length = decodeVarInt(buffer, config)
    const value = buffer.slice(config.offset, config.offset+length).toString(encoding)
    config.offset += Buffer.from(value, encoding).length
    return value
}

export function encodeVarInt(input): Buffer{
    return varuint.encode(input)
}

export function decodeVarInt(buffer, config = {offset: 0}): number{
    const value = varuint.decode(buffer, config.offset)
    config.offset += encodeVarInt(value).length
    return value
}