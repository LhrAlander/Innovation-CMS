<template>
  <div id="head" class='manage-head'>
    <div class="more">
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">更多操作</template>
           <el-menu-item index="1-1" @click="goIndex">返回首页</el-menu-item>
          <el-menu-item index="1-2" @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    goIndex() {
      this.$router.push("/");
    },
    logout() {
      this.$store.commit("logout");
      this.goIndex();
    }
  }
};
</script>
<style scoped>
#head {
  width: 100%;
  height: 60px;
  background-color: #2a3f54;
}
.more {
  float: right;
  margin-right: 10px;
}
</style>
