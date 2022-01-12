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
