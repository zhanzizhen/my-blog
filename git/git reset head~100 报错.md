➜ itam-mono (refactor/permission) ✗ git reset --hard HEAD~100
fatal: ambiguous argument 'HEAD~10': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
  
 原因是HEAD~100的commit不在当前分支。
