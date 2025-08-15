// 具名导出所有工具函数
export * from './utils/string';
export * from './utils/array';
export * from './utils/object';
export * from './utils/date';
export * from './utils/number';
export * from './utils/dom';
export * from './utils/storage';
export * from './utils/url';
export * from './utils/validator';
export * from './utils/performance';

// 导入所有工具模块
import * as stringUtils from './utils/string';
import * as arrayUtils from './utils/array';
import * as objectUtils from './utils/object';
import * as dateUtils from './utils/date';
import * as numberUtils from './utils/number';
import * as domUtils from './utils/dom';
import * as storageUtils from './utils/storage';
import * as urlUtils from './utils/url';
import * as validatorUtils from './utils/validator';
import * as performanceUtils from './utils/performance';

// 命名空间导出
export {
  stringUtils as string,
  arrayUtils as array,
  objectUtils as object,
  dateUtils as date,
  numberUtils as number,
  domUtils as dom,
  storageUtils as storage,
  urlUtils as url,
  validatorUtils as validator,
  performanceUtils as performance,
};

// 默认导出一个包含所有工具的对象
export default {
  string: stringUtils,
  array: arrayUtils,
  object: objectUtils,
  date: dateUtils,
  number: numberUtils,
  dom: domUtils,
  storage: storageUtils,
  url: urlUtils,
  validator: validatorUtils,
  performance: performanceUtils,
};
