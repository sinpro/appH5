---
title: ChbButton 按钮
preview:
---

按钮组件

### 引入

```javascript
import ChbButton from "@/common/components/chb_button";

Vue.component(ChbButton.name, ChbButton)
```

### 代码演示
<!-- DEMO -->

### API

#### ChbButton Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
| type | 是否勾选 | String | primary | default, primary, warning, disabled, link |
| dashed | 是否使用虚线的边框 | Boolean | false | -|
其他参数请参考 mand-mobile;

#### ChbButton Events

##### @click(event)
按钮点击事件