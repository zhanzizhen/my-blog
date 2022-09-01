```go
type ListNode struct{
  val int;
  next ListNode
}
```

会报错：illegal cycle in declaration of ListNode

需写成：
```go
type ListNode struct{
  val int;
  next *ListNode
}
```

这样限制是因为go为了在编译时知道ListNode具体占用的内存大小。
