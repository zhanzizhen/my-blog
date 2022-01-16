1. Array.prototype.map
```go
package main

import (
	"fmt"
	"reflect"
)

var Print = fmt.Println

func ArrMap(arr []interface{}, fn interface{}) []interface{} {
	var result = make([]interface{}, len(arr))

	rv := reflect.ValueOf(fn)
	rt := reflect.TypeOf(fn)

	numIn := rt.NumIn()

	if numIn > 2 {
		panic("parameters should not more than 2")
	}

	for i := 0; i < len(arr); i++ {
		var params []reflect.Value
		if numIn > 0 {
			params = append(params, reflect.ValueOf(arr[i]))
		}
		if numIn > 1 {
			params = append(params, reflect.ValueOf(i))
		}

		result[i] = rv.Call(params)[0].Interface()
	}

	return result
}

func main() {
	arr := []interface{}{1, 2, 3}

	arr2 := ArrMap(arr, func(item int, index int) int {
		return item * 2
	})

	Print(arr2)
}
```
