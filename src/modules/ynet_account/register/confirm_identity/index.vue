<template>
  <div
    class="validate_identity"
    style="background: #ffffff"
  >
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <ynet-register-title
      title="请完善您的身份信息"
      desc="请确认您的身份信息，如信息有误可进行修改"
    />
    <div class="user_info">
      <ynet-input
        v-model="IDNo"
        class="icon_scan"
        title="身份证"
        :max="18"
        :right-icon="require('@/common/cssBundle/assets/registered/scan@2x.png')"
        type="text"
        @rightIcon="handleScanClick"
        @on-keyup="limitID"
      />
      <ynet-input
        v-model="IDName"
        title="姓名"
      />
      <ynet-input
        v-model="IDAddress"
        title="住址"
      />
      <div class="job_select">
        <div class="job_select_label">
          职业
        </div>
        <div
          class="job_select_choose"
          @click="handleJobListClick"
        >
          <p style="color: #333; font-size: 0.26rem;" v-if="jobInfo">{{ jobInfo.name }}</p>
          <p v-else>请选择</p>
          <img
            :src="
              require('@/common/cssBundle/assets/registered/bottomArrow.png')
            "
          >
        </div>
      </div>
    </div>
    <ynet-agreement v-model="hasChecked">
      本人为
      <a
        class="constitution"
        @click.stop.prevent="go_business_constitution"
      >
        《税收居民》
      </a>
    </ynet-agreement>
    <div class="btn-box confirm_btn">
      <button
        class="btn-lg"
        @click="handleNextClick"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetInput from '@/common/components/ynet_input'
import ynetAgreement from '@/common/components/ynet_agreement'
import ynetRegisterTitle from '@/common/components/ynet_register_title'

// todo: 1. right input box has icon issue.

export default {
  components: {
    mHeader,
    ynetInput,
    ynetAgreement,
    ynetRegisterTitle,
  },

  data() {
    return {
      IDNo: '',
      IDName: '',
      IDAddress: '',
      jobList: [],
      jobInfo: null,
      hasChecked: true,
      requestData: {},
    }
  },

  created() {
    this.initData()
    this.getJobList()
  },

  methods: {
    handleNextClick() {
      this.checkCanISendRPC().then(this.checkIDInfo)
    },

    limitID(val) {
      this.IDNo = val.replace(/[^0-9A-Z]/g, '');
    },

    checkCanISendRPC() {
      return new Promise((resolve, reject) => {
        this.checkIDNumber()
          .then(this.checkIDName)
          .then(this.checkAddress)
          .then(this.checkJobValue)
          .then(() => resolve())
      })
    },

    handleScanClick() {
      app.api.closeToPage('/ynet_account/register/check_identity.html')
    },

    handleJobListClick() {
      const jobDefaultValue = [this.jobList[0]]

      app.api
        .showPickerView({
          title: ' ',
          dataSource: this.jobList,
          defaultValue: jobDefaultValue,
        })
        .then(response => {
          const { result } = response

          if (result.length !== 0) {
            this.jobInfo = result[0]
          } else {
            this.jobInfo = null
          }
        })
    },

    initData() {
      const {
        IDNo = '',
        IDName = '',
        IDAddress = '',
        IDFront,
        IDBack,
        handAndID,
        requestData,
      } = app.params

      this.IDNo = IDNo
      this.IDName = IDName
      this.IDAddress = IDAddress
      this.requestData = requestData
      this.IDFront = IDFront
      this.IDBack = IDBack
      this.handAndID = handAndID
    },

    getJobList() {
      app.api.rpc('UR0048').then(response => {
        const { professionModeList } = response

        const jobList = professionModeList.map(item => {
          const obj = {}

          obj.name = item.name
          obj.value = item.orderNo

          return obj
        })

        this.jobList = jobList
      })
    },

    uploadImage() {
      const baseArr = [this.IDFront, this.IDBack, this.handAndID];

      const imageFiles = baseArr.map(url => ({
          base64Text: String(url).split('base64,')[1] || String(url),
          filename: `id-${~~(Math.random() * Math.pow(10, 10))}-${Date.now()}.png`,
        })
      );
      app.api.rpc('UR0015', {
        imageFiles: imageFiles,
      }).then(({ domainUrl, uploadFileList }) => {
        app.api.rpc('UR0029', {
          idCardFontPicSrcPath: uploadFileList[0].filePath,
          idCardBackPicSrcPath: uploadFileList[1].filePath,
          idCardHandPicSrcPath: uploadFileList[2].filePath
        }).then(() => {
          app.api.pushWindow('/ynet_account/register/start_face.html')
        }).catch(() => {
          alert(
            '提示',
            '身份认证图片上传失败，请重试。',
            { button: '我知道了' }
          )
        });
      }).catch(() => app.api.alert('身份认证图片上传失败，请重试。'));
    },

    checkIDInfo() {
      const data = {
        ...this.requestData,
        profession: this.jobInfo.value,
        taxResidentFlag: this.hasChecked ? '1' : '0',
      }

      app.api.rpc('UR0011', data).then(response => {
        const { checkResult } = response

        if (checkResult === '0') {
          this.uploadImage();
        } else {
          alert(
            '提示',
            '您的实名信息认证失败，请确认信息后重新认证。',
            { button: '我知道了' }
          )

          if (checkResult === 'AU0005') {
            alert('提示', '未能识别您的身份信息，请重新拍摄', {
              button: '我知道了',
            })
          }
          if (checkResult === 'AU0006') {
            alert(
              '提示',
              '非常抱歉，未能识别您的所持证件，请携带证件前往附近银行办理。',
              { button: '我知道了' }
            )
          }
        }
      })
    },

    checkIDNumber() {
      return new Promise((resolve, reject) => {
        const reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/

        if (reg.test(this.IDNo)) {
          resolve()
        } else {
          app.api.showToast('请输入正确的身份证号码')
        }
      })
    },

    checkIDName() {
      return new Promise((resolve, reject) => {
        if (this.IDName.length >= 2) {
          resolve()
        } else {
          app.api.showToast('请输入正确的姓名')
        }
      })
    },

    checkAddress() {
      return new Promise((resolve, reject) => {
        if (this.IDAddress.length === 0) {
          app.api.showToast('住址不能为空')
        } else {
          resolve()
        }
      })
    },

    checkJobValue() {
      return new Promise((resolve, reject) => {
        if (this.jobInfo) {
          resolve()
        } else {
          app.api.showToast('请选择您的职业')
        }
      })
    },
  },
}
</script>

