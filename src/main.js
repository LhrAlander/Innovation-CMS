import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'

import '@/assets/css/base.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.config.productionTip = false
Vue.use(Element, { locale })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
