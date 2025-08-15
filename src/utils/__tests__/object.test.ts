import { deepClone, merge, get, set, isObject, getPaths } from '../object';

describe('Object Utils', () => {
  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
    });

    it('should clone Date objects', () => {
      const date = new Date('2023-12-25');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should clone arrays', () => {
      const arr = [1, 2, [3, 4]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    it('should clone objects', () => {
      const obj = {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          country: 'USA'
        }
      };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.address).not.toBe(obj.address);
    });

    it('should handle nested structures', () => {
      const complex = {
        arr: [1, { nested: true }],
        date: new Date('2023-01-01'),
        obj: { deep: { very: { deep: 'value' } } }
      };
      const cloned = deepClone(complex);
      expect(cloned).toEqual(complex);
      expect(cloned.arr[1]).not.toBe(complex.arr[1]);
      expect(cloned.obj.deep).not.toBe(complex.obj.deep);
    });
  });

  describe('merge', () => {
    it('should merge simple objects', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = merge(target, source);
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
      expect(result).toBe(target); // Should modify target
    });

    it('should merge nested objects', () => {
      const target = { a: { x: 1, y: 2 }, b: 1 };
      const source = { a: { y: 3, z: 4 }, c: 2 };
      const result = merge(target, source);
      expect(result).toEqual({
        a: { x: 1, y: 3, z: 4 },
        b: 1,
        c: 2
      });
    });

    it('should handle multiple sources', () => {
      const target = { a: 1 };
      const source1 = { b: 2 };
      const source2 = { c: 3 };
      const result = merge(target, source1, source2);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should return target when no sources', () => {
      const target = { a: 1 };
      const result = merge(target);
      expect(result).toBe(target);
    });

    it('should create nested objects when target property is missing', () => {
      const target = { a: 1 };
      const source = { b: { nested: true } };
      const result = merge(target, source);
      expect(result).toEqual({ a: 1, b: { nested: true } });
    });
  });

  describe('get', () => {
    const obj = {
      a: {
        b: {
          c: 'value'
        },
        arr: [1, 2, { nested: 'array-value' }]
      },
      x: null,
      y: undefined
    };

    it('should get nested property', () => {
      expect(get(obj, 'a.b.c')).toBe('value');
      expect(get(obj, 'a.arr.2.nested')).toBe('array-value');
    });

    it('should return default value for non-existent path', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default');
      expect(get(obj, 'nonexistent.path', 'default')).toBe('default');
    });

    it('should handle null and undefined values', () => {
      expect(get(obj, 'x', 'default')).toBe(null);
      expect(get(obj, 'y', 'default')).toBe('default');
    });

    it('should return undefined for missing path without default', () => {
      expect(get(obj, 'a.b.d')).toBeUndefined();
    });

    it('should handle root level properties', () => {
      expect(get(obj, 'a')).toBe(obj.a);
    });

    it('should handle null/undefined objects', () => {
      expect(get(null, 'a.b', 'default')).toBe('default');
      expect(get(undefined, 'a.b', 'default')).toBe('default');
    });
  });

  describe('set', () => {
    it('should set nested property', () => {
      const obj = {};
      set(obj, 'a.b.c', 'value');
      expect(obj).toEqual({ a: { b: { c: 'value' } } });
    });

    it('should overwrite existing property', () => {
      const obj = { a: { b: { c: 'old' } } };
      set(obj, 'a.b.c', 'new');
      expect(obj.a.b.c).toBe('new');
    });

    it('should create intermediate objects', () => {
      const obj = { a: 1 };
      set(obj, 'b.c.d', 'value');
      expect(obj).toEqual({ a: 1, b: { c: { d: 'value' } } });
    });

    it('should handle root level property', () => {
      const obj = {};
      set(obj, 'root', 'value');
      expect(obj).toEqual({ root: 'value' });
    });

    it('should overwrite non-object intermediate values', () => {
      const obj = { a: 'string' };
      set(obj, 'a.b.c', 'value');
      expect(obj).toEqual({ a: { b: { c: 'value' } } });
    });
  });

  describe('isObject', () => {
    it('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
    });

    it('should return false for primitives', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject(42)).toBe(false);
      expect(isObject(true)).toBe(false);
    });

    it('should return false for functions', () => {
      expect(isObject(() => {})).toBe(false);
      expect(isObject(function() {})).toBe(false);
    });

    it('should return false for Date objects', () => {
      expect(isObject(new Date())).toBe(true); // Note: Date is an object
    });
  });

  describe('getPaths', () => {
    it('should get all paths from flat object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const paths = getPaths(obj);
      expect(paths.sort()).toEqual(['a', 'b', 'c']);
    });

    it('should get all paths from nested object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        },
        f: 4
      };
      const paths = getPaths(obj);
      expect(paths.sort()).toEqual(['a', 'b', 'b.c', 'b.d', 'b.d.e', 'f']);
    });

    it('should handle empty object', () => {
      expect(getPaths({})).toEqual([]);
    });

    it('should handle object with array values', () => {
      const obj = {
        a: [1, 2, 3],
        b: {
          c: 'value'
        }
      };
      const paths = getPaths(obj);
      expect(paths.sort()).toEqual(['a', 'b', 'b.c']);
    });

    it('should use custom prefix', () => {
      const obj = { a: { b: 1 } };
      const paths = getPaths(obj, 'root');
      expect(paths).toEqual(['root.a', 'root.a.b']);
    });
  });
});
