<template>

  <div class="info-wrapper">
    <div class="avatar-wrapper">
      <img src="../../../src/assets/img/avatar.png" alt="用户头像" class="avatar">
      <span class="edit-avatar">修改头像</span>
    </div>
    <div class="teacher-info">
      <header class="title">
        <span class="title-name">我的资料</span>
        <div class="operate-area">
          <span class="operate save">修改</span>
          <span class="operate exit" @click="$router.push({name: 'MyTeacherInfo'})">退出</span>
        </div>
      </header>
      <div class="info-content">
        <div class="info-item">
          姓<span class="fill-text">填充</span>名：石兴民
        </div>
        <div class="info-item">
          性<span class="fill-text">填充</span>别：男
        </div>
        <div class="info-item">
          工<span class="fill-text">填充</span>号：123456789
        </div>
        <div class="info-item">
          <div class="key">
            邮<span class="fill-text">填充</span>箱：
          </div>
          <div class="value">
            <el-input v-model="teacherInfo.maile"></el-input>
          </div>
        </div>
        <div class="info-item">
          <div class="key">
            手机号码：
          </div>
          <div class="value">
            <el-input v-model="teacherInfo.phone"></el-input>
          </div>

        </div>
        <div class="info-item">
          学<span class="fill-text">填充</span>历：硕士
        </div>
        <div class="info-item">
          毕业院校：浙江大学
        </div>
        <div class="info-item">
          专<span class="fill-text">填充</span>业：软件工程
        </div>
        <div class="info-item">
          所在系部：杭州国际服务工程学院
        </div>
        <div class="info-item">
          用户状态：可用
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        teacherInfo: {
          phone: "18606525602",
          maile: "4962415@qq.com"
        }
      }
    }
  }
</script>
<style scoped>
  .info-wrapper {
    width: 85%;
    margin: 5rem auto;
    padding: 4rem;
    border-radius: 1rem;
    background-color: #e4e4e4;
    display: flex;
  }

  .avatar-wrapper {
    display: inline-block;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%;
    padding: .3rem;
    border: 2px dashed #ccc;
  }

  .edit-avatar {
    display: block;
    text-align: center;
    padding: .5rem;
    font-size: .8rem;
    color: #4586FF;
    cursor: pointer;
  }




  .teacher-info {
    width: 80%;
    margin-left: 4rem;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: .2rem 1rem 1rem 1rem;
    border-bottom: 2px dashed #ccc;
  }

  .title span.title-name {
    font-size: 1.4rem;
  }

  .title div.operate-area {
    display: flex;
    align-items: flex-end;
  }
  .title span.operate {
    margin-right: 1rem;
    font-size: 1rem;
    color: #4586FF;
    cursor: pointer;
  }



  .fill-text {
    color: transparent;
  }

  .info-item {
    display: flex;
    align-items: center;
    padding: 1.5rem 0 0 3rem;
  }




</style>
