<template>
    <div class="template_frame" ref="templateFrame" :style="frameStyle">
        <slot name="pre"></slot>
        <component v-if="componentType" :is="componentType" :mode="mode" :properties="componentProperties" :options="options" @mClick="templateClick($event)"/>
        <slot></slot>
    </div>
</template>
<script>
import props from './utils/props'
import { parseParams } from './utils'
import mappings from '../../../config/mapping'

import blank from '../../templates/base/blank'

import floorSecond from '../../templates/base/floor/second'

import palaceDefault from '../../templates/base/palace/default'
import palaceCarousel from '../../templates/base/palace/carousel'
import carouselAdvertise from '../../templates/base/carousel/advertise'
import sublineRect from '../../templates/base/subline/rect'
import sublineLine from '../../templates/base/subline/line'
import captionDefault from '../../templates/base/caption/default'
import captionImagetext from '../../templates/base/caption/imagetext'

import picturetextLineonetext from '../../templates/base/picturetext/lineonetext'
import picturetextVerticalonetext from '../../templates/base/picturetext/verticalonetext'
import picturetextVerticaltwotext from '../../templates/base/picturetext/verticaltwotext'
import picturetextVerticalthreetext from '../../templates/base/picturetext/verticalthreetext'
import picturetextSlideronetext from '../../templates/base/picturetext/slideronetext'
import picturetextSliderverticaltext from '../../templates/base/picturetext/sliderverticaltext'
import picturetextLineonecombine from '../../templates/base/picturetext/lineonecombine'

import imageSimpleone from '../../templates/base/image/simpleone'
import imageSimpletwo from '../../templates/base/image/simpletwo'
import imageSimplethree from '../../templates/base/image/simplethree'
import imageComplexthree from '../../templates/base/image/complexthree'
import imageComplexfour from '../../templates/base/image/complexfour'
import imageSliderhorizontal from '../../templates/base/image/sliderhorizontal'

import announcementCarousel from '../../templates/base/announcement/carousel'

import financeVerticallist from '../../templates/base/finance/verticallist'
import financeVerticalone from '../../templates/base/finance/verticalone'
import financeLinetwo from '../../templates/base/finance/linetwo'
import financeLinethree from '../../templates/base/finance/linethree'
import financeSliderone from '../../templates/base/finance/sliderone'
import financeSlidertwo from '../../templates/base/finance/slidertwo'
import financeVerticaloneimagetext from '../../templates/base/finance/verticaloneimagetext'

import depositVerticallist from '../../templates/base/deposit/verticallist'
import depositSliderone from '../../templates/base/deposit/sliderone'
import depositSlidertwo from '../../templates/base/deposit/slidertwo'

import installmentVerticalthreetext from '../../templates/base/installment/verticalthreetext'
import installmentSliderverticaltext from '../../templates/base/installment/sliderverticaltext'

import carouselpalaceDefault from '../../templates/composite/carouselpalace/default'
import carouselpalaceVertical from '../../templates/composite/carouselpalace/vertical'

import carouselCascade from '../../templates/base/carousel/cascade'
import carouselTranslation from '../../templates/base/carousel/translation'

import advertiseProductlist from '../../templates/base/advertise/productlist'
import advertiseFloat from '../../templates/base/advertise/float'
import advertisePopup from '../../templates/base/advertise/popup'
import advertiseAnnounce from '../../templates/base/advertise/announce'

import navigationbarStyle from '../../templates/base/navigationbar'

import listStyle from '../../templates/base/list'

