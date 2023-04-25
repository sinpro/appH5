<template>
    <div class="navigationbar__style">
        <div class="imageText">
            <el-form>
                <el-form-item label="色调">
                    <ul class="status">
                        <li :class="[statusIndex==1?'select':0]" @click="changeStatus(1)">黑色</li>
                        <li :class="[statusIndex==2?'select':0]" @click="changeStatus(2)">白色</li>
                    </ul>
                </el-form-item>
                <div class="cut__off__ule">
                    <span>底色</span>
                    <el-input style="margin-left:45px;" :disabled="!isShowBackground" v-model="backgroundColor" @change="update" placeholder="无"></el-input>
                    <el-color-picker v-model="backgroundColor" :disabled="!isShowBackground" @change="update"></el-color-picker>
                    <div @click="showBackgroundClick" class="splitBtn" :class="[isShowBackground ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isShowBackground ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
                <div class="cut__off__ule">
                    <span>分割线</span>
                    <el-input :disabled="!isShowLine" v-model="divlineColor" @change="update" placeholder="无"></el-input>
                    <el-color-picker v-model="divlineColor" :disabled="!isShowLine" @change="update"></el-color-picker>
                    <div @click="showLineClick" class="splitBtn" :class="[isShowLine ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isShowLine ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="attributes">
            <el-form>
                <div class="attributes-area">
                    <el-form-item label="左侧内容" :style="{height:isShowLeft?'80px':'60px'}">
                        <el-select v-model="leftContentType" @change="update" v-if="isShowLeft" placeholder="请选择">
                            <el-option
                            v-for="item in leftContentTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <div @click="showLeftClick" class="splitBtn" :class="[isShowLeft ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[isShowLeft ? 'splitRadio__active' : '']"></div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="isShowLeft && leftContentType=='3'">
                        <div class="carousel__content__body left-icon" v-for="(item,index) in leftIcon" :key="index">
                            <div style="display: flex">
                                <span class="carousel__content__body__text"></span>
                                <div class="carousel__Specifications" @click.stop.prevent="handleDialogShow('left'+index)">
                                    <img class="showImg" :src="concatImageUrl(leftIcon[index].picUrl)" alt="" v-if="item.upbtnGroup">
                                    <img src="../../../assets/add1.png" alt=""  v-if="!item.upbtnGroup">
                                    <span  v-if="!item.upbtnGroup">24x24@2x</span>
                                    <div v-if="item.upbtnGroup" class="del-img">
                                        <img :src="iconDelWhite" alt="" @click.stop.prevent="delLeft(index)">
                                    </div>
                                    <!-- <input  type="file" class="file"> -->
                                </div>
                            </div>
                            <!-- <div class="arousel__peration">
                                <img :src="iconlinkImg" alt="" @click="showMenuSetting(index)">
                                <img @click="changeImgIndexTop(index)" :src="index!=0?iconUpActiveImg:iconUpStopImg" alt="">
                                <img @click="changeImgIndexBottom(index)" :src="index!=uploadImgList.length-1?iconDownStopImg:iconDownActiveImg" alt="">
                                <img :src="iconDelImg" alt="" @click="delPic(index)">
                            </div> -->
                        </div>
                    </el-form-item>
                </div>
                <div class="attributes-area" v-if="currentTemplateItem.subkind != '02'">
                    <el-form-item class="title" label="标题">
                        <input v-model="title" @input="update" class="title-input" type="text">
                    </el-form-item>
                </div>
                <div class="attributes-area" v-if="currentTemplateItem.subkind=='02'">
                    <el-form-item class="voice-select" label="语音搜索">
                        <span>图标24x24@2x</span>
                        <img v-if="!voiceUrl" @click="handleDialogShow('voice')" src="../assets/icon_select.png" alt="">
                    </el-form-item>
                    <div class="carousel__content__body" v-if="voiceUrl">
                        <div style="display: flex">
                            <span class="carousel__content__body__text"></span>
                            <div class="carousel__Specifications">
                                <img class="showImg" :src="concatImageUrl(voiceUrl)" alt="">
                                <div v-if="voiceUrl" class="del-img">
                                    <img :src="iconDelWhite" alt="" @click="delVoice">
                                </div>
                            </div>
                        </div>
                        <!-- <div class="arousel__peration">
                            <img :src="iconlinkImg" alt="" @click="showMenuSetting(index)">
                            <img @click="changeImgIndexTop(index)" :src="index!=0?iconUpActiveImg:iconUpStopImg" alt="">
                            <img @click="changeImgIndexBottom(index)" :src="index!=uploadImgList.length-1?iconDownStopImg:iconDownActiveImg" alt="">
                            <img :src="iconDelImg" alt="" @click="delPic(index)">
                        </div> -->
                    </div>
                </div>
                <div class="attributes-area right-area">
                    <el-form-item label="右侧内容"  :style="{height:isShowRight?'80px':'60px'}">
                        <ul class="status" v-if="isShowRight">
                            <li :class="[rightIndex==0?'select':0]" @click="changeRight(0)">图标</li>
                            <li :class="[rightIndex==1?'select':0]" @click="changeRight(1)">文本</li>
                        </ul>
                        <div @click="showRightClick" class="splitBtn" :class="[isShowRight ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[isShowRight ? 'splitRadio__active' : '']"></div>
                        </div>
                    </el-form-item>
                    <input v-model="rightText" v-if="isShowRight && rightIndex==1" @input="changeRightText" class="text-input" type="text">
                    <div class="icon-group" v-if="isShowRight && rightIndex==0">
                        <div class="choose-icon-type">
                            <button @click="addRightIcon(0)">+单个图标</button>
                            <button @click="addRightIcon(1)">+图标组</button>
                        </div>
                    </div>
                    <div class="carousel__content__body right-icon" v-if="isShowRight && rightIndex==0" v-for="(item,index) in rightIcon" :key="index">
                        <div class="icon-list">
                            <div style="display: flex">
                                <span class="carousel__content__body__text">图标{{index+1}}</span>
                                <div class="carousel__Specifications"  @click="handleDialogShow('right'+index)">
                                    <img class="showImg" :src="concatImageUrl(rightIcon[index].picUrl)" alt="" v-if="item.upbtnGroup">
                                    <img src="../../../assets/add1.png" alt=""  v-if="!item.upbtnGroup">
                                    <span  v-if="!item.upbtnGroup">24x24@2x</span>
                                </div>
                            </div>
                            <div class="arousel__peration">
                                <img :src="iconlinkImg" alt="" @click="showMenuSetting('right'+index)">
                                <img v-if="index!=0" @click="changeImgIndexTop(index)" :src="iconUpActiveImg" alt="">
                                <img v-if="index!=rightIcon.length-1" @click="changeImgIndexBottom(index)" :src="iconDownStopImg" alt="">
                                <img :src="iconDelImg" alt="" @click="delPicRight(index)">
                            </div>
                        </div>
                        <div class="right-group" v-if="item.group.length>0">
                            <div class="group-item" v-for="(list,i) in item.group" :key="i">
                                <div class="carousel__Specifications"  @click="handleDialogShow('group'+i+index)">
                                    <img class="showImg" :src="concatImageUrl(list.picUrl)" alt="" v-if="list.upbtnGroup">
                                    <img src="../../../assets/add1.png" alt=""  v-if="!list.upbtnGroup">
                                    <span  v-if="!list.upbtnGroup">24x24@2x</span>
                                </div>
                                <div class="group-title">
                                    <input v-model="list.title" type="text">
                                    <div>
                                        <img :src="iconlinkImg" alt="" @click="showMenuSetting('group'+index+i)">
                                        <img v-if="i!=0" @click="changeGroupIndexTop(index,i)" :src="iconUpActiveImg" alt="">
                                        <img v-if="i!=item.group.length-1" @click="changeGroupIndexBottom(index,i)" :src="iconDownStopImg" alt="">
                                        <img :src="iconDelImg" alt="" @click="delPicGroup(index,i)">
                                    </div>
                                </div>
                            </div>
                            <p @click="addMore(index)" class="addMore">继续添加</p>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
        <!-- <el-dialog  title="上传图片" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
            <cropper ref="cropper" class="cropper" :imgUrl="cropperImgUrl" :cropwidth="24" :cropheight="24" :imgType="imgType"></cropper>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getCropperImgMsg" :disabled="isDisabled" class="btn">确定</el-button>
            </div>
        </el-dialog> -->
        <el-button class="submit-button" @click="submit">楼层保存</el-button>
        <div class="dialogImage">
            <el-dialog title="选择素材" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="getCropperImgMsg">确定</el-button>
                </div>
            </el-dialog>
        </div>
         <transition name="mtbox">
            <link-panel :options="isGroup ? rightIcon[parseInt(isRightIndex)].group[parseInt(isGroupIndex)] : rightIcon[parseInt(isRightIndex)]" v-if="isShowMt" title="图片设置" @back="backMenu"></link-panel>
        </transition>
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
        options: {
            type: Object,
            default () {
                return {}
            }
        },
        currentTemplateItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data(){
        return {
            divlineColor:'#F5F5FA',
            isShowLine:false,
            isShowBackground:false,
            backgroundColor:'#FFFFFF',
            isShowLeft:false,
            isShowRight:false,
            leftContentType:'3',
            size:[24,24,2],
            statusIndex:1,
            rightIndex:0,
            isShowCropper:false,
            title:'',
            isDisabled:false,
            voiceUrl:'',
            getImgIndex:'',
            rightText:'',
            styleInfoList:[],
            iconlinkImg: require('../../../assets/edit3.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del3.png'),
            iconDelWhite: require('../../../assets/del1.png'),
            leftContentTypeList:[],
            leftIcon:[],
            rightIcon:[],
            isShowMt:false,
            isRightIndex:0,
            isGroupIndex:0,
            rightIconGroup:[],
            centerIcon:[],
            isGroup:false
        }
    },
    watch: {
        rightIndex(val){
            this.rightIcon=[];
            let common = {
                isShow:1,
                picPositionType:'4',
                contentType:'4',
                title:"",
                subTitle:"文本",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                picUrl:'',
                upbtnGroup:false,
                isLoginNeeded:"0",
                isIdNeeded:"0",
            }
            if(val==1){
                this.rightIcon.push(common)
            }
        },
        leftContentType(val){
            console.info(22222222,val)
            let common = {
                isShow:1,
                picPositionType:'3',
                contentType:'3',
                title:"",
                subTitle:"",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                isLoginNeeded:"0",
                isIdNeeded:"0",
                picUrl:'',
                upbtnGroup:false
            }
            this.leftIcon = [];
            this.leftIcon.push(common);
            if (val=='3'){
                this.leftIcon.push(common);
            }else{
                this.leftIcon[0].contentType = val;
            }
            // this.update();
            // console.info(this.leftContentType)
            // console.info(this.leftIcon,222)
        },
        isShowLeft(val){
            if(val==false){
                this.leftIcon=[]
            }else{
                if(this.leftIcon.length==0){
                    let common = {
                        isShow:1,
                        picPositionType:'3',
                        contentType:'3',
                        title:"",
                        subTitle:"",
                        styleTypeSub:"",
                        picLinkType:"1",
                        picLink:"",
                        isLoginNeeded:"0",
                        isIdNeeded:"0",
                        picUrl:'',
                        upbtnGroup:false
                    }
                    common = JSON.stringify(common)
                    this.leftIcon = [];
                    this.leftIcon.push(JSON.parse(common));
                    if (this.leftContentType=='3'){
                        this.leftIcon.push(JSON.parse(common));
                    }else{
                        this.leftIcon[0].contentType = this.leftContentType;
                    }
                    console.info(this.leftIcon,11111)
                }
                this.leftIcon.forEach(item=>{
                    item.isShow='1';
                })
            }
        },
        isShowRight(val){
            if(val==false){
                this.rightIcon.forEach(item=>{
                    item.isShow='0';
                })
            }else{
                this.rightIcon.forEach(item=>{
                    item.isShow='1';
                })
            }
        },
        voiceUrl(val){
            if(val){
                this.centerIcon = [{
                    isShow:1,
                    picPositionType:'5',
                    contentType:'3',
                    title:"",
                    subTitle:"",
                    styleTypeSub:"",
                    picLinkType:"1",
                    picLink:"",
                    isLoginNeeded:"0",
                    isIdNeeded:"0",
                    picUrl:val,
                }]
            }else{
                this.centerIcon = []
            }
        }
    },
    created(){
        console.info(this.currentTemplateItem.subkind,this.currentTemplateItem,this.options);
        this.init();
    },
    methods:{
        init(){
            let common = {
                isShow:1,
                picPositionType:'3',
                contentType:'3',
                title:"",
                subTitle:"",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                isLoginNeeded:"0",
                isIdNeeded:"0",
                picUrl:'',
                upbtnGroup:false
            }
            if(this.currentTemplateItem.subkind == '01'){
                this.leftContentType ='3';
                this.leftContentTypeList=[
                    {value:'3',label:'图标'},
                    {value:'5',label:'定位'},
                    {value:'6',label:'返回'},
                    {value:'7',label:'关闭'},
                    {value:'8',label:'返回和关闭'},
                ]
            }else if(this.currentTemplateItem.subkind == '02'){
                this.leftContentType ='3';
                this.leftContentTypeList = [
                    {value:'3',label:'图标'},
                    {value:'5',label:'定位'},
                    {value:'6',label:'返回'},
                    {value:'7',label:'关闭'},
                ]
            }else{
                this.leftContentType ='6';
                this.leftContentTypeList = [
                    {value:'6',label:'返回'},
                    {value:'7',label:'关闭'},
                ]
            }
            this.leftIcon = [];
            this.rightIcon = [];
            let options = this.currentTemplateItem.options;
            this.noteType = options.noteType;
            this.isShowLine = options.isShowLine=='1'?true:false;
            this.divlineColor = options.divlineColor;
            this.backgroundColor = options.color;
            this.title = options.title;
            options.styleInfoList.forEach(item=>{
                if(item.picPositionType=='3'){
                    if(item.picUrl){
                        item.upbtnGroup = true;
                    }else{
                        item.upbtnGroup = false;
                    }
                    this.leftIcon.push(item)
                    this.isShowLeft = true;
                    this.leftContentType = item.contentType;
                }
                if(item.picPositionType=='4'){
                    this.isShowRight = true;
                    if(item.contentType == '4'){
                        this.rightText = item.subTitle;
                        this.rightIndex = 1;
                        this.rightIcon.push(item)
                    }else{
                        if(item.picUrl){
                            item.upbtnGroup = true;
                        }else{
                            item.upbtnGroup = false
                        }
                        this.rightIndex=0;
                        if(!item.picNum){
                            item.group = [];
                            this.rightIcon.push(item)
                        }else{
                            this.rightIcon[parseInt(item.picNum)-1].group.push(item);
                        }
                    }
                }
                if(item.picPositionType=='5'){
                    this.centerIcon.push(item);
                    this.voiceUrl = item.picUrl;
                }
            })
            // console.info(this.leftIcon,1111111);
            // this.leftIcon.push(common);
            // if(this.leftContentType == '3'){
            //     this.leftIcon.push(common)
            // }
        },
        submit(){
            let array = [];
            if(this.rightIcon.length>0){
                this.rightIcon.forEach((item,index)=>{
                    item.ordernNum = index+1;
                    if(item.group && item.group.length>0){
                        item.group.forEach(list=>{
                            list.picNum = index+1;
                            array.push(list)
                        })
                    }
                })
            }
            this.styleInfoList = [];
            this.styleInfoList = this.styleInfoList.concat(this.leftIcon,this.rightIcon,this.centerIcon,array);
            let options = this.currentTemplateItem.options;
            console.info(this.styleInfoList,2222222222222)
            let navigationList = this.styleInfoList;
            navigationList.forEach(list=>{
                list.styleName= options.styleName;
                list.styleType= options.styleType;
                list.floorId= options.floorId;
            })
            let floorData ={
                floorId: options.floorId,
                pageId: this.$route.query.pageId,
                styleType: options.styleType,
                floorType: options.floorType,
                floorName: options.floorName,
                floorIsAd: options.floorIsAd,
                noteType:this.statusIndex,
                divlineColor:this.divlineColor,
                title:this.title,
                isShowLine:this.isShowLine ? '1' : '0',
                color:this.backgroundColor,
                styleInfoList:this.styleInfoList,
                isCustomized:this.isShowBackground ? '1':'0',
                operatorId: this.options.operatorId || this.currentTemplateItem.options.operatorId || '',
                operator: this.options.operator || this.currentTemplateItem.options.operator || ''
            }
            console.info(this.styleInfoList,11111111111)
            editFloorStyleAllocation(floorData).then(res => {
                if(res.data.body.errorCode === '0') {
                   let data={
                        floorType: options.floorType,
                        floorId: options.floorId,
                        navigationList
                    }
                    console.info(data);
                    eidtMenuStyleRpc(data).then(res=>{
                        this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                    });
                } else {
                    this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                }
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
        changeRightText(){
            this.rightIcon[0].subTitle = this.rightText;
            console.info(this.rightText,this.rightIcon)
            this.update()
        },
        delPic(i){
            this.leftIcon[i].picUrl = '';
            this.leftIcon[i].upbtnGroup = false; 
        },
        // changeRightIcon(){
        //     this.rightIcon.forEach((item,index)=>{
        //         console.info(item,index)
        //         item.ordernNum = index+1;
        //         if(item.group && item.group.length>0){
        //             item.group.forEach(list=>{
        //                 list.picNum = index+1;
        //             })
        //         }
        //     })
        // },
        delPicRight(i) {
            this.rightIcon.splice(i,1);
            console.info(this.rightIcon)
            this.update();
        },
        delPicGroup(index,i){
            this.rightIcon[index].group.splice(i,1);
            this.update();
        },
        changeImgIndexTop(index){
            if(index!=-1){
                this.rightIcon.splice(index,1,...this.rightIcon.splice(index-1,1,this.rightIcon[index]))
            }
            this.update();
        },
        changeImgIndexBottom(index){
            if(index!=-1){
                this.rightIcon.splice(index,1,...this.rightIcon.splice(index+1,1,this.rightIcon[index]))
            }
            this.update();
        },
        changeGroupIndexTop(index,i){
            if(i!=-1){
                this.rightIcon[index].group.splice(i,1,...this.rightIcon[index].group.splice(i-1,1,this.rightIcon[index].group[i]))
            }
            this.update();
        },
        changeGroupIndexBottom(index,i){
            if(i!=-1){
                this.rightIcon[index].group.splice(i,1,...this.rightIcon[index].group.splice(i+1,1,this.rightIcon[index].group[i]))
            }
            this.update();
        },
        backMenu(data){
            this.isShowMt = false;
            if(this.isGroup){
                let rightArray = this.rightIcon[this.isRightIndex].group[this.isGroupIndex];
                rightArray.isIdNeeded = data.isIdNeeded;
                rightArray.isLoginNeeded = data.isLoginNeeded;
                rightArray.picLink = data.picLink;
                rightArray.picLinkType = data.picLinkType;
            }else{
                let rightArray = this.rightIcon[this.isRightIndex];
                rightArray.isIdNeeded = data.isIdNeeded;
                rightArray.isLoginNeeded = data.isLoginNeeded;
                rightArray.picLink = data.picLink;
                rightArray.picLinkType = data.picLinkType;
            }
            console.info(this.rightIcon[this.isRightIndex])
        },
        showMenuSetting(i){
            this.isShowMt = true;
            if(i.indexOf('right')>-1){
                this.isGroup = false,
                this.isRightIndex = i.slice(5,6);
            }else{
                this.isGroup = true,
                this.isRightIndex = i.slice(5,6);
                this.isGroupIndex = i.slice(6,7)
            }
        },
        addRightIcon(index){
            let common = {
                isShow:1,
                picPositionType:'4',
                contentType:'3',
                title:"",
                subTitle:"",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                picUrl:'',
                upbtnGroup:false,
                isLoginNeeded:"0",
                isIdNeeded:"0",
                group:[]
            }
            let group = {
                isShow:1,
                picPositionType:'4',
                contentType:'3',
                title:"",
                subTitle:"",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                picUrl:'',
                upbtnGroup:false,
                isLoginNeeded:"0",
                isIdNeeded:"0",
            }
            let len = this.currentTemplateItem.subkind=='03'?3:2;
            if(this.rightIcon.length<len){
                this.rightIcon.push(common)
                if(index==1){
                    group.title="名称";
                    this.rightIcon[this.rightIcon.length-1].group.push(group)
                }
            }
            this.update();
        },
        addMore(index){
            let group = {
                isShow:1,
                picPositionType:'4',
                contentType:'3',
                title:"",
                subTitle:"",
                styleTypeSub:"",
                picLinkType:"1",
                picLink:"",
                picUrl:'',
                upbtnGroup:false,
                isLoginNeeded:"0",
                isIdNeeded:"0",
            }
            group.title="名称";
            if(this.rightIcon[index].group.length<5){
                this.rightIcon[index].group.push(group)
            }
            console.info(this.rightIcon)
            this.update();
        },
        handleDialogClose(){
            this.isShowCropper=false;
        },
        handleDialogShow(val){
            this.getImgIndex=val;
            this.isShowCropper=true;
        },
        getImgUrl(materialUrlList){
            if(this.getImgIndex == 'left0'){
                this.leftIcon[0].picUrl = materialUrlList;
                this.leftIcon[0].upbtnGroup = true;
            }else if(this.getImgIndex == 'left1'){
                this.leftIcon[1].picUrl = materialUrlList;
                this.leftIcon[1].upbtnGroup = true;
            }else if(this.getImgIndex == 'voice'){
                this.voiceUrl = materialUrlList;
            }else if(this.getImgIndex.indexOf('right')>-1){
                this.rightIcon[parseInt(this.getImgIndex.slice(5,6))].picUrl = materialUrlList;
                this.rightIcon[parseInt(this.getImgIndex.slice(5,6))].upbtnGroup = true;
            }else if(this.getImgIndex.indexOf('group')>-1){
                let rightIcon = this.rightIcon[parseInt(this.getImgIndex.slice(6,7))].group[parseInt(this.getImgIndex.slice(5,6))];
                // console.info(rightIcon.picUrl,555555555555)
                rightIcon.picUrl = materialUrlList;
                // console.info(rightIcon.picUrl,555555555555)
                rightIcon.upbtnGroup = true;
            }
            this.isShowCropper = false
            this.update();
        },
        backImg(imgArr) {
            let materialUrlList = imgArr[0].showSelectImg;
            this.getImgUrl(materialUrlList);
        },
        getCropperImgMsg() {
            let materialUrlList = this.$refs.chooseMaterial.getParentImage()
            this.getImgUrl(materialUrlList);
        },
        changeStatus(val){
            this.statusIndex=val;
            this.update();
        },
        changeRight(val){
            this.rightIndex=val;
            this.update();
        },
        update(){
            this.$nextTick(() => {
                this.styleInfoList = [];
                let array = [];
                if(this.rightIcon.length>0){
                    this.rightIcon.forEach((item,index)=>{
                        item.ordernNum = index+1;
                        if(item.group && item.group.length>0){
                            item.group.forEach(list=>{
                                list.picNum = index+1;
                                array.push(list)
                            })
                        }
                    })
                }
                this.styleInfoList = this.styleInfoList.concat(this.leftIcon,this.rightIcon,this.centerIcon,array);
                let menuOptions = {
                    noteType:this.statusIndex,
                    divlineColor:this.divlineColor,
                    title:this.title,
                    isShowLine:this.isShowLine ? '1' : '0',
                    color:this.backgroundColor,
                    styleInfoList:this.styleInfoList,
                    isCustomized:this.isShowBackground ? '1':'0',
                };
                // console.info(111111111)
                // console.info(this.leftContentType);
                // console.info(menuOptions)
                this.$emit('setMenuStyleOptions', menuOptions)
            })
        },
        showLineClick(){
            this.isShowLine = !this.isShowLine
            this.update();
        },
        showBackgroundClick(){
            this.isShowBackground = !this.isShowBackground,
            this.update();
        },
        showLeftClick(){
            this.isShowLeft = !this.isShowLeft;
            this.update();
        },
        showRightClick(){
            this.isShowRight = !this.isShowRight;
            this.update();
        },
        delVoice(){
            this.voiceUrl = '';
            this.centerIcon = [];
            this.update();
        },
        delLeft(index){
            this.leftIcon[index].picUrl = '';
            this.leftIcon[index].upbtnGroup = false;
            this.update();
        }

    }
}
</script>

<style lang="scss" scoped>
    .navigationbar__style{
        .imageText{
            .el-form-item__label {
                padding: 0 20px 0 0;
            }
        }
        .el-form {
            padding: 20px 20px 4px 20px;
            // box-shadow: inset 0 -1px 0 0 #F5F5FA;
        }
        .el-form-item {
            margin-bottom: 20px;
        }
        .el-form-item__label {
            // padding: 0 33px 0 0;
        }
        .el-radio+.el-radio {
            margin-left: 50px;
        }
        .el-form-item__label, .el-radio__label, .el-input__inner {
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            font-weight: 400;
            color: #323C41;
            letter-spacing: 0;
        }
        .el-form-item__label {
            width: 72px;
            text-align: left;
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            letter-spacing: 0;
        }
        .cut__off__ule span{
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            // width: 50px;
            letter-spacing: 0;
        }
        .cut__off__ule {
            padding-top: 20px;
            display: flex;
            align-items: center;
            position: relative;
        }
        .cut__off__ule {
            // box-shadow: inset 0 -1px 0 0 #F5F5FA;
            padding-bottom: 20px;
        }
        .cut__off__ule .el-input {
            height: 40px;
            width: 200px;
            margin-left: 33px;
        }
        .cut__off__ule .el-input__inner {
            height: 40px;
            padding-left: 15px;
        }
        // .cut__off__ule{
        .splitBtn {
            background: #CACCD2;
            border-radius: 1px;
            width: 32px;
            height: 2px;
            margin-left: 52px;
            position: relative;
            cursor: pointer;
        }
        .status{
            display: flex;
            li{
                cursor: pointer;
                width: 56px;
                height: 32px;
                background: #FAFAFC;
                border-radius: 2px;
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #323C41;
                letter-spacing: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                &:nth-child(2){
                    margin-left: 8px;
                }
                &.select{
                    background: #F2F8FF;
                    border: 1px solid #3671FF;
                    border-radius: 2px;
                    color: #3671FF;
                }
            }
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
        .el-color-picker {
            display: inline-block;
            line-height: normal;
            height: 40px;
            position: absolute;
            left: 232px;
        }
        .el-color-picker__trigger {
            border: 1px solid #dcdfe6;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        
        .attributes{
            .voice-select{
                height: 60px;
                span{
                    font-family: MicrosoftYaHeiUI;
                    font-size: 12px;
                    color: #CACCD2;
                }
                img{
                    cursor: pointer;
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    margin: auto;
                    top: 0;
                    bottom: 0;
                    right: 5px;
                }
            }
            .el-form{
                padding-top: 0;
            }
            .attributes-area{
                // padding: 0 20px;
                background: #FFFFFF;
                box-shadow: inset 0 -1px 0 0 #F5F5FA;
                // padding-bottom: 20px;
                &.right-area{
                    box-shadow: inset 0 0 0 0 #FFFFFF
                }
                .title{
                    height: 80px;
                    .title-input{
                        background: #FFFFFF;
                        display: block;
                        padding-left: 16px;
                        width: 288px;
                        height: 40px;
                        border: 1px solid #DDE0E4;
                        border-radius: 2px;
                    }
                }
                .text-input{
                    margin-left: 72px;
                    background: #FFFFFF;
                    display: block;
                    padding-left: 16px;
                    width: 288px;
                    height: 40px;
                    border: 1px solid #DDE0E4;
                    border-radius: 2px;
                }
                .el-form-item{
                    display: flex;
                    align-items: center;
                    position: relative;
                    margin-bottom: 0;
                    .el-input__inner{
                        padding-left: 16px;
                    }
                    // justify-content: flex-end;
                    .el-form-item__content{
                        position: initial;
                        .splitBtn{
                            position: absolute;
                            right: 4px;
                            margin: auto;
                            top: 0;
                            bottom: 0;
                        }
                        .el-select{
                            width: 228px;
                        }
                    }
                }
            }
            .carousel__content__body {
                display: flex;
                justify-content: space-between;
                margin-left: 72px;
                &.left-icon{
                    display: inline-block;
                    &:nth-child(2){
                        margin-left: 99px;
                        .file{
                            left: 251px;
                        }
                    }
                }
            }
            .carousel__content__body .carousel__content__body__text{
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
            }
            .carousel__Specifications {
                position: relative;
                cursor: pointer;
                width: 80px;
                height: 80px;
                background: #FAFAFC;
                align-items: center;
                .showImg {
                    margin: 0;
                    width: 80px;
                    height: 80px;
                }
                .file {
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    // background: green;
                    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                    left: 72px;
                    top: 0;
                }
            }
            .carousel__Specifications span {
                display: block;
                // margin-left: 83px;
                // margin-top: 8px;
                margin-top: -10px;
                text-align: center;
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                line-height: 12px;
                color: #A2A4A6;
            }
            .carousel__Specifications img {
                // margin-left: 110px;
                // margin-top: 98px;
                margin-top: 22px;
                margin-left: 30px;
            }
            .arousel__peration img{
                cursor: pointer;
                display: block;
                // margin-bottom: 10px;
            }
            .addColorStyle>:last-child .el-radio__label{
                color: #D0021B;
            }
        }
        .el-dialog{
            width: 800px;
            .el-dialog__body{
                padding: 0;
            }
        }
        .dialogImage{
            .el-dialog{
                width: 800px;
                .el-dialog__body{
                    padding: 0;
                }
            }
        }
        .icon-group{
            .choose-icon-type{
                display: flex;
                margin-left: 72px;
                button{
                    cursor: pointer;
                    width: 106px;
                    height: 40px;
                    background: #FFFFFF;
                    border: 1px solid #DDE0E4;
                    border-radius: 2px;
                    font-family: MicrosoftYaHeiUI;
                    font-size: 12px;
                    color: #323C41;
                    letter-spacing: 0;
                    text-align: center;
                    &:nth-child(2){
                        margin-left: 16px;
                    }
                }
            }
        }
        .right-icon{
            margin-left: 0 !important;
            margin-top: 20px;
            flex-direction: column;
            justify-content: flex-start !important;
            cursor: pointer;
            .icon-list{
                display: flex;
                justify-content: flex-start;
                .arousel__peration{
                    img{
                        margin-left: 10px;
                    }
                }
            }
            .carousel__content__body__text{
                width: 72px;
                text-align: left;
            }
            .carousel__Specifications span{
                margin-top: 0;
            }
            .carousel__Specifications .file{
                left: 72px;
            }
            .arousel__peration{
                display: flex;
                align-items: center;
                height: 20px;
                justify-content: flex-start;
            }
            .right-group{
                padding: 0 10px 20px;
                width: 288px;
                margin-left: 72px;
                margin-top: 10px;
                border: 1px dashed #DDDDDD;
                .group-item{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    .group-title{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        input{
                            background: #FFFFFF;
                            border: 1px solid #DDE0E4;
                            border-radius: 2px;
                            width: 178px;
                            height: 40px;
                            padding: 0 16px;
                        }
                        div{
                            margin-top: 10px;
                        }
                    }
                }
                .addMore{
                    margin-top: 20px;
                    text-align: center;
                    font-family: MicrosoftYaHeiUI;
                    font-size: 12px;
                    color: #3671FF;
                    letter-spacing: 0;
                    line-height: 16px;
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
        .del-img{
            width: 80px;
            height:40px;
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 10px;
            opacity: 0;
            img{
                margin: 0 !important;
                width: 20px;
                height: 20px;
            }
        }
        .carousel__Specifications:hover .del-img{
            opacity: 1;
            background: rgba($color: #000000, $alpha: .5);
        }
    }
</style>
