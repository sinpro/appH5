// 宫格
import FMenuGrid from './components/menu/src/FMenuGrid/index.js'

// 图片广告类
import FImageList from './components/image/src/FImageList/index.js'
import FImageCascade from './components/image/src/FImageCascade/index.js'
import FImageFlat from './components/image/src/FImageFlat/index.js'
import FImageCard from './components/image/src/FImageCard/index.js'
import FImageScrollOne from './components/image/src/FImageScrollOne/index.js'
import FImageScrollTwo from './components/image/src/FImageScrollTwo/index.js'

// 魔方
import FMagicCube from './components/magic/src/FMagicCube/index.js'

// 头导航
import FNavigationBar from './components/navigation/src/FNavigationBar/index.js'

// 标题
import FTitleHorizontal from './components/title/src/FTitleHorizontal/index.js'
import FTitleVertical from './components/title/src/FTitleVertical/index.js'

// 辅助线
import FLine from './components/subline/src/FLine/index.js'

// 辅助空白
import FBlank from './components/blank/src/FBlank/index.js'

// 头条
import FNoticeOne from './components/notice/src/FNoticeOne/index.js'
import FNoticeTwo from './components/notice/src/FNoticeTwo/index.js'

// 图文
import FImageTextLeftRight from './components/imagetext/src/FImageTextLeftRight/index.js'
import FImageTextTopBottom from './components/imagetext/src/FImageTextTopBottom/index.js'
import FImageTextTopBottomTwo from './components/imagetext/src/FImageTextTopBottomTwo/index.js'
import FImageTextTopBottomThree from './components/imagetext/src/FImageTextTopBottomThree/index.js'
import FImageTextLeftRightSlideOne from './components/imagetext/src/FImageTextLeftRightSlideOne/index.js'
import FImageTextTopBottomSlideOne from './components/imagetext/src/FImageTextTopBottomSlideOne/index.js'
import FImageTextTopBottomSlideTwo from './components/imagetext/src/FImageTextTopBottomSlideTwo/index.js'
import FImageTextTopBottomSlideThree from './components/imagetext/src/FImageTextTopBottomSlideThree/index.js'

// 产品
import FProductList from './components/product/src/FProductList/index.js'
import FProductOne from './components/product/src/FProductOne/index.js'
import FProductTwo from './components/product/src/FProductTwo/index.js'
import FProductThree from './components/product/src/FProductThree/index.js'
import FProductSlideOne from './components/product/src/FProductSlideOne/index.js'
import FProductSlideTwo from './components/product/src/FProductSlideTwo/index.js'
import FProductRoundSlide from './components/product/src/FProductRoundSlide/index.js'
import FProductRoundSlideBlock from './components/product/src/FProductRoundSlideBlock/index.js'

// 账户
import FAccount from './components/account/src/FAccount/index.js'

// 订单
import FOrder from './components/order/src/FOrder/index.js'

// 二楼
import FSecondFloor from './components/secondfloor/src/FSecondFloor/index.js'

// 双宫格
import FDoubleGrid from './components/doublegrid/src/FDoubleGrid/index.js'

// 轮播+待办事项
import FBannerReminder from './components/bannerreminder/src/FBannerReminder/index.js'

// 轮播+宫格
import FBannerGridTop from './components/bannergrid/src/FBannerGridTop/index.js'
import FBannerGridBottom from './components/bannergrid/src/FBannerGridBottom/index.js'

// 呈现场景组件集
const components = [
    FMenuGrid,
    FImageScrollOne,
    FImageScrollTwo,
    FImageList,
    FImageCascade,
    FImageFlat,
    FImageCard,
    FMagicCube,
    FNavigationBar,
    FTitleHorizontal,
    FTitleVertical,
    FLine,
    FBlank,
    FNoticeOne,
    FNoticeTwo,
    FImageTextLeftRight,
    FImageTextTopBottom,
    FImageTextTopBottomTwo,
    FImageTextTopBottomThree,
    FImageTextLeftRightSlideOne,
    FImageTextTopBottomSlideOne,
    FImageTextTopBottomSlideTwo,
    FImageTextTopBottomSlideThree,
    FProductList,
    FProductOne,
    FProductTwo,
    FProductThree,
    FProductSlideOne,
    FProductSlideTwo,
    FProductRoundSlide,
    FProductRoundSlideBlock,
    FAccount,
    FOrder,
    FSecondFloor,
    FDoubleGrid,
    FBannerReminder,
    FBannerGridTop,
    FBannerGridBottom
]

let templates = {}

// 注入组件
components.forEach(component => {
    templates[component.name] = component;
});

export default templates;