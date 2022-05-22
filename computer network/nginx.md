nginx有一套"变量 正则表达式"来配置服务分流。
![image](https://user-images.githubusercontent.com/22932241/169677103-e524f851-b5fe-486a-8973-22dcc3873397.png)

比如上图中的\$arg\_abversion \~\^test\$，说的是url query的abversion参数的值为test的话，则命中。

其他的部分内置变量：
![image](https://user-images.githubusercontent.com/22932241/169677163-52c2465f-4846-4d77-b0f5-49e382e5fffc.png)

若我配置$http\_usecdn \~^1\$，则http request header有usecdn头部且值为1时命中。
