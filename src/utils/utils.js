// 不同表的名称常量
const filterName = {
  USER: 'user',
  STUDENT: 'student',
  TEACHER: 'TEACHER',
  COMPANY: 'COMPANY',
  PROJECT: 'PROJECT',
  TEAM: 'TEAM',
  POLICY: 'POLICY',
  policy: {
    policyTitle: 'policy_title',
    policyCategory: 'policy_identity',
    policyStates: 'state',
    publishTime: 'publish_time',
    publishPerson: 'publish_user'
  },
  project: {
    projectType: 'project_identity',
    projectId: 'project_id',
    projectName: 'project_name',
    projectLevel: 'project_level',
    projectDep: 'team_id',
    projectTeacher: 'project_teacher',
    projectPerson: 'project_principal',
    regYear: 'register_year',
    startYear: 'start_year',
    stopYear: 'finish_year'
  },
  team: {
    teamName: 'team_name',
    teamLeader: 'team_principal',
    teamTeacher: 'team_teacher',
    supportOrg: 'team_dependent_unit',
  },
  student: {
    studentId: 'user_id',
    name: 'user.user_name',
    status: 'account_state',
    institute: 'student_academy',
    specialty: 'student_major',
    class: 'student_class',
    gender: 'user_sex',
    username: 'user.user_id',
  },
  teacher: {
    teacherId: 'user.user_id',
    name: 'user.user_name',
    status: 'account_state',
    background: 'teacher_bachelor',
    degree: 'teacher_degree',
    specialty: 'teacher_major',
    gender: 'user_sex'
  },
  company: {
    companyName: 'company_name',
    principalName: 'company_principal',
    status: 'account_state',
    gender: 'user_sex',
    specAddress: 'company_address'
  },
  user: {
    name: 'user_name',
    role: 'user_identity',
    status: 'account_state',
    username: 'user_id',
  }
}
//        标签的value格式化器根据 映射的字段类型，value的值，映射表来确定value值对应的label
function valueFormater(type, value, map) {
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
        let _key = item[key] || key
        filter[_key] = value
      }
      delete filter[key]
    }
  }
  switch (type) {
    case filterName.USER:
      return transform(filterName.user)
      break;
    case filterName.STUDENT:
      return transform(filterName.student)
      break
    case filterName.TEACHER:
      return transform(filterName.teacher)
      break
    case filterName.COMPANY:
      return transform(filterName.company)
      break
  }
}

// 将修改信息字段映射成数据库字段名
function displayInfo2MySql(type, displayInfo) {
  let res = {}
  console.log(displayInfo)
  const transform = item => {
    displayInfo.forEach(info => {
      if ('items' in info) {
        info.items.forEach(_item => {
          let key = item[item.key] || _item.key
          console.log(key)
          let value = _item.value
          res[key] = value
        })
      }
      else {
        if (info.value !== undefined && info.key in item) {
          console.log(info.key + ': ' + info.value)
          res[item[info.key]] = info.value
        }
      }
    })
    return res
  }
  console.log(type)
  switch (type) {
    case filterName.USER:
      return transform(filterName.user)
      break
    case filterName.STUDENT:
      return transform(filterName.student)
      break
    case filterName.TEACHER:
      return transform(filterName.teacher)
      break
    case filterName.COMPANY:
      return transform(filterName.company)
      break
    case filterName.PROJECT:
      return transform(filterName.project)
      break
    case filterName.TEAM:
      return transform(filterName.team)
      break
    case filterName.POLICY:
      return transform(filterName.policy)
      break
  }
}

export {
  valueFormater,
  resetObject,
  filter2Mysql,
  filterName,
  displayInfo2MySql
}

