<!--项目信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">项目基本信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe601;</i>
        项目管理&nbsp; >&nbsp;项目基本信息修改
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='confirmChange'>确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          项目基本信息
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key="rowIndex">
             <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <info-display-temp @clickBtn="btnFunc(baseInfo[getItemIndex(rowIndex, colIndex)])" :item="baseInfo[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
                <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
              </div>
            </el-col>
          </el-row>

          <!--材料展示-->
          <el-row :gutter="200" class="info-content">
             <el-col :span="12" class="info-item file-item">
              <span class="item-name">项目申请材料</span>
              <div class="item-content">
                <el-upload
                  class="upload-demo"
                  ref="regUpload"
                  action="/api/upload/project"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :on-success="regUploadSuccess"
                  :file-list="regFile"
                  :auto-upload="false"
                  name="uploadFile"
                  :data='fileData'
                  :on-progress='fileOnProgress'
                  >
                  <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="mini" type="success" @click="uploadRegFile">上传到服务器</el-button>
                  <el-button style="margin-left: 10px;"   size="mini" type="danger" @click='deleteAllRegFiles'>删除全部</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传zip/rar文件，且不超过10MB</div> -->
                </el-upload>

              </div>
            </el-col>
            <el-col :span="12" class="info-item file-item">
              <span class="item-name">项目结题材料</span>
              <div class="item-content">
                <el-upload
                  class="upload-demo"
                  ref="finishUpload"
                  action="/api/upload/project"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :on-success="finishUploadSuccess"
                  :file-list="finishFile"
                  :auto-upload="false"
                  name="uploadFile"
                  :data='fileData'
                  :on-progress='fileOnProgress'
                  >
                  <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="mini" type="success" @click="uploadFinishFile">上传到服务器</el-button>
                  <el-button style="margin-left: 10px;"   size="mini" type="danger" @click='deleteAllFinishFiles'>删除全部</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传zip/rar文件，且不超过10MB</div> -->
                </el-upload>

              </div>
            </el-col>
          </el-row>



        </span>
    </div>

    <!--项目指导负责人-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          项目负责人基本信息展示
          <el-button type="primary" class="leader-info-check info-detail-check">详情查看</el-button>
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
          <el-button type="primary" class="leader-info-check info-detail-check">详情查看</el-button>
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
           <el-button type="primary" class="leader-info-check info-detail-check" @click='isAdd=true'>添加成员</el-button>
          <el-row style="margin-top: 12px" v-if="isAdd">
            <el-col :span="7" class="info-item">
              <span class="item-name">用户名</span>
                <div class="item-content">
                  <el-input v-model="addUserId"></el-input>
                </div>
                <el-button  style="margin-left: 12px" type="success" size="small" @click="confirmAdd">确定添加</el-button>
                <el-button type="primary" size="small" @click="cancelAdd">取消添加</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="200" class="info-content" v-for="member in members" :key="member.userId">
             <el-col :span="7" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="member.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="7" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="member.name"></el-input>
              </div>
            </el-col>
            <el-col :span="7" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="member.userPhone"></el-input>
              </div>
            </el-col>
            <el-col :span="3" class="info-item">
              <el-button type="danger" @click="deleteMember(member)">删除</el-button>
            </el-col>
          </el-row>
        </span>
    </div>



  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import projectApi from "@/api/projectApi";
