<!--通知公告信息查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">通知公告管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe6a4;</i>
        通知公告管理&nbsp; >&nbsp;通知公告查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="goForEdit">修改通知公告</el-button>
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
            <el-input disabled v-model="baseInfo[getItemIndex(rowIndex, colIndex)].value"></el-input>
          </div>
        </el-col>
      </el-row>
      <span>发布内容简介</span>
      <el-row :gutter="200" class="info-content">
        <el-col :span="24" class="info-item">
          <div class="item-content">
              <div id="notification-info" v-html="notificationInfo.info"></div>
          </div>
        </el-col>
      </el-row>

      <el-button type="success" size="mini" @click='downloadFile'  v-if="files.length > 0">下载附件</el-button>
      <el-row :gutter="200" class="info-content"  v-if="files.length > 0">
        <el-col :span="24" class="info-item">
          <div class="item-content">
            <div class="attack-link">
              <ul>
                <li v-for="file in files">{{ file.fileName }}</li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
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
        value: "已发布",
        label: "已发布"
      },
      {
        value: "未发布",
        label: "未发布"
      }
    ],
    disabled: false
  },
  {
    key: "publishTime",
    name: "发布时间",
    value: "2015-10-1",
    type: INPUT,
    span: 1,
    disabled: true
  },
  {
    key: "publishUser",
    name: "发布者",
    value: "教务处",
    type: INPUT,
    span: 1,
    disabled: true
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      notificationInfo: {
        info: ""
      },
      files: []
    };
  },
  components: {
    InfoDisplayTemp
  },
  mounted() {
    this.initData();
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
    downloadFile() {
      for (let i = 0; i < this.files.length; i++) {
        console.log(this.files[i]);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src =
          "/api/download?filePath=" +
          this.files[i].filePath +
          "&fileName=" +
          this.files[i].fileName;
        iframe.onload = function() {
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
      }
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    // 进入编辑模式
    goForEdit() {
      this.$router.push(`/edit/notificationInfo/${this.$route.params.id}`);
    }
  }
};
</script>

<style scoped>
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
