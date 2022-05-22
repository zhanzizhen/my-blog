思路是这样的。
首先在内部保存一个状态：

```js
this.state = {
  value: xxx,
};
```

然后这样渲染 input：

```jsx
<input value={this.state.value} onChange={this.onChange} />
```

还需要响应 props.value 的变化：

```js
  static getDerivedStateFromProps(nextProps: InputProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }
```

在 onChange 函数触发的时候，取判断 value in props 是否是 true，true 的话不去调用 setState，否则调用它：

```js
this.setState{value:e.target.value}
```

其次，this.onChange 始终需要判断 this.props.onChange 是否存在，存在则调用。
