<!--文件与制度查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">立项信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        项目信息管理&nbsp; >&nbsp;立项申请
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='createProject'>确认申请</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64f;</i>
          立项信息
        </span>

      <el-row :gutter="200" class="info-content">
        <el-col :span="8" class="info-item">
          <span class="item-name">项目名称</span>
          <div class="item-content">
            <el-input v-model="baseInfo.projectName"></el-input>
          </div>
        </el-col>
				 <el-col :span="8" class="info-item">
          <span class="item-name">项目类别</span>
          <div class="item-content">
            <el-select v-model="baseInfo.projectCategory">
              <el-option v-for="l in levels " :key="l" :label="l" :value="l"/>
            </el-select>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">项目级别</span>
          <div class="item-content">
            <el-select v-model="baseInfo.projectLevel">
              <el-option v-for="l in categories" :key="l" :label="l" :value="l"/>
            </el-select>
          </div>
        </el-col>
      </el-row>

			<el-row :gutter="200" class="info-content">
				<el-col :span="8" class="info-item">
          <span class="item-name">依托单位</span>
          <div class="item-content">
            <el-cascader
            :options="units"
            :show-all-levels = 'false'
            v-model="baseInfo.dependentUnit"
            >
    				</el-cascader>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">申请时间</span>
          <div class="item-content">
            <el-date-picker
              v-model="baseInfo.applyYear"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <span class="item-name">截止时间</span>
          <div class="item-content">
            <el-date-picker
              v-model="baseInfo.deadlineYear"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
				
        
      </el-row>

			<el-row :gutter="200" class="info-content">
				<el-col :span="8" class="info-item">
          <span class="item-name">项目负责人</span>
          <div class="item-content">
            <el-input v-model="baseInfo.student" disabled/>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">指导老师</span>
          <div class="item-content">
            <el-input v-model="baseInfo.teacher" placeholder="请填写指导老师工号"/>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">状态</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo.status"/>
          </div>
        </el-col>
			</el-row>
      
			<!-- 申请材料 -->
			<el-row :gutter="200" class="info-content">
      	<el-col :span="24" class="info-item file-item">
          <span class="item-name">项目申请材料</span>
          <div class="item-content">
						<el-upload
							class="upload-demo"
							ref="regUpload"
							action="/api/upload/project"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-change="handleChange" 
							:on-success="finishUploadSuccess"
							:file-list="regFile"
							:auto-upload="false"
							name="uploadFile"
							:data='fileData'
							:on-progress='fileOnProgress'
						>
							<el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="mini" type="danger" @click='deleteAllFinishFiles'>删除全部</el-button>
						</el-upload>
         </div>
      </el-col>
    </el-row>

		<!-- 中期检查 -->
		<!-- <el-row :gutter="200" class="info-content">
      	<el-col :span="24" class="info-item file-item">
          <span class="item-name">中期检查材料</span>
          <div class="item-content">
						<el-upload
							class="upload-demo"
							ref="finishUpload"
							action="/api/upload/project"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-change="handleChange" 
							:on-success="finishUploadSuccess"
							:file-list="midFile"
							:auto-upload="false"
							name="uploadFile"
							:data='fileData'
							:on-progress='fileOnProgress'
						>
							<el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="mini" type="success" @click="uploadFinishFile">上传到服务器</el-button>
							<el-button style="margin-left: 10px;" size="mini" type="danger" @click='deleteAllFinishFiles'>删除全部</el-button>
						</el-upload>
         </div>
      </el-col>
    </el-row> -->

		<!-- 结题检查 -->
		<!-- <el-row :gutter="200" class="info-content">
      	<el-col :span="24" class="info-item file-item">
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
							<el-button style="margin-left: 10px;" size="mini" type="danger" @click='deleteAllFinishFiles'>删除全部</el-button>
						</el-upload>
         </div>
      </el-col>
    </el-row> -->
      
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
                <el-input disabled v-model="member.username"></el-input>
              </div>
            </el-col>
						<el-col :span="7" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="member.userPhone"></el-input>
              </div>
            </el-col>
            <el-col :span="3" class="info-item">
              <el-button type="danger" @click="deleteMember(member)" v-if="user.userId != member.userId">删除</el-button>
            </el-col>
          </el-row>
        </span>
    </div>

  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import axios from "@/utils/https";
import E from "wangeditor";

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;

