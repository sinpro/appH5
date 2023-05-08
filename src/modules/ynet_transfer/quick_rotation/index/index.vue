<template>
  <!-- 根节点 -->
  <div class="wrap">
    <section class="rotation_index">
      <div class="rotation_index_head">
        <div class="rotation_index_title">
          <p class="rotation_index_msg">轉賬金額：</p>
          <md-drop-menu :data="currencyData" />
        </div>
        <div class="rotation_index_money">
          <md-input-item type="money" placeholder="请输入金额" v-model="transferMoney" align="center" :error="transferMoneyError"></md-input-item>
        </div>
      </div>
      <div class="rotation_index_main">
        <chb-input-card
          bigTitle="收款人"
          :inputList="acceptList"
          :key="acceptKeys"
          @inputData="acceptData"
          @onClick="acceptClick"
        ></chb-input-card>
        <chb-input-card
          bigTitle="付款人"
          :key="payKeys"
          :inputList="payList"
          @inputData="payData"
          @onClick="payClick"
        ></chb-input-card>
      </div>
      <div class="rotation_index_footer">
        <chb-button type="primary" @click="handleNext" round>下一步</chb-button>
      </div>
    </section>
    <md-selector
      v-model="isSelectorShow"
      :default-value="isPay ? '0' : '1'"
      :data="selectWay"
      max-height="320px"
      min-height="300px"
      hide-title-bar
      large-radius
      @choose="onSelectorChoose"
    ></md-selector>
  </div>
</template>

<script>
import { DropMenu, Selector, InputItem } from "mand-mobile";
import ChbInputCard from "@/common/components/chb_input_card";
import ChbButton from "@/common/components/chb_button";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [Selector.name]: Selector,
    [DropMenu.name]: DropMenu,
    [InputItem.name]: InputItem,
    [ChbInputCard.name]: ChbInputCard,
    [ChbButton.name]: ChbButton
  },
  // 页面所需数据
  data() {
    return {
      transferMoneyError:'',
      cardInfo: {},
      transferMoney: "",
      isPay: false,
      acceptKeys: 0,
      payKeys: 0,
      isSelectorShow: false,
      acceptWayList: [
        {
          value: "1",
          text: "FPS ID"
        },
        {
          value: "2",
          text: "手机号码"
        },
        {
          value: "3",
          text: "地址邮箱"
        }
      ],
      payWayList: [
        {
          value: "1",
          text: "255-20-6108889(HKD储蓄账户)"
        },
        {
          value: "2",
          text: "255-20-6108888(HKD储蓄账户)"
        },
        {
          value: "3",
          text: "255-20-6108887(HKD储蓄账户)"
        }
      ],
      currencyData: [
        {
          text: "HDK",
          options: []
        }
      ],
      acceptList: [
        {
          title: "收款人識別方式",
          value: "FPS ID",
          readonly: true,
          needIcon: true,
          iconName: "arrow-right",
          placeholder: "請輸入"
        },
        {
          title: "FPS ID",
          brief: "",
          placeholder: "請輸入"
        },
        {
          title: "收款人户名",
          placeholder: "請輸入"
        }
      ],
      payList: [
        {
          title: "付款賬戶",
          value: "",
          readonly: true,
          needIcon: true,
          iconName: "arrow-right",
          placeholder: "請輸入"
        },
        {
          title: "賬戶名稱",
          brief: "",
          placeholder: "請輸入",
          customError: false
        },
        {
          title: "附言(致收款人)",
          placeholder: "請輸入"
        }
      ]
    };
  },
  // 计算属性
  computed: {
    selectWay() {
      return this.isPay ? this.payWayList : this.acceptWayList;
    }
  },
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    this.getCurrencyList();
    this.getCardList();
  },
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {
    handleNext() {
      let isVerify = true;
      if(!this.transferMoney){
        this.transferMoneyError = '金额输入有误'
        return 
      }
      this.acceptList.forEach(item => {
        if (!item.value) {
          isVerify = false;
          item.error = `${item.title}不能为空`;
          this.acceptKeys = Math.random();
        }
      });
      this.payList.forEach((item, index) => {
        if (!item.value && index !== this.payList.length - 1) {
          isVerify = false;
          item.error = `${item.title}不能为空`;
          this.payKeys = Math.random();
        }
      });
      console.warn("输入的数据", JSON.parse(JSON.stringify(this.payList)));
      const data = {
        transferMoney: this.transferMoney,
        payeeStyle: this.acceptList[0].value,
        payee: this.acceptList[1].value,
        payeeName: this.acceptList[2].value,
        payerCardName: this.payList[0].value,
        payerName: this.payList[1].value,
        postscript: this.payList[2].value,
        payerBankName: this.cardInfo.bankName,
        payerCardNo: this.cardInfo.cardNo
      };
      console.warn("输入的数据", JSON.parse(JSON.stringify(data)));
      isVerify &&
        app.api.pushWindow(
          "/ynet_transfer/quick_rotation/confirmation.html",
          data
        );
    },
    showPopup() {
      this.isSelectorShow = true;
    },
    payClick() {
      this.isPay = true;
      this.showPopup();
    },
    acceptClick() {
      this.isPay = false;
      this.showPopup();
    },
    acceptData(data) {
      this.acceptList = data;
    },
    payData(data) {
      this.payList = data;
    },
    onSelectorChoose(item) {
      if (this.isPay) {
        this.payList[0].value = item.text;
        this.payList[0].error = "";
        this.payList[0].brief = `可用余额${item.balance}`;
        this.cardInfo = item;
        this.payKeys = Math.random();
      } else {
        this.acceptList[0].value = item.text;
        this.acceptList[0].error = "";
        this.acceptList[1].title = item.text;
        this.acceptKeys = Math.random();
      }
    },
    // 获取币种信息
    async getCurrencyList() {
      try {
        const res = await app.api.rpc("BZ0001", {});
        if (res.bzList && res.bzList.length > 0) {
          this.currencyData[0].options = res.bzList.map((item, index) => {
            return { text: item.name, value: index };
          });
        }
      } catch (error) {
        console.log("获取币种信息报错", error);
      }
    },
    async getCardList() {
      try {
        const res = await app.api.rpc("ZH0001", {});
        console.warn("获取的数据", res);
        if (res.cardList && res.cardList.length > 0) {
          res.cardList.forEach((item, index) => {
            item.text = `${item.cardNo}(${item.currency}${item.cardType})`;
            item.value = index + 1;
          });
          this.payWayList = res.cardList;
        }
      } catch (error) {
        console.log("获取卡列表报错", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
