<template>
    <div>
        <m-titleview title="导航栏设置">
            导航栏左按钮的视图定制/显示隐藏左侧按钮/设置导航栏标题、图片等
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('setLeftMenu-1')">设置导航栏左侧菜单-案例一</m-buttonview>
            <m-buttonview @click="callApi('setLeftMenu-2')">设置导航栏左侧菜单-案例二</m-buttonview>
            <m-buttonview @click="callApi('showLeftMenu-false')">隐藏导航栏左侧菜单</m-buttonview>
            <m-buttonview @click="callApi('showLeftMenu-true')">显示导航栏左侧菜单</m-buttonview>
            <m-buttonview @click="callApi('setMiddleTitle-white')">设置导航栏标题-白色</m-buttonview>
            <m-buttonview @click="callApi('setMiddleTitle-blue')">设置导航栏标题-蓝色</m-buttonview>
            <m-buttonview @click="callApi('setRightMenu-1')">设置导航栏右侧菜单-案例一</m-buttonview>
            <m-buttonview @click="callApi('setRightMenu-2')">设置导航栏右侧菜单-案例二</m-buttonview>
            <m-buttonview @click="callApi('setRightMenu-3')">设置导航栏右侧菜单-案例三</m-buttonview>
            <m-buttonview @click="callApi('setBarBottomLineColor-black')">设置导航栏底部边线-黑色</m-buttonview>
            <m-buttonview @click="callApi('setBarBottomLineColor-blue')">设置导航栏底部边线-蓝色</m-buttonview>
            <m-buttonview @click="callApi('showTitleBar')">显示导航栏</m-buttonview>
            <m-buttonview @click="callApi('hideTitleBar')">隐藏导航栏</m-buttonview>
            <m-buttonview @click="callApi('setTitleBarColor-red')">设置导航栏背景颜色-红色</m-buttonview>
            <m-buttonview @click="callApi('setTitleBarColor-green')">设置导航栏背景颜色-绿色</m-buttonview>
            <m-buttonview @click="callApi('setTitleBarColor-opacity')">设置导航栏背景颜色-透明</m-buttonview>
            <m-buttonview @click="callApi('getStatusBarHeight')">获取状态栏高度</m-buttonview>
            <m-buttonview @click="callApi('getTitleBarHeight')">获取导航栏高度</m-buttonview>
            <m-buttonview @click="callApi('setStatusBarStyle-0')">设置状态栏黑色风格</m-buttonview>
            <m-buttonview @click="callApi('setStatusBarStyle-1')">设置状态栏白色风格</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'setLeftMenu-1':
                    api.setLeftMenu({
                        menus: [
                            {icontype: 'close_black', text: '测试', color: '#FF000000', overrideClick: false},
                            {icontype: 'more_black', text: '测试', color: '#FF000000', overrideClick: false}
                        ]
                    }, result => {
                        alert(`点击了第${result.index}个按钮`)
                    })
                    break
                case 'setLeftMenu-2':
                    api.setLeftMenu({
                        menus: [
                            {icontype: '', text: '测试1', color: '#FF000000', overrideClick: false},
                            {icontype: '', text: '测试2', color: '#FF000000', overrideClick: false}
                        ]
                    }, result => {
                        alert(`点击了第${result.index}个按钮`)
                    })
                    break
                case 'showLeftMenu-false':
                    api.showLeftMenu(false)
                    break
                case 'showLeftMenu-true':
                    api.showLeftMenu(true)
                    break
                case 'setMiddleTitle-white':
                    api.setMiddleTitle({title:'测试标题', color:'#FFFFFFFF'})
                    break
                case 'setMiddleTitle-blue':
                    api.setMiddleTitle({title:'复测标题', color:'#FF0000FF'})
                    break
                case 'setRightMenu-1':
                    api.setRightMenu({
                        menus:[
                            {icontype: '', text: '测试', color: '#FF000000'},
                            {icontype: 'more_black', text: '测试', color: '#FF000000'}
                        ]
                    }, result => {
                        alert(`点击了第${result.index}个按钮`)
                    })
                    break
                case 'setRightMenu-2':
                    api.setRightMenu({
                        menus:[
                            {icontype: '', text: '编辑', color: '#FF000000'},
                        ]
                    }, result => {
                        alert(`点击了第${result.index}个按钮`)
                    })
                    break
                case 'setRightMenu-3':
                    api.setRightMenu({
                        menus:[
                            {icontype: '', text: '完成', color: '#FF000000'},
                        ]
                    }, result => {
                        alert(`点击了第${result.index}个按钮`)
                    })
                    break
                case 'setBarBottomLineColor-black':
                    api.setBarBottomLineColor({color:'#000000'})
                    break
                case 'setBarBottomLineColor-blue':
                    api.setBarBottomLineColor({color:'#0000FF'})
                    break
                case 'showTitleBar':
                    api.showTitleBar()
                    break
                case 'hideTitleBar':
                    api.hideTitleBar()
                    break
                case 'setTitleBarColor-red':
                    api.setTitleBarColor({color:'#FFFF0000'})
                    break
                case 'setTitleBarColor-green':
                    api.setTitleBarColor({color:'#FF00FF00'})
                    break
                case 'setTitleBarColor-opacity':
                    api.setTitleBarColor({color:'#00000000'})
                    break
                case 'getStatusBarHeight':
                    api.getStatusBarHeight().then(res => {
                        alert(`状态栏高度：${res.statusBarHeight}`)
                    })
                    break
                case 'getTitleBarHeight':
                    api.getTitleBarHeight().then(res => {
                        alert(`导航栏高度：${res.titleBarHeight}`)
                    })
                    break
                case 'setStatusBarStyle-0':
                    api.setStatusBarStyle('0')
                    break
                case 'setStatusBarStyle-1':
                    api.setStatusBarStyle('1')
                    break
            }
        }
    }
}
</script>

