<template>
    <div class="carouselPalace__style">
        <div class="gauge__content" v-if="flag == '01'">
            <div class="gauge__content__head gauge__content__head_bg">
                <span class="gauge__content__head__text">背景图片</span>
                <div class="gauge__content__head__middle">
                    <div class="gauge__content__head__specifications">
                        <div @click="changeCarouselImg('background')">
                            <img class="showImg" :src="concatImageUrl(backgroundUrl)" v-if="backgroundUrl">
                            <img src="../../../assets/add1.png" v-show="!backgroundUrl">
                            <div class="ratioText" v-show="!backgroundUrl">375x222@2x</div>
                        </div>
                    </div>
                </div>
                <div class="gauge__head__right">
                    <div class="icon__box icon__box__bg"><img :src="concatImageUrl(iconDelImg)" alt="" @click="delBackground()"></div>
                </div>
            </div>
        </div>
        <div class="gauge__content" v-if="flag == '01'">
            <div class="gauge__content__head carouselPalace_notetype_con">
                <span class="gauge__content__head__text">显示内容</span>
                <div class="gauge__head__right carouselPalace_notetype_right">
                    <div class="flex__box palace_boxshadow">
                        <div>
                            <el-radio-group v-model="noteType" @change="updateFloor()">
                                <el-radio label="">全显</el-radio>
                                <el-radio label="0">仅宫格</el-radio>
                                <el-radio label="1">仅轮播</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gauge__content" v-if="!noteType || noteType == '0'">
            <div class="gauge__content__head">
                <span class="gauge__content__head__text">宫格内容</span>
                <div class="gauge__head__right">
                    <!-- <div class="icon__box" @click="addPalace"><img class="add" src="../../../assets/addPalace.png" alt=""></div> -->
                    <div class="icon__box"><img class="edit" src="../../../assets/edit2.png" alt="" @click="dialogFormVisible=true"></div>
                </div>
            </div>
            <div>
                <div class="gauge__content_body" v-for="(menuInfo, index) in iMenuList" :key="index">
                    <span class="gauge__content__body__text" v-text="'宫格1-' + (index+ 1)"></span>
                    <div class="gauge__Specifications">
                        <div>
                            <img class="showImg" :src="concatImageUrl(menuInfo.IconX2)" alt="">
                        </div>
                    </div>
                    <div class="gauge__info__peration">
                        <el-input class="gauge__info" v-model="menuInfo.menuName" disabled></el-input>
                        <div class="gauge__peration">
                            <img src="../../../assets/link_gray.png" @click="editPalace(index)">
                            <img :src="index != 0 ? iconUpActiveImg : iconUpStopImg" alt="" @click="listUp(iMenuList, index)">
                            <img :src="index != iMenuList.length-1 ? iconDownStopImg : iconDownActiveImg" alt="" @click="listDown(iMenuList, index)">
                            <img :src="iconDelImg" alt="" @click="delPalace(index)">
                        </div>
                    </div>
                </div>
                <div class="gauge__info__palace_notice" v-if="iMenuList.length == 0">暂无宫格数据，请点击右上角的编辑功能编辑</div>
            </div>
        </div>
        <div class="gear__set__edit" v-if="!noteType || noteType == '1'">
            <el-form>
                <el-form-item v-if="flag == '01'" label="轮播样式" class="nomal__font__color el-form-item__content_color">
                    <el-select v-model="carouselType" placeholder="请选择" @change="updateFloor()">
                        <el-option
                            v-for="item in carouselTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮播器" v-if="flag == '01'">
                    <el-radio-group v-model="carouselCycleType" @change="updateFloor">
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
                <el-form-item v-if="flag == '01'" label="颜色值" class="nomal__font__color el-form-item__content_color">
                    <div class="carousel_pagination_color">
                        <el-input v-model="carouselPaginationColor" @change="updateFloor()"></el-input>
                        <el-color-picker v-model="carouselPaginationColor" @change="updateFloor()"></el-color-picker>
                    </div>
                </el-form-item>
                <el-form-item label="轮播列表">
                    <img class="carousel_container_list" src="../assets/add.png" alt=""  @click="addCarousel"/>
                </el-form-item>
            </el-form>
        </div>
        <div class="oncrete__attributes" v-if="!noteType || noteType == '1'">
            <div class="carousel__content__body" v-for="(item, index) in iCarouselList" :key="index">
                <div style="display: flex">
                    <span class="carousel__content__body__text" v-text="'轮播' + (index+1)"></span>
                    <div class="carousel__Specifications" @click="changeCarouselImg(index)">
                        <img class="showImg" :src="concatImageUrl(item.picUrl)" alt="" v-if="item.picUrl">
                        <img src="../../../assets/add1.png" alt=""  v-if="!item.picUrl">
                        <span class="ratioText" v-if="!item.picUrl">{{item.picWidth}}x{{item.picHeight}}@2x</span>
                    </div>
                </div>
                <div class="arousel__peration">
                    <img :src="iconlinkImg" alt="" @click="showMenuSetting(item, index)">
                    <img :src="index!=0?iconUpActiveImg:iconUpStopImg" alt="" @click="listUp(iCarouselList, index)">
                    <img :src="index!=iCarouselList.length-1?iconDownStopImg:iconDownActiveImg" alt="" @click="listDown(iCarouselList, index)">
                    <img :src="iconDelImg" alt="" @click="delCarousel(item, index)">
                </div>
            </div>
        </div>
        <div class="floor_save" @click="saveFloor">
                <button>楼层保存</button>
            </div>
        <el-dialog title="从菜单导入" :visible.sync="dialogFormVisible">
            <menu-list-tree ref="menulisttree"/>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getMenuList">确定</el-button>
            </div>
        </el-dialog>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <palace-setting v-if="isShowMt" :optionsIndex = "clickIndex" @imgChange="updateIcon" @back="linkBack" @changeName = "changeName"/>
            <!-- <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/> -->
        </transition>
        <transition name="slideleft">
            <!-- <palace-setting v-if="isShowMt" :optionsIndex = "clickIndex" @imgChange="updateIcon" @back="linkBack" @changeName = "changeName"/> -->
            <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack1"/>
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
import { API } from '~/config/api'
import { eidtFloor, eidtStyle, eidtPalaceStyle,eidtPalaceStyleNew } from '../../../utils/api'
import { getCookie } from '../../../../../utils/cookie'
import cropper from '../../common/cropper'
import linkPanel from '../components/popup/linkPanel'
import menuListTree from '../components/popup/menuListTree'
import palaceSetting from '../components/popup/palaceSetting'
import mixins from '../../../../../constants/mixins.js'
import chooseMaterial from '^/chooseMaterial'

