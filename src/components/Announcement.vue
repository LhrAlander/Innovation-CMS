<template>
  <el-row>
    <el-col :span="5" class="time-wrapper">
      <h4 class="time">2017/10/16</h4>
    </el-col>
    <router-link to="/">
      <el-col :span="18" :offset="1" class="content">文本标签文本标签文本标签文本标签文本标签文本标签文本标</el-col>
    </router-link>
  </el-row>
</template>

<script>
    export default {}
</script>

<style scoped>
  .el-row {
    height: 40px;
    /*margin-bottom: 20px;*/
  }

  .el-col {
    height: 100%;
    line-height: 40px;
  }

  h4.time {
    height: 100%;
    border-right: 1px solid #999;
  }



  .content {
    color: #000;
    padding-right: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
