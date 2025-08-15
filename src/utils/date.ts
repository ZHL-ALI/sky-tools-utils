/**
 * 日期工具函数
 */

/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD'): string {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间描述
 */
export function getRelativeTime(date: Date | string | number): string {
  const now = Date.now();
  const target = new Date(date);
  const diff = now - target.getTime();
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;
  
  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < month) return `${Math.floor(diff / day)}天前`;
  if (diff < year) return `${Math.floor(diff / month)}个月前`;
  return `${Math.floor(diff / year)}年前`;
}

/**
 * 判断是否为今天
 */
export function isToday(date: Date | string | number): boolean {
  const today = new Date();
  const target = new Date(date);
  
  return today.getFullYear() === target.getFullYear() &&
         today.getMonth() === target.getMonth() &&
         today.getDate() === target.getDate();
}

/**
 * 获取日期范围内的所有日期
 */
export function getDateRange(startDate: Date | string, endDate: Date | string): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: Date[] = [];
  
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

/**
 * 添加时间
 */
export function addTime(date: Date | string | number, amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): Date {
  const result = new Date(date);
  
  switch (unit) {
    case 'year':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'month':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'day':
      result.setDate(result.getDate() + amount);
      break;
    case 'hour':
      result.setHours(result.getHours() + amount);
      break;
    case 'minute':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'second':
      result.setSeconds(result.getSeconds() + amount);
      break;
  }
  
  return result;
}
