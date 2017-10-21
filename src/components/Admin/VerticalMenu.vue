<template>
  <div class="container">
    <div class="head">
      <img src="../../assets/img/logo.png" alt="杭州师范大学logo" class="logo">
      <div class="welcome-info">
        <p>welcome</p>
        <p>{{admin.name}}</p>
      </div>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="true">
      <el-submenu index="1">
        <template slot="title" >
          <i class="iconfont">&#xe6a0;</i>
          <p class="text">用户管理</p>
          <p class="arrow-right"> > </p>
        </template>
          <el-menu-item index="1-1">
            <p class="item-text">基本用户信息管理</p>
          </el-menu-item>
        <el-menu-item index="1-2">
          <p class="item-text">用户类别（角色）管理</p>
        </el-menu-item>
        <el-menu-item index="1-3">
          <p class="item-text">学生信息管理</p>
        </el-menu-item>
        <el-menu-item index="1-4">
          <p class="item-text">教师信息管理</p>
        </el-menu-item>
        <el-menu-item index="1-5">
          <p class="item-text">企业及其他人员信息</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title" >
          <i class="iconfont">&#xe6a4;</i>
          <p class="text">通知公告管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="2-1">
          <p class="item-text">通知公告管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title" >
          <i class="iconfont">&#xe601;</i>
          <p class="text">项目管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="3-1">
          <p class="item-text">项目类别管理</p>
        </el-menu-item>
        <el-menu-item index="3-2">
          <p class="item-text">项目级别管理</p>
        </el-menu-item>
        <el-menu-item index="3-3">
          <p class="item-text">项目信息管理</p>
        </el-menu-item>
        <el-menu-item index="3-4">
          <p class="item-text">项目成员管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title" >
          <i class="iconfont">&#xe61e;</i>
          <p class="text">团队管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="4-1">
          <p class="item-text">团队类别管理</p>
        </el-menu-item>
        <el-menu-item index="4-2">
          <p class="item-text">团队基本信息管理</p>
        </el-menu-item>
        <el-menu-item index="4-3">
          <p class="item-text">团队成员管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title" >
          <i class="iconfont">&#xe631;</i>
          <p class="text">获奖管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="5-1">
          <p class="item-text">获奖类别管理</p>
        </el-menu-item>
        <el-menu-item index="5-2">
          <p class="item-text">获奖等级管理</p>
        </el-menu-item>
        <el-menu-item index="5-3">
          <p class="item-text">获奖基本信息管理</p>
        </el-menu-item>
        <el-menu-item index="5-4">
          <p class="item-text">获奖成员管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title" >
          <i class="iconfont">&#xe64f;</i>
          <p class="text">文件与制度管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="6-1">
          <p class="item-text">文件与制度管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title" >
          <i class="iconfont">&#xe618;</i>
          <p class="text">政府信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="7-1">
          <p class="item-text">政府类别管理</p>
        </el-menu-item>
        <el-menu-item index="7-2">
          <p class="item-text">政府信息管理</p>
        </el-menu-item>
        <el-menu-item index="7-3">
          <p class="item-text">信息状态管理</p>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title" >
          <i class="iconfont">&#xe9e3;</i>
          <p class="text">依托单位信息管理</p>
          <p class="arrow-right"> > </p>
        </template>
        <el-menu-item index="8-1">
          <p class="item-text">依托单位信息管理</p>
        </el-menu-item>
        <el-menu-item index="8-2">
          <p class="item-text">依托单位类别管理</p>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          admin: {
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
  .el-menu-item:first-child {
    padding-top: 50px;
  }
  .el-menu-item:last-child {
    padding-bottom: 50px;
  }
  .item-text {
    padding: 0;
    padding-left: 20px;
    border-left: 2px solid #1ABB9C;
    line-height: 20px;
  }
</style>
