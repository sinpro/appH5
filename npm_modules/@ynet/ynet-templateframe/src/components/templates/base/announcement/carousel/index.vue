<template>
    <div class="template_announcement_carousel" ref="templateannouncementcarousel">
        <div class="template_announcement_carousel_container" :style="containerStyle">
            <div v-if="bLogo" class="template_announcement_carousel_logo" :style="logoStyle">
                <imageview :style="imgStyle" :src="options.picUrl"></imageview>
            </div>
            <div class="swiper-container" ref="swipercontainer" :style="swiperStyle">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(itemInfo, index) in itemList" :key="index">
                        <div class="template_announcement_carousel_announce" :class="'template_announcement_carousel_announce_' + (properties.style || '') + '_' + itemInfo.length + '_' + lineIndex" v-for="(item, lineIndex) in itemInfo " :key="lineIndex">
                            <div v-if="bType" class="template_announcement_carousel_type_con">
                                <span class="template_announcement_carousel_type" :style="typeStyle">
                                    {{item.fieldset1}}
                                </span>
                            </div>
                            <div class="template_announcement_carousel_item_con">
                                <div :style="itemStyle" class="template_announcement_carousel_item">{{item.instructions}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="bArrow" :style="arrowStyle" class="template_announcement_carousel_arrow_container">
                <div class="template_announcement_carousel_arrow"></div>
            </div>
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
            bLogo: false,
            bArrow: false,
            bType: false,
            linenum: 1,
            itemList: [],
            containerStyle: {
                width: 'auto',
                height: '0',
                lineHeight: 'auto'
            },
            logoStyle: {
                marginRight: '0'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto'
            },
            swiperStyle: {
                height: 'auto'
            },
            itemStyle: {
                width: 'auto',
                fontSize: '14px'
            },
            typeStyle: {
                fontSize: '12px',
                marginRight: '8px',
                color: 'none',
                borderColor: 'none'
            },
            arrowStyle: {
                width: 'auto',
                marginLeft: '0'
            }
        }
    },

    created () {
        this.initList()
    },

    mounted () {
        this.calcRect()

        this.$nextTick( () => {
            this.mySwiper = new Swiper (this.$refs.swipercontainer, {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                direction: 'vertical',
                loop: true // 循环模式选项
            })
        })
    },

    methods: {

        initList () {
            let style = this.properties.style
            let list = this.options.styleInfoList || []
            let linenum = 1

            switch(style){
                case 'style1':
                    linenum = 1
                    break
                case 'style2':
                    linenum = 1
                    break
                case 'style3':
                    linenum = 2
                    break
            }
            this.linenum = linenum
            this.itemList = this.divideList(list, linenum)
        },

        divideList (list, num) {
            let retArr = []
            let len = list.length
            let tempArr = []

            for(let i = 0; i < len; i++){
                if(i%num == 0){
                    tempArr = []
                    retArr.push(tempArr)
                }
                tempArr.push(list[i])
            }
            return retArr
        },

        calcRect () {
            let style = this.properties.style
            let height

            this.logoStyle.marginRight = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 16) + 'px'

            this.typeStyle.color = this.options.color
            this.typeStyle.borderColor = this.options.color

            switch(style){
                case 'style1':
                    this.bArrow = true
                    this.bType = true
                    height = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 40)
                    if(this.options.isGap == '1'){
                        this.bType = true
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 272) + 'px'
                    }else{
                        this.bType = false
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 312) + 'px'
                    }
                    this.typeStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'
                    this.itemStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 14) + 'px'
                    break
                case 'style2':
                    this.bArrow = true
                    this.bLogo = true
                    this.bType = true
                    height = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 52)
                    this.typeStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'

                    if(this.options.isGap == '1'){
                        this.bType = true
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 220) + 'px'
                    }else{
                        this.bType = false
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 260) + 'px'
                    }

                    this.imgStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 36) + 'px'
                    this.itemStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 14) + 'px'
                    break
                case 'style3':
                    this.bArrow = true
                    this.bLogo = true
                    this.bType = true
                    height = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 64)
                    this.typeStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'

                    if(this.options.isGap == '1'){
                        this.bType = true
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 220) + 'px'
                    }else{
                        this.bType = false
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 260) + 'px'
                    }

                    this.imgStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 40) + 'px'
                    this.itemStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'
                    break
                case 'style4':
                    this.bArrow = false
                    this.bLogo = true
                    this.bType = false
                    height = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 40)
                    this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 315) + 'px'
                    this.imgStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 20) + 'px'
                    this.itemStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'
                    this.logoStyle.marginRight = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 8) + 'px'
                    break
                default:
                    this.bArrow = true
                    this.bType = true
                    height = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 40)
                    if(this.options.isGap == '1'){
                        this.bType = true
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 272) + 'px'
                    }else{
                        this.bType = false
                        this.itemStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 312) + 'px'
                    }
                    this.typeStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 12) + 'px'
                    this.itemStyle.fontSize = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 14) + 'px'
                    break
            }

            this.arrowStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 23) + 'px'
            this.typeStyle.marginRight = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 8) + 'px'
            this.arrowStyle.marginLeft = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 8) + 'px'
            this.imgStyle.height = this.imgStyle.width
            this.containerStyle.width = this.calcpxbyelem(this.$refs.templateannouncementcarousel, 375, 343) + 'px'
            this.containerStyle.height = height + 'px'
            this.containerStyle.lineHeight = height + 'px'
            this.swiperStyle.height =  height + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';
    @import '../../../../../lib/swiper.css';

    .template_announcement_carousel{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: left;
        background-color: #FFFFFF;
    }

    .template_announcement_carousel_container{
        display: flex;
        justify-content: flex-start;
    }

    .template_announcement_carousel_logo {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        flex-flow: column nowrap;
    }

    .template_announcement_carousel .swiper-container{
        overflow: hidden;
        flex-shrink: 1;
        margin: 0;
        width: 100%;
    }

    .template_announcement_carousel_arrow_container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .template_announcement_carousel_arrow{
        flex-shrink: 0;
        text-align: right;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .template_announcement_carousel_arrow:after,.template_announcement_carousel_arrow:before {
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left-color: #999999;
        content: "";
        margin-right: 0;
        content: "";
        position: relative;
    }

   .template_announcement_carousel_arrow:before{
        right: -10px;
        border-left-color: white;
        z-index: 2;
    }

    .template_announcement_carousel .swiper-slide{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .template_announcement_carousel .template_announcement_carousel_announce{
        display: flex;
        justify-content: flex-start;
        height: 100%;
    }

    .template_announcement_carousel_type_con{
        flex-grow: 0;
        flex-shrink: 0;
        align-self: center;
    }

    .template_announcement_carousel_item_con{
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        justify-content: flex-start;
        align-self: center;
    }

    .template_announcement_carousel_type{
        border: 1px solid #3671FF;
        height: auto;
        border-radius: 2px;
        color: #3671FF;
        white-space: nowrap;
        letter-spacing: 1px;
        padding: 1px 2.5px;
    }

    .template_announcement_carousel_item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_announcement_carousel_announce_style3_2_0{
        transform: translateY(3px)
    }

    .template_announcement_carousel_announce_style3_2_1{
        transform: translateY(-3px)
    }

</style>
