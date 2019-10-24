const { Request } = require ('../')
var chai = require("chai");



// chai.use(chaiAsPromised);

describe('Authentication Requests', function () {

    it('Encode to HEX', () => {
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
        })
        return chai.expect(request.encode('hex')).to.equal('010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f083800');
    });
    it('Decode from HEX', () => {
        const encoded = '010101086269746964656e740563616e6772fe53a95b5dfd2c013568747470733a2f2f6269746964656e742e636f6d2f6170692f636f6e6669726d2f65775463667a5155613071343843586570597079411f4fe31425cb9d932a17f42e92ccae04db42e5ec684e5c93569853bbd38ea23b0202865474f970eeb4931f2175d0031aa99834e9e52b09359c52a3a08f522f083800';
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
        })
        return chai.expect(Request.decode(encoded)).to.deep.equal(request)
    });
});
