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
          <el-col :span="4" class="logAndReg">
            <router-link to="/Login">登录</router-link>
            <span class="separate">|</span>
            <router-link to="/Register">注册</router-link>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    mounted() {
      
    }
  }
</script>

<style scoped>

  a {
    color: #000;
  }

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


  .el-col.logAndReg {
    color: #333;
    text-align: center;
  }





  .nav-item {
    cursor: pointer;
    color: #000;
    text-align: center;
  }


</style>
