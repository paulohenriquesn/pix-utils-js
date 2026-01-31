class Generator {
    static generateValidPhoneNumber() {
        const dddList = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
        const selectedDDD = dddList[Math.floor(Math.random() * dddList.length)];
        const firstDigit = Math.random() < 0.5 ? '8' : '9';
        const phoneNumber = `${selectedDDD}${firstDigit}${Generator.generateRandomNumber(8)}`;
        return phoneNumber;
    }

    static generateRandomNumber(length) {
        let randomNumber = '';
        for (let i = 0; i < length; i++) {
            randomNumber += Math.floor(Math.random() * 10);
        }
        return randomNumber;
    }

    static generateRandomCPF() {
        function randomDigit() {
            return Math.floor(Math.random() * 10);
        }

        const cpfDigits = [];
        for (let i = 0; i < 9; i++) {
            cpfDigits.push(randomDigit());
        }

        const firstVerifierDigit = Generator.calculateCPFVerifierDigit(cpfDigits);
        cpfDigits.push(firstVerifierDigit);

        const secondVerifierDigit = Generator.calculateCPFVerifierDigit(cpfDigits);
        cpfDigits.push(secondVerifierDigit);

        return cpfDigits.join('');
    }

    static calculateCPFVerifierDigit(digits) {
        const sum = digits.reduce((acc, digit, index) => {
            const multiplier = digits.length + 1 - index;
            return acc + digit * multiplier;
        }, 0);

        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
  static generateValidCNPJ() {
        function randomDigit() {
            return Math.floor(Math.random() * 10);
        }

        const cnpjBase = [];
        for (let i = 0; i < 12; i++) {
            cnpjBase.push(randomDigit());
        }

        const verifierDigits = Generator.calculateCNPJVerifierDigits(cnpjBase);
        cnpjBase.push(verifierDigits[0], verifierDigits[1]);

        const formattedCNPJ = cnpjBase.join('');

        return formattedCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    static calculateCNPJVerifierDigits(digits) {
        const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3];

        function calculateDigit(multipliers) {
            const sum = digits.reduce((acc, digit, index) => acc + digit * multipliers[index], 0);
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        }

        const firstDigit = calculateDigit(multipliers1);
        const secondDigit = calculateDigit(multipliers2);

        return [firstDigit, secondDigit];
    }

    static generateRandomUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static generateRandomEmail() {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
        const username = Generator.generateRandomString(8);
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${username}@${domain}`;
    }

    static generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }
}


module.exports = { Generator }