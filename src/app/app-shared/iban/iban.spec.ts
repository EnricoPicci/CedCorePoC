import {Iban} from './iban';

it('country code valid', () => {
    let iban = 'I';
    expect(Iban.checkCountryCode(iban)).toBe(true);
});
it('country code valid', () => {
    let iban = 'IT';
    expect(Iban.checkCountryCode(iban)).toBe(true);
});
it('country code not valid', () => {
    let iban = '2';
    expect(Iban.checkCountryCode(iban)).toBe(false);
});
it('country code not valid', () => {
    let iban = 'I2';
    expect(Iban.checkCountryCode(iban)).toBe(false);
});

it('checkSum valid', () => {
    let iban = 'IT6';
    expect(Iban.checkIbanChecksum(iban)).toBe(true);
});
it('checkSum valid', () => {
    let iban = 'IT60';
    expect(Iban.checkIbanChecksum(iban)).toBe(true);
});
it('checkSum not valid', () => {
    let iban = 'ITX';
    expect(Iban.checkIbanChecksum(iban)).toBe(false);
});
it('checkSum not valid', () => {
    let iban = 'IT6X';
    expect(Iban.checkIbanChecksum(iban)).toBe(false);
});

it('checkChar valid', () => {
    let iban = 'IT60X';
    expect(Iban.checkCheckChar(iban)).toBe(true);
});
it('checkChar not valid', () => {
    let iban = 'IT600';
    expect(Iban.checkCheckChar(iban)).toBe(false);
});

it('bankCode valid', () => {
    let iban = 'IT60X1234';
    expect(Iban.checkBankCode(iban)).toBe(true);
});
it('bankCode valid', () => {
    let iban = 'IT60X12345';
    expect(Iban.checkBankCode(iban)).toBe(true);
});
it('bankCode not valid', () => {
    let iban = 'IT60X123S';
    expect(Iban.checkBankCode(iban)).toBe(false);
});
it('bankCode not valid', () => {
    let iban = 'IT60X1234D';
    expect(Iban.checkBankCode(iban)).toBe(false);
});

it('branchCode valid', () => {
    let iban = 'IT60X123450987';
    expect(Iban.checkBranchCode(iban)).toBe(true);
});
it('branchCode valid', () => {
    let iban = 'IT60X1234509876';
    expect(Iban.checkBranchCode(iban)).toBe(true);
});
it('branchCode not valid', () => {
    let iban = 'IT60X12345098F';
    expect(Iban.checkBranchCode(iban)).toBe(false);
});
it('branchCode not valid', () => {
    let iban = 'IT60X123450987F';
    expect(Iban.checkBranchCode(iban)).toBe(false);
});

/* validatePartial */
it('country code valid', () => {
    let iban = 'I';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('country code valid', () => {
    let iban = 'IT';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('country code not valid', () => {
    let iban = '2';
    expect(Iban.validatePartial(iban)).toBe(false);
});
it('country code not valid', () => {
    let iban = 'I2';
    expect(Iban.validatePartial(iban)).toBe(false);
});

it('checkSum valid', () => {
    let iban = 'IT6';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('checkSum valid', () => {
    let iban = 'IT60';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('checkSum not valid', () => {
    let iban = 'ITX';
    expect(Iban.validatePartial(iban)).toBe(false);
});
it('checkSum not valid', () => {
    let iban = 'IT6X';
    expect(Iban.validatePartial(iban)).toBe(false);
});

it('checkChar valid', () => {
    let iban = 'IT60X';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('checkChar not valid', () => {
    let iban = 'IT600';
    expect(Iban.validatePartial(iban)).toBe(false);
});

it('bankCode valid', () => {
    let iban = 'IT60X1234';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('bankCode valid', () => {
    let iban = 'IT60X12345';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('bankCode not valid', () => {
    let iban = 'IT60X123S';
    expect(Iban.validatePartial(iban)).toBe(false);
});
it('bankCode not valid', () => {
    let iban = 'IT60X1234D';
    expect(Iban.validatePartial(iban)).toBe(false);
});

it('branchCode valid', () => {
    let iban = 'IT60X123450987';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('branchCode valid', () => {
    let iban = 'IT60X1234509876';
    expect(Iban.validatePartial(iban)).toBe(true);
});
it('branchCode not valid', () => {
    let iban = 'IT60X12345098F';
    expect(Iban.validatePartial(iban)).toBe(false);
});
it('branchCode not valid', () => {
    let iban = 'IT60X123450987F';
    expect(Iban.validatePartial(iban)).toBe(false);
});



