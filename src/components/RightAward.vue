<template>
  <el-row>
    <el-col :span="12" :offset="6" class="content">
      <div class="cnt-wrapper">
        <h5 class="title">TeamName</h5>
        <p class="introduce">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor</p>
        <p class="meta"><i class="iconfont calendar">&#xe6eb;</i>2017/10/17</p>
      </div>
    </el-col>
    <el-col :span="6" class="image">
      <img src="../assets/img/logoTitle.png" alt="">
    </el-col>
  </el-row>
</template>

<script>
    export default {}
</script>

<style scoped>
  .el-row {
    margin-bottom: 15px;
  }


  .el-col {
    height: 130px;
  }



  img {
    width: 100%;
    height: 100%;
  }

  .content {
    padding: 10px;
    background-origin: content-box;
    background-clip: content-box;
  }

  .cnt-wrapper {
    height: 100%;
    border-bottom: 1px solid #000;
  }

  h5.title {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  p.introduce {
    max-height: 35px;
    display: block;
    font-size: .9rem;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: normal;
    display:-webkit-box;/*设置弹性盒模型*/
    -webkit-line-clamp:2;/*文本占的行数,如果要设置2行加...则设置为2*/
    -webkit-box-orient:vertical;/*子代元素垂直显示*/
  }

  p.meta {
    font-size: .9rem;
    text-align: right;
    line-height: .9rem;
  }

  i.calendar {
    margin-right: 10px;
    font-size: 1.5rem;
    color: #888;
  }
</style>
