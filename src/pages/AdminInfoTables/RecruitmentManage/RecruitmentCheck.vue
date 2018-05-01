<!--文件与制度查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">招募信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        招募信息管理&nbsp; >&nbsp;招募信息查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="goForEdit">修改信息</el-button>
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
            <el-input disabled v-model="baseInfo.title"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">发布者</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo.publishUser"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">发布时间</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo.publishTime"></el-input>
          </div>
        </el-col>
      </el-row>
			<el-row :gutter="200" class="info-content">
        <el-col :span="8" class="info-item">
          <span class="item-name">截止时间</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo.endTime"></el-input>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <span class="item-name">状态</span>
          <div class="item-content">
            <el-input disabled v-model="baseInfo.state"></el-input>
          </div>
        </el-col>
      </el-row>
      <span>发布内容简介</span>
      <el-row :gutter="200" class="info-content">
        <el-col :span="24" class="info-item">
          <div class="item-content">
              <div id="notification-info" v-html="recruitmentInfo.info"></div>
          </div>
        </el-col>
      </el-row>

      <el-button type="success" size="mini" @click='downloadFile'  v-if="files.length > 0">下载附件</el-button>
      <el-row :gutter="200" class="info-content"  v-if="files.length > 0">
        <el-col :span="24" class="info-item">
          <div class="item-content">
            <div class="attack-link">
              <ul>
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

export default {
  data() {
    return {
      baseInfo: {
				title: 'title',
				publishUser: 'publishUser',
				publishTime: '1900-01-01',
        state: '可用',
        endTime: '1900-01-01'
			},
      recruitmentInfo: {
        info: ""
      },
      files: []
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
			const recruitmentId = this.$route.params.id;
			console.log(recruitmentId)
      axios
        .post("/api/recruitment/recruitment", {
          recruitmentId: recruitmentId
        })
        .then(res => {
					res = res.data;
					console.log(res)
          if (res.code == 200) {
						this.recruitmentInfo.info = res.data.introduction
						this.files = res.files
						this.baseInfo.title = res.data.title
						this.baseInfo.publishUser = res.data.publishUser
            this.baseInfo.publishTime = res.data.publishTime
            this.baseInfo.endTime = res.data.endTime
          } else {
            this.$message.error("不存在该招募信息");
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
    downloadFile() {
      for (let i = 0; i < this.files.length; i++) {
        console.log(this.files[i]);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        let src =
          "/api/download?filePath=" +
          escape(this.files[i].filePath) +
          "&fileName=" +
          escape(this.files[i].fileName);
        console.log(src)
        iframe.src = src
        iframe.onload = function() {
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
      }
    },
    // 进入编辑模式
    goForEdit() {
      this.$router.push(`/edit/recruitmentInfo/${this.$route.params.id}`);
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
