<template>
    <div class="imageText__style">
        <div class="imageText">
            <el-form>
                <el-form-item label="上下边距" class="topBottomMargin">
                    <div class="flex__box">
                        <div class="flex__box">
                            <div class="top__text">上</div>
                            <el-input-number v-model="topDistance" controls-position="right" @change="update" :min="0" :max="100"></el-input-number>
                        </div>
                        <div class="flex__box">
                            <div class="top__text">下</div>
                            <el-input-number v-model="bottomDistance" controls-position="right" @change="update" :min="0" :max="100"></el-input-number>
                        </div>
                    </div>
                </el-form-item>
                <div class="cut__off__ule" v-if="copyFlag=='01'||copyFlag=='02'||copyFlag=='09'">
                    <span>分割线</span>
                    <el-input :disabled="!isShowLine" v-model="divlineColor" @change="update" placeholder="无"></el-input>
                    <el-color-picker v-model="divlineColor" :disabled="!isShowLine" @change="update"></el-color-picker>
                    <div @click="showLineClick" class="splitBtn" :class="[isShowLine ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isShowLine ? 'splitRadio__active' : '']"></div>
                </div>
            </div>
            </el-form>
        </div>
        <div class="oncrete__attributes">
            <el-form>
                <el-form-item label="图片位置" class="nomal__margin" v-if="copyFlag == '01'">
                    <el-radio-group v-model="picPositionType" @change="update">
                        <el-radio label="左">
                        </el-radio>
                        <el-radio label="右">
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" v-if="copyFlag != '09'">
                    <el-radio-group v-model="aspectRatio" @change="update" class="addColorStyle">
                        <el-radio label="4:1" v-if="copyFlag == '02'">
                        </el-radio>
                        <el-radio label="3:1" v-if="copyFlag == '06'">
                        </el-radio>
                        <el-radio label="2:1" v-if="copyFlag == '03'">
                        </el-radio>
                        <el-radio label="1.5:1" v-if="copyFlag == '07' || copyFlag == '01' || copyFlag == '04'">
                        </el-radio>
                        <el-radio label="1:1" v-if="copyFlag == '08' || copyFlag == '05' || copyFlag == '03' || copyFlag == '01' || copyFlag == '04'">
                        </el-radio>
                        <el-radio label="自定义">
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片高度" class="nomal__margin add__color__font" v-if="copyFlag != '09' && aspectRatio=='自定义'">
                    <el-input-number @change="update" v-model="picShowHeight" controls-position="right" :min="60" :max="500"></el-input-number>
                </el-form-item>
                <el-form-item label="组数" class="add__margin" v-if="copyFlag == '05' || copyFlag == '06' || copyFlag == '07' || copyFlag == '08'">
                    <el-input-number @change="update" v-model="groupCount" controls-position="right" :min="1" :max="9"></el-input-number>
                </el-form-item>
                <div v-for="(item,index) in uploadImgList" :key="index">
                    <el-form-item>
                        <div class="choose-img">
                            <span class="carousel__content__body__text">图文{{index+1}}</span>
                            <span class="choose-size">{{picShowWidth}}x{{picShowHeight}}@2x</span>
                            <img @click="uploadImg(index)" src="../assets/icon_select.png" alt="">
                        </div>
                        <div class="carousel__content__body" v-if="item.upbtnGroup">
                            <div style="display: flex">
                                <div class="carousel__Specifications" :style="{height:288*picShowHeight/picShowWidth+'px'}">
                                    <img :style="{height:288*picShowHeight/picShowWidth+'px'}" class="showImg" :src="concatImageUrl(item.picUrl)" alt="" v-if="item.upbtnGroup">
                                    <!-- <img :style="{margin:(288*picShowHeight/picShowWidth-20)/2+'px auto 0'}" src="../../../assets/add1.png" alt=""  v-if="!item.upbtnGroup"> -->
                                    <!-- <span v-if="!item.upbtnGroup">{{picShowWidth}}x{{picShowHeight}}@2x</span> -->
                                    <!-- <input :style="{height:288*picShowHeight/picShowWidth+'px'}" @change="uploadImg($event, index)" type="file" class="file"> -->
                                    <div class="arousel__peration">
                                        <div>
                                            <img v-if="index>0" @click="changeImgIndexTop(index)" :src="iconUpStopImg" alt="">
                                            <img v-if="index<uploadImgList.length-1" @click="changeImgIndexBottom(index)" :src="iconDownActiveImg" alt="">
                                            <img v-if="index>0" @click="toTop(index)" src="../../../assets/toTop.png" alt="">
                                            <img v-if="index<uploadImgList.length-1" @click="toBottom(index)" src="../../../assets/toBottom.png" alt="">
                                        </div>
                                        <div>
                                            <img :src="iconlinkImg" alt="" @click="showMenuSetting(index)">
                                            <img :src="iconDelImg" alt="" @click="delPic(index)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="大标题" class="other__margin" v-if="item.upbtnGroup">
                        <el-input @change="update" v-model="uploadImgList[index].title"></el-input>
                    </el-form-item>
                    <el-form-item @change="update" label="小标题" class="other__margin" v-if="copyFlag!='08' && item.upbtnGroup">
                        <el-input v-model="uploadImgList[index].subTitle"></el-input>
                    </el-form-item>
                    <el-form-item @change="update" label="说明文字" class="nomal__margin" v-if="(copyFlag == '01' || copyFlag == '02' || copyFlag == '05') && item.upbtnGroup">
                        <el-input v-model="uploadImgList[index].instructions"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-form v-if="copyFlag == '09'">
                <el-form-item label="按钮">
                    <div class="flex__box palace_boxshadow">
                        <div @click="isSplitBtn = !isSplitBtn; update()" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item v-if="isSplitBtn">
                    <div class="choose-img">
                        <span class="carousel__content__body__text">图片</span>
                        <span class="choose-size">68x28@2x</span>
                    </div>
                    <div class="carousel__content__body">
                        <div style="display: flex">
                            <div @click="uploadImg('button')" class="carousel__Specifications" :style="{height:288*28/68+'px'}">
                                <img :style="{height:288*28/68+'px'}" class="showImg" :src="concatImageUrl(buttonPicUrl)" alt="">
                                <div class="arousel__peration">
                                    <div>
                                        <img :src="iconDelImg" alt="" @click.stop="delButtonPic()">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <!-- <div class="submit-button" @click="submit">楼层保存</div> -->
            <div class="floor_save" @click="submit">
                <button>楼层保存</button>
            </div>
        </div>
        <!-- <el-dialog  title="上传图片" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
            <cropper ref="cropper" class="cropper" :imgUrl="cropperImgUrl" :cropwidth="picShowWidth" :cropheight="picShowHeight" :imgType="imgType"></cropper>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getCropperImgMsg" :disabled="isDisabled" class="btn">确定</el-button>
            </div>
        </el-dialog> -->
        <transition name="mtbox">
            <link-panel v-if="isShowMt" :options="uploadImgList[chooseIndex]" title="图片设置" @back="backMenu"></link-panel>
        </transition>
        <div class="dialogImage">
            <el-dialog title="选择素材" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="getCropperImgMsg">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixins from '../../mixins';
