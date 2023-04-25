<template>
    <div class="menu-property-select">
        <component v-on:setMenuStyleOptions="setMenuStyleOptions" v-if="componentType" :is="componentType" :flag="flag" :options="options" :currentTemplateItem="currentTemplateItem" :VertialControl="VertialControl"></component>
        <slot></slot>
    </div>
</template>

<script>
import propertypanel from '../../../config/propertypanel'

import menuCarousel from '../../templates_property/menuCarousel'
import topLine from '../../templates_property/topLine'
import headLine from '../../templates_property/headLine'
import imageText from '../../templates_property/imageText'
import imageTemplate from '../../templates_property/imageTemplate'
import financingProduct from '../../templates_property/financingProduct'
import installmentPurchase from '../../templates_property/installmentPurchase'
import regularProduct from '../../templates_property/regularProduct'
import palace from '../../templates_property/palace'
import secondFloor from '../../templates_property/secondFloor'
import subline from '../../templates_property/subline'
import blank from '../../templates_property/blank'
import carouselPalace from '../../templates_property/carouselPalace'
import navigationbar from '../../templates_property/navigationbar'
import list from '../../templates_property/list'

export default {

    data() {
        return {
            componentType: '',
            flag: this.currentTemplateItem.subkind
        }
    },

    props: {
        VertialControl: {
            type: Boolean,
            default: false
        },

        propertyId: {
            type: String,
            default: ''
        },

        menuStyleNumber: {
            type: String,
            default: ''     //模板类型
        },

        menuStyleType: {
            type: String,
            default: ''     //样式类型
        },

        currentTemplateItem: {
            type: Object,
            default () {
                return {}
            }
        },

        /**
         * 对接组件必须数据以及可选数据
         */
        options: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    
    components: {
        financingProduct,
        regularProduct,
        installmentPurchase,
        menuCarousel, 
        topLine, 
        headLine, 
        imageText, 
        imageTemplate, 
        palace, 
        secondFloor, 
        subline, 
        blank,
        carouselPalace,
        navigationbar,
        list
    },

    watch: {
        propertyId () {
            this.refresh()
        }
    },

    created() {
        // console.info(this.currentTemplateItem)
        this.initComponent()
    },

    methods: {

        /**
         * 初始化组件
         */
        initComponent () {
            let componentInfo = propertypanel[this.menuStyleType ? (this.menuStyleNumber + '-' + this.menuStyleType) : this.menuStyleNumber]

            let type = (componentInfo || {}).type
            let compInfo = this.parseType(type) 
            let compType = compInfo.componentType
            let compPropers = compInfo.componentProperties

            this.componentType = compType
            this.flag = compPropers.flag
        },

        /**
         * 更新模板项的风格
         */
        updateItemType (type) {
            let keyType = this.menuStyleNumber + '-' + type
            let temptype = propertypanel[keyType].type

            let compInfo = this.parseType(temptype) 
            let compType = compInfo.componentType
            let compPropers = compInfo.componentProperties

            //刷新面板
            this.componentType = ''
            this.$nextTick(() => {
                this.componentType = compType
                this.flag = compPropers.flag
            })
        },

        /**
         * 组件url解析
         */
        parseType (type) {
            let matches = type.match(/([^\?]*)(\?[^\?]*)?/)
            let comptype, compproperties, search
            if(!matches){
                comptype = type
                compproperties = {}
            }else{
                comptype = matches[1]
                search = matches[2] || ''
                compproperties = this.parseParams(search.substring(1))
            }

            return {
                componentType: comptype,
                componentProperties: compproperties
            }
        },

        parseParams (querystring) {
            let searchArr = (querystring || '').split('&') || []
            let params = {}
            
            searchArr.forEach(keyvalue => {
                let keyPair = keyvalue.split('=') || []
                if(keyPair[0]){
                    params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
                }
            });

            return params
        },

        refresh () {
            this.componentType = ''
            this.$nextTick(() => {
                this.initComponent()
            })
        },

        /**
         * 更新楼层
         */
        setMenuStyleOptions(val) {
            this.$emit('setMenuOptions', val)
        }
    }
    
}
</script>

<style scoped>

</style>

