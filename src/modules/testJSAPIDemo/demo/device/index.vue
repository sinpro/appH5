<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleGetDeviceAndAppInfo">获取设备APP信息</md-button>
    <md-button @click="handleGetDeviceFingerprint">获取设备唯一号</md-button>
    <md-button @click="handleGetBatteryInfo">获取电池信息</md-button>
    <md-button @click="handleGetPrivacyServiceStatus">获取用户设备是否开启权限信息</md-button>
    <md-button @click="handleRequestPrivacyServicePermissions">请求设备的基础权限</md-button>
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
     * 获取设备APP信息
     */
    handleGetDeviceAndAppInfo() {
      app.api.getDeviceAndAppInfo().then(data => {
        console.log("App版本为：" + data.appVersion);
      });
    },
    /**
     * 获取设备唯一号
     */
    handleGetDeviceFingerprint() {
      app.api.getDeviceFingerprint().then(data => {
        console.log("设备唯一表识：" + data.deviceID);
      });
    },
    /**
     * 获取电池信息
     */
    handleGetBatteryInfo() {
      app.api.getBatteryInfo().then(data => {
        console.log("电池剩余电量：" + data.level + "%");
      });
    },
    /**
     * 获取用户设备是否开启权限信息
     * @param service String 单个隐私权限
     */
    handleGetPrivacyServiceStatus() {
      app.api.getPrivacyServiceStatus().then(data => {
        console.log("权限信息：" + data.status);
      });
    },
    /**
     * 请求设备的基础权限
     * @param service String 单个隐私权限
     */
    handleRequestPrivacyServicePermissions() {
      app.api.requestPrivacyServicePermissions({ service: "camara" }).then(data => {
        console.log("相机权限：" + data.nowStatus);
      });
    }
  }
};
</script>
  
  <style lang="scss">
</style>