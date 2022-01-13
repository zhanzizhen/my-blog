## Object.keys
```go
package main

import (
	"fmt"
	"reflect"
)

// js Object.keys(obj)

func ObjectKeys(obj interface{}) []string {
	t := reflect.ValueOf(obj)
	if t.Kind() != reflect.Map {
		return nil
	}

	keys := make([]string, t.Len())
	for i, key := range t.MapKeys() {
		keys[i] = key.String()
	}

	return keys
}

func main() {
	test := map[string]string{
		"a": "1",
		"b": "2",
	}
	fmt.Print(ObjectKeys(test))
}

```

## Object.values
```go
package main

import (
	"fmt"
	"reflect"
)

func ObjectValues(obj interface{}) []interface{} {
	v := reflect.ValueOf(obj)
	t := reflect.TypeOf(obj)
	if t.Kind() != reflect.Map {
		return nil
	}

	values := make([]interface{}, v.Len())
	keys := v.MapKeys()

	for i := 0; i < len(keys); i++ {
		values[i] = v.MapIndex(keys[i])
	}

	return values
}

func main() {
	test := map[string]string{
		"a": "1",
		"b": "2",
	}
	fmt.Print(ObjectValues(test))
}

```
