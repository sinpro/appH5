<template>
    <div class="drag_container" :class="{'drag_container_actived':containerActived}" ref="dragContainer" @drop="mode && drop($event)" @dragover="mode && allowDrop($event)">
        <template-header class="header" :type="type" @click.native="mode && headerSelect()"></template-header>
        <template-frame :mode="mode" class="frame" v-for="(item, index) in itemList" :key="item.id"
            :type="item.type" :options="item.options"
            :class="{'template-active': (mode && activeItemId == item.id)}"
            @click.native="mode && templateSelect(item)"
            @drop.native="mode && dropItem(index)" 
            @dragover.native="mode && allowDrop($event)"
        >
            <template-tools @click.native="mode && toolClick($event)" class="tools" v-show="(mode && activeItemId == item.id)" 
                @toolSelect="mode && toolSelect($event, item)"
                :type="(item.top || item.top === 0) ? 't_top' : 't_common'"
                />
            <div class="frame_placeholderline"></div>
        </template-frame>
    </div>
</template>
<script>
import {indexOf, parseItem, getItemTop} from './utils'
import props from './utils/props'
import TemplateHeader from '../TemplateHeader'
import TemplateFrame from '../TemplateFrame'
import TemplateTools from '../TemplateTools'
import mockConfig from '../../../config/mock'

