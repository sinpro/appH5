<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleClearHistory">清除webview历史对象</md-button>
    <md-button @click="handleCloseToPage">返回至指定页面</md-button>
    <md-button @click="handleAddNotifyListener">添加事件监听</md-button>

    <md-button @click="handleRpc">远程过程调用</md-button>

    <md-button @click="handleDebugMode">设置webview的usagent模式</md-button>
    <md-button @click="handleShowContactList">打开通讯录列表</md-button>
    <md-button @click="handleScreenShots">截屏</md-button>
    <md-button @click="handleCopyToClipboard">设置剪贴板</md-button>
    <md-button @click="handleSendSMS">发送短信</md-button>
    <md-button @click="handleSendMail">发送邮件</md-button>
    <md-button @click="handleShowCameraImagePicker">打开相册/拍照</md-button>
    <md-button @click="handleGetLocationInfo">获取定位信息</md-button>
    <md-button @click="handleSetBrightness">设置屏幕亮度</md-button>
    <md-button @click="handleRecoverBrightness">恢复屏幕亮度</md-button>
    <md-button @click="handleDownloadPdf">下载PDF</md-button>
    <md-button @click="handleChinese2MandarinLatin">中文转大写拼音</md-button>
    <md-button @click="handleStartOtherApp">打开第三方APP</md-button>
    <md-button @click="handleAvailableApplePay">检测是否支持ApplePay</md-button>
    <md-button @click="handleNotificationStatus">检测推送通知权限</md-button>
    <md-button @click="handleAvailableLocationServices">检测定位权限</md-button>
    <md-button @click="handleOpenLocationSettings">打开定位设置</md-button>
    <md-button @click="handleOpenNativeWebBrowser">打开系统浏览器</md-button>
    <md-button @click="handleAddCalendarReminder">增加日历提醒</md-button>
    <md-button @click="handleCallPhoneNumber">拨打电话</md-button>
    <md-button @click="handleIsInstallApp">检测是否已安装APP</md-button>
    <md-button @click="handleAvailableGPS">检测GPS是否可用</md-button>
    <md-button @click="handleAvailableLocalAuthentication">检测本地指纹/面容识别是否可用</md-button>
    <md-button @click="handleStartLocalAuthentication">开始本地指纹/面容识别</md-button>
    <md-button @click="handleGetLocalAuthenticationOnOff">获取本地指纹/面容识别开启</md-button>
    <md-button @click="handleSetLocalAuthenticationOnOff">设置本地指纹/面容识别开启</md-button>
    <md-button @click="handleClearLocalAuthenticationOnOff">清除本地指纹/面容识别开启</md-button>
    <md-button @click="handleSetFingerPrintToken">设置指纹/面容识别token</md-button>
    <md-button @click="handleGetGestureOnOff">获取手势开启</md-button>
    <md-button @click="handleGetGesturePathShowState">获取手势路径是否显示</md-button>
    <md-button @click="handleSetGesturePathShowState">设置手势路径是否显示</md-button>
    <md-button @click="handlePushGestureSetting">打开手势设置</md-button>
    <md-button @click="handleSetGestureToken">设置手势token</md-button>
    <md-button>到底啦~</md-button>
    <md-button>到底</md-button>
  </div>
</template>
  
  <script>
import { Button } from "mand-mobile";
/**
 *
 */
