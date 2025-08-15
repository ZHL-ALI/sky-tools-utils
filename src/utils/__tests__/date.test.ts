import { formatDate, getRelativeTime, isToday, getDateRange, addTime } from '../date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date with default format', () => {
      const date = new Date('2023-12-25T10:30:45');
      expect(formatDate(date)).toBe('2023-12-25');
    });

    it('should format date with custom format', () => {
      const date = new Date('2023-12-25T10:30:45');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-12-25 10:30:45');
      expect(formatDate(date, 'MM/DD/YYYY')).toBe('12/25/2023');
    });

    it('should handle string and number inputs', () => {
      expect(formatDate('2023-12-25')).toBe('2023-12-25');
      expect(formatDate(1703505045000)).toBe('2023-12-25');
    });
  });

  describe('getRelativeTime', () => {
    const mockCurrentTime = new Date('2025-08-15T13:42:00').getTime();
    
    beforeEach(() => {
      // Mock Date.now() to return a fixed timestamp
      jest.spyOn(Date, 'now').mockReturnValue(mockCurrentTime);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return "刚刚" for recent time', () => {
      const recent = new Date('2025-08-15T13:41:30');
      expect(getRelativeTime(recent)).toBe('刚刚');
    });

    it('should return minutes ago', () => {
      const fiveMinutesAgo = new Date('2025-08-15T13:37:00');
      expect(getRelativeTime(fiveMinutesAgo)).toBe('5分钟前');
    });

    it('should return hours ago', () => {
      const twoHoursAgo = new Date('2025-08-15T11:37:00');
      expect(getRelativeTime(twoHoursAgo)).toBe('2小时前');
    });

    it('should return days ago', () => {
      const threeDaysAgo = new Date('2025-08-12T12:00:00');
      expect(getRelativeTime(threeDaysAgo)).toBe('3天前');
    });

    it('should return months ago', () => {
      const twoMonthsAgo = new Date('2025-06-15T12:00:00');
      expect(getRelativeTime(twoMonthsAgo)).toBe('2个月前');
    });

    it('should return years ago', () => {
      const twoYearsAgo = new Date('2023-08-15T12:00:00');
      expect(getRelativeTime(twoYearsAgo)).toBe('2年前');
    });
  });

  describe('isToday', () => {
    beforeEach(() => {
      // Mock Date.now() to return fixed timestamp for 2025-08-15
      jest.spyOn(Date, 'now').mockReturnValue(new Date('2025-08-15T12:00:00').getTime());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return true for today', () => {
      const today = new Date('2025-08-15T15:30:00');
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date('2025-08-14T15:30:00');
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date('2025-08-16T15:30:00');
      expect(isToday(tomorrow)).toBe(false);
    });

    it('should handle string input', () => {
      expect(isToday('2025-08-15')).toBe(true);
      expect(isToday('2025-08-14')).toBe(false);
    });
  });

  describe('getDateRange', () => {
    it('should return array of dates in range', () => {
      const start = '2023-12-20';
      const end = '2023-12-23';
      const range = getDateRange(start, end);
      
      expect(range).toHaveLength(4);
      expect(range[0]).toEqual(new Date('2023-12-20'));
      expect(range[1]).toEqual(new Date('2023-12-21'));
      expect(range[2]).toEqual(new Date('2023-12-22'));
      expect(range[3]).toEqual(new Date('2023-12-23'));
    });

    it('should handle single day range', () => {
      const date = '2023-12-25';
      const range = getDateRange(date, date);
      
      expect(range).toHaveLength(1);
      expect(range[0]).toEqual(new Date('2023-12-25'));
    });

    it('should handle Date objects', () => {
      const start = new Date('2023-12-20');
      const end = new Date('2023-12-22');
      const range = getDateRange(start, end);
      
      expect(range).toHaveLength(3);
    });
  });

  describe('addTime', () => {
    const baseDate = new Date('2023-12-25T12:00:00');

    it('should add years', () => {
      const result = addTime(baseDate, 2, 'year');
      expect(result.getFullYear()).toBe(2025);
    });

    it('should add months', () => {
      const result = addTime(baseDate, 3, 'month');
      expect(result.getMonth()).toBe(2); // March (0-indexed)
    });

    it('should add days', () => {
      const result = addTime(baseDate, 5, 'day');
      expect(result.getDate()).toBe(30);
    });

    it('should add hours', () => {
      const result = addTime(baseDate, 6, 'hour');
      expect(result.getHours()).toBe(18);
    });

    it('should add minutes', () => {
      const result = addTime(baseDate, 30, 'minute');
      expect(result.getMinutes()).toBe(30);
    });

    it('should add seconds', () => {
      const result = addTime(baseDate, 45, 'second');
      expect(result.getSeconds()).toBe(45);
    });

    it('should handle negative amounts', () => {
      const result = addTime(baseDate, -1, 'day');
      expect(result.getDate()).toBe(24);
    });

    it('should handle string and number inputs', () => {
      const result1 = addTime('2023-12-25T12:00:00', 1, 'day');
      const result2 = addTime(baseDate.getTime(), 1, 'day');
      
      expect(result1.getDate()).toBe(26);
      expect(result2.getDate()).toBe(26);
    });
  });
});
