<template>
  <div class="validate_identity">
    <m-header
      :left-menu="[{ icontype: 'close_black' }]"
      :bar-bottom-line-color="ffffff"
      :prevent-back="true"
      @leftHandler="handleCloseClick"
    />
    <ynet-register-title
      title="请上传您的身份证"
      desc="请拍摄您的身份证正反面照片，保证文字清晰可见"
    />
    <div class="IDImages">
      <div
        class="ID_wrapper"
        @click="scanIdCard(true)"
      >
        <template v-if="!IDFront">
          <img
            class="ID_bg"
            :src="require('@/common/cssBundle/assets/registered/IDFront.png')"
          >
          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/camera.png')"
          >
        </template>
        <template v-else>
          <img
            class="ID_bg"
            :src="IDFront"
          >
          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/cameraRe.png')"
          >
        </template>
      </div>
      <div
        class="ID_wrapper"
        @click="scanIdCard(false)"
      >
        <template v-if="!IDBack">
          <img
            class="ID_bg"
            :src="require('@/common/cssBundle/assets/registered/IDBack.png')"
          >
          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/camera.png')"
          >
        </template>
        <template v-else>
          <img
            class="ID_bg"
            :src="IDBack"
          >
          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/cameraRe.png')"
          >
        </template>
      </div>
    </div>
    <div
      v-if="registerConfig.handIdcard && registerConfig.handIdcard === '1'"
      style="margin: 0 .32rem; margin-top: .64rem;"
    >
      <p class="descText">
        请拍摄您手持身份证照片
      </p>
      <div
        class="ID_wrapper"
        style="margin-top: .48rem;"
        @click="takehandAndIDCard"
      >
        <template v-if="!handAndID">
          <img
            class="ID_bg"
            :src="require('@/common/cssBundle/assets/registered/ID&hand.png')"
          >
          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/camera.png')"
          >
        </template>
        <template v-else>
          <img
            class="ID_bg"
            :src="handAndID"
          >

          <img
            class="ID_camera"
            :src="require('@/common/cssBundle/assets/registered/cameraRe.png')"
          >
        </template>
      </div>
    </div>
    <div class="btn-box">
      <button
        class="btn-lg"
        @click="link2ConfrimIdentity"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetRegisterTitle from '@/common/components/ynet_register_title'

