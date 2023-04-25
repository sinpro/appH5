<!--
    用于组件拖拉拽视图管理
    以下样式涉及像素px的使用style属性设置，避免构建器对px的编译转换影响
-->
<template>
    <div class="template_preview_pagepreviewcontainer" ref="container"
        @drop="dragitemDrop($event)"
        @dragover="dragitemAllowDrop($event)"
        :style="containerStyle">
        <div class="template_preview_pagepreviewcontainer_body" :style="bodyStyle">
            <template v-for="(info, index) in iFloorList">

                <!--拖拽时占位元素-->
                <div :key="info.id" v-if="info.__placeholder" class="template_preview_pagepreviewcontainer_placeholder"
                    :style="placeholderStyle"
                    @drop.stop="dragitemPlaceholderDrop($event, index)"
                    @dragover.stop="dragitemPlaceholderAllowDrop($event, index)">
                    <div class="template_preview_pagepreviewcontainer_placeholderdesc"
                        :style="placeholderdescStyle">组件放置区域</div>
                </div>

                <!--楼层元素-->
                <div v-else :key="info.id" class="template_preview_pagepreviewcontainer_floor" :style="styleMap[info.id]">

                    <preview-panel
                        ref="panel"
                        :itemInfo="info"
                        v-if="!refreshMap[info.id]"
                        class="template_preview_pagepreviewcontainer_panel"
                        :class="{'template_preview_pagepreviewcontainer_panelactive': (activeFloorId == info.id)}"
                        @click.native="floorSelect(info)"
                        @drop.native.stop="dragitemDrop($event, index)"
                        @dragover.native.stop="dragitemAllowDrop($event, index)"
                        @config="doConfig($event, info)">

                        <!--选中状态边框，不占用楼层元素空间-->
                        <div class="template_preview_pagepreviewcontainer_placeholderline"></div>

                        <!--工具按钮-->
                        <div class="template_preview_pagepreviewcontainer_tool" :style="toolStyle"
                            v-if="mode.showTool !== false">
                            <div class="template_preview_pagepreviewcontainer_arrow" :style="arrowStyle"/>
                            <div class="template_preview_pagepreviewcontainer_toolplaceholder" :style="toolplaceholderStyle"/>
                            <div class="template_preview_pagepreviewcontainer_toolwrap" :style="toolwrapStyle">
                                <img :src="(activeFloorId == info.id) ? require('./assets/icon_set_active.png') : require('./assets/icon_set.png')"
                                    :style="toolimgStyle"
                                    draggable="false"
                                    class="template_preview_pagepreviewcontainer_toolimg"
                                    title="设置"/>
                            </div>
                            <div class="template_preview_pagepreviewcontainer_toolwrap" :style="toolwrapStyle"
                                @click.stop="doOperate('up', info, index)">
                                <img src="./assets/icon_up.png" draggable="false"
                                    :style="toolimgStyle"
                                    class="template_preview_pagepreviewcontainer_toolimg"
                                    title="上移"/>
                            </div>
                            <div class="template_preview_pagepreviewcontainer_toolwrap" :style="toolwrapStyle"
                                @click.stop="doOperate('down', info, index)">
                                <img src="./assets/icon_down.png" draggable="false"
                                    :style="toolimgStyle"
                                    class="template_preview_pagepreviewcontainer_toolimg"
                                    title="下移"/>
                            </div>
                            <div class="template_preview_pagepreviewcontainer_toolwrap" :style="toolwrapStyle"
                                @click.stop="doOperate('delete', info, index)">
                                <img src="./assets/icon_delete.png" draggable="false"
                                    :style="toolimgStyle"
                                    class="template_preview_pagepreviewcontainer_toolimg"
                                    title="删除"/>
                            </div>
                        </div>
                    </preview-panel>

                    <!--楼层名称-->
                    <div class="template_preview_pagepreviewcontainer_panelname" v-if="mode.showName !== false && info.name"
                        :style="panelnameStyle"
                        @click="floorSelect(info)">
                        <div class="template_preview_pagepreviewcontainer_arrow" :style="arrowStyle"/>
                        <div class="template_preview_pagepreviewcontainer_panelnametext"
                            :style="panelnametextStyle">{{info.name}}</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import EngineManagerMixins from '../manage/EngineManagerMixins'
