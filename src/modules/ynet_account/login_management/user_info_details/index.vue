<template>
  <div class="user_info_details">
    <div class="type">
      <md-cell-item
        title="姓名"
        :addon="nameMask"
      />
      <md-cell-item
        title="身份证"
        :addon="IDCardMask"
      />
      <md-cell-item
        title="地址"
        no-border
        :addon="address"
      />
    </div>
    <div class="type">
      <md-cell-item
        title="手机号"
        :addon="mobileMask"
      />
    </div>
    <div class="type">
      <md-cell-item
        title="人脸识别认证"
        :arrow="true"
        :addon="authStatusText"
        @click="validAuthFace"
      />
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile';
const defaultAvatar = require('./pic.png');


export default {
  components: {
    [CellItem.name]: CellItem,
  },

  data() {
    return {
      userName: '',
      IDCard: '',
      address: '',
      phone: '',
      authStatus: false,
    }
  },

  created() {
    this.initInfo();
  },

  computed: {
    authStatusText() {
      return this.authStatus ? '已认证' : '未认证';
    },

    nameMask() {
      const m = this.userName;
      return `${m.slice(0, 1)}*${m.slice(2)}`;
    },

    mobileMask() {
      const m = this.phone;
      return `${m.slice(0, 3)}****${m.slice(7)}`;
    },

    IDCardMask() {
      const m = this.IDCard;
      return `${m.slice(0, 4)}**********${m.slice(14)}`;
    },
  },

  methods: {
    initInfo() {
      app.api.getUserInfo().then((res) => {
        const info = res.userInfo.body;
        this.userName = info.customerName;
        this.IDCard = info.certNo;
        this.address = info.address || '未填写';
        this.phone = info.mobileNo;
        console.log(info);
      });
    },

    validAuthFace() {
      app.api.openFaceRecognition({}).then(result => {
        if (result.identification_reslut == '0') {
          console.log('识别成功');
          this.authStatus = true;
        } else {
          console.log('识别失败');
        }
      }, result => {
        console.log(result.errorMessage);
      });
    },
  },
}
</script>

<style lang="scss">
.user_info_details {
  .type {
    background: #fff;
    padding: 0 0.32rem;
    margin-bottom: 0.16rem;
  }
}
</style>
