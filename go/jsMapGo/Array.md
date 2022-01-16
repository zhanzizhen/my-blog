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

2. Array.prototype.filter
```go
package main

import (
	"fmt"
	"reflect"
)

var Print = fmt.Println

func ArrFilter(arr []interface{}, fn interface{}) []interface{} {
	var result = make([]interface{}, 0)

	rv := reflect.ValueOf(fn)
	rt := reflect.TypeOf(fn)

	numIn := rt.NumIn()

	if numIn > 2 {
		panic("parameters should not more than 2")
	}

	if rt.NumOut() != 1 {
		panic("should have one return")
	}

	if rt.Out(0).Kind() != reflect.Bool {
		panic("should return bool type")
	}

	params := make([]reflect.Value, numIn)

	for i := 0; i < len(arr); i++ {
		if numIn > 0 {
			params[0] = reflect.ValueOf(arr[i])
		}
		if numIn > 1 {
			params[1] = reflect.ValueOf(i)
		}

		if rv.Call(params)[0].Interface().(bool) {
			result = append(result, arr[i])
		}
	}

	return result
}

func main() {
	arr := []interface{}{1, 2, 3}

	arr2 := ArrFilter(arr, func(item int) bool {
		return item > 1
	})

	Print(arr2)
}
```
