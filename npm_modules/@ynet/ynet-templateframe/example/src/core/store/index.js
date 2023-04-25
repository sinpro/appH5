
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({

    /**
     * 状态信息
     */
    state,

    /**
     * 状态获取
     */
    getters,

    /**
     * 状态修改
     */
    mutations,

    /**
     * 逻辑操作状态
     */
    actions
})
