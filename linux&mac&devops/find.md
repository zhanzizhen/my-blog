find用来搜索文件和文件夹

语法：
[find](https://www.tecmint.com/35-practical-examples-of-linux-find-command/) 

tips:
如果想查找当前目录所有文件/文件夹，可以：
find `pwd` *

## 搜索文件内容

怎样用find来搜索文件内容，请写出bash代码

16:07
使用以下bash代码来搜索文件内容：

find [filename] [flags] -exec grep -E 'text to find' {} \;
