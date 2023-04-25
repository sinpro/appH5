<template>
    <div class="popup template-set">
        <div class="popup-head">
            <div class="jiantou" @click="backMenu"></div>
            <div class="back-icon"  @click="backMenu"></div>
            <span class="back-text"  @click="backMenu">返回</span>
            <span class="fenge">|</span>
            <span class="mtSetting">{{tempName}}</span>
        </div>
        <div class="setting-content">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="投放城市">
                    <!-- <el-select size="medium" v-model="selectValue" style="width: 288px;">
                        <el-option
                        v-for="item in choseOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-input v-model="cityType" autocomplete="off" size="medium" style="width: 288px;" @focus="dialogFormCity=true"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="packDate1">
                    <el-date-picker
                        v-model="form.packDate1"
                        default-value
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="packDate2">
                    <el-date-picker
                        v-model="form.packDate2"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="投放客群">
                    <!-- <el-select size="medium" v-model="guestGroupValue" style="width: 288px;">
                        <el-option
                        v-for="item in choseOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-input v-model="customers" autocomplete="off" size="medium" style="width: 288px;" @focus="dialogFormCustomers=true"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="palace__setting" v-if="type == '02'">
            <el-form>
                <el-form-item label="宫格名称">
                    <el-input v-model="palaceName"></el-input>
                </el-form-item>
                <el-form-item label="宫格图标">
                    <div class="palace__icon">
                        <div class="palace__icon__body" v-for="(item, i) in palaceList" :key="i">
                            <div class="icon__block">
                                <img :src="item.icon" alt="" class="icon">
                            </div>
                            <p class="del__text">删除</p>
                        </div>
                    </div>
                    
                </el-form-item>
                <el-form-item label="链接类型">
                    <el-radio-group v-model="linkType">
                        <el-radio :label="1">无</el-radio>
                        <el-radio :label="2">app内部</el-radio>
                        <el-radio :label="3">第三方</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input placeholder="（URL地址）" v-model="linkAdress"></el-input>
                </el-form-item>
                <el-form-item label="触发后登录" class="padding_left_del">
                    <el-radio-group v-model="isLogin">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上送用户ID" class="padding_left_del">
                    <el-radio-group v-model="isNeedId">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角标" class="add_right_padding">
                    <el-radio-group v-model="superscript">
                        <el-radio :label="1">无</el-radio>
                        <el-radio :label="2">NEW</el-radio>
                        <el-radio :label="3">文字</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角标内容" v-if="superscript == 3">
                    <el-input v-model="superscriptContent"></el-input>
                </el-form-item>
                <el-form-item label="角标显示" v-if="superscript != 1">
                    <el-date-picker
                        v-model="packDate3"
                        type="datetime"
                        align="left">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="角标消失" v-if="superscript != 1">
                    <el-date-picker
                        v-model="packDate4"
                        type="datetime"
                        align="left">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商户标识" class="line__style__radio">
                    <el-radio-group v-model="merchantLogo ">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                    <el-input v-model="lofoContent"></el-input>
                </el-form-item>
                <el-form-item label="弹框标志" class="line__style__radio">
                    <el-radio-group v-model="windowSign">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                    <el-input v-model="signContent"></el-input>
                </el-form-item>
            </el-form>
        </div> -->
        <!-- <div class="palace__setting" v-if="type == '01' || type == '05' || type == '06'">
            <el-form>
                <el-form-item label="链接类型">
                    <el-radio-group v-model="linkType">
                        <el-radio :label="1">无</el-radio>
                        <el-radio :label="2">app内部</el-radio>
                        <el-radio :label="3">第三方</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input placeholder="（URL地址）" v-model="linkAdress"></el-input>
                </el-form-item>
                <el-form-item label="触发后登录" class="padding_left_del">
                    <el-radio-group v-model="isLogin">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上送用户ID" class="padding_left_del">
                    <el-radio-group v-model="isNeedId">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="iPhoneX适配">
                    <div>
                        <div class="pic_block"><img src="../../../assets/add1.png" alt=""><span>343x114@2x</span></div>
                    </div>
                </el-form-item>
            </el-form>
        </div> -->

        <el-dialog title="投放城市" :visible.sync="dialogFormCity" :before-close="dialogIsCity" :close-on-click-modal="false">
            <el-container>
                <el-header height="48px">
                    <el-checkbox :indeterminate="isProvinceAll" v-model="provinceAll" @change="provinceAllChange">全选</el-checkbox>
                </el-header>
                <el-container>
                    <el-aside width="361px">
                        <el-checkbox-group v-model="ProvinceSelectd" @change="provinceChange(ProvinceSelectd,$event)">
                            <el-checkbox  :indeterminate="province.checked" @change="handleProvince(province,$event)" v-model="province.able" v-for="(province,index) in provinces" :label="province.name" :key="index">{{province.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-aside>
                    <el-main>
                        <el-checkbox-group v-model="citySelectd" @change="cityChange($event,items)" v-for="(items,index1) in provinces" :key="index1" v-show="items.selected">
                            <el-checkbox v-for="(city,index) in items.cities" :label="city" :key="index" @change="handleCity(city,$event,items.cities,items)">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-main>
                </el-container>
            </el-container>
            <span slot="footer" class="dialog-footer">
                <el-button class="cityButton" @click="returnCitySelected">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="投放客群" :visible.sync="dialogFormCustomers" :before-close="dialogIsCustomers" :close-on-click-modal="false">
            <customer-list ref="customerList" :type="tagType" :form="tagList"></customer-list>
            <span slot="footer" class="dialog-footer">
                <el-button class="cityButton" @click="returnCustomersSelected">确 定</el-button>
            </span> 
        </el-dialog>
        <el-button :disabled="disabled" class="submit" @click="confirm">确定</el-button>
    </div>
</template>
<script>
import customerList from './customerList'
import { getAdertLaunchStrategy,removeLaunchStrategy, allCityList,getPositionList,getAuthreSource, getAdertList, getCityList,SeachLaunchList,addLaunchStrategy, getLaunchStrategy, getCustomerList} from '~/config/api'
export default {
    components:{
        customerList
    },
    data() {
        return {
            cstName:'',
            cstNo:'',
            guestGroupValue: '',
            form:{
                packDate1: '',
                packDate2: '',
            },
            selectValue: '',
            tempName: '',
            // 宫格设置参数
            palaceName: '转账汇款',
            linkType: 1,
            linkAdress: '',
            isLogin: 0,
            isNeedId: 0,
            superscript: 3,
            superscriptContent: '',
            packDate3: '',
            packDate4: '',
            merchantLogo: 0,
            windowSign: 0,
            lofoContent: '',
            signContent: '',
            disabled:false,
            palaceList: [
                {icon: require('../../../assets/palace_icon1.png')},
                {icon: require('../../../assets/palace_icon2.png')},
                {icon: require('../../../assets/palace_icon1.png')}
            ],
            //投放城市
            dialogFormCity:false,
            cityType:'全部',
            isProvinceAll:false,
            provinceAll: false,
            ProvinceSelectd:[],
            provinces:[],
            citySelectd:[],
            cityId:[],

            //客群
            customers:'全部',
            dialogFormCustomers:false,
            tagType:'0',
            tagList:[],
            strategyId:'',
            strategyName:'',
            rules: {
                packDate1: [
                    { required: true, message: '请选择开始时间', trigger: 'change' },
                ],
                packDate2: [
                    { required: true, message: '请选择结束时间', trigger: 'change' },
                ]
            },
        }
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        floorId:{
            type: String,
            default: ''
        },
        pageId:{
            type: String,
            default: ''
        }
    },
    watch: {
        type() {
            this.tempName = this.type == '02' ? '宫格设置' : (this.type == '05' ? '图片设置' :'模板设置')
        },
        citySelectd(val){
            if(val.length>0 && val.length!=this.cityId.length){
                this.isProvinceAll=true;
            }else{
                this.isProvinceAll=false;
            }
        },
    },
    created() {
        this.getAllCityList();
        getAuthreSource().then(res => {
            this.cstName = res.data.body.cstName
            this.cstNo = res.data.body.cstNo
        })
    },
    mounted() {
        this.tempName = this.type == '02' ? '宫格设置' : (this.type == '05' ? '图片设置' :'模板设置')
    },
    methods: {
        init(){
            console.info(this.floorId);
            getLaunchStrategy({
                floorId:this.floorId,
                pageId:this.pageId
            }).then(res=>{
                let data = res.data.body;
                this.strategyId = data.strategyId;
                // console.info(1111,data);
                this.form.packDate1 = data.startDate;
                this.form.packDate2 = data.endDate;
                console.info(data,11111)
                this.tagList = data.tagList;
                this.tagType = data.tagType;
                this.customers = data.tagType == '1' ? '部分' : '全部';
                this.citySelectd=[];
                this.ProvinceSelectd=[];
                if(data.cityType == '1'){
                    data.cityList.forEach(city=>{
                        // console.info(item)
                        this.cityId.forEach(item=>{
                            if(item.cityId==city.cityId){
                                this.citySelectd.push(item.cityName);
                                if(this.ProvinceSelectd.indexOf(item.provinceName)==-1){
                                    this.ProvinceSelectd.push(item.provinceName)
                                }
                            }
                        })
                    })
                }else{
                    // data.cityList.forEach(city=>{
                        // console.info(item)
                    this.cityId.forEach(item=>{
                        this.citySelectd.push(item.cityName);
                        if(this.ProvinceSelectd.indexOf(item.provinceName)==-1){
                            this.ProvinceSelectd.push(item.provinceName)
                        }
                    })
                    // })
                }
                console.info(this.cityId)
                console.info(this.citySelectd)
                // this.secondEnterList = this.citySelectd
                if(data.cityType!='1'){
                    this.provinceAll=true;
                }
                this.cityType = data.cityType == '1' ? '部分' : '全部'
                console.info(this.citySelectd, 888888888)
                this.provinces.forEach(item=>{
                    item.selected=false
                    // if(this.ProvinceSelectd.indexOf(item.name)>-1){
                    //     item.selected=true;
                    // }
                })
            })
        },
        confirm(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.submit()
                    // alert('submit!');
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        submit(){
            this.disabled = true;
            let citySelectedId = []
            for(let a =0;a<this.citySelectd.length;a++) {
                for(let b of this.cityId) {
                    if(b.cityName === this.citySelectd[a]) {
                        citySelectedId.push(b.cityId)
                    }
                }
            }
            let cityAllId = []
            for(let d in citySelectedId){
                if(cityAllId.indexOf(citySelectedId[d]) == -1){
                    cityAllId.push(citySelectedId[d])
                }
            }
            
            let cityIdCan = []
            for(var e of cityAllId) {
                cityIdCan.push({cityId:e})
            }
            let can = {
                strategyId:this.strategyId,
                strategyName:this.strategyName,
                strategyType:'02',
                floorId:this.floorId,
                pageId:this.pageId,
                // channel: channel,
                // platform: platform,
                startDate:this.form.packDate1,
                endDate:this.form.packDate2,
                userId:this.cstNo,
                userName:this.cstName,
                cityList:this.cityType == '全部' ? [] : cityIdCan,
                cityType:this.cityType == '全部' ? '0' : '1',
                // strategPositionList:this.strategPositionList,
                // strategyPosition:"",
                tagList: this.tagType == '1' ? this.tagList : [],
                tagType: this.tagType
                // tagType:'0'
            }
            this.submitDisable=true;
            addLaunchStrategy(can).then(res=>{
                if(this.updateId === '') {
                    this.handleMsg(res, '设置成功', '设置失败')
                } else{
                    this.handleMsg(res, '设置成功', '设置失败')
                }
                // this.$router.go(-1)
                this.backMenu();
                // this.dialogFormVisible = false
                // this.$refs['form'].resetFields();
                // this.getAdertLaunchStrategy()
                this.submitDisable=false;
                this.disabled = false;
            })
        },
        handleMsg (res, sucMsg, failMsg) {
            if (res.data.body.errorCode === '0') {
                this.$notify({
                title: '成功',
                message: sucMsg,
                duration: 2000,
                type: 'success'
                })
            } else {
                this.$notify({
                title: '失败',
                message: failMsg,
                duration: 2000,
                type: 'error'
                })
            }
        },
        backMenu() {
            // let citySelectedId = []
            // for(let a =0;a<this.citySelectd.length;a++) {
            //     for(let b of this.cityId) {
            //         if(b.cityName === this.citySelectd[a]) {
            //             citySelectedId.push(b.cityId)
            //         }
            //     }
            // }
            // let cityAllId = []
            // for(let d in citySelectedId){
            //     if(cityAllId.indexOf(citySelectedId[d]) == -1){
            //         cityAllId.push(citySelectedId[d])
            //     }
            // }
            
            // let cityIdCan = []
            // for(var e of cityAllId) {
            //     cityIdCan.push({cityId:e})
            // }
            // let data = {
            //     tagList:this.tagList,
            //     tagType:this.tagType,
            //     cityList:cityIdCan,
            //     cityType:this.cityType,
            //     startDate:this.form.packDate1,
            //     endDate:this.form.packDate2
            // }
            // this.submit();
            this.$emit('backMenu')
        },
        dialogIsCity(done) {
            this.dialogFormCity = false
        },
        getAllCityList() {
            allCityList().then(res => {
                let cityList = res.data.body.cityList
                this.cityId = res.data.body.cityList
                let provinceArr = []
                for (let a in cityList){
                    if(provinceArr.indexOf(cityList[a].provinceName) == -1){
                        provinceArr.push(cityList[a].provinceName)
                    }
                }
                for(let b = 0;b < provinceArr.length; b++){
                    let cityOfProvince = []
                    for(let c =0;c < cityList.length; c++) {
                        if(cityList[c].provinceName === provinceArr[b]){
                            cityOfProvince.push(cityList[c].cityName)
                        }
                    }
                    this.provinces.push({name: provinceArr[b],cities:cityOfProvince,checked: false,selected:false,able:false})
                }
                this.init();
            })
        },
        provinceAllChange(val){
            // console.info(val);
            this.citySelectd=[];
            this.ProvinceSelectd=[];
            // console.info(this.cityAll)
            if(val) {
                console.info(this.provinces)
                for(let b of this.provinces){
                    // b.selected=true;
                    this.ProvinceSelectd.push(b.name);
                    for(let c of b.cities){
                        this.citySelectd.push(c)
                    }
                }
            }else{
                
                for(let b of this.provinces){
                    b.selected = false;
                    b.checked = false;
                    b.able = false;
                    // this.ProvinceSelectd.push(b.provinceName);
                    // for(let c of b.cities){
                    //     c.selected=false;
                    //     // this.citySelectd.push(c)
                    // }
                }
            }
        },
        provinceChange(acity,value){
            console.info(this.citySelectd)
            value = value.length === 0 ? []:value
            // for(let a of this.provinces){
            //     a.selected =false
            //     if(a.name === value[value.length - 1]){
            //         a.selected = true
            //     }
            // }
            if(value.length === this.provinces.length){
                for(let c of this.provinces){
                    if(c.checked === false) {
                        this.provinceAll = true
                    }else {
                        this.provinceAll = false
                        break
                    }
                }
            }
        },
        handleProvince(nameValueArr,value) {
            // console.log(nameValueArr,value)
            // console.info(nameValueArr)
            for(let a of this.provinces){
                a.selected =false
                // if(a.name === value[value.length - 1]){
                //     a.selected = true
                // }
            }
            nameValueArr.selected = true;
            if(!value){
                this.provinceAll = false
                console.info(this.citySelectd)
                // if(!nameValueArr.checked){
                    console.info(nameValueArr.cities)
                    
                    for(let i of nameValueArr.cities) {
                        for(let f = 0;f < this.citySelectd.length;f++) {
                            if(this.citySelectd[f] == i) {
                                this.citySelectd.splice(f,1)
                            }
                        }
                    }
                // }
            }else{
                for(let i of nameValueArr.cities) {
                    if(this.citySelectd.indexOf(i==-1)){
                        this.citySelectd.push(i)
                    }
                }
                // console.info(this.citySelectd);
            }
            for(let a of this.provinces) {
                if(a.name === nameValueArr.name){
                    a.able = value
                }
            }
            for (let b of nameValueArr.cities) {
                if(this.citySelectd.includes(b)){
                    nameValueArr.checked = false
                }else {
                    if(nameValueArr.able === false) {
                        nameValueArr.checked = false
                    }else {
                        nameValueArr.checked = true
                    }
                    break
                }
            }
        },
        cityChange(value,city){
            console.info(this.citySelectd)
            console.info(this.ProvinceSelectd)
            value = value.length === 0 ? [] : value
            this.selectedCityAll = value
            let c = []
            for(let a of this.provinces) {
                for(let b of a.cities) {
                    c.push(b)
                }
            }
            this.provinceAll = value.length === c.length && this.ProvinceSelectd.length === this.provinces.length ? true : false
        },
        handleCity(selectdCity,value,cityGroup,items){
            let c = 0
            for(let d of this.citySelectd){
                if(cityGroup.includes(d)){
                    c++
                }
            }
            if(c >=cityGroup.length){
                items.checked = false
            }else {
                items.checked = true
            }
        },
        returnCitySelected() {
            // this.dialogFormVisible = true;
            this.dialogFormCity = false
            if(this.provinceAll) {
                this.cityType = '全部'
            }else {
                this.cityType = '部分'
            }
        },
        //客群
        dialogIsCustomers() {
            this.dialogFormCustomers = false
        },
        returnCustomersSelected() {
            // this.$refs.customerList.returnCustomer();
            this.tagList = this.$refs.customerList.returnCustomer().tagList;
            this.tagType = this.$refs.customerList.returnCustomer().tagType;
            console.info(this.tagType,this.tagList)
            this.customers = this.tagType == '0' ? '全部' : '部分'
            this.dialogFormCustomers = false;
            // console.info(this.$refs.customerList.returnCustomer())
        }
    }
}
</script>

<style lang="scss">
.template-set{
    z-index: initial !important;
    overflow: hidden;
    .el-dialog {
        width: 800px !important;
        .el-dialog__body {
            padding:40px;
            .is-vertical{
                width: 720px;
                border: 1px solid #DDE0E4;
                height: 496px;
                .el-header{
                    // width: 716px;
                    padding:0 0 0 25px;
                    height: 48px;
                    border-bottom: 1px solid #DDE0E4;
                };
                .el-aside,.el-main{
                    border-right: 1px solid #DDE0E4;
                    .el-checkbox-group{
                        .el-checkbox{
                            display: block;
                            width: 360px;
                            height:39px;
                            line-height: 39px;
                            margin:0;
                            padding-left: 25px;
                            border-bottom: 1px solid #DDE0E4;
                            // &:last-child{
                            //     border: 1px solid #DDE0E4;
                            // }
                        }
                    }
                }
                .el-main{
                    border:none;
                    padding:0;
                    margin-right: 16px;
                    border-right: 1px solid #DDE0E4;
                    .el-checkbox-group{
                        .el-checkbox{
                            width: 340px;
                        }
                    }
                }
            }
        }
        .el-dialog__footer{
            text-align: center;
            height: 72px;
            padding:16px;
            .cityButton{
                width:112px;
                height: 40px;
                background:#316cff;
                color: #ffffff;
                border: none;
                font-size: 14px;
            }
        }
    }
    .pic_block {
        width: 240px;
        height: 240px;
        background: #FAFAFC;
        margin-left: 38px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #DDE0E4;
    }
    .submit{
        display: flex;
        cursor: pointer;
        padding: 0;
        align-items: center;
        justify-content: center;
        width: 112px;
        height: 40px;
        border-radius: 3px;
        background: #ffffff;
        border: 1px rgb(220, 223, 230) solid;
        margin: 0 auto;
        &:hover{
            background: #3671FF;
        }
        span {
            font-family: MicrosoftYaHeiUI;
            font-size: 14px;
            color: #323C41;
            letter-spacing: 1px;
            text-align: center;
        }
    }
    .setting-content{
        .el-form{
            .el-form-item{
                .el-form-item__label{
                    &::before{
                        content: '';
                        color: #f56c6c;
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
.el-input-number__decrease, .el-input-number__increase{
    z-index: initial !important;
}
.el-color-picker__mask{
    z-index: initial !important;
}
.el-picker-panel .el-picker-panel__body-wrapper .el-picker-panel__body .el-date-picker__time-header .el-date-picker__editor-wrap .el-time-panel{
    right:0 !important;
}
</style>


