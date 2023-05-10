<template>
   <!--
    ******************************************************
    * @Descripttion:  外币兑换结果页面
    *   2023-05-10    王鸣燕
    ******************************************************
  -->
  <!-- 根节点 -->
  <div class="wrap">
    <!-- 页面头部的首页按钮 -->
    <div v-show="backIndexIcon" class="header_right" @click="handleBackIndex">首页</div>
    <section class="page_main">
      <div class="box">
        <!-- 成功/失败的 icon -->
        <img
          :src="statusBool ? successImg : failImg"
          :alt="statusBool ? '成功图片' : '失败图片'"
          class="image"
        />
        <p>提交{{statusBool ? '成功' : '失败'}}</p>
        <!-- 兑换成功展示 -->
        <p class="number break" v-if="statusBool">参考编号{{acceptData.random}}</p>
         <!-- 兑换失败展示 -->
        <p class="number break" v-else-if="acceptData.reason">失败原因：{{acceptData.reason}}</p>
         <!-- 兑换成功展示 styleBool 为 true 表示操作的是买入；为 false 表示操作的是卖出 -->
        <div v-if="statusBool">
          <p class="break">{{acceptData.styleBool ? acceptData.saleMoneyText : acceptData.buyMoneyText}}</p>
          <p class="break">{{acceptData.styleBool ? acceptData.buyMoneyText :acceptData.saleMoneyText }}</p>
        </div>
      </div>
      <!-- 反显买入、卖出账户信息以及汇率 -->
      <custom-info-card v-if="statusBool && dataList.length > 0" :dataList="dataList" />
      <custom-button type="default" @clickHandle="handleClick">{{statusBool ? '另一种外币兑换' : '返回'}}</custom-button>
    </section>
  </div>
</template>

<script>
import CustomInfomationCard from "../../components/CustomInfomationCard.vue";
import CustomButton from "../../components/CustomButton.vue";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [CustomInfomationCard.name]: CustomInfomationCard,
    [CustomButton.name]: CustomButton
  },
  // 页面所需数据
  data() {
    return {
      // 控制右上角首页弹窗的展示
      backIndexIcon: false,
      // 成功或者失败的状态
      statusBool: Boolean,
      // 接收的确认页的数据
      acceptData: {},
      // 外币兑换成功 icon
      successImg: require("../../assets/img/success.png"),
      // 外币兑换失败 icon
      failImg: require("../../assets/img/fail.png"),
      // 买入、卖出账户信息以及汇率
      dataList: []
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    // 接收确认页面携带的数据
    this.acceptData = app.params;

    // status 为 '0' 表示兑换成功,其他表示失败
    this.statusBool = this.acceptData.status === "0";

    // 买入、卖出账户信息以及汇率
    this.dataList = this.acceptData.dataList;
  },
  // DOM加载完毕执行
  mounted() {
    // 隐藏页面头部的返回icon
    app.api.showLeftMenu(false);

    // 设置页面头部右上角的 ... icon 以及点击方法
    app.api.setRightMenu(
      {
        menus: [{ icontype: "more_black", text: "", color: "#FF000000" }]
      },
      result => {
        // 显示/隐藏首页按钮
        this.backIndexIcon = !this.backIndexIcon;
      }
    );
  },
  // 页面用到的方法
  methods: {
    // 点击右上角...中的首页触发
    handleBackIndex() {
      // 隐藏首页按钮
      this.backIndexIcon = false;

      // 返回首页
      app.api.closeToHomePage("home");
    },

    // 页面按钮绑定的方法
    handleClick() {
      /**
       * this.statusBool  {Boolean}
       * true 外币兑换成功状态，跳转到外币兑换页面
       * false 外币兑换失败状态 关闭外币兑换的所有页面
       */
      if (this.statusBool) {
        // 跳转到外币兑换页面
        app.api.pushWindow("currency/currency_exchange/index.html");
      } else {
        // 关闭外币兑换的所有页面
        app.api.closeAll();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
