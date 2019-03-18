/**
 * 网络相关Api
 */
import {
  config
} from './config.js'
import {
  storage
} from './storage.js'
import {
  accessToken
} from './const.js'
import axios from 'axios'
import notice from './notice'
import router from '../router'
import { getUrlParam } from '@/func/params'
let baseUrl = config.baseUrl

// 获取token;
let getAccessToken = () => {
  let token = getUrlParam('token')
  let tokenOne = storage.getLocalStorage(accessToken)
  token = token ? `Bearer ${token}` : tokenOne
  return token
}

// 请求头设置
let headerOption = () => {
  return {
    Authorization: getAccessToken(),
    'content-type': 'application/json;'
  }
}
// switch (method) {
//   case 'GET':
//     return Object.assign({
//       'content-type': 'application/json;'
//     },
//     _accessToken
//     )
//   case 'POST':
//     return Object.assign({
//       'content-type': 'application/json;'
//     },
//     _accessToken
//     )
//   case 'DELETE':
//     return Object.assign({
//       'content-type': 'application/json;'
//     },
//     _accessToken
//     )
//   case 'PUT':
//     return Object.assign({
//       'content-type': 'application/json;'
//     },
//     _accessToken
//     )
// }
// http返回码状态判断
let state = (res, noLoading) => {
  if (noLoading) {
    // Loading隐藏
    notice.loadingHide()
  }
  if (res.code === undefined) {
    notice.errorModal('网络错误', function () {
      notice.loadingHide()
      router.go(0)
    })
  }
  switch (res.code) {
    case 302:
      notice.errorModal('302')
      break
    case 400:
      notice.errorModal('请求参数错误')
      break
    case 401:
      notice.errorModal('未授权，请重新登录', function () {
      })
      break
    case 403:
      notice.errorModal('拒绝访问')
      break
    case 404:
      notice.errorModal('请求错误,未找到该资源')
      break
    case 405:
      notice.errorModal('请求方法未允许')
      break
    case 408:
      notice.errorModal('请求超时')
      break
    case 500:
      notice.errorModal('服务器端错误')
      break
    case 502:
      notice.errorModal('服务器异常')
      break
    case 505:
      notice.errorModal('http版本不支持该请求')
      break
    case 12000:
      notice.errorModal('参数错误')
      break
    case 10002:
      notice.errorModal('未授权，请重新登录', function () {
        router.push({path: '/login'})
      })
      break
  }
}

// storage.delLocalStorage(accessToken)
// this.navigateTo({
//   url: '../login/login'
// })
/**
 * opts 包含url和method的对象
 * params 请求的参数
 */
export const http = (opts, params, noLoading) => {
  if (!noLoading || noLoading === 'undefined') {
    notice.loading()
    // setTimeout(function () {
    //   notice.loading()
    // }, 300)
  }
  // 请求默认配置
  let httpDefaultOptions = {}
  httpDefaultOptions = {
    url: baseUrl + opts.version + opts.url,
    method: opts.method,
    headers: headerOption(opts.method),
    timeout: 30000,
    params: Array.isArray(params) && opts.join ? {} : params,
    data: Array.isArray(params) && opts.join ? {} : params
  }
  if (opts.method === 'GET' || opts.method === 'DELETE' || opts.method === 'HEAD') {
    delete httpDefaultOptions.data
  } else {
    delete httpDefaultOptions.params
  }
  // 如果参数是连接在url后面的形式
  if (opts.join && Array.isArray(params)) {
    params.forEach(c => {
      httpDefaultOptions.url += '/' + c
    })
  }
  // 响应拦截器即异常处理
  axios.interceptors.request.use(data => {
    // notice.loadingHide()
    return data
  }, err => {
    console.log(err)
    return Promise.resolve(err)
  })
  axios.interceptors.response.use(response => {
    if (response.status && response.status === 200) {
      state(response.data)
    }
    notice.loadingHide()
    return response
  }, err => {
    state(err, '')
    return Promise.resolve(err.response)
  })

  return axios(httpDefaultOptions)
}
