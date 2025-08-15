/**
 * 数字工具函数
 */

/**
 * 格式化数字，添加千分位分隔符
 */
export function formatNumber(num: number, separator = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 生成指定范围内的随机数
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 保留指定小数位数
 */
export function toFixed(num: number, digits: number): number {
  return Number(num.toFixed(digits));
}

/**
 * 数字转中文
 */
export function numberToChinese(num: number): string {
  const units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  
  if (num === 0) return '零';
  if (num < 0 || num >= 1000000000 || !Number.isInteger(num)) {
    throw new Error('数字超出支持范围 (0-999999999) 或不是整数');
  }
  
  const str = num.toString();
  let result = '';
  let hasZero = false;
  
  for (let i = 0; i < str.length; i++) {
    const digit = parseInt(str[i] || '0');
    const unit = str.length - i - 1;
    
    if (digit !== 0) {
      if (hasZero && result) {
        result += '零';
      }
      result += (chars[digit] || '') + (unit > 0 ? (units[unit] || '') : '');
      hasZero = false;
    } else {
      hasZero = true;
    }
  }
  
  // 处理特殊情况：一十 -> 十
  return result.replace(/^一十/, '十');
}

/**
 * 判断是否为偶数
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * 判断是否为奇数
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * 计算百分比
 */
export function percentage(value: number, total: number, digits = 2): number {
  return toFixed((value / total) * 100, digits);
}
