/**
 * 对象工具函数
 */

/**
 * 深拷贝对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * 对象合并
 */
export function merge<T extends Record<string, any>>(target: T, ...sources: Record<string, any>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        if (isObject(sourceValue)) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          // 类型断言确保 target[key] 存在且为对象类型
          merge(target[key] as Record<string, any>, sourceValue as Record<string, any>);
        } else {
          Object.assign(target, { [key]: sourceValue });
        }
      }
    }
  }
  
  return merge(target, ...sources);
}

/**
 * 获取对象深层属性值
 */
export function get(obj: any, path: string, defaultValue?: any): any {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

/**
 * 设置对象深层属性值
 */
export function set(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  const lastKey = keys[keys.length - 1]!;
  current[lastKey] = value;
}

/**
 * 检查是否为对象
 */
export function isObject(item: any): boolean {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 获取对象所有键的路径
 */
export function getPaths(obj: Record<string, any>, prefix = ''): string[] {
  const paths: string[] = [];
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      paths.push(currentPath);
      
      if (isObject(obj[key])) {
        paths.push(...getPaths(obj[key], currentPath));
      }
    }
  }
  
  return paths;
}
