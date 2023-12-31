const assert = require('assert');
const { describe, it } = require('node:test')
const { identify, normalize, validate } = require('../index')
const { Generator } = require('./generator') 

describe('validate', () => {
    it('should returns false if no pix key is provided', (t) => {
        const sut = validate({pix: 'invalid'})
        assert.strictEqual(sut, false);
    });

    it('should returns false if qr pix key is provided', (t) => {
        const sut = validate({pix: 'invalid', type: 'qrcode'})
        assert.strictEqual(sut, false);
    });

    it('should returns true if email key is provided and is valid', (t) => {
        const sut = validate({pix: Generator.generateRandomEmail()})
        assert.strictEqual(sut, true);
    });

    it('should returns true if phone number key is provided and is valid', (t) => {
        const sut = validate({pix: Generator.generateValidPhoneNumber()})
        assert.strictEqual(sut, true);
    });

    it('should returns true if random key is provided and is valid', (t) => {
        const sut = validate({pix: Generator.generateRandomUUID()})
        assert.strictEqual(sut, true);
    });

    it('should returns true qrcode if qrcode pix is provided and is valid', (t) => {
        const qrCode = '00020126360014BR.GOV.BCB.PIX0114+5511999226498520400005303986540813213.005802BR5904test6004test62070503***630450CF'
        const sut = validate({ pix: qrCode })
        assert.strictEqual(sut, true);
    });

    it('should returns false qrcode if qrcode pix is provided and is invalid', (t) => {
        const qrCode = '/INVALID/00020126360014BR.GOV.BCB.PIX0114+5511999226498520400005303986540813213.005802BR5904test6004test62070503***630450CF'
        const sut = validate({ pix: qrCode })
        assert.strictEqual(sut, false);
    });
})

describe('identify', () => {
    it('should returns email if email pix is provided', (t) => {
        const sut = identify({ pix: 'test@gmail.com'})
        assert.notStrictEqual(sut, { pix: 'test@gmail.com', type: 'email' });
    });

    it('should returns cpf if cpf pix is provided', (t) => {
        const cpf = Generator.generateRandomCPF()
        const sut = identify({ pix: cpf})
        assert.notStrictEqual(sut, { pix: cpf, type: 'cpf' });
    });

    
    it('should returns cnpj if cnpj pix is provided', (t) => {
        const cnpj = Generator.generateValidCNPJ()
        const sut = identify({ pix: cnpj})
        assert.notStrictEqual(sut, { pix: cnpj, type: 'cnpj' });
    });

    it('should returns random if random pix is provided', (t) => {
        const random = Generator.generateRandomUUID()
        const sut = identify({ pix: random })
        assert.notStrictEqual(sut, { pix: random, type: 'random' });
    });

    it('should returns phone if random pix is provided', (t) => {
        const phone = Generator.generateValidPhoneNumber()
        const sut = identify({ pix: phone })
        assert.notStrictEqual(sut, { pix: phone, type: 'phone' });
    });

    it('should returns qrcode if qrcode pix is provided', (t) => {
        const qrCode = '00020126360014BR.GOV.BCB.PIX0114+5511999226498520400005303986540813213.005802BR5904test6004test62070503***630450CF'
        const sut = identify({ pix: qrCode })
        assert.notStrictEqual(sut, { pix: qrCode, type: 'qrcode' });
    });

    it('should throws if invalid pix is provided', (t) => {
        let sut;
        try {
        sut = identify({ pix: 'abc' })
        }catch (err) {
            sut = err;
        }
        assert.notStrictEqual(sut, Error);
    });
})

describe("normalize", () => {
    it('should normalize cpf key', (t) => {
        assert.deepEqual(normalize({ pix: "000.000.000-00"}), { pix: '00000000000', type: 'cpf'});
    });
    
    it('should normalize cnpj key', (t) => {
        assert.deepEqual(normalize({ pix: "00.000.000/0000-00"}), { pix: '00000000000000', type: 'cnpj'});
    });

    it('should normalize phone key', (t) => {
        assert.deepEqual(normalize({ pix: "+55 (11) 0000-0000"}), { pix: '551100000000', type: 'phone'});
    });

    it('should normalize qrcode key', (t) => {
        assert.deepEqual(normalize({ pix: "00020126360014BR.GOV.BCB.PIX0114+5511999226498520400005303986540813213.005802BR5904test6004test62070503***630450CF"}), { pix: '00020126360014BR.GOV.BCB.PIX0114+5511999226498520400005303986540813213.005802BR5904test6004test62070503***630450CF', type: 'qrcode'});
    });
})