export default {
  components: {
    [Button.name]: Button
  },
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  // 页面所需数据
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {},
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {
    /**
     * 清除webview历史对象
     */
    handleClearHistory() {
      app.api.clearHistory();
    },
    /**
     * 返回至指定页面
     * @param pageIndex Number/String Number/String  返回页面层级（如-2为返回两页）或匹配返回目标url
     * @param data Object 返回参数
     */
    handleCloseToPage() {
      app.api.closeToPage(-1, {
        a: "foo",
        bar: 1
      });

      // or

      // app.api.closeToPage("https://www.abc.com/page-1.html", {
      //   a: "foo",
      //   bar: 1
      // });
    },
    /**
     * 添加事件监听
     * @param options Object 配置参数
     * @param keepCallback Function 回调函数
     */
    handleAddNotifyListener() {
      app.api.addNotifyListener(
        {
          name: "NEBULANOTIFY_TEST_EVENT", // H5 发出的事件必须以 NEBULANOTIFY_ 开通进行监听
          keep: true
        },
        result => {
          console.log("发送监听:" + JSON.stringify(result));
        }
      );
    },
    /**
     * 远程过程调用
     * @param options Object 远程调用选项
     * @param requestData Object 远程请求参数
     * @param operationType String 远程请求名称
     */
    handleRpc() {
      app.api
        .rpc(
          "alipay.client.xxxx",
          {},
          {
            timeout: 20,
            headers: {},
            loading: true
          }
        )
        .then(result => {
          console.log(result);
        });
    },
    /**
     * 设置webview的usagent模式
     * @param usagent String 设置webview的usagent模式
     */
    handleDebugMode() {
      // 开启调试模式
      // app.api.debugMode("debug");
      // 关闭调试模式
      // app.api.debugMode("");
    },
    /**
     * 打开通讯录列表
     * @param options Object 通讯录配置项
     */
    handleShowContactList() {
      // 选择单个联系人
      // app.api.showContactList({ maxSeletedNum: "1" }).then(
      //   result => {
      //     console.log(result.data);
      //   },
      //   result => {
      //     console.log(result.errorMessage);
      //   }
      // );

      // // 选择多个联系人
      // app.api.showContactList({ maxSeletedNum: "2" }).then(
      //   result => {
      //     console.log(result.data);
      //   },
      //   result => {
      //     console.log(result.errorMessage);
      //   }
      // );

      // 自定义联系人列表
      app.api
        .showContactList({
          maxSeletedNum: "2",
          contactList: [
            { name: "中国移动", phone: "10086", phones: ["10086", "10000"] }
          ]
        })
        .then(
          result => {
            console.log(result.data);
          },
          result => {
            console.log(result.errorMessage);
          }
        );
    },
    /**
     * 截屏
     * @param type String 截屏模式
     */
    handleScreenShots() {
      app.api.screenShots("0").then(result => {
        console.log(result.imageResult);
      });
    },
    /**
     * 设置剪贴板
     * @param copyString String 复制到手机系统剪切板的字符串
     */
    handleCopyToClipboard() {
      app.api.copyToClipboard("我是复制内容").then(result => {
        console.log("复制成功");
      });
    },
    /**
     * 发送短信
     * @param options Object 通讯录配置项
     */
    handleSendSMS() {
      app.api
        .sendSMS({
          mobileNo: "10086",
          content: "给我查查话费余额"
        })
        .then(
          result => {
            console.log("发送给运营商成功");
          },
          result => {
            console.log(result.errorMessage);
          }
        );
    },
    /**
     * 发送邮件
     * @param options Object 发送邮件配置项
     */
    handleSendMail() {
      app.api
        .sendMail({
          subject: "标题",
          messageBody: "正文内容",
          toRecipients: ["wangjm@belink.com"],
          ccRecipients: ["Xiemy@belink.com"]
        })
        .then(
          result => {
            console.log("发送成功");
          },
          result => {
            console.log(result.errorMessage);
          }
        );
    },
    /**
     * 打开相册/拍照
     */
    handleShowCameraImagePicker() {
      app.api.showCameraImagePicker().then(result => {
        console.log(result);
      });
    },
    /**
     * 获取定位信息
     */
    handleGetLocationInfo() {
      app.api.getLocationInfo().then(result => {
        console.log(result);
      });
    },
    /**
     * 设置屏幕亮度
     * @param brightParams Number 亮度值
     */
    handleSetBrightness() {
      app.api.setBrightness(0.8);
    },
    /**
     * 恢复屏幕亮度
     */
    handleRecoverBrightness() {
      app.api.recoverBrightness();
    },
    /**
     * 下载PDF
     * @param url String pdf下载地址
     */
    handleDownloadPdf() {
      app.api.downloadPdf("https://abc.com/cheetah.pdf");
    },
    /**
     * 中文转大写拼音
     * @param chineseString String 待转中文字符串
     */
    handleChinese2MandarinLatin() {
      app.api.chinese2MandarinLatin("转账汇款").then(result => {
        console.log(result.resultString);
      });
    },
    /**
     * 打开第三方APP
     * @param options Object 基本配置项
     */
    handleStartOtherApp() {
      // 打开微信
      app.api.startOtherApp({
        schemeURL: "weixin://",
        packageName: "com.tencent.mm"
      });
    },
    /**
     * 检测是否支持ApplePay
     */
    handleAvailableApplePay() {
      app.api.availableApplePay().then(result => {
        console.log("是否支持ApplePay：" + result);
      });
    },
    /**
     * 检测推送通知权限
     */
    handleNotificationStatus() {
      app.api.notificationStatus().then(notificationStatus => {
        console.log("是否开启推送通知权限：" + notificationStatus);
      });
    },
    /**
     * 检测定位权限
     */
    handleAvailableLocationServices() {
      app.api.notificationStatus().then(isLocationServicesEnabled => {
        console.log("是否有定位权限：" + isLocationServicesEnabled);
      });
    },
    /**
     * 打开定位设置
     */
    handleOpenLocationSettings() {
      app.api.openLocationSettings().then(result => {
        if (result.actionType) {
          console.log("开启定位");
        } else {
          console.log("取消操作");
        }
      });
    },
    /**
     * 打开系统浏览器
     * @param url String 要加载的url
     */
    handleOpenNativeWebBrowser() {
      app.api.openNativeWebBrowser("http://www.baidu.com/");
    },
    /**
     * 增加日历提醒
     * @param options Object 基本配置项
     */
    handleAddCalendarReminder() {
      app.api.addCalendarReminder({
        title: "测试app.api",
        description: "测试app.api描述",
        dtStart: 1562232635000,
        dtEnd: 1562232635000,
        hasAlarm: 1,
        previousDate: 1562232635000,
        previousMinutes: 1562232635000,
        appUrl: "weipreviousDatexin://"
      });
    },
    /**
     * 拨打电话
     * @param phoneNumber String 要拨打的号码
     */
    handleCallPhoneNumber() {
      app.api.callPhoneNumber("10086");
    },
    /**
     * 检测是否已安装APP
     * @param options Object 基本配置项
     */
    handleIsInstallApp() {
      // 检测微信是否安装
      app.api
        .isInstallApp({ schemeURL: "weixin://", packageName: "com.tencent.mm" })
        .then(result => {
          if (result.installed) {
            console.log("微信APP已安装");
          } else {
            console.log("微信APP尚未安装");
          }
        });
    },
    /**
     * 检测GPS是否可用
     */
    handleAvailableGPS() {
      app.api.availableGPS().then(availableGPS => {
        console.log("GPS是否可用：" + availableGPS);
      });
    },
    /**
     * 检测本地指纹/面容识别是否可用
     */
    handleAvailableLocalAuthentication() {
      app.api.availableLocalAuthentication().then(available => {
        console.log("本地指纹/面容识别是否可用：" + available);
      });
    },
    /**
     * 开始本地指纹/面容识别
     * @param options Object 基本配置项
     */
    handleStartLocalAuthentication() {
      app.api.startLocalAuthentication({ showOtherButton: true }).then(
        res => {
          console.log("验证成功");
        },
        res => {
          console.log(`验证失败: [${res.error}][${res.errorMessage}]`);
        }
      );
    },

    /**
     * 获取本地指纹/面容识别开启
     * @param type String 开关标识
     */
    handleGetLocalAuthenticationOnOff() {
      // 登录场景
      app.api.getLocalAuthenticationOnOff("login").then(res => {
        console.log(res.result ? "开启" : "未开启");
      });

      // // 支付场景
      // app.api.getLocalAuthenticationOnOff("pay").then(res => {
      //   console.log(res.result ? "开启" : "未开启");
      // });
    },

    /**
     * 设置本地指纹/面容识别开启
     * @param type String 开关标识
     */
    handleSetLocalAuthenticationOnOff() {
      // 登录场景
      app.api.setLocalAuthenticationOnOff("login").then(res => {
        console.log("设置成功");
      });

      // // 支付场景
      // app.api.setLocalAuthenticationOnOff("pay").then(res => {
      //   console.log("设置成功");
      // });
    },
    /**
     * 清除本地指纹/面容识别开启
     * @param type String 开关标识
     */
    handleClearLocalAuthenticationOnOff() {
      // 登录场景
      app.api.clearLocalAuthenticationOnOff("login").then(res => {
        console.log("清理成功");
      });

      // // 支付场景
      // app.api.clearLocalAuthenticationOnOff("pay").then(res => {
      //   console.log("清理成功");
      // });
    },
    /**
     * 设置指纹/面容识别token
     * @param token String 设置指纹会话令牌
     */
    handleSetFingerPrintToken() {
      app.api.setFingerPrintToken("TOKEN0000000000001").then(res => {
        console.log("设置成功");
      });
    },

    /**
     * 获取手势开启
     */
    handleGetGestureOnOff() {
      app.api.getGestureOnOff().then(res => {
        console.log("是否开启：" + res.result);
      });
    },

    /**
     * 获取手势路径是否显示
     */
    handleGetGesturePathShowState() {
      app.api.getGesturePathShowState().then(res => {
        console.log("手势路径是否显示：" + res.result);
      });
    },
    /**
     * 设置手势路径是否显示
     * @param gesturePathShow Boolean 手势路劲是否显示
     */
    handleSetGesturePathShowState() {
      app.api.setGesturePathShowState(true).then(res => {
        console.log("设置成功");
      });
    },
    /**
     * 打开手势设置
     * @param type String 手势开启方式
     */
    handlePushGestureSetting() {
      // 设置手势密码
      app.api.pushGestureSetting("1").then(res => {
        console.log("设置成功");
      });

      // // 修改手势密码
      // app.api.pushGestureSetting("2").then(res => {
      //   console.log("修改成功");
      // });

      // // 清除手势密码
      // app.api.pushGestureSetting("3").then(res => {
      //   console.log("清除成功");
      // });
    },
    /**
     * 设置手势token
     * @param token String 设置手势令牌
     */
    handleSetGestureToken() {
      app.api.setGestureToken("TOKEN0000000000002").then(res => {
        console.log("设置成功");
      });
    }
  }
};
</script>
  <style lang="scss">
</style>