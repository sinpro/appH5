<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="chb_confirm">
      <chb-confirm-card :title="title" :desc="desc" btnName="领取" @btnClick="handleBtn">
        <template #children>
          <img
            width="40"
            height="40"
            src="http://pic.imeitou.com/uploads/allimg/210729/3-210HZ91030.jpg"
            alt
          />
        </template>
      </chb-confirm-card>
      <chb-confirm-card :title="otherTitle" :desc="otherDesc" btnName="领取" @btnClick="handleOtherBtn"></chb-confirm-card>
      <chb-confirm-card title="测试居中" desc="测试测试测试"></chb-confirm-card>
      <chb-confirm-card title="没有内容"></chb-confirm-card>
      <chb-confirm-card desc="没有标题"></chb-confirm-card>
    </div>
  </div>
</template>

<script>
import ChbConfirmCard from "./index.vue";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  components: {
    [ChbConfirmCard.name]: ChbConfirmCard
  },
  props: [], // 组件传值所需数据
  // 页面所需数据
  data() {
    return {
      title: "定期奖励",
      desc: "存款金额：HKD5,000,000.00 存期 3个月请在2023-05-31日前领取",
      otherTitle: "开户奖励",
      otherDesc: "开户成功，奖励10元天仁茗茶电子券，请在2023-05-31日前领取"
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
    handleBtn() {
      console.log("我点击了1");
    },
    handleOtherBtn() {
      console.log("我点击了2");
    }
  }
};
</script>

<style lang="scss" scoped>
.chb_confirm {
  margin-top: 0.4rem;
  padding: 0 0.3rem;
  & > :not(:first-child) {
    margin-top: 0.4rem;
  }
}
</style>
