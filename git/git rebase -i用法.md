# git rebase -i的用法

1.git log获取commit信息
2.git rebase -i (commit-id)
commit-id 表示操作范围是从from commit-id的后面一个到head\~0
比如 git rebase -i head\~5，则操作范围是从head\~4到head\~0

3.编辑文件，将要删除的commit之前的单词改为drop
4.(vim模式）输入":w"，回车后保存当前操作。
5.(vim模式）输入":q"，回车后退出vim模式。
6.git log查看