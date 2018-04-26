<!--文件与制度查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">报名信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe64f;</i>
        报名信息管理&nbsp; >&nbsp;报名信息查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="confirmChange">确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64f;</i>
          报名信息
        </span>
      <el-row :gutter="200" class="info-content">
        <el-col :span="8" class="info-item">
          <span class="item-name">招募信息标题</span>
          <div class="item-content">
            <el-input disabled v-model="title"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">报名者</span>
          <div class="item-content">
            <el-input disabled v-model="userId"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">截止时间</span>
          <div class="item-content">
            <el-input disabled v-model="endTime"></el-input>
          </div>
        </el-col>
      </el-row>
			<el-row :gutter="200" class="info-content">
        <el-col :span="8" class="info-item">
          <span class="item-name">报名时间</span>
          <div class="item-content">
            <el-input disabled v-model="signUpTime"></el-input>
          </div>
        </el-col>
				<el-col :span="8" class="info-item">
          <span class="item-name">状态</span>
          <div class="item-content">
            <el-input disabled v-model="state"></el-input>
          </div>
        </el-col>
      </el-row>
      <span>报名简介</span>
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
              action="/api/upload/signup"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="files"
              :data='uploadData'
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <el-button style="margin-left: 10px;" size="small" type="danger" @click="deleteAll">删除全部</el-button>
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
			recruitmentId: '',
			userId: '',
			title: '',
			endTime: '',
			signUpTime: '',
      signUpInfo: {
        info: ""
      },
			files: [],
			uploadData: {}
    };
  },
  mounted() {
		this.editor = new E("#editor-ele");
    this.editor.customConfig.onchange = html => {
      this.signUpInfo.info = html
    }
    this.editor.create();
    this.initData();
  },
  components: {
    InfoDisplayTemp
  },
  methods: {
    initData() {
			const signUpId = this.$route.params.id;
			console.log(signUpId)
      axios.post("/api/st/recruitment/signup", {
          id: signUpId
        })
        .then(res => {
					res = res.data;
					console.log(res)
          if (res.code == 200) {
						this.userId = res.data.userId
						this.endTime = res.data.endTime
						this.signUpTime = res.data.signUpTime
						this.title = res.data.title
						this.state = res.data.state
						this.signUpInfo.info = res.data.introduction
						this.files = res.files
						this.editor.txt.html(`<p>${this.signUpInfo.info}</p>`)
						let today = new Date()
						let endDay = new Date(this.endTime)
						if (today > endDay) {
							this.$message.error("以过截止日期不能修改信息！")
							this.$router.push(`/check/recruitSignUpInfo/${this.$route.params.id}`);
						}
          } else {
            this.$message.error("不存在该报名信息");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
	deleteAll() {
      axios.post("/api/st/recruitment/delete/files", {
          files: this.files
        })
        .then(res => {
          console.log("del", res);
          if (res.status == 200 && res.data.code == 200) {
            this.files = [];
          }
        });
    },
    submitUpload() {
      this.uploadData.id = this.$route.params.id;
      console.log(this.uploadData);
      this.$refs.upload.submit();      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    confirmChange() {
			let today = new Date()
			today = today.toLocaleString().split(' ')[0]
			let info = {
				id: this.$route.params.id,
				sign_up_time: today,
				introduction: this.signUpInfo.info
			}
			axios.post("/api/st/recruitment/change/signup", {
          signup: info
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
