<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button v-bind="$attrs" :type="type" :dashed="dashed" @click="btnClick">
      <slot></slot>
    </md-button>
  </div>
</template>
  
  <script>
import { Button } from "mand-mobile";
/**
 *
 */
export default {
  name: "ChbButton", // 组件名（若封装为组件则必填）
  components: {
    [Button.name]: Button
  },
  props: {
    type: {
      type: String,
      default: "default" // default, primary, warning, disabled, link
    },
    // 是否使用虚线边框
    dashed: {
      type: Boolean,
      default: false
    }
  },
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
    btnClick() {
      this.$emit("click");
    }
  }
};
</script>
  
  <style lang="scss" scoped>
/deep/ .md-button.primary {
  background: #f39e00;
  color: #333;
}
/deep/ .md-button.primary::after {
  border-color: #f39e00;
}
</style>
  