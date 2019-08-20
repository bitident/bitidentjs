import { AuthRequest } from './auth.request';
import { decodeVarInt, encodeVarInt } from './encoder';

export const REQUEST_TYPE_AUTH = 1

export class MetaverseRequest {

    constructor(
        public version: number,
        public network: string,
    ) {

    }

    protected encodeBuffer(type?: number): Buffer {
        return Buffer.concat([
            encodeVarInt(this.version),
            encodeVarInt(this.getNetworkId()),
            encodeVarInt(type),
        ])
    }

    encode(format = 'buffer') {
        const buffer = this.encodeBuffer()
        if (format !== 'buffer') {
            return buffer.toString(format);
        }
        return buffer;
    }

    getNetworkId() {
        switch (this.network) {
            case 'mainnet':
                return 1;
            case 'testnet':
                return 2;
        }
        return 0;
    }



}