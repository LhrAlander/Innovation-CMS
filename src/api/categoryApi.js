import axios from 'utils/https'

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


// 获取所有项目级别
let getAllProjectLevels = function (levels) {
  return axios.get('/api/category/project/levels')
}
// 添加项目级别
let addProjectLevel = function (levels) {
  return axios.post('/api/category/add/project/levels', levels)
}
// 删除项目级别
let deleteProjectLevel = function (levels)  {
  return axios.post('/api/category/delete/project/levels', levels)
}

// 获取所有项目类别
let getAllProjectCategories = function (categories) {
  return axios.get('/api/category/project/categories')
}
// 添加项目类别
let addProjectCategory = function (categories) {
  return axios.post('/api/category/add/project/categories', categories)
}
// 删除项目类别
let deleteProjectCategory = function (categories)  {
  return axios.post('/api/category/delete/project/categories', categories)
}

// 获取所有团队类别
let getAllTeamCategories = function (categories) {
  return axios.get('/api/category/team/categories')
}
// 添加团队类别
let addTeamCategory = function (categories) {
  return axios.post('/api/category/add/team/categories', categories)
}
// 删除团队类别
let deleteTeamCategory = function (categories)  {
  return axios.post('/api/category/delete/team/categories', categories)
}


// 获取所有获奖级别
let getAllAwardLevels = function (levels) {
  return axios.get('/api/category/award/levels')
}
// 添加获奖级别
let addAwardLevel = function (levels) {
  return axios.post('/api/category/add/award/levels', levels)
}
// 删除获奖级别
let deleteAwardLevel = function (levels)  {
  return axios.post('/api/category/delete/award/levels', levels)
}

// 获取所有获奖类别
let getAllAwardCategories = function (categories) {
  return axios.get('/api/category/award/categories')
}
// 添加获奖类别
let addAwardCategory = function (categories) {
  return axios.post('/api/category/add/award/categories', categories)
}
// 删除获奖类别
let deleteAwardCategory = function (categories)  {
  return axios.post('/api/category/delete/award/categories', categories)
}

// 获取所有政策类别
let getAllPolicyCategories = function (categories) {
  return axios.get('/api/category/policy/categories')
}
// 添加政策类别
let addPolicyCategory = function (categories) {
  return axios.post('/api/category/add/policy/categories', categories)
}
// 删除政策类别
let deletePolicyCategory = function (categories)  {
  return axios.post('/api/category/delete/policy/categories', categories)
}

// 获取所有依托单位类别
let getAllDependentCategories = function (categories) {
  return axios.get('/api/category/dependent/categories')
}
// 添加依托单位类别
let addDependentCategory = function (categories) {
  return axios.post('/api/category/add/dependent/categories', categories)
}
// 删除依托单位类别
let deleteDependentCategory = function (categories)  {
  return axios.post('/api/category/delete/dependent/categories', categories)
}


// 获取所有状态类别
let getAllStateCategories = function (categories) {
  return axios.get('/api/category/state/categories')
}
// 添加状态类别
let addStateCategory = function (categories) {
  return axios.post('/api/category/add/state/categories', categories)
}
// 删除状态类别
let deleteStateCategory = function (categories)  {
  return axios.post('/api/category/delete/state/categories', categories)
}

let api = {
  getAllUserCategories,
  addUserCategory,
  deleteUserCategory,
  getAllProjectLevels,
  addProjectLevel,
  deleteProjectLevel,
  getAllProjectCategories,
  addProjectCategory,
  deleteProjectCategory,
  getAllTeamCategories,
  addTeamCategory,
  deleteTeamCategory,
  getAllAwardLevels,
  addAwardLevel,
  deleteAwardLevel,
  getAllAwardCategories,
  addAwardCategory,
  deleteAwardCategory,
  getAllPolicyCategories,
  addPolicyCategory,
  deletePolicyCategory,
  getAllDependentCategories,
  addDependentCategory,
  deleteDependentCategory,
  getAllStateCategories,
  addStateCategory,
  deleteStateCategory,
}

export default api