<template>
    <div class="palace__style">
        <div class="gauge">
            <el-form class="add__boxShow">
                <el-form-item label="宫格阴影" class="topBottomMargin">
                    <div class="flex__box palace_boxshadow">
                        <div @click="isSplitBtn = !isSplitBtn; updateFloor()" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="上下边距" class="topBottomMargin">
                    <div class="flex__box">
                        <div class="flex__box">
                            <div class="top__text">上</div>
                            <el-input-number v-model="topDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                        </div>
                        <div class="flex__box">
                            <div class="top__text">下</div>
                            <el-input-number v-model="bottomDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="gauge__content">
            <div class="gauge__content__head">
                <span class="gauge__content__head__text">宫格内容</span>
                <div class="gauge__head__right">
                    <div class="icon__box" >
                        <img class="showImg" src="../assets/add.png" alt="" @click="imgClick">
                        <img class="edit" src="../../../assets/edit2.png" alt="" @click="dialogFormVisible = true">
                    </div>
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
        <!-- <div class="floor_save" @click="saveFloor">楼层保存</div> -->
        <div class="floor_save" @click="saveFloor">
            <button>楼层保存</button>
        </div>
        <el-dialog title="从菜单导入" :visible.sync="dialogFormVisible">
            <menu-list-tree :treeName="menuName" ref="myMenulisttree"/>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getMenuList">确定</el-button>
            </div>
        </el-dialog>
        <transition name="slideleft">
            <palace-setting v-if="isShowMt" :optionsIndex = "clickIndex" @imgChange="updateIcon" @back="linkBack" @changeName = "changeName"/>
            <!-- <link-panel v-if="isShowMt" :options="linkOptions" @back="linkBack"/> -->
        </transition>
    </div>
</template>

<script>
import menuListTree from '../components/popup/menuListTree'
import linkPanel from '../components/popup/linkPanel'
import palaceSetting from '../components/popup/palaceSetting'
import { eidtFloor, eidtStyle, eidtPalaceStyle,eidtPalaceStyleNew } from '../../../utils/api'
import { getMenuUpdate } from '~/config/api'
import mixins from '../../../../../constants/mixins.js'

