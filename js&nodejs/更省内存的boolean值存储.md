
## 普通数组来存储
```js
const bitArray = [];

for (let i = 1; i < 4000; i += 5) {
  bitArray[i] = true
}

window.bitArray = bitArray;
```
内存占用是20288 byte

## 用bit来存储

```js
class BitArray {
  constructor() {
    this.valueObj = {};
  }

  set(key, bool) {
    const _v = 2 ** ((key % 32) - 1);
    const value = this.getValue(key);
    const currentBool = this.get(key);
    if (!bool) {
      if (currentBool) {
        this.setValue(key, value - _v);
      }
    } else if (bool) {
      if (!currentBool) {
        this.setValue(key, value + _v);
      }
    }
  }

  getValue(key) {
    return this.valueObj[this.getShortKey(key)] || 0;
  }

  setValue(key, value) {
    this.valueObj[this.getShortKey(key)] = value;
  }

  getShortKey(key) {
    return (key / 32) >>> 0;
  }

  get(key) {
    const value = this.getValue(key);
    const _v = value >>> (key - 1);
    return (_v ^ (_v - 1)) === 1;
  }
}

const bitArray = new BitArray();

for (let i = 1; i < 4000; i += 5) {
  bitArray.set(i, true);
}
```
      
内存占用是2212 byte，内存节省接近10倍
