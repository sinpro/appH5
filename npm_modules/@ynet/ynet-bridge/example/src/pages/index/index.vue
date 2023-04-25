<template>
    <div class="page_index">
        <m-headerview>猎豹金融API测试</m-headerview>
        <m-listview class="page_index_listview" :data="iRouteList"></m-listview>
    </div>
</template>
<script>
export default {
    
    data () {
        return {
            iRouteList: [
                {title: '路由管理', icon: require('../../assets/icon_route.png'), iItemList: [
                    {title: '打开容器/离线包', url: '/route/pushWindow'},
                    {title: '清除webview历史', url: '/route/clearHistory'},
                    {title: '视图回退', url: '/route/closeToPage'},
                    {title: '回到首页', url: '/route/closeToHomePage'},
                    {title: '关闭视图', url: '/route/closePage'}
                ]},
                {title: '缓存管理', icon: require('../../assets/icon_cache.png'), iItemList: [
                    {title: '内存存储', url: '/cache/sessionStorage'},
                    {title: '磁盘存储', url: '/cache/localStorage'}
                ]},
                {title: '设备管理', icon: require('../../assets/icon_device.png'), iItemList: [
                    {title: '获取设备APP信息', url: '/device/getDeviceAndAppInfo'},
                    {title: '获取设备唯一号', url: '/device/getDeviceFingerprint'},
                    {title: '获取电池信息', url: '/device/getBatteryInfo'}
                ]},
                {title: '交互管理', icon: require('../../assets/icon_interactive.png'), iItemList: [
                    {title: '基础交互', url: '/interactive/base'},
                    {title: '显示选项卡', url: '/interactive/showActionSheet'},
                    {title: '显示日期时间选择框', url: '/interactive/showDatePicker'},
                    {title: '显示数据选择器', url: '/interactive/showPickerView'},
                    {title: '导航栏遮罩', url: '/interactive/showMask'},
                    {title: '导航栏设置', url: '/interactive/setLeftMenu'},
                    {title: '下拉刷新', url: '/interactive/startPullDownRefresh'}
                ]},
                {title: 'Native管理', icon: require('../../assets/icon_native.png'), iItemList: [
                    {title: '添加日历提醒', url: '/native/addCalendarReminder'},
                    {title: '检查是否支持Applepay', url: '/native/availableApplePay'},
                    {title: '检查定位服务权限', url: '/native/availableLocationServices'},
                    {title: '打电话', url: '/native/callPhoneNumber'},
                    {title: '中文拼音转换', url: '/native/chinese2MandarinLatin'},
                    {title: '剪贴板', url: '/native/copyToClipboard'},
                    {title: '调试模式', url: '/native/debugMode'},
                    {title: '下载PDF', url: '/native/downloadPdf'},
                    {title: '获取定位信息', url: '/native/getLocationInfo'},
                    {title: '检查通知栏权限', url: '/native/notificationStatus'},
                    {title: '打开系统自带浏览器', url: '/native/openNativeWebBrowser'},
                    {title: '截屏', url: '/native/screenShots'},
                    {title: '发送短信/邮件', url: '/native/sendSMS'},
                    {title: '屏幕亮度', url: '/native/setBrightness'},
                    {title: '打开相册或者拍照', url: '/native/showCameraImagePicker'},
                    {title: '打开通讯录', url: '/native/showContactList'},
                    {title: '打开第三方APP', url: '/native/startOtherApp'},
                    {title: '检查第三方APP是否安装', url: '/native/isInstallApp'},
                    {title: '检查GPS是否可用', url: '/native/availableGPS'},
                    {title: '指纹/面容设置', url: '/native/startLocalAuthentication'},
                    {title: '手势设置', url: '/native/pushGestureSetting'}
                ]},
                {title: '用户管理', icon: require('../../assets/icon_user.png'), iItemList: [
                    {title: '登录', url: '/user/login'},
                    {title: '获取用户sessionID', url: '/user/getSessionID'},
                    {title: '用户信息', url: '/user/getUserInfo'}
                ]},
                {title: '业务管理', icon: require('../../assets/icon_business.png'), iItemList: [
                    {title: '打开银行列表', url: '/business/openBankList'},
                    {title: '打开城市列表', url: '/business/pushCityListView'},
                    {title: '地图导航', url: '/business/openNavigationApp'},
                    {title: '打开银行网点', url: '/business/pushBankbranchView'},
                    {title: '事件埋点', url: '/business/trackEvent'},
                    {title: '获取APP业务信息', url: '/business/getVersionInfo'}
                ]},
                {title: '第三方管理', icon: require('../../assets/icon_third.png'), iItemList: [
                    {title: '打开人脸识别', url: '/third/openFaceRecognition'},
                    {title: '打开二维码扫描', url: '/third/openQRCodeScanner'},
                    {title: '打开分享面板', url: '/third/showSharePad'},
                    {title: '打开安全键盘', url: '/third/showKeyboard'},
                    {title: '打开支付密码面板', url: '/third/showPaymentPad'},
                    {title: '打开OCR', url: '/third/showOCRIDCard'},
                    {title: '检查APP版本更新', url: '/third/checkAppUpdate'}
                ]},
                {title: '测试', icon: require('../../assets/icon_user.png'), iItemList: [
                    {title: 'API调用测试', url: '/test'},
                ]}
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.page_index{
    
    .page_index_listview{
        margin-top: 0.8rem;
    }
}
</style>

