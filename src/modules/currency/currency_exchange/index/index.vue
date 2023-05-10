<template>
  <!--
    ******************************************************
    * @Descripttion:  外币兑换输入页面
    *   2023-05-10    王鸣燕
    ******************************************************
  -->
  <!-- 根节点 -->
  <div class="wrap">
    <section class="page_main">
      <!-- 卖出信息 -->
      <div class="box mt15">
        <p>我要卖出</p>
        <md-cell-item no-border>
          <div slot="left">
            <!-- 卖出的货币列表，点击触发底部弹窗 -->
            <custom-select
              :list="saleCurrencyList"
              defaultValue="0"
              @changeItem="handleSaleItem"
              :key="selectSaleKeys"
            />
          </div>

          <!-- 选中的卖出账户信息反显，点击触发底部弹窗 -->
          <div slot="right" class="cell_item sale_cell_right" @click="showSelector('sale')">
            <div>
              <p>{{selectedSaleCard.text}}</p>
              <p>{{selectedSaleCard.desc}}</p>
              <p v-if="selectedSaleCard.balance" class="desc">可用结余：{{selectedSaleCard.balance}}元</p>
            </div>
            <md-icon name="arrow-right" size="lg"></md-icon>
          </div>
        </md-cell-item>
        <p></p>
      </div>

      <!-- 买入信息 -->
      <div class="box">
        <p>我要买入</p>
        <md-cell-item>
          <div slot="left">
            <!-- 买入的货币列表，点击触发底部弹窗 -->
            <custom-select
              :list="buyCurrencyList"
              defaultValue="0"
              @changeItem="handleBuyItem"
              :key="selectBuyKeys"
            />
          </div>

          <!-- 选中的买入账户信息反显，点击触发底部弹窗 -->
          <div slot="right" class="cell_item sale_cell_right" @click="showSelector('buy')">
            <div>
              <p>{{ selectedBuyCard.text }}</p>
              <p>{{ selectedBuyCard.desc }}</p>
            </div>
            <md-icon name="arrow-right" size="lg"></md-icon>
          </div>
        </md-cell-item>
        <p></p>
      </div>

      <!-- 金额输入框 -->
      <md-field title="金额">
        <md-input-item
          ref="inputMoney"
          type="money"
          is-amount
          v-model="exchangeAmount"
          placeholder="请输入金额"
          maxlength="13"
          :error="exchangeAmountError"
          @change="changeMoneyInput"
        >
          <div slot="left" class="left">
            <!-- 买入/卖出，点击触发底部弹窗 -->
            <custom-select
              :list="selectedStyleList"
              defaultValue="0"
              @changeItem="handleStyleItem"
            />
          </div>
          <div slot="right" class="right">{{inputCurrency}}</div>
        </md-input-item>
        <p></p>
      </md-field>

      <!-- 换算金额和货币信息 -->
      <p class="box" v-if="conversionMoney">
        {{selectStyle.value === '0' ? '卖出' :'买入'}}
        <span
          class="money"
        >{{conversionMoney | formatMoney}} {{selectStyle.value === '0' ? selectedSaleCurrency.text : selectedBuyCurrency.text}}</span>
      </p>

      <!-- 最新的货币兑换信息以及时间 -->
      <div class="box cell_item pb20">
        <div class="infos">
          <p>
            <!-- selectStyle.value 为 '0' 时，表示买入，文案展示为 买入货币 卖出货币 汇率 -->
            <!-- 不为 '0' 时，表示卖出，文案展示为 卖出货币 买入货币 汇率 -->
            <span>{{selectStyle.value === '0' ? selectedBuyCurrency.text :selectedSaleCurrency.text}}1</span>
            <span>{{selectStyle.value === '0' ? selectedSaleCurrency.text :selectedBuyCurrency.text}}</span>

            <!-- newRateData.exchangeOldRate  旧的汇率 -->
            <span
              class="old_rate"
              v-show="newRateData.exchangeOldRate"
            >{{newRateData.exchangeOldRate}}</span>

            <!-- newRateData.exchangeNewRate  新的汇率 -->
            <span
              :class="{'new_rate': !!newRateData.exchangeOldRate}"
            >{{newRateData.exchangeNewRate}}</span>
          </p>

          <p class="time" v-if="newRateData.newDate">截至{{newRateData.newDate}}</p>
        </div>

        <!-- 刷新按钮，点击获取最新汇率信息 -->
        <md-icon name="refresh" size="lg" @click="handleRefreshClick"></md-icon>
      </div>

      <!-- 下一步按钮，点击触发下一步方法 -->
      <custom-button type="default" @clickHandle="handleNextClick">下一步</custom-button>

      <!-- 买入/卖出账户列表底部弹窗 -->
      <div v-if="selectList&&selectList.length > 0">
        <md-selector
          v-model="isSelectorShow"
          :data="selectList"
          hide-title-bar
          large-radius
          is-check
          iconSize="lg"
          @choose="onSelectorChoose"
        >
          <template slot-scope="{ option, index, selected }">
            <div class="selector-item-body" :class="{selected}">
              <div class="selector-item-left">
                <span v-text="option.icon"></span>
              </div>
              <div>
                <p v-text="option.text"></p>
                <p v-text="option.desc"></p>
              </div>
            </div>
          </template>
        </md-selector>
      </div>
    </section>
  </div>
