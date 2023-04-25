import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const _ = require('lodash')
import ynet_remoteCountData from './pagesStore/ynet_remoteCount'
export default new Vuex.Store({
    modules: {
        ynet_remoteCountData,     //远程柜台
    },
	state: {

        /**
         * 会话ID
         */
        sessionID: '',

        /**
         * 登录信息
         */
		userInfo: {}
    },
    
	getters: {

		userInfo ({userInfo}) {
			return userInfo
		},

		loginStatus ({userInfo}) {
			return !_.isEmpty(userInfo)
		}
    },
    
	mutations: {

        updateSessionInfo (state, sessionID = '') {
            //设置window变量与rpc解耦合
            window.sessionID = state.sessionID = sessionID
        },

		updateUserInfo(state, info = {}){
			state.userInfo = info
        },

        cleanSessionInfo(state, info = {}){
            //设置window变量与rpc解耦合
            window.sessionID = state.sessionID = ''
			state.userInfo = info
        }
    },
    
	actions: {

        /**
         * 初始化数据状态
         * @param {Object} param0 状态存储对象
         * @param {Object} options 初始化参数
         */
		initStore ({dispatch}, options) {
			return dispatch('initSessionInfo', options)
        },
        
        /**
         * 初始化会话状态
         * @param {Object} param0 状态存储对象
         * @param {Object} options 初始化参数
         */
        initSessionInfo ({dispatch}, options) {
			return Promise.all([
				dispatch('commitSessionInfo', options),
				dispatch('commitUserInfo', options)
			])
        },

        /**
         * 清理会话状态
         * @param {Object} param0 状态存储对象
         */
        cleanSessionInfo ({dispatch}) {
            dispatch('cleanSessionInfo')
        },
        
        /**
         * 处理会话状态
         * @param {Object} param0 状态存储对象
         * @param {Object} options 参数
         */
        commitSessionInfo({commit}, {app}){
			return new Promise(resolve => {
				let callback = res => {
					commit('updateSessionInfo', res)
					resolve()
				}

				//获取会话信息
				app.api.getSessionID().then(callback, resolve)
			})
		},

        /**
         * 处理用户状态
         * @param {Object} param0 状态存储对象
         * @param {Object} options 参数
         */
		commitUserInfo({commit}, {app}){
			return new Promise(resolve => {
				let callback = res => {
                    //仅存储用户信息，不存储报文结构 res 为登录整体报文
					commit('updateUserInfo', (res.userInfo || {}).body || {})
					resolve()
				}

				//异常处理，不可约定
				app.api.getUserInfo().then(callback, resolve)
			})
		}
		
	}
})