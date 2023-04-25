<template>
  <div class="reset_password">
    <title-tip text="请设置新登录密码" />
    <div class="form_area">
      <md-cell-item title="设置新密码">
        <safe-input
          slot="right"
          placeholder="请输入新登录密码"
          :inStyle="{textAlign: 'right', fontSize: '0.32rem'}"
          :is-encry="true"
          type="default"
          :max="20"
          :random-key="randomKey"
          @input="password = $event"
          @encrypt="passwordInfo = $event"
        />
      </md-cell-item>
      <md-cell-item title="确认新密码">
        <safe-input
          slot="right"
          placeholder="请确认新登录密码"
          :inStyle="{textAlign: 'right', fontSize: '0.32rem'}"
          :is-encry="true"
          type="default"
          :max="20"
          :random-key="randomKey"
          @input="confirmPassword = $event"
          @encrypt="confirmPasswordInfo = $event"
        />
      </md-cell-item>
    </div>
    <div class="tip_area">
      密码设置长度为8-20位，必须包含字母，且同时包含数字、字母、符号中任意两种以上字符
    </div>
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="handleComfirmClick"
      >
        确定
      </button>
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile';
import safeInput from '@/common/components/y-encrypt-input';
import titleTip from '@/common/components/title_tip';

export default {
  components: {
    [CellItem.name]: CellItem,
    safeInput,
    titleTip,
  },

  data() {
    return {
      randomKey: '',
      password: '',
      passwordInfo: {},
      confirmPassword: '',
      confirmPasswordInfo: {},
      lastPageData: {},
    }
  },

  mounted() {
    this.getRandomKey()
    this.lastPageData = app.params;
  },

  methods: {
    handleComfirmClick() {
      this.checkPasswordLength()
        .then(this.checkPassword)
        .then(this.resetPassword)
        .then(this.link2Next)
    },

    getRandomKey() {
      app.api.rpc('UR0051').then(response => {
        this.randomKey = response.mathRandom
      })
    },

    resetPassword() {
      return new Promise((resolve, reject) => {
        const data = {
          mathRandom: this.randomKey,
          comfirmPassword: this.confirmPassword,
          password: this.password,
          uploadBusinessSerialNo: this.lastPageData.bussinessNumber,
        }

        console.log(data, '上送数据')

        app.api.rpc('MM0005', data).then(response => {
          console.log(response, '修改登录密码')
          resolve()
        })
      })
    },

    link2Next() {
      app.api.pushWindow('/ynet_account/login_management/reset_password_success.html', this.lastPageData);
    },

    isEmptyObject (obj) {
        for (let key in obj) {
            return false
        }
        return true
    },

    // 1. 两者都为空，点击按钮，toast 密码不能为空
    // 2. 一个为空，另一个不为空，toast 密码不能为空
    // 3. 两行都小于 8 位，toast 密码位数不足，请重新输入
    checkPasswordLength() {
      return new Promise((resolve, reject) => {
        if (
          this.isEmptyObject(this.passwordInfo) &&
          this.isEmptyObject(this.confirmPasswordInfo)
        ) {
          app.api.showToast('密码不能为空')
        } else if (
          this.isEmptyObject(this.passwordInfo) ||
          this.isEmptyObject(this.confirmPasswordInfo)
        ) {
          app.api.showToast('密码不能为空')
        } else if (
          this.passwordInfo.length < 8 &&
          this.confirmPasswordInfo.length < 8
        ) {
          app.api.showToast('密码位数不足，请重新输入')
        } else {
          resolve()
        }
      })
    },

    // 两次密码不一致，弹窗提示
    // 密码不符合 8 - 20 位数字、字母、字符（选两种）组合，弹窗提示
    // 其他进入注册流程
    checkPassword() {
      return new Promise((resolve, reject) => {
        if (this.passwordInfo.md5 !== this.confirmPasswordInfo.md5) {
          app.api.alert('两次输入的密码不一致，请确认后重新输入', '提示', {
            okButton: '我知道了',
          })
        } else {
          if (this.passwordInfo.inputLevel >= 2) {
            resolve()
          } else {
            app.api.alert('您输入的密码格式有误，请确认后重新输入', '提示', {
              okButton: '我知道了',
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss">
.reset_password {
  .form_area {
    background: #fff;
    padding: 0 0.32rem;
  }

  .tip_area {
    margin-top: 0.24rem;
    padding: 0 0.32rem;
    color: #999;
    font-size: 0.24rem;
    line-height: 0.32rem;
  }

  .btn_area {
    margin-top: 0.64rem;
    text-align: center;
  }
}
</style>
