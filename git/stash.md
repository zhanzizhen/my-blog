# git stash

git stash: 会将你的working area和staging area的changes存起来。

若想应用某个stash，可以git stash pop/apply，后者不会弹出stash栈

git stash -m 'xxxx': 附带message


git stash --keep-index ：保留staged(index) 区的changes

---

需要注意的点，git stash默认只会保存git tracked的changes，所以新增文件的改动并不会被保存。
可以git add xxx来让它被git tracked，然后再git stash，也可以直接git stash --include-untracked

