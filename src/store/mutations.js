let login = (state, token) => {
  state.token = token
  state.isLogin = true
}
let isLogin = state => {
  return !(state.token == null)
}


export default {
  login,
  isLogin,
}