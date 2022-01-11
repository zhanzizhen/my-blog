# web如何指定下载文件的名字

1. 利用content-disposition
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition

2. 利用 a标签的download属性

3. 利用浏览器的习惯：取path的最后一节作为文件名，让服务端弄个/download/filename的路由
