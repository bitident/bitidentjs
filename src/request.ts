import { AuthRequest } from './auth.request';
import { MetaverseRequest, REQUEST_TYPE_AUTH } from './mvs.request';
import { decodeVarInt, encodeVarInt } from './encoder';

export class Request {

    constructor(request){
        switch (request.type) {
            case 'auth':
                return new AuthRequest(request);
            default:
                throw Error('Unsupported type');
        }
    }

    static decode(data: string, encoding: BufferEncoding='hex'){
        return this.decodeBuffer(Buffer.from(data, encoding))
    }

    static decodeBuffer(buffer: Buffer){
        const config = {offset: 0}
        const version = decodeVarInt(buffer, config)
        let network = 'custom'
        switch(decodeVarInt(buffer, config)){
            case 1:
                network='mainnet';
                break;
            case 2:
                network='testnet';
                break;
            case 0:
                break;
            default:
                throw Error('Illegal network')
        }
        const type = decodeVarInt(buffer, config)

        switch(type){
            case REQUEST_TYPE_AUTH:
                return AuthRequest.decodeBuffer(version, network, buffer, config)
            default:
                throw Error('Unsupported type');
        }
    }


}