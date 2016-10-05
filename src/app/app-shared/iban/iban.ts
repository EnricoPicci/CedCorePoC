export class Iban {

    static format(iban: string, separator: string) {
        let sep = ' ';
        if (separator) {
        sep = separator;
        }
        let chunks = new Array<string>();
        if (iban) {
            let inputLength = iban.length;
            if (inputLength <= 2) {
                chunks.push(iban.substring(0, inputLength));
            } else {
                chunks.push(iban.substring(0, 2));
                if (inputLength <= 4) {
                chunks.push(iban.substring(2, inputLength));
                } else {
                chunks.push(iban.substring(2, 4));
                if (inputLength <= 5) {
                    chunks.push(iban.substring(4, inputLength));
                } else {
                    chunks.push(iban.substring(4, 5));
                    if (inputLength <= 10) {
                    chunks.push(iban.substring(5, inputLength));
                    } else {
                    chunks.push(iban.substring(5, 10));
                    if (inputLength <= 15) {
                        chunks.push(iban.substring(10, inputLength));
                    } else {
                        chunks.push(iban.substring(10, 15));
                        chunks.push(iban.substring(15, inputLength));
                    }
                    }
                }
                }
            }
            return chunks.join(sep);
        }
        return null;
    }

    static validatePartial(iban: string): boolean {
        // https://bank.codes/iban/structure/italy/
        if (iban) {
            let inputLength = iban.length;
            if (inputLength <= 2) {
                return this.checkCountryCode(iban);
            } else
            if (inputLength <= 4) {
                return this.checkCountryCode(iban) &&
                        this.checkIbanChecksum(iban);
            } else
            if (inputLength <= 5) {
                return this.checkCountryCode(iban) &&
                        this.checkIbanChecksum(iban) &&
                        this.checkCheckChar(iban);
            } else
            if (inputLength <= 10) {
                return this.checkCountryCode(iban) &&
                        this.checkIbanChecksum(iban) &&
                        this.checkCheckChar(iban) &&
                        this.checkBankCode(iban);
            } else {
                return this.checkCountryCode(iban) &&
                        this.checkIbanChecksum(iban) &&
                        this.checkCheckChar(iban) &&
                        this.checkBankCode(iban) &&
                        this.checkBranchCode(iban);
            }
        }
        return true;
    }

    static checkCountryCode(iban: string) {
        let code;
        if (iban.length <= 2) {
            code = iban;
        } else {
            code = iban.substring(0, 2);
        }
        return this.isAlfabetic(code);
    }
    static checkIbanChecksum(iban: string) {
        let checkSum;
        if (iban.length <= 4) {
            checkSum = iban.substring(2);
        } else {
            checkSum = iban.substring(2, 4);
        }
        return this.isNumeric(checkSum);
    }
    static checkCheckChar(iban: string) {
        let checkChar;
        if (iban.length <= 5) {
            checkChar = iban.substring(4);
        } else {
            checkChar = iban.substring(4, 5);
        }
        return this.isAlfabetic(checkChar);
    }
    static checkBankCode(iban: string) {
        let bankCode;
        if (iban.length <= 10) {
            bankCode = iban.substring(5);
        } else {
            bankCode = iban.substring(5, 10);
        }
        return this.isNumeric(bankCode);
    }
    static checkBranchCode(iban: string) {
        let branchCode;
        if (iban.length <= 15) {
            branchCode = iban.substring(10);
        } else {
            branchCode = iban.substring(10, 15);
        }
        return this.isNumeric(branchCode);
    }

    private static isAlfabetic(data: string) {
        let match = data.match('^[a-zA-Z]*$');
        return match != null;
    }
    private static isNumeric(data: string) {
        let match = data.match('^[0-9]*$');
        return match != null;
    }

}
