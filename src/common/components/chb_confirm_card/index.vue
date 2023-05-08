<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="chb_confirm">
      <p class="chb_confirm_title" v-if="title">{{title}}</p>
      <div class="chb_confirm_main">
        <p class="chb_confirm_desc" v-if="desc">{{desc}}</p>
        <div v-if="$slots.children">
          <slot name="children"></slot>
        </div>
      </div>
      <div class="chb_confirm_btn" v-if="btnName">
        <md-button type="primary" @click="handleClick">{{btnName}}</md-button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import ChbButton from "@/common/components/chb_button";
/**
 *
 */
export default {
  name: "chb-confirm-card", // 组件名（若封装为组件则必填）
  components: {
    [ChbButton.name]: ChbButton
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    btnName: {
      type: String,
      default: ""
    }
  }, // 组件传值所需数据
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
      this.$emit("btnClick");
    }
  }
};
</script>
  
  <style lang="scss" scoped>
.chb_confirm {
  background: #fff;
  border: 0.02rem solid #e4e4e4;
  border-radius: 0.12rem;
  padding: 0.4rem 0;
  .chb_confirm_title {
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 0.32rem;
  }
  .chb_confirm_main {
    max-width: 70%;
    margin: 0.2rem auto 0.5rem;
    text-align: center;
    .chb_confirm_desc {
      display: inline-block;
      text-align: left;
      font-size: 0.26rem;
      color: #aaa;
    }
  }
  .chb_confirm_btn {
    width: 3.9rem;
    margin: 0 auto;
  }
}
</style>
  