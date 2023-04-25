
import FMagicCube from './components/magic/src/FMagicCube/meta.js'
import FMenuGrid from './components/menu/src/FMenuGrid/meta.js'
import FImageScrollOne from './components/image/src/FImageScrollOne/meta.js'
import FImageScrollTwo from './components/image/src/FImageScrollTwo/meta.js'
import FImageList from './components/image/src/FImageList/meta.js'
import FImageCascade from './components/image/src/FImageCascade/meta.js'
import FImageFlat from './components/image/src/FImageFlat/meta.js'
import FImageCard from './components/image/src/FImageCard/meta.js'

import FNavigationBar from './components/navigation/mock/FNavigationBar/meta.js'

import FTitleHorizontal from './components/title/src/FTitleHorizontal/meta.js'
import FTitleVertical from './components/title/src/FTitleVertical/meta.js'
import FLine from './components/subline/src/FLine/meta.js'
import FBlank from './components/blank/src/FBlank/meta.js'
import FNoticeOne from './components/notice/src/FNoticeOne/meta.js'
import FNoticeTwo from './components/notice/src/FNoticeTwo/meta.js'

// 图文
import FImageTextLeftRight from './components/imagetext/src/FImageTextLeftRight/meta.js'
import FImageTextTopBottom from './components/imagetext/src/FImageTextTopBottom/meta.js'
import FImageTextTopBottomTwo from './components/imagetext/src/FImageTextTopBottomTwo/meta.js'
import FImageTextTopBottomThree from './components/imagetext/src/FImageTextTopBottomThree/meta.js'
import FImageTextLeftRightSlideOne from './components/imagetext/src/FImageTextLeftRightSlideOne/meta.js'
import FImageTextTopBottomSlideOne from './components/imagetext/src/FImageTextTopBottomSlideOne/meta.js'
import FImageTextTopBottomSlideTwo from './components/imagetext/src/FImageTextTopBottomSlideTwo/meta.js'
import FImageTextTopBottomSlideThree from './components/imagetext/src/FImageTextTopBottomSlideThree/meta.js'

// 产品
import FProductList from './components/product/src/FProductList/meta.js'
import FProductOne from './components/product/src/FProductOne/meta.js'
import FProductSlideOne from './components/product/src/FProductSlideOne/meta.js'
import FProductSlideTwo from './components/product/src/FProductSlideTwo/meta.js'
import FProductTwo from './components/product/src/FProductTwo/meta.js'
import FProductThree from './components/product/src/FProductThree/meta.js'
import FProductRoundSlide from './components/product/src/FProductRoundSlide/meta.js'
import FProductRoundSlideBlock from './components/product/src/FProductRoundSlideBlock/meta.js'

// 账户
import FAccount from './components/account/src/FAccount/meta.js'

// 订单
import FOrder from './components/order/src/FOrder/meta.js'

//轮播加宫格
import FBannerGridTop from './components/bannergrid/src/FBannerGridTop/meta.js'
import FBannerGridBottom from './components/bannergrid/src/FBannerGridBottom/meta.js'

// 轮播+待办事项
import FBannerReminder from './components/bannerreminder/src/FBannerReminder/meta.js'

// 双宫格
import FDoubleGrid from './components/doublegrid/src/FDoubleGrid/meta.js'

//二楼
import FSecondFloor from './components/secondfloor/src/FSecondFloor/meta.js'

/**
 * @param {String} groupId 分组ID，保证每个分组唯一，且保证所有仓库分组ID唯一。当前组件库分配的编号区间 1000 - 1999
 * @param {String} groupName        分组名称
 * @param {String} groupIcon        分组图标
 * @param {Array} iComponentList    组件列表
 * @param {Array} iComponentList.className      组件类
 * @param {Array} iComponentList.name           组件名称
 * @param {Array} iComponentList.icon           组件图标
 * @param {Array} iComponentList.properties     属性列表
 * @param {Array} iComponentList.properties.itemId              属性ID
 * @param {Array} iComponentList.properties.itemName            属性名称
 * @param {Array} iComponentList.properties.itemType            属性渲染类型
 * @param {Array} iComponentList.properties.itemKey             属性键
 * @param {Array} iComponentList.properties.itemOption          属性选项
 * @param {Array} iComponentList.properties.itemDefaultValue    属性默认值
 * @param {Array} iComponentList.properties.itemValue           属性值
 * @param {Array} iComponentList.properties.itemDesc            属性描述
 * @param {Array} iComponentList.properties.itemGroup           属性组（用于属性定义的if条件控制）
 *                                                                  如：属性A groupvar  属性B groupvar.1
 *                                                                      当属性A的属性数值为1时 属性B显示，否则属性B不显示
 * @param {Array} iComponentList.properties.itemWatch           属性监听（用于对外属性控制能力）
 * @param {Array} iComponentList.properties.itemShare           属性值是否在分组共享（切换样式时保留数据传递）
 */

