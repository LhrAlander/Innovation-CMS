let login = (state, token) => {
  state.token = token
  state.isLogin = true
}
let isLogin = state => {
  return !(state.token == null)
}

let logout = (state) => {
  state.token = null
  state.authToken = ''
  state.isLogin = false
  window.localStorage.removeItem('token')
}

let addAuthToken = (state, token) => {
  state.authToken = token
}

let cancelAuth = (state) => {
  state.authToken = ''
}

let setLoginUser = (state, user) => {
  state.user = user
}

export default {
  login,
  isLogin,
  addAuthToken,
  cancelAuth,
  setLoginUser
}