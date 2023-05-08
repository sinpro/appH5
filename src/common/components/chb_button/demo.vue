<template>
  <!-- 根节点 -->
  <div class="wrap">
    <chb-button type="default" @click="handleClick">缴费</chb-button>
    <chb-button type="default" size="large" dashed>+开立定期存款</chb-button>
    <chb-button type="primary" size="large" icon="rmb" :iconSvg="false">下一步</chb-button>
    <chb-button type="default" inline>default行内按钮</chb-button>
    <chb-button type="default" inline dashed>default行内按钮虚线行内按钮</chb-button>
    <chb-button type="primary" inline round>primary行内按钮</chb-button>
    <chb-button type="primary" inline dashed>primary虚线行内按钮</chb-button>
    <div class="ceshi">
      <chb-button type="primary">重设</chb-button>
      <chb-button type="primary">确定</chb-button>
    </div>
  </div>
</template>

<script>
import ChbButton from "@/common/components/chb_button";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  components: {
    [ChbButton.name]: ChbButton
  },
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
    handleClick() {
      console.log("按钮点击方法");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  & > :not(:first-child) {
    margin-top: 0.4rem;
  }
}
.ceshi {
  display: flex;
  padding: 0 0.3rem;
  & > :last-child {
    margin-left: 0.4rem;
  }
}
</style>
