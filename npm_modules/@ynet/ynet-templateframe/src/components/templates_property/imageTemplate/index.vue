<template>
    <div class="imageTemplate__style">
        <div class="imageTemplate">
            <div class="leftOrRight" >{{picMargin}}</div>
            <div @click="isSplitBtn = !isSplitBtn; updateFloor()" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
            </div>
            <el-form>
                <el-form-item label="上下边距" class="topBottomMargin" v-show="true">
                    <div class="flex__box">
                        <div class="flex__box">
                            <div class="top__text">上</div>
                            <el-input-number v-model="topDistance" controls-position="right" @change="handleChange" :max="100" :min="0"></el-input-number>
                        </div>
                        <div class="flex__box">
                            <div class="top__text">下</div>
                            <el-input-number v-model="bottomDistance" controls-position="right" @change="handleChange" :max="100" :min="0"></el-input-number>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '03' || flagType == '07'">
                    <el-radio-group v-model="choseWidthHeight01" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="1.5:1">
                        </el-radio>
                        <el-radio label="1:1">
                        </el-radio>
                        <el-radio label="1:1.25">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '01' &&  isSplitBtn">
                    <el-radio-group v-model="choseWidthHeight02" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="3:1">
                        </el-radio>
                        <el-radio label="4:1">
                        </el-radio>
                        <el-radio label="7:1">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '02' &&  isSplitBtn ">
                    <el-radio-group v-model="choseWidthHeight03" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="2.5:1">
                        </el-radio>
                        <el-radio label="2:1">
                        </el-radio>
                        <el-radio label="1:1">
                        </el-radio>
                        <el-radio label="1:1.25" style="margin-left:0px;margin-top: 20px;">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '02' && !isSplitBtn">
                    <el-radio-group v-model="choseWidthHeight04" class="add__radio" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="2:1">
                        </el-radio>
                        <el-radio label="1:1">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '06'">
                    <el-radio-group v-model="choseWidthHeight05" class="add__radio" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="2.5:1">
                        </el-radio>
                        <el-radio label="3:1">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽高比" class="change__radio" v-if="flagType == '01' && !isSplitBtn">
                    <el-radio-group v-model="choseWidthHeight06" class="add__radio" @change="handleImgNumChange(),updateFloor()">
                        <el-radio label="3:1">
                        </el-radio>
                        <el-radio label="3.5:1">
                        </el-radio>
                        <el-radio label="自定义"  class="el__radio__blank">
                            <div class="own__blank">
                                <div class="ownHeight">自定义高度</div>
                                <el-input v-model="writeHeight" @change="handleImgNumChange(),updateFloor()"></el-input>
                                <div class="clock__btn">
                                    <img src="../../../assets/icon_clock.png" alt="">
                                </div>
                            </div>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- <el-form-item label="图片高度" class="nomal__margin" v-if="choseWidthHeight01 == '自定义' || choseWidthHeight02 == '自定义' || choseWidthHeight03 == '自定义' || choseWidthHeight04 == '自定义' || choseWidthHeight05 == '自定义' || choseWidthHeight06 == '自定义'">
                    <el-input v-model="writeHeight"  @change="handleImgNumChange(),updateFloor()"></el-input>
                </el-form-item> -->

                <el-form-item label="图片数" v-if = "parseInt(flagType) >= 6">
                    <el-input-number v-model="ImgNum" controls-position="right" @change="handleImgNumChange" :min="ImgDefaultNum" :max="10" aria-placeholder="默认"></el-input-number>
                </el-form-item>
            </el-form>
        </div>

        <div class="carousel__content__body" v-show = "parseInt(flagType) >= 1 || parseInt(flagType) >= 6">
            <div style="display: flex">
                <span class="carousel__content__body__text">{{imgName.top}}</span>
                <div class="carousel__Specifications">
                    <span>{{imgName.width1 + '*' +imgName.height1 + '@2x'}}</span>
                    <img class="showImg" src="../assets/add.png" alt=""  @click="handleClick(imgName.width1,imgName.height1,1)">
                    <!-- <input id="file" @change="uploadImg($event,imgName.width1,imgName.height1)" type="file" class="file"> -->
                </div>
            </div>
            <div style="position: relative;text-align: center;background: #f1f1f1;margin-top: 22px;margin-left: 72px;" @mouseenter="showbottomSilde = true" @mouseleave="showbottomSilde=false">
                <img :src="concatImageUrl(showSelectImg)" v-if="!upbtnGroup" @click="handleClick(imgName.width1,imgName.height1,1)" :style="{verticalAlign:'bottom'}" :class="[parseInt(imgName.width1) > parseInt(imgName.height1) ? 'imgWidth' : 'imgHeight']"/>
                <div class="arousel__peration" v-if="showbottomSilde" >
                    <img src="../../../assets/edit1.png" alt="" @click="slideRight(1)" v-if="!upbtnGroup">
                    <img src="../../../assets/del1.png" alt="" v-if="!upbtnGroup" @click="upbtnGroup = true;showSelectImg='';updateFloor()">
                </div>
            </div>
            
        </div>
        <div class="carousel__content__body" v-show = "parseInt(flagType) >= 2 || parseInt(flagType) >= 6">
            <div style="display: flex">
                <span class="carousel__content__body__text">{{imgName.middle}}</span>
                <div class="carousel__Specifications">
                    <span>{{imgName.width2 + '*' +imgName.height2 + '@2x'}}</span>
                    <img class="showImg" src="../assets/add.png" alt=""  @click="handleClick(imgName.width2,imgName.height2,2)">
                </div>
            </div>
            <div style="position: relative;text-align: center;background: #f1f1f1;margin-top: 22px;margin-left: 72px;" @mouseenter="showbottomSilde1 = true" @mouseleave="showbottomSilde1=false">
                <img :src="concatImageUrl(showSelectImg1)" v-if="!upbtnGroup1" @click="handleClick(imgName.width2,imgName.height2,2)"  :style="{verticalAlign:'bottom'}" :class="[parseInt(imgName.width2) > parseInt(imgName.height2) ? 'imgWidth' : 'imgHeight']"/>
                <div class="arousel__peration" v-if="showbottomSilde1">
                    <img src="../../../assets/edit1.png" alt="" @click="slideRight(2)" v-if="!upbtnGroup1">
                    <img src="../../../assets/del1.png" alt="" v-if="!upbtnGroup1" @click="upbtnGroup1 = true;updateFloor()">
                </div>
            </div>
        </div>
        <div class="carousel__content__body" v-show = "parseInt(flagType) >= 3 && parseInt(flagType) <= 5">
            <div style="display: flex">
                <span class="carousel__content__body__text">{{imgName.bottom}}</span>
                <div class="carousel__Specifications">
                    <span>{{imgName.width3 + '*' +imgName.height3 + '@2x'}}</span>
                    <img class="showImg" src="../assets/add.png" alt="" @click="handleClick(imgName.width3,imgName.height3,3)">
                </div>
            </div>
            <div style="position: relative;text-align: center;background: #f1f1f1;margin-top: 22px;margin-left: 72px;" @mouseenter="showbottomSilde2 = true" @mouseleave="showbottomSilde2=false">
                <img :src="concatImageUrl(showSelectImg2)" v-if="!upbtnGroup2" @click="handleClick(imgName.width3,imgName.height3,3)"  :style="{verticalAlign:'bottom'}" :class="[parseInt(imgName.width3) > parseInt(imgName.height3) ? 'imgWidth' : 'imgHeight']"/>
                <div class="arousel__peration" v-if="showbottomSilde2">
                    <img src="../../../assets/edit1.png" alt="" @click="slideRight(3)" v-if="!upbtnGroup2">
                    <img src="../../../assets/del1.png" alt="" v-if="!upbtnGroup2" @click="upbtnGroup2 = true;updateFloor()">
                </div>
            </div>
        </div>
        <div class="carousel__content__body" v-show = "parseInt(flagType) == 5 || parseInt(flagType) === 7">
            <div style="display: flex">
                <span class="carousel__content__body__text">{{imgName.last}}</span>
                <div class="carousel__Specifications">
                    <span>{{imgName.width4 + '*' +imgName.height4 + '@2x'}}</span>
                    <img class="showImg" src="../assets/add.png" alt=""  @click="handleClick(imgName.width4,imgName.height4,clickIndex)">
                </div>
            </div>
            <div style="position: relative;text-align: center;background: #f1f1f1;margin-top: 22px;margin-left: 72px;" @mouseenter="showbottomSilde3 = true" @mouseleave="showbottomSilde3=false">
                <img :src="concatImageUrl(showSelectImg3)" v-if="!upbtnGroup3" @click="handleClick(imgName.width4,imgName.height4,clickIndex)"  :style="{verticalAlign:'bottom'}" :class="[parseInt(imgName.width3) > parseInt(imgName.height3) ? 'imgWidth' : 'imgHeight']"/>
                <div class="arousel__peration" v-if="showbottomSilde3">
                    <img src="../../../assets/edit1.png" alt="" @click="slideRight(clickIndex)" v-if="!upbtnGroup3">
                    <img src="../../../assets/del1.png" alt="" v-if="!upbtnGroup3" @click="upbtnGroup3 = true;updateFloor()">
                </div>
            </div>
        </div>

        <div class="carousel__content__body" style="display:block" v-show = "ImgNum > ImgDefaultNum && parseInt(flagType) >= 6" v-for="(item,index) in pictureList" :key="index">
            <div style="display: flex">
                <span class="carousel__content__body__text">{{"图片" + (ImgDefaultNum + index + 1)}}</span>
                <div class="carousel__Specifications">
                    <span>{{item.width + '*' +item.height + '@2x'}}</span>
                    <img class="showImg" src="../assets/add.png" alt=""   @click="handleClick(item.width,item.height,(ImgDefaultNum + index + 1))">
                    
                    <!-- <input id="file" @change="uploadImg4($event,item.width,item.height,index)" type="file" class="file"> -->
                </div>
            </div>
            <div style="position: relative;text-align: center;background: #f1f1f1;margin-top: 22px;margin-left: 72px;" @mouseenter="item.showbottomSilde = true" @mouseleave="item.showbottomSilde=false">
                <img :src="concatImageUrl(item.showSelectImg)" v-if="!item.upbtnGroup" :style="{verticalAlign:'bottom'}" :class="[parseInt(item.width) > parseInt(item.height) ? 'imgWidth' : 'imgHeight']"/>
                <div class="arousel__peration" v-if="item.showbottomSilde" >
                    <img src="../../../assets/edit1.png" alt="" @click="slideRight(ImgDefaultNum + index + 1)" v-if="!item.upbtnGroup">
                    <img src="../../../assets/del1.png" alt="" v-if="!item.upbtnGroup" @click="item.upbtnGroup = true;updateFloor()">
                </div>
            </div>
        </div>

        <div class="floor_save" >
            <button @click="submit">楼层保存</button>
        </div>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/>
        </transition>

        <el-dialog  title="上传图片" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
            <cropper ref="cropper" class="cropper" :imgUrl="cropperImgUrl" :cropwidth="cropwidth" :cropheight="cropheight" :imgType="imgType"></cropper>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getCropperImgMsg" :disabled="isDisabled" class="btn">确定</el-button>
            </div>
        </el-dialog>
        <div class="dialogImage">
            <el-dialog title="选择素材" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="confirm">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { editFloorStyleAllocation,eidtMenuStyleRpc } from '../../../utils/api'
