<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handlePushWindow">打开新窗口跳转</md-button>
    <md-button @click="handlePushWindowOnline">打开第三方在线地址</md-button>
    <md-button @click="handleCloseAll">关闭所有页面</md-button>
    <md-button @click="handleCloseOther">关闭除自身以外所有页面</md-button>
    <md-button @click="handleClosePage">关闭指定页面</md-button>
    
    <md-button @click="handleCloseToHomePage">关闭所有页面并返回到首页</md-button>
   
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
     * 打开新窗口跳转
     * @param url String 路由url信息, 必须以/开头
     * @param data Object 页面参数传递
     * @param param Object mpaas支持的启动参数
     */
    handlePushWindow() {
      app.api.pushWindow(
        "testJSAPIDemo/demo/native.html",
        {
          message: "hello world!"
        },
        {
          readTitle: true,
          showOptionMenu: false
        }
      );
    },
    /**
     * 打开第三方在线地址
     * @param url String 路由url信息
     * @param data Object 页面参数传递
     * @param options Object 路由选项
     */
    handlePushWindowOnline() {
      app.api.pushWindowOnline("https://www.baidu.com/", {
        message: "foo",
        info: "bar"
      });
    },
    /**
     * 关闭所有页面
     */
    handleCloseAll() {
      app.api.closeAll();
    },
    /**
     * 关闭除自身以外所有页面
     */
    handleCloseOther() {
      app.api.closeOther();
    },
    /**
     * 关闭指定页面
     * @param urls StringArray 路由url数组
     */
    handleClosePage() {
      app.api.closePage(["testJSAPIDemo/demo/native.html"]);
    },
    
    /**
     * 关闭所有页面并返回到首页
     * @param tabTag String 首页tab栏对应id
     */
    handleCloseToHomePage() {
      app.api.closeToHomePage("home");
    },
   
  }
};
</script>
  <style lang="scss">
</style>









  