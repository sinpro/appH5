<template>
  <!-- 根节点 -->
  <div class="wrap">
    <section class="rotation_confirmation">
      <div class="rotation_confirmation_head">
        <p class="rotation_confirmation_title">轉賬金額：HDK</p>
        <h1 class="rotation_confirmation_money">888.88</h1>
      </div>
      <chb-input-card
        :inputList="acceptList"
        :key="acceptKeys"
        @inputData="acceptData"
        @onClick="acceptClick"
      ></chb-input-card>
      <div class="rotation_confirmation_footer">
        <chb-button type="default" @click="handlePrev" round>上一步</chb-button>
        <chb-button type="primary" @click="handleConfirm" round>确认</chb-button>
      </div>
    </section>
  </div>
</template>

<script>
import ChbInputCard from "@/common/components/chb_input_card";
import ChbButton from "@/common/components/chb_button";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [ChbInputCard.name]: ChbInputCard,
    [ChbButton.name]: ChbButton
  },
  // 页面所需数据
  data() {
    return {
      acceptList: [
        {
          title: "付款賬戶",
          value: "255-20-6108889(HKD储蓄账户)",
          readonly: true
        },
        {
          title: "收款人識別方式",
          value: "FPS ID",
          readonly: true
        },
        {
          title: "收款戶名",
          value: "王小二",
          readonly: true
        },
        {
          title: "收款銀行",
          value: "創興銀行",
          readonly: true
        },
        {
          title: "附言",
          value: "房租",
          readonly: true
        }
      ]
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
    handlePrev() {
      app.api.closePage(["ynet_transfer/quick_rotation/confirmation.html"]);
    },

    handleConfirm() {
      app.api.pushWindow("/ynet_transfer/quick_rotation/result.html");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
