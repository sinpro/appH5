<template>
    <div class="headLine__style">
        <div class="oncrete__attributes" v-if="styleType == '03'">
            <el-form>
                <el-form-item label="宽高比" class="add__margin">
                    <el-radio-group v-model="aspectRatio" class="addColorStyle" @change="updateOptions">
                        <el-radio label="5:1">
                        </el-radio>
                        <el-radio label="自定义">
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="add__color" label="图片高度" v-if="aspectRatio == '自定义'">
                    <el-input-number @change="updateOptions" v-model="picHeight" controls-position="right" :min="50" :max="100"></el-input-number>
                </el-form-item>
            </el-form>
        </div>

        <div v-if="styleType == '01'" class="smallHeadLine">
            <div class="cut__off__ule">
                <span>分割线</span>
                <el-input :disabled="!isSplitBtn" v-model="divlineColor" placeholder="无" @change="updateOptions"></el-input>
                <el-color-picker v-model="divlineColor" :disabled="!isSplitBtn" @change="updateOptions"></el-color-picker>
                <div @click="isSplitBtnDivLine" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                </div>
            </div>
            <div class="el-form">
                <div class="nomal__margin">
                    <div>标题内容</div>
                    <el-input v-model="title" @change="updateOptions"></el-input>
                </div>

                <div class="left__content">
                    <span>左侧内容</span>
                    <div class="tab__check">
                        <div @click="showIcon(index)" v-if = "isSplitBtnLeft" :class="{'check__active': isShow == index && isSplitBtnLeft}" v-for="(item, index) in iconList" :key="index">{{item}}</div>
                    </div>
                    <div @click="isSplitBtnLeftShow" class="splitBtn" :class="[isSplitBtnLeft ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isSplitBtnLeft ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
                <div class="el__input242" v-if="isShow == 0 && isSplitBtnLeft">
                    <div>颜色</div>
                    <div class="colorChoose">
                        <el-input v-model="blockColor" @change="updateOptions"></el-input>
                        <el-color-picker v-model="blockColor" style="margin: 1px;margin-left: 10px;" @change="updateOptions"></el-color-picker>
                    </div>
                    
                </div>
                <div class="carousel__content__body__small" v-if="isShow == 1 && isSplitBtnLeft">
                    <div style="display: flex;position: relative;">
                        <span class="carousel__content__body__text__small">头条图标</span>
                        <div class="carousel__Specifications__small" v-text="placeholdertext" @click="handleClick(16,16)">
                        </div>
                        <img src="../../../assets/add1.png" alt="" class="positionImg"/>
                        <img class="showImg" :src="concatImageUrl(uploadImgList[0].picUrl)" alt="" v-if="uploadImgList[0].upbtnGroup" @click="handleClick(16,16)" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false" style="width:80px;margin-left:6px;">
                    </div>
                    <div class="arousel__peration__small"  @click="delImgList" v-show="showbottomSilde" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false">
                        <img src="../../../assets/del1.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!-- 大标题结构 -->
        <div v-if="styleType == '02'" class="bigHeadLine">
            <div class="cut__off__ule">
                <span>分割线</span>
                <el-input :disabled="!isSplitBtn" v-model="divlineColor" placeholder="无" @change="updateOptions"></el-input>
                <el-color-picker v-model="divlineColor" :disabled="!isSplitBtn" @change="updateOptions"></el-color-picker>
                <div @click="isSplitBtnClick" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                </div>
            </div>
            <div class="el-form">
                <div class="nomal__margin">
                    <div>标题内容</div>
                    <el-input v-model="title" @change="updateOptions"></el-input>
                </div>
                <div class="nomal__margin">
                    <div>说明文字</div>
                    <el-input v-model="instructions" @change="updateOptions"></el-input>
                </div>

                <div class="left__content">
                    <span>左侧内容</span>
                    <div class="tab__check">
                        <div @click="showIcon(index)" :class="{'check__active': isShow == index && isSplitBtnLeft}" v-for="(item, index) in iconList" :key="index">{{item}}</div>
                    </div>
                    <div @click="isSplitBtnLeftShow" class="splitBtn" :class="[isSplitBtnLeft ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isSplitBtnLeft ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
                <div class="el__input242" label="颜色" v-if="isShow == 0 && isSplitBtnLeft">
                    <div>颜色</div>
                    <div class="colorChoose">
                        <el-input v-model="blockColor" @change="updateOptions"></el-input>
                        <el-color-picker v-model="blockColor" style="margin: 1px;margin-left: 10px;" @change="updateOptions"></el-color-picker>
                    </div>
                    
                </div>
                <div class="carousel__content__body__small" v-if="isShow == 1 && isSplitBtnLeft">
                    <div style="display: flex;position: relative;">
                        <span class="carousel__content__body__text__small">头条图标</span>
                        <div class="carousel__Specifications__small" v-text="placeholdertext1" @click="handleClick(24,24)">
                        </div>
                        <img src="../../../assets/add1.png" alt="" class="positionImg"/>
                        <img class="showImg" :src="concatImageUrl(uploadImgList[0].picUrl)" alt="" @click="handleClick(24,24)" v-if="uploadImgList[0].upbtnGroup" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false" style="width:80px;margin-left:6px;">
                    </div>
                    <div class="arousel__peration__small" @click="delImgList" v-show="showbottomSilde" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false">
                        <img src="../../../assets/del1.png" alt="">
                    </div>
                </div>

                <div class="left__content">
                    <span>右侧内容</span>
                    <div class="tab__check">
                        <div @click="showIconRight(index)" :class="{'check__active': isShowRight == index && isSplitBtnRight}" v-for="(item, index) in iconRightList" :key="index">{{item}}</div>
                    </div>
                    <div @click="isSplitBtnRightShow" class="splitBtn" :class="[isSplitBtnRight ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isSplitBtnRight ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>

                <div class="el__input242 right__content" v-if="isShowRight == 1 && isSplitBtnRight">
                    <div>内容</div>
                    <el-input v-model="blockRightContent" @change="updateOptions"></el-input>
                </div>
                <div class="el__input242" v-if="isShowRight == 1 && isSplitBtnRight">
                    <div>颜色</div>
                    <div class="colorChoose">
                        <el-input v-model="blockRightColor" @change="updateOptions"></el-input>
                        <el-color-picker v-model="blockRightColor" style="margin: 1px;margin-left: 10px;" @change="updateOptions"></el-color-picker>
                    </div>
                </div>

                
                <!-- <div class="left__content">
                    <span>链接类型</span>
                    <div class="tab__check">
                        <div @click="showLinkType(index)" :class="{'check__active': isShowLink == index && isSplitBtnLink}" v-for="(item, index) in linkTypetList" :key="index">{{item}}</div>
                    </div>
                    <div @click="isSplitBtnLinkType" class="splitBtn" :class="[isSplitBtnLink ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isSplitBtnLink ? 'splitRadio__active' : '']"></div>
                    </div>
                </div> -->
                <page-link-panel ref="bigHeadOption" :options="bigHeadOptions"></page-link-panel>
                <!-- <el-form-item label="子栏位选择" v-show="isShowLink=='0'" class="delPaddingRight">
                    <el-select v-model="selectValue" clearable placeholder="请选择">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item v-if="isSplitBtnLink">
                    <el-input style="margin-left: 72px;" placeholder="url地址" v-model="linkAdress"></el-input>
                </el-form-item>
                <el-form-item label="触发后登录" class="padding__left__del">
                    <div @click="isNeedLogin = !isNeedLogin" class="splitBtn" :class="[isNeedLogin ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isNeedLogin ? 'splitRadio__active' : '']"></div>
                    </div>
                </el-form-item>
                <el-form-item label="上送用户ID" class="padding__left__del">
                    <div @click="isNeedId = !isNeedId" class="splitBtn" :class="[isNeedId ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isNeedId ? 'splitRadio__active' : '']"></div>
                    </div>
                </el-form-item> -->

                
            </div>
        </div>
        

        <div class="headLine picHeadLine"  v-if="styleType == '03'">
            <div class="carousel__content__body" style="display:block">
                
                <div style="display: flex;align-items:center">
                    <span class="carousel__content__body__text">图片</span>
                    <div class="carousel__Specifications">
                        <span>375x{{picHeight}}@2x</span>
                        <img class="showImg" src="../assets/add.png" alt=""  @click="handleClick(375,76)">
                    </div>
                </div>
                <div style="position: relative;margin-left:72px;margin-top:22px;" v-if="!uploadImgList1[0].upbtnGroup" @mouseenter="showbottomSilde = true" @mouseleave="showbottomSilde=false">
                    <img :src="concatImageUrl(uploadImgList1[0].picUrl)" v-if="!uploadImgList1[0].upbtnGroup" @click="handleClick(375,76)" :style="{width:'288px',verticalAlign:'bottom'}"/>
                    <div class="arousel__peration" v-if="showbottomSilde">
                        <img src="../../../assets/edit1.png" alt="" @click="showMenuSetting">
                        <img src="../../../assets/del1.png" alt="" @click="uploadImgList1 = [{picUrl: '', upbtnGroup: true}];showbottomSilde=false;">
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="floor_save" @click="sureForRpc">楼层保存</div> -->
        <div class="floor_save" >
            <button @click="sureForRpc">楼层保存</button>
        </div>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="isShowMt" :options="linkOptions" @back="linkBack"/>
        </transition>

        <div class="dialogImage">
            <el-dialog title="选择素材" width="800px" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="confirm">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
