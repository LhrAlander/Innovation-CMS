<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <section class='container'>
        <el-row>
          <el-col :span="24">
            <carousel></carousel>
          </el-col>
        </el-row>
      </section>
      <section class="container content-section">
        <team v-for="(team, index) in teams" :key='team.teamId' class="project-content" :team='team' :class="{'margin-content': (index - 1) % 3 == 0}"></team>
      </section>
      <section class="container pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout=" prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </section>
    </div>
    <my-footer class='footer'></my-footer>
  </main>
</template>
<script>
import MyHeader from "components/MyHeader";
import MyFooter from "components/MyFooter";
import Carousel from "components/Carousel";
import Team from "./components/Team";

import axios from "@/utils/https";
export default {
  components: {
    MyHeader,
    MyFooter,
    Carousel,
    Team
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      totalCount: 0,
      url: "/api/front/teams/teams",
      teams: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      axios
        .get(this.url, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res);
          this.totalCount = res.data.count;
          this.teams = res.data.teams;
        })
        .catch(err => {
          console.log(err);
        });
    },
    teamDetail(team) {
      console.log(team);
    },
    handleCurrentChange(val) {
      this.pageSize = val;
      this.initData();
    }
  }
};
</script>
<style scoped>
main {
  min-height: 100%;
}
.wrapper {
  min-height: calc(100vh - 220px);
}
.container {
  width: 1080px;
  padding: 0 30px;
  margin: 0 auto;
}

.content-section {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-top: 6px;
  margin-bottom: 48px;
}

.project-content {
  margin: 31px 0;
}

.margin-content {
  margin: 31px 90px;
}
.el-pagination {
  text-align: center;
  margin-bottom: 62px;
}
.footer {
  width: 100%;
  height: 220px;
}
</style>
