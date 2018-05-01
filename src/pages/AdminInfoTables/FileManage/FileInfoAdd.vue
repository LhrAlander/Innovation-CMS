<!--文件与制度创建模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">文件与制度管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        文件与制度管理&nbsp; >&nbsp;文件与制度创建
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='confirmCreate'>确认创建</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64f;</i>
          文件与制度创建
        </span>
      <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key="rowIndex">
        <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
          <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
          <div class="item-content">
            <info-display-temp @clickBtn="btnFunc(baseInfo[getItemIndex(rowIndex, colIndex)])" :item="baseInfo[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
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
          <el-upload
            class="upload"
            ref="upload"
            name="uploadFile"
            action="/api/upload/fileSystem"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :data='uploadData'
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
            <div slot="tip" class="el-upload__tip">点击确认创建按钮后自动上传</div>
          </el-upload>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import E from "wangeditor";
import axios from "@/utils/https";
import utils from "@/utils/utils"

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DATE_PICKER = 7;
const DISPLAY_INFO = [
  {
    key: "title",
    name: "标题",
    value: "",
    type: INPUT,
    span: 1,
    disabled: false
  },
  {
    key: "file_type",
    name: "类别",
    value: "文件",
    type: SELECT,
    span: 1,
    options: [
      {
        value: "文件",
        label: "文件"
      },
      {
        value: "制度",
        label: "制度"
      }
    ],
    disabled: false
  },
  {
    key: "state",
    name: "状态",
    value: "可用",
    type: SELECT,
    span: 1,
    options: [
      {
        value: "可用",
        label: "已发布"
      },
      {
        value: "不可用",
        label: "未发布"
      }
    ],
    disabled: false
  },
  {
    key: "publish_time",
    name: "发布时间",
    value: "2015-10-1",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "effective_time",
    name: "生效时间",
    value: "2017-10-1",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "publish_user",
    name: "发布者",
    value: "",
    type: INPUT,
    span: 1,
    disabled: false
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      fileInfo: {
        info: ""
      },
      fileList: [],
      editor: "",
      uploadData: {}
    };
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    confirmCreate() {
      let info = {}
      this.baseInfo.forEach(i => {
        info[i.key] = i.value
      })
      info.introduction = this.fileInfo.info;
      console.log(info)
      axios
        .post("/api/fileSystem/add/fileSystem", {info })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data.code == 200) {
            const fileSystemId = res.data.fileSystemId;
            this.uploadData.fileSystemId = fileSystemId;
            console.log(fileSystemId);
            this.$refs.upload.submit();
            this.$router.push('/admin/FileAndSystem')
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let editor = new E("#editor-ele");
    editor.customConfig.onchange = html => {
      this.fileInfo.info = html;
    };
    editor.create();
  }
};
</script>

<style scoped>
.less-z-index {
  z-index: 1;
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
