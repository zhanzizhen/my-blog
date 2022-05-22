## 加法函数

```ts
type Add<T extends number, U extends number> = [
    ...TArray<T, []>,
    ...TArray<U, []>
]["length"];

type TArray<T, K extends unknown[]> = K["length"] extends T
    ? K
    : TArray<T,[T,...K]>;

type a = TArray<4, []>;
type b = Add<4, 5>;
```
