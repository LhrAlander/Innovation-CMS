<template>
  <div class="info-wrapper">
    <div class="avatar-wrapper">
      <img src="../../../src/assets/img/invoker.jpg" alt="用户头像" class="avatar">
      <span class="edit-avatar">修改头像</span>
    </div>
    <div class="teacher-info">
      <header class="title">
        <span class="title-name">我的资料</span>
        <div class="operate-area">
          <span class="operate save" @click="editInfo">修改</span>
          <span class="operate exit" @click="$router.push({name: 'MyStudentInfo'})">退出</span>
        </div>
      </header>
      <div class="info-content">
        <div class="info-item">
          姓<span class="fill-text">填充</span>名：{{info.user_name}}
        </div>
        <div class="info-item">
          性<span class="fill-text">填充</span>别：{{info.user_sex}}
        </div>
        <div class="info-item">
          学<span class="fill-text">填充</span>号：{{info.user_id}}
        </div>
        <div class="info-item">
          <div class="key">
            邮<span class="fill-text">填充</span>箱：
          </div>
          <div class="value">
            <el-input v-model="info.user_mail"></el-input>
          </div>
        </div>
        <div class="info-item">
          <div class="key">
            手机号码：
          </div>
          <div class="value">
            <el-input v-model="info.user_phone"></el-input>
          </div>
        </div>
        <div class="info-item">
          专<span class="fill-text">填充</span>业：{{info.student_academy}}
        </div>
        <div class="info-item">
          所在系部：{{info.student_major}}
        </div>
        <div class="info-item">
          用户状态：{{info.account_state}}
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import axios from "@/utils/https";
export default {
  data() {
    return {
      studentInfo: {
        phone: "13588737694",
        maile: "AlanderLt@163.com"
      },
      info: {}
    };
  },
  mounted() {
    axios
      .post("/api/st/baseInfo/myInfo")
      .then(res => {
        console.log(res);
        this.info = res.data.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    editInfo() {
      let user = {
        user_id: this.info.user_id,
        user_phone: this.info.user_phone,
        user_mail: this.info.user_mail
      }
      axios.post('/api/st/baseInfo/change/info', {
        user
      })
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '修改信息成功'
            })
          }
          else {
            this.$message.error('修改失败');
          }
        })
        .catch(err => {
          cosnole.log(err)
        })
    }
  }
};
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
  padding: 0.3rem;
  border: 2px dashed #ccc;
}

.edit-avatar {
  display: block;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #4586ff;
  cursor: pointer;
}

.teacher-info {
  width: 80%;
  margin-left: 4rem;
}

.title {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 1rem 1rem 1rem;
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
  color: #4586ff;
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
