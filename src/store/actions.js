import axios from 'axios'
import * as utils from "@/utils/utils";

// 管理员删除一个账号
const delUser = ({
  commit,
  state }, payload) => {
  let userId = payload.userId
  let that = payload.that
  console.log('delUser', userId)
  axios
    .post("/api/user/delUser", {
      userId,
      state: "已删除"
    })
    .then(res => {
      console.log(that)
      if (res.status == 200 && res.data.code == 200) {
        that.$message({
          type: `success`,
          message: "删除用户信息成功"
        });
      } else {
        that.$message.error("删除用户信息失败");
      }
    })
    .catch(err => {
      console.log(err)
      that.$message.error("删除用户信息失败");
    });
}

// 管理员重置一个账号的密码
const resetPwd = ({ commit, state }, payload) => {
  const { userId, that } = payload
  console.log(payload)
  let user = {
    user_id: userId,
    user_pwd: 12345
  };
  let resetPWDRes = {};
  that.$confirm("是否重置该用户密码?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showClose: false,
    closeOnPressEscape: false,
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "重置密码中...";
        axios.post('/api/user/changeUser', { user })
          .then(function (res) {
            instance.confirmButtonLoading = false;
            resetPWDRes = res.data;
            done();
          })
          .catch(err => {
            done();
          });
      } else {
        console.log("else");
        done();
      }
    }
  })
    .then(() => {
      let message = "重置密码失败";
      let type = "error";
      if (resetPWDRes.code == 200) {
        message = "重置密码成功！";
        type = "success";
      }
      that.$message({
        type: type,
        message: message
      });
    })
    .catch(err => {
      console.log(err);
      that.$message({
        type: "info",
        message: "未能重置密码"
      });
    });
}

// 管理员修改用户基本信息
const changeUserBaseInfo = ({ commit, state }, payload) => {
  const { displayInfo, that } = payload
  let info = utils.displayInfo2MySql(
    utils.filterName.USER,
    displayInfo
  );
  delete info.userPWD;
  axios
    .post("/api/user/changeUser", {
      user: info
    })
    .then(res => {
      if (res.status == 200 && res.data.code == 200) {
        that.$message({
          type: `success`,
          message: "修改用户信息成功"
        });
      }
    })
    .catch(err => {
      that.$message.error("修改用户信息失败");
    });
}

// 管理员修改学生信息
const changeStudentInfo = ({ commit, state }, payload) => {
  const { displayInfo, that } = payload
  let info = utils.displayInfo2MySql(
    utils.filterName.STUDENT,
    displayInfo
  )
  delete info.userPWD;
  let student = {
    userId: info.userId,
    userName: info.userName,
    studentAcademy: info.studentAcademy,
    studentClass: info.studentClass,
    studentMajor: info.studentMajor
  }
  delete info.studentAcademy
  delete info.studentClass
  delete info.studentMajor
  Promise.all([axios.post('/api/user/changeUser', { user: info }), axios.post('/api/student/change/student', { student })])
    .then(res => {
      if (res.every(item => {
        return item.status == 200 && item.data.code == 200
      })) {
        that.$message({
          type: `success`,
          message: "修改学生信息成功"
        });
      }
      else {
        that.$message.error("修改学生信息失败");
      }
    })
    .catch(err => {
      that.$message.error("修改学生信息失败");
    })
}

// 管理员修改教师信息
const changeTeacherInfo = ({ commit, state }, payload) => {
  const { displayInfo, that } = payload
  let info = utils.displayInfo2MySql(
    utils.filterName.TEACHER,
    displayInfo
  )
  delete info.userPWD;
  let teacher = {
    userId: info.userId,
    userName: info.userName,
    teacherDegree: info.teacherDegree,
    teacherBachelor: info.teacherBachelor,
    teacherMajor: info.teacherMajor
  }
  delete info.teacherDegree
  delete info.teacherBachelor
  delete info.teacherMajor
  Promise.all([axios.post('/api/user/changeUser', { user: info }), axios.post('/api/teacher/change/teacher', { teacher })])
    .then(res => {
      if (res.every(item => {
        return item.status == 200 && item.data.code == 200
      })) {
        that.$message({
          type: `success`,
          message: "修改教师信息成功"
        });
      }
      else {
        that.$message.error("修改教师信息失败");
      }
    })
    .catch(err => {
      that.$message.error("修改教师信息失败");
    })
}

// 管理员修改企业信息
const changeCompanyInfo = ({ commit, state }, payload) => {
  const { displayInfo, that, companyId } = payload
  let info = utils.displayInfo2MySql(
    utils.filterName.COMPANY,
    displayInfo
  )
  delete info.userPWD;
  console.log(info, companyId)
  let company = {
    userId: info.userId,
    userName: info.userName,
    companyName: info.companyName,
    companyPhone: info.companyPhone,
    companyPrincipal: info.companyPrincipal,
    companyAddress: info.companyAddress,
    companyId
  }
  delete info.companyName
  delete info.companyPhone
  delete info.companyPrincipal
  delete info.companyAddress
  Promise.all([axios.post('/api/user/changeUser', { user: info }), axios.post('/api/company/change/company', { company })])
    .then(res => {
      if (res.every(item => {
        return item.status == 200 && item.data.code == 200
      })) {
        that.$message({
          type: `success`,
          message: "修改企业信息成功"
        });
      }
      else {
        that.$message.error("修改企业信息失败");
      }
    })
    .catch(err => {
      that.$message.error("修改企业信息失败");
    })
}


// 管理员添加用户基本嘻嘻
const addUserInfo = ({ commit, state }, payload) => {
  const { that, user } = payload
  axios
    .post("/api/user/user", { user: user }, { emulateJson: true })
    .then(res => {
      console.log(res);
      that.loadData(that.filter, that.currentPage, that.pageSize);
      if (res.data.code == 200) {
        that.$message({
          type: "success",
          message: "添加用户信息成功!"
        });
      }
      else {
        that.$message.error("添加用户信息失败！请与管理员联系！")
      }
    })
    .catch(err => {
      that.$message.error("添加用户信息失败！请与管理员联系！")
    });
}


// 获取项目筛选信息
const getSelectors = ({commit, state}, payload) => {
  
  return Promise.all([
    axios.get("/api/category/project/categories"),
    axios.get("/api/category/project/levels"),
    axios.get("api/dependent/choices")
  ])
    .then(res => {
      let projectCategory = res[0].data.data.map(i => {
        return {
          label: i.identity_name,
          value: i.identity_name
        };
      });
      let projectLevel = res[1].data.data.map(i => {
        return {
          label: i.level_name,
          value: i.level_name
        };
      });

      // 构建级联选择器
      let options = [];
      let selectors = res[2].data.data;
      for (let i = 0; i < selectors.length; i++) {
        let selector = selectors[i];
        let option = {
          label: selector.unitName,
          value: selector.unitId
        };
        let teams = [];
        for (let i = 0; i < selector.teams.length; i++) {
          let team = selector.teams[i];
          let _team = {
            label: team.teamName,
            value: team.teamId
          };
          teams.push(_team);
        }
        if (teams.length > 0) {
          option.children = teams;
        }
        options.push(option);
      }
      return[projectCategory, projectLevel, options]
    })
    .catch(err => {
      return err
      console.log(err);
    });
}

export default {
  getSelectors,
  delUser,
  resetPwd,
  changeUserBaseInfo,
  changeStudentInfo,
  changeTeacherInfo,
  changeCompanyInfo,
  addUserInfo
}