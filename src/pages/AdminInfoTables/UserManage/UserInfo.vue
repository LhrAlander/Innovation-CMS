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
import API from "@/api/userApi";
export default {
  components: {
    CheckUserInfo,
    EditUserInfo
  },
  data() {
    return {
      title: "用户基本信息查看",
      breadCrumbs: {
        iconCode: "&#xe6a0;",
        firstLevel: "用户管理",
        otherLevels: ["用户基本信息查看"]
      },
      displayInfo: [],
      checkMode: true
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
      let meta = this.$route.meta;
      this.checkMode = meta.checkMode;
      this.displayInfo = [];
      this.getUserInfo();
    },
    // 重置密码
    resetPwd() {
      let userId = this.$route.params.userId;
      let user = {
        user: {
          user_id: userId,
          user_pwd: 12345
          // d: 1
        }
      };
      let resetPWDRes = {};
      this.$confirm("是否重置该用户密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        closeOnPressEscape: false,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "重置密码中...";
            API.resetPWD(user)
              .then(function(res) {
                instance.confirmButtonLoading = false;
                resetPWDRes = res.data;
                done();
              })
              .catch(err => {
                done();
              });
          } else {
            console.log("else");
            done();
          }
        }
      })
        .then(() => {
          let message = "重置密码失败";
          let type = "error";
          console.log(resetPWDRes);
          if (resetPWDRes.code == 200) {
            message = "重置密码成功！";
            type = "success";
          }
          this.$message({
            type: type,
            message: message
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "未能重置密码"
          });
        });
    },
    // 前往修改模式
    goToEditMode() {
      let userId = this.$route.params.userId;
      this.$router.push("/edit/userInfo/" + userId);
    },
    // 删除该用户
    delUser() {
      console.log("click Delete");
    },
    // 取消修改并进入查看模式
    goToCheckMode() {
      let userId = this.$route.params.userId;
      this.$router.push("/check/userInfo/" + userId);
    },
    // 提交修改
    confirmModify() {
      console.log("click Confirm");
    },
    // 获取用户信息
    getUserInfo() {
      let userId = this.$route.params.userId;
      this.displayInfo = INFO.adminCheckInfo.users[0].userBaseInfo;
      API.searchUser(userId).then(res => {
        let user = res.data.data[0];
        this.userInfoTransform(user);
      });
    },
    // 后台传回的信息的转换
    userInfoTransform(user) {
      let items = this.displayInfo[0].items;
      items[0].value = user.user_id;
      items[1].value = user.user_name;
      items[2].value = user.user_sex;
      items[3].value = user.user_mail;
      items[4].value = user.user_phone;
      items[5].value = user.account_state;
      items[6].value = user.user_identity;
    }
  }
};
</script>

<style scoped>

</style>
