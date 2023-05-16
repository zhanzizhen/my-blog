git reset [<mode>] [<commit>]
           This form resets the current branch head to <commit> and possibly updates the index (resetting it to the tree of <commit>)
           and the working tree depending on <mode>. If <mode> is omitted, defaults to --mixed. The <mode> must be one of the following:

           --soft
               Does not touch the index file or the working tree at all (but resets the head to <commit>, just like all modes do). This
               leaves all your changed files "Changes to be committed", as git status would put it.
               
               意思是index区和working区不会动

           --mixed
               Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports
               what has not been updated. This is the default action.

               If -N is specified, removed paths are marked as intent-to-add (see git-add(1)).
               
               会将index的改动回弹到working区

           --hard
               Resets the index and working tree. Any changes to tracked files in the working tree since <commit> are discarded. Any
               untracked files or directories in the way of writing any tracked files are simply deleted.
               
               将index区和working区的改动都撤销掉