import cropper from '../../common/cropper'
import { API } from '~/config/api'
import linkPanel from '../components/popup/linkPanel'
import { getCookie } from '../../../../../utils/cookie'
import chooseMaterial from '^/chooseMaterial'
import mixins from '../../../../../constants/mixins.js'

export default {
    mixins,
    data() {
        return {
            num8: '',
            clickImg: '',
            menuOptions:'',
            imgTotalList:[],
            color: '#333333',
            ImgNum: '',
            gearSetChoose: '',
            topDistance: 0,
            bottomDistance:0,
            pictrueDis: '无',
            choseWidthHeight01: '1.5:1',
            choseWidthHeight02: '3:1',
            choseWidthHeight03: '2.5:1',
            choseWidthHeight04: '2:1',
            writeHeight: '0',
            choseWidthHeight05: '2.5:1',
            choseWidthHeight06: '3:1',
            isSplitBtn: false,
            bSeniorOptions:false,
            isShowCropper: false,
            cropperImgUrl: '',
            cropwidth: null,
            cropheight: null,
            imgType: '',
            isDisabled: false,
            linkAddress: [],
            isNeedId: [],
            labelWidth: '70px',
            linkType: [],
            isLogin: [],
            upbtnGroup: true,
            upbtnGroup1: true,
            upbtnGroup2: true,
            upbtnGroup3: true,
            SelectedImgName: '',
            SelectedImgName1: '',
            SelectedImgName2: '',
            SelectedImgName3: '',
            cropperImgUrlList:[],
            showSelectImg:'',
            showSelectImg1:'',
            showSelectImg2:'',
            showSelectImg3:'',
            uploadImgIndex:0,
            isCustomized: '',
            heighN: '',
            aspectRatio: '',//宽高比
            imgList: [],
            styleType: '',
            linkOptions: {},
            flagType: this.flag,
            xPicUrl: [],
            selectedIndex: '',
            pictureList: [],
            isShowMaterial:false,
            size:[],
            materialUrlList: [],
            showbottomSilde: false,
            showbottomSilde1: false,
            showbottomSilde2: false,
            showbottomSilde3: false,
        }
    },
    props: {
        flag: {
            type: String,
            default:''
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
    computed:{
        // VertialControl() {
        //     console.log(this.options,'fdasfasfasfdsafasdfa')
        //     return this.options.Vertial
        // },
        clickIndex() {
            if(parseInt(this.flagType) == 7) {
                return 3
            }else {
                return 4
            }
        },
        ImgDefaultNum() {
            if(parseInt(this.flagType) === 6) {
                return 2
            }else {
                return 3
            }
        },
        imgName() {
            let imgArr = {}
            // this.upbtnGroup = true
            // this.upbtnGroup1= true
            // this.upbtnGroup2 = true
            // this.upbtnGroup3 = true
            if( parseInt(this.flagType) === 1) {
                // this.imgList = []
                // this.imgList.push(this.showSelectImg)
                this.isCustomized = '0'
                imgArr.middle = ''
                imgArr.top = '图片'
                imgArr.bottom = ''
                imgArr.last = ''
                imgArr.width1 = '375'
                imgArr.height1 = '124'
                this.heighN = 124 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                if(this.isSplitBtn) { //判断有边距
                    this.isCustomized = '0'
                    imgArr.width1 = '343'
                    imgArr.height1 = '114'
                    this.heighN = 114 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    this.aspectRatio = this.choseWidthHeight02
                    if(this.choseWidthHeight02 === '4:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '343'
                        imgArr.height1 = '86'
                        this.heighN = 86 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                        
                    }else if (this.choseWidthHeight02 === '7:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '343'
                        imgArr.height1 = '48'
                        this.heighN = 48 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if(this.choseWidthHeight02 === '自定义'){
                        imgArr.width1 = '343'
                        imgArr.height1 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight)+ parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }
                }else if (!this.isSplitBtn){ //判断无边距
                    this.isCustomized = '0'
                    this.aspectRatio = this.choseWidthHeight06
                    if(this.choseWidthHeight06 === '3.5:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '375'
                        imgArr.height1 = '108'
                        this.heighN = 108 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if(this.choseWidthHeight06 === '自定义'){
                        imgArr.width1 = '375'
                        imgArr.height1 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight);
                    }
                }
            }else if (parseInt(this.flagType) === 2) {
                // this.imgList = []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1)
                this.isCustomized = '0'
                imgArr.top = '左图'
                imgArr.middle = '右图'
                imgArr.bottom = ''
                imgArr.last = ''
                imgArr.width1 = '188'
                imgArr.height1 = '94'
                imgArr.width2 = '188'
                imgArr.height2 = '94'
                this.heighN = 94 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                if(this.isSplitBtn) { //判断有边距
                    this.isCustomized = '0'
                    imgArr.width1 = '164'
                    imgArr.height1 = '64'
                    imgArr.width2 = '164'
                    imgArr.height2 = '64'
                    this.heighN = 64 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    this.aspectRatio = this.choseWidthHeight03
                    if(this.choseWidthHeight03 === '2.5:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '164'
                        imgArr.height1 = '64'
                        imgArr.width2 = '164'
                        imgArr.height2 = '64'
                        this.heighN = 64 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight03 === '2:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '164'
                        imgArr.height1 = '82'
                        imgArr.width2 = '164'
                        imgArr.height2 = '82'
                        this.heighN = 82 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight03 === '1:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '164'
                        imgArr.height1 = '164'
                        imgArr.width2 = '164'
                        imgArr.height2 = '164'
                        this.heighN = 164 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight03 === '1:1.25'){
                        this.writeHeight = '0'

                        imgArr.width1 = '164'
                        imgArr.height1 = '204'
                        imgArr.width2 = '164'
                        imgArr.height2 = '204'
                        this.heighN = 204 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if(this.choseWidthHeight03 === '自定义'){
                        imgArr.width1 = '164'
                        imgArr.height1 = this.writeHeight
                        imgArr.width2 = '164'
                        imgArr.height2 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight)+ parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }
                }else if (!this.isSplitBtn){ //判断无边距
                    this.isCustomized = '0'
                    this.aspectRatio = this.choseWidthHeight04
                    if(this.choseWidthHeight04 === '1:1'){
                        this.writeHeight = '0'

                        imgArr.width1= '187'
                        imgArr.height1 = '187'
                        imgArr.width2 = '187'
                        imgArr.height2 = '187'
                        this.heighN = 187 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if(this.choseWidthHeight04 === '自定义'){
                        imgArr.width1 = '187'
                        imgArr.height1 = this.writeHeight
                        imgArr.width2 = '187'
                        imgArr.height2 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight);
                    }
                }
            }else if (parseInt(this.flagType) === 3) {
                // this.imgList= []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1,this.showSelectImg2)
                this.isCustomized = '0'
                imgArr.top = '左图'
                imgArr.middle = '中图'
                imgArr.bottom = '右图'
                imgArr.last = ''
                imgArr.width1 = '125'
                imgArr.width2 = '125'
                imgArr.width3 = '125'
                imgArr.height1 =  '84'
                imgArr.height2 = '84'
                imgArr.height3 = '84'
                this.heighN = 84 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                if(this.isSplitBtn) { //判断有边距
                    this.isCustomized = '0'
                    imgArr.width1 = '104'
                    imgArr.width2 = '104'
                    imgArr.width3 = '104'
                    imgArr.height1 =  '70'
                    imgArr.height2 = '70'
                    imgArr.height3 = '70'
                    this.heighN = 70 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    this.aspectRatio = this.choseWidthHeight01
                    if (this.choseWidthHeight01 === '1:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '104'
                        imgArr.width2 = '104'
                        imgArr.width3 = '104'
                        imgArr.height1 = '104'
                        imgArr.height2 = '104'
                        imgArr.height3 = '104'
                        this.heighN = 104 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight01 === '1:1.25'){
                        this.writeHeight = '0'

                        imgArr.width1 = '104'
                        imgArr.width2 = '104'
                        imgArr.width3 = '104'
                        imgArr.height1 = '130'
                        imgArr.height2 = '130'
                        imgArr.height3 = '130'
                        this.heighN = 130 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if(this.choseWidthHeight01 === '自定义'){
                        imgArr.width1 = '104'
                        imgArr.width2 = '104'
                        imgArr.width3 = '104'
                        imgArr.height1 = this.writeHeight
                        imgArr.height2 = this.writeHeight
                        imgArr.height3 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight)+ parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }
                }else if (!this.isSplitBtn){
                    this.isCustomized = '0'
                    this.aspectRatio = this.choseWidthHeight01
                    if(this.choseWidthHeight01 == '1:1'){
                        this.writeHeight = '0'

                        imgArr.width1 = '125'
                        imgArr.width2 = '125'
                        imgArr.width3 = '125'
                        imgArr.height1 =  '125'
                        imgArr.height2 = '125'
                        imgArr.height3 = '125'
                        this.heighN = 125 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight01 == '1:25') {
                        this.writeHeight = '0'

                        imgArr.width1 = '125'
                        imgArr.width2 = '125'
                        imgArr.width3 = '125'
                        imgArr.height1 =  '156'
                        imgArr.height2 = '156'
                        imgArr.height3 = '156'
                        this.heighN = 156 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                    }else if (this.choseWidthHeight01 == '自定义'){
                        imgArr.width1 = '125'
                        imgArr.width2 = '125'
                        imgArr.width3 = '125'
                        imgArr.height1 = this.writeHeight
                        imgArr.height2 = this.writeHeight
                        imgArr.height3 = this.writeHeight
                        this.isCustomized = '1'
                        this.heighN = parseInt(this.writeHeight)
                    }
                }
            }else if (parseInt(this.flagType) === 4) {
                // this.imgList = []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1,this.showSelectImg2)
                this.isCustomized = '0'
                imgArr.top = '左图'
                imgArr.middle = '右上'
                imgArr.bottom = '右下'
                imgArr.last = ''
                imgArr.width1 = '187'
                imgArr.width2 = '187'
                imgArr.width3 = '187'
                imgArr.height1 =  '187'
                imgArr.height2 = '93'
                imgArr.height3 = '94'
                this.aspectRatio = ''
                this.heighN = 187 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                if(this.isSplitBtn) {
                    this.isCustomized = '0'
                    imgArr.width1 = '164'
                    imgArr.width2 = '164'
                    imgArr.width3 = '164'
                    imgArr.height1 =  '164'
                    imgArr.height2 = '74'
                    imgArr.height3 = '74'
                    this.heighN = 164 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }
            }else if (parseInt(this.flagType) === 5) {
                // this.imgList= []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1,this.showSelectImg2,this.showSelectImg3)
                this.isCustomized = '0'
                imgArr.top = '左图'
                imgArr.middle = '右上'
                imgArr.bottom = '右下左'
                imgArr.last = '右下右'
                imgArr.width1 = '187'
                imgArr.width2 = '187'
                imgArr.width3 = '94'
                imgArr.width4 = '94'
                imgArr.height1 =  '187'
                imgArr.height2 = '93'
                imgArr.height3 = '94'
                imgArr.height4 = '94'
                this.aspectRatio = ''
                this.heighN = 187 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                if(this.isSplitBtn) {
                    this.isCustomized = '0'
                    imgArr.width1 = '164'
                    imgArr.width2 = '164'
                    imgArr.width3 = '74'
                    imgArr.width3 = '74'
                    imgArr.height1 =  '164'
                    imgArr.height2 = '74'
                    imgArr.height3 = '74'
                    imgArr.height4 = '74'
                    this.heighN = 164 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }
            }else if (parseInt(this.flagType) === 6) {
                // this.imgList = []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1)
                this.isCustomized = '0'
                imgArr.top = '图片1'
                imgArr.middle = '图片2'
                imgArr.bottom = '右下'
                imgArr.last = ''
                imgArr.width1 = '300'
                imgArr.height1 = '100'
                imgArr.width2 = '300'
                imgArr.height2 = '100'
                this.heighN = 100 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                this.aspectRatio = this.choseWidthHeight05
                if (this.choseWidthHeight05 === '2.5:1'){
                    this.writeHeight = '0'

                    imgArr.width1 = '300'
                    imgArr.height1 = '120'
                    imgArr.width2 = '300'
                    imgArr.height2 = '120'
                    this.heighN = 120 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }else if(this.choseWidthHeight05 === '自定义'){
                    imgArr.width1 = '300'
                    imgArr.height1 = this.writeHeight
                    imgArr.width2 = '300'
                    imgArr.height2 = this.writeHeight
                    this.isCustomized = '1'
                    this.heighN = this.writeHeight+ parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }
            }else if (parseInt(this.flagType) === 7) {
                // this.imgList = []
                // this.imgList.push(this.showSelectImg,this.showSelectImg1)
                this.isCustomized = '0'
                imgArr.top = '图片1'
                imgArr.middle = '图片2'
                imgArr.bottom = '图片1'
                imgArr.last = '图片3'
                imgArr.width1 = '142'
                imgArr.height1 = '94'
                imgArr.width2 = '142'
                imgArr.height2 = '94'
                imgArr.width4 = '142'
                imgArr.height4 = '94'
                this.heighN = 94 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                this.aspectRatio = this.choseWidthHeight01
                if(this.choseWidthHeight01 == '1:1'){
                    this.writeHeight = '0'

                    imgArr.width1 = '142'
                    imgArr.height1 = '142'
                    imgArr.width2 = '142'
                    imgArr.height2 = '142'
                    imgArr.width4 = '142'
                    imgArr.height4 = '142'
                    this.heighN = 142 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }else if (this.choseWidthHeight01 == '1:1.25') {
                    this.writeHeight = '0'

                    imgArr.width1 = '142'
                    imgArr.height1 = '178'
                    imgArr.width2 = '142'
                    imgArr.height2 = '178'
                    imgArr.width4 = '142'
                    imgArr.height4 = '178'
                    this.heighN = 178 + parseInt(this.topDistance) + parseInt(this.bottomDistance)
                
                }else if (this.choseWidthHeight01 == '自定义') {
                    imgArr.width1 = '142'
                    imgArr.height1 = this.writeHeight
                    imgArr.width2 = '142'
                    imgArr.height2 = this.writeHeight
                    imgArr.width4 = '142'
                    imgArr.height4 = this.writeHeight
                    this.isCustomized = '1'
                    this.heighN = this.writeHeight+ parseInt(this.topDistance) + parseInt(this.bottomDistance)
                }
            }
            return imgArr
        },
        picMargin() {
            if(parseInt(this.flagType) === 1) {
                return '左右间距'
            }else {
                return '图片间距'
            }
        }
    },
    created() {
    },
    methods: {
        backImg(imgArr) {
            this.isShowMaterial = false
            console.log(imgArr,'imgkjlkjljlkj')
            if(this.clickImg === 1) {
                this.upbtnGroup = false
                this.showSelectImg = imgArr[0].showSelectImg
            }else if (this.clickImg === 2) {
                this.upbtnGroup1 = false
                this.showSelectImg1 = imgArr[0].showSelectImg
            }else if (this.clickImg === 3 && parseInt(this.flagType) < 6) {
                this.upbtnGroup2 = false
                this.showSelectImg2 = imgArr[0].showSelectImg
            }else if (this.clickImg === 3 && parseInt(this.flagType) == 7) {
                this.upbtnGroup3 = false
                this.showSelectImg3 = imgArr[0].showSelectImg
            }else if (parseInt(this.flagType) == 5 && this.clickImg === 4) {
                this.upbtnGroup3 = false 
                this.showSelectImg3 = imgArr[0].showSelectImg
            }else if(parseInt(this.flagType) > 5 && this.clickImg > this.ImgDefaultNum) {
                this.pictureList[this.clickImg - this.ImgDefaultNum- 1].upbtnGroup = false
                this.pictureList[this.clickImg - this.ImgDefaultNum- 1].showSelectImg = imgArr[0].showSelectImg
            }
            this.updateFloor()
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
        handleClick(width,height,val) {
            this.size = []
            this.isShowMaterial = true
            this.size.push(width,height,2)
            console.log(val)
            this.clickImg = val
        },
        handleImgNumChange() {
            this.pictureList = []
            console.log(this.imgName,'fdafs')
            if(parseInt(this.ImgNum) > parseInt(this.ImgDefaultNum) && parseInt(this.flagType) >= 6) {
                let Num = parseInt(this.ImgNum) - parseInt(this.ImgDefaultNum)
                for(let a = 0;a < Num;a++) {
                    this.pictureList.push({upbtnGroup: true,showSelectImg:'',width:this.imgName.width1,height:this.imgName.height1,showbottomSilde:false})      
                }
            }
            this.updateFloor()
        },
        linkBack (obj) {
            
            this.bSeniorOptions = false
            console.log(obj)
            this.isNeedId[(this.clickImg-1)] = obj.isIdNeeded

            this.isLogin[(this.clickImg-1)] = obj.isLoginNeeded

            this.linkAddress[(this.clickImg-1)] = obj.picLink

            this.linkType[(this.clickImg-1)] = obj.picLinkType

            this.xPicUrl[(this.clickImg-1)] = obj.xPicUrl
        },
        submit() {
            let list = []
            if( parseInt(this.flagType) === 1) {
                list = []
                list.push({picName:this.imgName.top,imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg})
            }else if (parseInt(this.flagType) === 3 || parseInt(this.flagType) === 4) {
                list = []
                list.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width3,imgH:this.imgName.height3,url:this.showSelectImg2}
                )
            }else if(parseInt(this.flagType) === 5) {
                list = []
                list.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width3,imgH:this.imgName.height3,url:this.showSelectImg2},
                    {picName:'4',imgW: this.imgName.width4,imgH:this.imgName.height4,url:this.showSelectImg3},
                )
            }else if(parseInt(this.flagType) === 6 || parseInt(this.flagType) === 2) {
                list = []
                list.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1}
                )
            }else if(parseInt(this.flagType) === 7) {
                list = []
                list.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width4,imgH:this.imgName.height4,url:this.showSelectImg3}
                )
            }
            
            let updateCan;
            updateCan = {
                floorId: this.options.floorId,
                pageId: this.options.pageId,
                floorType: '05',
                styleType: this.flagType,
                floorName: '图片',
                floorIsAd: '0',
                // orderNum: '',
                topMargin: this.topDistance + '',
                bottomMargin: this.bottomDistance + '',
                isCustomized: this.writeHeight === '0' ? '0' : '1',
                aspectRatio: this.aspectRatio,
                isGap: this.isSplitBtn ? '1' : '0',
                picHeight: this.writeHeight === '0' ? '0' : this.writeHeight,
                isleftRight: this.isSplitBtn ? '1' : '0',
                groupNum: '' + list.length,
                status: '0',
                widthF: '375',
                heightF: this.heighN + '',
                operatorId: this.options.operatorId,
                operator: this.options.operator,
            }
            let imgCan = []
            let addList = []
            for (let c in this.pictureList) {
                addList.push({
                    picName: (parseInt(c) + parseInt(this.ImgDefaultNum) + 1) + '',
                    imgW: this.pictureList[c].width,
                    imgH: this.pictureList[c].height,
                    url: this.pictureList[c].showSelectImg
                })
            }
            list.push(...addList)
            for(let b = 0;b<list.length;b++) {
                imgCan.push({
                    // styleId: '',
                    styleName:'图片',
                    styleType: this.flagType,
                    floorId:this.options.floorId,
                    picLinkType: this.linkType[b]=== undefined ? '1' : this.linkType[b],
                    picLink: this.linkAddress[b] === undefined ? '' : this.linkAddress[b],
                    picUrl:list[b].url,
                    isLoginNeeded:this.isLogin[b] === undefined ? '1' : this.isLogin[b],
                    isIdNeeded:this.isNeedId[b] === undefined ? '0' : this.isNeedId[b],
                    specialPicUrl: this.xPicUrl[b] === undefined ? '' : this.xPicUrl[b],
                    ordernNum:list[b].picName,
                    picHeight:list[b].imgH,
                    picWidth:list[b].imgW
                })
            }
            let editCan = {
                floorId:this.options.floorId,
                floorType: '05',
                picList:imgCan
            }
            editFloorStyleAllocation(updateCan).then(res => {
                this.handleMsg(res,'保存成功','保存失败')
                if(res.data.body.errorCode === '0') {
                    eidtMenuStyleRpc(editCan)
                }
            })
        },

        handleChange(value) {
            this.updateFloor()
        },

        handleDialogClose() {
            this.isShowCropper = false
        },
        slideRight(val) {
            this.bSeniorOptions=true
            console.log(val)

            this.clickImg = val
            
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.linkOptions = {
                isIdNeeded: imgGroup[val-1].isIdNeeded,
                isLoginNeeded: imgGroup[val-1].isLoginNeeded,
                picLink: imgGroup[val-1].picLink,
                picLinkType: imgGroup[val-1].picLinkType,
                xPicUrl:'',
            }
            console.log(this.linkOptions)
        },
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        async getCropperImgMsg() {
            this.isDisabled = true
            this.cropperImgUrlList = await this.$refs.cropper.getImageBlob()
            var FileController = API.uploadImg;
            // FormData 对象
            var form = new FormData();
            var fileOfBlob = ''
            if(this.uploadImgIndex == 0 ){
                fileOfBlob = new File([this.cropperImgUrlList], this.SelectedImgName);
            }else if (this.uploadImgIndex == 1){
                fileOfBlob = new File([this.cropperImgUrlList], this.SelectedImgName1);
            }else if (this.uploadImgIndex == 2){
                fileOfBlob = new File([this.cropperImgUrlList], this.SelectedImgName2);
            }else if (this.uploadImgIndex == 3){
                fileOfBlob = new File([this.cropperImgUrlList], this.SelectedImgName3);
            }else{
                fileOfBlob = new File([this.cropperImgUrlList], this.pictureList[this.selectedIndex].showSelectImg)
            }
            // 文件对象
            form.append("file", fileOfBlob);
            // 其他参数
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.setRequestHeader('iCIFID' , getCookie('iCIFID') || '' );
            xhr.setRequestHeader('eCIFID' , getCookie('eCIFID') || '' )
            xhr.onload = () => {
                this.isDisabled = false
                var backlist = JSON.parse(xhr.response)
                if(this.uploadImgIndex === 0) {
                    this.showSelectImg = backlist.body.uploadFileList[0].filePath
                    this.upbtnGroup = false
                }else if(this.uploadImgIndex === 1){
                    this.showSelectImg1 = backlist.body.uploadFileList[0].filePath
                    this.upbtnGroup1 = false
                }else if(this.uploadImgIndex === 2){
                    this.showSelectImg2 = backlist.body.uploadFileList[0].filePath
                    this.upbtnGroup2 = false
                }else if(this.uploadImgIndex === 3){
                    this.showSelectImg3 = backlist.body.uploadFileList[0].filePath
                    this.upbtnGroup3 = false
                }else{
                    this.pictureList[this.selectedIndex].showSelectImg = backlist.body.uploadFileList[0].filePath
                    this.pictureList[this.selectedIndex].upbtnGroup = false
                }
                this.isShowCropper = false

                this.updateFloor()
            };
            xhr.send(form);

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

        cropperImage (file, ratioX, ratioY, ratio) {
            //如果尺寸比例不对
            this.cropperImgUrl = this.getObjectURL(file)
            this.cropwidth = ratioX
            this.cropheight = ratioY
        },

        uploadImg(event,a,b) {
            this.isShowCropper = true
            this.uploadImgIndex = 0
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.SelectedImgName = files[0].name
            this.cropperImgUrl = this.getObjectURL(files[0])
            this.cropperImage (files[0],parseInt(a), parseInt(b), 2)
        },
        confirm() {
            this.materialUrlList = this.$refs.chooseMaterial.getParentImage()
            console.log(this.materialUrlList)
            this.isShowMaterial = false
            console.log(this.ImgDefaultNum)
            if(this.clickImg === 1) {
                this.upbtnGroup = false
                this.showSelectImg = this.materialUrlList
            }else if (this.clickImg === 2) {
                this.upbtnGroup1 = false
                this.showSelectImg1 = this.materialUrlList
            }else if (this.clickImg === 3 && parseInt(this.flagType) < 6) {
                this.upbtnGroup2 = false
                this.showSelectImg2 = this.materialUrlList
            }else if (this.clickImg === 3 && parseInt(this.flagType) == 7) {
                this.upbtnGroup3 = false
                this.showSelectImg3 = this.materialUrlList
            }else if (parseInt(this.flagType) == 5 && this.clickImg === 4) {
                this.upbtnGroup3 = false 
                this.showSelectImg3 = this.materialUrlList
            }else if(parseInt(this.flagType) > 5 && this.clickImg > this.ImgDefaultNum) {
                this.pictureList[this.clickImg - this.ImgDefaultNum- 1].upbtnGroup = false
                this.pictureList[this.clickImg - this.ImgDefaultNum- 1].showSelectImg = this.materialUrlList
                console.log(this.pictureList)
            }
            this.updateFloor()
        },
        uploadImg1(event,a,b) {
            this.isShowCropper = true
            this.uploadImgIndex = 1
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.SelectedImgName1 = files[0].name
            this.cropperImgUrl = this.getObjectURL(files[0])
            this.cropperImage (files[0],parseInt(a), parseInt(b), 2)
        },

        uploadImg2(event,a,b) {
            this.isShowCropper = true
            this.uploadImgIndex = 2
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.SelectedImgName2 = files[0].name
            this.cropperImgUrl = this.getObjectURL(files[0])
            this.cropperImage (files[0],parseInt(a), parseInt(b), 2)
        },

        uploadImg3(event,a,b) {
            this.isShowCropper = true
            this.uploadImgIndex = 3
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.SelectedImgName3 = files[0].name
            this.cropperImgUrl = this.getObjectURL(files[0])
            this.cropperImage (files[0],parseInt(a), parseInt(b), 2)
        },
        uploadImg4(event,a,b,index) {
            this.uploadImgIndex = ''
            this.isShowCropper = true
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.selectedIndex = index
            this.pictureList[index].showSelectImg = files[0].name
            this.cropperImgUrl = this.getObjectURL(files[0])
            this.cropperImage(files[0],parseInt(a), parseInt(b), 2)
        },
        backMenu() {
            this.bSeniorOptions= false
        },

        updateFloor () {
            let updatedlist = []
            if( parseInt(this.flagType) === 1) {
                updatedlist = []
                updatedlist.push({picName:this.imgName.top,imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg})
            }else if (parseInt(this.flagType) === 3 || parseInt(this.flagType) === 4) {
                updatedlist = []
                updatedlist.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width3,imgH:this.imgName.height3,url:this.showSelectImg2}
                )
            }else if(parseInt(this.flagType) === 5) {
                updatedlist = []
                updatedlist.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width3,imgH:this.imgName.height3,url:this.showSelectImg2},
                    {picName:'4',imgW: this.imgName.width4,imgH:this.imgName.height4,url:this.showSelectImg3},
                )
            }else if(parseInt(this.flagType) === 6 || parseInt(this.flagType) === 2) {
                updatedlist = []
                updatedlist.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1}
                )
            }else if(parseInt(this.flagType) === 7) {
                updatedlist = []
                updatedlist.push(
                    {picName:'1',imgW: this.imgName.width1,imgH:this.imgName.height1,url:this.showSelectImg},
                    {picName:'2',imgW: this.imgName.width2,imgH:this.imgName.height2,url:this.showSelectImg1},
                    {picName:'3',imgW: this.imgName.width4,imgH:this.imgName.height4,url:this.showSelectImg3}
                )
            }
            let imgArr = []
            let addList = []
            for (let c in this.pictureList) {
                addList.push({
                    picName: (parseInt(c) + parseInt(this.ImgDefaultNum) + 1) + '',
                    imgW: this.pictureList[c].width,
                    imgH: this.pictureList[c].height,
                    url: this.pictureList[c].showSelectImg
                })
            }
            updatedlist.push(...addList)
            for(let b =0;b< updatedlist.length;b++) {
                imgArr.push({
                    // styleId: '',
                    styleName:'图片',
                    styleType: this.flagType,
                    floorId:this.options.floorId || this.currentTemplateItem.options.floorId,
                    picLinkType: this.linkType[b]=== undefined ? '1' : this.linkType[b],
                    picLink: this.linkAddress[b] === undefined ? '' : this.linkAddress[b],
                    picUrl:updatedlist[b].url,
                    isLoginNeeded:this.isLogin[b] === undefined ? '1' : this.isLogin[b],
                    isIdNeeded:this.isNeedId[b] === undefined ? '0' : this.isNeedId[b],
                    specialPicUrl: this.xPicUrl[b] === undefined ? '' : this.xPicUrl[b],
                    ordernNum:updatedlist[b].picName,
                    picHeight:updatedlist[b].imgH,
                    picWidth:updatedlist[b].imgW
                })
            }
            this.imgTotalList = imgArr
            console.log(this.imgTotalList,1111111)
            this.$nextTick(() => {
                this.menuOptions = {
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    pageId: this.options.pageId,
                    floorType: '05',
                    styleType: this.flagType,
                    floorName: '图片',
                    floorIsAd: '0',
                    orderNum: '',
                    topMargin: this.topDistance + '',
                    bottomMargin: this.bottomDistance + '',
                    isCustomized: this.writeHeight === '0' ? '0' : '1',
                    aspectRatio: this.aspectRatio,
                    isGap: this.isSplitBtn ? '1' : '0',
                    picHeight: this.writeHeight === '0' ? '0' : this.writeHeight,
                    isleftRight: this.isSplitBtn ? '1' : '0',
                    groupNum: '' + imgArr.length,
                    status: '0',
                    widthF: '375',
                    heightF: this.heighN + '',
                    operatorId: this.options.operatorId,
                    operator: this.options.operator,
                    styleInfoList: this.imgTotalList
                }
                console.log(this.menuOptions,22222)
                this.$emit('setMenuStyleOptions', this.menuOptions)
            })
        }
    },
    mounted () {
        // console.table(this.currentTemplateItem.options.styleInfoList,'fasdfasfasfsafdsaf')
        this.flagType = this.currentTemplateItem.subkind
        // this.ImgNum = parseInt(this.flagType) === 6 ? 2 : 3
        this.ImgNum = this.currentTemplateItem.options.styleInfoList.length
        this.bottomDistance = this.currentTemplateItem.options.bottomMargin
        this.topDistance = this.currentTemplateItem.options.topMargin
        let cuoption = this.currentTemplateItem.options.isleftRight
        this.isSplitBtn = cuoption === '0' || cuoption === '' ? false : true
        this.upbtnGroup = false
        this.upbtnGroup1 = false
        this.upbtnGroup2 = false
        this.upbtnGroup3 = false
        // if(this.isSplitBtn) {
        //     this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
        // }
        if( parseInt(this.flagType) === 1) {
            if(this.isSplitBtn) {
                this.choseWidthHeight02 = this.currentTemplateItem.options.aspectRatio
            }else {
                this.choseWidthHeight06 = this.currentTemplateItem.options.aspectRatio
            }
            for(let a of this.currentTemplateItem.options.styleInfoList) {
                this.showSelectImg = a.picUrl
            }
            if(this.choseWidthHeight02 === '自定义' || this.choseWidthHeight06 === '自定义') {
                this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
            }
        }else if (parseInt(this.flagType) === 2){
            console.log(this.currentTemplateItem.options,'fhskdalhflaskhflkashflsahflahflk')
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false 
            if(this.isSplitBtn) {
                this.choseWidthHeight03 = this.currentTemplateItem.options.aspectRatio
            }else {
                this.choseWidthHeight04 = this.currentTemplateItem.options.aspectRatio
            }
            if(this.choseWidthHeight03 === '自定义' || this.choseWidthHeight04 === '自定义') {
                this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
            }
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
        }else if (parseInt(this.flagType) === 3){
            this.choseWidthHeight01 = this.currentTemplateItem.options.aspectRatio
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false
            if(this.choseWidthHeight01 === '自定义') {
                this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
            }
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
            this.showSelectImg2 = imgGroup[2].picUrl
        }else if (parseInt(this.flagType) === 4) {
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false
            let imgGroup = this.currentTemplateItem.options.styleInfoList.slice()
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
            this.showSelectImg2 = imgGroup[2].picUrl
        }else if (parseInt(this.flagType) === 5) {
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
            this.showSelectImg2 = imgGroup[2].picUrl
            this.showSelectImg3 = imgGroup[3].picUrl
        }else if (parseInt(this.flagType) === 6){
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false
            this.choseWidthHeight05 = this.currentTemplateItem.options.aspectRatio
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
            this.pictureList = []
            if(this.choseWidthHeight05 === '自定义') {
                this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
            }
            if(parseInt(this.ImgNum) > parseInt(this.ImgDefaultNum) && parseInt(this.flagType) >= 6) {
                let Num = parseInt(this.ImgNum) - parseInt(this.ImgDefaultNum)
                for(let a = 0;a < Num;a++) {
                    this.pictureList.push({upbtnGroup: false,showSelectImg:imgGroup[a+2].picUrl,width: this.imgName.width1,height:this.imgName.height1,showbottomSilde:false})      
                }
            }
        }else if (parseInt(this.flagType) === 7){
            this.isSplitBtn = this.currentTemplateItem.options.isGap === '1' ? true : false
            this.choseWidthHeight01 = this.currentTemplateItem.options.aspectRatio
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.showSelectImg = imgGroup[0].picUrl
            this.showSelectImg1 = imgGroup[1].picUrl
            this.showSelectImg3 = imgGroup[2].picUrl
            this.pictureList = []
            if(this.choseWidthHeight01 === '自定义') {
                this.writeHeight = this.currentTemplateItem.options.styleInfoList[0].picHeight
            }
            if((parseInt(this.ImgNum) > parseInt(this.ImgDefaultNum))&& parseInt(this.flagType) >= 6) {
                let Num = parseInt(this.ImgNum) - parseInt(this.ImgDefaultNum)
                for(let a = 0;a < Num;a++) {
                    this.pictureList.push({upbtnGroup: false,showSelectImg:imgGroup[a+3].picUrl,width: this.imgName.width1,height:this.imgName.height1,showbottomSilde:false})      
                }
            }
        }
    },
    updated() {
        // this.updateFloor()
    },
    components: {
        cropper,
        linkPanel,
        chooseMaterial
    },
}
</script>

