<template>
    <div class="template_preview_previewcontainer" :style="containerStyle">
        <template v-for="(info, index) in iFloorList">
            <div :key="index" v-if="!refreshMap[info.id]"
                class="template_preview_previewcontainer_item"
                :style="styleMap[info.id]">
                <preview-panel
                    :itemInfo="info"
                    class="template_preview_previewcontainer_panel"
                    v-on="$listeners"
                    @config="doConfig($event, info)"/>
            </div>
        </template>
    </div>
</template>
<script>
import PreviewPanel from './PreviewPanel'
import EngineManagerMixins from './EngineManagerMixins'

export default {

    mixins: EngineManagerMixins,

    components: {
        PreviewPanel
    },

    props: {

        data: {
            type: Object,
            default () {
                return {}
            }
        },

        /**
         * 刷新楼层数据
         */
        refreshFloorData: {
            type: Object,
            default () {
                return {}
            }
        },

        /**
         * 视图与视图组件的映射关系
         */
        views: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    data () {
        return {
            containerStyle: {},
            iFloorList: [],
            refreshMap: {},
            styleMap: {},
        }
    },

    created () {
        this.registerViews(this.views || {})
        this.render(this.data)
    },

    methods: {

        /**
         * 楼层配置
         * @param {Object} eventInfo 事件信息
         * @param {Object} info 楼层信息
         */
        doConfig (eventInfo = {}, info = {}) {
            switch(eventInfo.type){
                //对组件在编辑场景提供容器配置能力
                case 'style':
                    this.$set(this.styleMap, info.id, Object.assign({}, eventInfo.config))
                    break
                default:
                    break
            }
        },

        /**
         * 渲染组件视图
         * @param {Object} data 视图xml数据以及配置数据
         * @param {Array}  data.cards 渲染的卡片数据
         * @return {Array} 可用于直接渲染的视图数据
         */
        render (data = {}) {
            let starttime, endtime
            let startCallback = () => {
                starttime = (new Date()).getTime()
            }
            let endCallback = () => {
                endtime = (new Date()).getTime()
                window.console && console.info('数据解析时间===========', endtime - starttime)
            }

            startCallback()
            this.setContainerStyle(data.style)
            this.iFloorList = this.renderViews(data)
            window.console && console.info('floorrender==================', data, this.iFloorList)
            endCallback()
        },

        /**
         * 设置容器样式
         */
        setContainerStyle (style = {}) {
          this.containerStyle = Object.assign({}, this.containerStyle, {
            backgroundColor: this.doParseColor(style.bgcolor),
            backgroundImage: (style.hasbgimage == '1' && style.bgimage) ? `url(${style.bgimage})` : ''
          })
        },

        /**
         * 刷新单个楼层组件
         * @param {String} id 楼层ID
         * @param {Object} props 属性集
         */
        refreshView (id = '', props = {}) {

            //设置属性
            for(let i = 0; i < this.iFloorList.length; i++){
                let floorInfo = this.iFloorList[i]
                if(floorInfo.id == id){
                    floorInfo.properties = props
                }
            }

            this.$set(this.refreshMap, id, true)

            //刷新
            this.$nextTick(() => {
                this.$set(this.refreshMap, id, false)
            })
        },
    },

    watch: {

        data (val) {
            this.render(val)
        },

        refreshFloorData (val = {}) {
            val.id && val.properties && this.refreshView(val.id, val.properties || {})
        }
    }
}
</script>
<style lang="scss" scoped>
.template_preview_previewcontainer{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100%;

    .template_preview_previewcontainer_item{
        position: relative;
        width: 100%;
    }

    .template_preview_previewcontainer_panel{
        width: 100%;
    }
}
</style>
