<template>
  <div class="set_tran_pwd">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <ynet-register-title
      title="请设置您的交易密码"
      desc="为保护您的账户安全，请设置6位数的交易密码"
    />
    <div
      class="pwd"
      @click="handlePwdClick"
    >
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 0 }"
        />
      </div>
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 1 }"
        />
      </div>
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 2 }"
        />
      </div>
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 3 }"
        />
      </div>
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 4 }"
        />
      </div>
      <div class="pwd_item">
        <div
          class="pwd_itemPoint"
          :class="{ active: passwordLength > 5 }"
        />
      </div>
    </div>
    <div style="visibility: hidden;">
      <ynet-input
        ref="myInput"
        v-model="firTranPwd"
        title="设置密码"
        type="number"
        :max="6"
        :min="6"
        :debounce="0"
        :is-encry="true"
        :random-key="randomStr"
        @on-password-change="handleChangePwd"
      />
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetInput from '@/common/components/ynet_input_test'
import ynetRegisterTitle from '@/common/components/ynet_register_title'

export default {
  components: {
    mHeader,
    ynetInput,
    ynetRegisterTitle,
  },

  data() {
    return {
      firTranPwd: '',
      firstPasswordMD5: '',
      passwordLength: 0,
      randomStr: '',
    }
  },

  mounted() {
    this.getRandomStr().then(() => {
      setTimeout(() => {
        this.$refs.myInput.parentShowkeyboard()
      }, 300)
    })
  },

  methods: {
    handleChangePwd(val) {
      const { length, md5, value } = val

      this.passwordLength = length
      this.firstPasswordMD5 = md5

      if (length === 6) {
        document.documentElement.click()

        app.api.pushWindow('ynet_account/register/check_tran_pwd.html', {
          firstPasswordMD5: md5,
          firTranPwd: value,
        })
      }
    },

    handlePwdClick() {
      this.$refs.myInput.parentShowkeyboard()
    },

    getRandomStr() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage('randomKey').then(response => {
          const { randomStr } = JSON.parse(response)
          this.randomStr = randomStr
          resolve()
        })
      })
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .set_tran_pwd {
        background-color: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .title {
            font-size: 0.6rem;
            line-height: 0.84rem;
            color: #333;
            text-align: center;
            margin-top: 0.4rem;
        }

        .desc {
            height: 0.84rem;
            margin-top: 0.2rem;
            font-size: 0.24rem;
            line-height: 0.34rem;
            color: #999;
            text-align: center;
        }

        .pwd {
            height: 1rem;
            border: 0.01rem solid #999;
            border-right: 0;
            border-radius: 0.08rem;
            margin: 0 0.32rem;
            margin-top: 1.12rem;
            overflow: hidden;
            display: flex;

            .pwd_item {
                flex: 1;
                height: inherit;
                border-right: 0.01rem solid #999;
                text-align: center;
                line-height: 1.2rem;
                vertical-align: middle;
            }

            .pwd_itemPoint {
                display: none;
                width: 0.32rem;
                height: 0.32rem;
                border-radius: 50%;
                background-color: #333;

                &.active {
                    display: inline-block;
                }
            }
        }
    }
</style>
