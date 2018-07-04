<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="container">
        <el-row>
          <el-col :span="2">
            <router-link to='/'>
              <div class="grid-content bg-purple logo-wrapper">
                <img class="logo" src="../assets/img/logo.png" alt="HZNU">
              </div>
            </router-link>
          </el-col>
          <el-col :span="2"><router-link to="/projects"><div class="grid-content bg-purple-light nav-item">项目展示</div></router-link></el-col>
          <el-col :span="3"><router-link to="/teams"><div class="grid-content bg-purple nav-item">团队展示</div></router-link></el-col>
          <el-col :span="2"><router-link to="/awards"><div class="grid-content bg-purple-light nav-item">最近获奖</div></router-link></el-col>
          <el-col :span="2"><router-link to="/policys"><div class="grid-content bg-purple nav-item">最新政策</div></router-link></el-col>
          <el-col :span="2"><router-link to="/fileSystems"><div class="grid-content bg-purple-light nav-item">学校文件</div></router-link></el-col>
          <el-col :span="2"><router-link to="/notifications"><div class="grid-content bg-purple nav-item">通知公告</div></router-link></el-col>
          <el-col :span="2"><router-link to="/recruitments"><div class="grid-content bg-purple nav-item">招募信息</div></router-link></el-col>
          <el-col :span="3"><router-link to="/recruitments"><div class="grid-content bg-purple nav-item">项目申请</div></router-link></el-col>
          <el-col :span="4" class="logAndReg" v-if="!isLogin">
            <router-link to="/Login">登录</router-link>
            <span class="separate">|</span>
            <router-link to="/Register">注册</router-link>
          </el-col>
          <el-col :span="4" class="logAndReg header-menu" v-if="isLogin">
            <div class="more">
            <el-menu :default-active="activeIndex" mode="horizontal">
              <el-submenu index="1">
                <template slot="title">您好,{{loginUser}}</template>
                <el-menu-item index="1-1" @click='managePage'>管理页面</el-menu-item>
                <el-menu-item index="1-2" @click='logout'>退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logout')
    },
    managePage() {
      let router = null
      switch(this.$store.state.user.type) {
        case '管理员':
          router='/admin'
          break;
        case '学生':
          router='/student'
          break;
        case'企业':
        case '教师':
          router='/teacher'
          break;
      }
      if (router) {
        this.$router.push(router)
      }
    }
    
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    },
    loginUser: function () {
      return this.$store.state.user.username
    },
  },
  mounted() {
    console.log(this.$store.state.isLogin)
    if (!this.$store.state.isLogin) {
      this.$store.commit("clearStateLogin");
      const token = window.localStorage.getItem("token");
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (token && user) {
        this.$store.commit("login", { token: token, user: user });
        this.loginUser = user.username;
      }
    }
  }
};
</script>

<style scoped>
.more {
  float: right;
  margin-right: 10px;
}
a {
  color: #000;
}

.header-wrapper {
  height: 80px;
  margin-bottom: 10px;
}

.header {
  height: 80px;
  color: #fff;
  background-color: #fff;
  /*background-color: #ebecee;*/
}

.header .container {
  height: 100%;
  width: 1140px;
  line-height: 80px;
  padding: 0 30px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  height: 80px;
}

img.logo {
  width: 75%;
}

.el-row {
  border-bottom: 1px solid #99a9bf;
}

.el-col.logAndReg {
  height: 80px;
  padding-top: 9px;
  color: #333;
  text-align: center;
}

.nav-item {
  cursor: pointer;
  color: #000;
  text-align: center;
}
</style>
