DFS 一般由递归实现
BFS 一般由迭代（遍历）实现
理论上，所有的递归都可以用迭代来代替

---

```js
var isSymmetric = function (root: TreeNode): boolean {
  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (t1 === null && t2 === null) {
      return true;
    }
    if (t1 === null || t2 === null) {
      return false;
    }
    if (t1.val !== t2.val) {
      return false;
    }
    return isMirror(t1.left, t2.right) && isMirror(t2.left, t1.right);
  }

  return isMirror(root, root);
};
```

每一次递归都会进入下一层，当深度搜索二叉树时，递归函数的函数体一定会递归两次。

---

考虑深度遍历和广度的问题。可以基于树的模型去思考，更容易建模和找到规律
