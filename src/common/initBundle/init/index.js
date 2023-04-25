import vue from 'vue'
import store from './store'
import initApp from './app'
import url from './url'
import i18n from '../../../common/i18n'

/**
 * 初始化
 * @param {Object} options 初始化配置参数
 */
export default function (options) {

  console.info(window.location.href)

  vue.use(url)

  //vue实例化
  const mixins = [{store,i18n}]
  const vm = new vue(Object.assign({}, {mixins}, options))

  //应用初始化
  window.app = initApp({store, vm})

  if(process.env.MOCK){
    require('../../../../mock')
  }
}