import { API } from '~/config/api'
import cropper from '../../common/cropper'
import { getCookie } from '../../../../../utils/cookie'
import chooseMaterial from '^/chooseMaterial'
import linkPanel from '../components/popup/linkPanel'
import pageLinkPanel from '../components/popup/pageLinkPanel'
import mixins from '../../mixins.js'
export default {
    mixins,
    components: {
        cropper,
        chooseMaterial,
        linkPanel,
        pageLinkPanel
    },
    data() {
        return {
            isShowCropper: false,
            closeUpload: false, // 图片上传
            uploadImgList: [{picUrl: '', upbtnGroup: false}],
            uploadImgList1: [{picUrl: '', upbtnGroup: false}],
            cropwidth: null,
            cropheight: null,
            imgType: '',
            imgName: '',
            cropperImgUrl: '',
            isDisabled: false,
            styleType: '',
            aspectRatio: '5:1',
            value: '商城',
            linkAdress: '',
            blockColor: '',
            leftContent: 0,
            rightContent: 0,
            linkType: 1,
            labelWidth: '92px',
            title: '',
            showbottomSilde: false,
            instructions: '',
            isSplitBtn: false,
            isSplitBtnLeft: false,
            isSplitBtnRight: false,
            isSplitBtnLink: false,
            isShow: 0,
            isShowRight: 0,
            isShowLink: 0,
            iconList: ['色块', '图标'],
            iconRightList: ['箭头', '文本'],
            linkTypetList: ['APP内部', '第三方'],
            isNeedLogin: false,
            isNeedId: false,
            blockRightContent: '更多',
            blockRightColor: '',
            picHeight: '',
            divlineColor: '',
            placeholdertext: '16x16@2x',
            placeholdertext1: '24x24@2x',
            // 图片设置属性
            piclinkAdress: '',
            piclinkType: 1,
            isLogin: 0,
            ispicNeedId: 0,
            menuOptions: {},
            isShowMaterial: false,
            size: [],
            materialUrlList: [],
            isShowMt: false,
            linkOptions: {},
            bigHeadOptions: {},
            selectOptions: [],
            selectValue: ''
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
        }
    },
    watch: {
        flag(nval) {
            this.styleType = nval
            this.delFormData()
            // console.log(this.styleType + '=-=-=---')
        },
        currentTemplateItem(nval) {
            this.styleType = nval.subkind
            // console.log(this.styleType + '1-1-1-1-1')
        }
    },
    created() {
        // this.styleType = this.flag || this.currentTemplateItem.subkind || this.currentTemplateItem.options.styleType
        this.styleType = this.currentTemplateItem.subkind ? this.currentTemplateItem.subkind : this.flag
        this.divlineColor = this.currentTemplateItem.options.divlineColor
        this.title = this.currentTemplateItem.options.title
        this.instructions = this.currentTemplateItem.options.instructions
        this.isSplitBtn = this.currentTemplateItem.options.isShowLine == '1' ? true : false
        this.aspectRatio = this.currentTemplateItem.options.aspectRatio
        if(this.currentTemplateItem.options.aspectRatio == '5:1') {
            this.picHeight = 76
        }else {
            this.picHeight = this.currentTemplateItem.options.picHeight
        }
        this.uploadImgList1[0].picUrl = this.currentTemplateItem.options.styleInfoList[0].picUrl
            if(this.currentTemplateItem.options.picUrl) {
               this.uploadImgList1[0].upbtnGroup = true
            }
         var item = this.currentTemplateItem.options.styleInfoList
         this.isSplitBtnLeft = item[0].contentType == '0' ? false : true
         this.isShow = item[0].contentType == '1' ? 0 : 1
         if(item[1]) {
             this.isSplitBtnRight = item[1].contentType == '0' ? false : true
            this.isShowRight = item[1].contentType == '2' ? 0 : 1
            this.bigHeadOptions.isSplitBtnLink = item[1].picLinkType == '1' ? false : true
            this.bigHeadOptions.isNeedLogin = item[1].isLoginNeeded == '1' ? true : false
            this.bigHeadOptions.isNeedId = item[1].isIdNeeded == '1' ? true : false
            this.bigHeadOptions.isShowLink = item[1].picLinkType == '2' ? 0 : 1
            this.bigHeadOptions.picLink = item[1].picLink
         }
         this.isShowLink = item[0].picLinkType == '2' ? 0 : 1
            this.blockColor = item[0].color
            this.uploadImgList[0].picUrl = item[0].picUrl
            if(item[0].picUrl) {
               this.uploadImgList[0].upbtnGroup = true
            }
            this.linkOptions = {
                picLinkType : this.currentTemplateItem.options.styleInfoList[0].picLinkType,
                picLink:  this.currentTemplateItem.options.styleInfoList[0].picLink,
                isLoginNeeded: this.currentTemplateItem.options.styleInfoList[0].isLoginNeeded,
                isIdNeeded: this.currentTemplateItem.options.styleInfoList[0].isIdNeeded
            }

    },
    methods: {
        linkBack(obj) {
            this.piclinkType = obj.picLinkType,
            this.piclinkAdress = obj.picLink,
            this.isLogin = obj.isLoginNeeded,
            this.ispicNeedId = obj.isIdNeeded
            this.isShowMt = false
        },
        eidtMenuStyleRpc() {
            var titleList = []
            
            if(this.styleType == '01') {
                titleList.push(
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        ordernNum: '3',
                        contentType: this.isSplitBtnLeft ? (this.isShow == 0 ? '1' : '3') : '0',
                        picUrl: this.uploadImgList[0].picUrl,
                        content: '',
                        color: this.blockColor,
                        picLinkType: '',
                        picLink: '',
                        isLoginNeeded: '',
                        isIdNeeded: ''
                    }
                )
            } else if (this.styleType == '02') {
                let isNeedLogin = this.$refs.bigHeadOption.isNeedLogin
                let isNeedId = this.$refs.bigHeadOption.isNeedId
                let isShowLink = this.$refs.bigHeadOption.isShowLink
                let isSplitBtnLink = this.$refs.bigHeadOption.isSplitBtnLink
                let picLink = this.$refs.bigHeadOption.picLink
                titleList = [
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        ordernNum: '3',
                        contentType: this.isSplitBtnLeft ? (this.isShow == 0 ? '1' : '3') : '0',
                        picUrl: this.uploadImgList[0].picUrl,
                        content: '',
                        color: this.blockColor,
                        picLinkType: this.isSplitBtnLink ? (this.isShowLink == 0 ? '2' : '3') : '0',
                        picLink: this.linkAdress,
                        isLoginNeeded: this.isNeedLogin ? '1' : '0',
                        isIdNeeded: this.isNeedId ? '1' : '0'
                    },
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        ordernNum: '4',
                        contentType: this.isSplitBtnRight ? (this.isShowRight == 0 ? '2' : '4') : '0',
                        picUrl: '',
                        content: this.blockRightContent,
                        color: this.blockRightColor,
                        picLinkType: isSplitBtnLink ? (isShowLink == 0 ? '2' : '3') : '0',
                        picLink: picLink,
                        isLoginNeeded: isNeedLogin ? '1' : '0',
                        isIdNeeded: isNeedId ? '1' : '0'
                    }

                ]
            } else {
                titleList = [
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        // ordernNum: '',
                        contentType: '',
                        picUrl: this.uploadImgList1[0].picUrl,
                        content: '',
                        color: '',
                        picLinkType: this.piclinkType,
                        picLink: this.piclinkAdress,
                        isLoginNeeded: this.isLogin,
                        isIdNeeded: this.ispicNeedId
                    }
                ]
            }
            let headLineData = {
                floorType: '04',
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                titleList: titleList
            }
            eidtMenuStyleRpc(headLineData).then(res => {
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        backImg(imgArr) {
            this.uploadImgList1 = []
            this.isShowMaterial = false
            this.uploadImgList1.push({picUrl: imgArr[0].showSelectImg, upbtnGroup: false})

            this.uploadImgList = []
            this.isShowMaterial = false
            this.uploadImgList.push({picUrl: imgArr[0].showSelectImg, upbtnGroup: true})
        },
        confirm() {
            this.uploadImgList1 = []
            this.materialUrlList = this.$refs.chooseMaterial.getParentImage()
            this.isShowMaterial = false
            this.uploadImgList1.push({picUrl: this.materialUrlList, upbtnGroup: false})

            this.uploadImgList = []
            this.materialUrlList = this.$refs.chooseMaterial.getParentImage()
            this.isShowMaterial = false
            this.uploadImgList.push({picUrl: this.materialUrlList, upbtnGroup: true})
            
            this.updateOptions()
        },
        // 数据维护处理
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        updateOptions() {
            var titleList = []
            if(this.styleType == '01') {
                titleList = [
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        ordernNum: '3',
                        contentType: this.isSplitBtnLeft ? (this.isShow == 0 ? '1' : '3') : '0',
                        picUrl: this.uploadImgList[0].picUrl,
                        content: '',
                        color: this.blockColor,
                    }
                ]
            } else if (this.styleType == '02') {
                titleList = [
                    {
                            styleName: '标题',
                            styleType: this.styleType,
                            floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                            title: this.title,
                            instructions: this.instructions,
                            ordernNum: '3',
                            contentType: this.isSplitBtnLeft ? (this.isShow == 0 ? '1' : '3') : '0',
                            picUrl: this.uploadImgList[0].picUrl,
                            content: '',
                            color: this.blockColor,
                            picLinkType: this.isSplitBtnLink ? (this.isShowLink == 0 ? '2' : '3') : '0',
                            picLink: this.linkAdress,
                            isLoginNeeded: this.isNeedLogin ? '1' : '0',
                            isIdNeeded: this.isNeedId ? '1' : '0'
                        },
                        {
                            styleName: '标题',
                            styleType: this.styleType,
                            floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                            title: this.title,
                            instructions: this.instructions,
                            ordernNum: '4',
                            contentType: this.isSplitBtnRight ? (this.isShowRight == 0 ? '2' : '4') : '0',
                            picUrl: '',
                            content: this.blockRightContent,
                            color: this.blockRightColor,
                            picLinkType: this.isSplitBtnLink ? (this.isShowLink == 0 ? '2' : '3') : '0',
                            picLink: this.linkAdress,
                            isLoginNeeded: this.isNeedLogin ? '1' : '0',
                            isIdNeeded: this.isNeedId ? '1' : '0'
                        }
                ]
            } else {
                titleList = [
                    {
                        styleName: '标题',
                        styleType: this.styleType,
                        floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                        title: this.title,
                        instructions: this.instructions,
                        // ordernNum: '',
                        contentType: '',
                        picUrl: this.uploadImgList1[0].picUrl,
                        content: '',
                        color: '',
                        picLinktype: this.piclinkType,
                        picLink: this.piclinkAdress,
                        isLoginNeeded: this.isLogin,
                        isIdNeeded: this.ispicNeedId
                    }
                ]
            }
            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '04',
                floorName: '标题',
                floorIsAd: '0',
                styleType: this.styleType,
                isCustomized: this.aspectRatio == '自定义' ? '1' : '0',
                aspectRatio: this.aspectRatio,
                picHeight: this.picHeight,
                title: this.title,
                instructions: this.instructions,
                isShowLine: this.isSplitBtn ? '1' : '0',
                divlineType: '0',
                divlineColor: this.divlineColor,
                status: '0',
                widthF: '375',
                heightF: this.styleType == '01' ? '32' : (this.styleType == '02' ? '48' : '76'),
                operatorId: this.options.operatorId,
                operator: this.options.operator,
                styleInfoList: titleList
            }
            console.log(titleList, 7777777777)

            if(this.aspectRatio === '5:1') {
                this.picHeight = '76'
            }
            console.log(this.menuOptions, 898989898)
            this.$emit('setMenuStyleOptions', this.menuOptions)
            
        },
        handleClick(width,height) {
            this.size = []
            this.isShowMaterial = true
            
            if(this.aspectRatio === '自定义'){
                this.size.push(width,parseInt(this.picHeight),2)
            }else {
                this.size.push(width,height,2)
            }
        },
        isSplitBtnDivLine() {
            this.isSplitBtn = !this.isSplitBtn
            this.updateOptions()
        },
        isSplitBtnClick () {
            this.isSplitBtn = !this.isSplitBtn; 
            this.updateOptions()
        },
        // 数据清空
        delFormData() {
            this.isShowCropper = false,
            this.closeUpload = false, // 图片上传
            this.uploadImgList = [{picUrl: '', upbtnGroup: false}],
            this.uploadImgList1 = [{picUrl: '', upbtnGroup: false}],
            this.cropwidth = null,
            this.cropheight = null,
            this.imgType = '',
            this.imgName = '',
            this.cropperImgUrl = '',
            this.isDisabled = false,
            // this.styleType = '',
            this.aspectRatio = '5:1',
            this.linkAdress = '',
            this.blockColor = '',
            this.leftContent = 0,
            this.rightContent = 0,
            this.linkType = 1,
            this.title = '',
            this.instructions = '',
            this.isSplitBtn = false,
            this.isSplitBtnLeft = false,
            this.isSplitBtnRight = false,
            this.isSplitBtnLink = false,
            this.isShow = 0,
            this.isShowRight = 0,
            this.isShowLink = 0,
            this.isNeedLogin = false,
            this.isNeedId = false,
            this.blockRightContent = '',
            this.blockRightColor = '',
            this.picHeight = '',
            this.divlineColor = '',
            this.isShowMt = false,
            // 图片设置属性
            this.piclinkAdress = '',
            this.piclinkType = 1,
            this.isLogin = 0,
            this.ispicNeedId = 0
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
            // this.eidtMenuStyleRpc()
        },
        editFloorStyleAllocation() {
            let data ={
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '04',
                floorName: '标题',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                isCustomized: this.aspectRatio == '自定义' ? '1' : '0',
                aspectRatio: this.aspectRatio,
                picHeight: this.picHeight,
                title: this.title,
                instructions: this.instructions,
                isShowLine: this.isSplitBtn ? '1' : '0',
                divlineType: '0',
                divlineColor: this.divlineColor,
                status: '0',
                widthF: '375',
                heightF: this.styleType == '01' ? '32' : (this.styleType == '02' ? '48' : '76'),
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
        
        showIcon(i) {
            this.isShow = i
            this.updateOptions()
        },
        isSplitBtnLeftShow() {
            this.isShow = 0
            this.isSplitBtnLeft = !this.isSplitBtnLeft
            this.updateOptions()
        },
        showIconRight(i) {
            this.isShowRight = i
            this.updateOptions()
        },
        isSplitBtnRightShow() {
            this.isShowRight = 0
            this.isSplitBtnRight = !this.isSplitBtnRight
            this.updateOptions()
        },
        showLinkType(i) {
            this.isShowLink = i
            this.updateOptions()
        },
        isSplitBtnLinkType() {
            this.isShowLink = 0
            this.isSplitBtnLink = !this.isSplitBtnLink
            this.updateOptions()
        },
        backMenu() {
            this.isShowMt = false
        },
        showMenuSetting() {
            this.isShowMt = true
        },
        // 图片上传

        async getCropperImgMsg() {
            this.isDisabled = true
              this.cropperImgUrlList = await this.$refs.cropper.getImageBlob()
            var FileController = API.uploadImg;
            // FormData 对象
            var form = new FormData();
            var fileOfBlob = new File([this.cropperImgUrlList], this.imgName);
            // 文件对象
            form.append("file", fileOfBlob);
            // 其他参数
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            // iCIFID: getCookie('iCIFID') || '',
            //     eCIFID: getCookie('eCIFID') || ''
            xhr.open("post", FileController, true);
            xhr.setRequestHeader('iCIFID' , getCookie('iCIFID') || '' );
            // 'iCIFID' + getCookie('eCIFID') || '')
            xhr.setRequestHeader('eCIFID' , getCookie('eCIFID') || '' )
            xhr.onload = () => {
                this.isDisabled = false
                this.closeUpload = true
                var backlist = JSON.parse(xhr.response)
                if(this.styleType == '03') {
                    this.uploadImgList1[0].picUrl = backlist.body.uploadFileList[0].filePath
                    this.uploadImgList1[0].upbtnGroup = true
                    this.updateOptions()
                } else {
                    this.uploadImgList[0].picUrl = backlist.body.uploadFileList[0].filePath
                    this.uploadImgList[0].upbtnGroup = true
                    this.updateOptions()
                }
                
                // this.dialogFormVisible = true
                
                this.isShowCropper = false
            };
            xhr.send(form);
        },
        uploadImg(event) {
            // this.uploadImgIndex = i
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            if(this.styleType == '01') {
                this.cropwidth = 16
                this.cropheight = 16
            } else if(this.styleType == '02') {
                this.cropwidth = 24
                this.cropheight = 24
            } else {
                this.cropwidth = 375
                this.cropheight = 76
            }
            this.imgName = files[0].name
            this.isShowCropper = true
            
            this.cropperImgUrl = this.getObjectURL(files[0])
        },

        getObjectURL (file) {
            let url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            }else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            }
            return url ;
        },
        // 模态框关闭回调
        handleDialogClose() {
            this.isShowCropper = false
            this.dialogFormVisible = true
        },
        // 清空图片
        delImgList() {
            this.closeUpload = false
            this.uploadImgList = [{picUrl: '', upbtnGroup: false}]
            this.updateOptions()
        }
    }
}
</script>

