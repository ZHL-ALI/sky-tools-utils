import { formatNumber, randomNumber, toFixed, numberToChinese, isEven, isOdd, percentage } from '../number';

describe('Number Utils', () => {
  describe('formatNumber', () => {
    it('should add thousand separators with default comma', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(1234567890)).toBe('1,234,567,890');
    });

    it('should handle custom separator', () => {
      expect(formatNumber(1234567, ' ')).toBe('1 234 567');
      expect(formatNumber(1234567, '.')).toBe('1.234.567');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(123)).toBe('123');
      expect(formatNumber(12)).toBe('12');
      expect(formatNumber(1)).toBe('1');
    });

    it('should handle zero and negative numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-1234)).toBe('-1,234');
    });
  });

  describe('randomNumber', () => {
    it('should generate number within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomNumber(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should handle single value range', () => {
      const result = randomNumber(5, 5);
      expect(result).toBe(5);
    });

    it('should handle negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomNumber(-10, -5);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-5);
      }
    });
  });

  describe('toFixed', () => {
    it('should round to specified decimal places', () => {
      expect(toFixed(3.14159, 2)).toBe(3.14);
      expect(toFixed(3.14159, 4)).toBe(3.1416);
      expect(toFixed(3.14159, 0)).toBe(3);
    });

    it('should handle whole numbers', () => {
      expect(toFixed(5, 2)).toBe(5);
      expect(toFixed(10, 3)).toBe(10);
    });

    it('should handle negative numbers', () => {
      expect(toFixed(-3.14159, 2)).toBe(-3.14);
    });

    it('should return number type', () => {
      const result = toFixed(3.14159, 2);
      expect(typeof result).toBe('number');
    });
  });

  describe('numberToChinese', () => {
    it('should convert single digits', () => {
      expect(numberToChinese(0)).toBe('零');
      expect(numberToChinese(1)).toBe('一');
      expect(numberToChinese(5)).toBe('五');
      expect(numberToChinese(9)).toBe('九');
    });

    it('should convert tens', () => {
      expect(numberToChinese(10)).toBe('十');
      expect(numberToChinese(20)).toBe('二十');
      expect(numberToChinese(99)).toBe('九十九');
    });

    it('should convert hundreds', () => {
      expect(numberToChinese(100)).toBe('一百');
      expect(numberToChinese(123)).toBe('一百二十三');
      expect(numberToChinese(505)).toBe('五百零五');
    });

    it('should convert thousands', () => {
      expect(numberToChinese(1000)).toBe('一千');
      expect(numberToChinese(1234)).toBe('一千二百三十四');
      expect(numberToChinese(5000)).toBe('五千');
    });

    it('should handle ten thousands', () => {
      expect(numberToChinese(10000)).toBe('一万');
      expect(numberToChinese(12345)).toBe('一万二千三百四十五');
    });

    it('should throw error for out of range numbers', () => {
      expect(() => numberToChinese(-1)).toThrow('数字超出支持范围 (0-999999999)');
      expect(() => numberToChinese(1000000000)).toThrow('数字超出支持范围 (0-999999999)');
    });

    it('should handle numbers with zeros', () => {
      expect(numberToChinese(1001)).toBe('一千零一');
      expect(numberToChinese(1010)).toBe('一千零一十');
      expect(numberToChinese(10001)).toBe('一万零一');
    });
  });

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(0)).toBe(true);
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(100)).toBe(true);
      expect(isEven(-2)).toBe(true);
    });

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(99)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });
  });

  describe('isOdd', () => {
    it('should return true for odd numbers', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(99)).toBe(true);
      expect(isOdd(-1)).toBe(true);
    });

    it('should return false for even numbers', () => {
      expect(isOdd(0)).toBe(false);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(4)).toBe(false);
      expect(isOdd(100)).toBe(false);
      expect(isOdd(-2)).toBe(false);
    });
  });

  describe('percentage', () => {
    it('should calculate percentage with default 2 decimal places', () => {
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(1, 3)).toBe(33.33);
      expect(percentage(2, 3)).toBe(66.67);
    });

    it('should handle custom decimal places', () => {
      expect(percentage(1, 3, 0)).toBe(33);
      expect(percentage(1, 3, 1)).toBe(33.3);
      expect(percentage(1, 3, 4)).toBe(33.3333);
    });

    it('should handle zero values', () => {
      expect(percentage(0, 100)).toBe(0);
      expect(percentage(50, 0)).toBe(Infinity);
    });

    it('should handle decimal inputs', () => {
      expect(percentage(1.5, 10)).toBe(15);
      expect(percentage(7.5, 25)).toBe(30);
    });

    it('should handle values greater than total', () => {
      expect(percentage(150, 100)).toBe(150);
    });
  });
});
