<template>
  <div class="container manage-head" ref="lContainer">
    <div class="head">
      <img src="../../assets/img/logo.png" alt="杭州师范大学logo" class="logo">
      <div class="welcome-info">
        <p>welcome</p>
        <p>{{user.name}}</p>
      </div>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="true">
      <el-submenu index="1">
        <template slot="title" >
          <i class="iconfont">&#xe6a0;</i>
          <p class="text">用户管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'UserInfo'}">
          <el-menu-item index="1-1" class="first">
              <p class="item-text">基本用户信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'Role'}">
          <el-menu-item index="1-2">
            <p class="item-text">用户类别（角色）管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'StudentInfo'}">
          <el-menu-item index="1-3">
            <p class="item-text">学生信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'TeacherInfo'}">
          <el-menu-item index="1-4">
            <p class="item-text">教师信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'Others'}">
          <el-menu-item index="1-5" class="last">
            <p class="item-text">企业及其他人员信息</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title" >
          <i class="iconfont">&#xe8d0;</i>
          <p class="text">基本信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'Department'}">
          <el-menu-item index="2-1" class="first">
            <p class="item-text">院系管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'StatusCategory'}">
          <el-menu-item index="2-5" class="last">
            <p class="item-text">状态管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title" >
          <i class="iconfont">&#xe601;</i>
          <p class="text">项目管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'ProjectInfo'}">
          <el-menu-item index="3-1" class="first">
            <p class="item-text">项目信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'ProjectLevel'}">
          <el-menu-item index="3-2">
            <p class="item-text">项目级别管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'ProjectCategory'}">
          <el-menu-item index="3-3">
            <p class="item-text">项目类别管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'ProjectMember'}">
          <el-menu-item index="3-5">
            <p class="item-text">项目成员管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'CreateProjectManage'}">
          <el-menu-item index="3-6">
            <p class="item-text">项目申请管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'PendProjectManage'}">
          <el-menu-item index="3-7" class="last">
            <p class="item-text">项目审核管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title" >
          <i class="iconfont">&#xe61e;</i>
          <p class="text">团队管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'GroupInfo'}">
          <el-menu-item index="4-1" class="first">
            <p class="item-text">团队信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'GroupCategory'}">
          <el-menu-item index="4-2">
            <p class="item-text">团队类别管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'GroupMember'}">
          <el-menu-item index="4-3" class="last">
            <p class="item-text">团队成员管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title" >
          <i class="iconfont">&#xe631;</i>
          <p class="text">获奖管理</p>
          <p class="arrow-right"> > </p>
        </template>

        <router-link :to="{name: 'AwardInfo'}">
          <el-menu-item index="5-1" class="first">
            <p class="item-text">获奖基本信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'AwardLevel'}">
          <el-menu-item index="5-2">
            <p class="item-text">获奖等级管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'AwardCategory'}">
          <el-menu-item index="5-3">
            <p class="item-text">获奖类别管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'AwardMember'}">
          <el-menu-item index="5-4" class="last">
            <p class="item-text">获奖成员管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title" >
          <i class="iconfont">&#xe618;</i>
          <p class="text">政策信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'GovInfo'}">
          <el-menu-item index="6-1" class="first">
            <p class="item-text">政策信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'GovCategory'}">
          <el-menu-item index="6-2" class="last">
            <p class="item-text">政策类别管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title" >
          <i class="iconfont">&#xe9e3;</i>
          <p class="text">依托单位信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'DepUnitInfo'}">
          <el-menu-item index="7-1" class="first">
            <p class="item-text">依托单位信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'DepUnitCategory'}">
          <el-menu-item index="7-2" class="last">
            <p class="item-text">依托单位类别管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title" >
          <i class="iconfont">&#xe9e3;</i>
          <p class="text">招募信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'RecruitManage'}">
          <el-menu-item index="8-1" class="first">
            <p class="item-text">招募管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'SignUpManage'}">
          <el-menu-item index="8-2" class="last">
            <p class="item-text">报名管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <router-link :to="{name: 'Notification'}">
        <el-submenu index="9">
          <template slot="title" >
            <i class="iconfont">&#xe6a4;</i>
            <p class="text">通知公告管理</p>
          </template>
        </el-submenu>
      </router-link>

      <router-link :to="{name: 'FileAndSystem'}">
        <el-submenu index="10">
          <template slot="title" >
            <i class="iconfont">&#xe64f;</i>
            <p class="text">文件与制度管理</p>
          </template>
        </el-submenu>
      </router-link>


    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    height: String
  },

  data() {
    return {
      user: {
        name: "yhcj"
      }
    };
  },
  mounted() {
    const user = JSON.parse(window.localStorage.getItem("user"))
    this.user.name = user.username
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeHeight(h) {
      const lContainer = this.$refs.lContainer
      console.log(lContainer)
      lContainer.style.height = `${h}px`
    }
  }
};
</script>
<style scoped>
.container {
  background-color: #2a3f54;
  display: inline-block;
  width: 250px;
}
img.logo {
  width: 50px;
  height: 50px;
}
.head {
  padding-left: 20px;
  padding-top: 20px;
  height: 80px;
}
.welcome-info {
  vertical-align: top;
  display: inline-block;
  margin-left: 30px;
}
.welcome-info p {
  color: #ecf0f1;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
}
.el-menu-vertical {
  height: 80%;
  background-color: #2a3f54;
}

.el-menu--collapse {
  width: 100%;
}
.iconfont {
  font-size: 1.5rem;
  font-weight: normal;
}
.text,
.arrow-right {
  display: inline-block;
}
.text {
  margin-left: 10px;
}
.arrow-right {
  float: right;
  font-size: 20px;
  font-weight: normal;
}
.el-menu-item {
  padding: 15px 10px;
  background-color: rgba(43, 63, 84, 0.5);
  height: auto;
}
.el-menu-item.first {
  padding-top: 50px;
}
.el-menu-item.last {
  padding-bottom: 50px;
}
.item-text {
  padding: 0;
  padding-left: 20px;
  border-left: 2px solid #1abb9c;
  line-height: 20px;
}
</style>
