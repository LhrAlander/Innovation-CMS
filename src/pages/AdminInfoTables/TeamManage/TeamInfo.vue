<!--基本用户信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">团队基本信息修改</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe61e;</i>
        团队管理&nbsp; >&nbsp;团队基本信息管理
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="confirmChange">确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          团队基本信息
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key="rowIndex">
             <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <info-display-temp @clickBtn="btnFunc(baseInfo[getItemIndex(rowIndex, colIndex)])" :item="baseInfo[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
                <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
              </div>
            </el-col>
          </el-row>
        </span>

        <span class="info-title">团队照片展示</span>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadPhotos">上传到服务器</el-button>
        <el-row :gutter='200' class="info-content">
          <el-col span="24" class="info-item">
             <el-upload
              action="/api/upload/teamPhotos"
              list-type="picture-card"
              :auto-upload='false'
              ref="upload"
              :file-list="files"
              :on-preview="handlePictureCardPreview"
              :data="teamInfo"
              :on-remove="handleRemove"
              name="uploadFile">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" style="z-index: 999999">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-row>
       


        <span class="info-title">发布内容简介</span>
          <el-row :gutter="200" class="info-content" style="z-index: 99">
             <el-col :span="24" class="info-item">
              <div class="item-content">
                <div id="editor-ele"></div>
              </div>
            </el-col>
          </el-row>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          团队负责人基本信息展示
          <el-button type="primary" class="leader-info-check info-detail-check" @click="checkLeader">详情查看</el-button>
          <el-row :gutter="200" class="info-content">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="leader.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="leader.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="leader.userPhone"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
  </div>


    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64b;</i>
          团队指导老师基本信息展示
          <el-button type="primary" class="teacher-info-check info-detail-check" @click="checkTeacher">详情查看</el-button>
          <el-row :gutter="200" class="info-content">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="teacher.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="teacher.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="teacher.userPhone"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>


    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          团队下项目信息
          <el-row :gutter="200" class="info-content" v-for="proRow in proInfo" :key="proRow">
             <el-col :span="12" class="info-item" v-for="pro in proRow" :key="pro.projectName">
              <span class="item-name">项目名称</span>
              <div class="item-content">
                <el-input disabled v-model="pro.projectName"></el-input>
              </div>
               <el-button type="primary" class="teacher-info-check info-detail-check" @click='checkProject(pro)'>详情查看</el-button>
            </el-col>
          </el-row>
        </span>
    </div>


  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import E from "wangeditor";
