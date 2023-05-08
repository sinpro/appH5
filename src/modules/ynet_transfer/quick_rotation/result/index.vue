<template>
  <!-- 根节点 -->
  <div class="wrap">
    <section class="rotation_result">
      <div class="rotation_result_main">
        <img src="../../assets/img/success.png" alt="提交成功" />
        <h3 class="rotation_result_desc">提交成功</h3>
        <div class="rotation_result_footer">
          <chb-button type="primary" @click="handleBack" round>返回</chb-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ChbButton from "@/common/components/chb_button";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [ChbButton.name]: ChbButton
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
    handleBack(){
      app.api.closeToHomePage("home");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
