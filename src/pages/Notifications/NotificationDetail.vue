<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              通知公告-内容
            </div>
            <div class="notification-article">
              <div class="article-title">{{title}}</div>
              <el-row class="article-info">
                <el-col :span="12" v-model="author">作者:{{author}}</el-col>
                <el-col :span="12" v-model="uploadTime">上传时间：{{uploadTime}}</el-col>
              </el-row>
              <el-row class="article" v-html="article">
              </el-row>
              <el-row type="flex" justify="space-between" v-if="files.length > 0">
                <el-col :span="6" class="article-download">
                  <span @click="downloadFile">下载附件</span> 
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="/static/img/policyc.png" class="right-img"/>
              最近通知
            </div>
            <div class="right-bg">
              <div class="item" v-for="n in recentNotifications" :key="n.notificationId" v-if="n.notificationId != notificationId" @click="goDetail(n.notificationId)">
                <img src="/static/img/policycTime.png">
                <span>{{n.publishTime}}</span>
                <p>{{n.notificationTitle}}</p>
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
      notificationId: "",
      url: "/api/front/notifications/notification",
      title: "",
      author: "",
      uploadTime: "",
      article: "<h1>暂无政策简介信息</h1>",
      recentNotifications: [],
      files: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.notificationId = this.$route.params.id;
      axios
        .post(this.url, {
          notificationId: this.notificationId
        })
        .then(res => {
          console.log(res);
          this.files = res.data.files;
          res = res.data.notification;
          this.title = res.title;
          this.author = res.author;
          this.article = res.introduction;
          this.uploadTime = res.publishTime;
          return axios.get("/api/front/notifications/side");
        })
        .then(res => {
          this.recentNotifications = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    downloadFile() {
      utils.downloadFile(this.files);
    },
    goDetail(id) {
      this.$router.push(`/notificationsDetail/${id}`);
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
.notifications-article {
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
  margin-bottom: 20px;
  /* margin-top: -20px; */
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
</style>
