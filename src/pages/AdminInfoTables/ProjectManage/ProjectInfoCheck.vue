<!--项目信息查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">项目基本信息查看</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe601;</i>
        项目管理&nbsp; >&nbsp;项目基本信息查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="goForEdit">修改信息</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          项目基本信息
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key='rowIndex'>
             <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
                <el-input disabled v-model="baseInfo[getItemIndex(rowIndex, colIndex)].value"></el-input>
              </div>
            </el-col>
          </el-row>

          <!--材料展示-->
          <el-row :gutter="200" class="info-content">
             <el-col :span="24" class="info-item file-item">
              <span class="item-name">项目申请材料</span>
              
              <div class="item-content file-item-content">
                <el-button @click='downloadRegFile' type='success' size='mini' v-if="regFile.length > 0">下载</el-button>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="200" class="info-content" v-if="regFile.length > 0">
             <el-col :span="24" class="info-item file-item">
              <ul>
                <li v-for="file in regFile" :key='file.fileName'>{{ file.fileName }}</li>
              </ul>
            </el-col>
          </el-row>

          <!--材料展示-->
          <el-row :gutter="200" class="info-content">
             <el-col :span="24" class="info-item file-item">
              <span class="item-name">项目中期材料</span>
              
              <div class="item-content file-item-content">
                <el-button @click='downloadMidFile' type='success' size='mini' v-if="midFile.length > 0">下载</el-button>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="200" class="info-content" v-if="midFile.length > 0">
             <el-col :span="24" class="info-item file-item">
              <ul>
                <li v-for="file in midFile" :key='file.fileName'>{{ file.fileName }}</li>
              </ul>
            </el-col>
          </el-row>

          <!--材料展示-->
          <el-row :gutter="200" class="info-content">
             <el-col :span="24" class="info-item file-item">
              <span class="item-name">项目结题材料</span>
              
              <div class="item-content file-item-content">
                <el-button @click='downloadFinishFile' type='success' size='mini' v-if="finishFile.length">下载</el-button>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="200" class="info-content">
             <el-col :span="24" class="info-item file-item">
              <ul>
                <li v-for="file in finishFile" :key='file.fileName'>{{ file.fileName }}</li>
              </ul>
            </el-col>
          </el-row>
        </span>
    </div>


  


    <!--项目指导负责人-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          项目负责人基本信息展示
          <router-link :to="leaderLink">
            <el-button type="primary" class="leader-info-check info-detail-check">详情查看</el-button>
          </router-link>
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


    <!--项目指导老师-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64b;</i>
          项目指导老师基本信息展示
          <router-link :to="teacherLink">
            <el-button type="primary" class="leader-info-check info-detail-check">详情查看</el-button>
          </router-link>
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


    <!--项目成员-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64b;</i>
          项目成员基本信息展示
          <el-row :gutter="200" class="info-content" v-for="member in members" :key="member.userId">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="member.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="member.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="member.userPhone"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>





  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import axios from "@/utils/https";

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DISPLAY_INFO = [
  {
    key: "projectName",
    name: "项目名称",
    value: "呀呀呀",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "projectIdentity",
    name: "项目类别",
    value: "实验室",
    type: SELECT,
    options: [],
    span: 1
  },
  {
    key: "projectLevel",
    name: "项目级别",
    value: "国家级",
    type: SELECT,
    span: 1,
    options: [],
    disabled: false
  },
  {
    key: "projectId",
    name: "项目编号",
    value: "123",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "projectTeacher",
    name: "指导老师",
    value: "石兴民",
    type: SELECT,
    span: 1,
    disabled: false,
    options: [
      {
        value: "石兴民",
        label: "石兴民"
      },
      {
        value: "某某某",
        label: "某某某"
      }
    ]
  },
  {
    key: "projectDep",
    name: "项目依托单位",
    value: [],
    type: SELECT,
    span: 1,
    disabled: false,
    options: []
  },
  {
    key: "registerYear",
    name: "项目申请年份",
    value: "2015",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "startYear",
    name: "项目开始年份",
    value: "2016",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "finishYear",
    name: "项目截止时间",
    value: "",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "projectPerson",
    name: "项目负责人",
    value: "林海瑞",
    type: SELECT,
    span: 1,
    disabled: false,
    options: [
      {
        value: "滕飞",
        label: "滕飞"
      },
      {
        value: "杨贺",
        label: "杨贺"
      }
    ]
  },
  {
    key: "personMajor",
    name: "负责人专业",
    value: "软件工程",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "personClass",
    name: "负责人班级",
    value: "152",
    type: INPUT,
    span: 1,
    disabled: true
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      regFile: [],
      finishFile: [],
      midFile: [],
      leader: {
        userId: 2015210405043,
        name: "林海瑞",
        userPhone: 123456789
      },
      teacher: {
        userId: 123456789,
        name: "石兴民",
        userPhone: 123456789
      },
      members: [
        {
          userId: 123456789,
          name: "石兴民",
          userPhone: 123456789
        },
        {
          userId: 123456789,
          name: "石兴民",
          userPhone: 123456789
        },
        {
          userId: 123456789,
          name: "石兴民",
          userPhone: 123456789
        }
      ]
    };
  },
  components: {
    InfoDisplayTemp
  },
  async mounted() {
    axios
      .post("/api/auth/projectInfo", { projectId: this.$route.params.id })
      .then(res => {
        console.log(res);
        this.$store.commit("addAuthToken", res.data.authToken);
        this.initData();
      })
      .catch(err => {
        this.$store.commit("clearAuth");
      });
  },
  methods: {
    initData() {
      const projectId = this.$route.params.id;
      axios
        .post("/api/project/project", {
          projectId: projectId
        })
        .then(res => {
          console.log(res.data);
          this.baseInfo.forEach(item => {
            item.value = res.data.project[item.key];
          });
          if (res.data.regFile != undefined) {
            this.regFile = res.data.regFile;
          }
          if (res.data.finishFile != undefined) {
            this.finishFile = res.data.finishFile;
          }
          if (res.data.midFile != undefined) {
            this.midFile = res.data.midFile;
          }
          this.teacher = res.data.teacher;
          this.leader = res.data.leader;
          this.members = res.data.members;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    // 进入编辑模式
    goForEdit() {
      this.$router.push(`/edit/ProjectInfo/${this.$route.params.id}`);
    },
    // 下载申请材料
    downloadRegFile() {
      for (let i = 0; i < this.regFile.length; i++) {
        console.log(this.regFile[i]);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src =
          "/api/download?filePath=" +
          this.regFile[i].filePath +
          "&fileName=" +
          this.regFile[i].fileName;
        iframe.onload = function() {
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
      }
    },
    downloadMidFile() {
      for (let i = 0; i < this.midFile.length; i++) {
        console.log(this.midFile[i]);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src =
          "/api/download?filePath=" +
          this.midFile[i].filePath +
          "&fileName=" +
          this.midFile[i].fileName;
        iframe.onload = function() {
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
      }
    },
    // 下载结题材料
    downloadFinishFile() {
      for (let i = 0; i < this.finishFile.length; i++) {
        console.log(this.finishFile[i]);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src =
          "/api/download?filePath=" +
          this.finishFile[i].filePath +
          "&fileName=" +
          this.finishFile[i].fileName;
        iframe.onload = function() {
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
      }
    }
  },
  computed: {
    leaderLink() {
      return `/check/studentInfo/${this.leader.userId}`;
    },
    teacherLink() {
      return `/check/teacherInfo/${this.teacher.userId}`;
    }
  }
};
</script>

<style scoped>
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
  width: 6rem;
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

.file-item {
  position: relative;
}

.end-file-btn,
.reg-file-btn {
  margin-top: 1rem;
  float: right;
}
</style>
