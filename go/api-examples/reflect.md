## get a Map key type and value type
```go
	t := reflect.TypeOf(obj)
	if t.Kind() != reflect.Map {
		return nil
	}
  
  t.Key().Kind()// key type
  t.Elem().Kind() // value type
  ```
