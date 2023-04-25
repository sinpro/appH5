import Vue from 'vue'

let defaultPaths = URL_PATH

/**
 * 图片地址替换
 * @param {String} url 图片地址
 */
function replaceUrl (url) {
  try{
    let paths = Object.assign({}, defaultPaths)
    for(let pathKey in paths){
      let pathValue = paths[pathKey]
      //区分大小写
      url = url.replace(new RegExp(pathKey, 'g'), pathValue)
    }
  }catch(e){
    window.console && console.info(e)
  }

  return url
}

/**
 * 安装注入
 * @param {Window} targetWindow 目标窗口对象
 */
function install () {
  use(replaceUrl)

  Vue.prototype.$replaceUrl = replaceUrl
  Vue.prototype.$installIframe = (targetWindow) => {
    use(replaceUrl, targetWindow)
  }
}

/**
 * 触发监听
 * @param {Function} replaceUrl 地址替换函数
 * @param {Window} targetWindow 目标窗口对象
 */
function use (replaceUrl = url => url, targetWindow = window) {

  //监听vue常用图片处理
  let setAttribute = targetWindow.HTMLElement.prototype.setAttribute
  targetWindow.HTMLElement.prototype.setAttribute = function() {
    let args = [].slice.apply(arguments)
    let key = args[0]
    let value = args[1]
    let tagName = this.tagName.toLowerCase()

    if((tagName == 'img' || tagName == 'video' || tagName == 'source') && key == 'src' && value && typeof value == 'string'){
      args[1] = replaceUrl(args[1], 'img')
    }
    return setAttribute.apply(this, args)
  }

  let setProperty = targetWindow.CSSStyleDeclaration.prototype.setProperty
  targetWindow.CSSStyleDeclaration.prototype.setProperty = function() {
    let args = [].slice.apply(arguments)
    let key = args[0]
    let value = args[1]
    let properties = ['backgroundImage', 'background-image', 'background']

    if(key && properties.indexOf(key) > -1 && value && typeof value == 'string'){
      args[1] = replaceUrl(args[1], key)
    }
    return setProperty.apply(this, args)
  }

  targetWindow.Object.defineProperty(targetWindow.CSSStyleDeclaration.prototype, 'backgroundImage', {
    get: function(){
      return this.getPropertyValue('background-image')
    },
    set: function(val) {
      this.setProperty('background-image', val)
    },
  })

  targetWindow.Object.defineProperty(targetWindow.CSSStyleDeclaration.prototype, 'background', {
    get: function(){
      return this.getPropertyValue('background')
    },
    set: function(val) {
      this.setProperty('background', val)
    },
  })
}

export default {
  install,
}
