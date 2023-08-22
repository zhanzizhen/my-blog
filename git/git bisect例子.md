举个例子：
```bash
git bisect start head bf3064440036 # 告诉git开始bisect，head是存在问题的commit，bf3064440036是不存在问题的commit

➜ test (feature/test) ✗ git bisect start head 60cc282847dfcb6e9xxxxxxx
Bisecting: 39 revisions left to test after this (roughly 5 steps)
[df56460c23fcf9d857010ecf5a7a7a4280c30141] [git commit meesage xxxxxx]

## 验证下当前问题是否还在，在的话git bisect bad，否则git bisect good
➜ test (f9bc90d9b) ✗ git bisect good
Bisecting: 321 revisions left to test after this (roughly 8 steps)
[a9ad4ebc773axxxx4a83e3e639] [git commit meesage xxxxxx]
➜ test (a9ad4ebc7) ✔ git bisect good
Bisecting: 159 revisions left to test after this (roughly 7 steps)
[3c36c9f5bd1df2fxxxxxxf5f898e818e] [git commit meesage xxxxxx]
➜ test (3c36c9f5b) ✗ git bisect good
Bisecting: 79 revisions left to test after this (roughly 6 steps)
[eb2a6535e392ede46b41xxxxxx70b4da8] [git commit meesage xxxxxx]
➜ test (eb2a6535e) ✗ git bisect good
Bisecting: 40 revisions left to test after this (roughly 5 steps)
[df56460c23fcf9d857010ecf5a7a7a4280c30141] [git commit meesage xxxxxx]
➜ test (df56460c2) ✔ git bisect good
Bisecting: 22 revisions left to test after this (roughly 4 steps)
[a524e33702dfccf0db171ba35f852a172f204f51] [git commit meesage xxxxxx]
➜ test (a524e3370) ✗ git bisect good
Bisecting: 8 revisions left to test after this (roughly 4 steps)
[365079da04a393dc25cd6ccf79312eb9a1fb48da] [git commit meesage xxxxxx]
➜ test (365079da0) ✗ git bisect good
Bisecting: 4 revisions left to test after this (roughly 2 steps)
[3b5e97c22892d26cd6e108f1126f4b2fc0a17b2c] [git commit meesage xxxxxx]
➜ test (3b5e97c22) ✗ git bisect bad 
Bisecting: 1 revision left to test after this (roughly 1 step)
[06ffc9cbbb1ff5580f41f33857493d3c893d1770] [git commit meesage xxxxxx]
➜ test (06ffc9cbb) ✗ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[60cc282847dfcb6e96a9b6a396b47fc87031b39e] [git commit meesage xxxxxx]
➜ test (60cc28284) ✗ git bisect bad
60cc282847dfcb6e96xxxxxxxxxxx is the first bad commit
commit 60cc282847xxxxxxxxxfc87031b39e
Author: xxxxxxx
Date:   Wed Aug 9 14:37:36 2023 +0800

    [git commit meesage xxxxxx]

```
