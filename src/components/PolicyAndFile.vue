<template>
  <div class="post-wrapper">
    <el-row class="meta">
      <el-col :span="2"><i class="iconfont time">&#xe600;</i></el-col>
      <el-col :offset="1" :span="17">2017/10/18</el-col>
    </el-row>
    <router-link to="/">
      <el-row>
        <el-col :offset="3" :span="22"  class="cnt">二级标题二级标题二级标题</el-col>
      </el-row>
    </router-link>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped>

  .post-wrapper {
    border-bottom: 1px solid #000;
    margin-bottom: 35px;
  }

  .meta {
    font-size: 1.3rem;
    margin-bottom: 15px;
    line-height: 1.3rem;
  }
  .cnt {
    color: #000;
    font-size: 1.6rem;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  i.iconfont.time {
    font-size: 1.6rem;
    color: #888;
  }

</style>
