<template>
  <div class="post-wrapper">
    <router-link to="/">
      <el-row>
        <el-col :span="24"  class="cnt">
          <i class="iconfont file">&#xe64f;</i>
          二级标题二级标题二级标题
        </el-col>
      </el-row>
    </router-link>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped>

  i.file {
    font-size: 1.4rem;
    margin-right: .4rem;
  }

  .cnt {
    color: #000;
    font-size: 1.3rem;
    margin-bottom: .9rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }



</style>
