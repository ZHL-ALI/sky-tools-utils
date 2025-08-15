# Sky Tools 使用指南

一个轻量级的前端工具函数库，支持多种引入方式，提供常用的工具函数。

## 安装

```bash
npm install sky-tools
```

## 使用方式

### 1. ES Module 方式

```javascript
// 按需导入
import { capitalize, unique, formatDate } from 'sky-tools';

// 命名空间导入
import { string, array, date } from 'sky-tools';

// 默认导入
import SkyTools from 'sky-tools';
```

### 2. CommonJS 方式

```javascript
const { capitalize, unique, formatDate } = require('sky-tools');
const SkyTools = require('sky-tools').default;
```

### 3. UMD 方式（浏览器）

```html
<script src="https://unpkg.com/sky-tools/dist/index.umd.js"></script>
<script>
  console.log(SkyTools.string.capitalize('hello'));
</script>
```

## API 文档

### 字符串工具 (string)

#### `capitalize(str: string): string`
首字母大写
```javascript
capitalize('hello world'); // 'Hello world'
```

#### `camelCase(str: string): string`
转换为驼峰命名
```javascript
camelCase('hello-world'); // 'helloWorld'
camelCase('hello_world'); // 'helloWorld'
```

#### `kebabCase(str: string): string`
转换为短横线命名
```javascript
kebabCase('helloWorld'); // 'hello-world'
```

#### `snakeCase(str: string): string`
转换为下划线命名
```javascript
snakeCase('helloWorld'); // 'hello_world'
```

#### `truncate(str: string, length: number, suffix?: string): string`
截断字符串
```javascript
truncate('hello world', 5); // 'hello...'
truncate('hello world', 5, '***'); // 'hello***'
```

#### `stripHtml(str: string): string`
移除 HTML 标签
```javascript
stripHtml('<p>Hello <strong>World</strong></p>'); // 'Hello World'
```

#### `randomString(length: number, chars?: string): string`
生成随机字符串
```javascript
randomString(10); // 'aBc123XyZ9'
```

### 数组工具 (array)

#### `unique<T>(arr: T[]): T[]`
数组去重
```javascript
unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
```

#### `chunk<T>(arr: T[], size: number): T[][]`
数组分块
```javascript
chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
```

#### `flatten<T>(arr: (T | T[])[]): T[]`
数组扁平化
```javascript
flatten([1, [2, 3], [4, [5, 6]]]); // [1, 2, 3, 4, 5, 6]
```

#### `shuffle<T>(arr: T[]): T[]`
随机排序（不修改原数组）
```javascript
shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4]
```

#### `intersection<T>(arr1: T[], arr2: T[]): T[]`
获取数组交集
```javascript
intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
```

#### `difference<T>(arr1: T[], arr2: T[]): T[]`
获取数组差集
```javascript
difference([1, 2, 3], [2, 3, 4]); // [1]
```

#### `groupBy<T>(arr: T[], key: keyof T | ((item: T) => string | number)): Record<string | number, T[]>`
数组分组
```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];
groupBy(users, 'age');
// { 25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }], 30: [{ name: 'Bob', age: 30 }] }
```

### 日期工具 (date)

#### `formatDate(date: Date | string | number, format?: string): string`
格式化日期
```javascript
formatDate(new Date(), 'YYYY-MM-DD'); // '2023-12-25'
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'); // '2023-12-25 10:30:45'
```

#### `getRelativeTime(date: Date | string | number): string`
获取相对时间
```javascript
getRelativeTime(new Date(Date.now() - 60000)); // '1分钟前'
```

#### `isToday(date: Date | string | number): boolean`
判断是否为今天
```javascript
isToday(new Date()); // true
```

#### `getDateRange(startDate: Date | string, endDate: Date | string): Date[]`
获取日期范围
```javascript
getDateRange('2023-12-20', '2023-12-23'); // [Date, Date, Date, Date]
```

#### `addTime(date: Date | string | number, amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): Date`
添加时间
```javascript
addTime(new Date(), 7, 'day'); // 7天后的日期
addTime(new Date(), -1, 'hour'); // 1小时前的时间
```

