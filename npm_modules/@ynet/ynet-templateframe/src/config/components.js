export const menuTreeInfo = [
        {
            menuType: "MT01",
            icon: "",
            menuName: "基础类",
            menuOnline: "1",
            menuList: [
                {
                    menuType: "00",
                    icon: require('../assets/tImage/secondTemplet.png'),
                    icon_out: require('../assets/tImage/secondTemplet.png'),
                    icon_active: require('../assets/tImage/secondTemplet_h.png'),
                    menuName: "二楼",
                    menuTop: -1,
                    menuOnline: "1",
                    menuList: []
                },
                {
                    menuType: "01",
                    icon: require('../assets/tImage/carousel.png'),
                    icon_out: require('../assets/tImage/carousel.png'),
                    icon_active: require('../assets/tImage/carousel_h.png'),
                    menuName: "轮播",
                    menuDefault: "04",
                    menuOnline: "1",
                    menuList: [
                        // {
                        //     menuType: "01",
                        //     icon: "",
                        //     menuName: "顶部沉浸式",
                        //     menuList: []
                        // },
                        {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_01_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_01_04_blue.png'), 
                            menuName: "通屏式",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_01_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_01_02_blue.png'), 
                            menuName: "堆叠式",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_01_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_01_03_blue.png'), 
                            menuName: "平铺式",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "05",
                            icon: require('../assets/menuList/icon_01_05_gray.png'),
                            activeIcon: require('../assets/menuList/icon_01_05_blue.png'), 
                            menuName: "卡片式",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "02",
                    icon: require('../assets/tImage/palace.png'),
                    icon_out: require('../assets/tImage/palace.png'),
                    icon_active: require('../assets/tImage/palace_h.png'),
                    menuName: "宫格",
                    menuDefault: "10",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "10",
                            icon: require('../assets/menuList/icon_02_10_gray.png'),
                            activeIcon: require('../assets/menuList/icon_02_10_blue.png'), 
                            menuName: "十宫格",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "08",
                            icon: require('../assets/menuList/icon_02_08_gray.png'),
                            activeIcon: require('../assets/menuList/icon_02_08_blue.png'), 
                            menuName: "八宫格",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "05",
                            icon: require('../assets/menuList/icon_02_05_gray.png'),
                            activeIcon: require('../assets/menuList/icon_02_05_blue.png'), 
                            menuName: "五宫格",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_02_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_02_04_blue.png'), 
                            menuName: "四宫格",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_02_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_02_02_blue.png'), 
                            menuName: "二宫格",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "03",
                    icon: require('../assets/tImage/topLine.png'),
                    icon_out: require('../assets/tImage/topLine.png'),
                    icon_active: require('../assets/tImage/topLine_h.png'),
                    menuName: "头条",
                    menuDefault: "02",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_03_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_03_01_blue.png'), 
                            menuName: "单行-小1",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_03_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_03_02_blue.png'), 
                            menuName: "单行-大",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_03_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_03_03_blue.png'), 
                            menuName: "二行",
                            menuOnline: "1",
                            menuList: []
                        }, {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_03_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_03_04_blue.png'), 
                            menuName: "单行-小2",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "04",
                    icon: require('../assets/tImage/headLine.png'),
                    icon_out: require('../assets/tImage/headLine.png'),
                    icon_active: require('../assets/tImage/headLine_h.png'),
                    menuName: "标题",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_04_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_04_01_blue.png'), 
                            menuName: "小标题",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_04_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_04_02_blue.png'), 
                            menuName: "大标题",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_04_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_04_03_blue.png'), 
                            menuName: "图片标题",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "05",
                    icon: require('../assets/tImage/picture.png'),
                    icon_out: require('../assets/tImage/picture.png'),
                    icon_active: require('../assets/tImage/picture_h.png'),
                    menuName: "图片",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_05_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_01_blue.png'), 
                            menuName: "单图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_05_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_02_blue.png'), 
                            menuName: "二图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_05_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_03_blue.png'), 
                            menuName: "三图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_05_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_04_blue.png'), 
                            menuName: "组合三图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "05",
                            icon: require('../assets/menuList/icon_05_05_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_05_blue.png'), 
                            menuName: "组合四图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "06",
                            icon: require('../assets/menuList/icon_05_06_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_06_blue.png'), 
                            menuName: "侧滑一图",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "07",
                            icon: require('../assets/menuList/icon_05_07_gray.png'),
                            activeIcon: require('../assets/menuList/icon_05_07_blue.png'), 
                            menuName: "侧滑二图",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "06",
                    icon: require('../assets/tImage/imageText.png'),
                    icon_out: require('../assets/tImage/imageText.png'),
                    icon_active: require('../assets/tImage/imageText_h.png'),
                    menuName: "图文",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_06_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_01_blue.png'), 
                            menuName: "左右",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_06_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_02_blue.png'), 
                            menuName: "上下",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_06_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_03_blue.png'), 
                            menuName: "二组",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_06_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_04_blue.png'), 
                            menuName: "三组",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "05",
                            icon: require('../assets/menuList/icon_06_05_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_05_blue.png'), 
                            menuName: "侧滑一组1",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "06",
                            icon: require('../assets/menuList/icon_06_06_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_06_blue.png'), 
                            menuName: "侧滑一组2",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "07",
                            icon: require('../assets/menuList/icon_06_07_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_07_blue.png'), 
                            menuName: "侧滑二组",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "08",
                            icon: require('../assets/menuList/icon_06_08_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_08_blue.png'), 
                            menuName: "侧滑三组",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "09",
                            icon: require('../assets/menuList/icon_06_08_gray.png'),
                            activeIcon: require('../assets/menuList/icon_06_08_blue.png'), 
                            menuName: "组合图文",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "07",
                    icon: require('../assets/tImage/auxiliaryBlank.png'),
                    icon_out: require('../assets/tImage/auxiliaryBlank.png'),
                    icon_active: require('../assets/tImage/auxiliaryBlank_h.png'),
                    menuName: "辅助空白",
                    menuOnline: "1",
                    menuList: [],
                },
                {
                    menuType: "11",
                    icon: require('../assets/tImage/auxiliaryLine.png'),
                    icon_out: require('../assets/tImage/auxiliaryLine.png'),
                    icon_active: require('../assets/tImage/auxiliaryLine_h.png'),
                    menuName: "辅助线",
                    menuOnline: "1",
                    menuList: []
                },
                {
                    menuType: "13",
                    icon: require('../assets/tImage/navigationbar.png'),
                    icon_out: require('../assets/tImage/navigationbar.png'),
                    icon_active: require('../assets/tImage/navigationbar_h.png'),
                    menuName: "导航栏",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_13_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_13_01_blue.png'), 
                            menuName: "样式一",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_13_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_13_02_blue.png'), 
                            menuName: "样式二",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_01_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_01_03_blue.png'), 
                            menuName: "样式三",
                            menuOnline: "1",
                            menuList: []
                        },
                    ]
                },
                {
                    menuType: "14",
                    icon: require('../assets/template_list_style1.png'),
                    icon_out: require('../assets/template_list_style1.png'),
                    icon_active: require('../assets/template_list_style1.png'),
                    menuName: "列表",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_14_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_14_01_blue.png'), 
                            menuName: "样式一",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_14_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_14_02_blue.png'), 
                            menuName: "样式二",
                            menuOnline: "1",
                            menuList: []
                        },
                    ]
                }
            ]
        },
        {
            menuType: "MT02",
            icon: "",
            menuName: "服务类",
            menuOnline: "1",
            menuList: [
                {
                    menuType: "08",
                    icon: require('../assets/tImage/financingProduct.png'),
                    icon_out: require('../assets/tImage/financingProduct.png'),
                    icon_active: require('../assets/tImage/financingProduct_h.png'),
                    menuName: "理财产品",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_08_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_01_blue.png'), 
                            menuName: "列表",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_08_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_02_blue.png'), 
                            menuName: "单个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "07",
                            icon: require('../assets/menuList/icon_08_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_02_blue.png'), 
                            menuName: "单个+图文",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_08_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_03_blue.png'), 
                            menuName: "二个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "04",
                            icon: require('../assets/menuList/icon_08_04_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_04_blue.png'), 
                            menuName: "三个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "05",
                            icon: require('../assets/menuList/icon_08_05_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_05_blue.png'), 
                            menuName: "侧滑一个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "06",
                            icon: require('../assets/menuList/icon_08_06_gray.png'),
                            activeIcon: require('../assets/menuList/icon_08_06_blue.png'), 
                            menuName: "侧滑二个",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "09",
                    icon: require('../assets/tImage/regularProducts.png'),
                    icon_out: require('../assets/tImage/regularProducts.png'),
                    icon_active: require('../assets/tImage/regularProducts_h.png'),
                    menuName: "定期产品",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_09_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_09_01_blue.png'), 
                            menuName: "列表",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_09_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_09_02_blue.png'), 
                            menuName: "侧滑一个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "03",
                            icon: require('../assets/menuList/icon_09_03_gray.png'),
                            activeIcon: require('../assets/menuList/icon_09_03_blue.png'), 
                            menuName: "侧滑二个",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "10",
                    icon: require('../assets/tImage/purchase.png'),
                    icon_out: require('../assets/tImage/purchase.png'),
                    icon_active: require('../assets/tImage/purchase_h.png'),
                    menuName: "分期购",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_10_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_10_01_blue.png'), 
                            menuName: "三个",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_10_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_10_02_blue.png'), 
                            menuName: "侧滑三个",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "MT0203",
                    icon: require('../assets/tImage/productList.png'),
                    icon_out: require('../assets/tImage/productList.png'),
                    icon_active: require('../assets/tImage/productList_h.png'),
                    menuName: "商品列表",
                    menuOnline: "0",
                    menuList: []
                },
                {
                    menuType: "MT0204",
                    icon: require('../assets/tImage/flashSale.png'),
                    icon_out: require('../assets/tImage/flashSale.png'),
                    icon_active: require('../assets/tImage/flashSale_h.png'),
                    menuName: "限时抢购",
                    menuOnline: "0",
                    menuList: []
                },
                {
                    menuType: "MT0205",
                    icon: require('../assets/tImage/redeem.png'),
                    icon_out: require('../assets/tImage/redeem.png'),
                    icon_active: require('../assets/tImage/redeem_h.png'),
                    menuName: "积分兑换",
                    menuOnline: "0",
                    menuList: []
                },
                {
                    menuType: "MT0206",
                    icon: require('../assets/tImage/coupon.png'),
                    icon_out: require('../assets/tImage/coupon.png'),
                    icon_active: require('../assets/tImage/coupon_h.png'),
                    menuName: "优惠券",
                    menuOnline: "0",
                    menuList: []
                },
                {
                    menuType: "MT0207",
                    icon: require('../assets/tImage/collage.png'),
                    icon_out: require('../assets/tImage/collage.png'),
                    icon_active: require('../assets/tImage/collage_h.png'),
                    menuName: "拼团",
                    menuOnline: "0",
                    menuList: []
                },
                {
                    menuType: "MT0208",
                    icon: require('../assets/tImage/timeKill.png'),
                    icon_out: require('../assets/tImage/timeKill.png'),
                    icon_active: require('../assets/tImage/timeKill_h.png'),
                    menuName: "定时秒杀",
                    menuOnline: "0",
                    menuList: []
                }
            ]
        },
        {
            menuType: "MT00",
            icon: "",
            menuName: "其他类",
            menuOnline: "1",
            menuList: [
                {
                    menuType: "12",
                    icon: require('../assets/tImage/carousel_palace.png'),
                    icon_out: require('../assets/tImage/carousel_palace.png'),
                    icon_active: require('../assets/tImage/carousel_palace_h.png'),
                    menuName: "宫格+轮播",
                    menuDefault: "01",
                    menuOnline: "1",
                    menuList: [
                        {
                            menuType: "01",
                            icon: require('../assets/menuList/icon_12_01_gray.png'),
                            activeIcon: require('../assets/menuList/icon_12_01_blue.png'), 
                            menuName: "轮播+宫格",
                            menuOnline: "1",
                            menuList: []
                        },
                        {
                            menuType: "02",
                            icon: require('../assets/menuList/icon_12_02_gray.png'),
                            activeIcon: require('../assets/menuList/icon_12_02_blue.png'), 
                            menuName: "宫格+轮播",
                            menuOnline: "1",
                            menuList: []
                        }
                    ]
                },
                {
                    menuType: "MT0002",
                    icon: require('../assets/tImage/pic_palace.png'),
                    icon_out: require('../assets/tImage/pic_palace.png'),
                    icon_active: require('../assets/tImage/pic_palace_h.png'),
                    menuName: "图片+宫格",
                    menuOnline: "0",
                    menuList: []
                }
            ]
        }
    ]