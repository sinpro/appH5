<template>
    <div class="comp_link_contaner">
        <panel-header :title="title" @back="back"/>
        <div class="link_setting">
            <el-form label-width="85px">
                <el-form-item>
                    <div slot="label" class="link_setting_linktype_label">链接类型</div>
                    <el-radio-group v-model="picLinkType" @change="clearModel">
                        <el-radio style="margin-bottom: 20px;" :label="linkInfo.label" v-for="(linkInfo, index) in linkTypetList" :key="index">{{linkInfo.title}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="子栏位" v-show="picLinkType=='2'">
                    <el-radio-group v-model="pageLinkType">
                        <el-radio :label="linkInfo.label" 
                            v-for="(linkInfo, index) in pageLinkList" 
                            :key="index">
                            {{linkInfo.title}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="子栏位选择" v-show="picLinkType=='2' &&pageLinkType=='1'" class="delPaddingRight">
                    <el-select v-model="selectValue" clearable placeholder="请选择" @change="selectChange" @clear="clearChange">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动选择" v-show="picLinkType=='2' &&pageLinkType=='2'">
                   <div class="active-choose" @click="chooseActive">
                       <span>{{activityName}}</span>
                       <i class="el-icon-arrow-down"></i>
                   </div>
                </el-form-item>
                <el-form-item label="链接地址" v-show="picLinkType!='1'">
                    <el-input placeholder="（URL地址）第三方地址请以http 或 https 开头" v-model="picLink"></el-input>
                </el-form-item>
                <el-form-item label="触发后登录" class="padding_left_del">
                    <el-radio-group v-model="isLoginNeeded">
                        <el-radio :label="'1'">是</el-radio>
                        <el-radio :label="'0'">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上送用户ID" class="padding_left_del">
                    <el-radio-group v-model="isIdNeeded">
                        <el-radio :label="'1'">是</el-radio>
                        <el-radio :label="'0'">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="iPhoneX适配" v-if="options.floorType == '01'" :label-width="labelWidth">
                    <div>
                        <div @click="setXPicurl" class="pic_block" v-if="options.xPicUrl == '' || options.xPicUrl == undefined">
                            <img src="../../../../../assets/add1.png" alt="">
                            <span v-text="'375 x' + (parseInt(options.picHeight) +24) + '@2x'"></span>
                        </div>
                        <div class="pic_block" v-if="options.xPicUrl != '' && options.xPicUrl != undefined" @click="setXPicurl">
                            <img :src="options.xPicUrl" alt="">
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 活动选择 -->
        <el-dialog
                    title="活动选择"
                    :visible.sync="activityShow"
                    width="60%"
                     append-to-body>
                    <activityChoose ref="myActivity"></activityChoose>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="checkedBandle" type="primary">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>
<script>
import { getCustomList } from '../../../../../utils/api'
import props from '../props'
import panelHeader from '../panelHeader'
import chooseMaterial from '^/chooseMaterial'
import linkConfig from '../../../../../config/linkConfig'
import activityChoose from '../activity'

export default {
    props: props,

    components: {
        panelHeader, chooseMaterial, activityChoose
    },
    data() {
        return {
            linkTypetList: [
                {title:'无', label: '1'},
                {title:'APP内部', label: '2'},
                {title:'Native', label: '4'},
                {title:'小程序', label: '5'},
                {title:'第三方', label: '3'}
            ],
            pageLinkList: [
                {title:'子栏位', label: '1'},
                {title:'活动', label: '2'}
            ],
            picLink: '',
            picLinkType: '1',
            pageLinkType: '1',
            isLoginNeeded: '1',
            isIdNeeded: '0',
            labelWidth: '',
            xPicUrl: '',
            selectOptions: [],
            selectValue: '',
            activityShow:false,
            activityName:'请选择'
        }
    },

    created() {
        //回填属性面板
        this.initPanel()
        this.getCustomList()
        window.linkpanel = this
    },

    watch: {
        options(nVal) {
            // console.log(nVal)
            alert(111111)
            this.xPicUrl = nVal.xPicUrl
        }
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
        clearPageModel() {
            this.pageLinkType = ''
        },

        initPanel () {
            this.options.picLinkType && (this.picLinkType = this.options.picLinkType)
            this.options.picLink && (this.picLink = this.options.picLink)
            this.options.isLoginNeeded && (this.isLoginNeeded = this.options.isLoginNeeded)
            this.options.isIdNeeded && (this.isIdNeeded = this.options.isIdNeeded)
            this.options.xPicUrl && (this.xPicUrl = this.options.xPicUrl)
        },

        back () {
            let linkInfo = {}

            if(!this.picLinkType){
                this.$alert('请填写链接地址', '提示')
                return
            }

            linkInfo.picLinkType = this.picLinkType
            linkInfo.picLink = this.picLink
            linkInfo.isLoginNeeded = this.isLoginNeeded
            linkInfo.isIdNeeded = this.isIdNeeded
            linkInfo.xPicUrl = this.options.xPicUrl

            this.$emit('back', linkInfo)
        },

        setXPicurl() {
            this.$emit('getXpixUrl')
        },

        //活动选择操作start
        chooseActive() {
            this.activityShow = true
        },
        checkedBandle() {
            let data = this.$refs.myActivity.backCheckData()
            //console.log(data)
            this.activityName = data.name
            this.picLink = data.url

            this.activityShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../../animate';
    .comp_link_contaner{
        /* 侧滑面板样式 */
        width: 410px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        background:#ffffff;
        z-index: 1000;
        overflow-y: auto;

        .link-head {
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

        .setting-content, .link_setting {
            padding: 20px 20px 20px 24px;

            .el-input {
                height: 40px;
                width: 288px;
            }

            .delPaddingRight {
                .el-form-item__label {
                    padding: 0 8px 0 0;
                    font-family: MicrosoftYaHeiUI;
                    font-size: 12px;
                    color: #323C41;
                    letter-spacing: 0;
                }
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

        .link_setting {

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

            .link_setting_linktype_label{
                line-height: 14px;
            }
        }
    }
    .active-choose{
        width: 288px;
        height: 40px;
        border: 1px solid #DDE0E4;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        >span{
            font-size: 12px;
            color: #323C41;
        }
        .el-icon-arrow-down{
            margin-right: 10px;
            font-size: 14px;
            color: #c0c4cc;
        }
    }
</style>


