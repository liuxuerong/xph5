/**
 * 网络相关Api
 */
import { config } from './config.js'
import { storage } from './storage.js'
import { accessToken } from './const.js'
import axios from 'axios'

let baseUrl = config.baseUrl

// 获取token;
let getAccessToken = () => {
  let token = storage.getLocalStorage(accessToken)
  return 'Bearer ' + token
}

// 请求头设置
let headerOption = (method) => {
  let _accessToken = { 'Authorization': getAccessToken() }
  switch (method) {
    case 'GET':
      return Object.assign({ 'content-type': 'application/json;' }, _accessToken)
    case 'POST':
      return Object.assign({ 'content-type': 'application/json;' }, _accessToken)
    case 'DELETE':
      return Object.assign({ 'content-type': 'application/json;' }, _accessToken)
    case 'PUT':
      return Object.assign({ 'content-type': 'application/json;' }, _accessToken)
  }
}
// http返回码状态判断
// let state = (res, callback, noLoading) => {
//   // if (!noLoading || noLoading === 'undefined') {
//   //   // Loading隐藏
//   //   // wx.hideLoading()
//   // }
//   // if (res.errMsg === 'request:fail timeout') {
//   //   // errorModal({ content: '连接超时' })
//   //   return
//   // }
//   // switch (res.statusCode) {
//   //   case 200:
//   //     // code判断
//   //     code(res, callback)
//   //     break
//   //   case 302:
//   //     // errorModal({ content: '302' })
//   //     break
//   //   case 500:
//   //     // errorModal({ content: '500' })
//   //     break
//   //   case 502:
//   //     // errorModal({ content: '服务器异常' })
//   //     break
//   //   case 505:
//   //     // errorModal({ content: '505' })
//   //     break
//   //   case 404:
//   //     // errorModal({ content: '404' })
//   //     break
//   //   case 400:
//   //     // errorModal({ content: '400' })
//   //     break
//   //   case 400:
//   //     // errorModal({ content: '400' })
//   //     break
//   // }
// }
// code判断
// let code = (res, callback) => {
//   switch (res.data.code) {
//     case 0:
//       callback(res.data)
//       break
//     case 10003:
//       callback(res.data)
//       // errorModal({ content: res.data.message })
//       break
//     case 404:
//       // callback(res.data);
//       // errorModal({ content: res.data.message })
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
//       // let _memberAuth = storage.getStorageSync(memberAuth)
//       // 删除可能存在的memberAuth
//       storage.delLocalStorage(accessToken)
//       // wx.navigateTo({
//       //   url: '../login/login'
//       // })
//       break
//     default:
//       // errorModal({ content: res.data.message ? res.data.message : '意外错误' })
//   }
// }

/**
 * opts 包含url和method的对象
 * params 请求的参数
 */
export const http = (opts, params) => {
  // 请求默认配置
  let httpDefaultOptions = {
    url: baseUrl + opts.version + opts.url,
    method: opts.method,
    data: Array.isArray(params) && opts.join ? {} : params,
    header: headerOption(opts.method)
  }

  // 如果参数是连接在url后面的形式
  if (opts.join && Array.isArray(params)) {
    params.forEach((c) => {
      httpDefaultOptions.url += '/' + c
    })
  }

  // 创建promise实例
  let promise = new Promise(function (resolve, reject) {
    let expOptions = {
      success: function (res) {
        // state(res, resolve, noLoading)
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    }

    // 扩展请求配置
    httpDefaultOptions = Object.assign(httpDefaultOptions, expOptions)

    // 获取网络类型
    // wx.getNetworkType({
    //   success: function (res) {
    //     // 返回网络类型, 有效值：
    //     // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
    //     if (res.networkType !== 'none') {
    //       // 执行请求
    //       wx.request(httpDefaultOptions)
    //     } else {
    //       wx.hideLoading()
    //       warnToast('网络连接失败')
    //     }
    //   },
    //   fail: function (err) {
    //     wx.hideLoading()
    //     warnToast('未获取网络类型')
    //   }
    // })
  })
  console.log(httpDefaultOptions)
  axios(httpDefaultOptions)
  console.log(promise)
  // 返回promise实例
  return promise
}
