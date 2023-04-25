<template>
    <div class="list-style">
        <div class="list-style-box">
            <div class="list-style-item" v-if="VertialControl">
                <span>上下间距</span>
                <div class="content">
                    <div class="input marginTop">
                        <el-input v-model="listStyleForm.margin" placeholder="上下间距"></el-input>
                        <div class="btn">
                            <div @click="upMargin"><i class="el-icon-caret-top"></i></div>
                            <div @click="dowmMargin"><i class="el-icon-caret-bottom" :style="listStyleForm.margin<=0?'color:#DDE0E4;':'#A2A4A6;'"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-style-item">
                <span>分割线</span>
                <div class="content">
                    <div class="left">
                        <!-- <div class="icon"></div> -->
                        <el-color-picker v-model="listStyleForm.divlineColor" @change="updateFloor()" :disabled="listStyleForm.isShowLine != '1'"></el-color-picker>
                    </div>
                    <div class="input">
                        <!-- <input type="text" placeholder="分割线颜色"> -->
                        <el-input v-model="listStyleForm.divlineColor" @blur="updateFloor" placeholder="分割线颜色" :disabled="listStyleForm.isShowLine != '1'"></el-input>
                    </div>
                    <!-- <div class="isDividLine" @click="handleShowLine(listStyleForm.isShowLine)">
                        <img :src="switch_close" alt="">
                         <img v-if="listStyleForm.isShowLine == '1'" :src="currentPageIcon.open" alt="">
                         <img v-if="listStyleForm.isShowLine != '1'" :src="currentPageIcon.close" alt="">
                    </div> -->
                    <div @click="handleShowLine(listStyleForm.isShowLine)" class="splitBtn" :class="[listStyleForm.isShowLine == '1' ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[listStyleForm.isShowLine == '1' ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
            </div>
            <div class="list-style-item list-icon">
                <span>左侧图标</span>
                <div class="content left-icon" :style="listStyleForm.leftIcon == ''?'height:40px;':'height:120px;'">
                    <div class="icon">
                        <span>24x24@2x</span>
                        <div class="img" v-if="listStyleForm.leftIcon != ''">
                            <img :src="concatImageUrl(listStyleForm.leftIcon)"  alt="" @click="chooseIcon('left')">
                            <div class="del-img">
                                <img :src="currentPageIcon.del" alt="" @click="delLeftIcon('left')">
                            </div>
                        </div>
                    </div>
                    <div class="isDividLine">
                        <img @click="chooseIcon('left')" v-if="listStyleForm.leftIcon  == ''" :src="currentPageIcon.add" alt="">
                    </div>
                </div>
            </div>
            <div class="list-style-item">
                <span>名称</span>
                <div class="content">
                    <div class="input styleName">
                        <!-- <input type="text" placeholder="名称"> -->
                        <el-input v-model="listStyleForm.name" @input="updateFloor" placeholder="名称"></el-input>
                    </div>
                </div>
            </div>
            <div class="list-style-item" v-if="currentTemplateItem.options.styleType == '02'">
                <span>说明</span>
                <div class="content">
                    <div class="input instruction">
                        <el-input v-model="listStyleForm.subTitle" @input="updateFloor" placeholder="文字说明" :disabled="listStyleForm.isShow == '1'"></el-input>
                    </div>
                    <!-- <div class="del-right" @click="handleRight(listStyleForm.isShow)">
                        <img v-if="listStyleForm.isShow != '1'" :src="currentPageIcon.open" alt="">
                        <img v-if="listStyleForm.isShow == '1'" :src="currentPageIcon.close" alt="">
                    </div> -->
                    <div @click="handleRight(listStyleForm.isShow)" class="splitBtn" :class="[listStyleForm.isShow != '1' ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[listStyleForm.isShow != '1' ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
            </div>
            <div class="list-style-item rightFont" v-if="currentTemplateItem.options.styleType == '01'">
                <span>右侧文字</span>
                <div :class="[listStyleForm.isShow == '1'?'content':'content noRightFont']">
                    <div class="detail">
                        <div class="del-left" v-if="listStyleForm.isShow == '1'">
                            <div v-for="(item,index) in rightFontType" 
                                 :key="index" 
                                 :class="[item.type == isFontCheckedType?'checked':'']"
                                 @click="checkFontType(item.type)">
                                <span>{{item.name}}</span>
                            </div>
                            <!-- <div>
                                <span>数值</span>
                            </div>
                            <div>
                                <span>状态</span>
                            </div> -->
                        </div>
                        <!-- <div class="del-right" @click="handleRight(listStyleForm.isShow)">
                             <img v-if="listStyleForm.isShow == '1'" :src="currentPageIcon.open" alt="">
                             <img v-if="listStyleForm.isShow != '1'" :src="currentPageIcon.close" alt="">
                        </div> -->
                        <div @click="handleRight(listStyleForm.isShow)" class="splitBtn" :class="[listStyleForm.isShow == '1' ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[listStyleForm.isShow == '1' ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                    <div class="input" v-if="listStyleForm.isShow == '1'">
                        <!-- <input type="text" placeholder="名称"> -->
                        <el-input v-if="isFontCheckedType == '8'" @input="updateFloor" v-model="listStyleForm.subTitle" placeholder="文字说明"></el-input>
                        <el-select v-if="isFontCheckedType == '9'" @input="updateFloor" v-model="listStyleForm.subTitle" placeholder="请选择">
                            <el-option
                                v-for="item in instructionType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-if="isFontCheckedType == '10'" @input="updateFloor" v-model="listStyleForm.subTitle" placeholder="请选择">
                            <el-option
                                v-for="item in stateTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="list-style-item list-icon">
                <span>右侧图标</span>
                <div class="content left-icon" :style="listStyleForm.rightIcon == ''?'height:40px;':'height:120px;'">
                    <div class="icon">
                        <span>24x24@2x</span>
                        <div class="img"  v-if="listStyleForm.rightIcon != ''">
                            <img :src="concatImageUrl(listStyleForm.rightIcon)" alt="" @click="chooseIcon('right')">
                            <div class="del-img">
                                <img :src="currentPageIcon.del" alt="" @click="delLeftIcon('right')">
                            </div>
                        </div>
                    </div>
                    <div class="isDividLine">
                        <img @click="chooseIcon('right')" v-if="listStyleForm.rightIcon == ''" :src="currentPageIcon.add" alt="">
                    </div>
                </div>
            </div>
            <div class="list-style-item rightFont">
                <span>跳转链接</span>
                <div :class="[listStyleForm.isJumpUrl == '1'?'content jumpUrl':'content noJumpUrl']">
                    <div class="detail">
                        <div class="del-left" v-if="listStyleForm.isJumpUrl == '1'">
                            <div v-for="(item,index) in jumpTyle" 
                                 :key="index" 
                                 :class="[item.type == ischeckJump?'checked':'']"
                                 @click="checkJumpType(item.type)">
                                <span>{{item.name}}</span>
                            </div>
                            <!-- <div>
                                <span>第三方</span>
                            </div> -->
                        </div>
                        <!-- <div class="del-right" @click="handleJump(listStyleForm.isJumpUrl)">
                            <img v-if="listStyleForm.isJumpUrl == '1'" :src="currentPageIcon.open" alt="">
                            <img v-if="listStyleForm.isJumpUrl != '1'" :src="currentPageIcon.close" alt="">
                        </div> -->
                        <div @click="handleJump(listStyleForm.isJumpUrl)" class="splitBtn" :class="[listStyleForm.isJumpUrl == '1' ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[listStyleForm.isJumpUrl == '1' ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                    <div class="input" v-if="listStyleForm.isJumpUrl == '1'">
                        <el-input v-model="listStyleForm.jumpUrl" placeholder="URL"></el-input>
                    </div>
                    <div class="isLogin login-first" v-if="listStyleForm.isJumpUrl == '1'">
                        <div class="login-left">
                            <span>触发后登录</span>
                        </div>
                        <!-- <div class="login-right" @click="handleLogin(listStyleForm.isLogin)">
                            <img v-if="listStyleForm.isLogin == '1'" :src="currentPageIcon.open" alt="">
                            <img v-if="listStyleForm.isLogin != '1'" :src="currentPageIcon.close" alt="">
                        </div> -->
                        <div @click="handleLogin(listStyleForm.isLogin)" class="splitBtn" :class="[listStyleForm.isLogin == '1' ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[listStyleForm.isLogin == '1' ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                    <div class="isLogin" v-if="listStyleForm.isJumpUrl == '1'">
                        <div class="login-left">
                            <span>上送用户ID</span>
                        </div>
                        <!-- <div class="login-right" @click="chooseState('isSend',listStyleForm.isSend)">
                            <img v-if="listStyleForm.isSend == '1'" :src="currentPageIcon.open" alt="">
                            <img v-if="listStyleForm.isSend != '1'" :src="currentPageIcon.close" alt="">
                        </div> -->
                        <div @click="chooseState('isSend',listStyleForm.isSend)" class="splitBtn" :class="[listStyleForm.isSend == '1' ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[listStyleForm.isSend == '1' ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialogImg">
            <el-dialog title="选择素材" :visible.sync="isShowCropper" width="60%" class="cropper-box" :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="[24,24,2]" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="getCropperImgMsg">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <button class="submit-button" @click="saveFloor"><span>楼层保存</span></button>

    </div>
