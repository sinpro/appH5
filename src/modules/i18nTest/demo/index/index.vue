<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div v-show="backIndexIcon" class="header_right">
      <p @click="changeLanguage('zh-cn')">中文</p>
      <p @click="changeLanguage('en')">English</p>
      <p @click="changeLanguage('zh-hk')">繁体</p>
    </div>
    <section class="page_main">
      <div class="box">
        <p>{{$t('currency.PURCHASE_AMOUNT')}}（{{$t('common.SF')}}）</p>
        <p class="buy_money">50.00</p>
        <p class="sale_money">{{$t('currency.SALE')}}442.55{{$t('common.HKD')}}</p>
      </div>
      <md-field>
        <md-cell-item :title="$t('currency.SELLING_ACCOUNT')">
          <div slot="right">
            <p>{{$t('common.HKD')}}</p>
            <p>255-67-0987-HKD-{{$t('currency.FIXED_ACCOUNT')}}</p>
            <p>{{$t('currency.AVAILABLE_BALANCE')}}：900.00</p>
          </div>
        </md-cell-item>
        <md-cell-item :title="$t('currency.PURCHASE_ACCOUNT')">
          <div slot="right">
            <p>{{$t('common.SF')}}</p>
            <p>567-67-0987-HKD</p>
          </div>
        </md-cell-item>
        <md-cell-item :title="$t('currency.EXCHANGE_RATE')">
          <div slot="right">
            <p>{{$t('common.SF')}}1={{$t('common.HKD')}}8.89760</p>
            <p
              class="infomation__card-time"
            >{{$t('currency.UPTO_NOW')}}2023/04/24 09:53 {{$t('common.HKT')}}</p>
          </div>
        </md-cell-item>
      </md-field>
      <md-button type="default" @click="handleClickConfirm">{{$t('common.CONFIRM')}}</md-button>
    </section>
  </div>
</template>

<script>
import { Field, CellItem, Button } from "mand-mobile";
/**
 *
 */
export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellItem.name]: CellItem
  },
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  // 页面所需数据
  data() {
    return {
      backIndexIcon: false
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    console.log(this.$i18n.locale, "当前语言");
  },
  // DOM加载完毕执行
  mounted() {
    // 设置页面头部右上角的 外币牌价查询 以及点击方法
    app.api.setRightMenu(
      {
        menus: [{ icontype: "", text: "切换语言", color: "#FF000000" }]
      },
      result => {
        this.backIndexIcon = !this.backIndexIcon;
      }
    );
  },
  // 页面用到的方法
  methods: {
    changeLanguage(type) {
      // console.log(this.$i18n.locale, "当前语言");
      // console.log(i18n.t('name'), "测试");
      this.$i18n.locale = type; // 设置当前语言
      window.localStorage.setItem("lang", type);
    },
    handleClickConfirm() {
      app.api.pushWindow("/i18nTest/demo/result.html");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
