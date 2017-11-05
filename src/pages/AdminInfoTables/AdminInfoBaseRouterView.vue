<template>
  <check-user-info
    :title="title"
    :breadCrumbs="breadCrumbs"
    :displayInfo="displayInfo"
    :checkMode="checkMode"
    @goModifyMode="goModifyMode"
    @goCheckMode="goCheckMode"></check-user-info>
</template>

<script>
  import INFO from '@/infoTestData.js'
  import CheckUserInfo from 'pages/AdminInfoTables/UserManage/UserInfo'
  export default {
    components: {
      CheckUserInfo
    },
    data () {
      return {
        title: "用户基本信息查看",
        breadCrumbs: {
          iconCode: "&#xe6a0;",
          firstLevel: "用户管理",
          otherLevels: ["用户基本信息查看"]
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
        switch(meta.tableName) {
          case "userInfo":
            this.getUserInfo()
            break
          case "teacherInfo":
            this.getTeacherInfo()
            break
          case "companyInfo":
            this.getCompanyInfo()
            break
          case "studentInfo":
            this.getStudentInfo()
            break
        }
      },
      getUserInfo () {
        this.displayInfo = INFO.adminCheckInfo.users[this.$route.params.userId].userBaseInfo
      },
      getTeacherInfo () {
        this.displayInfo = []
        this.title = "教师信息查看"
        this.breadCrumbs.otherLevels = ["教师信息查看"]
        this.displayInfo = JSON.parse(JSON.stringify(INFO.adminCheckInfo.users[this.$route.params.userId].userBaseInfo))
        this.displayInfo.push(INFO.adminCheckInfo.teacherAttachInfo.users[this.$route.params.userId].attachInfo)
      },
      getCompanyInfo () {
        this.displayInfo = []
        this.title = "企业信息查看"
        this.breadCrumbs.otherLevels = ["企业信息查看"]
        this.displayInfo = JSON.parse(JSON.stringify(INFO.adminCheckInfo.users[this.$route.params.userId].userBaseInfo))
        this.displayInfo.push(INFO.adminCheckInfo.companyAttachInfo.users[this.$route.params.userId].attachInfo)
      },
      getStudentInfo () {
        this.displayInfo = []
        this.title = "学生信息查看"
        this.breadCrumbs.otherLevels = ["学生信息查看"]
        this.displayInfo = JSON.parse(JSON.stringify(INFO.adminCheckInfo.users[this.$route.params.userId].userBaseInfo))
        this.displayInfo.push(INFO.adminCheckInfo.studentAttachInfo.users[this.$route.params.userId].attachInfo)
      },
      goModifyMode () {
        let path = "/edit/"+this.$route.meta.tableName+"/"+this.$route.params.userId
        this.$router.push(path)
      },
      goCheckMode () {
        let path = "/check/"+this.$route.meta.tableName+"/"+this.$route.params.userId
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
</style>
