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
import notice from 'util/notice.js'
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
