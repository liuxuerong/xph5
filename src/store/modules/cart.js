const cart = {
  state: {
    cartNum: 0,
    from: 1,
    goodsList: [],
    clearNum: [],
    isAllSelect: false
  },
  mutations: {
    changeCartNum (state, cartNum) {
      state.cartNum = cartNum
    },
    changeFrom (state, from) {
      state.from = from
    },
    changeClearNum (state, clearNum) {
      console.log(clearNum)
      state.clearNum = clearNum
    },
    changeGoodsList (state, goodsList) {
      state.goodsList = goodsList
      console.log(goodsList)
    },
    // changeNotCheckGoodsList (state, goodsList) {
    //   state.goodsList = goodsList
    // },
    changeIsAllSelect (state, isAllSelect) {
      console.log(isAllSelect)
      state.isAllSelect = isAllSelect
    }
  },
  actions: {
    refreshCart ({ commit }, {isAllSelect, goodsList, clearNum}) {
      console.log(goodsList)
      commit('changeIsAllSelect', isAllSelect)
      commit('changeGoodsList', goodsList)
      commit('changeClearNum', clearNum)
    }
  }
}
export default cart
