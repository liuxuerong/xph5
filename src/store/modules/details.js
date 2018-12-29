const details = {
  state: {
    popupVisible: false,
    nowPrice: '',
    maxCount: Number
  },
  mutations: {
    changePopupVisible (state, popupVisible) {
      state.popupVisible = popupVisible
    },
    changeNowPrice (state, price) {
      state.nowPrice = price
    },
    changeMaxCount (state, count) {
      state.maxCount = count
    }
  },
  actions: {
    pushKeys  ({ commit }, arr) {
      console.log(arr)
      if (arr.length === 1) {
        commit('changeMaxCount', arr[0].stock)
      }
      let flag = true
      for (let i in arr) {
        if (arr[i].stock) {
          flag = false
        }
      }
      if (flag) {
        commit('changeMaxCount', 0)
      }
      // 处理返回数据
      let sku = {}
      sku.keys = []
      let temKeys = []
      sku.data = {}
      for (let i = 0; i < arr.length; i++) {
        const spec = JSON.parse(arr[i].spec)
        let dataKey = ''
        let temKeysObj = {}
        for (let j = 0; j < spec.length; j++) {
          let xx = i + '' + j

          spec[j].id = xx
          let flag = true

          if (temKeys.length > 1) {
            for (let k = 0; k < temKeys.length; k++) {
              if (temKeys[k].name === spec[j].key) {
                for (let h = 0; h < temKeys[k].value.length; h++) {
                  if (spec[j].value === temKeys[k].value[h].cname) {
                    xx = temKeys[k].value[h].id
                    flag = false
                    break
                  }
                }
              }
            }
          }
          if (dataKey === '') {
            dataKey = xx
          } else {
            dataKey += ';' + xx
          }
          if (!flag) {
            continue
          }
          temKeysObj = {
            name: spec[j].key,
            isActive: true,
            value: [{
              id: xx,
              cname: spec[j].value,
              isActiveC: false,
              notClick: false
            }]
          }

          temKeys.push(temKeysObj)
        }
        if (arr[i].pic === '') {
          arr[i].pic = this.goods.coverImage
        }
        if (arr[i].stock !== 0) {
          sku.data[dataKey] = {
            price: arr[i].price,
            count: arr[i].stock,
            goodsItemsId: arr[i].id,
            name: arr[i].name,
            pic: arr[i].pic
          }
        }
      }
      let result = {}
      for (let i = 0; i < temKeys.length; i++) {
        if (result[temKeys[i].name]) {
          result[temKeys[i].name].push(temKeys[i].value[0])
        } else {
          result[temKeys[i].name] = temKeys[i].value
        }
      }
      for (let key in result) {
        sku.keys.push({
          name: key,
          isActive: true,
          value: result[key]
        })
      }
      sku.SKUResult = {}
      return sku
    }

  }
}
export default details
