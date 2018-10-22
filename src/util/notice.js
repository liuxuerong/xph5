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
      text: text,
      position: 'absolute'
    })
  },
  loadingHide: () => {
    return Vue.$vux.loading.hide()
  }
}

export default notice
