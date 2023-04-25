import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const vueSyncPath = [
  ['/route/pushWindow', 'route/pushWindow'],
  ['/route/clearHistory', 'route/clearHistory'],
  ['/route/closeToPage', 'route/closeToPage'],
  ['/route/closeToHomePage', 'route/closeToHomePage'],
  ['/route/closePage', 'route/closePage'],
  ['/cache/sessionStorage', 'cache/sessionStorage'],
  ['/cache/localStorage', 'cache/localStorage'],
  ['/device/getDeviceAndAppInfo', 'device/getDeviceAndAppInfo'],
  ['/device/getDeviceFingerprint', 'device/getDeviceFingerprint'],
  ['/device/getBatteryInfo', 'device/getBatteryInfo'],
  ['/business/openBankList', 'business/openBankList'],
  ['/business/pushCityListView', 'business/pushCityListView'],
  ['/business/openNavigationApp', 'business/openNavigationApp'],
  ['/business/pushBankbranchView', 'business/pushBankbranchView'],
  ['/business/trackEvent', 'business/trackEvent'],
  ['/business/getVersionInfo', 'business/getVersionInfo'],
  ['/native/addCalendarReminder', 'native/addCalendarReminder'],
  ['/native/availableApplePay', 'native/availableApplePay'],
  ['/native/availableLocationServices', 'native/availableLocationServices'],
  ['/native/callPhoneNumber', 'native/callPhoneNumber'],
  ['/native/chinese2MandarinLatin', 'native/chinese2MandarinLatin'],
  ['/native/copyToClipboard', 'native/copyToClipboard'],
  ['/native/debugMode', 'native/debugMode'],
  ['/native/downloadPdf', 'native/downloadPdf'],
  ['/native/getLocationInfo', 'native/getLocationInfo'],
  ['/native/notificationStatus', 'native/notificationStatus'],
  ['/native/openNativeWebBrowser', 'native/openNativeWebBrowser'],
  ['/native/screenShots', 'native/screenShots'],
  ['/native/sendSMS', 'native/sendSMS'],
  ['/native/setBrightness', 'native/setBrightness'],
  ['/native/showCameraImagePicker', 'native/showCameraImagePicker'],
  ['/native/showContactList', 'native/showContactList'],
  ['/native/startOtherApp', 'native/startOtherApp'],
  ['/native/isInstallApp', 'native/isInstallApp'],
  ['/native/availableGPS', 'native/availableGPS'],
  ['/native/startLocalAuthentication', 'native/startLocalAuthentication'],
  ['/native/pushGestureSetting', 'native/pushGestureSetting'],
  ['/user/getSessionID', 'user/getSessionID'],
  ['/user/getUserInfo', 'user/getUserInfo'],
  ['/user/login', 'user/login'],
  ['/third/openFaceRecognition', 'third/openFaceRecognition'],
  ['/third/openQRCodeScanner', 'third/openQRCodeScanner'],
  ['/third/showSharePad', 'third/showSharePad'],
  ['/third/showKeyboard', 'third/showKeyboard'],
  ['/third/showPaymentPad', 'third/showPaymentPad'],
  ['/third/showOCRIDCard', 'third/showOCRIDCard'],
  ['/third/checkAppUpdate', 'third/checkAppUpdate'],
  ['/interactive/base', 'interactive/base'],
  ['/interactive/showActionSheet', 'interactive/showActionSheet'],
  ['/interactive/showDatePicker', 'interactive/showDatePicker'],
  ['/interactive/showPickerView', 'interactive/showPickerView'],
  ['/interactive/showMask', 'interactive/showMask'],
  ['/interactive/setLeftMenu', 'interactive/setLeftMenu'],
  ['/interactive/startPullDownRefresh', 'interactive/startPullDownRefresh'],
  ['/test', 'index/test'],
  ['/', 'index']
]

const routerMap = vueSyncPath.map(item=>{
  return {
    path: item[0],
    component: () => import(`../pages/${item[1]}`)
  }
})

export default new Router({
  routes: [
    ...routerMap,
    { path: '*', redirect: '/' }
  ],
})