<style lang="scss" scoped>
.imageTemplate__style{
    & {
        background: #ffffff;
        padding: 0 20px;

        .carousel__Specifications img{
            margin: 0;
        }
    }
    .imageTemplate{
        margin-top: 22px;
    }
    & .el-form {
        padding: 20px 0 4px 0;
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
    .addColorStyle .el-form-item__label {
        // color: #D0021B;
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
    & .nomal__margin .el-form-item__label{
        padding: 0 20px 0 0;
        // color: #D0021B;
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
    .el-input-number.is-controls-right .el-input-number__decrease{
        right: 0px;
        bottom: 0px;
        top: auto;
        left: auto;
        border-right: none;
        border: 1px solid #dcdfe6;
        border-radius: 0 0px 4px 4px;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
        border-radius: 4px 4px 0 0;
        right: 0px;
        top: 0px;
        border: 1px solid #dcdfe6;
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
        // display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .carousel__content__body .carousel__content__body__text{
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
        width:43px;
    }
    .carousel__Specifications {
        display: flex;
        margin-left: 30px;
        align-items: center;
        
    }
    .imgWidth {
        width: 288px
    }
    .imgHeight {
        height: 288px
    }
    .carousel__Specifications span {
        font-family: MicrosoftYaHeiUI;
        color:#CACCD2;
        font-size: 12px;
        width:73px;
    }
    & .carousel__Specifications .showImg{
        margin-left: 190px;
    }
    .arousel__peration{
        display: flex;
        width: 288px;
        background: rgba($color: #000000, $alpha: 0.5);
        height: 40px;
        align-items: center;
        // margin-left: 72px;
        position: absolute;
        bottom: 0;
        :first-child{
            margin-left: 228px;
        }
        :nth-child(2){
            margin-left: 10px;
        }
    }

    /* 新增样式 */
    & .del__color__margin .el-form-item__label{
        color: #323C41;
        padding: 0 20px 0 0;
    }

    & .change__radio {
        margin-bottom: 0;
        box-shadow: inset 0 1px 0 0 #F5F5FA;
    }
    & .change__radio .el-radio-group {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 283px;
        padding-top: 14px;
    }
    & .change__radio .el-radio-group>:last-child {
        margin-left: 0;
        margin-top: 20px;
    }
    & .four__radio .el-radio-group>:nth-child(4) {
        margin-left: 0;
        margin-top: 20px;
    }
    & .four__radio .el-radio-group>:last-child {
        margin-left: 45px;
        margin-top: 20px;
    }
    // & .change__radio .el-radio-group>:last-child .el-radio__label{
    //     color: #D0021B;
    // }
    // & .add__radio>:last-child .el-radio__label{
    //     color: #D0021B;
    // }
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
    .splitBtn {
        background: #CACCD2;
        border-radius: 1px;
        width: 32px;
        height: 2px;
        margin-left: 52px;
        position: relative;
        cursor: pointer;
        top: -11px;
        left: 275px;
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
    .topBottomMargin .el-form-item__label {
        // color:#D0021B;
    }
    .leftOrRight{
        color:#323C41;
    }
    & .change__radio{
        margin-bottom: 20px;
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
// .file {
//     display: inline-block;
//     width: 240px;
//     height: 240px;
//     // background: green;
//     opacity: 0;
//     position: absolute;
//     left: 0;
//     top: 0;
// }

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

// .floor_save:hover,
// .floor_save:active{
//     opacity: 0.8;
// }
.el__radio__blank {
        display: flex;
        align-items: center;
    }
    .own__blank {
        display: flex;
        align-items: center;
    }
    .el__radio__blank .el-radio__input {
        padding: 13px 0;
    }
    .ownHeight {
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
    .own__blank{
        .el-input {
            width: 147px;
            height: 40px;
            font-size: 12px;
            color: #323C41;
            .el-input__inner {
                border-radius: 0px;
                padding-left: 60px;
                background: #fafafc;
            }
        }
    }
    .clock__btn {
        width: 40px;
        height: 40px;
        padding: 10px;
        border: 1px solid #DDE0E4;
        border-radius: 2px;
        border-left-style: none;
        border-top-left-radius: 0%;
            border-bottom-left-radius: 0%;
    }
.el-radio + .el-radio {
    // margin-left: 57px;
}
& .four__radio .el-radio-group{
    margin: 0;
}
& .four__radio .el-radio-group{
    margin: 0;
}
& .change__radio .el-radio-group {
    padding-top:20px;
}
.change__radio .el-form-item__label{
    margin-top: 7px;
}
.dialogImage{
    .el-input {
        width: 100%;
    }
    .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding-left: 15px;
    }
    .image-contaner{
        display: flex;
        justify-content: space-between;
        padding: 32px 32px 0 32px;
    }
    .container-left{
        width: 176px;
    }
    .left-container{
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3671FF;
        border-radius: 2px;
        cursor: pointer;
    }
    .upload-imgList{
        width: 0;
        height: 0;
    }
    .left-container span{
        font-family: MicrosoftYaHeiUI;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 1px;
        text-align: center;
        line-height: 20px;
    }
    .group-imgage{
        width: 176px;
        display: flex;
        justify-content: flex-start;
        padding-top: 24px;
        flex-direction: column;
        max-height: 590px;
        overflow-y: auto;
    }
    .group-item{
        width: 176px;
        height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .group-item:hover{
        background: #F2F8FF;
    }
    .checkedGroup{
        background:  #F2F8FF;
    }
    .group-item span{
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        line-height: 16px;
    }
    .container-right{
        width: 528px;
    }
    .head-search{
        display: flex;
        justify-content: flex-end;
        align-content: center;
    }
    .search-button{
        width: 240px;
    }
    .imgage-box{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 20px;
    }
    .image-item{
        width: 120px;
        height: 160px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-bottom: 24px;
        position: relative;
        .checkedImage{
            width: 20px;
            height: 20px;
            font-size: 20px;
            position: absolute;
            top: 4px;
            right: 4px;
            color: #3671FF ;
        }
    }
    .image-item .imgage{
        width: 120px;
        height: 120px;
        border: 1px solid #DDE0E4;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 10px;
        cursor: pointer;
    }
    .image-item .imgage>img{
        max-width: 120px;
        max-height: 118px;
    }
    .image-item >span{
        width: 120px;
        height: 40px;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        line-height: 40px;
        overflow: hidden;
    }
    .pagination{
        display: flex;
        justify-content: flex-end;
        // padding: 32px 0px 32px 0;
    }
    .el-pagination .el-select .el-input .el-input__inner{
        width: 100px !important;
        height: 28px !important;
    }
    .el-pagination__jump .el-input__inner{
        width: 46px !important;
        height: 28px !important;
    }
    .loading {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px; /* 高度的一半 */
        margin-left: -10px;
        animation: load 1s linear infinite;
    }
    @keyframes load
        {
            from{-webkit-transform:rotate(0deg);}
            to{-webkit-transform:rotate(360deg);}
        }

        .loading_text {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #666666;
            text-align: center;
            padding-top: 50px;
        }
}
}
</style>


