<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              立项信息-内容
            </div>
            <div class="policyc-article">
              <div class="article-title">{{title}}</div>
              <el-row class="article-info"  type="flex" justify="center">
                <span>上传时间：{{uploadTime}}</span>
                <span>截止时间：{{endTime}}</span>
                <span class="signup-link" @click="signUp">报名点我！</span>
              </el-row>
              <el-row class="article" v-html="article">
              </el-row>
              <el-row v-if="files.length > 0">
                <el-col :span="12" class="article-download">
                  <span @click="downloadFile">下载附件</span> 
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="/static/img/policyc.png" class="right-img"/>
              立项信息
            </div>
            <div class="right-bg">
              <div class="item" v-for="r in recentPendProjects" v-if="r.id != id" :key="r.id" @click="goDetail(r.id)">
                <img src="/static/img/policycTime.png">
                <span>{{r.applyYear}}</span>
                <p>{{r.projectName}}</p>
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
import utils from "@/utils/utils";

export default {
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {
      title: "",
      id: "",
      url: "/api/front/projects/pendProject",
      uploadTime: "",
      endTime: "",
      article: "",
      recentPendProjects: [],
      files: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.id = this.$route.params.id;
      axios
        .post(this.url, { id: this.id })
        .then(res => {
          res = res.data;
          console.log(res);
          this.title = res.project.projectName;
          this.uploadTime = res.project.applyYear;
          this.endTime = res.project.deadlineYear;
          this.article = res.project.introduction;
          this.files = res.files;
          return axios.get("/api/front/projects/pendSide");
        })
        .then(res => {
          console.log(res);
          this.recentPendProjects = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFiles() {
      console.log("get");
    },
    downloadFile() {
      utils.downloadFile(this.files);
    },
    goDetail(id) {
      this.$router.push(`/pendProjectDetail/${id}`);
    },
    signUp() {
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user && user.type == "学生") {
        this.$router.push(`/signup/project/${this.$route.params.id}`);
      } else {
        this.$message.error("请以注册学生用户登录再进行操作");
      }
    }
  },
  watch: {
    $route() {
      console.log("change");
      this.initData();
    }
  }
};
</script>
<style scoped>
.wrapper {
  min-height: calc(100vh - 220px);
}
.container {
  height: 100%;
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.top {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #5394c5;
}
.policyc-article {
  margin-bottom: 100px;
  padding: 0 20px;
  border: 1px solid #cccccc;
  text-align: center;
  font-size: 14px;
}
.article-title {
  height: 60px;
  line-height: 60px;
  color: #5394c5;
  font-size: 18px;
}
.article-info {
  height: 30px;
  line-height: 30px;
  margin-top: -20px;
}
.article-info span {
  margin-right: 2rem;
}
.article {
  line-height: 25px;
  text-align: left;
}
.article-form {
  height: 60px;
  line-height: 30px;
  text-align: left;
}
.article-download {
  cursor: pointer;
  text-align: left;
  height: 60px;
  line-height: 60px;
  color: #5394c5;
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
  margin-top: 20px;
  height: 75%;
}
.item {
  cursor: pointer;
  margin: 0 15px;
  border-bottom: 1px solid #cccccc;
  color: #cccccc;
  font-size: 13px;
  padding: 20px 0 5px 0;
}
.item img {
  width: 30px;
  height: 30px;
  margin-top: -10px;
  vertical-align: middle;
}
.item p {
  padding-left: 5px;
  height: 50px;
  color: #000000;
  font-size: 14px;
  line-height: 20px;
}
.signup-link {
  color: #5394c5;
  cursor: pointer;
}
</style>
