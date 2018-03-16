/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 50000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  let token = store.state.token || window.localStorage.getItem('token') || null
  console.log('token', token)
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (store.state.authToken != '') {
    config.headers.authToken = store.state.authToken
  }
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  console.log(error)
  loadinginstace.close()
  if (error.response) {
    console.log(error.response)
    Message.error({
      message: error.response.data || '加载失败'
    })
    switch (error.response.status) {
      case 401:
        store.commit('cancelAuth')
        store.commit('logout')
        router.push({ path: '/' })
    }
  }
  else {
    Message.error({
      message: '加载失败'
    })
    store.commit('logout')
    router.push({ path: '/' })
  }

})

export default axios