### 数字工具 (number)

#### `formatNumber(num: number, separator?: string): string`
格式化数字（千分位分隔符）
```javascript
formatNumber(1234567); // '1,234,567'
formatNumber(1234567, ' '); // '1 234 567'
```

#### `randomNumber(min: number, max: number): number`
生成随机数
```javascript
randomNumber(1, 10); // 1-10之间的随机整数
```

#### `toFixed(num: number, digits: number): number`
保留小数位数（返回数字类型）
```javascript
toFixed(3.14159, 2); // 3.14
```

#### `numberToChinese(num: number): string`
数字转中文
```javascript
numberToChinese(123); // '一百二十三'
numberToChinese(1000); // '一千'
```

#### `isEven(num: number): boolean`
判断是否为偶数
```javascript
isEven(4); // true
isEven(3); // false
```

#### `isOdd(num: number): boolean`
判断是否为奇数
```javascript
isOdd(3); // true
isOdd(4); // false
```

#### `percentage(value: number, total: number, digits?: number): number`
计算百分比
```javascript
percentage(25, 100); // 25
percentage(1, 3, 2); // 33.33
```

### 对象工具 (object)

#### `deepClone<T>(obj: T): T`
深拷贝对象
```javascript
const obj = { a: { b: 1 } };
const cloned = deepClone(obj);
cloned.a.b = 2; // 不影响原对象
```

#### `merge<T>(target: T, ...sources: Partial<T>[]): T`
合并对象
```javascript
merge({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
```

#### `get(obj: any, path: string, defaultValue?: any): any`
获取对象深层属性
```javascript
get({ a: { b: { c: 'value' } } }, 'a.b.c'); // 'value'
get({ a: { b: 1 } }, 'a.b.c', 'default'); // 'default'
```

#### `set(obj: any, path: string, value: any): void`
设置对象深层属性
```javascript
const obj = {};
set(obj, 'a.b.c', 'value');
// obj 变为 { a: { b: { c: 'value' } } }
```

#### `isObject(item: any): boolean`
检查是否为对象
```javascript
isObject({}); // true
isObject([]); // false
isObject(null); // false
```

#### `getPaths(obj: Record<string, any>, prefix?: string): string[]`
获取对象所有键路径
```javascript
getPaths({ a: { b: 1, c: { d: 2 } } }); // ['a', 'a.b', 'a.c', 'a.c.d']
```

### DOM 工具 (dom)

#### `$(selector: string): HTMLElement | null`
选择单个元素
```javascript
const element = $('#my-id');
```

#### `$$(selector: string): NodeListOf<HTMLElement>`
选择多个元素
```javascript
const elements = $$('.my-class');
```

#### `addClass(element: HTMLElement, className: string): void`
添加类名
```javascript
addClass(element, 'active');
```

#### `removeClass(element: HTMLElement, className: string): void`
移除类名
```javascript
removeClass(element, 'active');
```

#### `toggleClass(element: HTMLElement, className: string): void`
切换类名
```javascript
toggleClass(element, 'active');
```

#### `hasClass(element: HTMLElement, className: string): boolean`
检查是否包含类名
```javascript
hasClass(element, 'active'); // true/false
```

#### `setStyle(element: HTMLElement, styles: Record<string, string>): void`
设置样式
```javascript
setStyle(element, { color: 'red', fontSize: '16px' });
```

#### `getElementPosition(element: HTMLElement): { top: number; left: number; width: number; height: number }`
获取元素位置信息
```javascript
const pos = getElementPosition(element);
// { top: 100, left: 50, width: 200, height: 30 }
```

#### `scrollTo(top: number, behavior?: ScrollBehavior): void`
平滑滚动到指定位置
```javascript
scrollTo(100); // 滚动到距离顶部100px的位置
```

#### `scrollToElement(element: HTMLElement, behavior?: ScrollBehavior): void`
平滑滚动到指定元素
```javascript
scrollToElement(element);
```

### 存储工具 (storage)

#### `setLocalStorage(key: string, value: any): void`
设置 localStorage
```javascript
setLocalStorage('user', { name: 'John', age: 30 });
```

