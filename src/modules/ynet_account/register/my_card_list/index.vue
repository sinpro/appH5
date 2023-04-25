<template>
  <div class="my_card_list">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <div
      v-for="(item, index) in bankList"
      :key="index"
      class="item"
      @click="handleEasyBind(item)"
    >
      <img
        class="item_logo"
        :src="item.logo"
      >
      <div class="item_info">
        <div class="item_title">
          {{ item.title }}
        </div>
        <div class="item_label">
          {{ item.label }}
        </div>
        <div class="item_num">
          {{ item.mask }}
        </div>
      </div>
      <div
        class="item_control"
        @click="handleEasyBind(item)"
      >
        <span>快速绑卡</span>
        <img
          class="item_arrow"
          :src="require('@/common/cssBundle/assets/registered/rightArrow.png')"
        >
      </div>
    </div>
    <!--        <div-->
    <!--            class="add_card"-->
    <!--            @click="handleAddCardClick"-->
    <!--        >-->
    <!--            <img :src="require('@/common/cssBundle/assets/registered/add.png')">-->
    <!--            <span>添加银行卡</span>-->
    <!--        </div>-->
  </div>
</template>

<script>
import mHeader from '@/common/components/header'

export default {
  components: {
    mHeader,
  },

  data() {
    return {
      bankList: [],
      IDInfo: null,
    }
  },

  created() {
    this.getIDInfo()
      .then(this.getBankList)
  },

  methods: {
    getBankList() {
      const _this = this
      const { IDNo, IDName } = this.IDInfo

      const data = {
        certNo: IDNo,
        certType: '10',
        name: IDName,
      }
      app.api.rpc('UR0050', data).then(response => {
        const { depositCardList, creditCardList, mobileNo } = response

        depositCardList.forEach(item => {
          _this.bankList.push({
            logo: require('@/common/cssBundle/assets/registered/bank_eg.png'),
            title: item.bankName,
            label: '一卡通储蓄卡',
            num: item.accountNo_sequence,
            mask: item.accountNo_mask,
            bankCode: item.bankCode,
            type: '2',
            telNumber: mobileNo,
          })
        })
        creditCardList.forEach(item => {
          _this.bankList.push({
            logo: require('@/common/cssBundle/assets/registered/bank_eg.png'),
            title: item.bankName,
            label: '信用卡',
            num: item.accountNo_sequence,
            mask: item.accountNo_mask,
            bankCode: item.bankCode,
            type: '1',
            telNumber: mobileNo,
          })
        })

        console.log(_this.bankList)
      })
    },

    getIDInfo() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage('registerIDInfo').then(response => {
          this.IDInfo = JSON.parse(response)
          resolve()
        })
      })
    },

    handleEasyBind(data) {
      app.api.pushWindow('/ynet_account/register/add_bank_card_home.html', data)
    },

    handleAddCardClick() {
      app.api.pushWindow('/ynet_account/register/add_bank_card.html')
    },
  },
}
</script>

<style lang="scss" scope>
    .my_card_list {
        padding: 0 .32rem;

        .item {
            width: 100%;
            height: 2.12rem;
            background-color: #fff;
            border-radius: .08rem;
            margin-top: .32rem;
            display: flex;
            box-shadow: 0 .04rem .12rem 0 rgba(155,155,155,0.26);

            .item_logo {
                width: .8rem;
                height: .8rem;
                margin-left: .2rem;
                margin-top: .24rem;
            }

            .item_control {
                height: .4rem;
                line-height: .4rem;
                margin-right: .2rem;
                font-size: .28rem;
                color: #999;
                margin-top: .32rem;

                .item_arrow {
                    display: inline-block;
                    width: .1rem;
                    height: .2rem;
                    margin-left: .1rem;
                    font-size: 0;
                }
            }

            .item_info {
                flex: 1;
                margin-left: .2rem;

                .item_title {
                    line-height: .44rem;
                    color: #333;
                    font-size: .32rem;
                    margin-top: .28rem;
                }

                .item_label {
                    line-height: .32rem;
                    color: #999;
                    font-size: .24rem;
                    line-height: .32rem;
                    margin-top: .08rem;
                }

                .item_num {
                    font-size: .28rem;
                    line-height: .4rem;
                    color: #333;
                    margin-top: .44rem;
                }
            }
        }

        .add_card {
            height: .88rem;
            line-height: .88rem;
            border: .01rem dashed #bbb;
            border-radius: .08rem;
            margin-top: .48rem;
            text-align: center;
            font-size: .24rem;

            img {
                display: inline-block;
                width: .32rem;
                height: .32rem;
                font-size: 0;
                vertical-align: middle;
                margin-right: .04rem;
            }

            span {
                vertical-align: middle;
            }
        }
    }
</style>
