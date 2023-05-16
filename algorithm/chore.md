1. 1 到 100 的和： 1+2+3+...+97+98+99+100 = (100+1)\* 100/2 = 5050
2. 怎么快速选择数组的中位数：使用快排的技巧，每次把数组分成两个区。
   如果左区数量多于右区，则中位数存在左区。继续对左区进行递归
3. 求一个整数各个位相加的和：

```js
let total = 0;
while (n > 0) {
  const single = n % 10;
  n = (n / 10) >> 0;
  total += single;
}
```

4. 指针搜索的复杂度：同样的算法，把参数根作用域和放入函数的作用域，差别挺大，前者搜索指针的时间复杂度是 O(n)，n 是递归的深度，后者是 O(1)
   这其实就是空间换时间

5. 索引从 0 开始的一些弊端：不能直接用加法，比如 index0+index0 = 0，但应该是 1 才对。
   解决方案： index0+index0 转换成数量： 1+1 = 2，再转换成 index: 2-1 = index1。 所以 index0+index0=index1