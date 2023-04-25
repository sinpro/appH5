
import Vue from 'vue'

 let g_counter = 0
 let g_prefixmap = {}

class EngineManager {

    constructor() {
        this.viewPrefix = `element_${g_counter++}_`
        this.views = {}
        this.defaultView = 'TPreviewDefaultView'
    }

    /**
     * 配置引擎
     * @param {Object} options 配置信息
     */
    configureEngine (options = {}) {
        this.defaultView = options.defaultView || ''
    }

    /**
     * 注册视图组件集合
     * @param {Object} views 视图集对象
     */
    registerViews (views = {}) {
        for(let key in views){
            this.registerView(key, views[key])
        }
    }

    /**
     * 注册视图组件
     */
    registerView (key, view) {
        this.views[key] = view
        this._registerVue(key, view)
    }

    /**
     * 注册组件
     */
    _registerVue (key, view) {
        let VueClass = window.Vue || Vue

        //未注册
        if(!g_prefixmap[key]){
            //存储key对应的前缀（避免相同组件库重复使用时重复注册）
            g_prefixmap[key] = this.viewPrefix

            //注册组件，给组件增加命名空间，避免全局相互影响，不可轻易改动，外部需对应此名称显示组件
            VueClass.component(`${this.viewPrefix}${key}`, view)
        }
    }

    /**
     * 获取组件名称对应的最终组件名称
     * @param {String} name 组件名称
     */
    _getVueType (name) {
        let viewPrefix = g_prefixmap[name] || ''
        return `${viewPrefix}${name}`
    }

    /**
     * 根据卡片信息获取视图数据列表
     * @param {Array} iList 视图列表集合
     * @param {Object} itemInfo 卡片信息
     */
    getViewListByCard (iList = [], itemInfo = {}) {
        let type = this._getVueType(itemInfo.type || '')
        let VueClass = window.Vue || Vue
        type = VueClass.component(type) ? type : this.defaultView

        iList.push({
            //楼层ID
            id: itemInfo.id,
            //楼层名称
            name: itemInfo.name,
            //组件类型
            type: type,
            //组件属性集
            properties: itemInfo.properties || {},
        })
    }

    /**
     * 根据卡片集获取视图数据列表
     * @param {Array} iList 视图列表集合
     * @param {Array} cards 卡片数据集合
     */
    getViewListByCards (iList = [], cards = []) {
        let cardLen = cards.length

        for(let i = 0; i < cardLen; i++){
            this.getViewListByCard(iList, cards[i])
        }
    }
}

export default EngineManager
