<template>
  <div>
    <check-user-info
      v-if="checkMode"
      :title="title"
      :breadCrumbs="breadCrumbs"
      :displayInfo="displayInfo">
      <template slot="header-btn-wrapper">
        <el-button type="primary"  class="modify-mode-btn" @click="goToEditMode">编辑用户信息</el-button>
        <el-button type="danger"  class="modify-mode-btn" @click="delUser">删除该用户</el-button>
      </template>
    </check-user-info>

    <edit-user-info
      v-if="!checkMode"
      :title="title"
      :breadCrumbs="breadCrumbs"
      :displayInfo="displayInfo">
      <template slot="header-btn-wrapper">
        <el-button type="primary" plain class="modify-mode-btn" @click="goToCheckMode">取消修改</el-button>
        <el-button type="warning" plain class="modify-mode-btn" @click="confirmModify">确认修改</el-button>
      </template>
    </edit-user-info>
  </div>
</template>

<script>
import INFO from "@/infoTestData.js";
import CheckUserInfo from "@/components/Admin/InfoOperate/UserInfo/UserInfoCheck";
import EditUserInfo from "@/components/Admin/InfoOperate/UserInfo/UserInfoEdit";
import axios from "axios";
export default {
  components: {
    CheckUserInfo,
    EditUserInfo
  },
  data() {
    return {
      title: "教师信息查看",
      breadCrumbs: {
        iconCode: "&#xe6a0;",
        firstLevel: "用户管理",
        otherLevels: ["教师信息查看"]
      },
      displayInfo: [],
      checkMode: true,
      userId: null
    };
  },
  mounted() {
    this.flushRoute();
  },
  watch: {
    $route() {
      this.flushRoute();
    }
  },
  methods: {
    flushRoute() {
      this.userId = this.$route.params.userId;
      console.log()
      let meta = this.$route.meta;
      this.checkMode = meta.checkMode;
      this.displayInfo = [];
      this.getTeacherInfo();
    },
    getTeacherInfo() {
      this.displayInfo = [];
      this.displayInfo = JSON.parse(
        JSON.stringify(INFO.adminCheckInfo.users[0].userBaseInfo)
      );
      this.displayInfo.push(
        INFO.adminCheckInfo.teacherAttachInfo.users[0].attachInfo
      );
      axios.post('/api/teacher/teacher', {
        userId: this.userId
      })
      .then(res => {
        let teacher = res.data.data[0]
        console.log(teacher, this.displayInfo[1].items)
        teacher.userIdentity = '教师'
        this.displayInfo.forEach(infoArray => {
          infoArray.items.forEach(item => {
            item.value = teacher[item.key] || item.value
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 前往修改模式
    goToEditMode() {
      this.$router.push(`/edit/teacherInfo/${this.userId}`);
    },
    // 删除该用户
    delUser() {
      console.log("click Delete");
    },
    // 取消修改并进入查看模式
    goToCheckMode() {
      this.$router.push(`/check/teacherInfo/${this.userId}`);
    },
    // 提交修改
    confirmModify() {
      console.log("click Confirm");
    }
  }
};
</script>

<style scoped>

</style>
