<!--文件与制度查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">招募信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        招募信息管理&nbsp; >&nbsp;招募信息创建
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='confirmCreate'>确认创建</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64f;</i>
          招募信息
        </span>
      <el-row :gutter="200" class="info-content">
        <el-col :span="8" class="info-item">
          <span class="item-name">标题</span>
          <div class="item-content">
            <el-input v-model="baseInfo.title"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">发布者</span>
          <div class="item-content">
            <el-input v-model="baseInfo.publishUser"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">发布时间</span>
          <div class="item-content">
            <el-date-picker
              v-model="baseInfo.publishTime"
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
          <span class="item-name">截止时间</span>
          <div class="item-content">
            <el-date-picker
              v-model="baseInfo.endTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <span class="item-name">状态</span>
          <div class="item-content">
            <el-select v-model="baseInfo.state">
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
              action="/api/upload/recruitment"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="files"
              :data='uploadData'
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
             <div slot="tip" class="el-upload__tip">选择完文件后请手动点击按钮上传</div>
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
        title: "",
        publishUser: "",
        publishTime: "",
        endTime: "",
        state: "可用"
      },
      stateOptions: [
        {
          value: "可用",
          label: "已发布"
        },
        {
          value: "不可用",
          label: "未发布"
        }
      ],
      recruitmentInfo: {
        info: ""
      },
      files: [],
      uploadData: {},
      editor: "",
    };
  },
  mounted() {
    this.editor = new E("#editor-ele");
    this.editor.customConfig.onchange = html => {
      this.recruitmentInfo.info = html
    }
    this.editor.create();
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    confirmCreate() {
      let info = {
        publish_user: this.baseInfo.publishUser,
        publish_time: this.baseInfo.publishTime,
        title: this.baseInfo.title,
        introduction: this.recruitmentInfo.info,
        state: this.baseInfo.state
      }
      axios.post("/api/recruitment/add/recruitment", {
          recruitment: info
        })
        .then(res => {
          console.log(res)
          this.uploadData.id = res.data.id
          this.$refs.upload.submit(); 
        })
        .catch(err => {
          console.log(err)
        })
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
