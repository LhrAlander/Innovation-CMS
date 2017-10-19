import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)


// 滚动条滚回顶部
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

let router = new Router({
  mode:'hash',
  scrollBehavior,
  routes
})

export default router
