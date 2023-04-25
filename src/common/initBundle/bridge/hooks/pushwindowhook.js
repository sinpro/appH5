import _ from 'lodash'

let pushwindowhook = {
    
    /**
     * pushWindow前置回调
     * @param {Object} options pushWindow传递参数
     */
    preCall ({api, options}) {
        //打印日志
        console.info(`--${api}--${JSON.stringify(options)}`)
        
        //可处理页面的权限控制
    }
}

export default pushwindowhook