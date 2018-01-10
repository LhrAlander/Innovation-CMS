import axios from 'axios'

// 获取所有用户类别
let getAllUserCategories = function () {
  return axios.get('/api/category/users')
}

// 添加用户类别
let addUserCategory = function (categories) {
  return axios.post('/api/category/add/users', categories)
}

// 删除用户类别
let deleteUserCategory = function (categories) {
  return axios.post('/api/category/delete/users', categories)
}

let api = {
  getAllUserCategories,
  addUserCategory,
  deleteUserCategory
}

export default api