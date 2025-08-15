import { capitalize, camelCase, kebabCase, snakeCase, truncate, stripHtml, randomString } from '../string';

describe('String Utils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('')).toBe('');
    });
  });

  describe('camelCase', () => {
    it('should convert to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });
  });

  describe('snakeCase', () => {
    it('should convert to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('HelloWorld')).toBe('hello_world');
    });
  });

  describe('truncate', () => {
    it('should truncate string', () => {
      expect(truncate('hello world', 5)).toBe('hello...');
      expect(truncate('hello', 10)).toBe('hello');
      expect(truncate('hello world', 5, '***')).toBe('hello***');
    });
  });

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      expect(stripHtml('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
      expect(stripHtml('No tags here')).toBe('No tags here');
    });
  });

  describe('randomString', () => {
    it('should generate random string', () => {
      const str = randomString(10);
      expect(str).toHaveLength(10);
      expect(typeof str).toBe('string');
    });
  });
});
