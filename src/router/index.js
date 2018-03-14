import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import CategoryRoutes from './category'
import InfoOperateRoutes from './infoOperate'
import TeacherRoutes from './teacher'
import StudentRoutes from './student'
import store from '../store/index'

Vue.use(Router)

const finalRoutes = routes.concat(CategoryRoutes, InfoOperateRoutes,TeacherRoutes,StudentRoutes);

// 滚动条滚回顶部
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
};

let router = new Router({
  // mode:'hash',
  scrollBehavior,
  routes: finalRoutes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = store.state.token || window.localStorage.getItem('token') || null
    if (token == null) {
      next({
        path: '/Login',
      })
    } else {

      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
