<template>
  <div id="head">
    <div class="more">
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">更多操作</template>
          <el-menu-item index="1-1">个人信息</el-menu-item>
          <el-menu-item index="1-2">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          activeIndex: '1'
        }
      }
    }
</script>
<style scoped>
  #head {
    width: 100%;
    height: 60px;
    background-color: #2A3F54;
  }
  .more {
    float: right;
    margin-right: 10px;

  }
  .el-menu-item {
    text-align: center;
    min-width: auto;
    color: #2A3F54 !important;
    background-color: rgba(255,255,255,.5) !important;
  }
  .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
    background-color: rgba(46, 112, 133, .5) !important;
  }
</style>
