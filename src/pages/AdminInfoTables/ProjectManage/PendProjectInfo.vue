<!--文件与制度查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">立项信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        项目信息管理&nbsp; >&nbsp;立项信息修改
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='confirmChange'>确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64f;</i>
          立项信息
        </span>
      <el-row :gutter="200" class="info-content">
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
				 <el-col :span="8" class="info-item">
          <span class="item-name">项目类别</span>
          <div class="item-content">
            <el-select v-model="baseInfo.projectCategory">
              <el-option v-for="l in levels " :key="l" :label="l" :value="l"/>
            </el-select>
          </div>
        </el-col>
      </el-row>
			<el-row :gutter="200" class="info-content">
        
				<el-col :span="8" class="info-item">
          <span class="item-name">项目级别</span>
          <div class="item-content">
            <el-select v-model="baseInfo.projectLevel">
              <el-option v-for="l in categories" :key="l" :label="l" :value="l"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <span class="item-name">状态</span>
          <div class="item-content">
            <el-select v-model="baseInfo.status">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <span>发布内容简介</span>
      <el-row :gutter="200" class="info-content less-z-index">
        <el-col :span="24" class="info-item">
          <div class="item-content">
            <div id="editor-ele"></div>
          </div>
        </el-col>
      </el-row>

      <span>附件</span>
      <el-row :gutter="200" class="info-content">
        <el-col :span="24" class="info-item">
          <div class="item-content">
            <el-upload
              class="upload"
              ref="upload"
              name="uploadFile"
              action="/api/upload/pendProject"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="files"
              :data='uploadData'
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
              <el-button style="margin-left: 10px;" size="mini" type="success" @click="uploadFile">上传到服务器</el-button>
              <el-button style="margin-left: 10px;"   size="mini" type="danger" @click='deleteAllFiles'>删除全部</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
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
        status: "立项申请中"
      },
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
      files: [],
      uploadData: {},
      editor: ""
    };
  },
  mounted() {
    this.editor = new E("#editor-ele");
    this.editor.customConfig.onchange = html => {
      this.projectInfo.info = html;
    };
    this.editor.create();
    this.initData();
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    initData() {
      let id = this.$route.params.id;
      Promise.all([
        axios.get("/api/category/project/levels"),
        axios.get("/api/category/project/categories"),
        axios.get("api/dependent/choices"),
        axios.post("/api/project/get/pendProject", { id })
      ])
        .then(res => {
          this.files = res[3].data.files;
          this.baseInfo = JSON.parse(JSON.stringify(res[3].data.data));
          this.projectInfo.info = this.baseInfo.introduction;
          this.editor.txt.html(`<p>${this.projectInfo.info}</p>`);
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadFile() {
      this.uploadData.id = this.$route.params.id;
      console.log(this.uploadData);
      this.$refs.upload.submit();
    },
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
		confirmChange() {
			let info = JSON.parse(JSON.stringify(this.baseInfo))
      info.dependentUnit = info.dependentUnit.pop()
      info.introduction = this.projectInfo.info
      console.log(info)
      axios
        .post("/api/project/change/pendProject", {
					id: this.$route.params.id,
          info: info
        })
        .then(res => {
          console.log(res);
          this.uploadData.id = res.data.id;
          this.$refs.upload.submit();
          this.$router.push(`/check/pendProjectInfo/${this.$route.params.id}`)
        })
        .catch(err => {
          console.log(err);
        });
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
