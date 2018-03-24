<template>
  <el-row>
    <el-col :span="6" class="image">
      <img src="../assets/img/logoTitle.png" alt="">
    </el-col>
    <el-col :span="18" class="content">
      <div class="cnt-wrapper">
        <h5 class="title">{{team.teamName}}</h5>
        <p class="introduce" v-html="htmlStr"></p>
        <!--<p class="meta"><i class="iconfont calendar">&#xe6eb;</i>2017/10/17</p>-->
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    team: Object
  },
  computed: {
    htmlStr () {
      if (this.team.teamIntroduce ) {
        return this.team.teamIntroduce.replace(/<[^>]+>/g,"");//去掉所有的html标记
      }
      return '暂无团队介绍'
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 1.7rem;
}

.el-col {
  height: 100px;
}

img {
  width: 100%;
  height: 100%;
}

.content {
  padding: 10px;
  background-origin: content-box;
  background-clip: content-box;
}

.cnt-wrapper {
  height: 100%;
  border-bottom: 1px solid #000;
}

h5.title {
  font-size: 1rem;
  margin-bottom: 15px;
}

p.introduce {
  max-height: 35px;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box; /*设置弹性盒模型*/
  -webkit-line-clamp: 2; /*文本占的行数,如果要设置2行加...则设置为2*/
  -webkit-box-orient: vertical; /*子代元素垂直显示*/
}

p.meta {
  font-size: 0.9rem;
  text-align: right;
  line-height: 0.9rem;
}

i.calendar {
  margin-right: 10px;
  font-size: 1.5rem;
  color: #888;
}
</style>
