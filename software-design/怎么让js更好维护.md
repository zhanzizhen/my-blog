## 抽出 config.js 的好处

1. 分离出易变和不易变的代码。符合开闭原则。

2. 消除重复代码，特别是处理列表数据的时候

3. 测试量降低，代码逻辑部分因为没有修改，所以不需要测试，只需简单测试下配置项的部分即可，这满足了开闭原则。

缺点是会增加开发时间

springboot 的 application.xml, .babelrc, .eslintrc 等等，其实都是这类思想的体现

## 习惯用函数包裹你的功能块

是不是觉得下面的代码有点乱：

```ts
function validateBeginDate(
  rule: any,
  beginDate: Moment,
  callback: any,
  index: number
) {
  /**
     * 批量添加活动期数，可以同时添加多个期数
      运营输入bgtime，系统自动计算20time、endtime
      20time=bgtime-48小时
      endtime=bgtime+72小时
     */
  const top20Date = beginDate
    .clone()
    .subtract(DAYS_AMONG_TOP20_AND_BEGIN, "days");
  const beginTime = beginDate.toDate().getTime();
  if (!top20Date.isAfter(moment())) {
    callback("20强计算时间已过，请重新选择开始时间");
    return;
  }
  //------距离上次不能低于一周
  const lastValueTime: number =
    index === 0 ? lastRecord.endTime : getFieldValue(`${index - 1}.beginTime`);
  if (
    beginTime - lastValueTime <
    7 * ONE_DAY + DAYS_AMONG_BEGIN_AND_END * ONE_DAY
  ) {
    callback("距离上次比赛结束时间，不能少于一周");
    return;
  }
  // -------触发下一个表单的校验
  if (index !== periodCount - 1) {
    validateFields([`${index + 1}.beginTime`], { force: true }, () => {});
  }
  //------开始时间不能早于3号
  if (
    beginTime - beginDate.clone().startOf("month").toDate().getTime() <
    DAYS_AMONG_TOP20_AND_BEGIN * ONE_DAY
  ) {
    callback("开始时间不能早于3号");
    return;
  }
  //------开始时间不能晚于月末三天前
  if (
    beginDate.clone().endOf("month").toDate().getTime() - beginTime <
    (DAYS_AMONG_BEGIN_AND_END - 1) * ONE_DAY
  ) {
    callback("开始时间不能晚于月末三天前");
    return;
  }
  // ----验证通过
  callback();
}
```

用函数隔开会更好。这样做的原理其实是把一个作用域的东西，切割开并用函数作用域包裹成模块。这样便有了模块的概念，可以让视觉上的区分更明显，二是不用担心模块内的东西会被外部影响到。

另外一个好处是，把”声明变量“的代码和”执行逻辑“的代码区分开，使得代码结构更清晰。

```ts
function validateBeginDate(
  rule: any,
  beginDate: Moment,
  callback: any,
  index: number
) {
  /**
     * 批量添加活动期数，可以同时添加多个期数
      运营输入bgtime，系统自动计算20time、endtime
      20time=bgtime-48小时
      endtime=bgtime+72小时
     */
  const top20Date = beginDate
    .clone()
    .subtract(DAYS_AMONG_TOP20_AND_BEGIN, "days");
  const beginTime = beginDate.toDate().getTime();

  function isMoreThanOneWeek() {
    //------距离上次不能低于一周
    const lastValueTime: number =
      index === 0
        ? lastRecord.endTime
        : getFieldValue(`${index - 1}.beginTime`);
    return (
      beginTime - lastValueTime <
      7 * ONE_DAY + DAYS_AMONG_BEGIN_AND_END * ONE_DAY
    );
  }

  function lessThan3() {
    //------开始时间不能早于3号
    return (
      beginTime - beginDate.clone().startOf("month").toDate().getTime() <
      DAYS_AMONG_TOP20_AND_BEGIN * ONE_DAY
    );
  }

  function hasNot3Left() {
    //------开始时间不能晚于月末三天前
    return (
      beginDate.clone().endOf("month").toDate().getTime() - beginTime <
      (DAYS_AMONG_BEGIN_AND_END - 1) * ONE_DAY
    );
  }

  function validateNext() {
    // -------触发下一个表单的校验
    if (index !== periodCount - 1) {
      validateFields([`${index + 1}.beginTime`], { force: true }, () => {});
    }
  }
  if (!top20Date.isAfter(moment())) {
    callback("20强计算时间已过，请重新选择开始时间");
    return;
  }

  if (isMoreThanOneWeek()) {
    callback("距离上次比赛结束时间，不能少于一周");
    return;
  }

  if (lessThan3()) {
    callback("开始时间不能早于3号");
    return;
  }

  if (hasNot3Left()) {
    callback("开始时间不能晚于月末三天前");
    return;
  }

  // ----验证通过
  callback();
  validateNext();
}
```

## 一些具体实践

1. 组件的复用的根本思路是高内聚。设计组件的时候如果遵从这个思路，组件的可复用性将会高很多。

```jsx
import React, { useState } from "react";
import { Modal } from "antd";

function ApiDetailEntryButton() {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <button>open the api detail</button>
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        api detail content
      </Modal>
    </React.Fragment>
  );
}

export default ApiDetailEntryButton;
```

上面这个组件就是高内聚组件的一个例子。为什么要把 modal 和 button 做成一个组件。因为 Modal 只和 button 关联，或者说 Modal 只会被 button 影响，与外界没有联系，这个时候就很适合把他们聚合在一起。

2. 为什么不建议用 ref 来操作子组件。因为这样会破坏子组件的封装性。使得其后续的更改和拓展都变得难了起来。一个模块的细节，对外应该是不可见的。只通过模块暴露的 api 来进行交流
3. 功能的粒度越小，越容易被复用。（单一职责原则）
4. 习惯用函数包裹你的功能块

经常把你在函数内的代码进行划分，按照功能再划分成函数，可以让代码结构更清晰：

```js
const server = useCallback(
  (pagination: PaginationConfig | boolean) => {
    function getDefaultRecommendValue() {
      /**当搜索框没有keyword的时候，只展示有推荐的 */
      const DEFAULT_RECOMMEND_VALUE = "1,-1";
      return filterData.keyword?.inputValue ? "" : DEFAULT_RECOMMEND_VALUE;
    }
    function generateParams() {
      let params: any = {};
      if (typeof pagination !== "boolean") {
        params = {
          offset: pagination.current,
          pageSize: pagination.pageSize,
          recommendReason:
            filterData.recommendReason || getDefaultRecommendValue(),
        };
        if (filterData.keyword) {
          params[filterData.keyword.selectValue] =
            filterData.keyword.inputValue;
        }
      }
    }
    return fetchDynamicList(generateParams());
  },
  [filterData]
);
```

这也是符合开闭原则的，因为代码已经模块化了，修改一个模块，不会影响另一个模块。测试量变少了，系统变稳定了


## 设计模块时，先定义好每个模块的职责范围

模块的职责范围要清晰，负责什么，做什么，有无sideEffect。同时要加代码注释

代码注释的意义：让读者可以把一个复杂的函数看成一个黑盒，无需关心里面的逻辑细节，便可大概知道这个黑盒的作用。

满足以上大概需要注释两个地方：
1. 函数的描述@description（黑盒的背景、介绍）
2. 参数的描述@param（黑盒的入口）
3. 函数的返回值@return（黑盒的出口）