<style lang="scss" scoped>

.headLine__style {
    background: #ffffff;
    padding: 0 20px;

    .smallHeadLine, .bigHeadLine {
        .cut__off__ule {
            padding-top: 20px;
            display: flex;
            align-items: center;
            position: relative;
            box-shadow: inset 0 -1px 0 0 #F5F5FA;
            padding-bottom: 20px;

            span{
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
            }
            .el-input {
                height: 40px;
                width: 176px;
                margin-left: 33px;

                .el-input__inner {
                    height: 40px;
                    width: 176px;
                    padding-left: 15px;
                }
            }
            .el-color-picker {
                margin-left: 10px;
            }

        }
        .el-form {
            padding: 20px 0;
            .nomal__margin {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;

                div {
                    font-family: Helvetica;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
                }
                .el-input {
                    width: 288px;
                    height: 40px;

                    .el-input__inner {
                        width: 288px;
                    }
                }
            }

            .left__content {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                height: 35px;
                justify-content: space-between;
                span {
                    font-family: MicrosoftYaHeiUI;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
                    margin-right: 20px;
                }

                .tab__check {
                    display: flex;

                    div {
                        width: 56px;
                        height: 32px;
                        text-align: center;
                        line-height: 32px;
                        font-family: MicrosoftYaHeiUI;
                        font-size: 12px;
                        color: #323C41;
                        letter-spacing: 0;
                        background: #FAFAFC;
                        border-radius: 2px;
                        margin-right: 8px;
                        cursor: pointer;

                        &:nth-child(2) {
                            margin-right: 80px;
                        }
                    }
                    
                    .check__active {
                        color: #3671FF;
                        background: #F2F8FF;
                        border: 1px solid #3671FF;
                        border-radius: 2px;
                    }
                }
            }

            .el__input242 {
                margin-left: 72px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                div {
                    font-family: Helvetica;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
                }
                .colorChoose {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .el-input{
                        width: 176px;
                        height: 40px;
                    }
                }
                
            }
        }
    }
    .bigHeadLine {
        .el__input242 {
            margin-bottom: 20px;
        }
        .right__content {
            .el-input {
                width: 228px;
            }
        }
    }

    .picHeadLine {
        .carousel__content__body {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
        }
        .carousel__content__body .carousel__content__body__text{
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            letter-spacing: 0;
        }
        .carousel__Specifications span {
            display: block;
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #A2A4A6;
        }
        .carousel__Specifications img {
            margin-left: 200px;
            // margin-top: 98px;
        }
        .arousel__peration img{
            display: block;
        }
        .arousel__peration{
            display: flex;
            width: 288px;
            background: rgba($color: #000000, $alpha: 0.5);
            height: 40px;
            align-items: center;
            position: absolute;
            bottom: 0;
            :first-child{
                margin-left: 228px;
            }
            :nth-child(2){
                margin-left: 10px;
            }
        }
    }

    .splitBtn {
        background: #CACCD2;
        border-radius: 1px;
        width: 32px;
        height: 2px;
        margin-left: 30px;
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

    .carousel__content__body__small {
        display: flex;
        justify-content: small;
        padding-bottom: 20px;
    }
    .carousel__content__body__text__small {
        opacity: 0;
    }
    .carousel__content__body .carousel__content__body__text{
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }
    .addColorStyle{
        margin-left: 20px;
    }
    & .addColorStyle>:last-child .el-radio__label{
        color: #D0021B;
    }
    & .add__margin .el-form-item__label {
        padding: 0px 33px 0 0;
    }
    & .add__margin {
        margin-bottom: 20px;
    }
    & .carousel__Specifications {
        margin-left: 45px;
        align-items: center;
        position: relative;
    }
    & .carousel__Specifications__small {
        width: 80px;
        height: 80px;
        background: #FAFAFC;
        margin-left: 20px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #DDE0E4;
        text-align: center;
        line-height: 100px;
    }
    & .positionImg {
         width: 20px;
         height: 20px;
         position: absolute;
         left:105px;
         top: 25px;
    }
    & .showImg {
        position: absolute;
        left: 70px;
        top: 0;
    }
    .arousel__peration__small{
        width: 80px;
        height: 40px;
        display: flex;
        align-items: center;
        background: rgba($color: #000000, $alpha: 0.5);
        position: relative;
        right: 80px;
        top: 40px;
    }
    .arousel__peration__small img{
        display: block;
        margin-left: 10px;
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
