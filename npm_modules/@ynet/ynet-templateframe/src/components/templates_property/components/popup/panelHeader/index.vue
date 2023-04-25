<template>
    <div class="comp_panelheader_contaner">
        <div class="panel-head">
            <div class="panel-head-jiantou" @click="$emit('back')"></div>
            <div class="panel-head-back-icon"  @click="$emit('back')"></div>
            <span class="panel-head-back-text"  @click="$emit('back')">返回</span>
            <span class="panel-head-fenge">|</span>
            <span class="panel-head-title">{{title}}</span>
        </div>
    </div>
</template>
<script>

export default {
    props: {

        /**
         * 面板类型
         * 1 纯链接地址
         */
        title: {
            type: String,
            default: '标题'
        }
    }
}
</script>

<style lang="scss">

    .comp_panelheader_contaner {
        height: 48px;
        padding: 0 20px;
        line-height: 48px;
        display: flex;
        align-items: center;
        box-shadow: inset 0 -1px 0 0 #DDE0E4;

        .panel-head{
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .panel-head-jiantou {
                width:0;
                height:0;
                border: 6px solid transparent;
                border-right-color: #3671FF;
                position:absolute;
                left: 16;
                content:'';
                cursor: pointer;
            }
            
            .panel-head-back-icon {
                width: 12px;
                height: 4px;
                background: #3671FF;
                margin-left: 8px;
                cursor: pointer;
            }

            .panel-head-back-text, .panel-head-title {
                font-family: MicrosoftYaHeiUI;
                font-weight: bold;
                font-size: 13px;
                letter-spacing: 0;
            }

            .panel-head-title {
                color: #14001D;
            }

            .panel-head-fenge {
                font-family: MicrosoftYaHeiUI;
                font-weight: bold;
                font-size: 13px;
                color: #000000;
                letter-spacing: 0;
                margin: 0 4px 0 4px;
            }

            .panel-head-back-text {
                color: #3671FF;
                margin-left: 4px;
                cursor: pointer;
            }

        }
    }
       
</style>


