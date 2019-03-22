const coupon = {
  state: {
    coupponVisible: false
  },
  mutations: {
    changeCoupponVisible (state, coupponVisible) {
      console.log(141111)
      state.coupponVisible = coupponVisible
    }
  }
}
export default coupon