export default {
    mixins,
    components: {
        menuListTree,linkPanel,palaceSetting
    },
    data() {
        return {
            topDistance: '',
            bottomDistance: '',
            dialogFormVisible: false,  // 宫格内容从菜单中选择
            uploadImgList: [],
            iconlinkImg: require('../../../assets/edit1.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del_gray.png'),
            isShowMt: false,
            menuType: '02',
            styleFlagNum: 1,
            addStyleNum: 1,
            styleType: '',
            allTableData:[], // 宫格菜单列表展示
            tableColums:[],
            initCurrentIndex:'',
            ids:[],
            iMenuList:[],
            updateFlag:1,
            linkOptions: {},
            clickIndex: {},
            isSplitBtn: false
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
   

    created() {
        this.menuId = ''
        console.log(this.currentTemplateItem.options,1123123)
        this.updateProperty()
    },

    methods: {
        imgClick() {
            this.iMenuList.push({
                IOSVersion: "",
                Icon: "",
                IconX2: "",
                IconX3: "",
                addFlag: "",
                androidVersion: "",
                appId: "",
                appVersion: "",
                beginDate: "",
                bsnCode: "",
                canSeach: "",
                channel: "",
                count: "",
                createDate: "",
                delFlag: "",
                desc: "",
                endDate: "",
                frameFlag: "",
                frameMSG: "",
                isSendId: "",
                ismerchant: "",
                jumpType: "",
                level: "",
                location: "",
                loginFlag: "",
                menuId: "",
                menuLevel: "",
                menuName: "",
                menuParentId: "",
                menuSerno: "",
                menuUrl: "",
                menuVersion: "",
                merchantMSG: "",
                merchantPWD: "",
                modifyDate: "",
                newFlag: "",
                path: "",
                platType: "",
                rightFlag: "",
                state: "",
                suitRange: "",
                whiteFlag: "",
            })
            this.iMenuList[this.iMenuList.length - 1].menuSerno = this.iMenuList.length + ''
            this.updateFloor()
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
        updateIcon(obj) {
            this.iMenuList[this.clickIndex.index].IconX2 = obj
            this.iMenuList[this.clickIndex.index].IconX3 = obj
            console.log(this.iMenuList,123232312)
            this.updateFloor()
        },
        changeName(name) {
            this.iMenuList[this.clickIndex.index].menuName = name
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
        updateProperty () {
            let data = this.currentTemplateItem.options
            let styleInfoList = data.styleInfoList

            this.topDistance = data.topMargin
            this.bottomDistance = data.bottomMargin
            // console.info(this.$route.query.pageName,632187617236)
            //更新属性计算
            let info = styleInfoList[0] || {}
            this.iMenuList = info.strJson ? JSON.parse(info.strJson) : []
            this.menuId = info.menuId
            this.menuName = info.menuName
            //有阴影
            this.isSplitBtn = info.fieldset1 == '1'
        },

        getMenuList() {
            this.menuInfo = this.$refs.myMenulisttree.getMenuInfo()
            this.menuName = this.menuInfo.treeName || this.menuName
            this.iMenuList = this.menuInfo.menuList
            this.dialogFormVisible = false
            this.updateFloor()
        },
        
        backMenu() {
            this.isShowMt = false
        },

        handleChange () {
            this.updateFloor()
        },

        delPalace (index) {
            this.iMenuList.splice(index, 1)
            this.updateFloor()
        },

        listUp(iList, index) {
            if(index == 0) return 
            let currItem = iList[index]
            let nextItem = iList[index - 1]

            currItem.menuSerno = index + ''
            nextItem.menuSerno = index + 1 + ''

            this.$set(iList, index - 1, currItem)
            this.$set(iList, index, nextItem)
            console.log(iList,12)
            this.updateFloor()
        },

        listDown(iList, index) {
            if(index == iList.length - 1) return 
            let currItem = iList[index]
            let nextItem = iList[index + 1]
            
            currItem.menuSerno = index + 2 + ''
            nextItem.menuSerno = index + 1 + ''

            this.$set(iList, index + 1, currItem)
            this.$set(iList, index, nextItem)
            console.log(iList,1245)
            this.updateFloor()
        },

        updateFloor () {
            let item = {
                topMargin: this.topDistance,
                bottomMargin: this.bottomDistance,
                styleInfoList: []
            }, info

            item.styleInfoList.push({
                menuId: this.menuId,
                fieldset1: !!this.isSplitBtn ? '1' : '0',
                strJson: JSON.stringify(this.iMenuList)
            })

            this.$emit('setMenuStyleOptions', item)
        },

        saveFloor () {
            let shufflingList = []
            let data = this.currentTemplateItem.options
            let styleInfoList = data.styleInfoList || []
            let info = styleInfoList[0] || {}
            let heightF = ''

            switch(this.currentTemplateItem.subkind){
                case '10':
                heightF = '132'
                    break;
                case '08':
                    heightF = '132'
                    break;
                case '05':
                heightF = '62'
                    break;
                case '04':
                    heightF = '62'
                    break;
                case '02':
                    heightF = '52'
                    break;
            }

            heightF = parseInt(heightF, 10) + parseInt(this.topDistance, 10)
                 + parseInt(this.bottomDistance, 10)

            if(this.isSplitBtn){
                //有阴影
                heightF += 16
            }

            //楼层修改
            eidtFloor({
                pageId: this.options.pageId,
                floorId: this.options.floorId,
                floorType: this.currentTemplateItem.kind,
                floorName: this.currentTemplateItem.name,
                floorIsAd: '0',
                styleType: this.currentTemplateItem.subkind,
                topMargin: this.topDistance,
                bottomMargin: this.bottomDistance,
                widthF: '375',
                heightF: heightF
            })

            let squareInputList = []
            let menuInfo

            // for(let i = 0; i < this.iMenuList.length; i++){
            //     menuInfo = this.iMenuList[i]
            //     squareInputList.push({
            //         menuId: menuInfo.menuId,
            //         // ordernNum: '' + i

            //         // addFlag
            //         // androidVersion
            //         // appVersion
            //         // beginDate
            //         // bsnCode
            //         // canSeach
            //         // channel
            //         // count
            //         // createDate
            //         // delFlag
            //         // desc
            //         // endDate
            //         // frameFlag
            //         // frameMSG
            //         // Icon
            //         // IconX2
            //         // IconX3
            //         // IOSVersion
            //         // ismerchant
            //         // isSendId
            //         // jumpType
            //         // location
            //         // loginFlag
            //         // menuLevel
            //         // menuName
            //         // menuParentId
            //         // menuSerno
            //         // menuUrl
            //         // menuVersion
            //         // merchantMSG
            //         // merchantPWD
            //         // modifyDate
            //         // newFlag
            //         // path
            //         // platType
            //         // rightFlag
            //         // state
            //         // whiteFlag
            //     })
            // }

            //宫格样式处理
            // eidtPalaceStyle({
            //     floorId: this.options.floorId,
            //     styleType: this.currentTemplateItem.subkind,
            //     pageType: this.options.pageType,
            //     styleName: this.currentTemplateItem.name,
            //     appVersion: (this.iMenuList[0] || {}).appVersion,
            //     // menuName:  this.menuName,
            //     appId: (this.iMenuList[0] || {}).appVersion,
            //     menuName: (this.options.pageType == '00' ? '首页' :(this.options.pageType == '01' ? '信用卡' : (this.options.pageType == '02' ? '理财投资':(this.options.pageType == '03'?'生活': '我的')))) + '-' + this.$route.query.pageName + '-' + '宫格',
            //     contentType: '2',
            //     treeId: info.menuId,
            //     // squareInputList: squareInputList
            //     menuQueryList: this.iMenuList
            // }).then((res) => {
            //     if(res.data.body.treeId){
            //         info.menuId = res.data.body.treeId
            //         info.menuName = this.menuName
                    
            //         this.menuId = info.menuId
            //     }
            //     this.updateFloor()
            // })
            eidtPalaceStyleNew({
                floorId: this.options.floorId,
                styleType: this.currentTemplateItem.subkind,
                pageType: this.options.pageType,
                styleName: this.currentTemplateItem.name,
                appVersion: (this.iMenuList[0] || {}).appVersion,
                // menuName:  this.menuName,
                appId: (this.iMenuList[0] || {}).appVersion,
                menuName: (this.options.pageType == '00' ? '首页' :(this.options.pageType == '01' ? '信用卡' : (this.options.pageType == '02' ? '理财投资':(this.options.pageType == '03'?'生活': '我的')))) + '-' + this.$route.query.pageName + '-' + '宫格',
                contentType: '2',
                treeId: info.menuId,
                // squareInputList: squareInputList
                menuQueryList: this.iMenuList,
                fieldset1: !!this.isSplitBtn ? '1' : '0'
            }).then((res) => {
                this.handleMsg(res, '保存成功', '保存失败')
                if(res.data.body.treeId){
                    info.menuId = res.data.body.treeId
                    info.menuName = this.menuName
                    
                    this.menuId = info.menuId
                }
                this.updateFloor()
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
    .palace__style{
        & {
            background: #ffffff;
            padding: 0 20px;
            overflow: hidden;
        }
        & .el-form {
            padding: 20px 0 4px 0;
            box-shadow: inset 0 -1px 0 0 #F5F5FA;
        }
        & .add__boxShow {
            padding: 20px 0 4px 0;
            box-shadow: inset 0 -1px 0 0 #F5F5FA;
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
        // & .el-form-item__label {
        //     color: #D0021B;
        // }
        .el-input-number {
            width: 288px;
            height: 40px;
        }
        & .el-input {
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

        .gauge__content__head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
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
            // width: 40px;
            // height: 40px;
            padding: 10px;
            cursor: pointer;
        }
        .icon__box+.icon__box {
            margin-left: 10px;
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
        .gauge__info__palace_notice{
            color: #d0d2d4;
            text-align: center;
            background: #FAFAFC;
            padding: 20px 0;
        }

        .gauge__Specifications {
            width: 80px;
            height: 80px;
            background: #FAFAFC;
            text-align: center;
        }
        .gauge__Specifications span {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #A2A4A6;
            text-align: center;
            line-height: 80px;
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

        & {
            .floor_save{
                margin-top: 100px;
                bottom: 65px;
                height: 75px;
                border-top: 1px solid #f1f1f1;
                right: 10px;
                padding-top: 15px;
                text-align: center;
                button{
                    background: #3671FF;
                    height: 42px;
                    width: 112px;
                    border-radius: 2px;
                    color: #fff;
                    border:none;
                    // border: 1px solid #dcdfe6;
                    &:hover{
                        color: #fff;
                        background: #3671FF;
                        cursor:pointer;
                    }
                }
                
            }
        }
        .el-checkbox__inner {
            border: 1px solid #3671FF;
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


