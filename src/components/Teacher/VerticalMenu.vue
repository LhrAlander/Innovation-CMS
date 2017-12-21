<template>
  <div class="container">
    <div class="head">
      <img src="../../assets/img/logo.png" alt="杭州师范大学logo" class="logo">
      <div class="welcome-info">
        <p>welcome</p>
        <p>{{teacher.name}}</p>
      </div>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="true">
      <router-link :to="{name: 'MyTeacherInfo'}">
        <el-submenu index="1">
          <template slot="title" >
            <i class="iconfont">&#xe6a0;</i>
            <p class="text">我的信息</p>
          </template>
        </el-submenu>
      </router-link>
      <el-submenu index="2">
        <template slot="title" >
          <i class="iconfont">&#xe601;</i>
          <p class="text">项目管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'TeacherProjectInfo'}">
          <el-menu-item index="2-1" class="first">
            <p class="item-text">项目信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'TeacherProjectMember'}">
          <el-menu-item index="2-2" class="last">
            <p class="item-text">项目成员管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title" >
          <i class="iconfont">&#xe61e;</i>
          <p class="text">团队管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'TeacherGroupInfo'}">
          <el-menu-item index="3-1" class="first">
            <p class="item-text">团队基本信息管理</p>
          </el-menu-item>
        </router-link>
        <router-link :to="{name: 'TeacherGroupMember'}">
          <el-menu-item index="3-2" class="last">
            <p class="item-text">团队成员管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title" >
          <i class="iconfont">&#xe631;</i>
          <p class="text">获奖管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <router-link :to="{name: 'TeacherAwardMember'}">
          <el-menu-item index="4-1" class="first last">
            <p class="item-text">获奖成员管理</p>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <router-link :to="{name: 'TeacherDepUnitInfo'}">
        <el-submenu index="5">
          <template slot="title" >
            <i class="iconfont">&#xe9e3;</i>
            <p class="text">依托单位信息管理</p>
          </template>
        </el-submenu>
      </router-link>
    </el-menu>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          teacher: {
            name: 'yhcj'
          }
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>
<style scoped>
  .container {
    background-color: #2A3F54;
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
    color: #ECF0F1;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
  }
  .el-menu-vertical {
    height: 80%;
    background-color: #2A3F54;
  }


  .el-menu--collapse {
    width: 100%;
  }
  .iconfont {
    font-size: 1.5rem;
    font-weight: normal;
  }
  .text, .arrow-right {
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
    background-color: rgba(43,63,84,.5);
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
    border-left: 2px solid #1ABB9C;
    line-height: 20px;
  }
</style>
