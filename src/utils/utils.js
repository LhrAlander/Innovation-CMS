// 不同表的名称常量
const filterName = {
  USER: 'user',
  user: {
    name: 'user_name',
    role: 'user_identity',
    status: 'account_state',
    username: 'user_id',
  }
}
//        标签的value格式化器根据 映射的字段类型，value的值，映射表来确定value值对应的label
function valueFormater(type, value, map){
  if (map[type] === undefined) {
    return value;
  }
  for (var item of map[type]) {
    if (item.value === value) {
      return item.label;
    }
  }
}
function resetObject(object) {
  let o = object;
  for (var key in o) {
    o[key] = '';
  }
  return o;
}


// 筛选字段映射成数据库字段名
function filter2Mysql(type, filter) {
  // 映射过程
  const transform = item => {
  console.log('进入映射', filter)
    
    for (let key in filter) {
      console.log(key)
      let value = String.trim(filter[key])
      if (value && value != null && value != '' && value != undefined) {
        filter[item[key]] = value
      }
      delete filter[key]
    }
  }
  switch(type) {
    case filterName.USER:
      return transform(filterName.user)
      break;
  }
}

// 将用户信息字段映射成数据库字段名
function displayInfo2MySql(type, displayInfo) {
  let res = {}
  const transform = item => {
    displayInfo.forEach(info => {
      info.items.forEach(item => {
        let key = filterName.user[item.key] || item.key
        let value = item.value
        res[key] = value
      })
    })
    return res
  }
  switch(type) {
    case filterName.USER:
      return transform(filterName.user)
  }
}

export {
  valueFormater,
  resetObject,
  filter2Mysql,
  filterName,
  displayInfo2MySql
}

