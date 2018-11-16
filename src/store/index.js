import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import home from './modules/home'
import details from './modules/details'
import cart from './modules/cart'
import card from './modules/card'
import returnVal from './modules/returnVal'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    details,
    cart,
    card,
    returnVal
  },
  getters
})
