<!--政策信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">政策信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe618;</i>
        政策信息管理&nbsp; >&nbsp;政策信息创建
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click='confirmCreate'>确认创建</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          政策基本信息
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
                 action="/api/upload/policy"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :file-list="fileList"
                 :data='uploadData'
                 :auto-upload="false">
                 <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
                 <!-- <el-button style="margin-left: 10px;" size="small" type="danger" @click="deleteAll">删除全部</el-button> -->
                 <div slot="tip" class="el-upload__tip">选择完文件后请手动点击按钮上传</div>
               </el-upload>
            </el-col>
          </el-row>
      <!--<el-button type="primary">添加附件</el-button>-->
    </div>

  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import E from "wangeditor";
import axios from "axios";
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
    key: "policyTitle",
    name: "政策标题",
    value: "",
    type: INPUT,
    span: 1,
    disabled: false
  },
  {
    key: "policyCategory",
    name: "政策类别",
    value: "国家政策",
    type: SELECT,
    span: 1,
    options: [],
    disabled: false
  },
  {
    key: "policyStatus",
    name: "政策状态",
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
    type: DATE_PICKER,
    span: 1,
    disabled: false
  },
  {
    key: "publishPerson",
    name: "发布者",
    value: "",
    type: INPUT,
    span: 1,
    disabled: false
  }
];

export default {
  mounted() {
    this.editor = new E("#editor-ele");
    this.editor.customConfig.onchange = html => {
      this.policyInfo.info = html;
    };

    this.editor.create();
  },
  data() {
    return {
      baseInfo: DISPLAY_INFO,
      policyInfo: {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    confirmCreate() {
      let info = utils.displayInfo2MySql(
        utils.filterName.POLICY,
        this.baseInfo
      );
      if ("publish_time" in info) {
        info.publish_time = new Date(info.publish_time).toLocaleDateString();
      }
      info.policy_introduction = this.policyInfo.info;
      info.state = "可用";
      axios
        .post("/api/policy/add/policy", { policy: info })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data.code == 200) {
            const policyId = res.data.policyId;
            this.uploadData.policyId = policyId;
            console.log(policyId);
            this.$refs.upload.submit();
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
      this.policyInfo.info = html;
    };
    editor.create();
    axios
      .get("/api/category/policy/categories")
      .then(res => {
        let category = res.data;
        let options = [];
        if (category.code == 200) {
          options = category.data.map(c => {
            return {
              label: c.identity_name,
              value: c.identity_name
            };
          });
        }
        console.log(options)
        this.baseInfo.forEach(item => {
          if (item.key == "policyCategory") {
            item.options = options;
          }
        });
      })
      .catch(err => {
        console.log(err)
      });
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
