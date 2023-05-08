---
title: ChbInputCard 信息分区展示卡片组件
preview: 
---

分区展示数据

### 引入

```javascript
import ChbInputCard from "@/common/components/chb_input_card";

Vue.component(ChbInputCard.name, ChbInputCard)
```

### 代码演示
<!-- DEMO -->

### API

#### ChbInputCard Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|bigTitle|一级标题|String|''|-|
|inputList|数据|Array|[]|[{title: "输入框标题",error: "错误信息",customError: false(是否使用自定义错误信息插槽),brief: "输入框的描述信息",customBrief: false(是否使用自定义描述信息插槽),value: "输入的值",readonly: false(是否只读),needIcon: false(是否需要输入框右侧的icon),iconName: "icon的名称",placeholder: ""}]  对象中的字段都是非必输|

#### ChbConfirm Events

##### @inputData(event)
输入框的input事件

##### @onClick(event)
只读输入框的点击事件

#### ChbInputCard Slots

##### title+下标
额外的输入框标题插槽

##### rightMsg+下标
额外的输入框右侧插槽

##### error+下标
额外的错误信息插槽

##### brief+下标
额外的标记插槽

##### bottom
输入框下方的插槽
