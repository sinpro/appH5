---
title: ChbConfirmCard 确认信息展示卡片组件
preview:
---

确认信息展示组件，分区展示数据

### 引入

```javascript
import ChbConfirmCard from "@/common/components/chb_confirm_card";

Vue.component(ChbConfirmCard.name, ChbConfirmCard)
```

### 代码演示
<!-- DEMO -->

### API

#### ChbConfirm Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|title|标题|String|''|-|
|desc|描述|String|''|-|
|btnName|按钮名称|String|''|-|

#### ChbConfirm Events

##### @btnClick(event)
按钮点击事件

#### ChbConfirm Slots

##### children
额外内容插槽