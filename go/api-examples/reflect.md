## Map

1. get Map's type
```go
	t := reflect.TypeOf(obj)
	if t.Kind() != reflect.Map {
		return nil
	}
  
  t.Key().Kind()// key type
  t.Elem().Kind() // value type
  ```
2. get Map's key and value
```go

func main() {
	test := map[string]string{
		"a": "1",
		"b": "2",
	}
	v := reflect.ValueOf(test)

	// get all keys
	keys := v.MapKeys()

	// get test.a
	for _, key := range keys {
		if key.String() == "a" {
			fmt.Print(v.MapIndex(key))
		}
	}
}
```

## Struct

get type and value
```go
package main

import (
	"fmt"
	"reflect"
)

var Print = fmt.Println

func main() {
	type Test struct {
		a string
		b string
	}

	test := Test{
		a: "1",
		b: "1",
	}

	t := reflect.TypeOf(test)
	v := reflect.ValueOf(test)
	for i := 0; i < t.NumField(); i++ {
		field := v.Field(i)
		Print(t.Field(i).Name)
		switch field.Kind() {
		case reflect.Int:
			Print(field.Int())
		case reflect.String:
			Print(field.String())
		}
	}
}

```
