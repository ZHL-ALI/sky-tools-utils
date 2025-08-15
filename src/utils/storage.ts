/**
 * 本地存储工具函数
 */

/**
 * 检查是否在浏览器环境
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof Storage !== 'undefined';
}

/**
 * 设置 localStorage
 */
export function setLocalStorage(key: string, value: any): void {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('设置 localStorage 失败:', error);
  }
}

/**
 * 获取 localStorage
 */
export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return defaultValue || null;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error('获取 localStorage 失败:', error);
    return defaultValue || null;
  }
}

/**
 * 移除 localStorage
 */
export function removeLocalStorage(key: string): void {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('移除 localStorage 失败:', error);
  }
}

/**
 * 清空 localStorage
 */
export function clearLocalStorage(): void {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return;
  }
  
  try {
    localStorage.clear();
  } catch (error) {
    console.error('清空 localStorage 失败:', error);
  }
}

/**
 * 设置 sessionStorage
 */
export function setSessionStorage(key: string, value: any): void {
  if (!isBrowser()) {
    console.warn('sessionStorage is not available in this environment');
    return;
  }
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('设置 sessionStorage 失败:', error);
  }
}

/**
 * 获取 sessionStorage
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | null {
  if (!isBrowser()) {
    console.warn('sessionStorage is not available in this environment');
    return defaultValue || null;
  }
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error('获取 sessionStorage 失败:', error);
    return defaultValue || null;
  }
}

/**
 * 设置带过期时间的存储
 */
export function setStorageWithExpiry(key: string, value: any, ttl: number): void {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return;
  }
  
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  setLocalStorage(key, item);
}

/**
 * 获取带过期时间的存储
 */
export function getStorageWithExpiry<T>(key: string): T | null {
  if (!isBrowser()) {
    console.warn('localStorage is not available in this environment');
    return null;
  }
  
  const item = getLocalStorage<{ value: T; expiry: number }>(key);
  if (!item) return null;
  
  const now = new Date();
  if (now.getTime() > item.expiry) {
    removeLocalStorage(key);
    return null;
  }
  
  return item.value;
}
