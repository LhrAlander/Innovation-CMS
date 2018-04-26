<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <display-tmpl class='display-tmpl' :title="title" :content='notifications'></display-tmpl>
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
import DisplayTmpl from "@/components/NormalDisplayTmpl";
import axios from "@/utils/https";
export default {
  components: {
    MyHeader,
    MyFooter,
    DisplayTmpl
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 7,
      totalCount: 15,
      url: "/api/front/notifications/notifications",
      notifications: [],
      title: "通知公告"
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
          this.notifications = res.data.notifications;
        })
        .catch(err => {
          console.log(err);
        });
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
  min-height: calc(100vh - 282px);
}
.container {
  width: 1080px;
  padding: 0 30px;
  margin: 0 auto;
}

.el-pagination {
  text-align: center;
  margin: 62px auto;
}
.display-tmpl {
  margin-top: 30px;
}

.footer {
  width: 100%;
  height: 220px;
}
</style>
