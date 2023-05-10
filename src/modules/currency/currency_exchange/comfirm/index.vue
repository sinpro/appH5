<template>
  <!--
    ******************************************************
    * @Descripttion:  外币兑换确认页面
    *   2023-05-10    王鸣燕
    ******************************************************
  -->
  <!-- 根节点 -->
  <div class="wrap">
    <!-- 页面头部的首页按钮 -->
    <div v-show="backIndexIcon" class="header_right" @click="handleBackIndex">首页</div>
    <section class="page_main">
      <!-- 买入金额以及货币 styleBool 操作的是买入为true,操作的是卖出为false -->
      <div class="box" v-if="styleBool">
        <p>买入金额（{{acceptData.buyCurrency.text || '' }}）</p>
        <p class="buy_money">{{acceptData.exchangeAmount | formatMoney}}</p>
        <p
          class="sale_money"
        >卖出{{acceptData.conversionMoney | formatMoney}} {{acceptData.saleCurrency.text || ''}}</p>
      </div>

      <!-- 卖出金额以及货币 -->
      <div class="box" v-else>
        <p>卖出金额（{{acceptData.saleCurrency.text || '' }}）</p>
        <p class="buy_money">{{acceptData.exchangeAmount | formatMoney}}</p>
        <p
          class="sale_money"
        >买入{{acceptData.conversionMoney | formatMoney}} {{acceptData.buyCurrency.text || ''}}</p>
      </div>

      <!-- 买入、卖出账户信息以及汇率信息 -->
      <custom-info-card v-if="dataList.length > 0" :dataList="dataList" />
      <custom-button type="default" @clickHandle="handleConfirmClick">确认</custom-button>
    </section>
  </div>
</template>

<script>
import CustomInfomationCard from "../../components/CustomInfomationCard.vue";
import CustomButton from "../../components/CustomButton.vue";
import utils from "../../utils";
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
      // 外币兑换的买入卖出金额以及货币信息
      acceptData: {},
      // 外币兑换的买入、卖出账户信息以及汇率
      dataList: [],
      // 操作的是买入为true,操作的是卖出为false
      styleBool: boolean
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {
    // 格式化金额，整数补两位0，加千分位符号
    formatMoney(val) {
      return utils.formatMoney(val) || "";
    }
  },
  // 页面初始化执行
  created() {
    this.acceptData = app.params;

    // value 为 '0' 表示操作的是买入,其他表示卖出
    this.styleBool = this.acceptData.selectStyle?.value === "0";
    const {
      saleCurrency = {},
      buyCurrency = {},
      selectedBuyCard = {},
      selectedSaleCard = {},
      newRateData = {}
    } = this.acceptData;

    /**
     * this.styleBool  {boolean}
     * true 表示操作的是买入，文案展示应该为：买入货币1 卖出货币 汇率
     * false 表示操作的是卖出，文案展示应该为：卖出货币1 买入货币 汇率
     */
    let exchangeDesc = this.styleBool
      ? `${buyCurrency.text}1=${saleCurrency.text}`
      : `${saleCurrency.text}1=${buyCurrency.text}`;

    // 处理买入、卖出、汇率展示的数据
    this.dataList = [
      {
        title: "卖出账户",
        descList: [
          {
            text: saleCurrency.text,
            account: `${selectedSaleCard.text}-定期`,
            onlnbl: `可用结余${selectedSaleCard.balance}`
          }
        ]
      },
      {
        title: "买入账户",
        descList: [
          {
            text: buyCurrency.text,
            account: selectedBuyCard.text
          }
        ]
      },
      {
        title: "汇率",
        descList: [
          {
            text: `${exchangeDesc}${newRateData.exchangeNewRate}`,
            time: `截至${newRateData.newDate}`
          }
        ]
      }
    ];
  },
  // DOM加载完毕执行
  mounted() {
    // 展示页面的左上角的返回 icon
    app.api.showLeftMenu(true);

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

    // 点击确认按钮触发
    async handleConfirmClick() {
      try {
        // 调用外币兑换接口
        const res = await app.api.rpc("DH0001", {});

        // 外币兑换失败结果页面需要反显的数据
        let params = { ...res.result };

        // 外币兑换成功
        if (res.result.status === "0") {
          // 外币兑换成功结果页面需要反显的数据
          params = {
            styleBool: this.styleBool,
            dataList: this.dataList,
            buyMoneyText: `买入金额${utils.formatMoney(
              this.styleBool
                ? this.acceptData.exchangeAmount
                : this.acceptData.conversionMoney
            )} ${this.acceptData?.buyCurrency?.text || ""}`,
            saleMoneyText: `卖出金额${utils.formatMoney(
              this.styleBool
                ? this.acceptData.conversionMoney
                : this.acceptData.exchangeAmount
            )} ${this.acceptData?.saleCurrency?.text || ""}`,
            ...res.result
          };
        }

        // 跳转到外币兑换结果页面
        app.api.pushWindow("/currency/currency_exchange/result.html", params);
      } catch (error) {
        console.log("提交接口报错", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
