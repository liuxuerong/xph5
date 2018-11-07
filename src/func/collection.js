import {
  storage
} from 'util/storage.js'
import {
  accessToken
} from 'util/const.js'
import {
  http
} from 'util/request'
import router from '../router'
import {
  isCollection,
  opCollection
} from 'util/netApi'
import axios from 'axios'
import notice from 'util/notice.js'
import { config } from 'util/config' // 图片路径
export const hasCollection = (params) => {
  if (storage.getLocalStorage(accessToken)) {
    return http(isCollection, params)
  }
}
export const doCollection = (params) => {
  if (storage.getLocalStorage(accessToken)) {
    return http(opCollection, params, 'noLoading')
  } else {
    notice.errorModal('未授权，请重新登录', function () {
      router.push({path: '/login'})
    })
  }
}
export const uploadPic = (e) => {
  let ss = e.target.files
  let formData = new FormData()
  formData.append('file', ss[0])
  let cf = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': storage.getLocalStorage(accessToken)
    }
  }
  return axios.post(config.baseUrl + 'file/upload', formData, cf)
}
