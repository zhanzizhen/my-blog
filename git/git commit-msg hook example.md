```zsh
#!/bin/sh

# 忽略merge request
IS_MERGE=$(cat $1 | egrep '^Merge branch*')

if [ "$IS_MERGE" != "" ]; then
	exit 0
fi

ACTION="feat|fix|docs|chore|perf|test|build|ci|revert"
COMMIT_MSG=$(cat $1 | egrep "^(${ACTION})")
if [ "$COMMIT_MSG" = "" ]; then
	echo "Commit Message should start with ${ACTION}"
	exit 1
fi

COMMIT_MSG=$(cat $1 | egrep "^(${ACTION})\(\w+\)")

if [ "$COMMIT_MSG" = "" ]; then
	echo "Commit Message should hava scope, example: feat(scope):xxxx"
	exit 1
fi

if [ ${#COMMIT_MSG} -lt 18 ]; then
	echo "Commit Message Too Short，Please show me more detail!\n"
	exit 1
fi

```