#### `getLocalStorage<T>(key: string, defaultValue?: T): T | null`
获取 localStorage
```javascript
const user = getLocalStorage('user'); // { name: 'John', age: 30 }
```

#### `removeLocalStorage(key: string): void`
移除 localStorage
```javascript
removeLocalStorage('user');
```

#### `clearLocalStorage(): void`
清空 localStorage
```javascript
clearLocalStorage();
```

#### `setSessionStorage(key: string, value: any): void`
设置 sessionStorage
```javascript
setSessionStorage('temp', 'value');
```

#### `getSessionStorage<T>(key: string, defaultValue?: T): T | null`
获取 sessionStorage
```javascript
const temp = getSessionStorage('temp');
```

#### `setStorageWithExpiry(key: string, value: any, ttl: number): void`
设置带过期时间的存储
```javascript
setStorageWithExpiry('cache', data, 60000); // 1分钟后过期
```

#### `getStorageWithExpiry<T>(key: string): T | null`
获取带过期时间的存储
```javascript
const cache = getStorageWithExpiry('cache'); // 过期返回 null
```

### URL 工具 (url)

#### `parseUrlParams(url?: string): Record<string, string>`
解析 URL 参数
```javascript
parseUrlParams('https://example.com?name=John&age=30');
// { name: 'John', age: '30' }
```

#### `buildUrlParams(params: Record<string, any>): string`
构建 URL 参数字符串
```javascript
buildUrlParams({ name: 'John', age: 30 }); // 'name=John&age=30'
```

#### `addUrlParams(url: string, params: Record<string, any>): string`
添加 URL 参数
```javascript
addUrlParams('https://example.com', { foo: 'bar' });
// 'https://example.com?foo=bar'
```

#### `removeUrlParams(url: string, keys: string[]): string`
移除 URL 参数
```javascript
removeUrlParams('https://example.com?a=1&b=2', ['b']);
// 'https://example.com?a=1'
```

#### `getUrlParam(key: string): string | null`
获取当前页面 URL 参数
```javascript
getUrlParam('name'); // 从当前页面 URL 获取 name 参数
```

#### `isValidUrl(str: string): boolean`
验证 URL 格式
```javascript
isValidUrl('https://www.example.com'); // true
isValidUrl('not-a-url'); // false
```

### 验证工具 (validator)

#### `isEmail(email: string): boolean`
验证邮箱格式
```javascript
isEmail('test@example.com'); // true
```

#### `isPhone(phone: string): boolean`
验证手机号格式（中国大陆）
```javascript
isPhone('13800138000'); // true
```

#### `isIdCard(idCard: string): boolean`
验证身份证号格式（中国大陆）
```javascript
isIdCard('123456789012345678'); // true
```

#### `isStrongPassword(password: string): boolean`
验证密码强度（至少8位，包含大小写字母、数字和特殊字符）
```javascript
isStrongPassword('Password123!'); // true
```

#### `isUrl(url: string): boolean`
验证 URL 格式
```javascript
isUrl('https://www.example.com'); // true
```

#### `isIP(ip: string): boolean`
验证 IP 地址格式
```javascript
isIP('192.168.1.1'); // true
```

#### `isNumeric(str: string): boolean`
验证是否为纯数字
```javascript
isNumeric('12345'); // true
isNumeric('123.45'); // false
```

#### `isChinese(str: string): boolean`
验证是否为中文
```javascript
isChinese('中文测试'); // true
```

#### `isBankCard(cardNumber: string): boolean`
验证银行卡号格式
```javascript
isBankCard('1234567890123456'); // true
```

## TypeScript 支持

本库完全支持 TypeScript，提供完整的类型定义：

```typescript
import { unique, formatDate, isEmail } from 'sky-tools';

const numbers: number[] = unique([1, 2, 2, 3]); // 类型推断为 number[]
const dateStr: string = formatDate(new Date()); // 类型为 string
const isValid: boolean = isEmail('test@example.com'); // 类型为 boolean
```

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79

## 许可证

MIT License
