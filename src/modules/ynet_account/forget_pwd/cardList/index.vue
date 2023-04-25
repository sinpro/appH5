<template>
  <div class="cardList">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <ynet-register-title title="请您验证银行卡" />
    <p style="padding-left:0.32rem;color:#333">
      为保护您的账户安全，请选择一张银行卡进行验证
    </p>

    <div class="bankCardList">
      <div
        v-for="(item,index) in cardList"
        :key="index"
        class="cardItem"
        @click="jump(item)"
      >
        <img
          src="./icon@3x.png"
          alt=""
        >
        <div style="width:3.5rem">
          <div class="content">
            <p class="bankName">
              {{ item.bankName }}
            </p>
            <span>{{ item.type }}</span>
          </div>
          <div class="cardNo">
            {{ item.showNo }}
          </div>
        </div>
        <div class="use">
          <div>汇入/支付账户</div>
          <span>日常购物</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ynetAgreement from '@/common/components/ynet_agreement';
import ynetPrompt from '@/common/components/ynet_prompt';
import ynetInput from '@/common/components/ynet_input_test';
import ynetRegisterTitle from '@/common/components/ynet_register_title';
export default {
  name:'CardList',
  components: {
    ynetAgreement,
    ynetPrompt,
    ynetInput,
    ynetRegisterTitle,
  },
  data(){
    return {
      cardList:[
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
        // {bankName:'广发银行',showNo:'3947 **** **** 2357',accountType:'借记卡'},
      ],
      mp_sId: ''
    }
  },
  mounted(){
    console.log(app.params)
    app.api.closeOther()
    app.api.rpc('LG1008',{
      mp_sId: app.params.mp_sId
    }).then(res => {
      console.log(res.accountListView)

      for(var item of res.accountListView) {
        item.showNo = item.accountNo_mask
        console.log(item.accountNo)
        item.type  = item.accountType == '1'? '信用卡' : '借记卡'
      }
      this.cardList = res.accountListView
    })
  },
  methods:{
    jump(info) {
      console.log(info)
      let jumpInfo = app.params.jumpLink
      this.mp_sId = app.params.mp_sId
      app.api.closeOther()
      app.api.pushWindow("/ynet_account/forget_pwd/checkCard.html", {cardInfo: info,mp_sId: this.mp_sId,jumpLink:jumpInfo,phone:app.params.phone})
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .cardList {
        background: #fff;
        overflow-x: hidden;
        height: 100%;
        .bankCardList{
            padding: 0.64rem 0.32rem;
            background: #fff;
            .cardItem{
                font-family: 'PingFangSC-Regular';
                display: flex;
                flex-direction: row;
                box-shadow: 0 0 14px 0 rgba(186,186,186,0.26);
                border-radius: 4px;
                border: 1px solid rgba(186,186,186,0.26);
                padding: 0.28rem 0.32rem 0.24rem 0.2rem;
                justify-content: space-between;
                margin-bottom: 0.32rem;
                img{
                    width: 0.8rem;
                    height: 0.8rem;
                }
                .content{
                    .bankName{
                        font-size: 0.32rem;
                        color: #333333;
                    }
                    span{
                        font-size: 0.24rem;
                        color: #999999;
                    }
                }
                .cardNo{
                    margin-top: 0.32rem;
                }
                .use{
                    text-align: right;
                    color: #999999;
                    div{
                        font-size: 0.28rem;
                        margin-bottom: 0.8rem;
                    }
                    span{
                        font-size: 0.24rem
                    }
                }
            }
        }
    }
</style>