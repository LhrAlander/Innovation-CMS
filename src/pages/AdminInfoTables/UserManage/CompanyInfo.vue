<template>
  <div>
    <check-user-info
      v-if="checkMode"
      :title="title"
      :breadCrumbs="breadCrumbs"
      :displayInfo="displayInfo">
      <template slot="header-btn-wrapper">
        <el-button type="primary"  class="modify-mode-btn"  v-if="userType == '管理员' || loginUserId == userId" @click="goToEditMode">编辑用户信息</el-button>
        <el-button type="danger"  class="modify-mode-btn" @click="delUser" v-if="userType == '管理员'">删除该用户</el-button>
      </template>
    </check-user-info>

    <edit-user-info
      v-if="!checkMode"
      :title="title"
      :breadCrumbs="breadCrumbs"
      :displayInfo="displayInfo"
      @resetPWD = "resetPwd">
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
import axios from "@/utils/https";
export default {
  components: {
    CheckUserInfo,
    EditUserInfo
  },
  data() {
    return {
      userType: '',
      title: "企业信息查看",
      breadCrumbs: {
        iconCode: "&#xe6a0;",
        firstLevel: "用户管理",
        otherLevels: ["企业信息查看"]
      },
      displayInfo: [],
      checkMode: true,
      userId: null,
      loginUserId: ''
    };
  },
  mounted() {
    this.flushRoute();
  },
  watch: {
    $route() {
      this.userType = this.$store.state.user.type || JSON.parse(window.localStorage.getItem('user')).type
      this.loginUserId = this.$store.state.user.userId || JSON.parse(window.localStorage.getItem('user')).userId
      this.flushRoute();
    }
  },
  methods: {
    flushRoute() {
      this.userId = this.$route.params.userId;
      let meta = this.$route.meta;
      this.checkMode = meta.checkMode;
      this.displayInfo = [];
      this.getCompanyInfo();
    },
     // 重置密码
    resetPwd() {
      let userId = this.$route.params.userId;
      this.$store.dispatch('resetPwd', {userId: this.userId, that: this})
    },

    getCompanyInfo() {
      this.displayInfo = [];
      this.title = "企业信息查看";
      this.breadCrumbs.otherLevels = ["企业信息查看"];
      this.displayInfo = JSON.parse(
        JSON.stringify(INFO.adminCheckInfo.users[0].userBaseInfo)
      );
      this.displayInfo.push(
        INFO.adminCheckInfo.companyAttachInfo.users[0].attachInfo
      );
      axios.post('/api/company/company', {
        userId: this.userId
      })
      .then(res => {
        console.log(res)
        
        let student = res.data.data[0]
        this.displayInfo.forEach(infoArray => {
          infoArray.items.forEach(item => {
            item.value = student[item.key] || item.value
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 前往修改模式
    goToEditMode() {
      this.$router.push(`/edit/companyInfo/${this.userId}`);
    },
    // 删除该用户
    delUser() {
      this.$store.dispatch("delUser", {
        userId: this.userId,
        that: this
      });
    },
    // 取消修改并进入查看模式
    goToCheckMode() {
      this.$router.push(`/check/companyInfo/${this.userId}`);
    },
    // 提交修改
    confirmModify() {
      this.$store.dispatch('changeCompanyInfo', {
        displayInfo: this.displayInfo,
        that: this,
        companyId: this.userId
      })
    }
  }
};
</script>

<style scoped>

</style>
