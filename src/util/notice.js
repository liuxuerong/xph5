import Vue from 'vue'

const notice = {
  alert: (title = '提示', content, showFn, hideFn) => {
    return Vue.$vux.alert.show({
      title: title,
      content: content,
      onShow () {
        if (typeof showFn === 'function') {
          showFn()
        }
      },
      onHide () {
        if (typeof hideFn === 'function') {
          hideFn()
        }
      }
    })
  },
  errorModal: (title, hideFn) => {
    return Vue.$vux.alert.show({
      title: title,
      onHide: hideFn
    })
  },
  loading: (text = 'loading') => {
    return Vue.$vux.loading.show({
      text: text
      // position: 'absolute'
    })
  },
  loadingHide: () => {
    return Vue.$vux.loading.hide()
  },
  // 操作弹窗
  // 操作框标题，操作框内容，确定按钮的回调函数
  confirm: (title, content, confirmGoods, confirmText = '确定') => {
    return Vue.$vux.confirm.show({
      title,
      content,
      confirmText,
      onConfirm  () {
        if (typeof confirmGoods === 'function') {
          confirmGoods()
        }
      }
    })
  },
  // 提示框
  // 提示内容，显示时间，提示框类型，提示框关闭后的回调函数
  // type 可选值 success, warn, cancel, text
  toast: (text, time, type, toastSucc) => {
    return Vue.$vux.toast.show({
      text: text,
      time: time,
      type: type,
      onShow () {
        if (typeof toastSucc === 'function') {
          toastSucc()
        }
      }
    })
  }
}

export default notice