export default {
    mixins,
    components: {
        menuListTree,
        cropper,
        linkPanel,
        palaceSetting,
        chooseMaterial
    },
    data() {
        return {
            isShowMaterial: false,
            imgOption: [],
            isShowMt: false,
            topDistance: '',
            bottomDistance: '',
            dialogFormVisible: false,  // 宫格内容从菜单中选择
            
            iconlinkImg: require('../../../assets/edit3.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del3.png'),
            menuType: '01',
            bSeniorOptions: false,  //高级选项

            backgroundUrl: '',
            iPalaceList: [],
            iCarouselList: [],

            iMenuList: [],
            palaceDefaultNum: 0,
            palaceMaxNum: 4,

            carouselPaginationColor: '#000000',
            carouselCycleType: 0,

            imgType: '',
            imgName: '',
            isDisabled: false,
            clickIndex: {},
            linkOptions: {},
            carouselIndex: '',
            setPicWidth: null,
            setPicHeight: null,

            noteType: '',
            carouselTypeList: [
                {label: '平铺式', value: '2'},
                {label: '堆叠式', value: '1'}
            ],
            carouselType: '2'
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
            
        },
        currentTemplateItem(nval) {

        }
    },
    created() {
        window.property = this
        // this.initList()
        this.updateProperty()
    },
    methods: {
        backImg(imgArr) {
            if(this.carouselIndex == 'background'){
                this.backgroundUrl = imgArr[0].showSelectImg
            }else{
                this.iCarouselList[this.carouselIndex].picUrl = imgArr[0].showSelectImg
            }
            this.isShowMaterial = false
            this.updateFloor()
        },
        getMaterialUrlList() {
            if(this.carouselIndex == 'background'){
                this.backgroundUrl = this.$refs.chooseMaterial.getParentImage()
            }else{
                this.iCarouselList[this.carouselIndex].picUrl = this.$refs.chooseMaterial.getParentImage()
            }
            this.isShowMaterial = false
            this.updateFloor()
        },
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        // 非点击加号上传图片
        changeCarouselImg(i) {
            this.isShowMaterial = true
            this.carouselIndex = i
            if(this.flag == '01'){
                this.setPicWidth = 335
                this.setPicHeight = 100
            }else{
                this.setPicWidth = 375
                this.setPicHeight = 192
            }
            // this.addType = type
            this.imgOption = [this.setPicWidth, this.setPicHeight, 2]
        },
        editPalace(i) {
            this.isShowMt = true
            this.clickIndex = {
                index: i,
                Icon: this.iMenuList[i].Icon,
                IconX2: this.iMenuList[i].IconX2,
                IconX3: this.iMenuList[i].IconX3,
                
                palaceName: this.iMenuList[i].menuName,
                linkType: this.iMenuList[i].jumpType,
                linkAdress: this.iMenuList[i].menuUrl,
                isLogin: this.iMenuList[i].loginFlag,
                isNeedId: this.iMenuList[i].isSendId,
                // superscript: this.iMenuList[i].rightFlag,

                // superscriptContent: this.iMenuList[i].rightmsg,
                superscriptContent: this.iMenuList[i].rightFlag,

                packDate3: this.iMenuList[i].beginDate,
                packDate4: this.iMenuList[i].endDate,
                merchantLogo: this.iMenuList[i].ismerchant,
                lofoContent: this.iMenuList[i].merchantMSG,
                windowSign: this.iMenuList[i].frameFlag,
                signContent: this.iMenuList[i].frameMSG,
                newFlag: this.iMenuList[i].newFlag
            }
        },
        linkBack (obj) {
            this.isShowMt = false
            let a = obj.linkType
            // if(obj.linkType === '1') {
            //     a = '0'
            // }else if (obj.linkType === '2') {
            //     a  = '2'
            // }else {
            //     a = '1'
            // }
            this.iMenuList[obj.index].beginDate = obj.packDate3
            this.iMenuList[obj.index].endDate = obj.packDate4
            this.iMenuList[obj.index].menuName = obj.palaceName
            this.iMenuList[obj.index].loginFlag = obj.isLogin ? '1' : '0'
            this.iMenuList[obj.index].isSendId = obj.isNeedId ? '1' : '0'
            this.iMenuList[obj.index].menuUrl = obj.linkAdress
            // this.iMenuList[obj.index].newFlag = obj.superscript === '2' ? '1' : '0'
            this.iMenuList[obj.index].jumpType = a
            // superscriptContent: "" 888
            // this.iMenuList[obj.index].rightmsg = obj.superscriptContent
            this.iMenuList[obj.index].rightFlag = obj.superscript === '2' ? 'NEW' : obj.superscriptContent
            this.iMenuList[obj.index].ismerchant = obj.merchantLogo ? '1' : '0'
            this.iMenuList[obj.index].merchantMSG = obj.lofoContent
            this.iMenuList[obj.index].frameFlag = obj.windowSign ? '1' : '0'
            this.iMenuList[obj.index].frameMSG = obj.signContent
            // this.iMenuList[obj.index].rightFlag = obj.superscript === '1' ? '0' : '1'
            this.iMenuList[obj.index].newFlag = obj.superscript === '1' ? '0' : '1'
            
            // this.iMenuList[obj.index].IconX2 = obj.palaceList[1].icon
            console.log(this.iMenuList[obj.index])
            console.log(obj)
            this.updateFloor()
        },
        updateIcon(obj) {
            this.iMenuList[this.clickIndex.index].IconX2 = obj
            this.updateFloor()
        },
        changeName(name) {
            this.iMenuList[this.clickIndex.index].menuName = name
            this.updateFloor()
        },

        getMenuList () {
            this.menuInfo = this.$refs.menulisttree.getMenuInfo()
            this.iMenuList = this.menuInfo.menuList
            this.dialogFormVisible = false

            //更新楼层
            this.updateFloor()
        },

        delBackground () {
            this.backgroundUrl = ''
            //更新楼层
            this.updateFloor()
        },

        createPalace (option) {
            return Object.assign({
                picUrl: '',
                palaceName: '',
                picWidth: 36,
                picHeight: 36,
                ratio: 2
            }, option)
        },

        /**
         * 添加宫格
         */
        addPalace () {
            console.log(`${this.iPalaceList.length}==== ${this.palaceMaxNum}`)
            //宫格最多加 4个
            if(this.iPalaceList.length >= this.palaceMaxNum){
                this.$alert('无法添加更加的宫格', '提示', {
                    confirmButtonText: '确定'
                })
                return
            }
            this.iPalaceList.push(this.createPalace())
        },

        /**
         * 删除指定索引处的宫格
         */
        delPalace (index) {
            this.iMenuList.splice(index, 1)

            this.updateFloor()
        },

        /**
         * 创建轮播项
         */
        createCarousel (option) {
            let picWidth, picHeight
            if(this.flag == '01'){
                picWidth = 335
                picHeight = 100
            }else{
                picWidth = 375
                picHeight = 192
            }

            return Object.assign({
                picUrl: '',
                picWidth: picWidth,
                picHeight: picHeight,
                ratio: 2
            }, option)
        },

        /**
         * 添加轮播项
         */
        addCarousel () {
            this.iCarouselList.push(this.createCarousel())
        },

        /**
         * 删除轮播项
         */
        delCarousel (item, i) {
            if (this.iCarouselList.length == 1){
                this.$alert('至少输入一个轮播项', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                })
                return
            }

            if(item.picUrl){
                this.$confirm('您确定删除该个轮播项吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.iCarouselList.splice(i, 1)
                    this.updateFloor()
                })
            }else{
                this.iCarouselList.splice(i, 1)
                this.updateFloor()
            }
        },

        listUp(iList, index) {
            if(index == 0) return 
            let currItem = iList[index]
            let nextItem = iList[index - 1]

            this.$set(iList, index - 1, currItem)
            this.$set(iList, index, nextItem)

            this.updateFloor()
        },

        listDown(iList, index) {
            if(index == iList.length - 1) return 
            let currItem = iList[index]
            let nextItem = iList[index + 1]

            this.$set(iList, index + 1, currItem)
            this.$set(iList, index, nextItem)

            this.updateFloor()
        },

        showMenuSetting (item, index) {
            if(!item.picUrl){
                return 
            }
            console.dir(1212)
            this.linkOptions = item
            this.setting_item = item
            this.bSeniorOptions = true
        },

        linkBack1 (obj) {
            //链接值
            Object.assign(this.setting_item, obj)
            this.bSeniorOptions = false
        },

        updateProperty () {
            let data = this.currentTemplateItem.options
            let styleInfoList = data.styleInfoList

            this.iCarouselList.length = 0
            this.iPalaceList.length = 0

            this.backgroundUrl = data.picUrl
            this.carouselCycleType = parseInt(data.cycleType || 0, 10)

            //兼容默认
            this.noteType = data.noteType || ''

            //更新属性计算
            styleInfoList.forEach((info) => {
                if(info.contentType == '1'){
                    this.iCarouselList.push(this.createCarousel({
                        picUrl: info.picUrl,
                        isIdNeeded: info.isIdNeeded,
                        isLoginNeeded: info.isLoginNeeded,
                        picLinkType: info.picLinkType,
                        picLink: info.picLink
                    }))

                    //轮播样式  兼容默认空值
                    this.carouselType = info.fieldset2 || '2'

                }else if(info.contentType == '2'){
                    this.iMenuList = info.strJson ? JSON.parse(info.strJson) : []
                    this.iPalaceList.push(this.createPalace({
                        menuId: info.menuId     //菜单树ID
                    }))
                }
            })
        },

        updateFloor () {
            let item = {
                cycleType: `${this.carouselCycleType}`,
                picUrl: this.backgroundUrl,
                color: this.carouselPaginationColor,
                noteType: (this.noteType || ''),
                styleInfoList: []
            }, info

            if(!this.noteType || this.noteType == '1'){
                for(let i = 0; i < this.iCarouselList.length; i++){
                    info = this.iCarouselList[i]
                    item.styleInfoList.push({
                        contentType: '1',
                        picUrl: info.picUrl,
                        isIdNeeded: info.isIdNeeded,
                        isLoginNeeded: info.isLoginNeeded,
                        picLinkType: info.picLinkType,
                        picLink: info.picLink,
                        fieldset2: this.carouselType
                    })
                }
            }

            if(!this.noteType || this.noteType == '0'){
                info = this.iPalaceList[0] || {}
                item.styleInfoList.push({
                    contentType: '2',
                    menuId: info.menuId,
                    strJson: JSON.stringify(this.iMenuList)
                })
            }

            // for(let i = 0; i < this.iPalaceList.length; i++){
            //     info = this.iPalaceList[i]
            //     item.styleInfoList.push({
            //         contentType: '2',
            //         menuId: info.menuId,
            //         strJson: JSON.stringify(this.iMenuList)
            //     })
            // }

            this.$emit('setMenuStyleOptions', item)
        },

        saveFloor () {
            let shufflingList = [], info
            let widthF, heightF, picWidth, picHeight

            if(this.flag == '01'){
                widthF = 375
                heightF = 286
                picWidth = 335
                picHeight = 100
            }else{
                widthF = 375
                heightF = 246
                picWidth = 375
                picHeight = 192
            }

            for(let i = 0; i < this.iCarouselList.length; i++){
                info = this.iCarouselList[i]
                shufflingList.push({
                    contentType: '1',
                    picUrl: info.picUrl,
                    floorId: this.options.floorId,
                    styleName: this.currentTemplateItem.name,
                    styleType: this.currentTemplateItem.subkind,
                    ordernNum: '' + i,
                    isIdNeeded: info.isIdNeeded,
                    isLoginNeeded: info.isLoginNeeded,
                    picLinkType: info.picLinkType,
                    picLink: info.picLink,
                    picWidth: picWidth,
                    picHeight: picHeight,
                    fieldset2: this.carouselType
                })
            }

            if(this.noteType == '0'){
                //仅显示宫格
                heightF = 158
            }else if(this.noteType == '1'){
                //仅显示轮播
                if(this.carouselType == '2'){
                    heightF = 202
                }else{
                    heightF = 248
                }
            }

            //楼层修改
            eidtFloor({
                pageId: this.options.pageId,
                floorId: this.options.floorId,
                floorType: this.currentTemplateItem.kind,
                floorName: this.currentTemplateItem.name,
                floorIsAd: '0',
                styleType: this.currentTemplateItem.subkind,
                orderNum: '0',
                picUrl: this.backgroundUrl,
                color: this.carouselPaginationColor,
                cycleType: this.carouselCycleType + '',
                widthF: widthF,
                heightF: heightF,
                noteType: this.noteType || ''
            })

            let syncHandlers = []

            //轮播样式处理
            if(!this.noteType || this.noteType == '1'){
                syncHandlers.push(eidtStyle({
                    floorId: this.options.floorId,
                    floorType: this.currentTemplateItem.kind,
                    shufflingList: shufflingList
                }))
            }

            let squareInputList = []
            let menuInfo

            for(let i = 0; i < this.iMenuList.length; i++){
                menuInfo = this.iMenuList[i]
                squareInputList.push({
                    menuId: menuInfo.menuId,
                    ordernNum: '' + i
                })
            }

            let palaceInfo = this.iPalaceList[0] || {}

            //宫格样式处理
            if(!this.noteType || this.noteType == '0'){
                let palaceHandler = ''
                syncHandlers.push(palaceHandler = eidtPalaceStyleNew({
                    floorId: this.options.floorId,
                    styleType: this.currentTemplateItem.subkind,
                    pageType: this.options.pageType,
                    styleName: this.currentTemplateItem.name,
                    appVersion: (this.iMenuList[0] || {}).appVersion,
                    // menuName:  this.menuName,
                    appId: (this.iMenuList[0] || {}).appVersion,
                    menuName: (this.options.pageType == '00' ? '首页' :(this.options.pageType == '01' ? '信用卡' : (this.options.pageType == '02' ? '理财投资':(this.options.pageType == '03'?'生活': '我的')))) + '-' + this.$route.query.pageName + '-' + '宫格',
                    contentType: '2',
                    treeId: palaceInfo.menuId,
                    // squareInputList: squareInputList
                    menuQueryList: this.iMenuList
                }))

                palaceHandler.then((res) => {
                    if(res.data.body.treeId){
                        palaceInfo.menuId = res.data.body.treeId
                        palaceInfo.menuName = this.menuName
                        this.menuId = palaceInfo.menuId
                    }
                })
            }

            Promise.all(syncHandlers).then((res) => {
                this.handleMsg (res[0], '保存成功', '保存失败')
                this.updateFloor()
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
        }
    }
}
</script>

