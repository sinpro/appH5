<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleOpenBankList">打开银行列表</md-button>
    <md-button @click="handlePushCityListView">打开银行网点城市列表</md-button>
    <md-button @click="handleGetVersionInfo">获取APP内所有版本信息</md-button>
    <md-button @click="handleGetServerDate">获取服务端时间</md-button>
    <md-button @click="handleGetCurrentStyle">获取当前APP风格</md-button>
    <md-button @click="handleGetServerUrl">获取服务器地址</md-button>
    <md-button @click="handleTrackEvent">数据采集埋点</md-button>
    <md-button @click="handleOpenNavigationApp">打开原生网点导航路径功能</md-button>
    <md-button @click="handlePushBankbranchView">打开银行网点</md-button>
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
     * 打开银行列表
     */
    handleOpenBankList() {
      app.api.openBankList().then(result => {
        console.log(result);
      });
    },
    /**
     * 打开银行网点城市列表
     * @param options Object  配置项
     * @param data {Object/String/Array}  存储数据
     */
    handlePushCityListView() {
      app.api
        .pushCityListView({
          areaType: 1,
          areaMax: "2",
          selectedAreaList: []
        })
        .then(result => {
          console.log(result.selectedAreaList);
        });
    },
    /**
     * 获取APP内所有版本信息
     * @param versionKey String  不同的取值的key
     */
    handleGetVersionInfo() {
      app.api
        .getVersionInfo("newAppVersion")
        .then(data => console.log(JSON.stringify(data)));
    },
    /**
     * 获取服务端时间
     */
    handleGetServerDate() {
      app.api.getServerDate().then(data => console.log(data.resultDate));
    },
    /**
     * 获取当前APP风格
     */
    handleGetCurrentStyle() {
      app.api.getCurrentStyle().then(data => console.log(data.resultStyle));
    },
    /**
     * 获取服务器地址
     */
    handleGetServerUrl() {
      app.api.getServerUrl().then(data => console.log(data.imgServerUrl));
    },
    /**
     * 打开原生网点导航路径功能
     * @param options Object 配置项
     */
    handleOpenNavigationApp() {
      app.api
        .openNavigationApp({
          name: "北京市",
          latitude: "29.5703930000",
          longitude: "106.5727140000"
        })
        .then(
          data => console.log(data),
          result => console.log(result.errorMessage)
        );
    },
    /**
     * 打开银行网点
     */
    handlePushBankbranchView() {
      app.api.pushBankbranchView();
    }
  }
};
</script>
  
  <style lang="scss">
</style>
  