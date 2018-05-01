<template>
  <div class="container" ref='container'>
    <div class="breadcrumb">
      <i class="iconfont" v-html="this.$route.meta.iconCode"></i>
      {{this.$route.meta.firstLevel}}
      <span v-if="this.$route.meta.secondLevel">&nbsp; >&nbsp; {{this.$route.meta.secondLevel}}</span>
    </div>
    <keep-alive>
      <router-view @changeHeight='changeHeight'></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: {
        iconCode: "&#xe6a0;",
        firstLevel: "用户管理",
        secondLevel: "基本用户信息管理"
      }
    };
  },
  created() {
    //        console.log(this.$route)
  },
  methods: {
    changeHeight(value) {
      this.$refs.container.style.height = `${value.height}px`
      this.$emit('changeHeight', value)
    }
  }
};
</script>
<style scoped>
.container {
  display: inline-block;
  width: calc(100% - 250px);
  background-color: #ecf0f1;
  height: 100%;
  float: right;
  position: relative;
}
.breadcrumb {
  position: absolute;
  font-size: 0.8rem;
  font-weight: bold;
  color: #2a3f54;
  margin-left: 50px;
  margin-top: 50px;
  display: inline-block;
}
.breadcrumb .iconfont {
  font-size: 1.5rem;
}
</style>
