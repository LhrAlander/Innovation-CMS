import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import CategoryRoutes from './category'

Vue.use(Router)

const finalRoutes = routes.concat(CategoryRoutes)
console.log(routes)
console.log(finalRoutes)

// 滚动条滚回顶部
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

let router = new Router({
  // mode:'hash',
  scrollBehavior,
  routes: finalRoutes
})

export default router
