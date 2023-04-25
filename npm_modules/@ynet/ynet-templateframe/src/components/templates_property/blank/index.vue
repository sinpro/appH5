<template>
    <div class="blank__style">
        <div class="blank">
            <el-form >
                <el-form-item label="高度">
                    <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="色彩" class="del__input">
                    <el-input :disabled="!isSplitBtn" v-model="color" placeholder="无"></el-input>
                    <el-color-picker v-model="color" :disabled="!isSplitBtn"></el-color-picker>
                    <div @click="isSplitBtn = !isSplitBtn" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                        <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
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
            color: '',
            isSplitBtn: false,
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
                floorType: '07',
                floorName: '辅助空白',
                floorIsAd: '0',
                heightF: this.num8,
                color: this.color,
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            this.$emit('setMenuStyleOptions', this.menuOptions)
        })
    },
    created() {
        this.color = this.currentTemplateItem.options.color
        this.num8 = this.currentTemplateItem.options.heightF
    },
    methods: {
        handleChange(value) {},
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
        sureForRpc() {
            this.editFloorStyleAllocation()
        },
        editFloorStyleAllocation() {
            let subBlankData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '07',
                // styleType: '',
                floorName: '辅助空白',
                floorIsAd: '0',
                // orderNum: '',
                status: '0',
                color: this.color,
                widthF: '375',
                heightF: this.num8,
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(subBlankData).then(res => {
                // console.log(res)
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .blank__style .el-color-picker {
        display: inline-block;
        position: absolute;
        line-height: normal;
        height: 40px;
        right: 60px;
    }
    
    .blank__style .el-form-item__label, .blank__style .el-radio__label, .blank__style .el-input__inner {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        font-weight: 400;
        color: #323C41;
        letter-spacing: 0;
    }
    .blank__style .el-form {
        padding: 0 20px
    }
    .blank__style .el-form-item {
        margin-bottom: 16px;
    }
    .blank__style .el-form-item:nth-child(1) {
        margin-top: 20px;
    }
    .blank__style .el-form-item__label {
        padding: 0 46px 0 0;
    }
    .blank__style .el-input-number {
        width: 288px;
        height: 40px;
    }
    .blank__style .el-input {
        height: 40px;
        width: 288px;
    }
    .blank__style .el-input__inner {
        height: 40px;
        padding-left: 15px;
    }
    .blank__style .el-input-number .el-input__inner {
        text-align: left;
    }
    .blank__style .el-input-number__decrease, .blank__style .el-input-number__increase {
        background: #ffffff;
    }

    .blank__style .splitBtn {
            background: #CACCD2;
            border-radius: 1px;
            width: 32px;
            height: 2px;
            margin-left: 52px;
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: 20px;
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
    .del__input .el-input{
        width: 228px;
        height: 40px;
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

    
    
</style>