</template>

<script>
import { CellItem, Icon, Field, InputItem, Selector } from "mand-mobile";
import CustomButton from "../../components/CustomButton.vue";
import CustomSelect from "../../components/CustomSelect.vue";
import mHeader from "@/common/components/header";
import utils from "../../utils";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [CustomButton.name]: CustomButton,
    [CustomSelect.name]: CustomSelect,
    [Selector.name]: Selector,
    [mHeader.name]: mHeader
  },
  // 页面所需数据
  data() {
    return {
      // 金额输入框的报错信息
      exchangeAmountError: "",
      // 按照汇率换算后的金额
      conversionMoney: "",
      // 最新的汇率信息
      newRateData: {},
      // 输入的金额
      exchangeAmount: "",
      // 选中的买入/卖出的货币名称
      inputCurrency: "",
      // 用于区分当选中的是买入/卖出
      selectType: "",
      // 用于刷新买入的货币选择框
      selectBuyKeys: 0,
      // 用于刷新卖出的货币选择框
      selectSaleKeys: 0,
      // 隐藏/显示卖出/买入的账户列表
      isSelectorShow: false,
      // 当前选中的买入/卖出账户列表
      selectList: [],
      // 卖出的账户列表
      saleCardList: [],
      // 卖出的货币列表
      saleCurrencyList: [],
      // 买入的货币列表
      buyCurrencyList: [],
      // 选中的买入/卖出
      selectStyle: { text: "买入", value: "0" },
      // 选中的买入的卡信息
      selectedBuyCard: {
        text: "",
        desc: ""
      },
      // 选中的卖出的卡信息
      selectedSaleCard: {
        text: "",
        desc: "",
        balance: ""
      },
      // 选中的买入的货币信息
      selectedBuyCurrency: {
        text: "",
        value: ""
      },
      // 选中的卖出的货币信息
      selectedSaleCurrency: {
        text: "",
        value: ""
      },
      // 买入/卖出
      selectedStyleList: [
        {
          text: "买入",
          value: "0"
        },
        {
          text: "卖出",
          value: "1"
        }
      ]
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
    // 获取卖出的货币列表数据
    this.getSaleRateData();

    // 获取买入的货币列表数据
    this.getBuyRateData();

    // 获取卡列表数据
    this.getCardList();

    // 获取最新的货币兑换汇率
    this.handleRefreshClick();
  },
  // DOM加载完毕执行
  mounted() {
    // 展示页面的左上角的返回 icon
    app.api.showLeftMenu(true);

    // 设置页面头部右上角的 外币牌价查询 以及点击方法
    app.api.setRightMenu(
      {
        menus: [{ icontype: "", text: "外币牌价查询", color: "#FF000000" }]
      },
      result => {
        // 跳转到 外币牌价查询 页面
        app.api.pushWindow("/currency/currency_quotation/index.html");
      }
    );
  },
  // 页面用到的方法
  methods: {
    /**
     *  格式化账户为 XXX-XX-XXXXXXX
     * @param account {string} 账户
     */
    formatAccount(account) {
      if (!account) return account;
      return account.replace(/(\d{3})(\d{2})(\d)/, "$1-$2-$3");
    },

    /**
     *  匹配对应的卡类型
     * @param cardType {string} 卡类型标识
     */
    formatCardType(cardType) {
      if (!cardType) return cardType;

      // 接口返回的 卡类型标识
      const codeList = ["A", "B", "C"];

      // 对应的卡类型枚举
      const descList = ["储蓄账户", "个人结算帐户", "信用卡帐户"];

      const index = codeList.findIndex(item => item === cardType);

      // 未匹配到对应的枚举
      if (index === -1) {
        return cardType;
      }

      return descList[index] || cardType;
    },

    // 获取买入的货币列表数据
    async getBuyRateData() {
      try {
        const res = await app.api.rpc("BC0001", {});
        if (res.buyCurrency && res.buyCurrency.length > 0) {
          // 处理买入货币数据，组件需要 value 属性做为标识
          this.buyCurrencyList = res.buyCurrency.map((item, index) => {
            return { value: String(index), ...item };
          });

          // 默认选中货币列表的第一项
          this.selectedBuyCurrency = this.buyCurrencyList[0];

          // 输入框右侧展示默认货币
          this.inputCurrency = this.selectedBuyCurrency.text;

          // 刷新买入货币选择组件
          this.selectBuyKeys = Math.random();
        }
      } catch (error) {
        console.log("获取买入货币列表报错");
      }
    },

    // 获取卖出的货币列表数据
    async getSaleRateData() {
      try {
        const res = await app.api.rpc("SC0001", {});
        if (res.saleCurrency && res.saleCurrency.length > 0) {
          // 处理卖出货币数据，组件需要 value 属性做为标识
          this.saleCurrencyList = res.saleCurrency.map((item, index) => {
            return { value: String(index), ...item };
          });

          // 默认选中卖出货币列表的第一项
          this.selectedSaleCurrency = this.saleCurrencyList[0];

          // 刷新卖出货币选择组件
          this.selectSaleKeys = Math.random();
        }
      } catch (error) {
        console.log("获取卖出货币列表报错");
      }
    },

    // 获取卡列表数据
    async getCardList() {
      try {
        const res = await app.api.rpc("ZH0001", { userInfo: {} });
        if (res.cardList && res.cardList.length > 0) {
          // 处理卖出卡列表数据，增加 text、value、desc 属性
          this.saleCardList = res.cardList.map((item, index) => {
            return {
              text: `${this.formatAccount(item.cardNo)} ${item.symbol}`,
              desc: this.formatCardType(item.cardType),
              value: index,
              ...item
            };
          });

          // 卖出的卡列表默认选中第一项
          this.selectedSaleCard = this.saleCardList[0] || [];

          // 买入的卡列表默认选中第二项
          this.selectedBuyCard = this.saleCardList[1] || [];

          // 获取选中的卡列表的余额
          const balance = await this.getCardBalance(
            this.selectedSaleCard.cardNo
          ).catch(() => "");

          // 展示卖出的账户的余额信息
          this.$set(this.selectedSaleCard, "balance", balance);

          // 刷新卡列表选择组件
          this.selectCardKeys = Math.random();
        }
      } catch (error) {
        console.log("获取卡列表报错");
      }
    },

    /**
     *  切换卖出的货币信息
     * @param data {object} 当前选中的卖出的货币信息
     */
    handleSaleItem(data) {
      this.selectedSaleCurrency = data;

      // value 为 '1',表示选中操作的是卖出
      if (this.selectStyle.value === "1") {
        // 将输入框右侧的货币替换成选中的货币
        this.inputCurrency = data.text;
      }

      // 获取选中的货币的最新汇率信息
      this.handleRefreshClick(true);
    },

    /**
     *  切换买入的货币信息
     * @param data {object} 当前选中的买入的货币信息
     */
    handleBuyItem(data) {
      this.selectedBuyCurrency = data;

      // value 为 '0',表示选中操作的是买入
      if (this.selectStyle.value === "0") {
        // 将输入框右侧的货币替换成选中的货币
        this.inputCurrency = data.text;
      }

      // 获取选中的货币的最新汇率信息
      this.handleRefreshClick(true);
    },

    /**
     *  切换操作方式
     * @param data {object} 当前选中的操作方式
     */
    handleStyleItem(data) {
      this.selectStyle = data;

      /**
       * value 为 '0',表示选中操作的是买入，将输入框右侧的货币替换成买入的货币
       * value 为 '1',表示选中操作的是卖出，将输入框右侧的货币替换成卖出的货币
       */
      this.inputCurrency =
        data.value === "0"
          ? this.selectedBuyCurrency.text
          : this.selectedSaleCurrency.text;

      // 获取选中的货币的最新汇率信息
      this.handleRefreshClick("refresh");
    },

    // 点击下一步按钮触发
    handleNextClick() {
      // 金额未输入或者输入有误
      if (!this.exchangeAmount || this.exchangeAmount.charAt(0) === "0") {
        this.exchangeAmountError = "请输入正确的金额";
        return;
      }

      // 输入的金额大于可用结余
      if (+this.exchangeAmount > this.selectedSaleCard.balance) {
        this.exchangeAmountError = "余额不足";
        return;
      }

      // 跳转到外币兑换确认页面需要携带的数据
      const params = {
        exchangeAmount: this.exchangeAmount,
        buyCurrency: this.selectedBuyCurrency,
        saleCurrency: this.selectedSaleCurrency,
        conversionMoney: this.conversionMoney,
        selectedBuyCard: this.selectedBuyCard,
        selectedSaleCard: this.selectedSaleCard,
        selectStyle: this.selectStyle,
        newRateData: this.newRateData
      };

      // 跳转页面
      app.api.pushWindow("/currency/currency_exchange/comfirm.html", params);
    },

    /**
     *  切换账户信息
     * @param data {object} 当前选中的账户信息
     */
    async onSelectorChoose(data) {
      /**
       * selectType 为 'buy' ,表示选中的是买入，展示买入账户列表
       * selectType 为 'sale' ,表示选中的是卖出，展示卖出账户列表
       */
      if (this.selectType === "buy") {
        this.selectedBuyCard = data;
      } else {
        // 选中的是卖出
        this.selectedSaleCard = data;

        // 查询余额信息
        const balance = await this.getCardBalance(data.cardNo).catch(() => "");
        this.$set(this.selectedSaleCard, "balance", balance);
      }
    },

    /**
     * 获取选中的卡列表的余额
     * @param cardNo {string} 银行卡号
     */
    async getCardBalance(cardNo) {
      try {
        const res = await app.api.rpc("YE0001", { cardNo });
        const index = Math.floor(Math.random() * 3);
        const balanceObj = res.balanceList[index];
        return balanceObj.balance || "";
      } catch (error) {
        console.log("获取余额报错");
        return "";
      }
    },

    /**
     *  切换账户列表的显示/隐藏
     * @param type {string} 操作类型 'sale' 卖出 | 'buy' 买入
     */
    showSelector(type) {
      this.isSelectorShow = true;
      this.selectType = type;
      if (type === "sale") {
        // 账户选择组件的数据赋值为卖出账户列表
        this.selectList = this.saleCardList;
      } else {
        // 账户选择组件的数据赋值为买入账户列表
        this.selectList = JSON.parse(JSON.stringify(this.saleCardList));
      }
    },

    /**
     *  获取最新的货币兑换汇率
     * @param type {boolean} 是否需要刷新换算金额 true | false
     */
    async handleRefreshClick(type = false) {
      try {
        const res = await app.api.rpc("HL0001", {});
        const index = Math.floor(Math.random() * 3);
        const exchangeObj = res.exchangeList[index];
        const {
          exchangeNewRate = "",
          exchangeOldRate = "",
          newDate = ""
        } = exchangeObj;
        this.newRateData = {
          exchangeNewRate,
          exchangeOldRate,
          newDate
        };

        // type 为 true 时，需要重新计算输入的金额的换算金额
        if (exchangeOldRate !== exchangeNewRate || type === "refresh") {
          // 调用输入框的输入事件
          this.changeMoneyInput();
        }
      } catch (error) {
        console.log("获取最新汇率出错");
      }
    },

    // 输入框的输入事件
    changeMoneyInput() {
      // 清空输入框的报错信息
      this.exchangeAmountError = "";

      // 输入的金额第一位不为0
      if (this.exchangeAmount.charAt(0) !== "0") {
        // 计算输入的金额的换算金额
        this.conversionMoney =
          this.exchangeAmount * this.newRateData.exchangeNewRate;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
