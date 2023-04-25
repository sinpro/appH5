<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleGetSessionID">获取用户会话ID</md-button>
    <md-button @click="handleLogin">打开登录对话框</md-button>
    <md-button @click="handleGetUserInfo">获取用户信息</md-button>
    <md-button @click="handleUpdateUserInfo">更新用户信息</md-button>
    <md-button @click="handleCleanUserInfo">清除用户信息并退出登录</md-button>
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
     * 获取用户会话ID
     */
    handleGetSessionID() {
      app.api.getSessionID().then(sessionID => {
        if (!sessionID) {
          console.log("用户尚未登录");
        }
        console.log(sessionID);
      });
    },
    /**
     * 打开登录对话框
     * @param options Object  登录选项
     */
    handleLogin() {
      // 仅登录
      app.api.login().then(result => console.log(JSON.stringify(result)));

      // // 登录后跳转
      // app.api
      //   .login({
      //     pageUrl: "/demo_ynet/index/index.html"
      //   })
      //   .then(result => console.log(JSON.stringify(result)));
    },
    /**
     * 获取用户信息
     */
    handleGetUserInfo() {
      app.api.getUserInfo().then(
        result => console.log(JSON.stringify(result)),
        result => console.log(result.errorMessage)
      );
    },
    /**
     * 更新用户信息
     */
    handleUpdateUserInfo() {
      app.api.updateUserInfo().then(result => alert(JSON.stringify(result)));
    },
    /**
     * 清除用户信息并退出登录
     */
    handleCleanUserInfo() {
      app.api.cleanUserInfo().then(result => alert(JSON.stringify(result)));
    }
  }
};
</script>
  
  <style lang="scss">
</style>
