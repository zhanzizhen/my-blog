是的。

```js
(() => {
  var a = 123;
  return (window.b = () => a);
})();
```
![image](https://user-images.githubusercontent.com/22932241/169678635-916d97f7-17b3-4776-b540-9d4b6c681ceb.png)

闭包是存放到函数的[[scope]]属性
