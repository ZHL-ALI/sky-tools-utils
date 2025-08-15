/**
 * 验证工具函数
 */

/**
 * 验证邮箱格式
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式（中国大陆）
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证身份证号格式（中国大陆）
 */
export function isIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return idCardRegex.test(idCard);
}

/**
 * 验证密码强度
 */
export function isStrongPassword(password: string): boolean {
  // 至少8位，包含大小写字母、数字和特殊字符
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

/**
 * 验证 URL 格式
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证 IP 地址格式
 */
export function isIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    // 检查是否为空或包含非数字字符
    if (!part || !/^\d+$/.test(part)) return false;
    
    // 检查前导零（除了单独的"0"）
    if (part.length > 1 && part[0] === '0') return false;
    
    // 检查数值范围
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
}

/**
 * 验证是否为纯数字
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * 验证是否为中文
 */
export function isChinese(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str);
}

/**
 * 验证银行卡号格式
 */
export function isBankCard(cardNumber: string): boolean {
  const bankCardRegex = /^[1-9]\d{12,18}$/;
  return bankCardRegex.test(cardNumber);
}
