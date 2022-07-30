## File

file：A `File` object is a specific kind of a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob), and can be used in any context that a Blob can. In particular, [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader), [`URL.createObjectURL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL), [`createImageBitmap()`](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapFactories/createImageBitmap), and [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send()) accept both `Blob`s and `File`s. 



## Blob

A `Blob` object represents a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) so its methods can be used for processing the data. Blobs can represent data that isn't necessarily in a JavaScript-native format. The [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) interface is based on `Blob`, inheriting blob functionality and expanding it to support files on the user's system. 



## FileReader

[FileReader.readAsDataURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL格式的Base64字符串以表示所读取文件的内容。

[`FileReader.readAsText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText)

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。

```
instance of FileReader.readAsText(blob[, encoding]);
```

参数

- `二进制对象`

  [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)类型 或 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)类型

- 编码类型  (可选)

  传入一个字符串类型的编码类型，如缺省，则默认为“utf-8”类型



## URL.createObjectURL

 The **`URL.createObjectURL()`** static method creates a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) containing a URL representing the object given in the parameter. The URL lifetime is tied to the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) in the window on which it was created. The new object URL represents the specified [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object or [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object. 

**Syntax**:

```
objectURL = URL.createObjectURL(object);
```

**Parameters**

- `object`

  A [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File), [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [`MediaSource`](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource) object to create an object URL for.

**Return value**

A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) containing an object URL that can be used to reference the contents of the specified source `object`.

DOMString，比如`"blob:http://local.dev.avg.163.com:3001/9b109fbc-9f29-412e-8095-96d968f1a1ea"`，其实就是这张图片在内存地址的一个映射。


## Buffer和Cache的区别

1、**Buffer**（缓冲区）是系统两端处理**速度平衡**（从长时间尺度上看）时使用的。它的引入是为了减小短期内突发I/O的影响，起到**流量整形**的作用。比如生产者——消费者问题，他们产生和消耗资源的速度大体接近，加一个buffer可以抵消掉资源刚产生/消耗时的突然变化。
2、**Cache**（缓存）则是系统两端处理**速度不匹配**时的一种**折衷策略**。因为CPU和memory之间的速度差异越来越大，所以人们充分利用数据的局部性（locality）特征，通过使用存储系统分级（memory hierarchy）的策略来减小这种差异带来的影响。
3、假定以后存储器访问变得跟CPU做计算一样快，cache就可以消失，但是buffer依然存在。比如从网络上下载东西，瞬时速率可能会有较大变化，但从长期来看却是稳定的，这样就能通过引入一个buffer使得OS接收数据的速率更稳定，进一步减少对磁盘的伤害。



 ## 二进制文件

**二进制文件**（英语：Binary file）一般指包含[ASCII](https://zh.wikipedia.org/wiki/ASCII)及扩展ASCII字符中编写的[数据](https://zh.wikipedia.org/wiki/数据)或程序指令（Program instructions）的文件。广义的二进制文件即为[文件](https://zh.wikipedia.org/wiki/電腦檔案)，由文件在[外部](https://zh.wikipedia.org/w/index.php?title=外部儲存裝置&action=edit&redlink=1)[存储设备](https://zh.wikipedia.org/wiki/存储设备)的存放方式为[二进制](https://zh.wikipedia.org/wiki/二进制)而得名。狭义的二进制文件即指除[文本文件](https://zh.wikipedia.org/wiki/文本文件)以外的文件。 

**文本文件和二进制文件的区别**：文本文件和二进制文件并无本质的差别，他们的区别在于打开这个文件的程序在对其内容的解释上，我们可以把一个典型的所谓二进制文件（bmp）当作文本文件来打开，是同样可以的，只是得到的内容就是一些乱七八糟的符号了。反过来，也是同样成立。 


## Nodejs File System

```js
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

The callback is passed two arguments `(err, data)`, where `data` is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding:

```js
fs.readFile('/etc/passwd', 'utf8', callback);
```







## 参考链接，值得复习：

1.  https://zh.wikipedia.org/wiki/Base64 
2.  https://zh.wikipedia.org/wiki/UTF-8 
3.  https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText 
4.  https://developer.mozilla.org/en-US/docs/Web/API/Blob 
5.   https://zh.wikipedia.org/wiki/ASCII 

   



