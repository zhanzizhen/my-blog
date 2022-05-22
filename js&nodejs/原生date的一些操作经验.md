js 的 date 操作经常需要用到。moment.js 有时又太大。所以记录下原生 date 的一些操作经验

原生 js 取前两天的 0 点：

```js
let start = new Date();
// 不用担心1号/2号这种边缘情况，因为setMonth(0)和setMonth(-1)都会被正确处理
start.setMonth(start.getMonth() - 2);
start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0);
```

---

```js
interface DateConstructor {
    new(): Date;
    new(value: number | string): Date;
    new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
    (): string;
    readonly prototype: Date;
    /**
     * Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.
     * @param s A date string
     */
    parse(s: string): number;
    /**
     * Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.
     * @param year The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
     * @param month The month as a number between 0 and 11 (January to December).
     * @param date The date as a number between 1 and 31.
     * @param hours Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour.
     * @param minutes Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes.
     * @param seconds Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds.
     * @param ms A number from 0 to 999 that specifies the milliseconds.
     */
    UTC(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
    now(): number;
}
```

---

取前两个月的 1 号零点：

```js
start.setMonth(start.getMonth() - 2);
start = new Date(start.getFullYear(), start.getMonth(), 1, 0, 0);
```
