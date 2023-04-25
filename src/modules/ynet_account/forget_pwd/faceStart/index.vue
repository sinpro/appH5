<template>
  <div class="faceStart">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <div style="text-align:center">
      <img
        :src="faceImg"
        alt=""
      >
      <div class="supText">
        人脸识别审核
      </div>
      <div class="explain">
        为了保证您的账户安全，请进行人脸识别审核，确认用户身份
      </div>
    </div>
    <button @click="start">
      开始人脸识别
    </button>
    <div class="attention">
      请保证周围环境光源充足，平视手机
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faceImg: require('./face.png'),
      mp_sId: '',
      name: '',
      number: ''
    }
  },
  mounted() {
    console.log(app.params)
    let bridge = window.AlipayJSBridge || window.FlameJSBridge
    bridge.call('setSessionID', {
      sessionID: app.params.mp_sId
    }, data => {
      if(data.error == '0') {
        console.log(data)
        this.name = ''
        this.number = ''
      }
    });
        
  },
  methods: {
    start() {
      let bridge = window.AlipayJSBridge || window.FlameJSBridge
      bridge.call('openFaceRecognition', {
        idcard_name:this.name,idcard_number:this.number
      }, res => {
        console.log(res)
        let jumpInfo = app.params.jumpLink
        console.log(jumpInfo,1)
        this.mp_sId = app.params.mp_sId
        // app.api.pushWindow("/ynet_account/forget_pwd/cardList.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone})
        if(res.identification_result == '0'){
          let b = parseInt(app.params.PageIndex) + 1 + ''
          console.log(parseInt(app.params.PageIndex) + 1)
          if(parseInt(app.params.PageIndex) + 1 <= jumpInfo.length){
            for (let a of jumpInfo) {
              console.log(b)
              if(a.configValue == b){
                if(a.configType == 'checkPersonInfo') {
                  app.api.closeOther()
                  app.api.pushWindow('/ynet_account/forget_pwd/IdCheck.html', {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b});
                }else if(a.configType == 'checkFaceInfo'){
                  app.api.closeOther()
                  app.api.pushWindow("/ynet_account/forget_pwd/faceStart.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b})
                }else if(a.configType == 'checkBankCardsInfo'){
                  app.api.closeOther()
                  app.api.pushWindow("/ynet_account/forget_pwd/cardList.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b})
                }
              }
            }
          }else {
            app.api.closeOther()
            app.api.pushWindow("/ynet_account/forget_pwd/input_newPwd.html", {phone:app.params.phone,mp_sId: this.mp_sId})
          }
        }else {
          app.api.showToast('人脸识别失败，请重新识别')
        }
      })
      // app.api.openFaceRecognition({
      //     idcard_name:this.name,idcard_number:this.number
      // }).then(res => {
      //     console.log(res)
      //     let jumpInfo = app.params.jumpLink
      //     this.mp_sId = app.params.mp_sId
      //     // app.api.pushWindow("/ynet_account/forget_pwd/cardList.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone})
      //     if(res.identification_result == '0'){
      //         let b = parseInt(app.params.PageIndex) + 1 + ''
      //         console.log(parseInt(app.params.PageIndex) + 1)
      //         if(parseInt(app.params.PageIndex) + 1 <= jumpInfo.length){
      //             for (let a of jumpInfo) {
      //                 console.log(b)
      //                 if(a.configValue == b){
      //                     if(a.configType == 'checkPersonInfo') {
      //                         app.api.pushWindow('/ynet_account/forget_pwd/IdCheck.html', {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b});
      //                     }else if(a.configType == 'checkFaceInfo'){
      //                         app.api.pushWindow("/ynet_account/forget_pwd/faceStart.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b})
      //                     }else if(a.configType == 'checkBankCardsInfo'){
      //                         app.api.pushWindow("/ynet_account/forget_pwd/cardList.html", {jumpLink:jumpInfo,mp_sId: this.mp_sId,phone:app.params.phone,PageIndex:b})
      //                     }
      //                 }
      //             }
      //         }else {
      //             app.api.pushWindow("/ynet_account/forget_pwd/input_newPwd.html", {phone:app.params.phone,mp_sId: this.mp_sId})
      //         }
      //     }else {
      //         app.api.showToast('人脸识别失败，请重新识别')
      //     }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
    .faceStart{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        text-align: center;
    }
    img{
        width:2.12rem;
        height:2.66rem;
        display: inline-block;
        margin-top: 1.2rem;
        margin-bottom: 0.48rem;
    }
    .supText{
        font-family: 'PingFangSC-Medium';
        color: #333333;
        font-size: 0.32rem;
    }
    .explain{
        display: inline-block;
        width: 5.2rem;
        margin-top: 0.32rem;
        font-size: 0.24rem;
        color:#999999;
    }
    button {
        width: 6.86rem;
        height: 0.88rem;
        background: #6161F2;
        line-height: 0.88rem;
        color: #fff;
        margin: 0.88rem 0 0.32rem 0;
        font-size: 0.36rem;
    }
    .attention{
        font-size: 0.24rem;
        color: #999999;
    }
</style>

