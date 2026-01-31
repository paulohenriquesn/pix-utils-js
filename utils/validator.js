class Validator {
    isEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    isUUID(uuid) {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
        return uuidRegex.test(uuid)
    }

    isPhoneNumber(phoneNumber) {
        const normalized = phoneNumber.replace(/[^0-9]/g, '');
        
        const phoneNumberRegex = /^\d{2}[89]\d{8}$/;
        
        return phoneNumberRegex.test(normalized);
    }

    isCPF(cpf) {
        const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
        return cpfRegex.test(cpf)
    }

    isCNPJ(cnpj) {
        const cnpjRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;
        return cnpjRegex.test(cnpj)
    }

    isQRCode(pixKeyCopyPaste) {
        const qrCodeRegex = /^(000201|01|2636)/
        return qrCodeRegex.test(pixKeyCopyPaste)
    }
}

module.exports = {
    Validator
}