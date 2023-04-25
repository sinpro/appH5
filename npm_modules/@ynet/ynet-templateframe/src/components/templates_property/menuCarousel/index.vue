<template>
    <div class="carousel__style">
        <div class="carousel">
            <el-form class="add__boxShow">
                <el-form-item label="上下边距" class="topBottomMargin" v-if="VertialControl">
                    <div class="flex__box">
                        <div class="top__text">上</div>
                        <el-input-number v-model="topDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                    </div>
                    <div class="flex__box">
                        <div class="top__text">下</div>
                        <el-input-number v-model="bottomDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="gear__set__edit">
            <el-form>
                <el-form-item label="轮播器">
                    <el-radio-group v-model="cycleType" @change="changeCycleType">
                        <el-radio :label="0">
                            <div class="gear__set__style1">
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </el-radio>
                        <el-radio :label="1">
                            <div class="gear__set__style2">
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </el-radio>
                        <el-radio :label="2">
                            <div class="gear__set__style3">
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="nomal__font__color el-form-item__content_color">
                    <div class="item_flex__box">
                        <el-color-picker v-model="color" @change="upDateOptions()"></el-color-picker>
                        <el-input v-model="color" @change="upDateOptions()"></el-input>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="oncrete__attributes">
            <el-form>
                <el-form-item class="add__color change__radio" label="宽高比">
                    <el-radio-group v-model="aspectRatio" @change="changeAspectRatio">
                        <el-radio v-if="styleType == '02' || styleType == '03' || styleType == '04'" label="2:1">
                        </el-radio>
                        <el-radio v-if="styleType == '05' || styleType == '04'" label="3:1">
                        </el-radio>
                        <el-radio v-if="styleType == '02' || styleType == '03'" label="2.5:1">
                        </el-radio>
                        <el-radio v-if="styleType == '04'" label="3.5:1">
                        </el-radio>
                        <el-radio v-if="styleType == '05'" label="4:1">
                        </el-radio>
                        <el-radio v-if="styleType == '02' || styleType == '03'" label="3:1">
                        </el-radio>
                        <el-radio label="自定义" class="el__radio__blank" v-show="VertialControl">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="picHeight" @change="upDateOptions"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="menu__carousel__content">
                <div class="content__head">
                    <div>
                        <span class="content__txt">轮播内容</span>
                        <span class="content__placeholder">{{setPicWidth + `×` + setPicHeight + `@2x`}}</span>
                    </div>
                        <img src="../../../assets/addPalace.png" alt="" @click="addCarouselImg('0')">
                </div>
                <div class="main__content__body" v-for="(item, index) in uploadImgList" :key="index" v-if="!uploadImgList.length == 0">
                    <div class="uploadImg__body" @mouseleave="item.isShowActionBtn = false" @mouseenter="item.isShowActionBtn = true">
                        <img :src="concatImageUrl(item.picUrl)" alt="" :style="{width:'288px',verticalAlign:'bottom'}" @click="changeCarouselImg(index, '1')">
                        <transition name="hide__show">
                            <div class="action__btn" v-if="item.isShowActionBtn">
                                <div class="btn__flex">
                                    <img :src="iconUpStopImg" alt="" @click="riseIndex(index!=0?index:-1)">
                                    <img :src="iconDownActiveImg" alt="" @click="fallIndex(index!=uploadImgList.length-1?index:-1)">
                                    <!-- <img :src="stickImg" alt="">
                                    <img :src="bottomImg" alt=""> -->
                                </div>
                                <div class="btn__flex">
                                    <img src="../../../assets/edit1.png" @click="showPopupBlank(item, index)" alt="">
                                    <img src="../../../assets/del1.png" @click="delUploadImg(index), upDateOptions()" alt="">
                                </div>
                            </div>
                        </transition>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="floor_save" @click="sureForRpc">
            <button>楼层保存</button>
        </div>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="mtbox">
            <link-panel @getXpixUrl="getXpixUrl" v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/>
        </transition>

        <el-dialog title="选择素材" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
            <choose-material ref="chooseMaterial" :imgOption="imgOption" @backImgTemplate="backImg"></choose-material>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getMaterialUrlList">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addFloorStyleAllocation, addCarouselStyle, eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
