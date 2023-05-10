<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="rate__list">
      <div v-if="titleList&&titleList.length>0" class="rate__list-th">
        <span
          v-for="(item,index) in titleList"
          :key="index"
          :class="[{'rate__list-left':index ===0},{'rate__list-right':index ===(titleList.length -1)}]"
        >{{item.text}}</span>
      </div>
      <div class="rate__list-item" v-if="dataList && dataList.length >0">
        <div class="rate__list-tr" v-for="(item,index) in dataList" :key="index">
          <div class="rate__list-td rate__list-width">
            <img src="../assets/img/blank.png" class="rate__list-image" alt />
            <div>
              <p class="rate__list-currency">{{item.currency}}</p>
              <p
                v-if="item.currencyShorthand"
                class="rate__list-shorthand"
              >{{item.currencyShorthand}}</p>
            </div>
          </div>
          <p class="rate__list-rate">{{item.buyRate}}</p>
          <p class="rate__list-rate rate__list-sale">{{item.saleRate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
/**
 *
 */
export default {
  name: "CustomRateList", // 组件名（若封装为组件则必填）
  props: {
    titleList: {
      type: Array,
      default: []
    },
    dataList: {
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
  methods: {}
};
</script>
  
  <style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rate__list {
  margin-top: .2rem;
  background: #fff;
  padding: .3rem;
  border-top-left-radius: .24rem;
  border-top-right-radius: .24rem;

  .rate__list-th {
    width: 100%;
    font-size: .32rem;
    color: #333;
    @include flex();
    text-align: center;

    .rate__list-left {
      text-align: left;
    }

    .rate__list-right {
      text-align: right;
    }

    span {
      flex: 1;
    }
    & > :first-child {
      flex: 1.5;
    }
  }

  .rate__list-item {
    margin-top: .2rem;

    .rate__list-image {
      width: .6rem;
      height: .52rem;
      margin-right: .2rem;
    }

    .rate__list-tr {
      width: 100%;
      @include flex();
      align-items: flex-start;
      padding: .2rem 0;
      text-align: center;
      position: relative;
      @include bottom-line();
    }

    .rate__list-td {
      @include flex();
      justify-content: flex-start;
      flex: 1;
      font-size: .26rem;
      color: #999;

      .rate__list-currency {
        font-size: .4rem;
        color: #000;
        line-height: 1.4;
      }
      .rate__list-shorthand {
        text-align: left;
      }
    }
    .rate__list-width {
      flex: 1.5;
    }

    .rate__list-rate {
      font-size: .26rem;
      padding-top: .04rem;
      color: #333;
      flex: 1;
    }

    .rate__list-sale {
      padding-right: .3rem;
      text-align: right;
    }
  }
}
</style>
  