<style lang="scss">
.validate_identity {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    .tip {
        padding: 0 0.32rem;
        color: #999;
    }
    a {
        text-decoration: underline;
        color: #999;
    }
    .alarm {
        font-size: 0.2rem;
        color: $theme-color;
        float: right;
        padding: 0.2rem 0.35rem 0 0;
        height: 0.2rem;
        line-height: 0.2rem;
    }

    .confirm_title {
        padding-top: 0.4rem;
        font-size: 0.6rem;
        line-height: 0.84rem;
        text-align: center;
        color: #333;
    }

    .constitution {
        color: $ynet-dark-purple;
    }

    .confirm_btn {
        margin-top: 0.64rem;
        margin-bottom: 1.14rem;
    }

    .ynet-agreement {
        margin-top: 0.16rem;
    }

    .job_select {
        margin-top: 0.32rem;
        height: 0.97rem;
        border-bottom: 0.01rem solid #dfdfdf;
        display: flex;
        line-height: 0.96rem;

        .job_select_label {
            color: #333;
            font-size: 0.32rem;
        }

        .job_select_choose {
            flex: 1;
            text-align: right;
            font-size: 0.32rem;
            color: #bbb;

            p {
                display: inline-block;
                vertical-align: middle;
            }

            img {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                vertical-align: middle;
            }
        }

        .job_select_value {
            text-align: right;
            font-size: 0.32rem;
            color: #333;
            flex: 1;
            overflow: hidden;
        }
    }

    .user_info {
        margin-top: 0.64rem;
        padding: 0 0.32rem;

        .ynet-input {
            margin-top: 0.32rem;
            padding-left: 0 !important;
            border-bottom: 0.01rem solid #dfdfdf;

            &:after {
                border: 0 !important;
            }
            .textarea {
              width: 5rem;
              overflow-y: scroll;
              word-break: break-all;
              word-wrap: break-word;
              white-space: normal;
              line-height: normal;
            }
        }

        .ynet-input__title {
            color: #333 !important;
            font-size: 0.32rem !important;
        }

        .ynet-input__box {
            padding-right: 0 !important;
        }

        .ynet-input__right-icon {
            padding-right: 0 !important;
        }
    }
}
</style>
