<template>
    <div class="secondFloor__style">
        <div class="menu__carousel__content">
            <div class="content__head">
                <div>
                    <span class="content__txt">提示图片</span>
                    <span class="content__placeholder" v-text="'375x812@2x'"></span>
                </div>
                <img src="../../../assets/addPalace.png" alt="" @click="showMaterial('1')" v-if="!uploadImgList[0].picUrl">
            </div>
            <div class="main__content__body" v-if="uploadImgList[0].picUrl != ''">
                <div class="uploadImg__body" @mouseout="uploadImgList[0].isShowActionBtn = false" @mouseover="uploadImgList[0].isShowActionBtn = true">
                    <img class="showImg" :src="concatImageUrl(uploadImgList[0].picUrl)" alt="" :style="{width:'288px',verticalAlign:'bottom'}" @click="showMaterial('1')">
                    <transition name="hide__show">
                        <div class="action__btn" v-if="uploadImgList[0].picUrl">
                            <div class="btn__flex">
                            </div>
                            <div class="btn__flex">
                                <!-- <img src="../../../assets/edit1.png" alt=""> -->
                                <img src="../../../assets/del1.png" alt="" @click="delSecondFloor">
                            </div>
                        </div>
                    </transition>
                </div>
                
            </div>
        </div>
        <div class="menu__carousel__content">
            <div class="content__head">
                <div>
                    <span class="content__txt">展示图片</span>
                    <span class="content__placeholder" v-text="'375x（812+）@2x'"></span>
                </div>
                    <img src="../../../assets/addPalace.png" alt=""  @click="showMaterial('2')" v-if="!uploadImgList[1].picUrl">
            </div>
            <div class="main__content__body"  v-if="uploadImgList[1].picUrl != ''">
                <div class="uploadImg__body" @mouseout="uploadImgList[1].isShowActionBtn = false" @mouseover="uploadImgList[1].isShowActionBtn = true">
                    <img  class="showImg" :src="concatImageUrl(uploadImgList[1].picUrl)" alt="" :style="{width:'288px',verticalAlign:'bottom'}" @click="showMaterial('2')">
                    <transition name="hide__show">
                        <div class="action__btn" v-if="uploadImgList[1].picUrl">
                            <div class="btn__flex">
                            </div>
                            <div class="btn__flex">
                                <img src="../../../assets/edit1.png" alt="" @click="showPopupBlank">
                                <img src="../../../assets/del1.png" alt="" @click="delSecondFloor1">
                            </div>
                        </div>
                    </transition>
                </div>
                
            </div>
        </div>
        <!-- <div class="floor_save" @click="sureForRpc">楼层保存</div> -->
        <div class="floor_save" @click="sureForRpc">
            <button>楼层保存</button>
        </div>

        <el-dialog title="选择素材" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
            <choose-material ref="chooseMaterial" :imgOption="imgOption" @backImgTemplate="backImg"></choose-material>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getMaterialUrlList">确定</el-button>
            </div>
        </el-dialog>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/>
        </transition>
    </div>
</template>

