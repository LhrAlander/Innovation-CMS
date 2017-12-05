<template>
  <el-row class="wrap" gutter="100">
    <!--学院展示-->
    <el-col :span="5" class="display-item department"></el-col>
    <!--系部展示-->
    <el-col :span="5" class="display-item institute"></el-col>
    <!--专业展示-->
    <el-col :span="5" class="display-item major"></el-col>
    <!--班级展示-->
    <el-col :span="5" class="display-item class"></el-col>
  </el-row>

</template>
<script>
  export default {}
</script>
<style scoped>

  .el-col.display-item {
    height: 100px;
    background-color: #dddddd;
  }

</style>
