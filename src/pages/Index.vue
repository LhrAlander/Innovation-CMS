<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <carousel></carousel>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="15" class="announcement">
        <h2 class="title title-left">通知公告</h2>
        <div class="announcements">
          <announcement v-for="item in 6"></announcement>
          <router-link to="/"><span class="more">更多&nbsp;&gt; </span></router-link>
        </div>
      </el-col>
      <el-col :span="7" :offset="2" class="login">
        <h2 class="title title-right">用户登录</h2>
        <div class="login-wrapper">
          <log-and-reg></log-and-reg>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Carousel from 'components/Carousel'
  import Announcement from 'components/Announcement'
  import LogAndReg from 'components/LogAndReg'
  export default {
    components: {
      Carousel,
      Announcement,
      LogAndReg
    }
  }
</script>

<style scoped>
  .container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
  }

  .el-row {
    margin: 10px 0;
  }

  .announcement,
  .login {
    height: 500px;
    marigin: 10px 0;
    display: flex;
    flex-direction: column;
  }

  .title {
    padding: 10px 0;
    border-bottom: 3px solid #5c99c8;
  }

  .title-left {
    text-align: left;
  }

  .title-right {
    text-align: right;
  }

  .announcements,
  .login-wrapper {
    color: #000;
    padding: 40px 0 0;
    flex: 1;
  }

  .announcements {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 40px 35px 0;
  }

  span.more {
    display:  block;
    color: #000;
    font-weight: bold;
    padding-right: 15px;
    text-align: right;
  }




</style>