import axios from "@/utils/https";
import utils from "@/utils/utils"

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DATE_PICKER = 7;
const MULTI_SELECT = 8;
const DISPLAY_INFO = [
  {
    key: "projectName",
    name: "项目名称",
    value: "呀呀呀",
    type: INPUT,
    span: 1,
    disabled: false
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
    type: INPUT,
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
    // value: ["123", "123"],
    value: [],
    type: MULTI_SELECT,
    span: 1,
    disabled: false,
    options: [
      {
        value: "实验室1",
        label: "实验室1",
        children: [
          {
            value: "123",
            label: "团队1"
          },
          {
            value: "团队2",
            label: "团队2"
          }
        ]
      },
      {
        value: "企业1",
        label: "企业1",
        children: [
          {
            value: "团队1",
            label: "团队1"
          },
          {
            value: "团队2",
            label: "团队2"
          }
        ]
      }
    ]
  },
  {
    key: "registerYear",
    name: "项目申请年份",
    value: "2015",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "startYear",
    name: "项目开始年份",
    value: "2016",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "finishYear",
    name: "项目截止时间",
    value: "",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "projectPerson",
    name: "项目负责人",
    value: "林海瑞",
    type: INPUT,
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
      isAdd: false,
      addUserId: '',
      teamId: '',
      baseInfo: DISPLAY_INFO,
      regFile: [
        {
          fileName: "无材料",
          filePath: null,
          fileType: 1,
          projectId: "1231",
          state: false
        }
      ],
      finishFile: [
        {
          fileName: "无材料",
          filePath: null,
          fileType: 2,
          projectId: "1231",
          state: false
        }
      ],
      teacher: {
        userId: 123456789,
        name: "石兴民",
        userPhone: 123456789
      },
      leader: {
        userId: 2015210405043,
        name: "林海瑞",
        userPhone: 123456789
      },
      fileData: {
        projectId: "",
        type: ""
      },
      members: []
    };
  },
  components: {
    InfoDisplayTemp
  },
  async created() {
    axios
      .post("/api/auth/edit/projectInfo", { projectId: this.$route.params.id })
      .then(res => {
        console.log(res);
        this.$store.commit("addAuthToken", res.data.authToken);
        this.initData();
      })
      .catch(err => {
        this.$store.commit('clearAuth')
      });
  },
  methods: {
    initData() {
      const projectId = this.$route.params.id;
      Promise.all([
        axios.post("/api/project/project", {
          projectId: projectId
        }),
        axios.get("/api/category/project/levels"),
        axios.get("/api/category/project/categories"),
        axios.get("api/dependent/choices")
      ])
        .then(res => {
          // 项目基本信息
          this.baseInfo.forEach(item => {
            item.value = res[0].data.project[item.key];
          });
          if (res[0].data.regFile != undefined) {
            this.regFile = [];
            for (let i = 0; i < res[0].data.regFile.length; i++) {
              this.regFile.push({
                state: true,
                name: res[0].data.regFile[i].fileName,
                filePath: res[0].data.regFile[i].filePath
              });
            }
          }
          if (res[0].data.finishFile != undefined) {
            this.finishFile = [];
            for (let i = 0; i < res[0].data.finishFile.length; i++) {
              this.finishFile.push({
                state: true,
                name: res[0].data.finishFile[i].fileName,
                filePath: res[0].data.finishFile[i].filePath
              });
            }
          }
          this.teacher = res[0].data.teacher;
          this.leader = res[0].data.leader;
          this.members = res[0].data.members;
          this.teamId = res[0].data.project.teamId;

          // 项目级别
          const levels = res[1].data.data.map(item => {
            return {
              label: item.level_name,
              value: item.level_name
            };
          });
          // 项目类别
          const categories = res[2].data.data.map(item => {
            return {
              label: item.identity_name,
              value: item.identity_name
            };
          });

          this.baseInfo.forEach(item => {
            if (item.key == "projectIdentity") {
              item.options = categories;
            }
            if (item.key == "projectLevel") {
              item.options = levels;
            }
          });
          // 构建级联选择器
          let options = [];
          let selectors = res[3].data.data;
          for (let i = 0; i < selectors.length; i++) {
            let selector = selectors[i];
            let option = {
              label: selector.unitName,
              value: selector.unitId
            };
            let teams = [];
            for (let i = 0; i < selector.teams.length; i++) {
              let team = selector.teams[i];
              let _team = {
                label: team.teamName,
                value: team.teamId
              };
              teams.push(_team);
            }
            if (teams.length > 0) {
              option.children = teams;
            }
            options.push(option);
          }
          this.baseInfo.forEach(item => {
            if (item.key == "projectDep") {
              // 构造当前值
              let teamName = item.value;
              for (let i = 0; i < options.length; i++) {
                let unit = options[i];
                for (let i = 0; i < unit.children.length; i++) {
                  let team = unit.children[i];
                  if (team.label == item.value) {
                    item.value = [unit.value, team.value];
                  }
                }
                if (item.value instanceof Array > 0) {
                  break;
                }
              }
              item.value = item.value instanceof Array ? item.value : [];
              item.options = options;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadRegFile() {
      this.fileData.projectId = this.$route.params.id;
      this.fileData.type = 1;
      this.$refs.regUpload.submit();
    },
    uploadFinishFile() {
      this.fileData.projectId = this.$route.params.id;
      this.fileData.type = 2;
      this.$refs.finishUpload.submit();
    },
    deleteAllRegFiles() {
      axios
        .post("/api/project/delete/files", {
          files: this.regFile
        })
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            this.regFile = [];
          }
        });
    },
    deleteAllFinishFiles() {
      axios
        .post("/api/project/delete/files", {
          files: this.finishFile
        })
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            this.finishFile = [];
          }
        });
    },
    handleRemove(file, fileList) {
    },
    handleChange(file, fileList) {
    },
    regUploadSuccess(file) {
      axios
        .post("/api/project/project", {
          projectId: projectId
        })
        .then(res => {
          if (res.data.regFile != undefined) {
            this.regFile = [];
            for (let i = 0; i < res.data.regFile.length; i++) {
              this.regFile.push({
                state: true,
                name: res.data.regFile[i].fileName,
                filePath: res.data.regFile[i].filePath
              });
            }
          }
        });
    },
    finishUploadSuccess(response, file, fileList) {
      const projectId = this.$route.params.id;
      axios
        .post("/api/project/project", {
          projectId: projectId
        })
        .then(res => {
          if (res.data.finishFile != undefined) {
            this.finishFile = [];
            for (let i = 0; i < res.data.finishFile.length; i++) {
              this.finishFile.push({
                state: true,
                name: res.data.finishFile[i].fileName,
                filePath: res.data.finishFile[i].filePath
              });
            }
          }
        });
    },
    handlePreview(file) {
      console.log(file);
    },
    fileOnProgress(event, file, fileList) {
      // console.log(event);
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    confirmChange() {
      let info = utils.displayInfo2MySql(
        utils.filterName.PROJECT,
        this.baseInfo
      );
      info.team_id = info.team_id.pop();
      // 判断指导老师
      if (info.project_teacher === this.teacher.name) {
        delete info.project_teacher;
      }
      // 判断负责人
      if (info.project_principal === this.leader.name) {
        delete info.project_principal;
      }
      // 判断申请时间
      let time = ["finish_year", "register_year", "start_year"];
      time.forEach(key => {
        if (key in info) {
          info[key] = new Date(info[key]).toLocaleDateString();
        }
      });
      axios
        .post("/api/project/change/project", {
          project: info
        })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(new Date(this.baseInfo[8].value).toLocaleDateString());
    },
    confirmAdd() {
      console.log(this.addUserId)
      let addTime = new Date()
      addTime = `${addTime.getFullYear()}-${addTime.getMonth() + 1}-${addTime.getDate()}`
      console.log(addTime)
      axios.post('/api/project/add/project/user', {
        user: {
          project_id: this.$route.params.id,
          user_id: this.addUserId,
          add_time: addTime,
          teamId: this.teamId
        }
      })
      .then(res => {
        console.log(res)
        this.isAdd = false
      })
      .catch(err => {
        console.log(err)
        this.isAdd = false
      })
    },
    cancelAdd() {
      console.log('cancel')
      this.addUserId=''
      this.isAdd = false
    },
    deleteMember(member) {
      console.log(member.userId)
      axios.post('/api/project/del/project/user', {
        user: {
          projectId: this.$route.params.id,
          userId: member.userId,
          del: true,
          teamId: this.teamId
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
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