import api from "@/api/teamApi";
import utils from "@/utils/utils";
import axios from "@/utils/https";

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DISPLAY_INFO = [
  {
    key: "teamName",
    name: "团队名称",
    value: "12345",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "teamLeader",
    name: "团队负责人",
    value: "林海瑞",
    type: INPUT,
    span: 1
  },

  {
    key: "teamTeacher",
    name: "指导老师",
    value: "石兴民",
    type: SELECT,
    span: 1,
    options: []
  },
  {
    key: "supportOrg",
    name: "依托单位",
    value: "实验室",
    type: SELECT,
    options: [
      {
        value: "实验室",
        label: "实验室"
      },
      {
        value: "企业1",
        label: "企业1"
      }
    ],
    span: 1
  },
  {
    disabled: true,
    key: "leaderMajor",
    name: "负责人专业",
    value: "软件工程",
    type: INPUT,
    span: 1
  },
  {
    disabled: true,
    key: "leaderClass",
    name: "负责人班级",
    value: "152",
    type: INPUT,
    span: 1
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      leader: {},
      teacher: {},
      proInfo: [],
      teamId: "",
      teamIntro: "",
      editor: "",
      dialogImageUrl: "",
      dialogVisible: false,
      files: [],
      teamInfo: {
        teamId: ''
      }
    };
  },
  components: {
    InfoDisplayTemp
  },
  mounted() {
    this.teamId = this.$route.params.teamId;
    this.teamInfo.teamId = this.teamId
    axios
      .post("/api/auth/edit/teamInfo", { teamId: this.teamId })
      .then(res => {
        console.log(res);
        this.$store.commit("addAuthToken", res.data.authToken);
        this.editor = new E("#editor-ele");
        this.editor.customConfig.onchange = html => {
          this.teamIntro = html;
          console.log(html);
        };
        this.editor.create();
        this.initData();
      })
      .catch(err => {
        this.$store.commit("clearAuth");
      });
  },
  methods: {
    initData() {
      axios
        .get("/api/teacher/teacher/choices")
        .then(res => {
          this.baseInfo[2].options = res.data.names;
          return axios.post('/api/team/get/teamPhotos', {
            teamId: this.teamId
          })
        })
        .then(res => {
          console.log(res)
          this.files = res.data.photos
        })
        .catch(err => {
          console.log(err);
        });
      axios
        .post("/api/team/team", {
          teamId: this.teamId
        })
        .then(res => {
          res = res.data.data;
          console.log(res);
          for (let i = 0; i < this.baseInfo.length; i++) {
            let info = this.baseInfo[i];
            info.value = res.team[info.key];
            if (info.key == "teamLeader") {
              info.value = res.leader.userId;
            }
            if (info.key == "teamTeacher") {
              info.value = res.teacher.userId;
            }
            if (info.key == "supportOrg") {
              info.value = res.team.unitId;
            }
          }
          this.editor.txt.html(`<p>${res.team.teamInfo}</p>`);
          this.leader = res.leader;
          this.teacher = res.teacher;
          let info = [];
          let tmp = [];
          for (let i = 0; i < res.proInfo.length; i++) {
            if (i > 0 && i % 2 == 0) {
              info.push(tmp);
              tmp = [];
            }
            tmp.push(res.proInfo[i]);
          }
          if (tmp.length > 0) {
            info.push(tmp);
          }
          this.proInfo = info;
          return axios.get("/api/dependent/dependents");
        })
        .then(res => {
          let options = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let unit = res.data.data[i];
            options.push({
              value: unit.unit_id,
              label: unit.unit_name
            });
          }
          this.baseInfo.forEach(info => {
            if (info.key == "supportOrg") {
              info.options = options;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadPhotos() {
      this.$refs.upload.submit();      
    },
    confirmChange() {
      axios
        .post("/api/auth/edit/teamInfo", { teamId: this.teamId })
        .then(res => {
          console.log(res);
          this.$store.commit("addAuthToken", res.data.authToken);
          let info = utils.displayInfo2MySql(
            utils.filterName.TEAM,
            this.baseInfo
          );
          info.team_id = this.teamId;
          info.team_introduction = this.teamIntro;
          return axios.post("/api/team/change/team", {
            team: info
          });
        })
        .then(res => {
          console.log(res);
          this.$router.push(`/check/teamInfo/${this.teamId}`);
        })
        .catch(err => {
          this.$store.commit("clearAuth");
        });
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    checkProject(project) {
      this.$router.push(`/check/projectInfo/${project.projectId}`);
    },
    checkLeader() {
      this.$router.push(`/check/studentInfo/${this.leader.userId}`);
    },
    checkTeacher() {
      this.$router.push(`/check/teacherInfo/${this.teacher.userId}`);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      axios
        .post("/api/team/delete/photo", {
          files: file.filePath
        })
        .then(res => {
          console.log(res)
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.admin-check-info-wrapper {
  /*background-color: #ECF0F1;*/
  background-color: #fff;
  height: 100%;
  padding: 1.4rem 5rem;
}

.mode-crumb-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  display: block;
  text-align: center;
  font-size: 1.7rem;
  padding-bottom: 1.4rem;
  border-bottom: 0.3rem solid #cbcbcb;
}

.breadcrumb {
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #2a3f54;
  display: inline-block;
}

.breadcrumb .iconfont {
  font-size: 1.5rem;
  margin-right: 0.3rem;
}

.info-wrapper {
  padding: 2rem 3rem;
}

.info-title {
  font-size: 1rem;
  color: #2a3f54;
  font-weight: bold;
}

.iconfont.box {
  font-weight: normal;
  margin-right: 0.3rem;
}

.el-row.info-content {
  margin: 1.5rem 0;
}

.el-input {
  background-color: #ffff00;
  font-size: 0.9rem;
}

.info-item {
  display: flex;
  align-items: center;
}

.item-name {
  font-size: 1rem;
  width: 5rem;
  margin-right: 1rem;
}

.item-content {
  flex: 1;
}

.info-detail-check {
  height: 1.8rem;
  padding: 0.3rem;
  margin-left: 1rem;
}
</style>