<script>
import { eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
import { API } from '~/config/api'
import cropper from '../../common/cropper'
import chooseMaterial from '^/chooseMaterial'
import linkPanel from '../components/popup/linkPanel'
import mixins from '../../mixins.js'
import { getCookie } from '../../../../../utils/cookie'
export default {
    mixins,
    components: {
        cropper, chooseMaterial, linkPanel
    },
    data() {
        return {
            isShowCropper: false, // 显示裁剪框
            bSeniorOptions: false,
            isShowMaterial: false,
            imgOption: [],
            cropwidth: null,
            cropheight: null,
            imgType: '',
            imgName: '',
            cropperImgUrl: '',
            isDisabled: false,
            uploadImgList: [{
                name: '提示图片',
                picUrl: '',
                upbtnGroup: false,
                isShowActionBtn: false
            },
            {
                name: '展示主图',
                picUrl: '',
                upbtnGroup: false,
                isShowActionBtn: false
            }],
            isShowMt: false,
            linkOptions: {},
            // 图片属性面板
            linkType: 1,
            linkAdress: '',
            isLogin: 0,
            isNeedId: 0,
            // 属性面板控制数组
            imgEditList: [],
            labelWidth: '70px',
            secondFloorIndex: 0,
            secondFloorList: [],
            menuOptions: {},
            secondIndex: '',
            setWidth: null,
            setHeight: null
        }
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
    // updated() {
    //     this.$nextTick(() => {
    //         this.menuOptions = {
    //             floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
    //             pageId: this.options.pageId,
    //             floorType: '00',
    //             floorName: '二楼',
    //             floorIsAd: '0',
    //             operatorId: this.options.operatorId,
    //             operator: this.options.operator,
    //             styleInfoList: this.secondFloorList
    //         }
    //         this.$emit('setMenuStyleOptions', this.menuOptions)
    //     })
    // },
    created() {
        console.dir(this.currentTemplateItem.options)
        // this.secondFloorList
        this.currentTemplateItem.options.styleInfoList.forEach((item, i) => {
            this.uploadImgList[i].picUrl = item.picUrl
            this.uploadImgList[i].upbtnGroup = true
            this.uploadImgList[i].isShowActionBtn = false
        })
    },
    methods: {
        linkBack (obj) {
            //链接值
            // Object.assign(this.setting_item, obj)
            console.log(obj)
            this.bSeniorOptions = false
            this.uploadImgList[1].isIdNeeded = obj.isIdNeeded
            this.uploadImgList[1].isLoginNeeded = obj.isLoginNeeded
            this.uploadImgList[1].picLink = obj.picLink
            this.uploadImgList[1].picLinkType = obj.picLinkType
            
        },
        showPopupBlank() {
            this.bSeniorOptions = true
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.linkOptions = {
                isIdNeeded: imgGroup[1].isIdNeeded,
                isLoginNeeded: imgGroup[1].isLoginNeeded,
                picLink: imgGroup[1].picLink,
                picLinkType: imgGroup[1].picLinkType,
                xPicUrl:''
            }
        },
        showMaterial(type) {
            this.isShowMaterial = true
            this.secondIndex = type
            if(type == '1') {
                this.setWidth = 375
                this.setHeight = 812
                this.imgOption = [this.setWidth, this.setHeight, 2]
            } else {
                this.setWidth = 375
                this.setHeight = 812
                this.imgOption = [this.setWidth, this.setHeight, 2]
            }
        },
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        backImg(imgArr) {
            if(this.secondIndex == '1') {
                this.uploadImgList[0].picUrl = imgArr[0].showSelectImg
            } else {
                this.uploadImgList[1].picUrl = imgArr[0].showSelectImg
            }
            this.isShowMaterial = false
        },
        getMaterialUrlList() {
            if(this.secondIndex == '1') {
                this.uploadImgList[0].picUrl = this.$refs.chooseMaterial.getParentImage()
            } else {
                this.uploadImgList[1].picUrl = this.$refs.chooseMaterial.getParentImage()
            }
            this.isShowMaterial = false
        },
        delSecondFloor() {
            this.uploadImgList[0].picUrl = ''
        },
        delSecondFloor1() {
            this.uploadImgList[1].picUrl = ''
        },
        editFloorStyleAllocation() {
            let secondFloorData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '00',
                floorName: '二楼',
                floorIsAd: '0',
                // orderNum: '',
                status: '0',
                widthF: '375',
                heightF: '812',
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(secondFloorData).then(res => {
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
        eidtMenuStyleRpc() {
            console.log(this.uploadImgList, 99999999)
            this.uploadImgList.forEach((info,i) => {
                this.secondFloorList.push({
                    styleName: '二楼',
                    picUrl: info.picUrl,
                    picLinkType: info.picLinkType,
                    picLink: info.picLink,
                    isLoginNeeded: info.isLoginNeeded,
                    isIdNeeded: info.isIdNeeded,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    ordernNum: i+1,
                    picHeight: '812',
                    picWidth: '375'
                })
            })
            let styleSecondData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                floorType: '00',
                secondFloorList: this.secondFloorList
            }
            eidtMenuStyleRpc(styleSecondData).then(res => {
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        // 模态框关闭回调
        handleDialogClose() {
            this.isShowCropper = false
            this.dialogFormVisible = true
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
            // this.eidtMenuStyleRpc()
        },
    }
}
</script>
<style lang="scss" scoped>

.secondFloor__style {

    .el-dialog {
        width: 800px;
    }

    .menu__carousel__content {
        padding: 20px 20px;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
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
            height:288px;
            

            .uploadImg__body {
                position: relative;
                width: 288px;
                height:288px;
                margin-top: 22px;
                margin-left: 72px;
                background: #FAFAFC;

                .showImg {
                    // width: 133px;
                    height: 288px;
                    padding-left: 77px;
                    padding-right: 78px;
                }

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
                    }
                }
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


