const { Validator } = require('./utils/validator')

const validator = new Validator();

const validationPixMap = {
    email: validator.isEmail,
    random: validator.isUUID,
    phone: validator.isPhoneNumber,
    cnpj: validator.isCNPJ,
    cpf: validator.isCPF,
    qrcode: validator.isQRCode
};


const validate = (input) => {
    const { pix } = input
    let { type } = input

    if(!pix) {
        throw new Error("chave pix invalida.")
    }

    if(!type) {
        try {
            let identifiedPix = identify({ pix })
            type = identifiedPix.type
        }catch {
            return false
        }
    }

    return validationPixMap[type](pix)
}

const identify = (input) => {
    const { pix } = input

    if(!pix) {
        throw new Error("chave pix invalida.")
    }

    for (const type in validationPixMap) {
        if (validationPixMap[type](pix)) {
            return { type, pix };
        }
    }

    throw new Error("chave pix invalida.")
}

const normalize = (input) => {
    let { pix } = input

    if(!pix || !validate({ pix})) {
        throw new Error("chave pix invalida.")
    }

    const { type } = identify({ pix })

    if(type === 'cpf' || type === 'cnpj' || type === 'phone') {
        pix = pix.replace(/[^0-9]/g, '')
    }

    return { pix, type }
}

module.exports = {
    identify,
    validate,
    normalize
}