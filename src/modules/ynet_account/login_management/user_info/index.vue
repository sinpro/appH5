<template>
  <div class="user_info">
    <div class="type">
      <md-cell-item title="头像" :arrow="true">
        <div class="avatar" slot="right" @click="changeAvatar">
          <img :src="avatar" :onerror="default_avatar" />
        </div>
      </md-cell-item>
      <md-cell-item
        title="昵称"
        :arrow="true"
        :addon="userName"
        @click="editNickname"
      />
      <md-cell-item
        title="实名认证"
        :arrow="true"
        :addon="authStatusText"
        @click="goAuth"
      />
      <md-cell-item
        title="设备ID"
        :arrow="true"
        :addon="`${deviceID.slice(0, 18)}...`"
        @click="copy(deviceID, 1)"
      />
      <md-cell-item
        title="客户ID"
        no-border
        :arrow="true"
        :addon="userID"
        @click="copy(userID, 2)"
      />
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile'
const defaultAvatar = require('./pic.png')

export default {
  components: {
    [CellItem.name]: CellItem,
  },

  data() {
    return {
      avatar: '',
      userName: '',
      authStatus: false,
      userBaseInfo: {
        mobileNo: '',
        ecifId: '',
      },
      deviceID: '',
      userID: '',
      default_avatar: 'this.src="' + require('./pic.png') + '"',
    }
  },

  resume(data) {
    if (!!data.newName) {
      this.userName = data.newName
    }
    this.initInfo((type = 'resume'))
  },

  created() {
    this.avatar = defaultAvatar
    this.initInfo()
  },

  computed: {
    authStatusText() {
      return this.authStatus ? '已认证' : '未认证'
    },
  },

  methods: {
    copy(str, type) {
      app.api.copyToClipboard(str).then((result) => {
        const msg =
          type === 1 ? '设备ID已复制到剪切板！' : '用户ID已复制到剪切板！'
        app.api.showToast(msg)
      })
    },

    goAuth() {
      if (!this.authStatus) {
        app.api.setSessionStorage(
          'validUserIdentify',
          JSON.stringify({
            backPage: '/ynet_account/login_management/user_info.html',
          })
        )
        app.api.pushWindow('/ynet_account/register/check_identity.html', {
          mobileNo: this.userBaseInfo.mobileNo,
          ecifId: this.userBaseInfo.ecifId,
        })
      } else {
        app.api.pushWindow(
          '/ynet_account/login_management/user_info_details.html'
        )
      }
    },

    initInfo(type = '') {
      app.api.getDeviceFingerprint().then(({ deviceID }) => {
        this.deviceID = deviceID
      })

      app.api.getUserInfo().then((res) => {
        const info = res.userInfo.body
        const { userAlias, headImg, userType } = info
        this.authStatus =
          userType === '30' || userType === '40' || userType === '50'
        this.avatar = headImg || defaultAvatar
        if (type !== 'resume') {
          this.userName = userAlias
        }
        this.userBaseInfo = info
        this.userID = info.userId
      })
    },

    editNickname() {
      app.api.pushWindow(
        '/ynet_account/login_management/user_info_nickname.html',
        { oldName: this.userName }
      )
    },

    uploadImage(base64Image) {
      const fileName = `avatar-${~~(
        Math.random() * Math.pow(10, 10)
      )}-${Date.now()}.png`
      const imgInfo = [
        {
          base64Text:
            String(base64Image).split('base64,')[1] || String(base64Image),
          filename: fileName,
        },
      ]

      app.api
        .rpc('UR0015', {
          imageFiles: imgInfo,
        })
        .then(({ domainUrl, uploadFileList }) => {
          console.log(uploadFileList)
          const remotePath = domainUrl + uploadFileList[0].filePath
          app.api
            .rpc('UR0035', {
              imagePath: uploadFileList[0].filePath,
              format: 'png',
            })
            .then(() => {
              this.avatar = remotePath
              app.api.updateUserInfo()
              app.api.showToast('头像上传成功')
            })
            .catch(() => app.api.alert('头像设置失败'))
        })
        .catch(() => app.api.alert('头像上传失败'))
    },

    changeAvatar() {
      app.api.showCameraImagePicker().then(({ imgBase64Data }) => {
        this.uploadImage(imgBase64Data)
      })
    },
  },
}
</script>

<style lang="scss">
.user_info {
  .type {
    background: #fff;
    padding: 0 0.32rem;
  }

  .avatar {
    height: 0.98rem;
    width: 0.98rem;
    overflow: hidden;
    border-radius: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