export default [
  {
    groupId: '1000',
    groupName: '基础模板',
    children: [
      {
        groupId: '1001',
        groupName: '头导航',
        groupIcon: require('./assets/images/meta/icon_navigation.png'),
        iComponentList: [
          FNavigationBar,
        ]
      },
      {
        groupId: '1002',
        groupName: '魔方',
        groupIcon: require('./assets/images/meta/icon_magic.png'),
        iComponentList: [
          FMagicCube,
        ]
      },
      {
        groupId: '1003',
        groupName: '标题',
        groupIcon: require('./assets/images/meta/icon_title.png'),
        iComponentList: [
          FTitleHorizontal,
          FTitleVertical
        ]
      },
      {
        groupId: '1004',
        groupName: '辅助空白',
        groupIcon: require('./assets/images/meta/icon_blank.png'),
        iComponentList: [
          FBlank
        ]
      },
      {
        groupId: '1005',
        groupName: '辅助线',
        groupIcon: require('./assets/images/meta/icon_subline.png'),
        iComponentList: [
          FLine
        ]
      },
      {
        groupId: '1006',
        groupName: '图文',
        groupIcon: require('./assets/images/meta/icon_imagetext.png'),
        iComponentList: [
          FImageTextLeftRight,
          FImageTextTopBottom,
          FImageTextTopBottomTwo,
          FImageTextTopBottomThree,
          FImageTextLeftRightSlideOne,
          FImageTextTopBottomSlideOne,
          FImageTextTopBottomSlideTwo,
          FImageTextTopBottomSlideThree
        ]
      },
      {
        groupId: '1007',
        groupName: '二楼',
        groupIcon: require('./assets/images/meta/icon_imagetext.png'),
        iComponentList: [
          FSecondFloor
        ]
      },

    ]
  },

  {
    groupId: '2000',
    groupName: '产品模板',
    children: [
      {
        groupId: '2001',
        groupName: '广告',
        groupIcon: require('./assets/images/meta/icon_image.png'),
        iComponentList: [
          FImageCard,
          FImageCascade,
          FImageFlat,
          FImageList,
          FImageScrollOne,
          FImageScrollTwo
        ]
      },
      {
        groupId: '2002',
        groupName: '菜单',
        groupIcon: require('./assets/images/meta/icon_menu.png'),
        iComponentList: [
          FMenuGrid,
        ]
      },
      {
        groupId: '2003',
        groupName: '头条',
        groupIcon: require('./assets/images/meta/icon_notice.png'),
        iComponentList: [
          FNoticeOne,
          FNoticeTwo
        ]
      },
      {
        groupId: '2004',
        groupName: '产品',
        groupIcon: require('./assets/images/meta/icon_product.png'),
        iComponentList: [
          FProductList,
          FProductOne,
          FProductTwo,
          FProductThree,
          FProductSlideOne,
          FProductSlideTwo,
          FProductRoundSlide,
          FProductRoundSlideBlock
        ]
      },
    ]
  },
  {
    groupId: '4000',
    groupName: '复合模板',
    children: [
      {
        groupId: '4001',
        groupName: '宫格+轮播',
        groupIcon: require('./assets/images/meta/icon_ShufflingGongGe.png'),
        iComponentList: [
          FBannerGridTop,
          FBannerGridBottom
        ]
      },
      {
        groupId: '4002',
        groupName: '轮播+提醒',
        groupIcon: require('./assets/images/meta/icon_Byreminding.png'),
        iComponentList: [
          FBannerReminder,
        ]
      },
      {
        groupId: '4003',
        groupName: '双宫格',
        groupIcon: require('./assets/images/meta/icon_DoubleGongGe.png'),
        iComponentList: [
          FDoubleGrid,
        ]
      },
    ]
  },
  {
    groupId: '3000',
    groupName: '用户模板',
    children: [
      {
        groupId: '3001',
        groupName: '账户',
        groupIcon: require('./assets/images/meta/icon_menu.png'),
        iComponentList: [
          FAccount,
        ]
      },
      {
        groupId: '3002',
        groupName: '订单',
        groupIcon: require('./assets/images/meta/icon_menu.png'),
        iComponentList: [
          FOrder,
        ]
      }
    ]
  }
]
