const { Request, Message } = require('../')
var chai = require("chai");

describe('Message', function () {

    it('Verify valid signature', () => {
        chai.expect(
            Message.verify('some message',
                'MNUrMcsxXXF3Ei9TEK1HJn8fijRZ4cHrYB',
                '1f425286e99c9e817ddc39756505f32ca19f1d6f3d24e5db42764fadf8d8d9db984dce631c411e48b887e639e6071ff827a732f11568bb4e94eb13c5eb198609f3')
        ).to.equal(true);
        chai.expect(
            Message.verify('hallo',
                'tMWJAyq9CQvWD5t87cepeS6FBaGBsFRPT8',
                '1f67a349f84abfdd519a8cd7b6e774611dfea264f8c78934279409a61d6dc4a91a4bd0e14599212df1151ed54d282515dca372b25a03557de0034f20cf3e007ae1')
        ).to.equal(true);
    });

    it('Detect invalid signature', () => {
        chai.expect(
            Message.verify('some message',
                'MNUrMcsxXXF3Ei9TEK1HJn8fijRZ4cHrYB',
                '1f425286e99c9e817dec39756505f32ca19f1d6f3d24e5db42764fadf8d8d9db984dce631c411e48b887e639e6071ff827a732f11568bb4e94eb13c5eb198609f3')
        ).to.be.false
        chai.expect(
            Message.verify('some other message',
                'MNUrMcsxXXF3Ei9TEK1HJn8fijRZ4cHrYB',
                '1f425286e99c9e817ddc39756505f32ca19f1d6f3d24e5db42764fadf8d8d9db984dce631c411e48b887e639e6071ff827a732f11568bb4e94eb13c5eb198609f3')
        ).to.be.false
    });

    it('Sign message', () => {
        var WIF = 'cVDvajLTHCCC4wEjb76ZQbkWgAZAVTHLhkHYW1JWqzy8s1Jponak';
        var message = 'hallo';
        var signature = Message.signWIF(message, WIF).toString('hex')
        chai.expect(signature).to.equal('1f67a349f84abfdd519a8cd7b6e774611dfea264f8c78934279409a61d6dc4a91a4bd0e14599212df1151ed54d282515dca372b25a03557de0034f20cf3e007ae1');
    });

    it('Sign and verify', () => {
        var WIF = 'cVDvajLTHCCC4wEjb76ZQbkWgAZAVTHLhkHYW1JWqzy8s1Jponak';
        var address = 'tMWJAyq9CQvWD5t87cepeS6FBaGBsFRPT8';
        var message = 'some test message';
        var signature = Message.signWIF(message, WIF, 'mvs').toString('hex');
        chai.expect(Message.verify(message, address, signature, 'mvs')).to.equal(true);
    });
});
