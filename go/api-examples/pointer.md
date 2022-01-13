```go
	return (utils.CsvCreator{
		Headers: &headers,
		Datas:   &datas,
	}).ExportCsv(c, name)
// cannot call pointer method ExportCsv on "bytedance.com/knight/utils".CsvCreatorcompilerInvalidMethodExpr
```
```go
// ok
	return (&utils.CsvCreator{
		Headers: &headers,
		Datas:   &datas,
	}).ExportCsv(c, name)
```

because:
```go
// 导出excel
func (e *CsvCreator) ExportCsv(c echo.Context, name string) error {
	...
}
```

## unsafe.pointer
1. 
```go
	a := 234
	b := unsafe.Pointer(&a)
	fmt.Println("b:", b, &a)
	fmt.Println(uintptr(unsafe.Pointer(&author)), unsafe.Pointer(&author))
```

```go
// b: 0xc0000ba020 0xc0000ba020
// 824634335760 0xc000096210
```

2. 
```go
	flnum := (*string)(unsafe.Pointer(numPointer))
	fmt.Println(flnum)
	*flnum = "hello"
	fmt.Println("num:", num)
```
```go
0xc0000ba030
num: 17581193
```


3. 我们一般使用\*T作为一个指针类型，表示一个指向类型T变量的指针。为了安全的考虑，两个不同的指针类型不能相互转换，比如\*int不能转为\*float64。

可以看到unsafe.Pointer其实就是一个*int,一个通用型的指针。

我们看下关于unsafe.Pointer的4个规则。

任何指针都可以转换为unsafe.Pointer
unsafe.Pointer可以转换为任何指针
uintptr可以转换为unsafe.Pointer
unsafe.Pointer可以转换为uintptr
