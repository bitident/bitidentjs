import { MetaverseRequest, REQUEST_TYPE_AUTH } from './mvs.request';
import { encodeVarStr, encodeVarInt, decodeVarStr, decodeVarInt } from './encoder';

export class AuthRequest extends MetaverseRequest {

    public source: string
    public sourceSignature: string
    public target: string
    public targetSignature: string
    public callback: string
    public time: number
    public timeout: number

    public type = 'auth'

    constructor({
        version = 1,
        network = 'mainnet',
        source = '',
        target = '',
        sourceSignature = '',
        callback = '',
        time = 0,
        timeout = 0,
        targetSignature = '',
    }) {
        super(version, network)
        this.source = source
        this.target = target
        this.sourceSignature = sourceSignature
        this.targetSignature = targetSignature
        this.callback = callback
        this.time = time
        this.timeout = timeout
    }

    validateSource(avatar: string, address: string) {

    }

    encodeBuffer() {
        return Buffer.concat([
            super.encodeBuffer(REQUEST_TYPE_AUTH),
            encodeVarStr(this.source),
            encodeVarStr(this.target),
            encodeVarInt(this.time),
            encodeVarInt(this.timeout),
            encodeVarStr(this.callback),
            encodeVarStr(this.sourceSignature, 'hex'),
            encodeVarStr(this.targetSignature, 'hex'),
        ])
    }

    static decodeBuffer(version: number, network: string, buffer: Buffer, config = { offset: 0 }) {
        if (version !== 1) {
            throw Error('Unsupported request version')
        }
        return new AuthRequest({
            version,
            network,
            source: decodeVarStr(buffer, config),
            target: decodeVarStr(buffer, config),
            time: decodeVarInt(buffer, config),
            timeout: decodeVarInt(buffer, config),
            callback: decodeVarStr(buffer, config),
            sourceSignature: decodeVarStr(buffer, config, 'hex'),
            targetSignature: decodeVarStr(buffer, config, 'hex'),
        })

    }
}