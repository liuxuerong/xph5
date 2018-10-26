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
import {AlertPlugin, LoadingPlugin, Confirm} from 'vux'

// defalut install

// with parameters install
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(Confirm)
Vue.use(VueLazyLoad, {
  error: '/static/images/defaultImg.png',
  loading: '/static/images/defaultImg.png'
})
Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
