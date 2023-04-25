<template>
    <div class="template_palace_carousel" ref="templatepalacecarousel">
        <div class="swiper-container" ref="swipercontainer">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :style="containerStyle" v-for="(itemList, pageIndex) in pageList" :key="pageIndex">
                    <ul class="palace_list" :style="ulStyle" v-for="(lineList, lineIndex) in itemList" :key="lineIndex">
                        <li v-for="(item, index) in lineList" :key="index" :style="itemStyle" :class="item.className">
                            <imageview :style="imgStyle" src="../../../../../assets/gray.jpg"/>
                            <p :style="textStyle">{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination" ref="swiperpagination"></div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import Swiper from '../../../../../lib/swiper'

export default {
    mixins,
    props,

    data () {
        return {
            pageList: [],
            itemStyle: {},
            imgStyle: {
                width: 'auto',
                height: 'auto',
                marginBottom: '0'
            },
            textStyle: {
                fontSize: '12px'
            },
            ulStyle: {
                marginTop: '8px'
            },
            containerStyle: {
                marginBottom: '8px'
            }
        }
    },

    mounted () {
        this.initList()

        this.$nextTick(() => {
            this.mySwiper = new Swiper (this.$refs.swipercontainer, {
                // 如果需要分页器
                pagination: {
                    el: this.$refs.swiperpagination,
                }
            })
        })
    },

    methods: {

        calcRect () {
            //图片样式
            this.imgStyle.width = this.calcpxbyelem(this.$refs.templatepalacecarousel, 375, 36)  + 'px'
            this.imgStyle.height = this.imgStyle.width
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepalacecarousel, 375, 2)  + 'px'

            this.textStyle.fontSize = this.calcpxbyelem(this.$refs.templatepalacecarousel, 375, 12)  + 'px'

            this.ulStyle.marginTop = this.calcpxbyelem(this.$refs.templatepalacecarousel, 375, 8)  + 'px'
            this.containerStyle.marginBottom = this.ulStyle.marginTop
        },

        initList () {
            let list = this.options.list || []
            let palacenum = this.properties.palacenum
            let linenum = this.properties.linenum || 4
            this.itemStyle = {width: (100/parseInt(linenum, 10) + '%')}
            
            this.calcRect()

            //清除宫格数据
            this.pageList.splice(0, this.pageList.length)
            this.dividePage(list, palacenum, linenum)
        },

        dividePage (list, palacenum, linenum){
            palacenum = parseInt(palacenum, 10)
            let palacelevel = parseInt(linenum, 10)
            let tempList = list //this.paddingItem(list, palacenum)
            let retList = []

            if(list.length < palacenum){
                retList.push(this.divideLine(list, palacenum, linenum))
            }else{
                let i = 0
                let len = list.length
                let temp = null

                for(i = 0; i < len; i++){
                    if(i%palacenum == 0){
                        if(temp){
                            retList.push(this.divideLine(temp, palacenum, linenum))
                        }
                        temp = []
                    }
                    temp.push(tempList[i])
                }

                if(temp.length > 0){
                    retList.push(this.divideLine(temp, palacenum, linenum))
                }
            }

            this.pageList = retList
        },

        divideLine (list, palacenum, linenum) {
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
            return retList
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
                className: 'palaceDefaultItem',
                name: '默认'
            }
        }
    },
    watch: {
        list () {
            this.initList()
        }
    }
}
</script>
<style>
.template_palace_carousel .swiper-pagination .swiper-pagination-bullet-active{
    background: #000;
    opacity: 1;
}
</style>
<style scoped>
@import '../../../reset.css';
@import '../../../../../lib/swiper.css';

.template_palace_carousel{
    width: 100%;
}

.template_palace_carousel .swiper-pagination{
    position: static;
}

.template_palace_carousel .palace_list {
  display: flex;
  width: 100%
}

.template_palace_carousel .palace_list li{
    text-align: center;
    font-size: 0;
}

.template_palace_carousel .palaceDefaultItem{
    
}

.template_palace_carousel .palace_list li p{
    text-overflow: ellipsis;
}
</style>
