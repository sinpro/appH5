<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="chb_information">
      <div class="chb_information_title" v-if="dataform.title">{{dataform.title}}</div>
      <div v-if="$slots.otherTitle">
        <slot name="otherTitle"></slot>
      </div>
      <div class="chb_information_body">
        <div class="chb_information_main" v-if="compatibility.length > 0">
          <div class="chb_information_item" v-for="(item,index) in compatibility" :key="index">
            <div class="chb_information_left" :class="compact ? 'is_compact' : ''">
              <div v-if="item.childTitle">{{item.childTitle}}</div>
              <div v-if="item.childDesc">{{item.childDesc}}</div>
            </div>
          </div>
        </div>
        <div v-if="$slots.icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="chb_information_tab" v-if="$slots.tab">
        <slot name="tab"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
  
  <script>

/**
 *
 */
export default {
  name: "chb-information-card", // 组件名（若封装为组件则必填）
  props: {
    dataform: {
      type: Object,
      require: true,
      default() {
        return {}
      },
    },
    hasList: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  }, // 组件传值所需数据
  components: {},
  // 页面所需数据
  data() {
    return {
      open: false
    };
  },
  // 计算属性
  computed: {
    compatibility() {
      if (this.hasList && this.dataform.list) {
        return this.dataform.list;
      }
      return this.dataform;
    }
  },
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {},
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {}
};
</script>
  
  <style lang="scss" scoped>
@mixin Flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chb_information {
  border: 0.02rem solid #e4e4e4;
  border-radius: 0.16rem;
  background: #fff;
  padding: 0.2rem 0.3rem;
  font-size: 0.28rem;
  position: relative;
  .chb_information_title {
    font-size: 0.32rem;
    color: #555;
    margin-bottom: 0.2rem;
  }
  .chb_information_body {
    @include Flex();
    align-items: flex-start;
    .chb_information_main {
      flex: 1;
      & > :not(:last-child) {
        margin-bottom: 0.2rem;
      }
    }
    .chb_information_item {
      color: #7f7f7f;

      .chb_information_left {
        @include Flex();
      }
    }
  }
  .chb_information_tab {
    position: absolute;
    top: 0;
    right: 0;
  }
  .is_compact {
    justify-content: flex-start !important;
  }
}
</style>
  