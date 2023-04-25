<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '导航栏',

    data () {

        return {
            pageData: {
                cards: [
                    {
                        type: 'FNavigationBar', 
                        properties: {
                            options: {
                                navigationBarFloat: "1",  // 是否悬浮 0：不悬浮  1：悬浮
                                navigationBarBgColor: "#FFFF0000",  //导航栏背景色 十六进制颜色值 ARGB
                                navigationBarDivideColor: "#00000000",  //导航栏悬浮背景颜色
                                statusBarStyle: "1", // 状态栏颜色 1：白色 0：黑色
                                iLeftList: [
                                    {
                                        type:'Image',    //Text:文字  Search：搜索框 Location：定位 ImageGroup：图片组,
                                        imageurl:"",     // 图标
                                        imageurl2:"",    // 悬浮状态下图标
                                        titleFlag:"",    // 是否有文字
                                        title:"",       // 文字内容
                                        titleColor:"",   // 文字颜色
                                        titleColor2:"",  // 悬浮状态文字颜色
                                        action: {}       // 点击事件
                                    },
                                    {
                                        type:'Text',    //Text:文字  Search：搜索框 Location：定位 ImageGroup：图片组,
                                        title:"猎豹金融",       // 文字内容
                                        titleColor:"",   // 文字颜色
                                        titleColor2:"",  // 悬浮状态文字颜色
                                        action: {}       // 点击事件
                                    },
                                    {
                                        type:'Search',    //Text:文字  Search：搜索框 Location：定位 ImageGroup：图片组,
                                        title:"猎豹金融",       // 文字内容
                                        titleColor:"",   // 文字颜色
                                        titleColor2:"",  // 悬浮状态文字颜色
                                        leftInfo: {
                                            title: '是多少'
                                        },
                                        action: {}       // 点击事件
                                    },
                                    {
                                        type:'Location',    //Text:文字  Search：搜索框 Location：定位 ImageGroup：图片组,
                                        title:"猎豹金融",       // 文字内容
                                        titleColor:"",   // 文字颜色
                                        titleColor2:"",  // 悬浮状态文字颜色
                                        action: {}       // 点击事件
                                    },
                                    {
                                        type:'Message',    //Text:文字  Search：搜索框 Location：定位 ImageGroup：图片组,
                                        imageurl:"",     // 图标
                                        imageurl2:"",    // 悬浮状态下图标
                                        badge: "‧‧‧",
                                        action: {}       // 点击事件
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
}
</script>