---
title: ChbInformationCard 信息分区展示卡片组件
preview: 
---

分区展示数据

### 引入

```javascript
import ChbInformationCard from "@/common/components/chb_information_card";

Vue.component(ChbInformationCard.name, ChbInformationCard)
```

### 代码演示
<!-- DEMO -->

### API

#### ChbInformationCard Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|dataform|数据|Array|[]|[{title:'标题',list: [{childTitle:'子标题',childDesc:'子描述信息'}]}]  二级list非必输|
|hasList|是否存在二级list数据|Boolean|true|-|
|compact|是否紧凑型展示|Boolean|false|-|

#### ChbInformationCard Slots

##### otherTitle
额外的标题插槽

##### icon
额外的icon插槽

##### tab
额外的标记插槽