import { editFloorStyleAllocation, eidtMenuStyleRpc } from '../../../utils/api'
import cropper from '../../common/cropper';
import { API } from '~/config/api';
import { getCookie } from '../../../../../utils/cookie';
import { editFloor,editStyle } from '~/config/api';
import linkPanel from '../components/popup/linkPanel'
import chooseMaterial from '^/chooseMaterial'
import linkConfig from '../../../config/linkConfig'
export default {
    mixins,
    components:{
        cropper,
        linkPanel,
        chooseMaterial
    },
    data() {
        return {
            size:[],
            groupCount: 1,
            color: '#333333',
            gearSetChoose: '',
            uploadImgList:[],
            picPositionType: '左',
            styleName:'图文',
            styleType:'01',
            topDistance:16,
            bottomDistance:16,
            isShowLine:false,
            divlineColor:'red',
            uploadImgIndex:0,
            imgType:'',
            imgName:'',
            cropwidth:0,
            cropheight:0,
            isShowCropper:false,
            cropperImgUrl:'',
            isDisabled: false,
            copyFlag:'01',
            picShowWidth:104,
            picShowHeight:70,
            aspectRatio:'1:1',
            isShowMt:false,
            chooseIndex:0,
            iconlinkImg: require('../../../assets/edit1.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del1.png'),
            // labelWidth: '72px'
            isSplitBtn: false,
            buttonPicUrl: ''
        }
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
        currentTemplateItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    watch:{
        aspectRatio(val){
            this.aspectRatioChange();
        },
        groupCount(val){
            let len = this.uploadImgList.length;
            if(val>len){
                for(var i = len;i<val;i++){
                    this.uploadImgList[i]={};
                    this.uploadImgList[i].picUrl= i%2==1? linkConfig['flameappPicUrl'].url + "/cheetahresource/template/assets/gray.jpg": linkConfig['flameappPicUrl'].url + "/cheetahresource/template/assets/blue.jpg"
                    this.uploadImgList[i].title="大标题文案";
                    this.uploadImgList[i].subTitle="小标题文案";
                    this.uploadImgList[i].instructions="说明文字";
                    this.uploadImgList[i].picLinkType=this.uploadImgList[i].picLinkType || '1';
                    this.uploadImgList[i].isLoginNeeded=this.uploadImgList[i].isLoginNeeded || '0';
                    this.uploadImgList[i].isIdNeeded=this.uploadImgList[i].isIdNeeded || '0';
                }
            }else{
                this.uploadImgList.splice(val)
            }
            // if(this.picChange && (this.copyFlag=="05"||this.copyFlag=="06" || this.copyFlag=="07" || this.copyFlag=="08")){
            //     this.uploadImgList=[]
            //     for(var i=0;i<val;i++){
            //         this.uploadImgList[i]={};
            //         this.uploadImgList[i].picUrl= i%2==1?"http://pic.flameapp.cn/cheetahresource/template/assets/gray.jpg":"http://pic.flameapp.cn/cheetahresource/template/assets/blue.jpg"
            //         this.uploadImgList[i].title="大标题文案";
            //         this.uploadImgList[i].subTitle="小标题文案";
            //         this.uploadImgList[i].instructions="说明文字";
            //     }
            //     this.picChange=true;
            // }
        }
    },
    created() {
        this.copyFlag = this.currentTemplateItem.options.styleType;
        this.changeFlag();
        this.aspectRatioChange();
        this.initImgList();
        console.info(this.currentTemplateItem)
    },
    methods: {
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
        aspectRatioChange(){
            switch(this.styleType){
                case '01':
                    switch(this.aspectRatio){
                        case '1:1':
                            this.picShowWidth = 88;
                            this.picShowHeight = 88;
                            break
                        case '1.5:1':
                            this.picShowWidth = 104;
                            this.picShowHeight = 70;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '02':
                    switch(this.aspectRatio){
                        case '4:1':
                            this.picShowWidth = 343;
                            this.picShowHeight = 86;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break

                case '03':
                    switch(this.aspectRatio){
                        case '2:1':
                            this.picShowWidth = 164;
                            this.picShowHeight = 82;
                            break
                        case '1:1':
                            this.picShowWidth = 164;
                            this.picShowHeight = 164;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '04':
                    switch(this.aspectRatio){
                        case '1.5:1':
                            this.picShowWidth = 104;
                            this.picShowHeight = 70;
                            break
                        case '1:1':
                            this.picShowWidth = 104;
                            this.picShowHeight = 104;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '05':
                    switch(this.aspectRatio){
                        case '1:1':
                            this.picShowWidth = 80;
                            this.picShowHeight = 80;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '06':
                    switch(this.aspectRatio){
                        case '3:1':
                            this.picShowWidth = 300;
                            this.picShowHeight = 100;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '07':
                    switch(this.aspectRatio){
                        case '1.5:1':
                            this.picShowWidth = 142;
                            this.picShowHeight = 94;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '08':
                    switch(this.aspectRatio){
                        case '1:1':
                            this.picShowWidth = 88;
                            this.picShowHeight = 88;
                            break
                        default:
                            //宽度以最后选中的比例中的宽度
                            //高度自定义
                            break
                    }
                    break
                case '09':
                    this.picShowWidth = 88;
                    this.picShowHeight = 88;
                    break
            }
        },
        delPic(i) {
            // 清空图片
            // this.closeUpload = false
            this.uploadImgList[i].picUrl = linkConfig['flameappPicUrl'].url + '/cheetahresource/template/assets/blue.jpg'
            this.uploadImgList[i].upbtnGroup = false
            this.update();
        },
        delButtonPic () {
            this.buttonPicUrl = ''
        },
        backMenu(data) {
            console.info(data)
            this.isShowMt = false;
            this.uploadImgList[this.chooseIndex].isIdNeeded=data.isIdNeeded;
            this.uploadImgList[this.chooseIndex].isLoginNeeded=data.isLoginNeeded;
            this.uploadImgList[this.chooseIndex].picLink=data.picLink;
            this.uploadImgList[this.chooseIndex].picLinkType=data.picLinkType;
            this.uploadImgList[this.chooseIndex].xPicUrl=data.xPicUrl;
            this.update();
        },
        showMenuSetting(i){
            this.isShowMt = true;
            this.chooseIndex=i;
        },
        showLineClick(){
            this.isShowLine = !this.isShowLine
            this.update();
        },
        update(){
            this.$nextTick(() => {
                let graphicList = this.uploadImgList;
                graphicList.forEach(list=>{
                    //按钮图标
                    list.picUrl2 = this.buttonPicUrl
                })

                let menuOptions = {
                    topMargin:this.topDistance,
                    bottomMargin:this.bottomDistance,
                    isCustomized:this.aspectRatio == "自定义"?1:0,
                    picHeight:this.picShowHeight,
                    isShowLine:this.isShowLine?1:0,
                    aspectRatio:this.aspectRatio,
                    picPositionType:this.picPositionType=='左'?0:1,
                    divlineColor:this.divlineColor,
                    styleInfoList: this.uploadImgList
                };
                this.$emit('setMenuStyleOptions', menuOptions)
            })
        },
        submit(){
            let graphicList = this.uploadImgList;
            graphicList.forEach(list=>{
                list.styleName=this.styleName;
                list.styleType=this.styleType;
                list.floorId=this.options.floorId || this.currentTemplateItem.options.floorId;
                list.ordernNum=1;
                //按钮图标
                list.picUrl2 = this.buttonPicUrl
                list.contentType = ''
                list.picWidth=this.picShowWidth;
                list.picHeight=this.picShowHeight;
            })

            let heightF = 0
            switch(this.styleType){
                case '01':
                case '05':
                case '09':
                    heightF = this.picShowHeight
                    break
                case '02':
                case '03':
                case '06':
                    heightF = parseInt(this.picShowHeight, 10) + parseInt(50, 10)
                    break
                case '04':
                case '07':
                    heightF = parseInt(this.picShowHeight, 10) + parseInt(44, 10)
                    break
                case '08':
                    heightF = parseInt(this.picShowHeight, 10) + parseInt(28, 10)
                    break
            }

            heightF = parseInt(heightF, 10) + parseInt(this.topDistance, 10)
                 + parseInt(this.bottomDistance, 10)

            let floorData ={
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId || this.currentTemplateItem.options.pageId,
                styleType: this.styleType,
                floorType: '06',
                floorName: '图文',
                floorIsAd: '0',
                orderNum: 1,
                picPositionType:this.picPositionType=="左"?'0':'1',
                topMargin: this.topDistance,
                bottomMargin: this.bottomDistance,
                divlineColor: this.divlineColor,
                isShowLine:this.isShowLine?'1':'0',
                divlineType:'0',
                isCustomized: this.aspectRatio == '自定义' ? '1' : '0',
                aspectRatio: this.aspectRatio,
                picHeight: this.picShowHeight,
                groupNum: this.groupCount,
                status: '0',
                widthF: 375,
                isGap:'1',
                heightF: heightF,
                operatorId: this.options.operatorId || this.currentTemplateItem.options.operatorId || '',
                operator: this.options.operator || this.currentTemplateItem.options.operator || ''
            }
            console.info(floorData)
            editFloorStyleAllocation(floorData).then(res => {
                this.handleMsg (res, '保存成功', '保存失败')
                console.log(res)
            })
            let data={
                floorType:'06',
                floorId:this.options.floorId || this.currentTemplateItem.options.floorId,
                graphicList
            }
            console.info(data);
            eidtMenuStyleRpc(data);
        },
        changeFlag(){
            switch(this.copyFlag){
                case '01':
                    this.aspectRatio = '1:1';
                    this.styleType = "01";
                    this.groupCount = 1;
                    break
                case '02':
                    this.aspectRatio = '4:1';
                    this.styleType = "02";
                    this.groupCount = 1;
                    break
                case '03':
                    this.aspectRatio = '2:1';
                    this.styleType = "03";
                    this.groupCount = 2;
                    break
                case '04':
                    this.aspectRatio = '1:1';
                    this.styleType = "04";
                    this.groupCount = 3;
                    break
                case '05':
                    this.aspectRatio = '1:1';
                    this.groupCount = 2;
                    this.styleType = "05";
                    break
                case '06':
                    this.aspectRatio = '3:1';
                    this.groupCount = 2;
                    this.styleType = "06";
                    break
                case '07':
                    this.aspectRatio = '1.5:1';
                    this.groupCount = 4;
                    this.styleType = "07";
                    break
                case '08':
                    this.aspectRatio = '1:1';
                    this.groupCount = 6;
                    this.styleType = "08";
                    break
                case '09':
                    this.aspectRatio = '1:1';
                    this.groupCount = 1;
                    this.styleType = "09";
                    break
            }
            this.aspectRatioChange();
        },
        countChange(){

        },
        initImgList(){
            this.uploadImgList=this.currentTemplateItem.options.styleInfoList;
            this.topMargin=parseInt(this.currentTemplateItem.options.topMargin);
            this.bottomMargin=parseInt(this.currentTemplateItem.options.bottomMargin);
            this.aspectRatio=this.currentTemplateItem.options.aspectRatio;
            this.isShowLine=this.currentTemplateItem.options.isShowLine ==1?true:false;
            this.divlineType=this.currentTemplateItem.options.divlineType;
            this.divlineColor=this.currentTemplateItem.options.divlineColor;
            this.picShowHeight=this.isCustomized=='1'?this.currentTemplateItem.options.picHeight:this.picShowHeight;
            this.picPositionType=this.currentTemplateItem.options.picPositionType==0?'左':'右';
            this.groupCount=parseInt(this.currentTemplateItem.options.groupNum) || 2;
            this.uploadImgList.forEach(list => {
                list.picLinkType=list.picLinkType || '1';
                list.isLoginNeeded=list.isLoginNeeded || '0';
                list.isIdNeeded=list.isIdNeeded || '0';
                if(list.picUrl== linkConfig['flameappPicUrl'].url + '/cheetahresource/template/assets/blue.jpg'||list.picUrl== linkConfig['flameappPicUrl'].url + '/cheetahresource/template/assets/gray.jpg'){
                    list.upbtnGroup=false
                }else{
                    list.upbtnGroup=true;
                }
            })
            if(this.copyFlag == '09' && !this.uploadImgList.length) this.uploadImgList.push({})
            this.groupCount=this.uploadImgList.length;

            this.isSplitBtn = !!((this.uploadImgList[0] || {}).picUrl2)
            this.buttonPicUrl = ((this.uploadImgList[0] || {}).picUrl2)
            // let length = 0;
            // if(this.copyFlag=='00'|| this.copyFlag == '01'){
            //     length = 1;
            // }else if(this.copyFlag=='02'){
            //     length = 2;
            // }else if(this.copyFlag=='03'){
            //     length = 3;
            // }else{
            //     length = this.groupCount;
            // }
            // this.uploadImgList = [];
            // for(let i=0;i<length;i++){
            //     this.uploadImgList[i]={}
            // }
            // this.uploadImgList.forEach(list => {
            //     list.picUrl='http://pic.flameapp.cn/cheetahresource/template/assets/blue.jpg';
            //     list.upbtnGroup=false;
            //     list.title='大标题文案';
            //     list.subTitle='小标题文案';
            //     list.instructions='说明文字';
            // });
        },
        handleDialogClose() {
            this.isShowCropper = false
            this.dialogFormVisible = true
        },
        backImg(imgArr) {
            if(this.uploadImgIndex == 'button'){
                this.buttonPicUrl = imgArr[0].showSelectImg;
                this.isShowCropper = false

            }else{
                this.uploadImgList[this.uploadImgIndex].picUrl = imgArr[0].showSelectImg;
                this.uploadImgList[this.uploadImgIndex].upbtnGroup = true
                this.isShowCropper = false
            }
        },
        getCropperImgMsg(){
            let materialUrlList = this.$refs.chooseMaterial.getParentImage()
            console.info(this.uploadImgList)
            if(this.uploadImgIndex == 'button'){
                this.isShowCropper = false
                this.buttonPicUrl = materialUrlList;
            }else{
                this.isShowCropper = false
                this.uploadImgList[this.uploadImgIndex].picUrl=materialUrlList;
                this.uploadImgList[this.uploadImgIndex].upbtnGroup = true
            }
            this.update()
        },
        uploadImg(i) {
            this.uploadImgIndex = i
            this.size=[this.picShowWidth,this.picShowHeight,2]
            this.isShowCropper=true;
        },
        changeImgIndexTop(index){
            if(index!=-1){
                this.uploadImgList.splice(index,1,...this.uploadImgList.splice(index-1,1,this.uploadImgList[index]))
            }
        },
        toTop(index){
            let data = this.uploadImgList[index];
            console.info(data)
            for(var i = index;i>0;i--){
                this.uploadImgList[i]=this.uploadImgList[i-1]
            }
            this.uploadImgList[0]=data;
            console.info(this.uploadImgList)
        },
        changeImgIndexBottom(index){
            if(index!=-1){
                this.uploadImgList.splice(index,1,...this.uploadImgList.splice(index+1,1,this.uploadImgList[index]))
            }
        },
        toBottom(index){
            let data = this.uploadImgList[index];
            for(var i = index;i<this.uploadImgList.length-1;i++){
                this.uploadImgList[i]=this.uploadImgList[i+1]
            }
            this.uploadImgList[this.uploadImgList.length-1]=data;
        }
    }
}
</script>

<style lang="scss" scoped>
    // .el-input {
    //     height: 40px;
    //     width: 288px;
    // }
    // .el-input__inner {
    //     height: 40px;
    //     padding-left: 15px;
    // }
    .imageText__style{
        .topBottomMargin .el-input {
            height: 40px;
            width: 94px;
        }
        .topBottomMargin .el-input-number{
            width: 94px;
            margin-right: 20px;
        }
        .topBottomMargin .el-input__inner {
            border-left: none;
            border-radius: 0px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        .topBottomMargin .el-form-item__label {
            padding: 0 20px 0 0;
        }
        .topBottomMargin .el-input-number.is-controls-right .el-input__inner {
            padding-left: 23px;
        }
        .topBottomMargin .top__text {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #A2A4A6;
            text-align: center;
            background: #FAFAFC;
            border: 1px solid #DDE0E4;
            /* border-right: none; */
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
        }
        .topBottomMargin .flex__box {
            display: flex;
        }
        .topBottomMargin .el-form-item__content {
            display: flex;
        }
        .topBottomMargin .el-form-item__label {
            // color:#D0021B;
        }
        .nomal__margin .el-form-item__label{
            padding: 0 20px 0 0;
            // color: #D0021B;
        }
        .el-form {
            padding: 20px 20px 4px 20px;
            box-shadow: inset 0 -1px 0 0 #F5F5FA;
        }
        .el-form-item {
            margin-bottom: 16px;
        }
        .el-form-item__label {
            padding: 0 33px 0 0;
        }
        .el-radio+.el-radio {
            // margin-left: 50px;
        }
        .el-form-item__label, .el-radio__label, .el-input__inner {
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            font-weight: 400;
            color: #323C41;
            letter-spacing: 0;
        }
        .el-form-item__label {
            // color: #D0021B;
        }
        .add__margin .el-form-item__label {
                padding: 0 45px 0 0;
        }
        .gear__set__edit .el-form-item {
            display: flex;
            align-items: center;
            /* justify-content: space-between; */
        }

        .gear__set__edit .el-form-item__label, .oncrete__attributes .el-form-item__label{
            color: #323C41;
        }
        
        .nomal__font__color .el-form-item__label {
            margin-right: 13px;
        }
        .oncrete__attributes .nomal__margin .el-form-item__label{
            padding: 0 20px 0 0;
        }
        .add__color__font .el-form-item__label {
            // color: #D0021B;
        }
        .oncrete__attributes .other__margin .el-form-item__label{
            padding: 0 32px 0 0;
        }
        .el-radio__input.is-checked .el-radio__inner {
            border-color: #3671FF;
            background: #3671FF;
        }
        .el-radio__input.is-checked+.el-radio__label {
            color: #323C41;
        }
        .el-input-number {
            width: 288px;
            height: 40px;
        }
        .el-input {
            height: 40px;
            width: 288px;
        }
        .el-input__inner {
            height: 40px;
            padding-left: 15px;
        }
        .el-input-number .el-input__inner {
            text-align: left;
        }
        .el-input-number__decrease, .el-input-number__increase {
            background: #ffffff;
        }

        .gear__set__edit .el-radio {
            display: flex;
            align-items: center;
        }
        .gear__set__edit .gear__set__style1, .gear__set__edit .gear__set__style2, .gear__set__edit .gear__set__style3{
            display: flex;
        }

        .gear__set__edit .el-radio-group {
            display: flex;
        }

        .gear__set__edit .gear__set__style1 p{
            width: 4px;
            height: 4px;
            opacity: 0.22;
            border-radius: 50%;
            margin-left: 2px;
            background: #000000;
        }
        .gear__set__edit .gear__set__style1 p:nth-child(1), .gear__set__edit .gear__set__style2 p:nth-child(1), .gear__set__edit .gear__set__style3 p:nth-child(1) {
            opacity: 1;
        }
        .gear__set__edit .gear__set__style2 p{
            width: 4px;
            height: 2px;
            opacity: 0.22;
            /* border-radius: 50%; */
            margin-left: 2px;
            background: #000000;
        }
        .gear__set__edit .gear__set__style3 p{
            width: 8px;
            height: 2px;
            opacity: 0.22;
            background: #000000;
        }
        .oncrete__attributes .el-form {
            box-shadow: none;
        }

        .carousel__content__body {
            display: flex;
            justify-content: space-between;
        }
        .carousel__content__body .carousel__content__body__text{
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            letter-spacing: 0;
        }
        .carousel__Specifications {
            width: 288px;
            background: #FAFAFC;
            margin-left: 72px;
            align-items: center;
            position: relative;
            text-align: center;
            
            .showImg {
                margin: 0;
                max-width: 288px;
            }
            .file {
                display: inline-block;
                width: 288px;
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
            text-align: center;
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #A2A4A6;
        }
        .arousel__peration{
            position: absolute;
            height: 40px;
            width: 288px;
            bottom: 0;
            left: 0;
            padding-left: 10px;
            opacity: 0;
            background: rgba($color: #000000, $alpha: 0);
            display: flex;
            align-items: center;
            justify-content: space-between;
            div{
                height: 40px;
                display: flex;
                align-items: center;
            }
        }
        .carousel__Specifications:hover{
            .arousel__peration{
                opacity: 1;
                background: rgba($color: #000000, $alpha: .5);
            }
        }
        .arousel__peration img{
            cursor: pointer;
            display: inline-block;
            margin-right: 10px;
            
        }
        .addColorStyle>:last-child .el-radio__label{
            // color: #D0021B;
        }

        // .cut__off__ule span{
        //     font-family: MicrosoftYaHeiUI;
        //     font-size: 13px;
        //     color: #D0021B;;
        //     letter-spacing: 0;
        // }
        // .cut__off__ule .el-input {
        //     height: 40px;
        //     width: 200px;
        //     margin-left: 33px;
        // }
        // .cut__off__ule .el-input__inner {
        //     height: 40px;
        //     padding-left: 15px;
        // }
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
        .cut__off__ule{
            .splitBtn {
                background: #CACCD2;
                border-radius: 1px;
                width: 32px;
                height: 2px;
                margin-left: 52px;
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
        }
        .el-dialog {
        width: 800px;
        }

        .cropper-box div.el-dialog div.el-dialog__body {
            padding: 0;
        }
        .cropper-box .el-dialog__body {
            padding: 0;
        }
        .el-dialog__footer {
            padding: 16px 0;

            .el-button:focus, .el-button:hover{
                    color: #ffffff;
                    border-color: #3671FF;
                    background-color: #3671FF;
                }

            .dialog-footer {
                width: 112px;
                height: 40px;
                margin: 0 auto;

                .btn {
                    width: 112px;
                    height: 40px;
                }
            }
        }
        .floor_save{
            margin-top: 100px;
            bottom: 65px;
            height: 75px;
            border-top: 1px solid #f1f1f1;
            right: 10px;
            padding-top: 15px;
            text-align: center;
            button{
                // background: #fff;
                height: 42px;
                width: 112px;
                border-radius: 2px;
                color: #fff;
                background: #3671FF;
                border:none;
                cursor: pointer;
                // &:hover{
                //     color: #fff;
                //     background: #3671FF;
                //     border:none;
                //     cursor:pointer;
                // }
            }
            
        }
        .mtbox-leave-active,.mtbox-enter-active{
            transition:  all 0.5s ease; 
        }
        .mtbox-leave-active,.mtbox-enter{
            right:-400px !important;
        }
        .mtbox-leave,.mtbox-enter-active{
            right: 400;
        }

        /* 侧滑面板样式 */
        .popup {
            width: 410px;
            position: absolute;
            right: 0;
            top: 0;
            height: 598px;
            background:#ffffff;
            z-index: 1000;
            overflow-y: auto;

            .popup-head {
                height: 48px;
                padding: 0 20px;
                line-height: 48px;
                display: flex;
                align-items: center;
                box-shadow: inset 0 -1px 0 0 #DDE0E4;

                .jiantou {
                    width:0;
                    height:0;
                    border: 6px solid transparent;
                    border-right-color: #3671FF;
                    position:absolute;
                    left: 16;
                    content:'';
                    cursor: pointer;
                }
                
                .back-icon {
                    width: 12px;
                    height: 4px;
                    // transform: rotate(-90deg);
                    background: #3671FF;
                    margin-left: 8px;
                    cursor: pointer;
                }
                .back-text, .mtSetting {
                    font-family: MicrosoftYaHeiUI;
                    font-weight: bold;
                    font-size: 13px;
                    letter-spacing: 0;
                }
                .mtSetting {
                    color: #14001D;
                }
                .fenge {
                    font-family: MicrosoftYaHeiUI;
                    font-weight: bold;
                    font-size: 13px;
                    color: #000000;
                    letter-spacing: 0;
                    margin: 0 4px 0 4px;
                }
                .back-text {
                    color: #3671FF;
                    margin-left: 4px;
                    cursor: pointer;
                }
            }
        }
        .el-input--suffix{
            width: 240px;
        }
        .choose-img{
            position: relative;
            .carousel__content__body__text{
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
                width: 72px;
                display:inline-block;
            }
            .choose-size{
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #CACCD2;
                line-height: 16px;
            }
            img{
                cursor: pointer;
                width: 20px;
                height: 20px;
                position: absolute;
                margin: auto;
                top:0;
                right: 0;
                bottom: 0;
            }
        }

        .palace_boxshadow{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 40px;

            .splitBtn {
                background: #CACCD2;
                border-radius: 1px;
                width: 32px;
                height: 2px;
                margin-left: 52px;
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
    }
</style>


