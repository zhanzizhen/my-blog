## Base64

 **Base64**是一种基于64个可打印字符来表示[二进制数据](https://zh.wikipedia.org/wiki/二进制)的表示方法。由于{\displaystyle 2^{6}=64}![{\displaystyle 2^{6}=64}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c4becc8d811901597b9807eccff60f0897e3701a)，所以每6个[比特](https://zh.wikipedia.org/wiki/位元)为一个单元，对应某个可打印字符。3个[字节](https://zh.wikipedia.org/wiki/字节)有24个比特，对应于4个Base64单元，即3个字节可由4个可打印字符来表示。它可用来作为[电子邮件](https://zh.wikipedia.org/wiki/电子邮件)的传输[编码](https://zh.wikipedia.org/wiki/字符编码)。在Base64中的可打印字符包括[字母](https://zh.wikipedia.org/wiki/拉丁字母)`A-Z`、`a-z`、[数字](https://zh.wikipedia.org/wiki/数字)`0-9`，这样共有62个字符，此外两个可打印符号在不同的系统中而不同，例如 [MIME](https://zh.wikipedia.org/wiki/MIME)格式的[电子邮件](https://zh.wikipedia.org/wiki/电子邮件) 中，其他两个字符 加号`+`和斜杠`/` 。一些如[uuencode](https://zh.wikipedia.org/wiki/Uuencode)的其他编码方法，和之后[BinHex](https://zh.wikipedia.org/w/index.php?title=BinHex&action=edit&redlink=1)的版本使用不同的64字符集来代表6个二进制数字，但是不被称为Base64。 


下文摘自知乎https://www.zhihu.com/question/36306744/answer/673975520

一些答案其实已经说到了，但是可以更明确一点。

Base64编码是从二进制值到某些特定字符的编码，这些特定字符一共64个，所以称作Base64。

为什么不直接传输二进制呢？比如图片，或者字符，既然实际传输时它们都是二进制字节流。而且即使Base64编码过的字符串最终也是二进制（通常是UTF-8编码，兼容ASCII编码）在网络上传输的，那么用4/3倍带宽传输数据的Base64究竟有什么意义？

真正的原因是二进制不兼容。某些二进制值，在一些硬件上，比如在不同的路由器，老电脑上，表示的意义不一样，做的处理也不一样。同样，一些老的软件，网络协议也有类似的问题。

但是万幸，Base64使用的64个字符，经ASCII/UTF-8编码后在大多数机器，软件上的行为是一样的。