export default {

    props: props,

    components: {
        blank,
        floorSecond,
        palaceDefault,
        palaceCarousel,
        carouselAdvertise,
        carouselCascade,
        carouselTranslation,
        sublineRect,
        sublineLine,
        captionDefault,
        captionImagetext,
        picturetextLineonetext,
        picturetextVerticalonetext,
        picturetextVerticaltwotext,
        picturetextVerticalthreetext,
        picturetextSlideronetext,
        picturetextSliderverticaltext,
        picturetextLineonecombine,
        imageSimpleone,
        imageSimpletwo,
        imageSimplethree,
        imageComplexthree,
        imageComplexfour,
        imageSliderhorizontal,
        announcementCarousel,
        financeVerticallist,
        financeVerticalone,
        financeLinetwo,
        financeLinethree,
        financeSliderone,
        financeSlidertwo,
        financeVerticaloneimagetext,
        depositVerticallist,
        depositSliderone,
        depositSlidertwo,
        installmentVerticalthreetext,
        installmentSliderverticaltext,
        carouselpalaceDefault,
        carouselpalaceVertical,
        navigationbarStyle,

        advertiseProductlist,
        advertiseFloat,
        advertisePopup,
        advertiseAnnounce,

        listStyle
    },

    data () {
        return {
            componentType: '',
            componentProperties: {},
            frameStyle: {
                minHeight: '0'
            }
        }
    },

    created () {
        this.dataAdapter()
        this.initComponent()
    },

    methods: {

        templateClick (event) {
            this.$emit('mClick', event)
        },
        
        dataAdapter () {
            let options = this.options || {}
            let styleInfoList = options.styleInfoList

            if (!styleInfoList) {
                options.styleInfoList = []
            }else if (typeof styleInfoList == 'string'){
                styleInfoList = styleInfoList.replace('&quot;', '"')
                try{
                    options.styleInfoList = JSON.parse(styleInfoList)
                }catch(e){
                    options.styleInfoList = []
                }
            }
        },

        initComponent () {
            let type = this.type || ''
            let typeRegExp = /([^\.]+)\.(.*)/
            let mapperInfo = mappings[type]
            let componentInfo = this.parseType(mapperInfo ? (mapperInfo.type || mapperInfo) : type)
            this.componentType = componentInfo.componentType
            //属性控制
            this.componentProperties = Object.assign({}, componentInfo.componentProperties)
            //数据控制-简化组件的复写
            Object.assign(this.options, componentInfo.componentOptions)
            
            console.log && console.log(this.type)
            console.log && console.log(this.componentType)
            console.info && console.info(this.componentProperties)
            console.info && console.info(this.options)

            if(!typeRegExp.test(type) && !mapperInfo){
                //清空避免报错
                this.componentType = ''
                let showmessage = `模板[${type}]敬请期待`
                this.$emit('notfound', {componentType: type})
                if(this.mode){
                    //编辑模式提示报错
                    // alert(showmessage)
                }else{
                    window.console && console.error && console.error(showmessage)
                }
            }
            
            //编辑模式下，所有组件要可见
            if(this.mode && this.options.heightF){
                this.$nextTick(() => {
                    let value = this.$refs.templateFrame.offsetWidth
                    let minHeight = (parseFloat(value) * parseFloat(this.options.heightF))/parseFloat(375)
                    if(minHeight > 10) minHeight = 10
                    this.frameStyle.minHeight = minHeight + 'px'
                })
            }
        },

        /**
         * 组件url解析
         */
        parseType (type) {
            let matches = type.match(/([^\?\#]*)(\?[^#]*)?(#.*)?/)
            let comptype, compproperties, compoptions, search, anchor
            if(!matches){
                comptype = type
                compproperties = {}
                compoptions = {}
            }else{
                comptype = matches[1]
                search = matches[2] || ''
                anchor = matches[3] || ''
                compproperties = parseParams(search.substring(1))
                compoptions = parseParams(anchor.substring(1))
            }
            comptype = this.transferCamel(comptype)

            return {
                componentType: comptype,
                componentProperties: compproperties,
                componentOptions: compoptions
            }
        },

        /**
         * 驼峰名称转换
         */
        transferCamel (componentName) {
            let tempArr = componentName.split('.')
            let compKind = tempArr[0] || ''
            let compName = tempArr[1] || ''
            return compKind + compName.charAt(0).toUpperCase() + compName.substring(1)
        },

        /**
         * 刷新当前view
         */
        refresh () {
            this.componentType = ''
            this.$nextTick(() => {
                this.initComponent()
            })
        }

    },
    watch: {
        type () {
            //组件类型变化, 组件重绘制 
            this.refresh()
        },

        options (newObj) {
            //组件数据变化, 组件重绘制 
            this.refresh()
        }
    }

}
</script>
<style scoped>
    .template_frame{
        width: 100%;
        cursor: pointer;
    }
</style>
