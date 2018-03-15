<!--通知公告信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">通知公告管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe6a4;</i>
        通知公告管理&nbsp; >&nbsp;通知公告修改
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="confirmChange">确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe6a4;</i>
          通知公告信息
        </span>
      <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)">
        <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
          <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
          <div class="item-content">
            <info-display-temp @clickBtn="btnFunc(baseInfo[getItemIndex(rowIndex, colIndex)])" :item="baseInfo[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
            <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
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
                 action="/api/upload/notification"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :file-list="files"
                 :data='uploadData'
                 :auto-upload="false">
                 <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
                 <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                 <el-button style="margin-left: 10px;" size="small" type="danger" @click="deleteAll">删除全部</el-button>
                 <div slot="tip" class="el-upload__tip">选择完文件后请手动点击按钮上传</div>
               </el-upload>
            </el-col>
          </el-row>
    </div>

  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import E from "wangeditor";
import axios from '@/utils/https'
import * as utils from "@/utils/utils";

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DATE_PICKER = 7;
const DISPLAY_INFO = [
  {
    key: "notificationTitle",
    name: "标题",
    value: "通知1",
    type: INPUT,
    span: 1,
    disabled: false
  },
  {
    key: "notificationIdentity",
    name: "类别",
    value: "通知",
    type: SELECT,
    span: 1,
    options: [
      {
        value: "通知",
        label: "通知"
      },
      {
        value: "公告",
        label: "公告"
      }
    ],
    disabled: false
  },
  {
    key: "state",
    name: "状态",
    value: "已发布",
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
    key: "publishTime",
    name: "发布时间",
    value: "2015-10-1",
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "publishUser",
    name: "发布者",
    value: "教务处",
    type: INPUT,
    span: 1,
    disabled: false
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      notificationInfo: {
        info: ""
      },
      files: [],
      editor: "",
      uploadData: {}
    };
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    initData() {
      const notificationId = this.$route.params.id;
      axios
        .post("/api/notification/notification", {
          notificationId: notificationId
        })
        .then(res => {
          console.log("res", res);
          res = res.data;
          if (res.code == 200) {
            this.baseInfo.forEach(item => {
              item.value = res.data[item.key];
            });
            this.notificationInfo.info = res.data.notificationIntroduction;
            this.editor.txt.html(`<p>${this.notificationInfo.info}</p>`);
            this.files = res.files || [];
            console.log(this.files);
          } else {
            this.$message.error("不存在该通知公告！");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    submitUpload() {
      this.uploadData.notificationId = this.$route.params.id;
      this.$refs.upload.submit();
    },
    deleteAll() {
      axios
        .post("/api/notification/delete/files", {
          files: this.files
        })
        .then(res => {
          console.log("del", res);
          if (res.status == 200 && res.data.code == 200) {
            this.files = [];
          }
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    confirmChange() {
      let info = utils.displayInfo2MySql(
        utils.filterName.NOTIFICATION,
        this.baseInfo
      );
      if ("publish_time" in info) {
        info.publish_time = new Date(info.publish_time).toLocaleDateString();
      }
      info.notification_introduction = this.notificationInfo.info;
      info.notification_id = this.$route.params.id;
      console.log(info)
      axios
        .post("/api/notification/change/notification", {
          notification: info
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.editor = new E("#editor-ele");
    this.editor.customConfig.onchange = html => {
      this.notificationInfo.info = html;
    };

    this.editor.create();
    this.initData();
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