</template>
<script>
import mixins from '../../mixins';
import { editFloorStyleAllocation, eidtMenuStyleRpc } from '../../../utils/api'
import cropper from '../../common/cropper';
import { API } from '~/config/api';
import { getCookie } from '../../../../../utils/cookie';
import { editFloor,editStyle } from '~/config/api';
import linkPanel from '../components/popup/linkPanel';
import chooseMaterial from '^/chooseMaterial'

export default {
    mixins,
    components:{
        cropper,
        linkPanel,
        chooseMaterial
    },
    props: {
        flag: {
            type: String,
            default: '01'
        },
        options: {
            type: Object,
            default () {
                return {}
            }
        },
        VertialControl: {
            type: Boolean,
            default: false
        },
        currentTemplateItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            listStyleForm:{
                divlineColor:'',
                isShowLine:'',
                leftIcon:'',
                name:'',
                isShow:'',
                contentType:'8',
                picLinkType:'2',
                subTitle:'',
                rightIcon:'',
                isJumpUrl:'0',
                jumpUrl:'',
                isLogin:'0',
                isSend:'0',
                margin:''
            },
            currentPageIcon:{
                add:require('../assets/add.png'),
                del:require('../assets/del1.png'),
                close:require('../assets/switch_close.png'),
                open:require('../assets/switch_open.png')
            },
            iscurrent:'01',
            isCheck:true,
            jumpTyle:[
                {'name':'APP内部','type':'2'},
                {'name':'Native','type':'4'},
                {'name':'小程序','type':'5'},
                {'name':'第三方','type':'3'}
            ],
            rightFontType:[{'name':'说明','type':'8'},{'name':'数值','type':'9'},{'name':'状态','type':'10'}],
            isFontCheckedType:'8',
            ischeckJump:'2',
            instructionType:[{'label':'2','value':'2'},{'label':'4','value':'4'}],
            stateTypeList:[{'label':'已开启','value':'已开启'},{'label':'未开启','value':'未开启'}],
            isShowCropper:false,
            chooseIconIndex:'',
            styleInfoList:[]
        }
    },
    watch:{
 
    },
    created(){
        console.info(this.flag,this.currentTemplateItem,this.options)
        this.initListData()
    },
    methods:{
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
        initListData(){
            let currentOption = this.currentTemplateItem.options
            let currentStyleInfo = currentOption.styleInfoList
            console.log(currentOption.styleInfoList,888888)
            this.listStyleForm.margin = currentOption.topMargin-0
            this.listStyleForm.divlineColor = currentOption.divlineColor
            this.listStyleForm.isShowLine = currentOption.isShowLine

            if(currentStyleInfo.length>0){
                this.listStyleForm.leftIcon = currentStyleInfo[0].picUrl?currentStyleInfo[0].picUrl:''
                this.listStyleForm.name = currentStyleInfo[0].title
                this.listStyleForm.isShow = currentStyleInfo[0].isShow
                this.listStyleForm.picLinkType = currentStyleInfo[0].picLinkType
                this.listStyleForm.rightIcon = currentStyleInfo[1].picUrl?currentStyleInfo[1].picUrl:''
                this.listStyleForm.isJumpUrl = currentStyleInfo[0].picLinkType != '1'?'1':'0'
                this.listStyleForm.jumpUrl = currentStyleInfo[0].picLink
                this.listStyleForm.isLogin = currentStyleInfo[0].isLoginNeeded
                this.listStyleForm.isSend = currentStyleInfo[0].isIdNeeded
                this.ischeckJump = this.listStyleForm.picLinkType
                if(this.flag == '01'){
                    this.listStyleForm.subTitle = currentStyleInfo[1].title
                    this.listStyleForm.contentType = currentStyleInfo[1].contentType
                    this.isFontCheckedType = this.listStyleForm.contentType
                }else{
                    this.listStyleForm.subTitle = currentStyleInfo[0].subTitle
                    this.listStyleForm.contentType = '8'
                }
            }
        },
        saveFloor(){
            this.updateFloor()
            let options = this.currentTemplateItem.options;
            let listList = this.styleInfoList;
            let heightF = this.flag == '01'?24+(this.listStyleForm.margin - 0)*2 :44+(this.listStyleForm.margin - 0)*2 

            let floorData = {
                floorId: options.floorId,
                pageId: this.$route.query.pageId,
                styleType: options.styleType,
                floorType: options.floorType,
                floorName: options.floorName,
                floorIsAd: options.floorIsAd,
                orderNum:this.statusIndex,
                divlineColor:this.listStyleForm.divlineColor,
                title:options.title,
                isShowLine:this.listStyleForm.isShowLine,
                topMargin:this.listStyleForm.margin,
                bottomMargin:this.listStyleForm.margin,
                heightF:heightF,
                styleInfoList:this.styleInfoList,
                operatorId: this.options.operatorId || this.currentTemplateItem.options.operatorId || '',
                operator: this.options.operator || this.currentTemplateItem.options.operator || ''
            }
            console.log(floorData)
            editFloorStyleAllocation(floorData).then(res => {
                if(res.data.body.errorCode === '0') {
                    let data={
                        floorType: options.floorType,
                        floorId: options.floorId,
                        listList
                    }
                    eidtMenuStyleRpc(data).then(res=>{
                        this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                    });
                } else {
                    this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                }
            })
        },
        //样式1参数
        style1Params(){
            let list = []
            let leftList = {
                styleName:'列表',
                styleType:this.currentTemplateItem.options.styleType,
                floorId:this.options.floorId,
                picPositionType:'3',
                picUrl:this.listStyleForm.leftIcon,
                title:this.listStyleForm.name,
                isShow:this.listStyleForm.isShow,
                contentType:this.listStyleForm.contentType,
                subTitle:'',
                picLinkType:this.listStyleForm.picLinkType || '1',
                picLink:this.listStyleForm.jumpUrl,
                isLoginNeeded:this.listStyleForm.isLogin,
                isIdNeeded:this.listStyleForm.isSend,
                ordernNum:'1'
            }
            let rightList = {
                styleName:'列表',
                styleType:this.currentTemplateItem.options.styleType,
                floorId:this.options.floorId,
                picPositionType:'4',
                picUrl:this.listStyleForm.rightIcon,
                title:this.listStyleForm.isShow == '1' ? this.listStyleForm.subTitle : '',

                isShow:this.listStyleForm.isShow,
                contentType:this.listStyleForm.contentType,
                subTitle:'',
                picLinkType:this.listStyleForm.picLinkType || '1',
                picLink:this.listStyleForm.jumpUrl,
                isLoginNeeded:this.listStyleForm.isLogin,
                isIdNeeded:this.listStyleForm.isSend,
                ordernNum:'2'
            }
            list.push(leftList)
            list.push(rightList)
            return list
        },
        //样式2参数
        style2Params(){
            let list = []
            let leftList = {
                styleName:'列表',
                styleType:this.currentTemplateItem.options.styleType,
                floorId:this.options.floorId,
                picPositionType:'3',
                picUrl:this.listStyleForm.leftIcon,
                title:this.listStyleForm.name,
                isShow:this.listStyleForm.isShow,
                contentType:'8',
                subTitle:this.listStyleForm.subTitle,

                picLinkType:this.listStyleForm.picLinkType,
                picLink:this.listStyleForm.jumpUrl,
                isLoginNeeded:this.listStyleForm.isLogin,
                isIdNeeded:this.listStyleForm.isSend,
                ordernNum:'1'
            }
            let rightList = {
                styleName:'列表',
                styleType:this.currentTemplateItem.options.styleType,
                floorId:this.options.floorId,
                picPositionType:'4',
                picUrl:this.listStyleForm.rightIcon,
                title:'',
                isShow:'',
                contentType:'',
                subTitle:'',
                picLinkType:this.listStyleForm.picLinkType,
                picLink:this.listStyleForm.jumpUrl,
                isLoginNeeded:this.listStyleForm.isLogin,
                isIdNeeded:this.listStyleForm.isSend,
                ordernNum:'2'
            }
            list.push(leftList)
            list.push(rightList)
            return list
        },
        //更新楼层
        updateFloor(){
            let styleInfoList = []
            if(this.flag == '01'){
               styleInfoList = this.style1Params()
                //console.log(data)
            }
            else{
                styleInfoList= this.style2Params()
                //console.log(data)
            }
            let menuOptions = {
                topMargin:this.listStyleForm.margin,
                bottomMargin:this.listStyleForm.margin,
                divlineColor:this.listStyleForm.divlineColor,
                isShowLine:this.listStyleForm.isShowLine,
                styleInfoList:styleInfoList,
            }
            this.styleInfoList = styleInfoList
            console.info(111111111)
            console.info(menuOptions)
            this.$emit('setMenuStyleOptions', menuOptions)
        },
        upMargin(){
            this.listStyleForm.margin = this.listStyleForm.margin+1
            this.updateFloor()
        },
        dowmMargin(){
            if(this.listStyleForm.margin>0){
                this.listStyleForm.margin = this.listStyleForm.margin-1
                this.updateFloor()
            }
        },
        //选择图片start
        chooseIcon(index){
            this.isShowCropper = true
            this.chooseIconIndex = index
        },
        backImg(imgUrl){
            if(imgUrl.length>0){
                if(this.chooseIconIndex == 'left'){
                    this.listStyleForm.leftIcon = imgUrl[0].showSelectImg
                }
                else{
                    this.listStyleForm.rightIcon = imgUrl[0].showSelectImg
                }
            }
            this.isShowCropper = false
            this.updateFloor()
        },
        getCropperImgMsg(){
            let url = this.$refs.chooseMaterial.getParentImage()
            if(url != ''){
                if(this.chooseIconIndex == 'left'){
                    this.listStyleForm.leftIcon = url
                }
                else{
                    this.listStyleForm.rightIcon = url
                }
            }
            // this.$refs.chooseMaterial.clearChooseImg()

            this.isShowCropper = false
            this.updateFloor()
            //console.log(url)
        },
        //选择图片end
        delLeftIcon(index){
            if(index == 'left'){
                this.listStyleForm.leftIcon = ''
            }else{
                this.listStyleForm.rightIcon = ''
            }
            this.updateFloor()
        },
        checkFontType(type){
            this.isFontCheckedType = type
            this.listStyleForm.contentType = type
            this.listStyleForm.isShow = '1'
            this.listStyleForm.subTitle = '';
            this.updateFloor();
        },
        checkJumpType(type){
            this.ischeckJump = type
            this.listStyleForm.picLinkType = type
            this.listStyleForm.jumpUrl = '';
            this.updateFloor();
        },
        //****显示图标控制开始 */
        chooseState(tar,cId){
            //console.log(tar)
            if(cId != '1'){
                this.listStyleForm.isSend = '1'
            }
            else{
                this.listStyleForm.isSend = '0'
            }
            this.updateFloor();
        },
        handleShowLine(val){
            if(val != '1'){
                this.listStyleForm.isShowLine = '1'
            }
            else{
                this.listStyleForm.isShowLine = '0'
            }
            this.updateFloor()
        },
        handleRight(val){
            if(val != '1'){
                this.listStyleForm.isShow = '1'
                this.isFontCheckedType = '8'
            }
            else{
                this.listStyleForm.isShow = '0'
                this.isFontCheckedType = ''
                this.listStyleForm.contentType = ''
            }
            this.updateFloor();
        },
        handleJump(val){
            if(val != '1'){
                this.listStyleForm.isJumpUrl = '1'
                this.ischeckJump = '2'
                this.listStyleForm.picLinkType = '2'
            }
            else{
                this.listStyleForm.isJumpUrl = '0';
                this.ischeckJump = '1';
            }
            console.info(this.picLinkType)
            this.updateFloor();
        },
        handleLogin(val){
            if(val != '1'){
                this.listStyleForm.isLogin = '1'
            }
            else{
                this.listStyleForm.isLogin = '0'
            }
            this.updateFloor();
        },
        //****显示图标控制开始 */
    }
}
</script>
<style lang="scss" scoped>
.list-style{
    width: 100%;
    padding: 0 20px;
    .list-style-item{
        width: 360px;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
        >span{
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            width: 72px;
            line-height: 40px;
        }
        .content{
            width: 288px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0,0,0,0.10);
                border-radius: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon{
                    background: #F5F5FA;
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 2px;
                    width: 28px;
                    height: 28px;
                }
            }
            .input{
                width: 188px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .styleName{
                width: 288px;
            }
            .instruction{
                width: 228px;
            }
            .marginTop{
                width: 288px;
                display: flex;
                position: relative;
                justify-content: flex-start;
                .el-input{
                    width: 100%;
                }
                .btn{
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    right: 0;
                    border-left: 1px solid #DDE0E4;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    align-items: center;
                    background: transparent;
                    // padding: 1px 0;
                    // border-radius: 0 4px 4px 0;
                    cursor: pointer;
                    >div{
                        width: 100%;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:nth-child(1){
                            border-bottom: .5px solid #DDE0E4;
                        }
                        &:nth-child(2){
                            border-top: .5px solid #DDE0E4;
                        }
                        >i{
                            font-size: 16px;
                            color: #A2A4A6;
                        }
                    }
                }
            }
            .icon{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                >span{
                    font-family: MicrosoftYaHeiUI;
                    font-size: 12px;
                    color: #CACCD2;
                }
                .img{
                    width: 80px;
                    height: 80px;
                    background: #FAFAFC;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    margin-top: 22px;
                    .del-img{
                        width: 80px;
                        height: 40px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        opacity: 0;;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        >img{
                            margin-right: 10px;
                            cursor: pointer;
                        }
                    }
                    &:hover{
                        .del-img{
                            opacity: 1;
                            background: rgba($color: #000000, $alpha: .5);
                        }
                    }
                }
            }

            .splitBtn {
                background: #CACCD2;
                border-radius: 1px;
                width: 32px;
                height: 2px;
                margin-left: 20px;
                position: relative;
                cursor: pointer;
            }

            .splitBtn__active {
                background: #A8D2FF;
            }

            .splitRadio{
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #CACCD2;
                position: absolute;
                left: 0px;
                top: -8px;
            }
            .splitRadio__active {
                position: absolute;
                left: 16px;
                top: -8px;
                background: #3671FF;
                transition: left 0.5 ease-in-out;
            }


        }
        .login-right,.del-right,.isDividLine{
            cursor: pointer;
        }
    }
    .list-icon .content{
        height: 120px;
    }
    .rightFont{
        .content{
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            height: 92px;
            .detail{
                width: 288px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                .del-left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    >div{
                        width: 56px;
                        height: 32px;
                        background: #FAFAFC;
                        border-radius: 2px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 8px;
                        cursor: pointer;
                        >span{
                            font-family: MicrosoftYaHeiUI;
                            font-size: 12px;
                            color: #323C41;
                        }
                    }
                    >div:last-child{
                        margin-right: 0px;
                    }
                    .checked{
                        background: #F2F8FF;
                        border: 1px solid #3671FF;
                        >span{
                            color: #3671FF;
                        }
                    }
                }
            }
            .input{
                width: 288px;
                .el-select{
                    width: 288px;
                }
            }
            .isLogin{
                width: 288px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                >span{
                    font-family: MicrosoftYaHeiUI;
                    font-size: 13px;
                    color: #323C41;
                }
            }
            .login-first{
                margin-top: 20px;
            }
        }
        .noRightFont{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            .detail{
                justify-content: flex-end;
                margin-bottom: 0px;
            }
        }
        .jumpUrl{
            height: 172px;
        }
        .noJumpUrl{
            height: 40px;
            justify-content: center;
            .detail{
                justify-content: flex-end;
                margin-bottom: 0px;
            }
        }
    }
    .submit-button{
        display: flex;
        cursor: pointer;
        padding: 0;
        align-items: center;
        justify-content: center;
        width: 112px;
        height: 40px;
        border-radius: 3px;
        background: #3671FF;
        // border: 1px rgb(220, 223, 230) solid;
        margin: 20px auto 0;
        // &:hover{
        //     // background: #3671FF;
        // }
        span {
            font-family: MicrosoftYaHeiUI;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 1px;
            text-align: center;
        }
    }
    .floor_save{
            width: 80%;
            height: 35px;
            color: #FFFFFF;
            background-color:#3671FF;
            padding: 8px;
            margin: 20px auto;
            border-radius: 6px;
            font-size: 13px;
            letter-spacing: 2px;
            text-align: center;
            margin-top: 24px;
            cursor: pointer;
            opacity: 1;
    }

    .floor_save:hover,
    .floor_save:active{
        opacity: 0.8;
    }
}
</style>