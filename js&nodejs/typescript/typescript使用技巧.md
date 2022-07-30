ts怎么把类型安全转成运行时的安全？

```ts
type TimeOption = "--yesterday" | "--today";
let time: string = 'xxx';

//需求是判断time是否是TimeOption的一员


//通常我们会这样写：
if(time==="--yesterday"||time==="--today"){
  executeGenerateCommand(time);
}
/**
*但这样有个问题是我们如果给TimeOption增加一个项，if(time==="--yesterday"||time==="--today")条件不改变，编译也会通过。
*/

# 有个做法可以改变这点，就是声明一个Map拥有这个联合类型的全部属性。然后在运行时去检查time是否存在于这个Map。
  const TimeOptionMapExceptNumber: {
    [key in TimeOption]: 1;
  } = {
    "--yesterday": 1,
    "--week": 1,
  };
if (time in TimeOptionMapExceptNumber) {
  executeGenerateCommand(time as TimeOption);
} 
```

---

下面这段ts的类型检查是不是不智能：
```js
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
interface OriginNode {
  val: any;
  next: OriginNode | null;
  random: OriginNode | null;
}
var copyRandomList = function(head: OriginNode | null): OriginNode | null {
  if (head === null) {
    return null;
  }
  const visistedMap = new Map<OriginNode, OriginNode>();
  function dfs<T extends OriginNode | null>(node: T) {
    if (node === null) {
      return null;
    }
    if (visistedMap.has(node as OriginNode)) {
      return visistedMap.get(node as OriginNode) as OriginNode;
    }

    const copyNode: OriginNode = {
      val: node.val,
      next: null,
      random: null
    };
    visistedMap.set(node as OriginNode, copyNode);
    copyNode.next = dfs(node.next);
    copyNode.random = dfs(node.random);
    return copyNode;
  }

  const cHead: OriginNode = dfs(head) as OriginNode;

  return cHead;
};
```

---

如果我想禁用掉某个package（例如foo）自带的 index.d.ts，我可以在tsconfig.json手动指定foo的类型路径：

```json
  "compilerOptions": {
      "foo": ["src/typings/foo.d.ts"]
    }
  },
```

https://github.com/microsoft/TypeScript/issues/17042

---

never是ts的一个bottom type。never表示一个空集
type T = never | string // string
ts的top type有any, unknown
bottom type有never。top type可以赋予任何类型的值：
```js
let n: unknown = 5;
let x: any = { foo: 'bar' };
let s: unknown = "foobar";
```

---

unknown是种top type，表示未知的类型，它为了替代某些场景的any。有时我们不知道某个数据的类型，但又不想放弃ts对它的检查，就可以用unknown。如果用any，ts会完全放弃类型检查。

```js
let a:any = undefined;
let bool = a==='1'; // ok
a.toString(); // ok

let b:unknown = undefined;
let bool2 = b==='1'; // ok
b.toString();// error, Object is of type 'unknown'

```

---

[理解typescript的module和script](https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript)

---

### lodash.pick的类型实现
```ts
function pick<T extends object, U extends keyof T>(
  record: T,
  keys: U[]
): Pick<T, U> {
  const app: Pick<T, U> = {} as Pick<T, U>;
  for (let i = 0; i < keys.length; i++) {
    app[keys[i]] = record[keys[i]];
  }
  return app;
}
pick({ a: 1, b: 2, c: 3 }, ["a", "b"]);
```

typescript的map类型，如何同时包含联合属性和实例属性：

```ts
type FilterData = {
  [key in SearchScope]: string;
} & {
  status?: string;
  type?: string;
  searchScope?: Pick<FilterData, "ID" | "USERID" | "CHANNEL_ORDER_ID">;
  keyword?: string;
};
```

---
## 使用type narrow来替代类型断言(as)

有时我们知道一些值的具体类型，比如具体到1|2，但ts只知道类型是number。此时我们用 as可以告诉ts:
```ts
function one( v: 1 | 2)

// some code...
one(a as 1|2);
```
但如果后面代码发生了改动，其实该值的具体类型不一定是1|2，那时我们就会错误地告诉ts它的类型。
用type narrow可以在编译时让类型缩窄为1|2，且在运行时具备检查的能力:
```ts
function one( v: 1 | 2)

// some code...
if (a !== 1 && a !== 2) {
  throw Error();
}
one(a);// a is infer to be 1|2
```

---

## enum到底是什么的语法糖

```ts
export type AwardType = 1 | 2 ;
export interface AwardConfig {
  type?: AwardType;
}
```



```ts
export enum AwardType {
  FOO = 1,
  BAR,
}

export interface AwardConfig {
  type?: AwardType;
}
```

上面两者功能都是一致的。但enum除了类型上的表示以外，还提供了在js运行时方面的能力，比如对个别。比如 

```js
if( var1 === AwardType.FOO){   // do something }
```

如果用第一种方式来写的话，需要改成这样：

```ts
export type AwardType = 1 | 2;
export interface AwardConfig {
  type?: AwardType;
}
export const jsEnum:{ [key in  'FOO'|'BAR']: AwardType} = {
  FOO : 1,
  BAR : 2,
}
```

---

ts检查一个属性是否在对象上，需要用到in操作符

```ts
type DataItem =
  | {
      itemName: string;
      dataIndex: string;
    }
  | {
      itemName: string;
      dataIndex2: string;
    };


 function hello(a:DataItem){
// 这里不能a.dataIndex，用in吧
   if('dataIndex' in a){
     a.dataIndex = '234';
   }
 }
```

---

```ts
type C = A&B;   C即是A，同时也是B

type C = A|B; C要么是A, 要么是B
```

---

ts只能在一开始声明的时候就确定类型。
无法在声明后用表达式去修改这个值

如果要取一个enum的key的union，可以这样：keyof typeof MyEnum
如果这样用： keyof MyEnum，会把Object的prototype也取出来

---

## declare 到底有啥用

行为：对已有的js变量进行类型声明，同时在编译过程不产生任何东西。
设计目的：对js进行兼容

1. 当我们想定义一个module时，可以用declare module 'xxxx'
2. 因为不会被编译，所以包含有js的declare会报错：
  ```js
     declare var foo: string // right
     delcare var foo: string = 'hello' // error
  ```

关联： https://stackoverflow.com/questions/43335962/purpose-of-declare-keyword-in-typescript


