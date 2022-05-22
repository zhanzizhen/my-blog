用 filter 去掉 false 项：

```js
// before:
isEdit?['a', 'b;, 'c']:['a','c']

// simplify:
['a', isEdit&&'b;, 'c'].filter(Boolean)
```

---

让 useEffect 只运行一次并且没有 eslint warn

```js
  const loadData = useCallback(() => {
    getIndexCategoryList().then(res => {
      setDataSource(res);
    });
  }, []);
  useEffect(loadData, []);
};
```

---

```js
// before:
isDelete === 0
  ? 1
  : (isDelete === 1 ? 0 : undefined)[
      // simplify:
      (1, 0)
    ][isDelete];
```

---

```js
if (typeof values.vip === "number") {
  result.vip = values.vip === 1;
}
if (typeof values.containsGameTopic === "number") {
  result.containsGameTopic = values.containsGameTopic === 1;
}
```

转成下面的：

```js
 ["vip", "containsGameTopic"].forEach(key => {
      type tmp = "vip" | "containsGameTopic";
      result[key as tmp] = values[key as tmp] === 1;
    });
```

---

如果你的结构本来就是一行内放入多个元素，优先考虑把这些元素写成 span。而不是写成 div 然后在父元素用 display: flex

---

## 中后台开始时间和结束时间的验证和提示技巧

我们的规则是确保开始时间小于结束时间，那么我们可以把所有的错误提示都交给开始时间的组件,
意思就是，当用户选择了个比“开始时间”小的“结束时间”，我们不这样提示“结束时间不能早于开始时间”，
而是说：“开始时间不能早于结束时间”

---

## 页面 hasLoadData 可以降低复杂度

MVVM 页面的数据加载，通常是发生在客户端的(CSR)。有个技巧值得注意下，如果你定义个 dataloaded 的状态来表示数据是否加载完成，便可以省去很多麻烦事。它的作用如下：

减少数据的防御情况。当数据还没到的时候，你在渲染的时候不得不多考虑一种情况，就是 fetch 数据前的数据结构是怎样的，渲染的时候要做很多 maybe。
不要让页面做无用的初始渲染，减少客服端压力。
可以顺便做 loading 图标，或者放骨架图。
