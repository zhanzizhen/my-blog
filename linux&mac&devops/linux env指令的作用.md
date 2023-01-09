man env的结果：
env – set environment and execute command, or print environment

经常能在一些可执行文件看到这样：

```sh
#!/usr/bin/env node
```

它相对比 #!/usr/bin/node的好处是兼容性更好，后者要求/usr/bin文件夹下面一定要有node可执行文件，
而env会去通过$PATH变量的值去寻找node程序的位置并执行它，相比而言，它的portability要高很多
