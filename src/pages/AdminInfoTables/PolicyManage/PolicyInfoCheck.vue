<!--政策信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">政策信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe618;</i>
        政策信息管理&nbsp; >&nbsp;政策信息查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="goForEdit">修改政策信息</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          政策基本信息
        </span>
      <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key="rowIndex">
        <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
          <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo[getItemIndex(rowIndex, colIndex)].value"></el-input>
          </div>
        </el-col>
      </el-row>
      <span>发布内容简介</span>
      <el-row :gutter="200" class="info-content less-z-index">
        <el-col :span="24" class="info-item">
          <div class="item-content">
              <div id="policy-info" v-html="policyInfo.info"></div>
          </div>
        </el-col>
      </el-row>

      <el-button type="success" size="mini" @click='downloadFile'  v-if="files.length > 0">下载附件</el-button>
      <el-row :gutter="200" class="info-content"  v-if="files.length > 0">
        <el-col :span="24" class="info-item">
          <div class="item-content">
            <div class="attack-link">
              <ul v-if="files.length > 0">
                <li v-for="file in files" :key="file.fileName">{{ file.fileName }}</li>
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
    key: "policyIdentity",
    name: "政策类别",
    value: "不存在政策！",
    type: SELECT,
    span: 1,
    options: [
      {
        value: "国家政策",
        label: "国家政策"
      },
      {
        value: "浙江省政策",
        label: "浙江省政策"
      },
      {
        value: "校级政策",
        label: "校级政策"
      },
      {
        value: "院级政策",
        label: "院级政策"
      }
    ],
    disabled: true
  },
  {
    key: "state",
    name: "政策状态",
    value: "不存在政策！",
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
    disabled: true
  },
  {
    key: "publishTime",
    name: "发布时间",
    value: "1900-01-01",
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
  },
  {
    key: "policyTitle",
    name: "政策标题",
    value: "不存在政策！",
    type: INPUT,
    span: 2,
    disabled: true
  }
];

export default {
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      policyInfo: {
        info: '不存在政策！'
      },
      files: []
    };
  },
  components: {
    InfoDisplayTemp
  },
  mounted() {
    this.initData()
  },
  watch: {
    $route() {
      this.initData();
    }
  },
  methods: {
    initData() {
      const policyId = this.$route.params.id
      axios
        .post("/api/policy/policy", {
          policyId: policyId
        })
        .then(res => {
          console.log('res', res);
          res = res.data;
          if (res.code == 200) {
            if (res.file != undefined) {
              this.files = res.file
            }
            let policy = res.policy
            this.baseInfo.forEach(item => {
              item.value = policy[item.key];
            })
            console.log('policy', policy)
            console.log('info', this.baseInfo)
            this.policyInfo.info = policy.policyIntroduction
            console.log('policy info', this.policyInfo)
          } else {
            this.$message.error("不存在该政策！");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 下载附件
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
      this.$router.push("/edit/policyInfo/" + this.$route.params.id);
    }
  }
};
</script>

<style scoped>
#policy-info {
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
  border: 1px solid #ddd;
}
</style>
