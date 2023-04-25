import templates from './index.js'

// 头导航
import FNavigationBar from './components/navigation/mock/FNavigationBar/index.js'
import FSecondFloor from './components/secondfloor/mock/FSecondFloor/index.js'

// 编辑场景mock组件集
const mockcomponents = [
    FNavigationBar,
    FSecondFloor
];

// 注入组件
mockcomponents.forEach(component => {
    templates[component.name] = component;
});

export default templates