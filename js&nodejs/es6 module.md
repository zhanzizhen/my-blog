## import default

import default 一个基本数据类型时，该数据改变后，import 不会跟着变。
原因如下：

```js
import a from "./test";

console.log(a);
```

翻译成：

```js
"use strict";

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

console.log(_test["default"]);
```

但是如果是 import {a} from 'test.js'，import 会跟着变，原因如下：

```js
import { a } from "./test";

console.log(a);
```

```js
"use strict";

var _test = require("./test");

console.log(_test.a);
```

可见 import { moduleName } 时，moduleName 会是个引用（即使是基本数据类型），但使用 import default 则不是。

## case2

export \* from './a' 导出文件 a 的所有 export

export {default as xxx} from './a'
导出文件 a 的默认导出

## import 循环引用

有时 import 循环引用会出现 undefined 的问题。解决方式是把对引用的取值，从编译时（模块作用域）推迟到运行时（函数作用域）。

http://yangguang1029.github.io/2017/11/13/es6-circle-import/
