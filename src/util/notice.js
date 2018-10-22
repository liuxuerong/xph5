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
  errorModal: (title) => {
    return Vue.$vux.alert.show({
      title: title
    })
  },
  loading: (text = 'loading') => {
    return Vue.$vux.loading.show({
      text: text,
      position: 'absolute'
    })
  }
}

export default notice
