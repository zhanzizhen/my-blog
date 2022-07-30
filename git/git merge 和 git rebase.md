### git merge

每次 merge 都会产生一个 merge commit，它是没有内容，只是描述在哪个时候合并了哪个分支。比如：

```cmd
commit 601f192d25a1b69ea737d65246f605bdeaa28361
Merge: e7fd7e3a1 940803e42
Author: laoxuanshi <xuanshilao@163.com>
Date:   Wed Jul 22 10:21:35 2020 +0800

    Merge branch 'master' of ssh://gitlab.nie.netease.com:32200/a13/avg-official-web into release
```

当在 gitlab 上提交 merge request 的时候，这次 merge commit 还会包含一些额外的信息，比如：

```cmd
commit 314b76b68baad24365e44897bc76581aa1418f7f
Merge: 19abed1a2 4d5195340
Author: 劳炫施 <laoxuanshi@corp.netease.com>
Date:   Fri Jul 24 17:09:21 2020 +0800

    Merge branch 'bugfix-0724-ranktype' into 'master'

    fix: 合集榜type值传错

    See merge request a13/avg-official-web!4089
```

git 不能 revert 一个 merge commit，但智能的 gitlab 可以。在 gitlab 上找到 merge request 的界面，点击界面上的"Revert"按钮，便可以进行 revert merge commit 的操作。

### git rebase

![image](https://user-images.githubusercontent.com/22932241/90610716-6a701e00-e238-11ea-9b2f-6c2232e3a4af.png)

rebase 将所有 master 的 commit 移动到你的 feature 的顶端，并且不会产生 git merge commit。
优点：提交记录比较整洁
缺点：修改了提交记录，并且缺少合并这个动作的痕迹。

关于 git pull --rebase https://www.cnblogs.com/kevingrace/p/5896706.html
