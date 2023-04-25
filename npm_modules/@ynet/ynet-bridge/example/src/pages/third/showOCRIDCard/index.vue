<template>
    <div>
        <m-titleview title="ocr识别">
            ocr识别身份证/ocr识别银行卡
        </m-titleview>
        <m-sectionview>
            <m-imageview :src="frontInfo.IDCardFrontImage"></m-imageview>
            <m-cellview title="姓名" :value="frontInfo.certName"></m-cellview>
            <m-cellview title="身份证号码" :value="frontInfo.certNo"></m-cellview>
            <m-cellview title="性别" :value="frontInfo.gender"></m-cellview>
            <m-cellview title="民族" :value="frontInfo.nation"></m-cellview>
            <m-cellview title="出生" :value="frontInfo.birth"></m-cellview>
            <m-cellview title="住址" :value="frontInfo.address"></m-cellview>
            <m-buttonview @click="callApi('showOCRIDCard-0')">扫描身份证正面</m-buttonview>
            <m-imageview :src="backendInfo.IDCardBackImage"></m-imageview>
            <m-cellview title="签发机关" :value="backendInfo.issue"></m-cellview>
            <m-cellview title="有效期限" :value="backendInfo.validity"></m-cellview>
            <m-buttonview @click="callApi('showOCRIDCard-1')">扫描身份证反面</m-buttonview>
            <m-imageview :src="cardInfo.cardImage"></m-imageview>
            <m-cellview title="银行卡号码" :value="cardInfo.cardNumber"></m-cellview>
            <m-buttonview @click="callApi('showOCRBankCard')">扫描银行卡</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            frontInfo: {},
            backendInfo: {},
            cardInfo: {}
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showOCRIDCard-0':
                    api.showOCRIDCard('0').then(result => (this.frontInfo = result))
                    break
                case 'showOCRIDCard-1':
                    api.showOCRIDCard('1').then(result => (this.backendInfo = result))
                    break
                case 'showOCRBankCard':
                    api.showOCRBankCard().then(result => (this.cardInfo = result))
                    break
            }
        }
    }
}
</script>
