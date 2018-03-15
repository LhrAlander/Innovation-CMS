let login = (state, token) => {
  state.token = token
  state.isLogin = true
}
let isLogin = state => {
  return !(state.token == null)
}

let logout = (state) => {
  state.token = null
  state.isLogin = false
  window.localStorage.removeItem('token')
}

export default {
  login,
  isLogin,
}