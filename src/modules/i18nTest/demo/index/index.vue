<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button size="small" inline type="primary" @click="changeLanguage('en')">切换英文</md-button>
    <md-button size="small" inline type="warning" @click="changeLanguage('zh-cn')">切换中文</md-button>
    <md-button size="small" inline @click="changeLanguage('zh-hk')">切换繁体</md-button>
    <h1>需要翻译的内容</h1>
    <p>{{$t('main.display')}}</p>
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
    changeLanguage(type) {
      // console.log(this.$i18n.locale, "当前语言");

      // console.log(i18n.t('name'), "测试");
      this.$i18n.locale = type; // 设置当前语言
      window.localStorage.setItem('lang',type) 
    }
  }
};
</script>

<style lang="scss">
</style>
