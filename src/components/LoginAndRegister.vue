<template>
  <div class="container loginAndRegister">
    <div class="decorate">
      <div class="project_title"><i class="iconfont" style="font-size: 40px;">&#xe62b;</i> 项目标题</div>
    </div>

    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="登录" name="Login" class="tab_item">
          <el-form :model="loginForm">
            <el-input
              placeholder="请输入工(学)号"
              prefix-icon="el-icon-view"
              v-model="loginForm.id"
              style="margin-top: 20px;margin-bottom: 15px;"
            >
            </el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-news"
              v-model="loginForm.password"
              style="margin-bottom: 15px;"
            >
            </el-input>
          </el-form>

          <el-button type="primary" style="width: 100%; font-size: 15px; margin-bottom: 15px;"
                     @click="handleLogin">登录</el-button>

          <div class="tail">
            <el-switch
              v-model="loginForm.isRememberPassword"
              active-color="#13ce66"
              inactive-color="#cccccc">
            </el-switch>

            <span style="font-size: 13px; color: #aaaaaa">一周内免输密码</span>
            <span style="color: #aaaaaa">|</span>

            <router-link to="/" class="forgetPassword">忘记密码</router-link>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册" name="Register" class="tab_item">
          <el-form label-position="left" label-width="70px" :model="registerForm">
            <el-form-item label="学号">
              <el-input v-model="registerForm.studentId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-switch v-model="registerForm.gender"
                         active-text="女"
                         inactive-text="男"
                         active-color="pink"
                         inactive-color="green"
              ></el-switch>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="registerForm.tele"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="学院">
              <el-select v-model="registerForm.institute" placeholder="请选择" @change="changeAcademy">
                <el-option
                  v-for="item in data"
                  :key="item.academy"
                  :label="item.academy"
                  :value="item.academy">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业">
              <el-select v-model="registerForm.major" placeholder="请选择" @change="changeMajor">
                <el-option
                  v-for="item in nMajor"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="registerForm.clazz" placeholder="请选择">
                <el-option
                  v-for="item in nClass"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设置密码">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="registerForm.re_password"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width: 100%; font-size: 15px; margin-bottom: 15px;"
                     @click="handleRegister">注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
import axios from "@/utils/https";

export default {
  data() {
    return {
      data: [],
      selectedAcademy: "",
      selectedMajor: "",
      selectedClass: "",
      activeName: "login",

      loginForm: {
        //登录信息
        id: "",
        password: "",
        isRememberPassword: ""
      },

      registerForm: {
        //注册信息
        studentId: "",
        name: "",
        gender: "",
        tele: "",
        email: "",
        institute: "",
        major: "",
        clazz: "",
        password: "",
        re_password: ""
      }
    };
  },
  mounted: function() {
    this.activeName = this.$route.name;
    this.initOptions();
  },
  methods: {
    initOptions() {
      axios
        .get("/api/front/index/academys")
        .then(res => {
          this.data = res.data.data;
          this.selectedAcademy = a || this.data[0].academy;
          this.selectedMajor = m || this.data[0].majors[0].major;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeAcademy(v) {
      this.selectedAcademy = v;
    },
    changeMajor(v) {
      this.selectedMajor = v;
    },
    handleClick(tab, event) {
      router.push({ path: tab.name });
    },
    handleLogin() {
      //TODO
      console.log(this.loginForm);
      axios
        .post("/api/login", { user: this.loginForm })
        // axios.get('/api/user/users')
        .then(res => {
          console.log(res);
          this.$store.commit("login", {
            token: res.data.token,
            user: res.data.user
          });
          if (this.loginForm.isRememberPassword) {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("user", JSON.stringify(res.data.user));
          }
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRegister() {
      //TODO
      for (let k in this.registerForm) {
        let v = this.registerForm[k];
        if (k == 'gender') {
          continue
        }
        if (!v || v == undefined ) {
          this.$message.error("请填写全部信息！");
          return;
        }
      }
      if (this.registerForm.password != this.registerForm.re_password) {
        this.$message.error("两次密码填写不一致！");
        return;
      }
      let sex = this.registerForm.gender ? "男" : "女";
      let i = this.registerForm;
      let user = {
        user_id: i.studentId,
        user_name: i.name,
        user_pwd: i.password,
        user_sex: sex,
        user_mail: i.email,
        user_phone: i.tele,
        account_state: "可用",
        user_identity: "学生"
      };
      let student = {
        user_id: i.studentId,
        user_name: i.name,
        student_academy: i.institute,
        student_major: i.major,
        student_class: i.clazz
      };
      axios
        .post("/api/front/index/reg", {
          user,
          student
        })
        .then(res => {
          console.log(res)
          if (res.data.code != 200) {
            this.$message.error(res.data.msg);
          } else {
            this.$message({
            type: "success",
            message: "注册成功!"
          });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    nMajor() {
      let majors = [];
      for (let i = 0; i < this.data.length; i++) {
        let academy = this.data[i];
        if (academy.academy == this.selectedAcademy) {
          majors = academy.majors.map(m => {
            return m.major;
          });
        }
      }
      return majors;
    },
    nClass() {
      let classes = [];
      for (let i = 0; i < this.data.length; i++) {
        let academy = this.data[i];
        let majors = [];
        if (academy.academy == this.selectedAcademy) {
          majors = academy.majors;
          for (let j = 0; j < majors.length; j++) {
            if (this.selectedMajor == majors[j].major) {
              classes = majors[j].classes.map(c => {
                return c.class;
              });
            }
          }
        }
      }
      return classes;
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  background-color: #f5f5f5;
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: 100%;
}

.box {
  min-width: 500px;
  width: 30%;
  margin: auto;
  border: 1px solid #e4e4e4;
  padding: 20px 100px;
  box-shadow: 0 0 2px gray;
  background-color: #fff;
}

.forgetPassword {
  font-size: 14px;
  color: #aaaaaa;
}
.forgetPassword:hover {
  color: #4586ff;
}
.decorate {
  position: absolute;
  left: 100px;
  top: 100px;
}
.project_title {
  color: #5394c5;
  font-size: 40px;
  font-weight: bold;
}
</style>
<style>
.loginAndRegister .el-tabs__nav-wrap {
  margin: auto;
}
.loginAndRegister .el-tabs__item {
  width: 50% !important;
  text-align: center;
  font-size: 20px;
}
.loginAndRegister .el-tabs__nav {
  width: 100%;
}
</style>