export default {

    props: props,

    components: {
        TemplateHeader,
        TemplateFrame,
        TemplateTools
    },

    data () {
        return {
            itemList: [],
            activeItemId: '',
            dropItemIndex: 0,
            instanceIndex: 0,
            containerActived: false
        }
    },

    created (){
        window.dragcontainer = this
        //容器标示
        this.containerID = 'Drag' + (new Date().getTime())

        //存储所有模板映射
        this.itemMap = {}

        //属性缓存
        this.propertiescache = {}

        //初始化创建选项
        this.initList(this.list)
    },

    mounted () {
        this.dropItemIndex = this.itemList.length
    },

    watch: {
        list (newVal) {
            //初始化创建选项
            this.initList(newVal)
        }
    },

    methods: {

        /**
         * @export
         * 获取选项列表的快照
         */
        getItemList () {
            return JSON.parse(JSON.stringify(this.itemList))
        },

        /**
         * @export
         * 获取当前选项的副本
         */
        getActiveItem () {
            return this.activeItemId ? Object.assign({}, this.itemMap[this.activeItemId]) : null
        },

        /**
         * @export
         * 更新模板项的风格
         */
        updateItemType (instanceIndex, type, options = {}) {
            let item = this.itemMap[instanceIndex]
            if(!item) return

            //切换风格
            item.subkind = type
            item.type = item.subkind ? (item.kind + '-' + item.subkind) : item.kind

            //切换数据
            for(let key in item.options){
                let exclude = options.exclude || {}
                if(key in exclude) continue
                delete item.options[key]
            }
            //更改数据不更改数据对象
            let mockoptions = mockConfig[item.type] ? (mockConfig[item.type].options || {}) : {}
            Object.assign (item.options, JSON.parse(JSON.stringify(mockoptions)))
        },

        /**
         * @export
         * 更新模板项的数据项
         */
        updateItemOptions (instanceIndex, options, bUpdate = true) {
            let item = this.itemMap[instanceIndex]
            if(!item) return
            Object.assign(item.options, options)
            //刷新项
            if(bUpdate !== false)
                this.updateItem(instanceIndex)
        },

        /**
         * @export
         * 更新模板项
         */
        updateItem (instanceIndex) {
            let item = this.itemMap[instanceIndex]
            if(!item) return
            let timestamp = new Date().getTime()
            let prefix = '__option_operation__'

            for(let key in item.options){
                if(key.indexOf(prefix) == 0){
                    delete item.options[key]
                }
            }
            this.$set(item.options, `__option_operation__${timestamp}__`, `${this.containerID}_${instanceIndex}_${timestamp}`)
        },

        /**
         * 初始化列表项
         */
        initList (list) {
            //初始化创建选项
            this.itemList.length = 0
            let len = (list || []).length
            for(let i = 0; i < len; i++){
                this.itemList.push(this.createItem(list[i], {isMock: false}))
            }
        },

        /**
         * 工具被选中处理
         */
        toolSelect (toolType, item) {
            let itemIndex = this.itemIndexOf(this.itemList, item)
            if(itemIndex == -1) return

            switch(toolType){
                case 'set': 
                    //设置
                    let event1 = this.eventWrap({item: Object.assign({}, item)})
                    this.emitEvent('itemSet', event1)
                    break
                case 'up': 
                    //上移
                    if(itemIndex != 0){
                        let nextItem = this.itemList[itemIndex - 1]
                        let next = () => {
                            this.$set(this.itemList, itemIndex, nextItem)
                            this.$set(this.itemList, itemIndex - 1, item)

                            let event = this.eventWrap({item: Object.assign({}, item)})
                            this.emitEvent('itemUpAfter', event)
                        }
                        if(this.canUp(nextItem)){
                            //前面不是至顶项可上移
                            let event2 = this.eventWrap({item: Object.assign({}, item), nextItem: Object.assign({}, nextItem), next})
                            this.emitEvent('itemUp', event2)
                        }
                    }
                    break
                case 'down': 
                    //下移
                    if(itemIndex != this.itemList.length - 1){
                        let nextItem = this.itemList[itemIndex + 1]
                        let next = () => {
                            this.$set(this.itemList, itemIndex, nextItem)
                            this.$set(this.itemList, itemIndex + 1, item)

                            let event = this.eventWrap({item: Object.assign({}, item)})
                            this.emitEvent('itemDownAfter', event)
                        }
                        let event3 = this.eventWrap({item: Object.assign({}, item), nextItem: Object.assign({}, nextItem), next})
                        this.emitEvent('itemDown', event3)
                    }
                    break;
                case 'delete': 
                    //删除
                    let next = () => {
                        this.itemList.splice(itemIndex, 1)
                        let event = this.eventWrap({item: Object.assign({}, item)})
                        this.emitEvent('itemDeleteAfter', event)
                    }
                    let event4 = this.eventWrap({item: Object.assign({}, item), next})
                    this.emitEvent('itemDelete', event4)
                    break;
            }
        },

        itemIndexOf(list, item){
            let len = list.length
            for(let index = 0; index < len; index++){
                if(list[index].id === item.id){
                    return index
                }
            }
            return -1
        },

        /**
         * 工具被点击，阻止事件冒泡，避免模板被触发点击事件
         */
        toolClick (event) {
            event.stopPropagation()
        },

        /**
         * 模板被选中处理
         */
        templateSelect (item) {
            this.containerActived = false
            if(this.activeItemId === item.id){
                //取消选中
                // this.activeItemId = ''
                // let event = this.eventWrap({item})
                // this.emitEvent('itemUnSelect', event)
            }else{
                //选中
                this.activeItemId = item.id
                let event = this.eventWrap({item: Object.assign({}, item)})
                this.emitEvent('itemSelect', event)
            }
        },

        /**
         * 容器被选中
         */
        headerSelect () {
            //取消模板选中状态
            this.activeItemId = ''
            this.containerActived = true

            let event = this.eventWrap({})
            this.emitEvent('headerSelect', event)
        },

        /**
         * 是否可上移
         */
        canUp (item) {
            return !(item.top || (item.top === 0))
        },

        /**
         * 创建模板选项
         */
        createItem (itemInfo, config = {}) {
            let itemObj = parseItem(itemInfo)
            let instanceId = this.generateInstanceId()
            let item
            let options

            if(config.isMock !== false && this.mode){
                //编辑模式  获取组件默认显示参数配置
                options = mockConfig[itemObj.type] ? (mockConfig[itemObj.type].options || {}) : {}
            }else{
                options = itemInfo
            }
            options = JSON.parse(JSON.stringify(options))
            
            item = Object.assign({}, itemObj, {
                options: options, id: instanceId 
            })

            //建立映射关系
            this.itemMap[instanceId] = item
            return item
        },
        
        /**
         * 生成选项唯一标示符
         */
        generateInstanceId () {
            return `instanceIndex${++this.instanceIndex}`
        },

        /**
         * 触发事件，支持事件条件过滤，并支持异步回调
         */
        emitEvent (eventName, event) {
            this.$emit(eventName, event)
            if(event.returnValue !== false){
                event.next && event.next()
                event.next = null
            }
        },

        /**
         * 事件包装
         */
        eventWrap(options){
            let event = Object.assign({}, options, {returnValue: true})
            event.preventDefault = () => {
                event.returnValue = false
            }
            return event
        },

        /**
         * 是否允许被放置拖拽元素
         */
        allowDrop (ev) {
            //处理条件
            let itemInfostr = ev.dataTransfer.getData('text')
            if(!itemInfostr){
                ev.preventDefault()
            }
        },

        /**
         * 拖拽元素释放后的时间处理
         */
        drop (ev){
            console.log('drop ev: ', ev)
            let itemInfostr = ev.dataTransfer.getData('text')
            console.log('hello, itemInfostr', itemInfostr)
            if(!itemInfostr){
                ev.preventDefault()
                return
            }
            let itemInfo = JSON.parse(itemInfostr)
            let insertItemIndex

            let next = () => {
                let item = this.createItem(itemInfo)
                this.itemList.splice(insertItemIndex, 0, item)
                //设置元素默认释放索引至最后
                this.dropItemIndex = this.itemList.length

                let event = this.eventWrap({itemInfo, item: Object.assign({}, item)})
                this.emitEvent('itemDropAfter', event)
            }

            if((insertItemIndex = this.getInsertIndex(itemInfo)) > -1){
                let nextItem = this.itemList[insertItemIndex]
                let event = this.eventWrap({itemInfo, next, nextItem: Object.assign({}, nextItem)})
                this.emitEvent('itemDrop', event)
            }
        },

        /**
         * 获取元素插入索引
         */
        getInsertIndex (itemInfo) {
            let insertItemIndex = this.dropItemIndex
            return this.getInsertedTopIndex(this.itemList, insertItemIndex, getItemTop(itemInfo))
        },

        /**
         * 获取元素能插入的索引
         */
        getInsertedTopIndex (itemList, insertItemIndex, top) {
            let len = itemList.length
            let i, item, itemTop, lastTop = -1, lastNormal = -1
            let lastInsertIndex = -1

            //处理非置顶元素不为空的情况
            for(i = 0; i < len; i++){
                item = itemList[i]
                itemTop = item.top

                if(itemTop) lastTop = i
                else lastNormal = i

                if(top){
                    if(itemTop){
                        if(parseFloat(top) <= parseFloat(itemTop)){
                            //置顶元素中
                            lastInsertIndex = i
                            break
                        }
                    }else{
                        //第一个非置顶元素
                        lastInsertIndex = i
                        break
                    }
                }else{
                    if(!itemTop){
                        if(parseFloat(insertItemIndex) <= parseFloat(lastTop)) lastInsertIndex = i
                        else lastInsertIndex = insertItemIndex
                        break
                    }
                }
            }

            if(lastTop == -1 && lastNormal == -1){
                //列表为空
                lastInsertIndex = 0
            }else if(lastInsertIndex == -1 && lastNormal == -1){
                //全部是置顶元素的情况
                lastInsertIndex = itemList.length
            }
            return lastInsertIndex
        },

        /**
         * 模板元素被释放 拖拽元素时事件处理
         */
        dropItem (index) {
            this.dropItemIndex = index
        }
        
    }

}
</script>
<style scoped>
    .drag_container{
        width: 320px;
        min-height: 666px; 
        border: 2px solid #F5F5FA;
        position: relative;
        background-color: #FFFFFF;
    }

    .drag_container_actived{
        border: 2px solid #3671FF;
    }

    .drag_container .header{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        cursor: pointer;
    }

    .drag_container .frame{
        position: relative;
    }

    .drag_container .frame.template-active:before{
        position:absolute;
        content: '';
        top: 0;
        left: -1px;
        width: 0;
        height: 100%;
        z-index: 10;
        border-left: 2px solid #3671FF;
    }

    .drag_container .frame.template-active:after{
        position:absolute;
        content: '';
        top: 0;
        right: -1px;
        width: 0;
        height: 100%;
        z-index: 10;
        border-left: 2px solid #3671FF;
    }

    .drag_container .frame.template-active .frame_placeholderline:before{
        position:absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        z-index: 10;
        border-top: 2px solid #3671FF;
    }

    .drag_container .frame.template-active .frame_placeholderline:after{
        position:absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        z-index: 10;
        border-top: 2px solid#3671FF;
    }

    .drag_container .tools{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) translateX(130%);
    }
</style>