import { API } from '~/config/api'
import cropper from '../../common/cropper'
import { getCookie } from '../../../../../utils/cookie'
import chooseMaterial from '^/chooseMaterial'
import linkPanel from '../components/popup/linkPanel'
import mixins from '../../mixins.js'
export default {
    mixins,
    components: {
        cropper, chooseMaterial, linkPanel
    },
    data() {
        return {
            isShowMaterial: false,  // 选择素材页面
            imgOption: [],
            materialUrlList: [],
            uploadImgMaterial: '',
            bSeniorOptions: false,
            linkOptions: {},
            // 监听样式变化
            styleType: '',
            isShowCropper: false, // 显示裁剪框
            cropwidth: null,
            cropheight: null,
            imgType: '',
            imgName: '',
            cropperImgUrl: '',
            isDisabled: false,
            topDistance: '',
            bottomDistance: '',
            cycleType: 0,
            num8: '',
            color: '',
            // groupNum: 2,  // 默认轮播数
            picHeight: '',
            aspectRatio: '',
            gearSetChoose: 1,
            choseWidthHeight02: '3:1',
            choseWidthHeight01: '2:1',
            iconlinkImg: require('../../../assets/edit1.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del1.png'),
            stickImg: require('../../../assets/stick_write.png'),
            bottomImg: require('../../../assets/bottom_write.png'),
            // uploadImgList: [],
            uploadImgList:[],
            // 计算高度
            heightF: '',
            setPicHeight: '',
            setPicWidth: '',
            isShowMt: false,
            menuType: '01',
            // 图片属性面板
            linkType: 1,
            linkAdress: '',
            isLogin: 0,
            isNeedId: 0,
            labelWidth: '70px',
            shufflingList: [],
            // 判断轮播图是第几个
            carouselIndex: 0,
            addType: '', // 区分是点击加号添加还是点击图片重新上传
            uploadImgIndex: 0,
            // 传递options数据给样式面板
            menuOptions: {},
            setting_item: {}
            // labelWidth: '72px'
        }
    },
    props: {
        flag: {
            type: String,
            default: ''
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
        },
        VertialControl: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        flag(nval) {
            this.aspectRatio = ''
            this.styleType = nval
            switch(nval) {
                case '04':
                this.aspectRatio = '2:1'
                break;
                case '02':
                this.aspectRatio = '2:1'
                break;
                case '03':
                this.aspectRatio = '2:1'
                break;
                case '05':
                this.aspectRatio = '3:1'
                break;
            }
            // console.log(this.styleType + '=-=-=---')
        },
        currentTemplateItem(nval) {
            this.styleType = nval.subkind
            // console.log(this.styleType + '1-1-1-1-1')
        }
    },
    // created() {
        
    // },
    mounted() {
        this.uploadImgList = []
        this.heightF = 188 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
        let menuStyleOptions = this.currentTemplateItem.options
        this.styleType = this.currentTemplateItem.subkind ? this.currentTemplateItem.subkind : this.flag
        this.topDistance = menuStyleOptions.topMargin
        this.bottomDistance = menuStyleOptions.bottomMargin
        this.aspectRatio = menuStyleOptions.isCustomized == '1' ? '自定义':menuStyleOptions.aspectRatio
        this.changeWidthHeight(this.aspectRatio)
        this.picHeight = menuStyleOptions.picHeight
        this.cycleType = parseInt(menuStyleOptions.cycleType)
        this.color = menuStyleOptions.color
        menuStyleOptions.styleInfoList.forEach((item, i) => {
            this.shufflingList.push({
                styleName: '轮播',
                styleType: this.styleType,
                picLink: this.linkAdress,
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                orderNum: i + 1,
                picLinkType: this.linkType,
                isLoginNeeded: this.isLogin,
                isIdNeeded: this.isNeedId,
                specialPicUrl: '',
                picWidth: this.setPicWidth,
                picHeight: this.setPicHeight,
                picUrl: item.picUrl
            })
        })
        
        // var shufflingList = menuStyleOptions.styleInfoList
        menuStyleOptions.styleInfoList.forEach((item, i) => {
            this.uploadImgList.push({
                picUrl: item.picUrl,
                upbtnGroup: true,
                isShowActionBtn: false,
                isIdNeeded: item.isIdNeeded,
                isLoginNeeded: item.isLoginNeeded,
                picLinkType: item.picLinkType,
                picLink: item.picLink
            })
        })
    },
    methods: {
        // 样式切换轮播组数改变
        // 更新楼层
        upDateOptions() {
            this.shufflingList = []
            this.setPicHeight = this.picHeight
            this.uploadImgList.forEach((item,i) => {
                this.shufflingList.push({
                    styleName: '轮播',
                    styleType: this.styleType,
                    picLink: this.linkAdress,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    orderNum: i +1,
                    picLinkType: this.linkType,
                    isLoginNeeded: this.isLogin,
                    isIdNeeded: this.isNeedId,
                    specialPicUrl: '',
                    picWidth: this.setPicWidth,
                    picHeight: this.setPicHeight,
                    picUrl: item.picUrl
                })
            })
            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '01',
                floorName: '轮播',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                topMargin: this.topDistance,
                bottomMargin: this.bottomDistance,
                color: this.color,
                isCustomized: this.aspectRatio == '自定义' ? '1' : '0',
                aspectRatio: this.aspectRatio,
                picHeight: this.picHeight ? this.picHeight : '0',
                groupNum: this.groupNum,
                cycleType: this.cycleType,
                status: '0',
                widthF: '375',
                heightF: this.heightF,
                operatorId: this.options.operatorId,
                operator: this.options.operator,
                styleInfoList: this.shufflingList
            }
            console.dir(this.menuOptions)
            this.$emit('setMenuStyleOptions', this.menuOptions)
        },
        delUploadImg(i){
            this.uploadImgList.splice(i, 1)
        },
        showPopupBlank(item,i) {
            console.log(item)
            this.linkOptions = item
            this.setting_item = item
            this.bSeniorOptions = true
            this.carouselIndex = i
            // let imgGroup = this.currentTemplateItem.options.styleInfoList
            // this.linkOptions = {
            //     isIdNeeded: imgGroup[this.carouselIndex].isIdNeeded,
            //     isLoginNeeded: imgGroup[this.carouselIndex].isLoginNeeded,
            //     picLink: imgGroup[this.carouselIndex].picLink,
            //     picLinkType: imgGroup[this.carouselIndex].picLinkType,
            //     xPicUrl:imgGroup[this.carouselIndex].xPicUrl,
            //     floorType: '01',
            //     picHeight: this.setPicHeight
            // }
        },
        linkBack (obj) {
            Object.assign(this.setting_item, obj)
            this.bSeniorOptions = false
            this.shufflingList.splice(this.carouselIndex, 1, {
                styleName: '轮播',
                styleType: this.styleType,
                picLink: obj.picLink,
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                ordernNum: this.carouselIndex + 1,
                picLinkType: obj.picLinkType,
                isLoginNeeded: obj.isLoginNeeded,
                isIdNeeded: obj.isIdNeeded,
                specialPicUrl: obj.xPicUrl,
                picWidth: this.setPicWidth,
                picHeight: this.setPicHeight,
                picUrl: this.uploadImgList[this.carouselIndex].picUrl
                // picHeight: parseInt(this.heightF)*2 + ''
            })
        },
        addCarouselImg(type) {
            this.addType = type
            this.changeWidthHeight(this.aspectRatio)
            this.imgOption = [this.setPicWidth, this.setPicHeight, 2]
            this.isShowMaterial = true
        },
        // 非点击加号上传图片
        changeCarouselImg(i, type) {
            this.isShowMaterial = true
            this.carouselIndex = i
            this.addType = type
            this.imgOption = [this.setPicWidth, this.setPicHeight, 2]
        },
        getXpixUrl() {
            this.isShowMaterial = true
            this.imgOption = [375, this.setPicHeight+24, 2]
        },
        backImg(imgArr) {
            if(this.bSeniorOptions) {
                this.linkOptions.xPicUrl = imgArr[0].showSelectImg
            } else {
                this.materialUrlList = imgArr[0].showSelectImg
                this.uploadImgList.push({
                    picUrl: this.materialUrlList,
                    upbtnGroup: true,
                    isShowActionBtn: false
                })
            }
            this.upDateOptions()
            this.isShowMaterial = false
        },
        getMaterialUrlList() {
            if(this.bSeniorOptions) {
                this.linkOptions.xPicUrl = this.$refs.chooseMaterial.getParentImage()
            } else {
                this.materialUrlList = this.$refs.chooseMaterial.getParentImage()
                if(this.addType == '0') {
                    this.uploadImgList.push({
                        picUrl: this.materialUrlList,
                        upbtnGroup: true,
                        isShowActionBtn: false
                    })
                } else {
                    this.uploadImgList[this.carouselIndex].picUrl = this.materialUrlList
                }
                
            }
            this.upDateOptions()
            this.isShowMaterial = false
        },
        // 模态框关闭回调
        handleDialogClose() {
            this.isShowCropper = false
            this.dialogFormVisible = true
        },
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
            // this.eidtMenuStyleRpc()
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
        editFloorStyleAllocation() {
            let data ={
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                styleType: this.styleType,
                floorType: '01',
                floorName: '轮播',
                floorIsAd: '0',
                // orderNum: '1',
                topMargin: this.topDistance,
                bottomMargin: this.bottomDistance,
                color: this.color,
                isCustomized: this.aspectRatio == '自定义' ? '1' : '0',
                aspectRatio: this.aspectRatio,
                picHeight: this.picHeight ? this.picHeight : '0',
                groupNum: this.groupNum,
                cycleType: this.cycleType,
                status: '0',
                widthF: '375',
                heightF: this.heightF,
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(data).then(res => {
                if(res.data.body.errorCode === '0') {
                    this.eidtMenuStyleRpc()
                } else {
                    this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                }
            })
        },
        eidtMenuStyleRpc() {
            let carouselDataList = []
            this.shufflingList.forEach((item,i) => {
                carouselDataList.push({
                    styleName: '轮播',
                    styleType: this.styleType,
                    picLink: item.picLink,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    orderNum: i +1,
                    picLinkType: item.picLinkType,
                    isLoginNeeded: item.isLoginNeeded,
                    isIdNeeded: item.isIdNeeded,
                    specialPicUrl: item.specialPicUrl,
                    picWidth: this.setPicWidth,
                    picHeight: this.setPicHeight,
                    picUrl: this.uploadImgList[i].picUrl
                })
            })

            let carouselData = {
                floorType: '01',
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                shufflingList: carouselDataList
            }
            eidtMenuStyleRpc(carouselData).then(res => {
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        handleChange(value) {
            this.upDateOptions()
        },
        // 轮播图片排序
        riseIndex(index){
            if(index!=-1){
                this.uploadImgList.splice(index,1,...this.uploadImgList.splice(index-1,1,this.uploadImgList[index]))
            }
            this.upDateOptions()
        },
        fallIndex(index){
            if(index!=-1){
                this.uploadImgList.splice(index,1,...this.uploadImgList.splice(index+1,1,this.uploadImgList[index]))
            }
            this.upDateOptions()
        },
        // changeColor() {
        //     let test = /^#[0-9a-fA-F]{6}$/
        //     this.upDateOptions()
        // },
        // 轮播器改变跟新数
        changeCycleType(val) {
            this.upDateOptions()
        },
        changeWidthHeight(val) {
            if(this.styleType == '02' || this.styleType == '03') {
                switch(val) {
                    case '2:1' :
                        this.heightF = 164 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '164'
                        this.setPicWidth = '327'
                    break;
                    case '2.5:1' :
                        this.heightF = 130 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '130'
                        this.setPicWidth = '327'
                    break;
                    case '3:1' :
                        this.heightF = 110 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '110'
                        this.setPicWidth = '327'
                    break;
                }
            } else if(this.styleType == '04') {
                switch(val) {
                    case '2:1' :
                        this.heightF = 188 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '188'
                        this.setPicWidth = '375'
                    break;
                    case '3:1' :
                        this.heightF = 124 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '124'
                        this.setPicWidth = '375'
                    break;
                    case '3.5:1' :
                        this.heightF = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '108'
                        this.setPicWidth = '375'
                    break;
                }
            } else {
                switch(val) {
                    case '3:1' :
                        this.heightF = 114 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '114'
                        this.setPicWidth = '343'
                    break;
                    case '4:1' :
                        this.heightF = 86 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '86'
                        this.setPicWidth = '343'
                    break;
                }
            }
            // this.upDateOptions()
            
        },
        changeAspectRatio(val) {
            if(this.styleType == '02' || this.styleType == '03') {
                switch(val) {
                    case '2:1' :
                        this.heightF = 164 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '164'
                        this.setPicWidth = '327'
                    break;
                    case '2.5:1' :
                        this.heightF = 130 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '130'
                        this.setPicWidth = '327'
                    break;
                    case '3:1' :
                        this.heightF = 110 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '110'
                        this.setPicWidth = '327'
                    break;
                    case '自定义' :
                        this.heightF = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = this.picHeight
                        this.setPicWidth = '327'
                    break;
                }
            } else if(this.styleType == '04') {
                switch(val) {
                    case '2:1' :
                        this.heightF = 188 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '188'
                        this.setPicWidth = '375'
                    break;
                    case '3:1' :
                        this.heightF = 124 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '124'
                        this.setPicWidth = '375'
                    break;
                    case '3.5:1' :
                        this.heightF = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '108'
                        this.setPicWidth = '375'
                    break;
                    case '自定义' :
                        this.heightF = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = this.picHeight
                        this.setPicWidth = '375'
                    break;
                }
            } else {
                switch(val) {
                    case '3:1' :
                        this.heightF = 114 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '114'
                        this.setPicWidth = '343'
                    break;
                    case '4:1' :
                        this.heightF = 86 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = '86'
                        this.setPicWidth = '343'
                    break;
                    case '自定义' :
                        this.heightF = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance) + ''
                        this.setPicHeight = this.picHeight
                        this.setPicWidth = '343'
                    break;
                }
            }
                        console.log(this.setPicHeight)

            this.upDateOptions()
            
        },
    }
}
</script>

<style lang="scss" scoped>

.carousel__style {

& .file {
    display: inline-block;
    width: 240px;
    height: 240px;
    // background: green;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
}
    & {
        background: #ffffff;
        padding: 0 20px;
    }
    & .showImg {
        margin: 0;
        width: 240px;
        height: 240px;
    }

    & img.showImg {
        margin: 0;
    }
    & .add__boxShow {
        padding: 20px 0 4px 0;
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
    & .add__color {
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
        padding-bottom: 16px;
    }
    // & .add__color .el-radio-group>:last-child .el-radio__label{
    //     color: #D0021B;
    // }
    // & .el-form-item__label {
    //     color: #D0021B;
    // }
    & .add__color .el__radio__blank {
        display: flex;
        // margin-left: 0;
        // margin-top: 20px;
    }
    & .add__color .own__blank {
        display: flex;
        align-items: center;
    }
    & .add__color .el__radio__blank .el-radio__input {
        padding: 13px 0;
    }
    & .add__color .ownHeight {
        width: 76px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #DDE0E4;
        border-radius: 2px;
        border-right-style: none;
        border-top-right-radius: 0%;
        border-bottom-right-radius: 0%;
        line-height: 40px;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #A2A4A6;
        text-align: center;
    }
    & .add__color .el-input {
        width: 147px;
        height: 40px;
        // padding: 0 50px;
        font-size: 12px;
        color: #323C41;
        // border: 1px solid #DDE0E4;

        .el-input__inner {
            border-radius: 0px;
            padding-left: 60px;
            background: #fafafc;
        }
    }
    & .add__color .clock__btn {
        width: 40px;
        height: 40px;
        padding: 10px;
        border: 1px solid #DDE0E4;
        border-radius: 2px;
        border-left-style: none;
        border-top-left-radius: 0%;
            border-bottom-left-radius: 0%;
    }

    .gear__set__edit .el-form-item {
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }
    & .gear__set__edit {
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
    }

    & .gear__set__edit .el-form-item__label, & .oncrete__attributes .el-form-item__label{
        color: #323C41;
    }
    & .nomal__font__color {
        display: flex;
    }
    
    & .nomal__font__color .el-form-item__label {
        margin-right: 13px;
    }
    & .el-form-item__content_color {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 16px;
    }
    & .el-form-item__content_color .el-form-item__content{
        display: flex;
    }

    & .el-form-item__content_color .el-form-item__content .el-input{
        width: 238px;
        height: 40px;
    }

    & .el-form-item__content_color .el-form-item__content .el-input{
        margin-left: 10px;
    }

    & .el-form-item__content_color .el-form-item__content .el-color-picker .el-color-picker__trigger{
        border-radius: 0 4px 4px 0;
    }
    // & .oncrete__attributes .nomal__margin .el-form-item__label{
    //     padding: 0 20px 0 0;
    //     color: #D0021B;
    // }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #3671FF;
        background: #3671FF;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #323C41;
    }
    & .el-input-number {
        width: 288px;
        height: 40px;
    }
    & .el-input {
        height: 40px;
        width: 288px;
    }
    & .topBottomMargin .el-input {
        height: 40px;
        width: 94px;
    }
    & .topBottomMargin .el-input-number{
        width: 94px;
        margin-right: 20px;
    }
    & .topBottomMargin .el-input__inner {
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
    & .el-input__inner {
        height: 40px;
        padding-left: 10px;
    }
    & .el-input-number .el-input__inner {
        text-align: left;
    }
    & .el-input-number__decrease, .el-input-number__increase {
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
    .oncrete__attributes .menu__carousel__content {
        .content__head {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .content__txt {
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
            }
            .content__placeholder {
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #CACCD2;
                margin-left: 20px;
            }
        }

        .main__content__body {
            width: 288px;

            .uploadImg__body {
                position: relative;
                width: 288px;
                margin-top: 22px;
                margin-left: 72px;

                .hide__show-leave-active,.hide__show-enter-active{
                    transition:  all 0.3s ease; 
                }
                .hide__show-leave-active,.hide__show-enter{
                    opacity: 0 !important;
                }
                .hide__show-leave,.hide__show-enter-active{
                    opacity: 0.5;
                }
            }
            .action__btn {
                width: 288px;
                height: 40px;
                opacity: 0.5;
                background: #000000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                position: absolute;
                bottom: 0;

                .btn__flex {
                    display: flex;
                    align-items: center;
                    

                    img{
                        margin-left: 5px;
                        cursor: pointer;
                    }
                }
            }
        }

    }

    .carousel__content__body {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .carousel__content__body .carousel__content__body__text{
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }
    .carousel__Specifications {
        width: 240px;
        height: 240px;
        background: #FAFAFC;
        margin-left: 38px;
        align-items: center;
        position: relative;
    }
    .delMargin {
        margin-left: 0;
    }
    .carousel__Specifications span {
        display: block;
        margin-left: 90px;
        // margin-top: 8px;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #A2A4A6;
    }
    .carousel__Specifications img {
        margin-left: 110px;
        margin-top: 98px;
    }
    .arousel__peration img{
        display: block;
        margin-bottom: 10px;
    }

    & .change__radio .el-radio-group {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 288px;
        padding-top: 14px;
    }
    & .change__radio .el-radio-group>:last-child {
        margin-left: 0;
        margin-top: 20px;
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
    .topBottomMargin .flex__box, .item_flex__box {
        display: flex;
    }
    .topBottomMargin .el-form-item__content {
        display: flex;
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

    .setting-content, .palace__setting {
        padding: 20px 20px 20px 24px;

        .el-input {
            height: 40px;
            width: 288px;
        }

        .el-picker-panel__body {
            .el-input {
                width: 147px;
                height: 32px;   
            }
            .el-input__inner {
                width: 147px;
                height: 32px;
            }
        }

        .el-form-item__label {
            padding: 0 20px 0 0;
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
            letter-spacing: 0;
        }

        .el-input__inner {
            width: 288px;
            height: 40px;
        }
        .el-input__prefix {
            left: 258px;
        }

        .el-input--prefix .el-input__inner {
            padding-left: 5px;
        }
    }
    .palace__setting {

        .palace__icon {
            margin-left: 68px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
        }

        .palace__icon__body {
            width: 120px;
            margin-right: 20px;

            .icon__block {
                width: 120px;
                height: 120px;
                background: #FAFAFC;
                position: relative; 

                img {
                    position: absolute;
                    top:50%; 
                    left:50%;
                    transform: translate(-50%,-50%);
                }
            }

            .del__text {
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #A2A4A6;
                text-align: center;
                margin: 6px 0;
            }
        }

        .el-radio__input.is-checked+.el-radio__label {
            color: #323C41;
        }

        ::placeholder {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
        }

        .padding_left_del {

            .el-form-item__label {
                padding: 0 6px 0 0;
            }
            
        }
        .add_right_padding {
            .el-form-item__label {
                padding: 0 40px 0 0;
            }

            .el-radio__label {
                // font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #323C41;
                letter-spacing: 0;
                font-weight: 400;
            }
        }

        .line__style__radio {
            height: 60px;
            position: relative;
            .el-radio {
                display: block;
                margin-top: 12px;
            }
            .el-radio+.el-radio {
                margin: 0;
                margin-top: 12px;
            }
            .el-input {
                width: 220px;
                position: absolute;
                right: 0;
                bottom: -10px;

                .el-input__inner {
                    width: 220px;
                }
            }
        }
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
    .cropper-box .el-input--suffix {
        width: 240px;
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
            &:hover{
                color: #fff;
                background: #3671FF;
                border:none;
                cursor:pointer;
            }
        }
        
    }
}
</style>


