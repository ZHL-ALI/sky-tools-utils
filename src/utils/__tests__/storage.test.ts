/**
 * @jest-environment jsdom
 */

import { 
  setLocalStorage, 
  getLocalStorage, 
  removeLocalStorage, 
  clearLocalStorage,
  setSessionStorage,
  getSessionStorage,
  setStorageWithExpiry,
  getStorageWithExpiry
} from '../storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  describe('localStorage functions', () => {
    describe('setLocalStorage', () => {
      it('should store string values', () => {
        setLocalStorage('test-key', 'test-value');
        expect(localStorage.getItem('test-key')).toBe('"test-value"');
      });

      it('should store object values', () => {
        const obj = { name: 'John', age: 30 };
        setLocalStorage('test-obj', obj);
        expect(localStorage.getItem('test-obj')).toBe(JSON.stringify(obj));
      });

      it('should store array values', () => {
        const arr = [1, 2, 3];
        setLocalStorage('test-arr', arr);
        expect(localStorage.getItem('test-arr')).toBe(JSON.stringify(arr));
      });

      it('should handle storage errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
          throw new Error('Storage quota exceeded');
        });

        setLocalStorage('test-key', 'test-value');
        expect(consoleSpy).toHaveBeenCalledWith('设置 localStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
        setItemSpy.mockRestore();
      });
    });

    describe('getLocalStorage', () => {
      it('should retrieve stored values', () => {
        localStorage.setItem('test-key', '"test-value"');
        expect(getLocalStorage('test-key')).toBe('test-value');
      });

      it('should retrieve object values', () => {
        const obj = { name: 'John', age: 30 };
        localStorage.setItem('test-obj', JSON.stringify(obj));
        expect(getLocalStorage('test-obj')).toEqual(obj);
      });

      it('should return default value for non-existent key', () => {
        expect(getLocalStorage('non-existent', 'default')).toBe('default');
      });

      it('should return null for non-existent key without default', () => {
        expect(getLocalStorage('non-existent')).toBeNull();
      });

      it('should handle JSON parse errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        localStorage.setItem('invalid-json', 'invalid json');
        
        expect(getLocalStorage('invalid-json', 'default')).toBe('default');
        expect(consoleSpy).toHaveBeenCalledWith('获取 localStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
      });
    });

    describe('removeLocalStorage', () => {
      it('should remove stored item', () => {
        localStorage.setItem('test-key', '"test-value"');
        removeLocalStorage('test-key');
        expect(localStorage.getItem('test-key')).toBeNull();
      });

      it('should handle removal errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
          throw new Error('Storage error');
        });

        removeLocalStorage('test-key');
        expect(consoleSpy).toHaveBeenCalledWith('移除 localStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
        removeItemSpy.mockRestore();
      });
    });

    describe('clearLocalStorage', () => {
      it('should clear all localStorage items', () => {
        localStorage.setItem('key1', 'value1');
        localStorage.setItem('key2', 'value2');
        
        clearLocalStorage();
        expect(localStorage.length).toBe(0);
      });

      it('should handle clear errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const clearSpy = jest.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
          throw new Error('Storage error');
        });

        clearLocalStorage();
        expect(consoleSpy).toHaveBeenCalledWith('清空 localStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
        clearSpy.mockRestore();
      });
    });
  });

  describe('sessionStorage functions', () => {
    describe('setSessionStorage', () => {
      it('should store values in sessionStorage', () => {
        setSessionStorage('session-key', 'session-value');
        expect(sessionStorage.getItem('session-key')).toBe('"session-value"');
      });

      it('should handle storage errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
          throw new Error('Storage quota exceeded');
        });

        setSessionStorage('test-key', 'test-value');
        expect(consoleSpy).toHaveBeenCalledWith('设置 sessionStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
        setItemSpy.mockRestore();
      });
    });

    describe('getSessionStorage', () => {
      it('should retrieve values from sessionStorage', () => {
        sessionStorage.setItem('session-key', '"session-value"');
        expect(getSessionStorage('session-key')).toBe('session-value');
      });

      it('should return default value for non-existent key', () => {
        expect(getSessionStorage('non-existent', 'default')).toBe('default');
      });

      it('should handle JSON parse errors gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        sessionStorage.setItem('invalid-json', 'invalid json');
        
        expect(getSessionStorage('invalid-json', 'default')).toBe('default');
        expect(consoleSpy).toHaveBeenCalledWith('获取 sessionStorage 失败:', expect.any(Error));

        consoleSpy.mockRestore();
      });
    });
  });

  describe('storage with expiry', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-12-25T12:00:00'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe('setStorageWithExpiry', () => {
      it('should store value with expiry time', () => {
        setStorageWithExpiry('expiry-key', 'test-value', 60000); // 1 minute
        
        const stored = JSON.parse(localStorage.getItem('expiry-key') || '{}');
        expect(stored.value).toBe('test-value');
        expect(stored.expiry).toBe(new Date('2023-12-25T12:01:00').getTime());
      });
    });

    describe('getStorageWithExpiry', () => {
      it('should return value before expiry', () => {
        const expiry = new Date('2023-12-25T12:01:00').getTime();
        const item = { value: 'test-value', expiry };
        localStorage.setItem('expiry-key', JSON.stringify(item));
        
        expect(getStorageWithExpiry('expiry-key')).toBe('test-value');
      });

      it('should return null after expiry and remove item', () => {
        const expiry = new Date('2023-12-25T11:59:00').getTime(); // expired
        const item = { value: 'test-value', expiry };
        localStorage.setItem('expiry-key', JSON.stringify(item));
        
        expect(getStorageWithExpiry('expiry-key')).toBeNull();
        expect(localStorage.getItem('expiry-key')).toBeNull();
      });

      it('should return null for non-existent key', () => {
        expect(getStorageWithExpiry('non-existent')).toBeNull();
      });

      it('should handle complex objects', () => {
        const obj = { name: 'John', age: 30 };
        setStorageWithExpiry('obj-key', obj, 60000);
        
        expect(getStorageWithExpiry('obj-key')).toEqual(obj);
      });
    });
  });
});
