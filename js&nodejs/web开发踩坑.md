1. ios 的UIWebView在滚动过程不能监听scroll事件，可以监听touchmove。遗憾的是，手指滑动后有一段惯性滑动，在惯性滑动过程中js线程被暂停，touchmove也不能监听到。

2. fixed定位如果父元素有transform属性，那么fixed会变成absolute。

---

vscode ts编程，会自动引入setInterval，比如：
import { setInterval} from 'timers'; 
所以需要养成个小习惯，这样写window.setInterval

---

HtmlWebpackPlugin会自动递归遍历html模板对js, css ,img等的链接，然后复制到打包文件dist。

---

## relative path的计算问题

有一个js资源，加载路径是  src="static/a.js"（相对路径）。

当页面地址是https://testing.avg.163.com/pixel时，这个资源的请求路径是:   https://testing.avg.163.com/static/a.js

当页面地址是https://testing.avg.163.com/pixel/时，这个资源的请求路径是:   https://testing.avg.163.com/pixel/static/a.js

为什么会有这个差别呢，因为：

/pixel/   ， pixel是路径

/pixel    ,    pixel是资源