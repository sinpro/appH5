<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleSetSessionStorage">设置内存数据缓存</md-button>
    <md-button @click="handleGetSessionStorage">获取内存数据缓存</md-button>
    <md-button @click="handleSetLocalStorage">设置磁盘数据缓存</md-button>
    <md-button @click="handleGetLocalStorage">获取磁盘数据缓存</md-button>
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
     * 设置内存数据缓存
     * @param key {String}  存储key值
     * @param data {Object/String/Array}  存储数据
     */
    handleSetSessionStorage() {
      app.api
        .setSessionStorage("mySessionStoreKey", {
          msg: "hello world!"
        })
        .then(result => {
          console.log(result.error, result.errorMessage);
        });
    }, 
    /**
     * 获取内存数据缓存
     * @param key {String}  存储key值
     * @param keep {Boolean}  存储数据是否保留  该参数设置为false时，将会在缓存数据第一次读取后自动删除
     */
    handleGetSessionStorage() {
      app.api.getSessionStorage("mySessionStoreKey").then(data => {
        console.log(data);
      });
    },
    /**
     * 设置磁盘数据缓存
     * @param key {String}  存储key值
     * @param data {Object/String/Array}  存储数据
     */
    handleSetLocalStorage() {
      app.api
        .setLocalStorage("myLocalStoreKey", {
          msg: "hello world!"
        })
        .then(result => {
          console.log(result.error, result.errorMessage);
        });
    },
    /**
     * 获取磁盘数据缓存
     * @param key {String}  存储key值
     * @param keep {Boolean}  存储数据是否保留  该参数设置为false时，将会在缓存数据第一次读取后自动删除
     */
	 handleGetLocalStorage() {
      app.api.getLocalStorage("myLocalStoreKey").then(data => {
        console.log(data);
      });
    }
  }
};
</script>
  
  <style lang="scss">
</style>
  