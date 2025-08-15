/**
 * @jest-environment jsdom
 */

import { parseUrlParams, buildUrlParams, addUrlParams, removeUrlParams, getUrlParam, isValidUrl } from '../url';

describe('URL Utils', () => {
  describe('parseUrlParams', () => {
    it('should parse URL parameters from provided URL', () => {
      const url = 'https://example.com?name=John&age=30&city=Beijing';
      const params = parseUrlParams(url);
      expect(params).toEqual({
        name: 'John',
        age: '30',
        city: 'Beijing'
      });
    });

    it('should handle URL without parameters', () => {
      const url = 'https://example.com';
      const params = parseUrlParams(url);
      expect(params).toEqual({});
    });

    it('should handle empty parameter values', () => {
      const url = 'https://example.com?empty=&name=John';
      const params = parseUrlParams(url);
      expect(params).toEqual({
        empty: '',
        name: 'John'
      });
    });

    it('should handle encoded parameters', () => {
      const url = 'https://example.com?message=Hello%20World&symbol=%26';
      const params = parseUrlParams(url);
      expect(params).toEqual({
        message: 'Hello World',
        symbol: '&'
      });
    });

    it('should parse from window.location.href when no URL provided', () => {
      // Mock window.location.href
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://test.com?param1=value1&param2=value2'
        },
        writable: true
      });

      const params = parseUrlParams();
      expect(params).toEqual({
        param1: 'value1',
        param2: 'value2'
      });
    });
  });

  describe('buildUrlParams', () => {
    it('should build URL parameter string', () => {
      const params = { name: 'John', age: 30, city: 'Beijing' };
      const result = buildUrlParams(params);
      expect(result).toBe('name=John&age=30&city=Beijing');
    });

    it('should handle empty object', () => {
      const result = buildUrlParams({});
      expect(result).toBe('');
    });

    it('should skip null and undefined values', () => {
      const params = { name: 'John', age: null, city: undefined, country: 'China' };
      const result = buildUrlParams(params);
      expect(result).toBe('name=John&country=China');
    });

    it('should encode special characters', () => {
      const params = { message: 'Hello World', symbol: '&' };
      const result = buildUrlParams(params);
      expect(result).toBe('message=Hello+World&symbol=%26');
    });

    it('should convert non-string values to strings', () => {
      const params = { number: 123, boolean: true, array: [1, 2, 3] };
      const result = buildUrlParams(params);
      expect(result).toBe('number=123&boolean=true&array=1%2C2%2C3');
    });
  });

  describe('addUrlParams', () => {
    it('should add parameters to URL', () => {
      const url = 'https://example.com';
      const params = { name: 'John', age: 30 };
      const result = addUrlParams(url, params);
      expect(result).toBe('https://example.com/?name=John&age=30');
    });

    it('should merge with existing parameters', () => {
      const url = 'https://example.com?existing=value';
      const params = { name: 'John', age: 30 };
      const result = addUrlParams(url, params);
      expect(result).toBe('https://example.com/?existing=value&name=John&age=30');
    });

    it('should overwrite existing parameters', () => {
      const url = 'https://example.com?name=Jane&age=25';
      const params = { name: 'John', city: 'Beijing' };
      const result = addUrlParams(url, params);
      expect(result).toBe('https://example.com/?name=John&age=25&city=Beijing');
    });

    it('should skip null and undefined values', () => {
      const url = 'https://example.com';
      const params = { name: 'John', age: null, city: undefined };
      const result = addUrlParams(url, params);
      expect(result).toBe('https://example.com/?name=John');
    });
  });

  describe('removeUrlParams', () => {
    it('should remove specified parameters', () => {
      const url = 'https://example.com?name=John&age=30&city=Beijing';
      const result = removeUrlParams(url, ['age', 'city']);
      expect(result).toBe('https://example.com/?name=John');
    });

    it('should handle non-existent parameters', () => {
      const url = 'https://example.com?name=John&age=30';
      const result = removeUrlParams(url, ['city', 'country']);
      expect(result).toBe('https://example.com/?name=John&age=30');
    });

    it('should remove all parameters when all keys provided', () => {
      const url = 'https://example.com?name=John&age=30';
      const result = removeUrlParams(url, ['name', 'age']);
      expect(result).toBe('https://example.com/');
    });

    it('should handle empty keys array', () => {
      const url = 'https://example.com?name=John&age=30';
      const result = removeUrlParams(url, []);
      expect(result).toBe('https://example.com/?name=John&age=30');
    });
  });

  describe('getUrlParam', () => {
    beforeEach(() => {
      // Mock window.location.search
      Object.defineProperty(window, 'location', {
        value: {
          search: '?name=John&age=30&city=Beijing'
        },
        writable: true
      });
    });

    it('should get parameter from current URL', () => {
      expect(getUrlParam('name')).toBe('John');
      expect(getUrlParam('age')).toBe('30');
      expect(getUrlParam('city')).toBe('Beijing');
    });

    it('should return null for non-existent parameter', () => {
      expect(getUrlParam('country')).toBeNull();
    });

    it('should handle empty search string', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true
      });

      expect(getUrlParam('name')).toBeNull();
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://sub.domain.com/path?query=1')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
      expect(isValidUrl('mailto:test@example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('www.example.com')).toBe(false);  // missing protocol
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('javascript:alert(1)')).toBe(true); // Note: technically valid URL
    });

    it('should handle edge cases', () => {
      expect(isValidUrl('file:///path/to/file')).toBe(true);
      expect(isValidUrl('data:text/plain;base64,SGVsbG8=')).toBe(true);
      expect(isValidUrl('tel:+1234567890')).toBe(true);
    });
  });
});
