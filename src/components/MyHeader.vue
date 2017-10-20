<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="container">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple logo-wrapper">
              <img class="logo" src="../assets/img/logo.png" alt="HZNU">
            </div>
          </el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple-light nav-item">项目展示</div></router-link></el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple nav-item">团队展示</div></router-link></el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple-light nav-item">最近获奖</div></router-link></el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple nav-item">最新政策</div></router-link></el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple-light nav-item">学校文件</div></router-link></el-col>
          <el-col :span="3"><router-link to="/"><div class="grid-content bg-purple nav-item">通知公告</div></router-link></el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-dark search-wrapper">
              <el-input class="header-search"
                        placeholder="请选择日期"
                        icon="search">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

  .header-wrapper {
    height: 80px;
    margin-bottom: 10px;
  }

  .header {
    height: 80px;
    color: #fff;
    background-color: #fff;
    /*background-color: #ebecee;*/
  }



  .header .container {
    height: 100%;
    width: 1140px;
    line-height: 80px;
    padding: 0 30px;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    height: 80px;
  }

  img.logo {
    width: 75%;
  }

  .el-row {
    border-bottom: 1px solid #99a9bf;
  }



  .search-wrapper {
    float: right;
  }




  .nav-item {
    cursor: pointer;
    color: #000;
    text-align: center;
  }


</style>
