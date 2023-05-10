<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button v-bind="$attrs" @click="btnClick">
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
  name: "CustomButton", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [Button.name]: Button
  },
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
    btnClick() {
      this.$emit("clickHandle");
    }
  }
};
</script>
    
    <style lang="scss" scoped>
/deep/ .md-button {
  margin: .5rem auto;
  font-size: .32rem;

  /deep/ .md-button.default {
    color: #333;
  }

  /deep/ .md-button.default::after {
    border-color: #999;
  }
}
/deep/ .md-button.block {
  width: 90%;
}
</style>
    