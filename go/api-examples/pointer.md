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
