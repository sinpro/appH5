<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="tabs" v-if="tabList&& tabList.length >0">
      <div
        :class="['tabs__pane','tabs__pane-right',{
        'tabs__pane-active':index === current
      }]"
        v-for="(item,index) in tabList"
        :key="index"
        @click="handleClick(item,index)"
      >{{item.text}}</div>
    </div>
  </div>
</template>
  
  <script>
/**
 *
 */
export default {
  name: "CustomTabs", // 组件名（若封装为组件则必填）
  props: {
    tabList: {
      type: Array,
      default: []
    }
  }, // 组件传值所需数据
  // 页面所需数据
  data() {
    return {
      current: 0
    };
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
    handleClick(item, index) {
      this.current = index;
      this.$emit("changeItem", item);
    }
  }
};
</script>
  
  <style lang="scss" scoped>
.tabs {
  display: flex;
  width: 100%;
  text-align: center;
  background: #fff;
  font-size: .32rem;
  color: #999;

  .tabs__pane-right {
    border-right: .02rem solid #ddd;
  }

  .tabs__pane {
    flex: 1;
    box-sizing: border-box;
    height: .88rem;
    line-height: .88rem;
    border-bottom: .02rem solid #ddd;
  }

  .tabs__pane-active {
    border-bottom-color: #666;
    color: #000;
  }
}
</style>
  