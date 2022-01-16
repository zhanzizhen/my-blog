1. Array.prototype.map
```go
package main

import (
	"fmt"
	"reflect"
)

var Print = fmt.Println

func ArrFilter(arr []interface{}, fn interface{}) []interface{} {
	var result = make([]interface{}, len(arr))

	rv := reflect.ValueOf(fn)
	rt := reflect.TypeOf(fn)

	numIn := rt.NumIn()

	if numIn > 2 {
		panic("parameters should not more than 2")
	}

	params := make([]reflect.Value, numIn)

	for i := 0; i < len(arr); i++ {
		if numIn > 0 {
			params[0] = reflect.ValueOf(arr[i])
		}
		if numIn > 1 {
			params[1] = reflect.ValueOf(i)
		}

		result[i] = rv.Call(params)[0].Interface()
	}

	return result
}

func main() {
	arr := []interface{}{1, 2, 3}

	arr2 := ArrFilter(arr, func(item int) int {
		return item * 2
	})

	Print(arr2)
}
```
