import PreviewContainer from './preview/manage/PreviewContainer'
import PagePreviewProxy from './preview/manageview/PagePreviewProxy'
import PreviewProxy from './preview/manageview/PreviewProxy'
import PreviewListProxy from './preview/manageview/PreviewListProxy'

export default {

  /**
   * 安装组件库
   */
  install (Vue) {
    Vue.component('TPagePreviewProxy', PagePreviewProxy)
    Vue.component('TPreviewProxy', PreviewProxy)
    Vue.component('TPreviewListProxy', PreviewListProxy)
  },
}

export {
  PagePreviewProxy,
  PreviewProxy,
  PreviewListProxy,
  PreviewContainer,
}
