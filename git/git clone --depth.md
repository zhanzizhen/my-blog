## depth的作用
> --depth <depth>
           Create a shallow clone with a history truncated to the specified number of commits. Implies --single-branch unless --no-single-branch is given to fetch the histories near the tips of all
           branches. If you want to clone submodules shallowly, also pass --shallow-submodules.
  

每一个commit都是一个版本快照，都占据存储空间。

git clone --depth=1或者git pull --depth=1只会拉取最近的一个commit，当depth=3时，则拉取最近的3个commit。
这样在ci或者自动化环节特别有用，能减少拉取的时间和git占据的储存空间。
  
不指定depth的话，默认是拉取所有commit
