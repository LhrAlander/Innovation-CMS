<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              团队展示-内容
              <p>{{team.teamName}}</p>
            </div>
            <div class="team-msg" v-html="team.introduction">
            </div>

            <!--展示该团队的照片-->
            <div class="info-wrapper">
                <span class="info-title">
                  <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in team.photos" :key="item">
                      <img :src="item" alt="photo" class="photo">
                    </el-carousel-item>
                  </el-carousel>
                </span>
            </div>

            <div class="team-table">
              <table border="1" cellspacing="0">
                <tr>
                  <td>团队名称</td>
                  <td>{{team.teamName}}</td>
                </tr>
                <tr>
                  <td>团队成员</td>
                  <td>{{teamStudents}}</td>
                </tr>
                <tr>
                  <td>指导老师</td>
                  <td>{{team.teacherName}}   {{team.teacherPhone}}</td>
                </tr>
                <tr>
                  <td>负责人</td>
                  <td>{{team.leaderName}}  {{team.leaderPhone}}</td>
                </tr>
                <tr>
                  <td>团队名称</td>
                  <td>{{team.teamName}}</td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="/static/img/policyc.png" class="right-img"/>
              其他团队
            </div>
            <div class="right-bg">
              <div class="item" v-for="t in sideTeams" :key="t.teamId" v-if="teamId != t.teamId" @click="goDetail(t.teamId)">
                <img src="/static/img/right-icon.png"/>
                <span>{{t.teamName}}</span>
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
  computed: {
    teamStudents: function() {
      let str = "";
      this.team.students.forEach(i => {
        if (str.length > 0) {
          str += ",";
        }
        str += i;
      });
      return str;
    }
  },
  data() {
    return {
      team: "",
      teamId: "",
      url: "/api/front/teams/team",
      teamTitle: "",
      teamIntroduction: "",
      sideTeams: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.teamId = this.$route.params.id;
      axios
        .post(this.url, { teamId: this.teamId })
        .then(res => {
          console.log(res);
          this.team = res.data;
          return axios.get("/api/front/teams/side");
        })
        .then(res => {
          this.sideTeams = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goDetail(teamId) {
      this.$router.push(`/teamdetail/${teamId}`);
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
.team-msg {
  min-height: 200px;
  margin-top: 20px;
  text-align: left;
  line-height: 20px;
}
.team-table {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 100px;
}
.team-table table {
  width: 600px;
}
.team-table table td {
  width: 50%;
  height: 40px;
  text-align: center;
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
  cursor: pointer;
  display: flex;
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


img.photo {
  width: 100%;
}
</style>
