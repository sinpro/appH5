<!--可配置参数-->

<!--placeholder   placeholder文字-->
<!--maxlength  输入框长度-->
<!--sTimer  秒数-->
<!--text  点击按钮文字（建议不要超过五个字）-->
<!--@clickCode="clickCode" 方法-->
<!--disabled 禁用点击 默认false（可点击）-->
<!--@msgFocus 短信验证码输入框获取焦点时触发事件-->
<!--@msgBlur 短信验证码输入框失去焦点时触发事件-->
<!--@msgChange 短信验证码输入框实时校验-->

<template>
  <div class="my_sms">
    <div class="my_sms_input">
      <input v-model="code" :placeholder="placeholder" type="number" :maxlength="parseInt(maxlength)" @keyup="limit" />
    </div>
    <div :class="['my_sms_btn', btnStatus]" @click="clickCode">
      <div>{{ tipsText }}</div>
    </div>
  </div>
</template>

<script>
import ynetInput from "@/common/components/ynet_input_test";

export default {
  name: "YnetMsgCode",
  components: {
    ynetInput
  },
  props: {
    start: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    msgTitle: {
      type: String,
      default: "短信验证码"
    },
    placeholder: {
      type: String,
      default: "请输入短信验证码"
    },
    maxlength: {
      type: String,
      default: "6"
    },
    sTimer: {
      type: String,
      default: "60"
    },
    text: {
      type: String,
      default: "获取验证码"
    },
    rpcName: {
      type: String,
      default: "getMsgCode"
    },
    value: {
      type: String,
      default: ""
    },
    rightArrow: {
      type: Boolean,
      default: false
    },
    arrowType: {
      type: String,
      default: "big"
    },
    valueColor: {
      type: String,
      default: ""
    },
    rotate: {
      type: Boolean,
      default: false
    },
    roundIcon: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    leftInput: {
      type: Boolean,
      default: false
    },
    trulyMobile: {
      type: Boolean
    }
  },
  data() {
    return {
      isClear: false,
      isTipsColor: false,
      code: "",
      tipsText: "",
      ss: "",
      timer: "",
      canClick: true,
      reserveing: false
    };
  },
  computed: {
    spanClass() {
      return {
        "tips-color": this.disabled == true //根据disable 将'获取验证码'置灰
      };
    },

    isTrulyMobile() {
      return this.trulyMobile;
    },

    btnStatus() {
      if (!this.isTrulyMobile) {
        return "active";
      } else {
        if (this.canClick) {
          return "active";
        } else {
          return "loading";
        }
      }
    }
  },
  watch: {
    value(newValue) {
      this.code = newValue.slice(0, parseInt(this.maxlength));
    },
    code(newValue) {
      this.isClear = newValue != "";
      this.$emit("input", newValue);
    }
  },
  created() {
    this.code = this.value.slice(0, parseInt(this.maxlength));
    this.ss = this.sTimer;
    this.tipsText = this.text;
    this.title = this.msgTitle;
  },
  methods: {
    limit(ev) {
      this.code = ev.target.value.replace(/\D/g,'');
    },

    clear() {
      clearTimeout(this.timer);
      this.tipsText = this.text;
      this.canClick = true;
      this.reserveing = false;
      this.ss = this.sTimer;
      this.isTipsColor = false;
    },

    clickCode() {
      console.log("点击重新获取验证码");
      this.code = '';
      this.$emit("clickCode", () => {
        if (this.isTrulyMobile) {
          //防重复点击读秒=========================
          if (!this.canClick) {
            return;
          }
          this.canClick = false;
          //=====================================

          if (!this.start) {
            //start逻辑 是否启用验证码发送后才进行读秒
            return;
          }
          this.startSendCode();
        }
      });
    },
    startSendCode() {
      if (this.disabled) {
        //disabled逻辑 禁止点击按钮
        return;
      }
      //防止读秒时此方法被多次调用(ref的方式)======
      if (this.reserveing) {
        return;
      }
      this.reserveing = true;
      //======================================
      this.reserveTime();
    },
    reserveTime() {
      this.isTipsColor = true;
      this.tipsText = this.ss + "s后重发";
      this.timer = setTimeout(() => {
        if (this.ss == 1) {
          clearTimeout(this.timer);
          this.tipsText = this.text;
          this.canClick = true;
          this.reserveing = false;
          this.ss = this.sTimer;
          this.isTipsColor = false;
          return;
        }
        this.ss--;
        this.reserveTime();
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.my_sms {
  display: flex;

  .my_sms_input {
    flex: 1;

    > input {
      display: block;
      width: 100%;
      line-height: 0.48rem;
      font-size: 0.32rem;
    }

    .my_input {
      border-bottom: 0;
      margin: 0;
      height: 0.48rem;
      margin-right: 0.32rem;
    }
  }

  .my_sms_btn {
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.32rem;
    width: 1.82rem;
    text-align: right;
  }
  .active {
    color: #6161f2;
  }

  .loading {
    pointer-events: none;
    color: #999999;
  }

  .disabled {
    color: #bbbbbb;
  }
}

.md-cell-item {
  .my_sms {
    .my_sms_input {
      > input {
        line-height: 1.2;
      }
    }
    .my_sms_btn {
      line-height: 1.2;
      height: auto;
    }
  }
}
</style>
