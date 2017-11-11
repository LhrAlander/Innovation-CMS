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
  import INFO from '@/infoTestData.js'
  import CheckUserInfo from '@/components/Admin/InfoOperate/UserInfo/UserInfoCheck'
  import EditUserInfo from '@/components/Admin/InfoOperate/UserInfo/UserInfoEdit'
  export default {
    components: {
      CheckUserInfo,
      EditUserInfo
    },
    data () {
      return {
        title: "学生信息查看",
        breadCrumbs: {
          iconCode: "&#xe6a0;",
          firstLevel: "用户管理",
          otherLevels: ["学生信息查看"]
        },
        displayInfo: [],
        checkMode: true
      }
    },
    mounted () {
      this.flushRoute()
    },
    watch: {
      $route() {
        this.flushRoute()
      }
    },
    methods: {
      flushRoute () {
        let meta = this.$route.meta
        this.checkMode = meta.checkMode
        this.displayInfo = []
        this.getStudentInfo()
      },
      getStudentInfo () {
        this.displayInfo = JSON.parse(JSON.stringify(INFO.adminCheckInfo.users[this.$route.params.userId].userBaseInfo))
        this.displayInfo.push(INFO.adminCheckInfo.studentAttachInfo.users[this.$route.params.userId].attachInfo)
      },
      // 前往修改模式
      goToEditMode () {
        console.log("click Edit");
      },
      // 删除该用户
      delUser () {
        console.log("click Delete")
      },
      // 取消修改并进入查看模式
      goToCheckMode () {
        console.log("click Check");
      },
      // 提交修改
      confirmModify () {
        console.log("click Confirm")
      },
    }
  }
</script>

<style scoped>
</style>
