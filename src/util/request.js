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
let baseUrl = config.baseUrl

// 获取token;
let getAccessToken = () => {
  let token = storage.getLocalStorage(accessToken)
  return 'Bearer ' + token
}

// 请求头设置
let headerOption = method => {
  let _accessToken = {
    Authorization: getAccessToken()
  }
  switch (method) {
    case 'GET':
      return Object.assign({
        'content-type': 'application/json;'
      },
      _accessToken
      )
    case 'POST':
      return Object.assign({
        'content-type': 'application/json;'
      },
      _accessToken
      )
    case 'DELETE':
      return Object.assign({
        'content-type': 'application/json;'
      },
      _accessToken
      )
    case 'PUT':
      return Object.assign({
        'content-type': 'application/json;'
      },
      _accessToken
      )
  }
}
// http返回码状态判断
// let state = (res, callback, noLoading) => {
//   if (!noLoading || noLoading === 'undefined') {
//     // Loading隐藏
//     notice.loading()
//   }
//   if (res.errMsg === 'request:fail timeout') {
//     notice.errorModal('连接超时')
//     return
//   }
//   switch (res.statusCode) {
//     case 200:
//       // code判断
//       code(res, callback)
//       break
//     case 302:
//       notice.errorModal('302')
//       break
//     case 500:
//       notice.errorModalrModal('500')
//       break
//     case 502:
//       notice.errorModal('服务器异常')
//       break
//     case 505:
//       notice.errorModal('505')
//       break
//     case 404:
//       notice.errorModal('404')
//       break
//     case 400:
//       notice.errorModal('400')
//       break
//   }
// }
// code判断
// let code = (res, callback) => {
//   switch (res.data.code) {
//     case 0:
//       callback(res.data)
//       break
//     case 10003:
//       callback(res.data)
//       notice.errorModal(res.data.message)
//       break
//     case 404:
//       callback(res.data)
//       notice.errorModa(res.data.message)
//       break
//     case 12007:
//       // 支付失败
//       callback(res.data)
//       break
//     case 13001:
//       // 快递查询异常
//       callback(res.data)
//       break
//     case 10002:
//       // token失效
//       storage.delLocalStorage(accessToken)
//       // this.navigateTo({
//       //   url: '../login/login'
//       // })
//       break
//     default:
//       notice.errorModa(res.data.message ? res.data.message : '意外错误')
//   }
// }

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
  let httpDefaultOptions = {
    url: baseUrl + opts.version + opts.url,
    method: opts.method,
    data: Array.isArray(params) && opts.join ? {} : params,
    header: headerOption(opts.method)
  }

  // 如果参数是连接在url后面的形式
  if (opts.join && Array.isArray(params)) {
    params.forEach(c => {
      httpDefaultOptions.url += '/' + c
    })
  }
  // 请求拦截器
  // axios.interceptors.request.use(config => {
  //   // 发起请求时，取消掉当前正在进行的相同请求
  //   if (promiseArr[config.url]) {
  //     promiseArr[config.url]('操作取消')
  //     promiseArr[config.url] = cancel
  //   } else {
  //     promiseArr[config.url] = cancel
  //   }
  //   return config
  // }, error => {
  //   return Promise.reject(error)
  // })

  // 响应拦截器即异常处理
  // axios.interceptors.request.use(config => {
  //   console.log('cccccccc')
  //   return config
  // }, err => {
  //   state(11111111, noLoading)
  //   console.log(88888)
  //   return Promise.resolve(err)
  // })
  // axios.interceptors.response.use(response => {
  //   if (response.status && response.status === 200 && response.data.status === 'error') {
  //     state(33333, noLoading)
  //     console.log(99999)
  //     return
  //   }
  //   return response
  // }, err => {
  //   // if (err && err.response) {
  //   //   switch (err.response.status) {
  //   //     case 400:
  //   //       err.message = '错误请求'
  //   //       break
  //   //     case 401:
  //   //       err.message = '未授权，请重新登录'
  //   //       break
  //   //     case 403:
  //   //       err.message = '拒绝访问'
  //   //       break
  //   //     case 404:
  //   //       err.message = '请求错误,未找到该资源'
  //   //       break
  //   //     case 405:
  //   //       err.message = '请求方法未允许'
  //   //       break
  //   //     case 408:
  //   //       err.message = '请求超时'
  //   //       break
  //   //     case 500:
  //   //       err.message = '服务器端出错'
  //   //       break
  //   //     case 501:
  //   //       err.message = '网络未实现'
  //   //       break
  //   //     case 502:
  //   //       err.message = '网络错误'
  //   //       break
  //   //     case 503:
  //   //       err.message = '服务不可用'
  //   //       break
  //   //     case 504:
  //   //       err.message = '网络超时'
  //   //       break
  //   //     case 505:
  //   //       err.message = 'http版本不支持该请求'
  //   //       break
  //   //     default:
  //   //       err.message = `连接错误${err.response.status}`
  //   //   }
  //   // } else {
  //   //   err.message = '连接到服务器失败'
  //   // }
  //   // state(err, reject, noLoading)
  //   console.log(1213, err.message)
  //   state(err, noLoading)
  //   // message.err(err.message)

  //   return Promise.resolve(err.response)

  //   // return state(err, Promise.resolve(err.response), noLoading)
  // })

  return axios(httpDefaultOptions)
}
