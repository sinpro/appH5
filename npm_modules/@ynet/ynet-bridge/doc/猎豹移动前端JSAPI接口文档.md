# 猎豹移动前端JSAPI接口文档

- [路由管理](#route)
  - [pushWindow - 打开新窗口跳转](#pushWindow)
  - [pushWindowOnline - 打开第三方在线地址](#pushWindowOnline)
  - [closeAll - 关闭所有页面](#closeAll)
  - [closeOther - 关闭除自身以外所有页面](#closeOther)
  - [closePage - 关闭指定页面](#closePage)
  - [closeToPage - 返回至指定页面](#closeToPage)
  - [closeToHomePage - 关闭所有页面并返回到首页](#closeToHomePage)
  - [clearHistory - 清除webview历史对象](#clearHistory)

- [缓存管理](#cache)
  - [getSessionStorage - 获取内存数据缓存](#getSessionStorage)
  - [setSessionStorage - 设置内存数据缓存](#setSessionStorage)
  - [getLocalStorage - 获取磁盘数据缓存](#getLocalStorage)
  - [setLocalStorage - 设置磁盘数据缓存](#setLocalStorage)

- [设备管理](#device)
  - [getDeviceAndAppInfo - 获取设备APP信息](#getDeviceAndAppInfo)
  - [getDeviceFingerprint - 获取设备唯一号](#getDeviceFingerprint)
  - [getBatteryInfo - 获取电池信息](#getBatteryInfo)
  - [getPrivacyServiceStatus - 获取用户设备是否开启权限信息](#getPrivacyServiceStatus)
  - [requestPrivacyServicePermissions - 请求设备的基础权限](#requestPrivacyServicePermissions)

- [交互管理](#interactive)
  - [alert - 提示框](#alert)
  - [confirm - 确认框](#confirm)
  - [showInputAlert - 输入提示框](#showInputAlert)
  - [showLoading - 显示加载中](#showLoading)
  - [hideLoading - 隐藏加载中](#hideLoading)
  - [showToast - 显示弱提示](#showToast)
  - [showDatePicker - 时间日期选择器](#showDatePicker)
  - [showActionSheet - 显示选项卡](#showActionSheet)
  - [showPickerView - 选择框视图](#showPickerView)
  - [showMask - 显示导航栏遮罩](#showMask)
  - [hideMask - 隐藏导航栏遮罩](#hideMask)
  - [setLeftMenu - 设置导航栏左侧按钮](#setLeftMenu)
  - [showLeftMenu - 显示导航栏左侧按钮](#showLeftMenu)
  - [setMiddleTitle - 设置导航栏标题/图片](#setMiddleTitle)
  - [setRightMenu - 设置导航栏右侧按钮](#setRightMenu)
  - [setBarBottomLineColor - 设置导航栏底部分隔线颜色](#setBarBottomLineColor)
  - [showTitleBar - 显示导航栏](#showTitleBar)
  - [hideTitleBar - 隐藏导航栏](#hideTitleBar)
  - [setTitleBarColor - 设置导航栏背景色](#setTitleBarColor)
  - [getStatusBarHeight - 获取状态栏高度](#getStatusBarHeight)
  - [getTitleBarHeight - 获取导航栏高度](#getTitleBarHeight)
  - [setStatusBarStyle - 设置状态栏风格](#setStatusBarStyle)
  - [startPullDownRefresh - 开始下拉刷新](#startPullDownRefresh)
  - [stopPullDownRefresh - 结束下拉刷新](#stopPullDownRefresh)

- [客户端native能力管理](#native)
  - [addNotifyListener - 添加事件监听](#addNotifyListener)
  - [rpc - 远程过程调用](#rpc)
  - [debugMode - 设置webview的usagent模式](#debugMode)
  - [showContactList - 打开通讯录列表](#showContactList)
  - [screenShots - 截屏](#screenShots)
  - [copyToClipboard - 设置剪贴板](#copyToClipboard)
  - [sendSMS - 发送短信](#sendSMS)
  - [sendMail - 发送邮件](#sendMail)
  - [showCameraImagePicker - 打开相册/拍照](#showCameraImagePicker)
  - [getLocationInfo - 获取定位信息](#getLocationInfo)
  - [setBrightness - 设置屏幕亮度](#setBrightness)
  - [recoverBrightness - 恢复屏幕亮度](#recoverBrightness)
  - [downloadPdf - 下载PDF](#downloadPdf)
  - [chinese2MandarinLatin - 中文转大写拼音](#chinese2MandarinLatin)
  - [startOtherApp - 打开第三方APP](#startOtherApp)
  - [availableApplePay - 检测是否支持ApplePay](#availableApplePay)
  - [notificationStatus - 检测推送通知权限](#notificationStatus)
  - [availableLocationServices - 检测定位权限](#availableLocationServices)
  - [openLocationSettings - 打开定位设置](#openLocationSettings)
  - [openNativeWebBrowser - 打开系统浏览器](#openNativeWebBrowser)
  - [addCalendarReminder - 增加日历提醒](#addCalendarReminder)
  - [callPhoneNumber - 拨打电话](#callPhoneNumber)
  - [isInstallApp - 检测是否已安装APP](#isInstallApp)
  - [availableGPS - 检测GPS是否可用](#availableGPS)
  - [availableLocalAuthentication - 检测本地指纹/面容识别是否可用](#availableLocalAuthentication)
  - [startLocalAuthentication - 开始本地指纹/面容识别](#startLocalAuthentication)
  - [getLocalAuthenticationOnOff - 获取本地指纹/面容识别开启](#getLocalAuthenticationOnOff)
  - [setLocalAuthenticationOnOff - 设置本地指纹/面容识别开启](#setLocalAuthenticationOnOff)
  - [clearLocalAuthenticationOnOff - 清除本地指纹/面容识别开启](#clearLocalAuthenticationOnOff)
  - [setFingerPrintToken - 设置指纹/面容识别token](#setFingerPrintToken)
  - [getGestureOnOff - 获取手势开启](#getGestureOnOff)
  - [getGesturePathShowState - 获取手势路径是否显示](#getGesturePathShowState)
  - [setGesturePathShowState - 设置手势路径是否显示](#setGesturePathShowState)
  - [pushGestureSetting - 打开手势设置](#pushGestureSetting)
  - [setGestureToken - 设置手势token](#setGestureToken)

- [用户信息管理](#user)
  - [getSessionID - 获取用户会话ID](#getSessionID)
  - [login - 打开登录对话框](#login)
  - [getUserInfo - 获取用户信息](#getUserInfo)
  - [updateUserInfo - 更新用户信息](#updateUserInfo)
  - [cleanUserInfo - 清除用户信息并退出登录](#cleanUserInfo)

- [第三方管理](#third)
  - [openFaceRecognition - 打开人脸识别](#openFaceRecognition)
  - [openQRCodeScanner - 打开二维码扫描](#openQRCodeScanner)
  - [showSharePad - 打开分享面板](#showSharePad)
  - [shareTo - 直接分享](#shareTo)
  - [showKeyboard - 显示安全键盘](#showKeyboard)
  - [hideKeyboard - 关闭安全键盘](#hideKeyboard)
  - [showPaymentPad - 显示支付密码键盘](#showPaymentPad)
  - [showOCRIDCard - 打开ocr识别身份证](#showOCRIDCard)
  - [showOCRBankCard - 打开ocr识别银行卡](#showOCRBankCard)
  - [checkAppUpdate - 检查APP版本更新](#checkAppUpdate)

- [业务能力管理](#business)
  - [openBankList - 打开银行列表](#openBankList)
  - [pushCityListView - 打开银行网点城市列表](#pushCityListView)
  - [getVersionInfo - 获取APP内所有版本信息](#getVersionInfo)
  - [getServerDate - 获取服务端时间](#getServerDate)
  - [getCurrentStyle - 获取当前APP风格](#getCurrentStyle)
  - [getServerUrl - 获取服务器地址](#getServerUrl)
  - [trackEvent - 数据采集埋点](#trackEvent)
  - [openNavigationApp - 打开原生网点导航路径功能](#openNavigationApp)
  - [pushBankbranchView - 打开银行网点](#pushBankbranchView)


***统一错误处理***

> API方法调用后统一返回error及errorMessage参数，error为返回的错误码，errorMessage为返回的错误信息内容。错误码具体规范见下表：

错误码 | 描述
----       | ----
0       	 | 成功
1000       | 入参格式错误
2000       | 操作取消
3000       | 代码异常
4000  		 | 未知错误
5000-5999  | 业务错误

## <a name="route">路由管理</a>

### <a name="pushWindow">1. pushWindow - 打开新窗口跳转</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
url | String | 路由url信息, 必须以/开头 | Y | - | -
data | Object | 页面参数传递 | N | - | -
param | Object | mpaas支持的启动参数 | N | - | [nebula SDK开放文档](https://nebulasdk.alipay.com/jsapi/context/push-window.html)

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.pushWindow('demo/jsapi/test.html', {
  message: 'hello world!'
}, {
  readTitle: true,
  showOptionMenu: false
})
```

### <a name="pushWindowOnline">2. pushWindowOnline - 打开第三方在线地址</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
url | String | 路由url信息 | Y | - | -
data | Object | 页面参数传递 | N | - | 支持简单key-value
options | Object | 路由选项 | N | - | needLogin - 跳转页面前是否登录 <br> pushParam - 页面启动参数

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.pushWindowOnline('https://www.baidu.com/', {
  message: 'foo',
  info: 'bar'
})
```

### <a name="closeAll">3. closeAll - 关闭所有页面</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.closeAll()
```

### <a name="closeOther">4. closeOther - 关闭除自身以外所有页面</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.closeOther()
```

### <a name="closePage">5. closePage - 关闭指定页面</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
urls | StringArray | 路由url数组 | Y | - | 离线包内页面跳转可支持相对路径，跨包调用请使用完整路径

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.closePage([
  'https://www.abc.com/a.html',
  'https://www.abc.com/b.html'
)
```

### <a name="closeToPage">6. closeToPage - 返回至指定页面</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
pageIndex | Number/String | 返回页面层级（如-2为返回两页）或匹配返回目标url | Y | - | 当参数为数字时必须为负数，当参数为字符串时则必须为路径
data | Object | 返回参数 | N | - | -

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.closeToPage(-3, {
  a: 'foo',
  bar: 1
})

// or

api.closeToPage('https://www.abc.com/page-1.html', {
  a: 'foo',
  bar: 1
})
```

### <a name="closeToHomePage">7. closeToHomePage - 关闭所有页面并返回到首页</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
tabTag | String | 首页tab栏对应id | Y | - | 猎豹项目为home，financial，life，me

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.closeToHomePage('home')
```

### <a name="clearHistory">8. clearHistory - 清除webview历史对象</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.clearHistory()
```

## <a name="cache">缓存管理</a>

### <a name="getSessionStorage">1. getSessionStorage - 获取内存数据缓存</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
key | String | 存储key值 | Y | - | -
keep | Boolean | 存储数据是否保留 | N | true | 该参数设置为false时，将会在缓存数据第一次读取后自动删除

#### 返回
- `Promise`
  - `data` Object - 返回读取数据内容

#### 使用案例

```javascript
api.getSessionStorage('mySessionStoreKey').then(data => {
  console.log(data)
})
```

### <a name="setSessionStorage">2. setSessionStorage - 设置内存数据缓存</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
key | String | 存储key值 | Y | - | -
data | Object/String/Array | 存储数据 | Y | - | -

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setSessionStorage('mySessionStoreKey', {
  msg: 'hello world!'
}).then(result => {
  console.log(result.error, result.errorMessage)
})
```

### <a name="getLocalStorage">3. getLocalStorage - 获取磁盘数据缓存</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
key | String | 存储key值 | Y | - | -
keep | Boolean | 存储数据是否保留 | N | true | 该参数设置为false时，将会在缓存数据第一次读取后自动删除

#### 返回
- `Promise`
  - `data` Object - 返回读取数据内容

#### 使用案例

```javascript
api.getLocalStorage('myLocalStoreKey').then(data => {
  console.log(data)
})
```

### <a name="setLocalStorage">4. setLocalStorage - 设置磁盘数据缓存</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
key | String | 存储key值 | Y | - | -
data | Object/String/Array | 存储数据 | Y | - | -

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setLocalStorage('myLocalStoreKey', {
  msg: 'hello world!'
}).then(result => {
  console.log(result.error, result.errorMessage)
})
```

## <a name="device">设备管理</a>

### <a name="getDeviceAndAppInfo">1. getDeviceAndAppInfo - 获取设备APP信息</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `appVersion` String - app的版本，如："1.0.0.0"
  - `deviceVersion` String - 系统版本，如："6.0.1"
  - `UUID` String - 设备唯一标识，如："865931020418893460017590405179"
  - `phoneType` String - 手机品牌，如："Xiaomi"
  - `model` String - 手机品牌的型号，如："MI 4LTE"
  - `ip` String - 本机ip地址
  - `isCrack` Boolean - 是否root或越狱
  - `deviceToken` String - mPaaS返回的pushToken
  - `screenWidth` String - 屏幕宽（像素）
  - `screenHeight` String - 屏幕高（像素）
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getDeviceAndAppInfo().then(data => {
  console.log('App版本为：' + data.appVersion)
})
```

### <a name="getDeviceFingerprint">2. getDeviceFingerprint - 获取设备唯一号</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `deviceID` String - app的版本，如："1.0.0.0"
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getDeviceFingerprint().then(data => {
  console.log('设备唯一表识：' + data.deviceID)
})
```

### <a name="getBatteryInfo">3. getBatteryInfo - 获取电池信息</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `level` String - 电池剩余电量，如："80"表示电量剩余80%
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getBatteryInfo().then(data => {
  console.log('电池剩余电量：' + data.level + '%')
})
```

### <a name="getPrivacyServiceStatus">4. getPrivacyServiceStatus - 获取用户设备是否开启权限信息</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
service | String | 单个隐私权限 | N | - | 默认为空获取所有权限信息，camara - 相机权限，photo - 相册权限，location - 定位权限，contact - 通讯录，microphone - 麦克风权限

#### 返回
- `Promise`
  - `status` jsonObject - key值同入参，value值 0-未请求权限，1-已允许，2-已拒绝，3-系统总开关关闭或设备不支持
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getPrivacyServiceStatus().then(data => {
  console.log('权限信息：' + data.status)
})
```

### <a name="requestPrivacyServicePermissions">5. requestPrivacyServicePermissions - 请求设备的基础权限</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
service | String | 单个隐私权限 | Y | - | 默认为空获取所有权限信息，camara - 相机权限，photo - 相册权限，location - 定位权限，contact - 通讯录，microphone - 麦克风权限

#### 返回
- `Promise`
  - `nowStatus` String - 0-未请求权限，1-已允许，2-已拒绝，3-系统总开关关闭或设备不支持
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.requestPrivacyServicePermissions({service: 'camara'}).then(data => {
  console.log('相机权限：' + data.nowStatus)
})
```

## <a name="interactive">交互管理</a>

### <a name="alert">1. alert - 提示框</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
message | String | 提示文字内容 | Y | - | -
title | String | 标题 | N | 系统提示 | -
options | Object | 可选配置项 | N | `okButton`: `'确定'` <br> `clickBgToHide`: `false` <br> `cancelGrayStyle`: `false` | `okButton` String - 确认按钮文本 <br> `clickBgToHide` Boolean - 是否点击背景隐藏 <br> `cancelGrayStyle` Boolean - 取消按钮是否是灰色的风格

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.alert('hello world!', '我是标题')
```

### <a name="confirm">2. confirm - 确认框</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
message | String | 提示文字内容 | Y | - | -
title | String | 标题 | N | 系统提示 | -
options | Object | 可选配置项 | N | `okButton`: `'确定'` <br> `cancelButton`: `'取消'` <br> `clickBgToHide`: `false` <br> `cancelGrayStyle`: `false` | `okButton` String - 确认按钮文本 <br> `cancelButton` String - 取消按钮文本 <br> `clickBgToHide` Boolean - 是否点击背景隐藏 <br> `cancelGrayStyle` Boolean - 取消按钮是否是灰色的风格

#### 返回
- `Promise`
  - `ok` Boolean - 是否点击确定按钮
  - `dismissByClickBg` Boolean - 是否通过点击背景消失
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.confirm('hello world!', '我是标题').then(result => {
  console.log('是否点击确认：' + result.ok);
})
```

### <a name="showInputAlert">3. showInputAlert - 输入提示框</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `title`: `'系统提示'` <br>`presetInputContent`: `''` <br>`placeholder`: `''` <br>`okButton`: `'确定'` <br> `cancelButton`: `'取消'` <br> `clickBgToHide`: `false` <br> `wordsNumLimit`: `''` <br> `keyboardType`: `''` | `title` String - 标题 <br> `presetInputContent` String - 预置输入的文本 <br> `placeholder` String - 占位文本 <br> `okButton` String - 确认按钮文本 <br> `cancelButton` String - 取消按钮文本 <br> `clickBgToHide` Boolean - 是否点击背景隐藏 <br> `wordsNumLimit` String - 可输入字符最大限制数 <br> `keyboardType` String - 弹出的键盘类型，见下表

**附表：键盘类型**

值            | 描述
----           | ----
DefaultPad     | 默认键盘
DecimalPad     | 带小数点的数字键盘
PhonePad       | 带*#+的数字键盘
NamePhonePad   | 字母及数字键盘

#### 返回
- `Promise`
  - `ok` Boolean - 是否点击确定按钮
  - `dismissByClickBg` Boolean - 是否通过点击背景消失
  - `inputContent` Boolean - 输入内容
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showInputAlert({
  title: '备注',
  message: '请输入备注',
  presetInputContent: '000',
  placeholder: '请输入备注', 
  okButton: '确定',
  cancelButton: '取消',
  wordsNumLimit: '10',
  keyboardType: 'DefaultPad',
  clickBgToHide: false
}).then((result) => {
  if(result.ok){
    console.log('确定文本内容：' + result.inputContent)
  } else {
    console.log('点击了取消')
  }
})
```

### <a name="showLoading">4. showLoading - 显示加载中</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
message | String | 加载时文本 | N | 加载中 | -
duration | Number | 交互持久时间(s) | N | 15 | -

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showLoading()
```

### <a name="hideLoading">5. hideLoading - 隐藏加载中</a>

#### 调用参数

  - 无

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.hideLoading()
```

### <a name="showToast">6. showToast - 显示弱提示</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
message | String | 提示文本 | Y | - | -
showIcon | String | 提示图标 | N | 2 | 0 - 显示错误icon <br> 1 - 显示正确icon <br> 2 - 不显示 <br>

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showToast('提示信息')
```

### <a name="showDatePicker">7. showDatePicker - 时间日期选择器</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `type`: `'0'` <br>`title`: `'日期选择'`| `type` String 时间类型，0 - 年月日，1 - 时分， 2 - 年月日+时间 <br> `title` String - 选择框标题 <br> `minimumDate` String - 开始日期/时间 <br> `maximumDate` String - 最大日期/时间 <br> `currentDate` String - 当前日期/时间 <br> `dateFormat` String - 日期/时间格式，如 YYYY-MM-DD HH:mm

#### 返回
- `Promise`
  - `currentDate` String - 选择的日期/时间
  - `actionType` String - 操作类型，0 - 取消，1 - 确定
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 选择日期
api.showDatePicker({
  type: '0',
  title: '选择日期',
  minimumDate: '2019-01-01',
  maximumDate:'2020-01-01', 
  currentDate:'2019-07-14',
  dateFormat:'YYYY-MM-DD'
}).then(result => {
  if (result.actionType == '0') {
    console.log('您已取消')
  } else {
    console.log(`选择日期：${result.currentDate}`)
  }
})

// 选择时间
api.showDatePicker({
  type: '1',
  title: '选择时间',
  minimumDate: '05:00',
  maximumDate: '12:00', 
  currentDate: '10:18',
  dateFormat: 'HH:mm'
}).then(result => {
  if (result.actionType == '0') {
    console.log('您已取消')
  } else {
    console.log(`选择时间：${result.currentDate}`)
  }
})

// 选择日期时间
api.showDatePicker({
    type: '2',
    title: '选择日期时间',
    minimumDate: '2019-01-01 00:00',
    maximumDate: '2020-01-01 00:00', 
    currentDate: '2019-07-14 18:18',
    dateFormat: 'YYYY-MM-DD HH:mm'
}).then(result => {
    if (result.actionType == '0') {
      console.log('您已取消')
    } else {
      console.log(`选择日期时间：${result.currentDate}`)
    }
})
```

### <a name="showActionSheet">8. showActionSheet - 显示选项卡</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `title`: `''` <br> `items`: `[]` <br> `selectedIndex`: `0` | `title` String - 选显卡标题 <br> `items` Array - 选项卡列表内容 <br> `selectedIndex` Number - 默认选中索引值

#### 返回
- `Promise`
  - `selectIndex` String - 选择的结果索引
  - `selectItem` String - 选择的结果数据
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showActionSheet({
  title: '选项卡标题',
  items: ['选项卡1', '选项卡2'],
  selectedIndex: 1
}).then(result => {
  console.log('您选中的是：' + result.selectItem)
}, result => {
  console.log(result.errorMessage)
})
```

### <a name="showPickerView">9. showPickerView - 选择框视图</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `title`: `''` <br> `dataSource`: `[]` <br> `defaultValue`: `[]` | `title` String - 选择框标题 <br> `dataSource` Array - 数据源数组 <br> `defaultValue` Array - 默认选中的数据

#### 返回
- `Promise`
  - `result` Array - 选择的结果数据
  - `actionType` String - 操作类型， 0 - 取消，1 - 确定
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showPickerView({
  defaultValue: [
    { name: '浙江省', value: '001' },
    { name: '杭州市', value: '001001' },
    { name: '拱墅区', value: '001001001' },
  ],

  dataSource: [
    {
      name: '浙江省',
      value: '001',
      children: [
        {
          name: '杭州市',
          value: '001001',
          children: [
            { name: '拱墅区', value: '001001001', children: [] },
            { name: '西湖区', value: '001001002', children: [] },
          ]
        },
        {
          name: '湖州市',
          value: '001002',
          children: [
            { name: '南浔区', value: '001002001', children: [] },
            { name: '吴兴区', value: '001002002', children: [] },
          ]
        }
      ]
    }
  ]
}).then(result => {
  if (result.actionType == '0') {
    console.log('您已取消')
  } else {
    console.log('您选择了：' + result.result)
  }
})

// 选中后返回参数格式，如：

// result: [
//     { name: '浙江省', value: '001' },
//     { name: '杭州市', value: '001001' },
//     { name: '拱墅区', value: '001001001' },
//   ]

```

### <a name="showMask">10. showMask - 显示导航栏遮罩</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | - | `maskColor` String - 16进制ARGB颜色值

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showMask({ maskColor: '#88000000' })
```

### <a name="hideMask">11. hideMask - 隐藏导航栏遮罩</a>

#### 调用参数

- 无

#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.hideMask()
```

### <a name="setLeftMenu">12. setLeftMenu - 设置导航栏左侧按钮</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 可选配置项 | N | `overrideClick`: `false` | `overrideClick` Boolean - 是否自定义左一按钮的返回事件 <br> `menus` Array - 按钮样式设置，见下按钮设置参数附表
keepCallback | Function | 按钮点击回调函数 | N | - | -

**附表：按钮参数**

> ⚠️ 注意：「icontype」, 「icon」, 「text」参数中必选一个，第一优先「icontype」，第二优先「icon」。

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ---- | ---- | ---- | ----
icontype | String | 内置的按钮风格 | N | - | 预选值见icontype附表
icon | String | 按钮icon的url或者base64 | N | - | -
text | String | 按钮文字 | N | - | -
color | String | 16进制ARGB颜色值 | N | - | 文字颜色，当传入「text」时为必选参数

**附表：icontype参数**

| | icontype支持值 | |
---- | ----|  ----|----
add_black | back_black | back_white | circleadd_gray
close_black | close_white | customerservice_gray | customerservice_white | delete_gray
delete_white | edit_gray | edit_white | edittext_black
edittext_white | filter_white | location_gray | logout
message_black | message_white | messageactive_black | messageactive_white
more_black | more_white | scan_white | search_bigwhite
search_gray | search_white | setting_white | shareleft_gray
shareup_white | voicesearch_gray | voicesearch_white


#### 返回
- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setLeftMenu({
  menus: [
    { icontype: 'close_black', text: '关闭', color: '#FF000000', overrideClick: false },
    { icontype: 'more_black', text: '更多', color: '#FF000000', overrideClick: false }
  ]
}, result => {
  console.log(`点击了第${result.index}个按钮`)
})
```

### <a name="showLeftMenu">13. showLeftMenu - 显示导航栏左侧按钮</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ---- | ---- | ---- | ----
show | Boolean | 不设置默认显示 | N | true | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 显示
api.showLeftMenu(true)

// 隐藏
api.showLeftMenu(false)
```

### <a name="setMiddleTitle">14. setMiddleTitle - 设置导航栏标题/图片</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `color`: `'#FF333333'` | `title` String - 标题文本 <br> `color` String - 标题文字的16进制ARGB颜色值 <br> `img` String - 图片url或者base64

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setMiddleTitle({ title:'测试标题', color:'#FF0000FF' })
```

### <a name="setRightMenu">15. setRightMenu - 设置导航栏右侧按钮</a>

- 调用参数同 [setLeftMenu - 设置导航栏左侧按钮](#setLeftMenu)

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setRightMenu({
  menus: [
    { icontype: '', text: '按钮', color: '#FF000000' },
    { icontype: 'more_black', text: '更多', color: '#FF000000' }
  ]
}, result => {
  console.log(`点击了第${result.index}个按钮`)
})
```

### <a name="setBarBottomLineColor">16. setBarBottomLineColor - 设置导航栏底部分隔线颜色</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `color`: `'#FF333333'` | `color` String - 16进制RGB颜色值

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setBarBottomLineColor({ color:'#0000FF' })
```

### <a name="showTitleBar">17. showTitleBar - 显示导航栏</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showTitleBar()
```

### <a name="hideTitleBar">18. hideTitleBar - 隐藏导航栏</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.hideTitleBar()
```

### <a name="hideTitleBar">19. setTitleBarColor - 设置导航栏背景色</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `color`: `'#FF333333'` | `color` String - 16进制RGB颜色值

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setTitleBarColor({ color: '#FF00FF00' })
```

### <a name="getStatusBarHeight">20. getStatusBarHeight - 获取状态栏高度</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `statusBarHeight` String - 返回的状态栏高度
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getStatusBarHeight().then(res => {
  console.log(`状态栏高度：${res.statusBarHeight}`)
})
```

### <a name="getTitleBarHeight">21. getTitleBarHeight - 获取导航栏高度</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `titleBarHeight` String - 返回的导航栏高度
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getTitleBarHeight().then(res => {
  console.log(`导航栏高度：${res.titleBarHeight}`)
})
```

### <a name="setStatusBarStyle">22. setStatusBarStyle - 设置状态栏风格</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `style`: `'0'` | `style` String 0 - default黑色风格, 1-light白色风格

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setTitleBarColor({ color: '#FF00FF00' })
```

### <a name="startPullDownRefresh">23. startPullDownRefresh - 开始下拉刷新</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.startPullDownRefresh()
```

### <a name="stopPullDownRefresh">24. stopPullDownRefresh - 结束下拉刷新</a>

#### 调用参数
- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.stopPullDownRefresh()
```

## <a name="native">客户端native能力管理</a>
<!-- https://tech.antfin.com/docs/2/85102 -->

### <a name="addNotifyListener">1. addNotifyListener - 添加事件监听</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置参数 | Y | `keep`: `'true'` | `name` String - 通知名称 <br> `keep` String - 是否在 ViewController 的生命周期内一直监听该通知
keepCallback | Function | 回调函数 | N | - | -

#### 返回

- `result: {}`：回调函数带入的参数，对应为事件的消息。

#### 使用案例

```javascript
api.addNotifyListener({
  name: 'NEBULANOTIFY_TEST_EVENT' // H5 发出的事件必须以 NEBULANOTIFY_ 开通进行监听
  keep: true
}, (result) => {
  console.log('发送监听:' + JSON.stringify(result));
})
```

### <a name="rpc">2. rpc - 远程过程调用</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
operationType | String | 远程请求名称 | Y | - | -
requestData | Object | 远程请求参数 | N | - | key-value形式
options | Object | 远程调用选项 | Y | - | `timeout` Number - RPC 超时时间，单位为秒（默认20秒） <br> `headers` Object - RPC 请求设置的 headers <br> `loading` Boolean - 是否显示加载层

#### 返回

- `result: { error }`：回调函数带入的参数。

**附表：错误码描述**

错误码 | 描述
---- | ----
10 | 网络错误
11 | 请求超时
其他 | 由 mobilegw 网关定义

#### 使用案例

```javascript
api.rpc('alipay.client.xxxx', {}, {
  timeout: 20,
  headers: {},
  loading: true
}).then(result => {
  console.log(result)
})
```

### <a name="debugMode">3. debugMode - 设置webview的usagent模式</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
usagent | String | 设置webview的usagent模式 | Y | - | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 开启调试模式
api.debugMode('debug')

// 关闭调试模式
api.debugMode('')
```

### <a name="showContactList">4. showContactList - 打开通讯录列表</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 通讯录配置项 | Y | - | `maxSeletedNum` String - 最大可选数（默认1） <br> `contactList` Array - 优先展示联系人列表

#### 返回

- `Promise`
  - `data` Array - 选择联系人信息
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 选择单个联系人
api.showContactList({ maxSeletedNum: '1' }).then(result => {
  console.log(result.data)
}, result => {
  console.log(result.errorMessage)
})

// 选择多个联系人
api.showContactList({ maxSeletedNum: '2' }).then(result => {
  console.log(result.data)
}, result => {
  console.log(result.errorMessage)
})

// 自定义联系人列表
api.showContactList({
  maxSeletedNum: '2',
  contactList: [{ 'name': '中国移动', 'phone': '10086', 'phones': ['10086', '10000'] }]
}).then(result => {
  console.log(result.data)
}, result => {
  console.log(result.errorMessage)
})
```

### <a name="screenShots">5. screenShots - 截屏</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
type | String | 截屏模式 | Y | - | 0 - 默认全屏截屏 <br> 1 - WebView截屏 <br> 2 - WebView长图截屏

#### 返回

- `Promise`
  - `imageResult` String - Base64图片数据
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.screenShots('0').then(result => {
  console.log(result.imageResult)
})
```
### <a name="copyToClipboard">6. copyToClipboard - 设置剪贴板</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
copyString | String | 复制到手机系统剪切板的字符串 | Y | - |-

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.copyToClipboard('我是复制内容').then(result => {
  console.log('复制成功')
})
```

### <a name="sendSMS">7. sendSMS - 发送短信</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 通讯录配置项 | Y | - | `mobileNo` String - 发送目标手机号码 <br> `content` String - 发送文本内容

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.sendSMS({
  mobileNo: '10086',
  content: '给我查查话费余额'
}).then(result => {
  console.log('发送给运营商成功')
}, result => {
  console.log(result.errorMessage)
})
```

### <a name="sendMail">8. sendMail - 发送邮件</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 发送邮件配置项 | Y | - | `subject` String - 主题 <br> `messageBody` String - 邮件内容 <br> `toRecipients` Array - 收件人列表 <br> `ccRecipients` Array - 抄送人列表

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.sendMail({ 
  subject:'标题',
  messageBody:'正文内容',
  toRecipients:['wangjm@belink.com'],
  ccRecipients:['Xiemy@belink.com']
}).then(result => {
  console.log('发送成功')
}, result => {
  console.log(result.errorMessage)
})
```

### <a name="showCameraImagePicker">9. showCameraImagePicker - 打开相册/拍照</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `imgBase64Data` String - 结果图片的Base64
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showCameraImagePicker().then(result => {
  console.log(result)
})
```

### <a name="getLocationInfo">10. getLocationInfo - 获取定位信息</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `latitude` Number - 纬度
  - `longitude` Number - 纬度
  - `country` String - 国家
  - `administrativeArea` String - 省份
  - `locality` String - 城市
  - `subLocality` String - 区
  - `thoroughfare` String - 街
  - `fullAddress` String - 详细地址
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getLocationInfo().then(result => {
  console.log(result)
})
```

### <a name="setBrightness">11. setBrightness - 设置屏幕亮度</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
brightParams | Number | 亮度值 | Y | - | 取值范围0(最暗)-1(最亮)

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.setBrightness(0.8)
```

### <a name="recoverBrightness">12. recoverBrightness - 恢复屏幕亮度</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.recoverBrightness()
```

### <a name="downloadPdf">13. downloadPdf - 下载PDF</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
url | String | pdf下载地址 | Y | - | -
#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.downloadPdf('https://abc.com/cheetah.pdf')
```

### <a name="chinese2MandarinLatin">14. chinese2MandarinLatin - 中文转大写拼音</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
chineseString | String | 待转中文字符串 | Y | - | -

#### 返回

- `Promise`
  - `resultString` String - 转换结果
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.chinese2MandarinLatin('转账汇款').then(result => {
  console.log(result.resultString)
})
```

### <a name="startOtherApp">15. startOtherApp - 打开第三方APP</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 基本配置项 | Y | - | `schemeURL` String - iOS - 需要跳转的第三方APP schemeURL <br> `packageName` String - Android - 需要跳转的第三方APP包名

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 打开微信
api.startOtherApp({ schemeURL: 'weixin://', packageName: 'com.tencent.mm' })
```

### <a name="availableApplePay">16. availableApplePay - 检测是否支持ApplePay（iOS）</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `result` Boolean - 是否支持applepay

#### 使用案例

```javascript
api.availableApplePay().then(result => {
  console.log('是否支持ApplePay：' + result)
})
```

### <a name="notificationStatus">17. notificationStatus - 检测推送通知权限</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `notificationStatus` Boolean - 是否开启推送通知权限

#### 使用案例

```javascript
api.notificationStatus().then(notificationStatus => {
  console.log('是否开启推送通知权限：' + notificationStatus)
})
```

### <a name="availableLocationServices">18. availableLocationServices - 检测定位权限</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `isLocationServicesEnabled` Boolean - 是否有定位权限

#### 使用案例

```javascript
api.notificationStatus().then(isLocationServicesEnabled => {
  console.log('是否有定位权限：' + isLocationServicesEnabled)
})
```

### <a name="openLocationSettings">19. openLocationSettings - 打开定位设置</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `actionType` Boolean
    - `false` - 弹窗点击了取消
    - `true` - 弹窗点击了开启
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openLocationSettings().then(result => {
  if(result.actionType){
    console.log('开启定位')
  } else {
    console.log('取消操作')
  }
})
```

### <a name="openNativeWebBrowser">20. openNativeWebBrowser - 打开系统浏览器</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
url | String | 要加载的url | Y | - | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openNativeWebBrowser('http://www.baidu.com/')
```

### <a name="addCalendarReminder">21. addCalendarReminder - 增加日历提醒</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 基本配置项 | Y | - | `title` String - 标题（必填） <br> `description` String - 描述 <br> `dtStart` Number - 开始时间戳（必填），如1562232635000 <br> `dtEnd` Number - 结束时间戳（必填） <br> `hasAlarm` Number - 是否需要提醒，0 - 不提醒， 1 - 提醒 <br> `previousMinutes` Number - 提醒前分钟数（设置需要提醒时必传）<br> `appUrl` String - 链接

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.addCalendarReminder({
  title: '测试API',
  description: '测试API描述' ,
  dtStart: 1562232635000,
  dtEnd: 1562232635000,
  hasAlarm: 1,
  previousDate: 1562232635000,
  appUrl: 'weixin://'
})
```

### <a name="callPhoneNumber">22. callPhoneNumber - 拨打电话</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
phoneNumber | String | 要拨打的号码 | Y | - | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.callPhoneNumber('10086')
```

### <a name="isInstallApp">23. isInstallApp - 检测是否已安装APP</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 基本配置项 | Y | - | `schemeURL` String - iOS - 需要跳转的第三方APP schemeURL <br> `packageName` String - Android - 需要跳转的第三方APP包名

#### 返回

- `Promise`
  - `installed` Boolean
    - `false` - 未安装
    - `true` - 已安装
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 检测微信是否安装
api.isInstallApp({ schemeURL: 'weixin://', packageName: 'com.tencent.mm' }).then(result => {
  if (result.installed) {
    console.log('微信APP已安装')
  } else {
    console.log('微信APP尚未安装')
  }
})
```

### <a name="availableGPS">24. availableGPS - 检测GPS是否可用</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `availableGPS` Boolean - GPS是否可用

#### 使用案例

```javascript
api.availableGPS().then(availableGPS => {
  console.log('GPS是否可用：' + availableGPS)
})
```

### <a name="availableLocalAuthentication">25. availableLocalAuthentication - 检测本地指纹/面容识别是否可用</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `available` Boolean - 本地指纹/面容识别是否可用

#### 使用案例

```javascript
api.availableLocalAuthentication().then(available => {
  console.log('本地指纹/面容识别是否可用：' + available)
})
```

### <a name="startLocalAuthentication">26. startLocalAuthentication - 开始本地指纹/面容识别</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 基本配置项 | Y | `showOtherButton`: `false` | `showOtherButton` Boolean - 是否显示其他验证按钮

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

**附表：识别错误码**

错误码 | 描述
---- | ----
0    | 验证成功
5101 | 指纹验证失败
5102 | 用户主动取消
5103 | 指纹超过验证次数
5104 | 指纹改变
5105 | 其他情况
5106 | 点击其他验证按钮

#### 使用案例

```javascript
api.startLocalAuthentication({ showOtherButton: true }).then(res => {
  console.log('验证成功')
}, res => {
  console.log(`验证失败: [${res.error}][${res.errorMessage}]`)
})
```

### <a name="getLocalAuthenticationOnOff">27. getLocalAuthenticationOnOff - 获取本地指纹/面容识别开启</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
type | String | 开关标识 | Y | - | `login` - 登录，`pay` - 支付

#### 返回

- `Promise`
  - `result` Boolean - 是否开启
  - `accountMobile` String - 当前开启的用户手机号
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 登录场景
api.getLocalAuthenticationOnOff('login').then(res => {
  console.log(res.result ? '开启' : '未开启');
})

// 支付场景
api.getLocalAuthenticationOnOff('pay').then(res => {
  console.log(res.result ? '开启' : '未开启');
})
```

### <a name="setLocalAuthenticationOnOff">28. setLocalAuthenticationOnOff - 设置本地指纹/面容识别开启</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
type | String | 开关标识 | Y | - | `login` - 登录，`pay` - 支付

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 登录场景
api.setLocalAuthenticationOnOff('login').then(res => {
  console.log('设置成功')
})

// 支付场景
api.setLocalAuthenticationOnOff('pay').then(res => {
  console.log('设置成功')
})
```

### <a name="clearLocalAuthenticationOnOff">29. clearLocalAuthenticationOnOff - 清除本地指纹/面容识别开启</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
type | String | 开关标识 | Y | - | `login` - 登录，`pay` - 支付

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 登录场景
api.clearLocalAuthenticationOnOff('login').then(res => {
  console.log('清理成功')
})

// 支付场景
api.clearLocalAuthenticationOnOff('pay').then(res => {
  console.log('清理成功')
})
```

### <a name="setFingerPrintToken">30. setFingerPrintToken - 设置指纹/面容识别token</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
token | String | 设置指纹会话令牌 | Y | - | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.setFingerPrintToken('TOKEN0000000000001').then(res => {
  console.log('设置成功')
})
```

### <a name="getGestureOnOff">31. getGestureOnOff - 获取手势开启</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `result` Boolean - 是否开启
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.getGestureOnOff().then(res => {
  console.log('是否开启：' + res.result)
})
```

### <a name="getGesturePathShowState">32. getGesturePathShowState - 获取手势路径是否显示</a>

- 无

#### 返回

- `Promise`
  - `result` Boolean - 手势路径是否显示
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.getGesturePathShowState().then(res => {
  console.log('手势路径是否显示：' + res.result)
})
```

### <a name="setGesturePathShowState">33. setGesturePathShowState - 设置手势路径是否显示</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
gesturePathShow | Boolean | 手势路劲是否显示 | Y | - | true显示，false不显示

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.setGesturePathShowState(true).then(res => {
  console.log('设置成功')
})
```

### <a name="pushGestureSetting">34. pushGestureSetting - 打开手势设置</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
type | String | 手势开启方式 | Y | - | `'1'` - 进入设置手势密码，`'2'` - 进入修改手势密码，'‘，`'3'` - 清除手势密码

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 设置手势密码
api.pushGestureSetting('1').then(res => {
  console.log('设置成功')
})

// 修改手势密码
api.pushGestureSetting('2').then(res => {
  console.log('修改成功')
})

// 清除手势密码
api.pushGestureSetting('3').then(res => {
  console.log('清除成功')
})
```

### <a name="setGestureToken">35. setGestureToken - 设置手势token</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
token | String | 设置手势令牌 | Y | - | -

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.setGestureToken('TOKEN0000000000002').then(res => {
  console.log('设置成功')
})
```

## <a name="user">用户信息管理</a>

### <a name="getSessionID">1. getSessionID - 获取用户会话ID</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `sessionID` String - 缓存的sessionID

#### 使用案例
```javascript
api.getSessionID().then(sessionID => {
  if (!sessionID) {
    console.log('用户尚未登录')
  }
  console.log(sessionID)
})
```

### <a name="login">2. login - 打开登录对话框</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 登录选项 | N | - | `pageUrl` String - 登录完成后根据离线包url执行相应的处理 <br> `currentMobile` String - 登录页面预设账号（手机号）

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 仅登录
api.login().then(result => console.log(JSON.stringify(result)))

// 登录后跳转
api.login({
  pageUrl: '/demo_ynet/index/index.html'
}).then(result =>
  console.log(JSON.stringify(result))
)
```

### <a name="getUserInfo">3. getUserInfo - 获取用户信息</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `userInfo` Object - 用户信息
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.getUserInfo()
  .then(
    result => console.log(JSON.stringify(result)),
    result => console.log(result.errorMessage)
  )
```

### <a name="updateUserInfo">4. updateUserInfo - 更新用户信息</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.updateUserInfo().then(
  result => alert(JSON.stringify(result))
)
```

### <a name="cleanUserInfo">5. cleanUserInfo - 清除用户信息并退出登录</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
api.cleanUserInfo().then(
  result => alert(JSON.stringify(result))
)
```

## <a name="third">第三方管理</a>

### <a name="openFaceRecognition">1. openFaceRecognition - 打开人脸识别</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 人脸识别参数 | Y | - | `idcard_name` String - 用户姓名 <br> `idcard_number` String - 用户身份证

#### 返回

- `Promise`
  - `system` String - 系统平台
  - `identification_result` String - 结果码
  - `error` String - 错误码，0 - 成功，5204 - 相机无权限
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openFaceRecognition({
  idcard_name: '王欢',
  idcard_number: '420114198810182810'
}).then(result => {
  if (result.identification_reslut == '0') {
    console.log('识别成功')
  } else {
    console.log('识别失败')
  }
}, result => {
  console.log(result.errorMessage)
})
```

### <a name="openQRCodeScanner">2. openQRCodeScanner - 打开二维码扫描</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `codeString` String - 扫码内容
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openQRCodeScanner().then(
  result => {
    console.log(result.codeString)
  })
```

### <a name="showSharePad">3. showSharePad - 打开分享面板</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 分享面板参数 | Y | - | `showShareType` String - 面板内容定义（必填），见下分享面板附表 <br> `title` String - 标题（必填）<br> `thumbUrl` String - 缩略图url（必填） <br> `desc` String - 描述信息（必填）<br> `content` String - 内容（必填）<br> `contentType` String - 内容类型 `text|image|url`

**附表： 分享面板设置参数对照表**

> 选择多个参数的时候，请用 `|` 进行连接

编号 | 应用 
---- | ----
1 | 微信
2 | 朋友圈
3 | 短信
4 | 复制链接
5 | 浏览器
6 | 支付宝联系人
7 | 生活圈
8 | QQ好友
9 | QQ空间
10 | 钉钉会话

#### 返回

- `Promise`
  - `shareType` String - 点击的分享平台，编号与入参一致
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
 api.showSharePad({
  showShareType: '1|2|3|4',
  title: '砸金蛋活动',
  desc: '砸金蛋活动描述',
  content: 'http://www.baidu.com',
  contentType: 'url',
  thumbUrl: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg'
}).then(
  result => console.log(JSON.stringify(result)),
  result => {
    console.log(result.errorMessage)
  }
)
```

### <a name="shareTo">4. shareTo - 直接分享</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 分享面板参数 | Y | - | `showShareType` String - 面板内容定义（必填），见上一节分享面板附表 <br> `title` String - 标题（必填）<br> `thumbUrl` String - 缩略图url（必填） <br> `desc` String - 描述信息（必填）<br> `content` String - 内容（必填）<br> `contentType` String - 内容类型 `text|image|url`

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.shareTo({
  title: '砸金蛋活动标题',
  desc: '砸金蛋活动描述',
  contentType: 'url',
  content: 'http://www.baidu.com', 
  thumbUrl: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg',
  showShareType: '1'
}).then(result => console.log(JSON.stringify(result)))
```

### <a name="showKeyboard">5. showKeyboard - 显示安全键盘</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 可选配置项 | N | - | `max` Number - 最大长度，0或空则为不限制 <br> `keyboardType` String - 键盘类型（必填），0 - 英文键盘，1 - 数字键盘 <br> `isEncry` Boolean - 是否加密（必填） <br> `randomKey` String - 指定加密随机数，选择加密则必传 <br> `regular` String - 输入正则表达式，来匹配需要的输入格式
keepCallback | Function | 输入事件操作回调函数 | N | - | 返回参数如下

#### 返回

- `Promise`
  - `value` String - 加密的为后的数据，不加密为正常数据
  - `md5` String - 输入字符的md5
  - `inputSimple` Boolean - 是否为低强度密码
  - `inputLevel` Number - 密码组合个数
    - > 注：完全为空，返回0。仅有数字，字符或特殊符号为1。例：”1234” ”abcd” “%#@!”有两种组合返回2。例:”12bd” “12@#” “ab@#”有三种组合返回3。例：”1@b” “1@2ab3”
  - `isMatch` Boolean - 是否匹配正则，无正则返回true
  - `length` Number - 输入的字符长度
  - `action` String - 键盘操作，hide - 键盘隐藏， input - 输入操作
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
// 打开英文键盘
api.showKeyboard({
  max: 10,
  keyboardType: '0',
  isEncry: false,
  curText: '',
  randomKey: '',
  regular: ''
}, result => console.log(result.action))

// 打开数字键盘
api.showKeyboard(
  {max:10, keyboardType:'1', isEncry:false, curText:'', randomKey:'', regular:''},
  result => alert(result.action)
)
```

### <a name="hideKeyboard">6. hideKeyboard - 关闭安全键盘</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.hideKeyboard()
```

### <a name="showPaymentPad">7. showPaymentPad - 显示支付密码键盘</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 支付面板选项 | Y | - | `styleType` String - 支付类型，0 - 通讯录转帐，1 - 银行卡转账 <br> `randomKey` String - 指定加密随机数（必填） <br> `accountName` String - 收款方姓名 <br> `accountPhoneNumOrCardId` String - 手机号或者银行卡 <br> `accountBankLogo` String - 银行卡logo的url <br> `cardNum` Array - 卡号对象的数组 <br> `money` String - 金额 <br> `contents` Array - 金额为空时显示，对象的数组

#### 返回

- `Promise`
  - `value` String - 加密后的数据
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showPaymentPad({
  accountBankLogo: 'YNET', // 猎豹Logo对应字符串 'YNET'
  randomKey: '',
  styleType: '1',
  money: '3333',
  accountName: 'xiaohua',
  accountPhoneNumOrCardId: '138 0000 1234',
  contents:[{content:'222',size:'32',color:'#666666'}]})
.then(
  result => {
    console.log(result.value);
  },
  result => console.log(result.errorMessage)
)
```

### <a name="showOCRIDCard">8. showOCRIDCard - 打开ocr识别身份证</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
scanType | String | 扫描正反面 | Y | - | 0 正面， 1 反面

#### 返回（正面）

- `Promise`
  - `certName` String - 姓名
  - `certNo` String - 公民身份号码
  - `IDCardFrontImage` String - 正面扫描的图片（Base64格式）
  - `gender` String - 性别
  - `nation` String - 民族
  - `birth` String - 出生（格式：20190711）
  - `address` String - 住址
  - `error` String - 错误码， 5201 - OCR数据有误，5204 - 相机无权限
  - `errorMessage` String - 错误信息

#### 返回（反面）

- `Promise`
  - `issue` String - 签发机关
  - `validity` String - 有效期限
  - `IDCardBackImage` String - 背面扫描的图片（Base64格式）
  - `error` String - 错误码， 5201 - OCR数据有误，5204 - 相机无权限
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 扫描身份证正面
api.showOCRIDCard('0').then(result => {
  console.log(result)
})

// 扫描身份证反面
api.showOCRIDCard('1').then(result => {
  console.log(result)
})
```

### <a name="showOCRBankCard">9. showOCRBankCard - 打开ocr识别银行卡</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `cardNumber` String - 银行卡号
  - `cardImage` String - 银行卡扫描图片（Base64格式）
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.showOCRBankCard().then(
  result => {
    console.log(result.cardNumber)
  })
```

### <a name="checkAppUpdate">10. checkAppUpdate - 检查APP版本更新</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
silent | String | 是否静默查询 | Y | - | 0 - 弹窗提示，1 - 静默查询

#### 返回

- `Promise`
  - `result` String - 查询结果，0 - 不需要更新，1 - 需要更新
  - `updateMsg` String - 更新内容
  - `downloadUrl` String - 下载地址
  - `upgradeVersion` String - 升级版本
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例
```javascript
// 弹窗查询
api.checkAppUpdate('0').then((result) => console.log(JSON.stringify(result)))

// 静默查询
api.checkAppUpdate('1').then((result) => console.log(JSON.stringify(result)))
```

## <a name="business">业务能力管理</a>

### <a name="openBankList">1. openBankList - 打开银行列表</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `unionBankNo` String - 银行编号，如：中国银行为104100000004
  - `bankType` String - 银行类别码，如：中国银行为104
  - `bankName` String - 银行全称
  - `flag` String - 是否集合银行标识
  - `bankChannel` String - 银行渠道，如：中国银行为`IBPS,HVPS,BEPS,TLTP,NBTC`
  - `firstHead` String - 银行拼音全称简写首字母
  - `firstAllHead` String - 银行拼音全称简写
  - `pinyin` String - 银行拼音全称
  - `detailUrl` String - 详细url地址
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openBankList().then(
  result => {
    console.log(result)
  }
)
```

### <a name="pushCityListView">2. pushCityListView - 打开银行网点城市列表</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置项 | Y | - | `areaType` Number - 地区类型，1-境内地区，2-境外地区 <br> `areaMax` Number - 最大可选择地区数（必填） <br> `selectedAreaList` Array - 数据格式为 `[{'areaCode': '', 'areaName': ''}`

#### 返回

- `Promise`
  - `resultCode` String - 操作结果，1代表操作成功
  - `selectedAreaList` Array - 选择地区列表
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.pushCityListView({
  areaType: 1,
  areaMax: '2',
  selectedAreaList: []
}).then(
  result => {
    console.log(result.selectedAreaList)
  }
)
```

### <a name="getVersionInfo">3. getVersionInfo - 获取APP内所有版本信息</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
versionKey | String | 不同的取值的key | Y | - | 通过不同参数，分别获取menuVersionList、pageFloorVersionList、menuGroupVersion、newAppVersion的版本信息

#### 返回

- `Promise`
  - `result` String/Array - 返回版本信息或者版本列表
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getVersionInfo('newAppVersion').then(data => console.log(JSON.stringify(data)))
```

### <a name="getServerDate">4. getServerDate - 获取服务端时间</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `resultDate` String - 服务端时间
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getServerDate().then(data => console.log(data.resultDate))
```

### <a name="getCurrentStyle">5. getCurrentStyle - 获取当前APP风格</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `resultStyle` String - App风格
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getCurrentStyle().then(data => console.log(data.resultStyle))
```

### <a name="getServerUrl">6. getServerUrl - 获取服务器地址</a>

#### 调用参数

- 无

#### 返回

- `Promise`
  - `imgServerUrl` String - 图片服务器地址
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.getServerUrl().then(data => console.log(data.imgServerUrl))
```

### <a name="trackEvent">7. trackEvent - 数据采集埋点</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
eventId | String | 事件ID | Y | - | -
data | Object | 埋点数据 | N | - | -

#### 返回

- `Promise`
  - `ok` Boolean - 埋点成功
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

### <a name="openNavigationApp">8. openNavigationApp - 打开原生网点导航路径功能</a>

#### 调用参数

名称 | 类型 | 描述 | 必选 | 默认值 | 备注
---- | ---- | ----| ---- | ---- | ----
options | Object | 配置项 | Y | - | `name` String - 目的地地名 <br> `latitude` String - 纬度（必填） <br> `longitude` String - 经度（必填）

#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.openNavigationApp({
  name: '北京市',
  latitude: '29.5703930000',
  longitude: '106.5727140000'
}).then(
  data => console.log(data),
  result => console.log(result.errorMessage)
)
```

### <a name="pushBankbranchView">9. pushBankbranchView - 打开银行网点</a>

#### 调用参数

- 无
#### 返回

- `Promise`
  - `error` String - 错误码
  - `errorMessage` String - 错误信息

#### 使用案例

```javascript
api.pushBankbranchView()
```