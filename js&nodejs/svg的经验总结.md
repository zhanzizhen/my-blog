svg 的下面几个属性，可以让 font-size 和 color 能巧妙的起到作用  
width: 1em;
height: 1em;
fill: currentcolor;

---

如何在 react 中使用 svg，一种方式是通过 img，缺点是不能指定属性。另一种是
可以通过 file-loader，然后如下导入：

```js
import { ReactComponent as CloseSvg } from "../../images/close.svg";
```
