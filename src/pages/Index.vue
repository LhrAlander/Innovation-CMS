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

    <el-row>
      <el-col :span="24">
        <h2 class="title">获奖情况</h2>
        <award></award>
        <router-link to="/"><span class="more award-more">更多&nbsp;&gt; </span></router-link>
      </el-col>
    </el-row>

    <el-row :gutter="160">
      <el-col :span="12" class="policy">
        <h2 class="title title-left">政府政策</h2>
        <div class="policy-cnt">
          <template v-for="item in 3"><policy-and-file></policy-and-file></template>
        </div>
      </el-col>
      <el-col :span="12" class="school-files">
        <h2 class="title title-right">学校文件</h2>
        <div class="files-cnt"><template v-for="item in 3"><policy-and-file></policy-and-file></template></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <h2 class="title">团队展示</h2>
        <div class="team-cnt">
          <el-row :gutter="100">
            <el-col :span="6" v-for="item in 4">
              <team-display></team-display>
            </el-col>
          </el-row>
          <el-row :gutter="100">
            <el-col :span="6" v-for="item in 4">
              <team-display></team-display>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Carousel from 'components/Carousel'
  import Announcement from 'components/Announcement'
  import LogAndReg from 'components/LogAndReg'
  import Award from 'components/Award'
  import PolicyAndFile from 'components/PolicyAndFile'
  import TeamDisplay from 'components/TeamDisplay'
  export default {
    components: {
      Carousel,
      Announcement,
      LogAndReg,
      Award,
      PolicyAndFile,
      TeamDisplay,
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
    margin: 15px 0;
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

  .announcements,
  .policy-cnt,
  .files-cnt,
  .team-cnt {
    padding: 40px 35px 0;
  }

  .announcements {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }



  span.more {
    display:  block;
    color: #000;
    font-weight: bold;
    padding-right: 15px;
    text-align: right;
  }

  span.award-more {
    padding-right: 35px;
  }

  .policy,
  .school-files {
  }

  .policy-cnt,
  .files-cnt {
    height: 400px;
    background-origin: content-box;
    background-clip: content-box;
  }

  .team-cnt {
    padding: 40px 35px 0;
    /*background-color: #1d90e6;*/
    background-origin: content-box;
    background-clip: content-box;
  }




</style>