import PreviewPanel from '../manage/PreviewPanel'

export default {

    mixins: EngineManagerMixins,

    components: {
        PreviewPanel
    },

    props: {

        /**
         * 选中楼层ID
         */
        activeFloorId: {
            type: String,
            default: ''
        },

        /**
         * 滚动至视图域的楼层ID
         */
        scrollIntoViewId: {
            type: String,
            default: ''
        },

        /**
         * 页面数据
         */
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
         * 文档元素ID(父级元素，用于判断拖拽事件
         *  是否在当前容器外部，并清除相应占位元素)
         */
        dragoverId: {
            type: String,
            default: ''
        },

        /**
         * 视图与视图组件的映射关系
         */
        views: {
            type: Object,
            default () {
                return {}
            }
        },

        /**
         * 模式配置
         * mode.showTool 是否显示操作栏，默认显示
         * mode.showName 是否显示名称，默认显示
         */
        mode: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    data () {
        return {
            iFloorList: [],
            placeholderIndex: -1,
            refreshMap: {},
            styleMap: {},
            bDragging: false,

            containerStyle: {
                boxShadow: '0 0 12px 0 #E6E9EF'
            },
            bodyStyle: {
                minHeight: '600px'
            },
            placeholderStyle: {
                height: '48px'
            },
            placeholderdescStyle: {
                height: '30px',
                fontSize: '12px'
            },
            arrowStyle: {
                borderWidth: '5px',
                bottom: '7px',
                left: '-10px'
            },
            panelnameStyle: {
                width: '80px',
                right: '-10px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
                padding: '0 2px'
            },
            panelnametextStyle: {
                height: '24px',
                lineHeight: '24px',
                fontSize: '12px'
            },
            toolStyle: {
                right: '-10px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
                width: '30px'
            },
            toolplaceholderStyle: {
                left: '-10px',
                width: '10px'
            },
            toolwrapStyle: {
                height: '28px',
                padding: '4px'
            },
            toolimgStyle: {
                width: '20px',
                height: '20px'
            }
        }
    },

    created () {
        this.registerViews(this.views || {})
    },

    mounted () {
        window.pagepreview = this
        //dragover容器元素
        this.targetEl = this.dragoverId ? (document.querySelector(`#${this.dragoverId}`) || document.body) : document.body
        this.documentDragOverHandler = this.documentDragOver.bind(this)
        this.targetEl.addEventListener('dragover', this.documentDragOverHandler, false)
    },

    destroyed () {
        this.targetEl && this.targetEl.removeEventListener('dragover', this.documentDragOverHandler)
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
         * @param {Array} data.cards 渲染的卡片数据
         * @return {Array} 可用于直接渲染的视图数据
         */
        render (data = {}) {
            this.setContainerStyle(data.style)
            this.iFloorList = this.renderViews(data)
            window.console && window.console.info('pagerender==================', data, this.iFloorList)
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

        /**
         * 开始拖拽
         */
        startdrag () {
          this.bDragging = true
        },

        /**
         * 结束拖拽
         */
        enddrag () {
          this.bDragging = false
        },

        /**
         * 组件被选中处理
         * @param {Object} info 选中的楼层信息
         */
        floorSelect (info) {
            this.$emit('select', {targetId: info.id})
        },

        /**
         * 工具选择
         */
        doOperate (operate, info, index) {
            switch(operate){
                case 'delete':
                    //删除
                    this.$emit('delete', {targetId: info.id})
                    break
                case 'up':
                    //上移
                    if(index > 0){
                        this.$emit('adjust', {type: 'before', targetId: this.iFloorList[index - 1].id, srcId: info.id})
                    }
                    break
                case 'down':
                    //下移
                    if(index < this.iFloorList.length - 1){
                        this.$emit('adjust', {type: 'after', targetId: this.iFloorList[index + 1].id, srcId: info.id})
                    }
                    break
            }

        },

        /**
         * 拖拽元素释放后的时间处理
         */
        dragitemDrop (ev, index = ''){
            let datastr = ev.dataTransfer.getData('text')
            if(!this.dragitemIsAllowDrop(datastr)) return
            let data = JSON.parse(datastr)
            let itemInfo = data.itemInfo
            let info = this.iFloorList[index] || {}
            this.$emit('add', {targetId: info.id || '', data: itemInfo})

            this.removePlaceholer()
            ev.preventDefault()
        },

        /**
         * 是否允许被放置拖拽元素
         */
        dragitemAllowDrop (ev, index = '') {
            this.updatePlaceholer(index)
            ev.preventDefault()
        },

        /**
         * 占位元素拖拽释放事件
         * @param {DragEvent} ev 拖拽事件
         * @param {Number} index 占位元素索引
         */
        dragitemPlaceholderDrop (ev, index = '') {
            if(index !== '' && this.iFloorList[index + 1]){
                return this.dragitemDrop(ev, index + 1)
            }else{
                return this.dragitemDrop(ev)
            }
        },

        /**
         * 占位元素拖拽释放判断
         * @param {DragEvent} ev 拖拽事件
         * @param {Number} index 占位元素索引
         */
        dragitemPlaceholderAllowDrop (ev, index = '') {
            if(index !== '' && this.iFloorList[index + 1]){
                return this.dragitemAllowDrop(ev, index + 1)
            }else{
                return this.dragitemAllowDrop(ev)
            }
        },

        /**
         * 更新占位元素
         * @param {Number} index 目标元素索引
         */
        updatePlaceholer (index) {
            let placeholderIndex = this.placeholderIndex
            let placeholderInfo = {id: 'placeholder', __placeholder: true}
            let elementIndex = index === '' ? this.iFloorList.length : index

            if(placeholderIndex == elementIndex) return

            if(placeholderIndex == -1){
                //无占位元素场景
                if(!this.bDragging) return
                this.iFloorList.splice(elementIndex, 0, placeholderInfo)
                this.placeholderIndex = elementIndex
            }else{
                //删除占位元素
                this.removePlaceholer()

                //插入占位元素
                if(placeholderIndex >= elementIndex){
                    this.iFloorList.splice(elementIndex, 0, placeholderInfo)
                    this.placeholderIndex = elementIndex
                }else{
                    this.iFloorList.splice(elementIndex - 1, 0, placeholderInfo)
                    this.placeholderIndex = elementIndex - 1
                }
            }
        },

        /**
         * 删除占位元素
         */
        removePlaceholer () {
            for(let i = 0; i < this.iFloorList.length; i++){
                if(this.iFloorList[i].__placeholder){
                    this.iFloorList.splice(i, 1)
                    break
                }
            }
            this.placeholderIndex = -1
        },

        /**
         * 监听父节点dragover事件，判断当前的拖拽是否超出边界
         * @param {Event} e 事件对象
         */
        documentDragOver (e) {
            let clientX = e.clientX, clientY = e.clientY
            let {x, y, width, height} = this.$refs.container.getBoundingClientRect()

            if(clientX < x || clientY < y || clientX > x + width || clientY > y + height){
                this.removePlaceholer()
            }
        },

        /**
         * 判断是否允许放置
         */
        dragitemIsAllowDrop (datastr) {
            if(!datastr){
                return false
            }else{
                try{
                    let data = JSON.parse(datastr)
                    //数据标识判断
                    if(data.draggableLogo != 'preview'){
                        return false
                    }
                    return true
                }catch(e){
                    return false
                }
            }
        }
    },

    watch: {

        scrollIntoViewId () {
            let floorIndex = -1

            //获取楼层索引序号
            for(let i = 0; i < this.iFloorList.length; i++){
                let floorInfo = this.iFloorList[i]
                if(floorInfo.id == this.scrollIntoViewId){
                    floorIndex = i
                    break
                }
            }

            if(floorIndex > -1){
                this.$refs.panel[floorIndex].$el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        },

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
.template_preview_pagepreviewcontainer{
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 2px 8px 0 #F5F5FA;
    position: relative;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100%;

    .template_preview_pagepreviewcontainer_body{
        min-height: 600px;
    }

    .template_preview_pagepreviewcontainer_placeholder{
        width: 100%;
        height: 48px;
        background-image: url('./assets/icon_placeholder.png');
        background-position: 50%;
        background-color:#94b4eb;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .template_preview_pagepreviewcontainer_placeholderdesc{
        width: 40%;
        height: 30px;
        background-color: #5487DF;
        color: #FFFFFF;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .template_preview_pagepreviewcontainer_floor{
        position: relative;
        width: 100%;
        cursor: pointer;
    }

    .template_preview_pagepreviewcontainer_panel{
        width: 100%;
    }

    .template_preview_pagepreviewcontainer_panel:hover{

        &:before{
            position:absolute;
            content: '';
            top: 0;
            left: -1px;
            width: 0;
            height: 100%;
            z-index: 2000;
            border-left: 1px dashed #3671FF;
        }

        &:after{
            position:absolute;
            content: '';
            top: 0;
            right: -1px;
            width: 0;
            height: 100%;
            z-index: 2000;
            border-left: 1px dashed #3671FF;
        }

        .template_preview_pagepreviewcontainer_placeholderline{

            &:before{
                position:absolute;
                content: '';
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                z-index: 2000;
                border-top: 1px dashed #3671FF;
            }

            &:after{
                position:absolute;
                content: '';
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                z-index: 2000;
                border-top: 1px dashed #3671FF;
            }
        }
    }

    .template_preview_pagepreviewcontainer_panel.template_preview_pagepreviewcontainer_panelactive{

        &:before{
            position:absolute;
            content: '';
            top: 0;
            left: -1px;
            width: 0;
            height: 100%;
            z-index: 2000;
            border-left: 2px solid #3671FF;
        }

        &:after{
            position:absolute;
            content: '';
            top: 0;
            right: -1px;
            width: 0;
            height: 100%;
            z-index: 2000;
            border-left: 2px solid #3671FF;
        }

        .template_preview_pagepreviewcontainer_placeholderline{

            &:before{
                position:absolute;
                content: '';
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                z-index: 2000;
                border-top: 2px solid #3671FF;
            }

            &:after{
                position:absolute;
                content: '';
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                z-index: 2000;
                border-top: 2px solid #3671FF;
            }
        }
    }

    .template_preview_pagepreviewcontainer_arrow{
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-right-color: #fff;
        position: absolute;
        bottom: 7px;
        left: -10px;
    }

    .template_preview_pagepreviewcontainer_panel:hover{

        .template_preview_pagepreviewcontainer_tool{
            display: block;
        }

        &+.template_preview_pagepreviewcontainer_panelname{
            display: none;
        }
    }

    .template_preview_pagepreviewcontainer_panelname{
        position: absolute;
        width: 80px;
        right: -10px;
        top: 50%;
        transform: translateY(-50%) translateX(100%);
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
        padding: 0 2px;
        z-index: 1;

        .template_preview_pagepreviewcontainer_panelnametext{
            width: 100%;
            height: 24px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            font-size: 12px;
        }
    }

    .template_preview_pagepreviewcontainer_tool{
        position: absolute;
        right: 0;
        top: 50%;
        right: -10px;
        transform: translateY(-50%) translateX(100%);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
        z-index: 2;
        width: 30px;
        background-color: #FFFFFF;
        display: none;

        .template_preview_pagepreviewcontainer_arrow{
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .template_preview_pagepreviewcontainer_toolplaceholder{
        position: absolute;
        left: -10px;
        top: 0;
        width: 10px;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .template_preview_pagepreviewcontainer_toolwrap{
        height: 28px;
        text-align: center;
        padding: 4px;
    }

    .template_preview_pagepreviewcontainer_toolimg{
        width: 20px;
        height: 20px;
    }

    .template_preview_pagepreviewcontainer_level{
        display: flex;
        justify-content: flex-start;
        align-content: center;

        img{
            width: 100%;
        }
    }
}
</style>
