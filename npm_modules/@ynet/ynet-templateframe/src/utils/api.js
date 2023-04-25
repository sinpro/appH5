import Axios from './index'
// import api from '~/constants/api'

// 服务接口路径补全

let serverPath = window.g_serverPath || '/inmanage_lb'
const rq = name => `${serverPath}/${name}`

export const API = {
    addFloorStyleAllocation: rq('CC0153.do'),
    editFloorStyleAllocation: rq('CC0154.do'),
    addCarouselStyle: rq('CC0251.do'),
    eidtMenuStyleRpc: rq('CC0252.do'),
    eidtStyle: rq('CC0252.do'),
    eidtPalaceStyle: rq('CC0253.do'),
    eidtPalaceStyleNew: rq('CC0256.do'),
    getMenuList: rq('CC0003.do'),
    queryProductList: rq('CC0113.do'),
    getCustomList: rq('CC0214.do')
}

export const addFloorStyleAllocation = data => {
    return Axios({
        method: 'post',
        url: API.addFloorStyleAllocation,
        data:data
    })
}

export const addCarouselStyle = data => {
    return Axios({
        method: 'post',
        url: API.addCarouselStyle,
        data:data
    })
}

export const getMenuList = data => {
    return Axios({
        method: 'post',
        url: API.getMenuList,
        data:data
    })
}

export const eidtMenuStyleRpc = data => {
    return Axios({
        method: 'post',
        url: API.eidtMenuStyleRpc,
        data:data
    })
}

export const editFloorStyleAllocation = data => {
    return Axios({
        method: 'post',
        url: API.editFloorStyleAllocation,
        data:data
    })
}

export const eidtFloor = data => {
    return Axios({
        method: 'post',
        url: API.editFloorStyleAllocation,
        data:data
    })
}

export const eidtStyle = data => {
    return Axios({
        method: 'post',
        url: API.eidtStyle,
        data:data
    })
}

export const eidtPalaceStyle = data => {
    return Axios({
        method: 'post',
        url: API.eidtPalaceStyle,
        data:data
    })
}

export const eidtPalaceStyleNew = data => {
    return Axios({
        method: 'post',
        url: API.eidtPalaceStyleNew,
        data:data
    })
}

export const queryProductList = data => {
    return Axios({
        method: 'post',
        url: API.queryProductList,
        data:data
    })
}

export const getCustomList = data => {
    return Axios({
        method: 'post',
        url: API.getCustomList,
        data:data
    })
}