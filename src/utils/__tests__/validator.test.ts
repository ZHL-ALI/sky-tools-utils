import { isEmail, isPhone, isIdCard, isStrongPassword, isUrl, isIP, isNumeric, isChinese, isBankCard } from '../validator';

describe('Validator Utils', () => {
  describe('isEmail', () => {
    it('should validate correct email formats', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@domain.co.uk')).toBe(true);
      expect(isEmail('user+tag@example.org')).toBe(true);
      expect(isEmail('123@456.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isEmail('invalid-email')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test.example.com')).toBe(false);
      expect(isEmail('test@example')).toBe(false);
      expect(isEmail('')).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should validate correct Chinese phone numbers', () => {
      expect(isPhone('13812345678')).toBe(true);
      expect(isPhone('15987654321')).toBe(true);
      expect(isPhone('18611111111')).toBe(true);
      expect(isPhone('17712345678')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isPhone('12812345678')).toBe(false); // starts with 12
      expect(isPhone('1381234567')).toBe(false);  // too short
      expect(isPhone('138123456789')).toBe(false); // too long
      expect(isPhone('phone123456')).toBe(false);  // contains letters
      expect(isPhone('')).toBe(false);
    });
  });

  describe('isIdCard', () => {
    it('should validate correct ID card formats', () => {
      expect(isIdCard('123456789012345')).toBe(true);     // 15 digits
      expect(isIdCard('123456789012345678')).toBe(true);   // 18 digits
      expect(isIdCard('12345678901234567X')).toBe(true);   // 17 digits + X
      expect(isIdCard('12345678901234567x')).toBe(true);   // 17 digits + x
    });

    it('should reject invalid ID card formats', () => {
      expect(isIdCard('12345678901234')).toBe(false);      // too short
      expect(isIdCard('1234567890123456789')).toBe(false); // too long
      expect(isIdCard('12345678901234567A')).toBe(false);  // invalid letter
      expect(isIdCard('abcdefghijklmno')).toBe(false);     // letters
      expect(isIdCard('')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('should validate strong passwords', () => {
      expect(isStrongPassword('Password123!')).toBe(true);
      expect(isStrongPassword('MyStr0ng@Pass')).toBe(true);
      expect(isStrongPassword('Complex1$')).toBe(true);
      expect(isStrongPassword('Aa1@bcdefgh')).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false);     // no uppercase, numbers, special chars
      expect(isStrongPassword('PASSWORD')).toBe(false);     // no lowercase, numbers, special chars
      expect(isStrongPassword('Password')).toBe(false);     // no numbers, special chars
      expect(isStrongPassword('Password1')).toBe(false);    // no special chars
      expect(isStrongPassword('Pass1!')).toBe(false);       // too short
      expect(isStrongPassword('')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate correct URLs', () => {
      expect(isUrl('https://www.example.com')).toBe(true);
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://sub.domain.com/path?query=1')).toBe(true);
      expect(isUrl('ftp://files.example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('www.example.com')).toBe(false);  // missing protocol
      expect(isUrl('http://')).toBe(false);
      expect(isUrl('')).toBe(false);
    });
  });

  describe('isIP', () => {
    it('should validate correct IP addresses', () => {
      expect(isIP('192.168.1.1')).toBe(true);
      expect(isIP('127.0.0.1')).toBe(true);
      expect(isIP('255.255.255.255')).toBe(true);
      expect(isIP('0.0.0.0')).toBe(true);
      expect(isIP('10.0.0.1')).toBe(true);
    });

    it('should reject invalid IP addresses', () => {
      expect(isIP('256.1.1.1')).toBe(false);        // > 255
      expect(isIP('192.168.1')).toBe(false);        // incomplete
      expect(isIP('192.168.1.1.1')).toBe(false);    // too many parts
      expect(isIP('192.168.01.1')).toBe(false);     // leading zero
      expect(isIP('abc.def.ghi.jkl')).toBe(false);  // letters
      expect(isIP('')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should validate numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('999999')).toBe(true);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumeric('123.45')).toBe(false);  // decimal
      expect(isNumeric('-123')).toBe(false);    // negative
      expect(isNumeric('12a3')).toBe(false);    // contains letter
      expect(isNumeric('abc')).toBe(false);     // letters
      expect(isNumeric('')).toBe(false);        // empty
      expect(isNumeric(' 123 ')).toBe(false);   // spaces
    });
  });

  describe('isChinese', () => {
    it('should validate Chinese characters', () => {
      expect(isChinese('中文')).toBe(true);
      expect(isChinese('测试')).toBe(true);
      expect(isChinese('你好世界')).toBe(true);
      expect(isChinese('汉字')).toBe(true);
    });

    it('should reject non-Chinese text', () => {
      expect(isChinese('hello')).toBe(false);      // English
      expect(isChinese('123')).toBe(false);        // numbers
      expect(isChinese('中文hello')).toBe(false);   // mixed
      expect(isChinese('中文123')).toBe(false);     // Chinese + numbers
      expect(isChinese('')).toBe(false);           // empty
      expect(isChinese('中文，')).toBe(false);      // with punctuation
    });
  });

  describe('isBankCard', () => {
    it('should validate correct bank card numbers', () => {
      expect(isBankCard('1234567890123456')).toBe(true);    // 16 digits
      expect(isBankCard('123456789012345')).toBe(true);     // 15 digits
      expect(isBankCard('12345678901234567')).toBe(true);   // 17 digits
      expect(isBankCard('123456789012345678')).toBe(true);  // 18 digits
      expect(isBankCard('1234567890123456789')).toBe(true); // 19 digits
    });

    it('should reject invalid bank card numbers', () => {
      expect(isBankCard('123456789012')).toBe(false);       // too short
      expect(isBankCard('1234567890123456789012')).toBe(false); // too long
      expect(isBankCard('0234567890123456')).toBe(false);   // starts with 0
      expect(isBankCard('123456789012345a')).toBe(false);   // contains letter
      expect(isBankCard('')).toBe(false);                   // empty
      expect(isBankCard('1234 5678 9012 3456')).toBe(false); // with spaces
    });
  });
});
