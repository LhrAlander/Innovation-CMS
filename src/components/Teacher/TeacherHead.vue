<template>
  <div id="head" class='manage-head'>
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
</style>
