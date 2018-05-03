<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              项目展示-内容
              <p>{{projectTitle}}</p>
            </div>
            <div class="project-msg" v-html="projectIntroduction">
            </div>
            <div class="bottom-time">
              <img src="/static/img/policycTime.png">
              <span>{{projectTime}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="/static/img/policyc.png" class="right-img"/>
              最近项目
            </div>
            <div class="right-bg">
              <div class="item" v-for="p in recentProjects" :key="p.projectId" @click="goDetail(p.projectId)" v-if="p.projectId != projectId">
                <img src="/static/img/right-icon.png"/>
                <span>{{p.projectName}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
     </div>
    <my-footer class='footer'></my-footer>
  </main>
</template>
<script>
import MyHeader from "components/MyHeader";
import MyFooter from "components/MyFooter";
import axios from "@/utils/https";

export default {
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {
      projectTitle: "",
      projectIntroduction: "",
      projectTime: "",
      url: "/api/front/projects/project",
      projectId: "",
      recentProjects: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.projectId = this.$route.params.id;
      console.log("init", this.projectId);
      axios
        .post(this.url, {
          projectId: this.projectId
        })
        .then(res => {
          console.log(res);
          this.projectTitle = res.data.projectName;
          this.projectIntroduction = res.data.projectIntroduction;
          this.projectTime = res.data.projectTime;
          return axios.get("/api/front/projects/side");
        })
        .then(res => {
          this.recentProjects = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goDetail(id) {
      this.$router.push(`/projectdetail/${id}`);
    }
  },
  watch: {
    $route() {
      this.initData();
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
}
.top {
  margin-top: 15px;
  border-bottom: 1px solid #5394c5;
}
.top p {
  margin-top: 15px;
  padding-bottom: 10px;
  font-size: 18px;
}
.project-msg {
  min-height: 400px;
  margin-top: 20px;
  text-align: left;
  line-height: 20px;
}
.bottom-time {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px;
  margin-left: auto;
  margin-right: auto;
  border-top: 1px solid #f0f0f0;
}
.bottom-time img {
  width: 30px;
  height: 30px;
}
.right-img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 10px;
}
.right-bg {
  background-color: #f0f0f0;
  padding-top: 20px;
  margin-top: 20px;
  height: 75%;
}
.item {
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 30px;
  padding: 0 0 10px 20px;
  text-align: left;
}
.item img {
  width: 20px;
  height: 20px;
  padding-right: 5px;
}
</style>
