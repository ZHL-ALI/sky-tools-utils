# Sky Tools

<div align="center">

![Sky Tools Logo](https://img.shields.io/badge/Sky%20Tools-v1.0.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**一个现代化的前端工具函数库，提供丰富的实用工具函数**

[📖 使用文档](./USAGE.md) | [🚀 快速开始](#安装) | [💡 示例](./examples/index.html) | [🧪 在线测试](./test-browser.html)

</div>

## ✨ 特性

- 🚀 **轻量级** - 无外部依赖，体积小巧
- 📦 **多格式支持** - ES Module、CommonJS、UMD 全覆盖
- 🔧 **TypeScript 原生支持** - 完整的类型定义和智能提示
- 🧪 **测试覆盖完整** - 每个函数都有对应的单元测试
- 📖 **文档详尽** - 详细的使用文档和在线示例
- ⚡ **性能优化** - 包含防抖、节流、记忆化等性能工具
- 🌐 **浏览器兼容** - 支持现代浏览器和 Node.js 环境
- 🎯 **按需引入** - 支持 Tree Shaking，只打包使用的函数

## 安装

### NPM 安装

```bash
npm install sky-tools
```

### CDN 引入

```html
<!-- UMD 版本 -->
<script src="https://unpkg.com/sky-tools/dist/index.umd.js"></script>

<!-- ES Module 版本 -->
<script type="module">
  import { capitalize } from 'https://unpkg.com/sky-tools/dist/index.esm.js';
</script>
```

## 使用方式

### ES Module

```javascript
// 按需引入
import { capitalize, unique, formatDate } from 'sky-tools';

// 全量引入
import SkyTools from 'sky-tools';

console.log(capitalize('hello world')); // Hello world
console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
```

### CommonJS

```javascript
const { capitalize, unique } = require('sky-tools');
// 或
const SkyTools = require('sky-tools');
```

### UMD (浏览器直接引入)

```html
<script src="https://unpkg.com/sky-tools/dist/index.umd.js"></script>
<script>
  console.log(SkyTools.string.capitalize('hello')); // Hello
  console.log(SkyTools.array.unique([1, 2, 2, 3])); // [1, 2, 3]
</script>
```

## API 文档

### 字符串工具 (String Utils)

- `capitalize(str)` - 首字母大写
- `camelCase(str)` - 转换为驼峰命名
- `kebabCase(str)` - 转换为短横线命名
- `snakeCase(str)` - 转换为下划线命名
- `truncate(str, length, suffix)` - 截断字符串
- `stripHtml(str)` - 移除HTML标签
- `randomString(length, chars)` - 生成随机字符串

### 数组工具 (Array Utils)

- `unique(arr)` - 数组去重
- `chunk(arr, size)` - 数组分块
- `flatten(arr)` - 数组扁平化
- `shuffle(arr)` - 数组随机排序
- `intersection(arr1, arr2)` - 获取数组交集
- `difference(arr1, arr2)` - 获取数组差集
- `groupBy(arr, key)` - 数组分组

### 对象工具 (Object Utils)

- `deepClone(obj)` - 深拷贝对象
- `merge(target, ...sources)` - 对象合并
- `get(obj, path, defaultValue)` - 获取对象深层属性值
- `set(obj, path, value)` - 设置对象深层属性值
- `getPaths(obj)` - 获取对象所有键的路径

### 日期工具 (Date Utils)

- `formatDate(date, format)` - 格式化日期
- `getRelativeTime(date)` - 获取相对时间描述
- `isToday(date)` - 判断是否为今天
- `getDateRange(startDate, endDate)` - 获取日期范围
- `addTime(date, amount, unit)` - 添加时间

### 数字工具 (Number Utils)

- `formatNumber(num, separator)` - 格式化数字
- `randomNumber(min, max)` - 生成随机数
- `toFixed(num, digits)` - 保留小数位数
- `numberToChinese(num)` - 数字转中文
- `isEven(num)` - 判断是否为偶数
- `isOdd(num)` - 判断是否为奇数
- `percentage(value, total, digits)` - 计算百分比

### DOM 工具 (DOM Utils)

- `$(selector)` - 获取元素
- `$$(selector)` - 获取所有匹配元素
- `addClass/removeClass/toggleClass/hasClass` - 类名操作
- `setStyle(element, styles)` - 设置样式
- `getElementPosition(element)` - 获取元素位置
- `scrollTo/scrollToElement` - 滚动操作

### 存储工具 (Storage Utils)

- `setLocalStorage/getLocalStorage/removeLocalStorage` - localStorage 操作
- `setSessionStorage/getSessionStorage` - sessionStorage 操作
- `setStorageWithExpiry/getStorageWithExpiry` - 带过期时间的存储

### URL 工具 (URL Utils)

- `parseUrlParams(url)` - 解析URL参数
- `buildUrlParams(params)` - 构建URL参数
- `addUrlParams/removeUrlParams` - 添加/移除URL参数
- `getUrlParam(key)` - 获取URL参数
- `isValidUrl(str)` - 验证URL格式

### 验证工具 (Validator Utils)

- `isEmail(email)` - 验证邮箱格式
- `isPhone(phone)` - 验证手机号格式
- `isIdCard(idCard)` - 验证身份证号格式
- `isStrongPassword(password)` - 验证密码强度
- `isUrl/isIP/isNumeric/isChinese/isBankCard` - 各种格式验证

### 性能工具 (Performance Utils) 🆕

- `debounce(func, wait, immediate)` - 防抖函数
- `throttle(func, limit)` - 节流函数
- `deepEqual(a, b)` - 深度比较
- `memoize(fn, getKey)` - 记忆化函数
- `delay(ms)` - 延迟执行
- `retry(fn, maxAttempts, delayMs)` - 重试机制

## 📊 工具函数总览

| 模块 | 函数数量 | 主要功能 |
|------|----------|----------|
| 字符串 | 7 | 格式转换、截断、随机生成 |
| 数组 | 7 | 去重、分块、排序、集合运算 |
| 对象 | 6 | 深拷贝、合并、路径操作 |
| 日期 | 5 | 格式化、相对时间、范围计算 |
| 数字 | 7 | 格式化、随机数、中文转换 |
| DOM | 10 | 元素操作、样式设置、滚动 |
| 存储 | 8 | localStorage、sessionStorage、过期管理 |
| URL | 6 | 参数解析、构建、验证 |
| 验证 | 9 | 邮箱、手机、身份证等验证 |
| 性能 | 6 | 防抖、节流、记忆化、重试 |

**总计：71+ 个实用工具函数**

## 🚀 快速示例

```javascript
import { 
  capitalize, unique, formatDate, 
  debounce, isEmail, formatNumber 
} from 'sky-tools';

// 字符串处理
capitalize('hello world'); // "Hello world"

// 数组去重
unique([1, 2, 2, 3, 4, 4]); // [1, 2, 3, 4]

// 日期格式化
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'); // "2023-12-25 10:30:45"

// 防抖函数
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);

// 邮箱验证
isEmail('test@example.com'); // true

// 数字格式化
formatNumber(1234567); // "1,234,567"
```

## 🛠️ 开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 开发模式（监听文件变化）
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage

# 代码检查
npm run lint

# 修复代码格式
npm run lint:fix

# 类型检查
npm run type-check

# 完整验证（类型检查 + 代码检查 + 测试）
npm run validate
```

## 📁 项目结构

```
sky-tools/
├── src/
│   ├── utils/                  # 工具函数模块
│   │   ├── __tests__/         # 测试文件
│   │   ├── string.ts          # 字符串工具
│   │   ├── array.ts           # 数组工具
│   │   ├── object.ts          # 对象工具
│   │   ├── date.ts            # 日期工具
│   │   ├── number.ts          # 数字工具
│   │   ├── dom.ts             # DOM 工具
│   │   ├── storage.ts         # 存储工具
│   │   ├── url.ts             # URL 工具
│   │   ├── validator.ts       # 验证工具
│   │   └── performance.ts     # 性能工具
│   ├── index.ts               # 主入口文件
│   └── setupTests.ts          # 测试配置
├── examples/
│   └── index.html             # 交互式示例
├── dist/                      # 构建输出目录
├── test-browser.html          # 浏览器测试页面
├── USAGE.md                   # 详细使用文档
└── 配置文件...
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源协议。

## 🔗 相关链接

- [详细使用文档](./USAGE.md)
- [更新日志](./CHANGELOG.md)
- [在线示例](./examples/index.html)
- [浏览器测试](./test-browser.html)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by Sky Tools Team

</div>
