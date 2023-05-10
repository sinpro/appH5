<template>
  <!-- 根节点 -->
  <div class="wrap select">
    <div class="select__cell-item" @click="changeSelect">
      <span>{{selectorValue}}</span>
      <md-icon v-if="!isSelectorShow" name="arrow-down" size="lg"></md-icon>
      <md-icon v-else name="arrow-up" size="lg"></md-icon>
    </div>
    <div v-if="list&&list.length >0">
      <md-selector
        v-model="isSelectorShow"
        :default-value="defaultValue"
        :data="list"
        max-height="320px"
        min-height="320px"
        large-radius
        @choose="onSelectorChoose"
      ></md-selector>
    </div>
  </div>
</template>
    
    <script>
import { Icon, Selector } from "mand-mobile";
/**
 *
 */
export default {
  name: "CustomSelect", // 组件名（若封装为组件则必填）
  props: {
    list: {
      type: Array,
      default: []
    },
    defaultValue: {
      type: String,
      default: ""
    }
  }, // 组件传值所需数据
  components: {
    [Icon.name]: Icon,
    [Selector.name]: Selector
  },
  // 页面所需数据
  data() {
    return {
      selectorValue: "",
      isSelectorShow: false
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    this.selectorValue =
      this.list && this.list.length > 0
        ? this.list[this.defaultValue].text
        : "";
  },
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {
    changeSelect() {
      this.isSelectorShow = !this.isSelectorShow;
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.$emit("changeItem", data);
    }
  }
};
</script>
    
    <style lang="scss" scoped>
.select {
  .select__cell-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .32rem;
    color: #333;
  }
}
</style>
    