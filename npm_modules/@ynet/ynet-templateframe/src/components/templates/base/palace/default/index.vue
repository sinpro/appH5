<template>
    <div class="template_palace_default" ref="templatepalacedefault">
        <div class="paltemplate_palace_default_container" :style="containerStyle">
            <ul class="palace_list" v-for="(lineList, lineIndex) in itemList" :key="lineIndex" :style="{marginTop:(lineIndex ==0 ? 0 : lineStyleMarginTop)}">
                <li v-for="(item, index) in lineList" :key="index" :style="itemStyle" :class="item.className"
                    @click="$emit('mClick', item)">
                    <div class="palace_flag" v-if="judgeIsShow(item)" :style="flagStyle">{{item.s_rightFlag}}</div>
                    <imageview class="palace_image" :style="imgStyle" :src="item.IconX2 || require('../../../../../assets/gray.jpg')"/>
                    <div class="palace_label" :style="textStyle">{{item.menuName}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import {replaceQuot} from '../../../utils'

export default {
    mixins,
    props,

    data () {
        return {
            itemList: [],
            containerStyle: {
                marginTop: '0',
                marginBottom: '0',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '0',
                width: '100%',
                boxShadow: 'none'
            },
            itemStyle: {
                width: 'auto',
                padding: '0'
            },
            lineStyleMarginTop: 'auto',
            imgStyle: {
                width: 'auto',
                height: 'auto'
            },
            textStyle: {
                fontSize: '12px'
            },
            flagStyle: {
                fontSize: '12px',
                height: '12px',
                lineHeight: '10px'
            }
        }
    },

    mounted () {
        this.initComponent()
    },

    methods: {

        judgeIsShow (menuInfo) {
            let userAgent = navigator.userAgent
            let newFlag = menuInfo.newFlag

            //角标控制
            if(newFlag == '1'){
                let newShow = true

                //时间获取待处理
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                month = month > 9 ? month : ('0' + month)
                day = day > 9 ? day : ('0' + day)
                let currDate = `${year}-${month}-${day}`

                if(menuInfo.beginDate && (currDate < menuInfo.beginDate)){
                    newShow = false
                }else if(menuInfo.endDate && (currDate > menuInfo.endDate)){
                    newShow = false
                }

                if(newShow) {
                    menuInfo.s_rightFlag = menuInfo.rightFlag
                    return true
                }
            }

            return false
        },

        calcRect (palaceStyleInfo) {
            //图片样式
            this.imgStyle.width = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 36)  + 'px'
            this.imgStyle.height = this.imgStyle.width

            this.lineStyleMarginTop = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 12)  + 'px'

            //上下边距控制
            this.containerStyle.marginTop = this.properties.itemmargin || this.calcpxbyelem(this.$refs.templatepalacedefault, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.properties.itemmargin || this.calcpxbyelem(this.$refs.templatepalacedefault, 375, this.options.bottomMargin || 0) + 'px'

            if(palaceStyleInfo.fieldset1 == '1'){
                //有阴影
                this.containerStyle.width = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 343) - 6  + 'px'
                this.containerStyle.padding = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 12) + 'px 0'
                this.containerStyle.boxShadow = '0 1px 6px 0 rgba(21,30,121,0.10)'
            }

            this.textStyle.fontSize = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 12)  + 'px'

            this.flagStyle.fontSize = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 12)  + 'px'
            this.flagStyle.height = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 14)  + 'px'
            this.flagStyle.lineHeight = this.calcpxbyelem(this.$refs.templatepalacedefault, 375, 8)  + 'px'
        },

        initComponent () {
            let palacelist = this.options.styleInfoList || []
            //替换转义字符
            let strJson = replaceQuot((palacelist[0] || {}).strJson)
            //宫格菜单数据
            let list = strJson ? JSON.parse(strJson) : []
            let palacenum = this.properties.palacenum
            let linenum = this.properties.linenum || 4
            this.itemStyle = {width: (100/parseInt(linenum, 10) + '%'), padding: (this.properties.itemPadding || '0')}

            this.calcRect(palacelist[0] || {})

            //清除宫格数据
            this.itemList.splice(0, this.itemList.length)
            this.divideList(list, palacenum, linenum)
        },

        divideList (list, palacenum, linenum) {
            list = list || []
            let palacelevel = parseInt(linenum, 10)
            let tempList = this.paddingItem(list, palacenum)
            let i = 0
            let len = tempList.length
            let retList = []
            let temp = []

            for(i = 0; i < len; i++){
                if(i%palacelevel == 0){
                    temp = []
                    retList.push(temp)
                }
                temp.push(tempList[i])
            }

            this.itemList = retList
        },

        paddingItem (list, palacenum) {
            let len = list.length
            let tempList = []
            //仅截取 指定宫格数的数据
            if(palacenum){
                palacenum = parseInt(palacenum, 10)
                tempList = tempList.concat(list.slice(0, palacenum))
                if(this.mode && len < palacenum){
                    //非开发模式 不进行补全
                    let count = palacenum - len
                    let index
                    for(index = 0; index < count; index++){
                        tempList.push(this.defaultItem())
                    }
                }
            }else{
                tempList = [].concat(list)
            }

            return tempList
        },

        /**
         * 生成默认选项，补齐宫格
         */
        defaultItem () {
            return {
                picUrl2: require('../../../../../assets/gray.jpg'),
                squareName: '默认文字'
            }
        }
        
    },
    watch: {
        properties (newVal) {
            if(newVal)
                this.itemStyle.margin = newVal.itemmargin
        }
    }
}
</script>
<style scoped>
@import '../../../reset.css';

.template_palace_default{
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
}

.paltemplate_palace_default_container{
    width: 100%;
}

.template_palace_default .palace_list {
  display: flex;
  width: 100%
}

.template_palace_default .palace_list li{
    text-align: center;
    font-size: 0;
    position: relative;
}

.template_palace_default .palace_list li .palace_label{
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
    margin-top: 1px;
}

.template_palace_default .palace_image{
    max-width: 100%;
    display: inline-block;
}

.template_palace_default .palace_flag{
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    padding: 2px;
    background: red;
    color: white;
    max-width: 100%;
    transform: scale(0.8, 0.8);
}
</style>
