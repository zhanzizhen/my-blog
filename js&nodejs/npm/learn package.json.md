## 说下它的字段的意义

name: npm 包的名字

version: npm 包的版本

description：This helps people discover your package

homepage: npm 包的主页

bugs: 可以放 github 的 issue 链接

main: npm 的入口。若 main: foo.js，则 requeir("xxx")会 return foo.js 的 module.exports。若无指定，则默认是根目录的 index.js

browser: 似乎只有提示的意义。提示使用者，如果在浏览器使用该包，入口是 xxx

bin：
举例：

```js

{
  "bin": {
    "myapp": "./cli.js"
  }
}
```

如果你全局安装该 npm 包，npm 会通过 systemlink 将 myapp command
