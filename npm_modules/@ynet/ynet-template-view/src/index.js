import PreviewContainer from './preview/manage/PreviewContainer'
import PreviewPanel from './preview/manage/PreviewPanel'

export default {

  /**
   * 安装组件库
   */
  install (Vue) {
    Vue.component('TPreviewContainer', PreviewContainer)
    Vue.component('TPreviewPanel', PreviewPanel)
  }
}

export {
    PreviewContainer,
    PreviewPanel,
}
