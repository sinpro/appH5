<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleOpenFaceRecognition">打开人脸识别</md-button>
    <md-button @click="handleOpenQRCodeScanner">打开二维码扫描</md-button>
    <md-button @click="handleShowSharePad">打开分享面板</md-button>
    <md-button @click="handleShareTo">直接分享</md-button>
    <md-button @click="handleShowKeyboard">显示安全键盘</md-button>
    <md-button @click="handleHideKeyboard">关闭安全键盘</md-button>
    <md-button @click="handleShowPaymentPad">显示支付密码键盘</md-button>
    <md-button @click="handleShowOCRIDCard">打开ocr识别身份证</md-button>
    <md-button @click="handleShowOCRBankCard">打开ocr识别银行卡</md-button>
    <md-button @click="handleCheckAppUpdate">检查APP版本更新</md-button>
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
     * 打开人脸识别
     * @param options {Object}  可选配置项
     */
    handleOpenFaceRecognition() {
      app.api
        .openFaceRecognition({
          idcard_name: "王欢",
          idcard_number: "420114198810182810"
        })
        .then(
          result => {
            if (result.identification_reslut == "0") {
              console.log("识别成功");
            } else {
              console.log("识别失败");
            }
          },
          result => {
            console.log(result.errorMessage);
          }
        );
    },
    /**
     * 打开二维码扫描
     */
    handleOpenQRCodeScanner() {
      app.api.openQRCodeScanner().then(result => {
        console.log(result.codeString);
      });
    },
    /**
     * 打开分享面板
     *  @param options {Object}  可选配置项
     */
    handleShowSharePad() {
      app.api
        .showSharePad({
          showShareType: "1|2|3|4",
          title: "砸金蛋活动",
          desc: "砸金蛋活动描述",
          content: "http://www.baidu.com",
          contentType: "url",
          thumbUrl:
            "https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg"
        })
        .then(
          result => console.log(JSON.stringify(result)),
          result => {
            console.log(result.errorMessage);
          }
        );
    },

    /**
     * 直接分享
     * @param options {Object}  可选配置项
     */
    handleShareTo() {
      app.api
        .shareTo({
          title: "砸金蛋活动标题",
          desc: "砸金蛋活动描述",
          contentType: "url",
          content: "http://www.baidu.com",
          thumbUrl:
            "https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg",
          showShareType: "1"
        })
        .then(result => console.log(JSON.stringify(result)));
    },

    /**
     * 显示英文安全键盘
     * @param options {Object}  可选配置项
     * @param keepCallback {Function} 输入事件操作回调函数
     */
    handleShowKeyboard() {
      // 打开英文键盘
      // app.api.showKeyboard(
      //   {
      //     max: 10,
      //     keyboardType: "0",
      //     isEncry: false,
      //     curText: "",
      //     randomKey: "",
      //     regular: ""
      //   },
      //   result => console.log(result.action)
      // );

      // 打开数字键盘
      app.api.showKeyboard(
        {
          max: 10,
          keyboardType: "1",
          isEncry: false,
          curText: "",
          randomKey: "",
          regular: ""
        },
        result => alert(result.action)
      );
    },

    /**
     * 关闭安全键盘
     */
    handleHideKeyboard() {
      app.api.hideKeyboard();
    },

    /**
     * 显示支付密码键盘
     * @param options {Object}  可选配置项
     */
    handleShowPaymentPad() {
      app.api
        .showPaymentPad({
          accountBankLogo: "YNET", // 猎豹Logo对应字符串 'YNET'
          randomKey: "",
          styleType: "1",
          money: "3333",
          accountName: "xiaohua",
          accountPhoneNumOrCardId: "138 0000 1234",
          contents: [{ content: "222", size: "32", color: "#666666" }]
        })
        .then(
          result => {
            console.log(result.value);
          },
          result => console.log(result.errorMessage)
        );
    },

    /**
     * 打开ocr识别身份证正面
     * @param scanType {String}  扫描正反面  0 正面， 1 反面
     */
    handleShowOCRIDCard() {
      // 扫描身份证正面
      app.api.showOCRIDCard("0").then(result => {
        console.log(result);
      });

      // // 扫描身份证反面
      // app.api.showOCRIDCard("1").then(result => {
      //   console.log(result);
      // });
    },

    /**
     * 打开ocr识别银行卡
     */
    handleShowOCRBankCard() {
      app.api.showOCRBankCard().then(result => {
        console.log(result.cardNumber);
      });
    },

    /**
     * 检查APP版本更新
     * @param silent {String}  是否静默查询  0 - 弹窗提示，1 - 静默查询
     */
    handleCheckAppUpdate() {
      // 弹窗查询
      // app.api
      //   .checkAppUpdate("0")
      //   .then(result => console.log(JSON.stringify(result)));

      // 静默查询
      app.api
        .checkAppUpdate("1")
        .then(result => console.log(JSON.stringify(result)));
    }
  }
};
</script>

<style lang="scss">
</style>
