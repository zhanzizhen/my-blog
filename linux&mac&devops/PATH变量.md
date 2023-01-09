PATH的格式是：
`绝对路径目录1:绝对路径目录2:绝对路径目录3...`

PATH是用来给shell消费的，path会告诉shell去哪找可执行文件。

如何给PATH新增文件夹？很容易：

PATH = `newDirectory:$PATH`
