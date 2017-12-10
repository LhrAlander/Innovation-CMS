<template>
  <div class="wrapper">
    <el-row class="info-wrapper">
      <el-col :span="4" class="avatar-wrapper">
        <img src="../../../src/assets/img/invoker.jpg" alt="用户头像" class="avatar">
      </el-col>
      <el-col :span="4" :offset="1">
        <div class="operate-wrapper">
          <span class="name">姓名：林海瑞</span>
          <span class="edit-link" @click="$router.push({name: 'EditStudentInfo'})">修改个人信息></span>
        </div>
      </el-col>

      <el-col :span="5" :offset="3">
        <div class="base-info-wrapper">
        <span class="info-item">
          学<span class="fill-text">填充</span>号：2015210405043
        </span>
          <span class="info-item">
          邮<span class="fill-text">填充</span>箱：AlanderLt@163.com
        </span>
          <span class="info-item">
          手机号码：135888737694
        </span>
        </div>
      </el-col>

      <div>

      </div>
    </el-row>
    <el-row class="info-wrapper">
      <el-col :span="4" :offset="5">
        <div class="detail-info-wrapper">
          <span class="info-item">性<span class="fill-text">填充</span>别：男</span>
          <span class="info-item">专<span class="fill-text">填充</span>业：软件工程</span>
        </div>
      </el-col>

      <el-col :span="5" :offset="3">
        <div class="detail-info-wrapper">
          <span class="info-item">所在系部：杭州国际服务工程学院</span>
          <span class="info-item">用户状态：可用</span>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  export default {

  }
</script>
<style scoped>
  .wrapper {
    width: 85%;
    margin: 5rem auto;
    padding: 4rem;
    border-radius: 1rem;
    background-color: #e4e4e4;
  }

  .info-wrapper:first-child {
    padding-bottom: 3rem;
    border-bottom: 1px dashed #000;
    margin-bottom: 3rem;
  }

  .avatar {
    padding: .3rem;
    border-radius: 50%;
    border: 2px dashed #ccc;
    height: 160px;
  }

  .detail-info-wrapper,
  .base-info-wrapper,
  .operate-wrapper {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .base-info-wrapper,
  .operate-wrapper {
    height: 160px;
  }

  .detail-info-wrapper {
    height: 180px;
  }

  .name {
    font-size: 1.3rem;
  }

  .edit-link {
    margin-top: -3rem;
    font-size: .8rem;
    color: #4586FF;
    cursor: pointer;
  }


  .fill-text {
    color: transparent;
  }

</style>
