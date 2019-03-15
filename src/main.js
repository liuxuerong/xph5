// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import 'lib-flexible/flexible'
import 'styles/reset.css'
import 'styles/common.css'
import 'styles/border.css'
import { AlertPlugin, LoadingPlugin, Confirm, ConfirmPlugin, ToastPlugin } from 'vux'
import Vuelidate from 'vuelidate'
/* eslint-disable no-unused-vars */
// import vConsole from '@/assets/vconsole.js'
Vue.use(AlertPlugin)

Vue.use(LoadingPlugin)
Vue.use(Confirm)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(VueLazyLoad, {
  error: '../../images/defaultImg.png',
  loading: '../../images/defaultImg.png'
})
fastClick.attach(document.body)
Vue.use(Vuelidate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
