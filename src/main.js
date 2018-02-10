import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import utils from './utils/utils'
import Element from 'element-ui'
import store from './store'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import '@/assets/css/coverElementUI.css'

Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
