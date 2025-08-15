/**
 * DOM 工具函数
 */

/**
 * 检查是否在浏览器环境
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * 获取元素
 */
export function $(selector: string): HTMLElement | null {
  if (!isBrowser()) {
    throw new Error('DOM operations can only be used in browser environment');
  }
  return document.querySelector(selector);
}

/**
 * 获取所有匹配的元素
 */
export function $$(selector: string): NodeListOf<HTMLElement> {
  if (!isBrowser()) {
    throw new Error('DOM operations can only be used in browser environment');
  }
  return document.querySelectorAll(selector);
}

/**
 * 添加类名
 */
export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

/**
 * 移除类名
 */
export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

/**
 * 切换类名
 */
export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

/**
 * 检查是否包含类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * 设置样式
 */
export function setStyle(element: HTMLElement, styles: Record<string, string>): void {
  Object.assign(element.style, styles);
}

/**
 * 获取元素位置信息
 */
export function getElementPosition(element: HTMLElement): { top: number; left: number; width: number; height: number } {
  if (!isBrowser()) {
    throw new Error('DOM operations can only be used in browser environment');
  }
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * 平滑滚动到指定位置
 */
export function scrollTo(top: number, behavior: ScrollBehavior = 'smooth'): void {
  if (!isBrowser()) {
    throw new Error('DOM operations can only be used in browser environment');
  }
  window.scrollTo({ top, behavior });
}

/**
 * 平滑滚动到指定元素
 */
export function scrollToElement(element: HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
  if (!isBrowser()) {
    throw new Error('DOM operations can only be used in browser environment');
  }
  element.scrollIntoView({ behavior });
}
