remote有个develop的tag，导致本地运行：
git pull origin develop的时候，一直pull的是tag指向的commit：

![image](https://user-images.githubusercontent.com/22932241/185047277-97b8c973-49f4-439a-8cf1-7b5bed6d1bae.png)


刚开始尝试这样解决：
![image](https://user-images.githubusercontent.com/22932241/185047449-87bf8c59-6070-4741-9546-dbacf7939ee2.png)
这个方案不行，因为远程的develop有两个

又尝试了：
```bash
git tag -d devleop # 删掉本地的tag
git push --tag
```
也是不行，git push --tag不会将本地的删除操作推送到远程。

换一个解决方法：
git push origin :refs/tags/develop
成功解决，依据的语法是git push remote-repo source-ref:destination-ref，而:ref表示删除操作。

related: https://stackoverflow.com/questions/5480258/how-do-i-delete-a-remote-tag/5480292#5480292
