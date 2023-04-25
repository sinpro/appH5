<template>
    <div class="subline__style">
        <div class="guide">
            <el-form :model="form">
                <div class="left__content">
                    <span>样式选择</span>
                    <div class="tab__check">
                        <div @click="isShow = index" :class="{'check__active': isShow == index}" v-for="(item, index) in lineList" :key="index">{{item}}</div>
                    </div>
                </div>
                <el-form-item label="左右边距" class="topBottomMargin">
                    <div class="flex__box">
                        <div class="flex__box">
                            <div class="top__text">左</div>
                            <el-input-number v-model="topDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                        </div>
                        <div class="flex__box">
                            <div class="top__text">右</div>
                            <el-input-number v-model="bottomDistance" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
                        </div>
                    </div>
                </el-form-item>
                <!-- <el-form-item label="左边距">
                    <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="右边距">
                    <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item> -->
                <el-form-item label="色彩">
                    <div class="flexbox">
                        <el-input v-model="color" class="inputMargin"></el-input>
                        <el-color-picker v-model="color"></el-color-picker>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="floor_save" @click="sureForRpc">楼层保存</div> -->
        <div class="floor_save" @click="sureForRpc">
            <button>楼层保存</button>
        </div>
    </div>
</template>

<script>
import { eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
export default {
    data() {
        return {
            num8: 1,
            form: {
                conTyoe: ''
            },
            color: '',
            lineList: ['实线', '虚线'],
            isShow: 0,
            topDistance: '',
            bottomDistance: '',
            menuOptions: {}
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
    updated() {
        this.$nextTick(() => {
            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '11',
                floorName: '辅助线',
                floorIsAd: '0',
                operatorId: this.options.operatorId,
                operator: this.options.operator,
                divlineType: this.isShow == 0 ? '0' : '1',
                leftMargin: this.topDistance,
                rightMargin: this.bottomDistance,
                color: this.color
            }
            this.$emit('setMenuStyleOptions', this.menuOptions)
        })
    },
    created() {
        this.color = this.currentTemplateItem.options.color
        this.topDistance = this.currentTemplateItem.options.leftMargin
        this.bottomDistance = this.currentTemplateItem.options.rightMargin
        this.isShow = this.currentTemplateItem.options.divlineType
    },
    methods: {
        handleChange(value) {
        },
        editFloorStyleAllocation() {
            let subLineData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '11',
                floorName: '辅助线',
                floorIsAd: '0',
                // orderNum: '',
                status: '0',
                divlineType: this.isShow == 0 ? '0' : '1',
                leftMargin: this.topDistance,
                rightMargin: this.bottomDistance,
                color: this.color,
                // widthF: '',
                // heightF: '',
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(subLineData).then(res => {
                // console.log(res)
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
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
.subline__style {
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

    & .el-form {
        padding: 0 20px
    }
    & .el-form-item {
        margin-bottom: 16px;
    }
    & .el-form-item__label {
        padding: 0 20px 0 0;
    }
    & .el-radio+.el-radio {
        margin-left: 50px;
    }


    & .el-input-number {
        width: 288px;
        height: 40px;
    }
    & .el-input {
        height: 40px;
        width: 288px;
    }
    & .inputMargin {
        margin-left: 26px;
    }
    & .el-input__inner {
        height: 40px;
        padding-left: 15px;
    }
    & .el-input-number .el-input__inner {
        text-align: left;
    }
    & .el-input-number__decrease, & .el-input-number__increase {
        background: #ffffff;
    }
    & {
        /* 小图标左侧内容重写样式 */
        .left__content {
            display: flex;
            align-items: center;
            margin: 20px 0;
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
    }

    & .topBottomMargin .el-input {
            height: 40px;
            width: 94px;
        }
        .topBottomMargin .el-input-number{
            width: 94px;
            margin-right: 20px;
        }
        & .topBottomMargin .el-input__inner {
            border-left: none;
            border-radius: 0px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        & .topBottomMargin .el-form-item__label {
            padding: 0 20px 0 0;
        }
        & .topBottomMargin .el-input-number.is-controls-right .el-input__inner {
            padding-left: 23px;
        }
        & .topBottomMargin .top__text {
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
        & .topBottomMargin .flex__box {
            display: flex;
        }
        & .topBottomMargin .el-form-item__content {
            display: flex;
        }
        .el-color-picker {
            display: inline-block;
            line-height: normal;
            height: 40px;
        }

        .flexbox{
            display: flex;
        }
}

</style>