export default {
  components: {
    mHeader,
    ynetRegisterTitle,
  },

  data() {
    return {
      IDName: '',
      IDNo: '',
      IDFront: '',
      IDBack: '',
      IDAddress: '',
      IDValidDate: '',
      handAndID: '',
      registerConfig: {},
      registerUserInfo: {},
      mobileNo: '',
    }
  },

  created() {
    this.getRegisterConfig()
    this.getRegisterMobileNo()
    this.getRegisterUserInfo()
    app.api.closeOther()
  },

  methods: {
    scanIdCard(isFront) {
      const scanType = isFront ? '0': '1'

      app.api.showOCRIDCard(scanType).then(response => {
        const {
          certNo,
          certName,
          IDCardFrontImage,
          IDCardBackImage,
          address,
          validity,
        } = response

        if (isFront) {
          this.IDName = certName
          this.IDNo = certNo
          this.IDFront = IDCardFrontImage
          this.IDAddress = address
        }
        if (!isFront) {
          this.IDBack = IDCardBackImage
          this.IDValidDate = validity.replace(/\-/g, '')
        }
      })
    },

    takehandAndIDCard() {
      app.api.showCameraImagePicker().then(response => {
        const { imgBase64Data } = response

        this.handAndID = imgBase64Data
      })
    },

    getRegisterConfig() {
      // app.api.getSessionStorage('registerConfig').then(response => {
      //   this.registerConfig = JSON.parse(response)
      // })
      app.api.rpc('CV0001').then(response => {
        this.registerConfig = response
      })
    },

    getRegisterMobileNo() {
      if (app.params.mobileNo) {
        this.mobileNo = app.params.mobileNo;
      } else {
        app.api.getSessionStorage('registerMoblileNo').then(response => {
          const { mobileNo } = JSON.parse(response)
          this.mobileNo = mobileNo
        })
      }
    },

    getRegisterUserInfo() {
      app.api.getSessionStorage('registerUserInfo').then(response => {
        this.registerUserInfo = JSON.parse(response)
      })
    },

    handleCloseClick() {
      app.api.confirm('您是否确定放弃开户?', '提示', {
        okButton: '放弃开户',
        cancelButton: '取消',
      }).then(response => {
        if (response.ok) {
          app.api.closeAll()
        }
      })
    },

    link2ConfrimIdentity() {
      this.checkPhotos()
        .then(() => {
          const front = this.IDFront.replace('data:/image/jpeg;base64,', '')
          const back = this.IDBack.replace('data:/image/jpeg;base64,', '')

          const data = {
            imageFiles: [
              {
                base64Text: front,
                filename: 'frontUrl',
              },
              {
                base64Text: back,
                filename: 'backUrl',
              },
            ],
          }

          app.api.rpc('UR0015', data).then(response => {
            const { uploadFileList } = response
            const { ecifId } = app.params.ecifId ? app.params.ecifId : this.registerUserInfo

            const data = {
              mobileNo: this.mobileNo,
              custName: this.IDName,
              certNo: this.IDNo,
              profession: '',
              imagePath: '',
              ecifId,
              taxResidentFlag: '',
              backImagePath: '',
            }

            uploadFileList.forEach(item => {
              if (item.fileName === 'frontUrl') {
                data.imagePath = item.filePath
              }
              if (item.fileName === 'backUrl') {
                data.backImagePath = item.filePath
              }
            })

            const urlData = {
              IDName: this.IDName,
              IDNo: this.IDNo,
              IDFront: this.IDFront,
              IDBack: this.IDBack,
              handAndID: this.handAndID,
              IDAddress: this.IDAddress,
              IDValidDate: this.IDValidDate,
              requestData: data,
            }
            const tempData = {
              IDName: this.IDName,
              IDNo: this.IDNo,
              IDFront: this.IDFront,
              IDBack: this.IDBack,
              IDAddress: this.IDAddress,
              IDValidDate: this.IDValidDate,
              ...data,
            }

            this.storeInfo(tempData)
              .then(() => {
                app.api.pushWindow(
                  '/ynet_account/register/confirm_identity.html',
                  urlData
                )
              })
          })
        })
    },

    storeInfo(data) {
      return new Promise((resolve, reject) => {
        app.api.setSessionStorage('registerIDInfo', JSON.stringify(data))
          .then(() => resolve())
      })
    },

    checkPhotos() {
      return new Promise((resolve, reject) => {
        if (!this.IDFront) {
          app.api.showToast('请上传身份证正面')
        } else if (!this.IDBack) {
          app.api.showToast('请上传身份证反面')
        } else if (!this.handAndID && this.registerConfig.handIdcard && this.registerConfig.handIdcard === '1') {
          app.api.showToast('请上传手持身份证照片')
        } else {
          resolve()
        }
      })
    },
  },
}
</script>

<style lang="scss">
    .validate_identity {
        background: #ffffff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .IDImages {
            margin: 0 0.32rem;
            margin-top: .64rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .ID_wrapper {
            width: 3.3rem;
            height: 2rem;
            position: relative;

            .ID_bg {
                width: inherit;
                height: inherit;
            }

            .ID_camera {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0.8rem;
                height: 0.8rem;
                transform: translateX(-50%) translateY(-50%);
            }
        }

        .descText {
            color: #666;
            font-size: .28rem;
            line-height: .4rem;
        }

        .btn-box {
            padding-top: 1.2rem;
            padding-bottom: 0.6rem;
            background-color: #fff;
        }
    }
</style>
