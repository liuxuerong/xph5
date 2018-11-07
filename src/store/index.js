import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import home from './modules/home'
import details from './modules/details'
import cart from './modules/cart'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    details,
    cart
  },
  getters
})
