是的。

```js
(() => {
  var a = 123;
  return (window.b = () => a);
})();
```
