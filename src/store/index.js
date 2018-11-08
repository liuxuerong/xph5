import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import home from './modules/home'
import details from './modules/details'
import cart from './modules/cart'
import card from './modules/card'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    details,
    cart,
    card
  },
  getters
})
