node.contains, 一个很有用的 dom 方法，node.contains 可以判断一个 dom 是否在另一个 dom 内部。同时，node.contains 的兼容性也很好。node.contains 配合事件委托，是一个很好用的内存节省方案。

---

Element.getClientRects()：The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

Element.getClientRects().bottom 返回元素距离 viewport 左上角的距离，但 bottom<0 时说明不在视窗内。

---

Element.clientHeight //返回元素节点可见部分的高度

Element.clientWidth //返回元素节点可见部分的宽度

Element.clientLeft //返回元素节点左边框的宽度

Element.clientTop //返回元素节点顶部边框的宽度

Element.scrollHeight //返回元素节点的总高度

Element.scrollWidth //返回元素节点的总宽度

Element.scrollLeft //返回元素节点的水平滚动条向右滚动的像素数值,通过设置这个属性可以改变元素的滚动位置

Element.scrollTop //返回元素节点的垂直滚动向下滚动的像素数值

Element.offsetHeight //返回元素的垂直高度(包含 border,padding)

Element.offsetWidth //返回元素的水平宽度(包含 border,padding)

Element.style //返回元素节点的行内样式

HTMLElement.offsetTop：The HTMLElement.offsetTop read-only property returns the distance of the current element relative to the top of the offsetParent node.

Element.offsetWidth 包括 content，padding，border

Element.clientWidth 包括 content，padding（没有 border）。

很多情况下，我们其实更多的会用 offsetWidth（offsetHeight 同理） 。

---

element.insertAdjacentHTML(position, text);

* 'beforebegin': Before the element itself.
* 'afterbegin': Just inside the element, before its first child.
* 'beforeend': Just inside the element, after its last child.
* 'afterend': After the element itself.

```html
<!-- beforebegin -->
<p>   <!-- begin -->
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>  <!-- end -->
<!-- afterend -->
```

Element.insertAdjacentHTML('beforeBegin', htmlString); // 在该元素前插入

Element.insertAdjacentHTML('afterBegin', htmlString); // 在该元素第一个子元素前插入

Element.insertAdjacentHTML('beforeEnd', htmlString); // 在该元素最后一个子元素后面插入

Element.insertAdjacentHTML('afterEnd', htmlString); // 在该元素后插入

---

[可视化地展示dom事件系统](https://domevents.dev/?state=N4IgNglgzgLgpgOzgJyiAXAbQLoBoRwBuiMGoRJAKgIbIDmcMAkgCYYhRwDGA9giwAI6yavy4ALCGDb4uornDDUARmDgYYyAK5x8yrctVw06TToC++Yqgh92ARhDmgA)