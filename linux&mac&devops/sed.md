# sed命令

shell中操作文件、文件夹的命令，很常见。但操作文本的命令，也很重要，在一些不能用图形工具的时候（比如CI)，用命令修改文件内容显示非常重要。
目前自己发现的应用场景：
1. 批量修改（因为sed支持正则)
2. ci的时候用它处理文本


sed支持：
a ：新增
c ：取代
d ：删除
i ：插入
p ：打印
s ：取代

更多：[link](https://www.computerhope.com/unix/used.htm)

复杂场景的话，可能sed满足不了，要用编程语言（python/go/nodejs)来解决