<style lang="scss" scoped>
.carouselPalace__style {
    background: #ffffff;
    padding: 0 20px;

    & .el-form {
        padding: 20px 0 4px 0;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
    }
    & .add__boxShow {
        padding: 20px 0 4px 0;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
    }
    
    & .el-form-item__content_color .el-form-item__content{
        display: flex;
    }

    & .el-form-item__content_color .el-form-item__content .el-input{
        width: 248px;
        height: 40px;
    }

    & .el-form-item__content_color .el-form-item__content .el-input .el-input__inner{
        border-radius: 4px 0 0 4px;
        border-right: none;
    }

    & .el-form-item__content_color .el-form-item__content .el-color-picker .el-color-picker__trigger{
        border-radius: 0 4px 4px 0;
    }
    
    .el-form-item {
        margin-bottom: 16px;
    }
    .el-form-item__label {
        padding: 0 33px 0 0;
    }
    
    & .el-form-item__label, & .el-input__inner {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        font-weight: 400;
        color: #323C41;
        letter-spacing: 0;
    }
    & .el-form-item__label {
        color: #D0021B;
    }
    .el-input-number {
        width: 288px;
        height: 40px;
    }
    & .el-input {
        height: 40px;
        width: 288px;
    }
    & .search-button .el-input {
        height: 40px;
        width: 240px;
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

    .gauge__content__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }

    .gauge__content__head_bg{
        align-items: inherit;
    }

    .gauge__content__head__text, .gauge__content__body__text {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }

    .gauge__head__right{
        display: flex;
    }

    .gauge__info__peration .el-input {
        width: 192px;
        height: 40px;

        .el-input__inner {
            width: 192px;
            height: 40px;
        }
    }
        

    .icon__box {
        width: 40px;
        height: 40px;
        padding: 10px;
    }

    .icon__box+.icon__box {
        margin-left: 10px;
    }

    .icon__box__bg{
        padding-top: 0;
        padding-bottom: 0;
    }

    .add, .edit {
        width: 20px;
        height: 20px;
    }

    .gauge__content_body {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }

    .gauge__content__head__specifications {
        width: 248px;
        height: 248px;
        background: #FAFAFC;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #DDE0E4;
        font-size: 12px;
        position: relative;
    }

    .gauge__Specifications {
        width: 80px;
        height: 80px;
        background: #FAFAFC;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
    }
    .gauge__Specifications .ratioText {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #DDE0E4;
        text-align: center;
    }

    .gauge__info {
        width: 192px;
        height: 40px;
    }
    .gauge__info span {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        line-height: 40px;
    }

    .gauge__peration {
        width: 192px;
        padding-left: 62px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & .el-dialog {
        width: 800px;

        .el-dialog__header {
            padding: 24px 40px;

            .el-dialog__headerbtn {
                top: 26px;
                right: 40px;
            }
        }

        .el-dialog__footer {
            padding: 20px 20px 20px;
            text-align: right;
            box-sizing: border-box;
        }
        .el-button:focus, .el-button:hover {
            color: #ffffff;
            border-color: #3671FF;
            background-color: #3671FF;
        }

    }

    .gear__set__edit .el-form-item {
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }

    .gear__set__edit .el-form-item__label, & .oncrete__attributes .el-form-item__label{
        color: #323C41;
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

    .oncrete__attributes {
        margin-top: 20px;
    }

    .oncrete__attributes .el-form {
        box-shadow: none;
    }

    & .nomal__font__color{
        display: flex;
    }

    & .nomal__font__color .el-form-item__label {
        margin-right: 13px;
    }

    & .oncrete__attributes .nomal__margin .el-form-item__label{
        padding: 0 20px 0 0;
        color: #D0021B;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #3671FF;
        background: #3671FF;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #323C41;
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
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .carousel__Specifications .ratioText {
        display: block;
        margin-top: 8px;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #DDE0E4;
    }

    .arousel__peration img{
        display: block;
        margin-bottom: 10px;
    }

    & .gauge__content__head__specifications .file,
    & .carousel__Specifications .file {
        display: inline-block;
        width: 240px;
        height: 240px;
        // background: green;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    & .gauge__Specifications .file {
        display: inline-block;
        width: 80px;
        height: 80px;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    & img{
        cursor: pointer;
    }

    & .cropper-box .el-dialog__body{
        padding: 0;
    }

    & .carousel__Specifications img{
        margin: 0;
    }

    & .gauge__info__palace_notice{
        color: #d0d2d4;
        text-align: center;
        background: #FAFAFC;
        padding: 20px 0;
    }

    .carousel_container_list{
        display: flex;
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

        .carousel_pagination_color{
            display: flex;
            justify-content: flex-start;
            align-items: center;
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

        .carouselPalace_notetype_con{
            justify-content: flex-start;
        }

        .carouselPalace_notetype_right{
            margin-left: 15px;
        }
}
    

</style>


