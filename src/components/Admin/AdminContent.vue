<template>
  <div class="container">
    <div class="breadcrumb">
      <i class="iconfont" v-html="currentPage.iconCode"></i>
      {{currentPage.firstLevel}}&nbsp; >&nbsp; {{currentPage.secondLevel}}
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="pagination"></div>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          currentPage: {
            iconCode: '&#xe6a0;',
            firstLevel: '用户管理',
            secondLevel: '基本用户信息管理'
          }
        }
      }
    }
</script>
<style scoped>
  .container {
    display: inline-block;
    width: calc(100% - 250px);
    background-color: #ECF0F1;
    height: 100%;
    float: right;
    position: relative;
  }
  .breadcrumb {
    position: absolute;
    font-size: .8rem;
    font-weight: bold;
    color: #2A3F54;
    margin-left: 50px;
    margin-top: 50px;
    display: inline-block;
  }
  .breadcrumb .iconfont {
    font-size: 1.5rem;
  }

</style>
