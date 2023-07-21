# git object
git的信息系统是个key-value的库。key是hash，value是git object。这些信息存储在.git/objects文件夹下面
![image](https://github.com/zhanzizhen/my-blog/assets/22932241/775fe8a3-4b09-45ec-93f2-848a462f1d31)


而git object有四种类型

### commit object

```bash
$ git cat-file -t head #查看当前head指向的object类型
commit

$ git cat-file -p head #查看当前head指向的object内容
tree a9c75b1acba3da109d864fc7490f1946fe1a0a22
parent 073e0e6a1f0812f5ce7096a5307053d778889dfb
author zhanzizhen <zhanzizhen@corp.netease.com> 1621499404 +0800
committer zhanzizhen <zhanzizhen@corp.netease.com> 1621499404 +0800

style: 优化history-handler current的写法、dev报错问题
```

可见，commit object存储的内容是：
1. tree: 这里存储了整个工程的一个快照
2. [parent commit hash](https://stackoverflow.com/a/38239664/12403890): 一般来说是前一个commit。git merge比较特别，它产生的new commit的parent是本次合并的两个commit。
3.  author
4.  committer
5.  commit message

这些内容也是[sha1算法](https://gist.github.com/masak/2415865)的运算内容。所以平时使用cherry-pick某个commit，由于它的parent commit发生了变化，所以它的commit hash也会变。


### tree object
文件系统有文件和文件夹。负责文件快照的是blob object，而负责文件夹快照的是tree object。
把上面的commit object的tree打印下，内容如下:

 ```cmd
$ git cat-file -t a9c75b1
tree

$git cat-file -p a9c75b1
100644 blob dbe721b878f3573c07d9b93655f82f282aceec29    README.md
100644 blob eb3df6fadc5a642345bb0f0ab8fb579b5f9648e1    package-lock.json
100644 blob b8e57aff771fead56b7ea7742bb19981d448d4fd    package.json
040000 tree 74d68c9a9047b8edb82464778faeb403c8c049c9    public
040000 tree 560be3f9f41cc53c59c98ee855a81c262dc098ac    src
100644 blob a8a49b18170dfc947c789c72e28e17c66e65e794    tsconfig.json
```

tree object包含了两个内容：
1. 子文件（夹）名
2. 子文件（夹）hash

可以发现：
tree object其实只是记录第一层子文件的object hash，并没有递归地去记录子文件夹下面的object，这个设计是git高效的原因之一。
假如我们修改了src下面的某个文件然后commit到git仓库，通过git cat-file -p对比最近两个commit的tree object属性可以发现，只有src的hash发生了变化。

### blob object
blob object用于存储二进制文件快照。打印下上面的tsconfig.json对应的blob，如下
```cmd
$ git cat-file -t a8a49b18170dfc947c789c72e28e17c66e65e794
blob

$ git cat-file -p a8a49b1
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
}
```

可以发现，blob object的内容就是文件的副本。

### tag object
```cmd
$ git tag --list
0.0.1
first-commit

$ git cat-file -t first-commit
tag

$ git cat-file -p first-commit
object 637e49dac0a1693d7b8266545caeb05a69d3840f
type commit
tag first-commit
tagger zhanzizhen <zhanzizhen@corp.netease.com> 1623052304 +0800

Tag pointing to first commit
```

tag object包含的内容：
1. 对应的object
2. 对应的object的类型
3. message
4. 打标签的人
