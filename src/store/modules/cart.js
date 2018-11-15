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
      state.clearNum = clearNum
    },
    changeGoodsList (state, goodsList) {
      state.goodsList = goodsList
    },
    // changeNotCheckGoodsList (state, goodsList) {
    //   state.goodsList = goodsList
    // },
    changeIsAllSelect (state, isAllSelect) {
      state.isAllSelect = isAllSelect
    }
  }
}
export default cart
