/**
 * URL 工具函数
 */

/**
 * 检查是否在浏览器环境
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.location !== 'undefined';
}

/**
 * 解析 URL 参数
 */
export function parseUrlParams(url?: string): Record<string, string> {
  const targetUrl = url || (isBrowser() ? window.location.href : '');
  if (!targetUrl) {
    throw new Error('URL is required when not in browser environment');
  }
  
  const params: Record<string, string> = {};
  const urlObj = new URL(targetUrl);
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

/**
 * 构建 URL 参数字符串
 */
export function buildUrlParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

/**
 * 添加 URL 参数
 */
export function addUrlParams(url: string, params: Record<string, any>): string {
  const urlObj = new URL(url);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      urlObj.searchParams.set(key, String(value));
    }
  });
  
  return urlObj.toString();
}

/**
 * 移除 URL 参数
 */
export function removeUrlParams(url: string, keys: string[]): string {
  const urlObj = new URL(url);
  
  keys.forEach(key => {
    urlObj.searchParams.delete(key);
  });
  
  return urlObj.toString();
}

/**
 * 获取当前页面 URL 参数
 */
export function getUrlParam(key: string): string | null {
  if (!isBrowser()) {
    throw new Error('getUrlParam can only be used in browser environment');
  }
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * 判断是否为有效的 URL
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
