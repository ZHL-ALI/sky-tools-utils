import { unique, chunk, flatten, shuffle, intersection, difference, groupBy } from '../array';

describe('Array Utils', () => {
  describe('unique', () => {
    it('should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('shuffle', () => {
    it('should shuffle array', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(5);
      expect(shuffled).toEqual(expect.arrayContaining(arr));
      expect(arr).toEqual([1, 2, 3, 4, 5]); // 原数组不变
    });
  });

  describe('intersection', () => {
    it('should return intersection of arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
      expect(intersection(['a', 'b'], ['b', 'c'])).toEqual(['b']);
    });
  });

  describe('difference', () => {
    it('should return difference of arrays', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
      expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c']);
    });
  });

  describe('groupBy', () => {
    it('should group array by key', () => {
      const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 }
      ];
      
      expect(groupBy(users, 'age')).toEqual({
        25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
        30: [{ name: 'Bob', age: 30 }]
      });
    });
  });
});
