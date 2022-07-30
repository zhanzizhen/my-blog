## git cherry-pick
git cherry-pick使用过程中如果有conflicts，则需要手动fix conflicts，然后使用 git cherry-pick --continue来提交，或者直接使用git commit命令

---

慎用reset，虽然reset能带来更简洁的git log，但那点简洁并不重要。相对的，revert是安全的，并且可以体现出轨迹

---

1. `git commit --amend`

   我提交了一个commit，但是发现代码有段调试代码`console.log`。我可以删掉它，并且希望这次修改可以并入刚才提交的commit，我可以这样：

   ```cmd
   > git add .
   > git commit --amend
   ```

2. `git commit -a -m <message>`

   经常我们想提交一个commit，需要：`git add . && git commit -m <message>`

   这里有个快捷的方法，直接`git commit -a -m <message>`

3. git stash

   我们经常会碰到这种情况，工作到一半，突然有个bug需要修改，一般我们会先提交代码然后产生一个commit，比如：

   ```cmd
   >git add .
   >git commit -m 'xxx需求开发中'
   ```

   有个更好的方案，是采用git stash：

   ```cmd
   >git stash save 'xxx需求开发中'
   
   ```

   git会把当前在工作区和暂存区的变动都缓存起来，推入到一个栈。等你修完bug，你再返回这个分支，然后使用`git apply stash@{x}`或者`git stash pop`取出刚才的缓存。

4. git switch -c branchName commitId

后面可以带个commitId哦


---

## fast-forward

当两个分支的commit没有交叉，即B分支是A分支的历史，此时merge的话会默认fast-forward，不会生成一次merge commit。
注意：如果分支b是从分支a上创建的，这时分支a修改了foo.txt文件，分支b修改了bar.txt文件，虽然a和b两个分支没用冲突，但也不符合fast-forward，因为两者的commit不是父和子。
要想禁止fast-forward，可以merge --no-ff。
merge commit是自动生成的，结构大概如下：

```cmd
commit 0438b6a489674a757b90a07c400a46dbf6334baf (HEAD -> feature-0612-boat, origin/feature-0612-boat)
Merge: d7931b0d0 382926e59
Author: zhanzizhen <zhanzizhen@corp.neteaze.com>
Date:   Tue Jun 16 11:38:18 2020 +0800

    Merge branch 'test' of ssh://gitlab.nie.netease.com:32200/a13/avg-official-web into feature-0612-boat
```

---

## HEAD

head有两种状态，一种是正常状态，指向一个分支。
一种是Detach state（游离状态），指向某个commit（或者tag）。
游离状态的存在，是为了让你**更方便的尝试一些不确定的更改**，而不用创建新的分支。毕竟你如果打消了更改的念头，还得去删掉它。

git checkout commitId，可以让head指向这个commitId。你edit=>git add=>git commit后，用git switch -c newBranchName便可将创建一个包含此commitId的分支。


当HEAD处于正常状态时，HEAD\~0 === HEAD，它们都指向分支。
HEAD~1 === HEAD^，它们都指向分支的前一个commit。

---

merge有冲突的话，git merge --continue

---

git log:
1. git log是按时间先后顺序排列的
2. reset 到一个merge commit之前。这个merge commit的相关commit也会被去掉

git pull
git pull=git fetch + git merge
git rebase和git merge是同一个级别的
所以如果要rebase远程的一个分支，可以：
git fetch + git rebase
或者： git pull --rebase

---

