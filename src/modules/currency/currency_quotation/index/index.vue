<template>
  <!--
    ******************************************************
    * @Descripttion:  外币牌价查询页面
    *   2023-05-10    王鸣燕
    ******************************************************
  -->
  <!-- 根节点 -->
  <div class="wrap">
    <!-- 页面头部的首页按钮 -->
    <div v-show="backIndexIcon" class="header_right" @click="handleBackIndex">首页</div>
    <section class="page_main">
      <!-- 现钞/电汇的切换 tabs -->
      <custom-tabs :tabList="tabList" @changeItem="changeItem" />
      <!-- 货币汇率的描述信息 -->
      <div class="box">
        <p class="title">外币{{currencyType.text}}兑港币牌价</p>
        <p>以下资料仅供参考</p>
        <p>最后更新时间：{{nowDate}}</p>
      </div>
      <!-- 现钞/电汇的银行买入和卖出的汇率 -->
      <custom-rate-list :titleList="titleList" :dataList="dataList" />
    </section>
  </div>
</template>

<script>
import { CellItem } from "mand-mobile";
import Tabs from "../../components/CustomTabs.vue";
import RateList from "../../components/CustomRateList.vue";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [CellItem.name]: CellItem,
    [Tabs.name]: Tabs,
    [RateList.name]: RateList
  },
  // 页面所需数据
  data() {
    return {
      // 控制右上角首页弹窗的展示
      backIndexIcon: false,
      // 页签按钮数据
      tabList: [
        {
          text: "现钞",
          value: "oof"
        },
        {
          text: "电汇",
          value: "wireTransfer"
        }
      ],
      // 现钞/电汇列表的title
      titleList: [
        {
          text: "货币",
          value: "currency"
        },
        {
          text: "银行买入",
          value: "bankBuy"
        },
        {
          text: "银行卖出",
          value: "bankSale"
        }
      ],
      // 现钞/电汇列表数据
      dataList: [],
      // 最新的事件
      nowDate: "",
      // 选中的tabs信息
      currencyType: {
        text: "现钞"
      }
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    // 获取现钞银行买入卖出汇率列表
    this.getOofData();
  },
  // DOM加载完毕执行
  mounted() {
    // 显示左上角返回图标
    app.api.showLeftMenu(true);

    // 设置页面头部右边的 外币兑换按钮 和 ... icon
    app.api.setRightMenu(
      {
        menus: [
          { icontype: "", text: "外币兑换", color: "#FF000000" },
          { icontype: "more_black", text: "", color: "#FF000000" }
        ]
      },
      result => {
        console.log(result, "result");
        if (result.index === 1) {
          this.backIndexIcon = !this.backIndexIcon;
        } else {
          app.api.closePage(["/currency/currency_quotation/index.html"]);
          app.api.pushWindow("/currency/currency_exchange/index.html");
        }
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

    // 获取现钞银行买入卖出汇率列表
    async getOofData() {
      try {
        const res = await app.api.rpc("XC0001", {});
        this.nowDate = res.nowDate || "";
        if (res.xcList && res.xcList.length > 0) {
          this.dataList = res.xcList;
        }
      } catch (error) {
        console.log("外币牌价查询-现钞列表出错");
      }
    },

    // 获取电汇银行买入卖出汇率列表
    async getWireTransferData() {
      try {
        const res = await app.api.rpc("PH0001", {});
        this.nowDate = res.nowDate || "";
        if (res.dhList && res.dhList.length > 0) {
          this.dataList = res.dhList;
        }
      } catch (error) {
        console.log("外币牌价查询-电汇列表出错");
      }
    },

    // 切换现钞/电汇的tabs
    changeItem(data) {
      this.currencyType = data;

      /**
       * data.value  {string}  'wireTransfer' | 'oof'
       * wireTransfer 切换到电汇tab,查询最新的电汇信息
       * oof 切换到现钞tab，查询最新的现钞信息
       */
      if (data.value === "wireTransfer") {
        // 查询最新的电汇信息
        this.getWireTransferData();
      } else {
        // 查询最新的现钞信息
        this.getOofData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