export default {
  data() {
    return {
      baseInfo: {
        projectName: "",
        projectCategory: "无",
        projectLevel: "无",
        applyYear: "",
        dependentUnit: ["无"],
        deadlineYear: "",
        status: "立项申请中",
        student: "",
        teacher: ""
      },
      isAdd: false,
      stateOptions: [
        {
          value: "立项申请中",
          label: "立项申请中"
        },
        {
          value: "中期检查中",
          label: "中期检查中"
        },
        {
          value: "结题检查中",
          label: "结题检查中"
        },
        {
          value: "已结题",
          label: "已结题"
        },
        {
          value: "禁用",
          label: "不可用"
        }
      ],
      categories: [],
      levels: [],
      units: [],
      projectInfo: {
        info: ""
      },
      regFile: [],
      fileData: {},
      addUserId: "",
      projectUsers: [],
      members: [],
      user: {}
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    initData() {
      const user = JSON.parse(window.localStorage.getItem("user"));
      this.user = user;
      let id = this.$route.params.id;
      axios
        .post("/api/user/searchUser", {
          userId: user.userId
        })
        .then(res => {
          console.log(res);
          this.members.push({
            userId: user.userId,
            username: res.data.data[0].user_name,
            userPhone: res.data.data[0].user_phone
          });
        })
        .catch(err => {
          console.log(err);
        });
      Promise.all([
        axios.get("/api/category/project/levels"),
        axios.get("/api/category/project/categories"),
        axios.get("api/dependent/choices"),
        axios.post("/api/project/get/pendProject", { id })
      ])
        .then(res => {
          this.files = res[3].data.files;
          this.baseInfo = JSON.parse(JSON.stringify(res[3].data.data));
          this.baseInfo.student = user.username;
          this.baseInfo.status = "立项申请中";

          let categories = res[0].data.data.map(l => {
            return l.level_name;
          });
          let levels = res[1].data.data.map(c => {
            return c.identity_name;
          });
          // 构建级联选择器
          let options = [];
          let selectors = res[2].data.data;
          console.log(selectors);
          let _c = [];
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
              if (team.teamName == this.baseInfo.dependentUnit) {
                _c = [selector.unitId, team.teamId];
              }
            }
            if (teams.length > 0) {
              option.children = teams;
            }
            options.push(option);
          }
          this.levels = levels;
          this.categories = categories;
          this.units = options;
          this.levels.unshift("无");
          this.categories.unshift("无");
          this.units.unshift({
            label: "无",
            value: "无"
          });
          this.baseInfo.dependentUnit = _c;
          let addTime = new Date();
          addTime = `${addTime.getFullYear()}-${addTime.getMonth() +
            1}-${addTime.getDate()}`;
          this.projectUsers.push({
            user_id: user.userId,
            add_time: addTime
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    createProject() {
      let info = {
        project_status: "不可用",
        project_name: this.baseInfo.projectName,
        project_identity: this.baseInfo.projectCategory,
        project_level: this.baseInfo.projectLevel,
        team_id: this.baseInfo.dependentUnit[
          this.baseInfo.dependentUnit.length - 1
        ],
        project_teacher: this.baseInfo.teacher,
        project_principal: this.user.userId,
        register_year: this.baseInfo.applyYear,
        start_year: this.baseInfo.applyYear,
        finish_year: this.baseInfo.deadlineYear,
        pend_status: "立项申请中"
      };
      console.log(info);
      axios
        .post("/api/st/project/create/project", {
          project: info,
          users: this.projectUsers
        })
        .then(res => {
          console.log(res);
          this.fileData.projectId = res.data.projectId
          this.fileData.type = 1;
          this.$refs.regUpload.submit();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAllFinishFiles() {
      this.regFile = [];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadFile() {},
    deleteAllFiles() {
      axios
        .post("/api/project/delete/pendProject/files", {
          files: this.files
        })
        .then(res => {
          console.log("del", res);
          if (res.status == 200 && res.data.code == 200) {
            this.files = [];
          }
        });
    },
    confirmAdd() {
      console.log(this.addUserId);
      let addTime = new Date();
      addTime = `${addTime.getFullYear()}-${addTime.getMonth() +
        1}-${addTime.getDate()}`;
      console.log(addTime);
      this.projectUsers.push({
        user_id: this.addUserId,
        add_time: addTime
      });
      this.isAdd = false;
      axios
        .post("/api/user/searchUser", {
          userId: this.addUserId
        })
        .then(res => {
          console.log(res);
          this.members.push({
            userId: this.addUserId,
            username: res.data.data[0].user_name,
            userPhone: res.data.data[0].user_phone
          });
        })
        .catch(err => {
          console.log(err);
        });
      // axios
      //   .post("/api/project/add/project/user", {
      //     user: {
      //       project_id: this.$route.params.id,
      //       user_id: this.addUserId,
      //       add_time: addTime,
      //       teamId: this.teamId
      //     }
      //   })
    },
    cancelAdd() {
      console.log("cancel");
      this.addUserId = "";
      this.isAdd = false;
    },
    deleteMember(member) {
      for (let i = 0; i < this.members.length; i++) {
        if (member.userId == this.members[i].userId) {
          this.members.splice(i, 1);
        }
        if (member.userId == this.projectUsers[i].user_id) {
          this.projectUsers.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style scoped>
.less-z-index {
  z-index: 1;
}
#notification-info {
  padding: 1rem;
  border: 1px solid #ddd;
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

.attack-link {
  width: 100%;
  height: 5rem;
  border: 1px solid #ddd;
}
</style>
