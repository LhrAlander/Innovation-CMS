// 不同表的名称常量
const filterName = {
  USER: 'user',
  STUDENT: 'student',
  TEACHER: 'TEACHER',
  COMPANY: 'COMPANY',
  PROJECT: 'PROJECT',
  TEAM: 'TEAM',
  POLICY: 'POLICY',
  UNIT: 'UNIT',
  NOTIFICATION: 'NOTIFICATION',
  FILE_SYSTEM: 'FILE_SYSTEM',
  fileSystem: {
    category: 'file_type',
    title: 'title',
    status: 'state',
    publishTime: 'publish_time',
    publisherName: 'publish_user',
    effectiveDate: 'effective_time'
  },
  notification: {
    category: 'notification_identity',
    title: 'notification_title',
    status: 'notification_state',
    publishTime: 'publish_time',
    publisherName: 'publish_user',
    notificationTitle: 'notification_title',
    notificationIdentity: 'notification_identity',
    state: 'state',
    publisherUser: 'publish_user',
  },
  unit: {
    unitName: 'unit_name',
    unitType: 'unit_identity',
    unitAddress: 'unit_address',
    unitPerson: 'unit_principal',
    unitPhone: 'unit_phone'
  },
  policy: {
    policyTitle: 'policy_title',
    policyCategory: 'policy_identity',
    policyStates: 'state',
    publishTime: 'publish_time',
    publishPerson: 'publish_user'
  },
  project: {
    projectType: 'project_identity',
    projectIdentity: 'project_identity',
    projectId: 'project_id',
    projectName: 'project_name',
    projectLevel: 'project_level',
    projectDep: 'team_id',
    projectTeacher: 'project_teacher',
    projectPerson: 'project_principal',
    regYear: 'register_year',
    startYear: 'start_year',
    stopYear: 'finish_year',
    projectCategory: 'project_identity',
    projectLevel: 'project_level',
    guideTeacher: 'teacherId',
    projectId: 'project_id',
    dependentUnit: 'team_id',
    applyYear: 'register_year',
    beginYear: 'start_year',
    deadlineYear: 'finish_year',
    principalName: 'studentName',
    guideTeacherName: 'teacherName',
    userId: 'user_id',
    username: 'user_name'
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
// 标签的value格式化器根据 映射的字段类型，value的值，映射表来确定value值对应的label
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
function resetObject(object, filterTmpl) {
  // let o = object;
  // console.log(object, filterTmpl)
  // for (var key in o) {
  //   o[key] = '';
  //   if (filterTmpl && filterTmpl[key].inputType == 4) {
  //     o[key] = []
  //   }
  // }
  // return o;
  let o = filterTmpl;
  let r = {}
  for (var key in o) {
    r[key] = ''
    if (o[key].inputType == 4) {
      r[key] = []
    }
  }
  return r
}


// 筛选字段映射成数据库字段名
function filter2Mysql(type, filter) {
  console.log(type)
  // 映射过程
  const transform = item => {
    console.log('进入映射', filter)

    for (let key in filter) {
      let value = String.trim(filter[key])
      console.log(key + ': ' + value)
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
    case filterName.UNIT:
      return transform(filterName.unit)
      break
    case filterName.NOTIFICATION:
      return transform(filterName.notification)
      break
    case filterName.FILE_SYSTEM:
      return transform(filterName.fileSystem)
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
    case filterName.UNIT:
      return transform(filterName.unit)
      break
    case filterName.NOTIFICATION:
      return transform(filterName.notification)
      break
    case filterName.FILE_SYSTEM:
        return transform(filterName.fileSystem)
        break
  }
}

function downloadFile(files) {
  console.log(1)
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    let src =
      "/api/download?filePath=" +
      escape(files[i].filePath) +
      "&fileName=" +
      escape(files[i].fileName);
    console.log(src)
    iframe.src = src
    iframe.onload = function() {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  }
}

export default {
  valueFormater,
  resetObject,
  filter2Mysql,
  filterName,
  displayInfo2MySql,
  downloadFile
}

