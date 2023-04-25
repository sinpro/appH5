import qs from 'qs'
import { getCookie, setCookie } from './cookie'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true
})

// 获取请求数据主体
const getRequestBody = (body, header) => {
  let finalBody = ''
  const type = header.type
  if (!body) {
    body = {}
  }
  if (type === 'K') {
    finalBody = qs.stringify(body)
  } else if (type === 'J') {
    finalBody = JSON.stringify({body: body, header: header})
  } else {
    throw new Error('unExcept type!')
  }
  return finalBody
}

Axios.interceptors.request.use(config => {
  NProgress.start()
  const date = new Date()
  const channelDate = date.getFullYear() + (date.getMonth() + 1) + date.getDate()
  const channelTime = date.getHours() + date.getMinutes() + date.getSeconds()
  const transId = `AT${Date.now()}`
  let type = config.type || 'K'
  let headers = {
    type,
    encry: '0',
    channel: 'AT',
    transId: transId,
    channelFlow: transId,
    transCode: config.url.replace(/(.*\/)*([^.]+).*/ig, '$2'),
    channelDate: channelDate,
    channelTime: channelTime,
    iCIFID: getCookie('iCIFID') || '',
    eCIFID: getCookie('eCIFID') || '',
    'Accept': 'application/json',
    'Content-Type': type === 'K' ? 'application/x-www-form-urlencoded;charset=utf-8;multipart/form-data' : 'application/json;charset=utf-8;multipart/form-data'
  }
  config.headers = headers
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.data = getRequestBody(config.data, config.headers)
  }
  return config
}, err => {
  MessageBox.confirm(err, '错误', {
    confirmButtonText: '确认',
    showCancelButton: false,
    type: 'error'
  })
  return Promise.reject(err)
})

Axios.interceptors.response.use(res => {
  NProgress.done()
  // 自己添加的配置
  const delayTime = 24 * 60 * 60 * 1000
  if (!res.data.hasOwnProperty('body')) {
    return res
  }
  // console.log(res)
  const { status, data } = res
  const { header, body } = data
  const { errorCode, errorMsg } = body
  header.iCIFID ? setCookie('iCIFID', header.iCIFID, delayTime) : setCookie('iCIFID', body.iCIFID, delayTime)
  if (errorCode !== '0') {
    // alert(`请求失败！[${errorCode}] [${errorMsg}]`)
    MessageBox.alert(errorMsg, '错误', {
      confirmButtonText: '确认',
      showCancelButton: false,
      type: 'error'
    }).then(() => {
      if (errorCode === 'BLEC0001' || errorCode === 'SYEC0002') {
        // window.location.replace(routeRootPath + routeLoginPath)
      }
    })
  }
  switch (status) {
    case 403:
      alert('错误403')
      return null

    case 404:
      alert('错误404')
      return null

    case 500:
      alert('错误500')
      return null

    case 502:
      alert('错误502')
      return null

    default:
      return res
  }
}, err => {
  MessageBox.confirm('数据请求发生错误，请检查网络！', '错误', {
    confirmButtonText: '确认',
    showCancelButton: false,
    type: 'error'
  })
  return Promise.reject(err)
})

export default Axios
