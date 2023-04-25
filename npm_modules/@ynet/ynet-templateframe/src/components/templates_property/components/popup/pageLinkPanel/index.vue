<template>
    <div class="comp_link_contaner_panel">
        <div class="link_setting1">
            <el-form>
                <el-form-item>
                    <div class="left__content">
                        <span>链接类型</span>
                        <div class="tab__check">
                            <div @click="showLinkType(index)" :class="{'check__active': isShowLink == index && isSplitBtnLink}" v-for="(item, index) in linkTypetList" :key="index">{{item}}</div>
                        </div>
                        <div @click="isSplitBtnLinkType" class="splitBtn" :class="[isSplitBtnLink ? 'splitBtn__active' : '']">
                            <div class="splitRadio" :class="[isSplitBtnLink ? 'splitRadio__active' : '']"></div>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="子栏位选择" v-show="isShowLink=='0' && isSplitBtnLink" class="delPaddingRight">
                    <el-select v-model="selectValue" clearable placeholder="请选择" @change="selectChange" @clear="clearChange">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="isSplitBtnLink" class="picLinkStyle">
                    <el-input placeholder="（URL地址）第三方地址请以http 或 https 开头" v-model="picLink"></el-input>
                </el-form-item>
                <div class="padding__left__del">
                    <div>
                        触发后登录
                    </div>
                    <div @click="isNeedLogin = !isNeedLogin" class="splitBtn" :class="[isNeedLogin ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isNeedLogin ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
                <div class="padding__left__del">
                    <div>
                        上送用户ID
                    </div>
                    <div @click="isNeedId = !isNeedId" class="splitBtn" :class="[isNeedId ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isNeedId ? 'splitRadio__active' : '']"></div>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { getCustomList } from '../../../../../utils/api'
import props from '../props'
import chooseMaterial from '^/chooseMaterial'
import linkConfig from '../../../../../config/linkConfig'

export default {
    props: props,

    components: {
        chooseMaterial
    },
    data() {
        return {
            isShowLink: 0,
            isSplitBtnLink: false,
            isNeedLogin: false,
            isNeedId: false,
            linkTypetList: ['APP内部', '第三方'],
            picLink: '',
            picLinkType: '1',
            selectOptions: [],
            selectValue: ''
        }
    },

    created() {
        //回填属性面板
        this.initPanel()
        this.getCustomList()
        window.linkpanel = this
    },

    methods: {

        // 获取自定义配置列表
        getCustomList() {
            this.selectOptions = []
            getCustomList().then(res => {
                res.data.body.dockList.forEach(info => {
                    this.selectOptions.push({
                        confirmDelete: false,
                        label: info.name,
                        value: info.modelType
                    })
                })
            })
        },

        selectChange(val) {
            console.log(val)
            // this.picLink = 'ynet_floor/view/index.html?pageType=' + val
            this.picLink = linkConfig['customPage'].url + '?pageType=' + val
        },
        clearChange() {
            this.picLink = ''
        },
        clearModel() {
            this.picLink = ''
        },

        initPanel () {
            this.options.picLinkType && (this.picLinkType = this.options.picLinkType)
            this.options.picLink && (this.picLink = this.options.picLink)
            this.options.isShowLink && (this.isShowLink = this.options.isShowLink)
            this.options.isSplitBtnLink && (this.isSplitBtnLink = this.options.isSplitBtnLink)
            this.options.isNeedLogin && (this.isNeedLogin = this.options.isNeedLogin)
            this.options.isNeedId && (this.isNeedId = this.options.isNeedId)
        },

        back () {
            let linkInfo = {}

            if(!this.picLinkType){
                this.$alert('请填写链接地址', '提示')
                return
            }

            linkInfo.picLinkType = this.picLinkType
            linkInfo.picLink = this.picLink
            linkInfo.isNeedLogin = this.isNeedLogin
            linkInfo.isNeedId = this.isNeedId
            linkInfo.xPicUrl = this.options.xPicUrl

            this.$emit('back', linkInfo)
        },

        setXPicurl() {
            this.$emit('getXpixUrl')
        },

        showLinkType(i) {
            this.isShowLink = i
        },

        isSplitBtnLinkType() {
            this.isShowLink = 0
            this.isSplitBtnLink = !this.isSplitBtnLink
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../animate';
    .comp_link_contaner_panel{

        .link_setting1 {

            .el-form-item {
                margin-bottom: 0px;

                .el-form-item__label {
                    font-family: MicrosoftYaHeiUI;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
                }
            }

            .delPaddingRight {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 20px;
                .el-form-item__label {
                    padding-right: 17px;
                }
                .el-input {
                    width: 278px;
                    height: 40px;
                }
            }
            .picLinkStyle {
                margin-bottom: 20px;

                .el-input {
                    width: 278px;
                    height: 40px;
                    margin-left: 82px;
                }
            }

            .padding__left__del {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 82px;
                margin-bottom: 20px;

                div {
                    font-family: MicrosoftYaHeiUI;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
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

            .pic_block{
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
</style>


