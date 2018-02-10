import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const state = {
  token: '',    // 身份令牌
  user: {},   // 当前登录账号信息
}

export default new Vuex.Store({
	state,
	// getters,
	actions,
	mutations,
})