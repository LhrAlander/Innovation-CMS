<template>
  <div>
    <my-header></my-header>

    <div class="container">
      <el-row>
        <el-col :span="24">
          <carousel></carousel>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15" class="announcement">
          <router-link to="/"><h2 class="title title-left">通知公告</h2></router-link>
          <div class="announcements" ref="indexAnnouncements">
            <announcement v-for="item in announcements" :announcement="item"></announcement>
          </div>
        </el-col>
        <el-col :span="7" :offset="2" class="team-show">
          <h2 class="title title-left">团队展示</h2>
          <div class="team-show-wrapper">
            <el-row v-for="item in 3" :gutter="40">
              <el-col :span="12"><team-display></team-display></el-col>
              <el-col :span="12"><team-display></team-display></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h2 class="title">获奖情况</h2>
          <award></award>
          <!--<router-link to="/"><span class="more award-more">更多&nbsp;&gt; </span></router-link>-->
        </el-col>
      </el-row>

      <el-row :gutter="160">
        <el-col :span="12" class="policy">
          <h2 class="title title-left">政府政策</h2>
          <div class="policy-cnt">
            <policy-and-file v-for="policy in policys" :key='policy.policyId' :policy='policy'></policy-and-file>
          </div>
        </el-col>
        <el-col :span="12" class="school-files">
          <h2 class="title title-left">学校文件</h2>
          <div class="files-cnt">
            <policy-and-file v-for="file in files" :key='file.file_system_id' :policy='file'></policy-and-file>
          </div>
        </el-col>
      </el-row>


    </div>

    <my-footer></my-footer>
  </div>

</template>

<script>
import Carousel from "components/Carousel";
import Announcement from "components/Announcement";
import LogAndReg from "components/LogAndReg";
import Award from "components/Award";
import PolicyAndFile from "components/PolicyAndFile";
import TeamDisplay from "components/TeamDisplay";
import MyHeader from "components/MyHeader";
import MyFooter from "components/MyFooter";

import axios from "@/utils/https";

const constAnnouncements = [
  {
    date: "2017/10/18",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2017/10/11",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2017/10/10",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2017/10/08",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2017/02/18",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2017/01/18",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  },
  {
    date: "2016/01/18",
    items: [
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标",
      "文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标签文本标文本标签文本标签文本标签文本标"
    ]
  }
];

export default {
  components: {
    Carousel,
    Announcement,
    LogAndReg,
    Award,
    PolicyAndFile,
    TeamDisplay,
    MyHeader,
    MyFooter
  },
  data() {
    return {
      announcements: [],
      policys: [],
      files: []
    };
  },
  mounted() {
    axios
      .get("/api/front/index/policys")
      .then(res => {
        this.policys = res.data.data
        this.policys.forEach(p => {
          p.url = `/policysDetail/${p.policyId}`
        })
        return axios.get('/api/front/index/files')
      })
      .then(res => {
        console.log(res)
        this.files = res.data.data
        this.files.forEach(p => {
          p.url = `/fileDetail/${p.file_system_id}`
        })
        return axios.get("/api/front/index/notifications");
      })
      .then(res => {
        this.announcements = res.data.data;
        this.$nextTick(this.updateAnnouncements);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    updateAnnouncements() {
      const myBox = this.$refs.indexAnnouncements;
      console.log(myBox.clientHeight);
      console.log(myBox.scrollHeight);
      if (myBox.scrollHeight > myBox.clientHeight) {
        let announcement = this.announcements[this.announcements.length - 1];
        if (announcement.items.length > 1) {
          announcement.items.pop();
          console.log(this.announcements[this.announcements.length - 1]);
        } else {
          this.announcements.pop();
        }
        console.log(announcement);
        this.$nextTick(function() {
          this.updateAnnouncements();
        });
      }
    }
  }
};
</script>

<style scoped>
a {
  color: #000;
}

.container {
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
}

.el-row {
  margin: 15px 0;
}

.announcement,
.team-show {
  height: 500px;
  marigin: 10px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title {
  padding: 10px 0;
  border-bottom: 3px solid #5c99c8;
}

.title-left {
  text-align: left;
}

.title-right {
  text-align: right;
}

.announcements,
.team-show-wrapper {
  color: #000;
  padding: 40px 0 0;
  flex: 1;
}

.announcements,
.policy-cnt,
.files-cnt,
.team-cnt {
  padding: 40px 35px 0;
}

.team-show-wrapper {
  padding: 40px 1.5rem;
}

span.more {
  display: block;
  color: #000;
  font-weight: bold;
  padding-right: 15px;
  text-align: right;
}

span.award-more {
  padding-right: 35px;
}

.policy,
.school-files {
}

.policy-cnt,
.files-cnt {
  height: 400px;
  background-origin: content-box;
  background-clip: content-box;
}

.team-cnt {
  padding: 40px 35px 0;
  /*background-color: #1d90e6;*/
  background-origin: content-box;
  background-clip: content-box;
}
</style>
