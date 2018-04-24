<template>
  <div>
    <my-header></my-header>
    <div class="container">
      <el-row>
        <el-col :span="18">
          <div>
            <el-row style="margin-top: 20px;">
              <el-col :span="24">
                <span>招募信息- 内容</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="1">
                <div class="article">
                  <span style=""  class="title">{{articleInfo.title}}</span>
                  <div style="text-align: center; line-height: 1.5;">
                    <span style="margin-right: 30px;">作者: {{articleInfo.author}}</span>
                    <span>上传时间: {{articleInfo.uploadTime}}</span>
                  </div>
                  <div>{{articleInfo.content}}</div>
                  <p style="margin-top: 20px;">{{articleInfo.author}}</p>
                  <p style="margin-top: 20px;">{{articleInfo.uploadTime}}</p>
                  <div style="text-align: right;">
                    <span style="" @click="downloadAttachment" class="download">下载附件</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="labInfo">
            <div class="labInfo-head">
              <div class="iconfont-wrap"><i class="iconfont">&#xe679;</i></div>
              <span>实验室信息</span>
            </div>
            <ul class="labInfo-ul">
              <li class="labInfo-li" v-for="item in labInfos" :key="item">{{item}}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <my-footer></my-footer>
  </div>

</template>
<script>
  import MyHeader from 'components/MyHeader'
  import MyFooter from 'components/MyFooter'
  export default {
    components: {
      MyHeader,
      MyFooter,
    },
    data() {
      return {
        articleInfo: {},
        labInfos: []
      }
    },
    methods: {
      downloadAttachment() {
        // TODO
        console.log('下载')
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
    margin-bottom: 80px;
  }
  .article {
    margin-top: 40px;
    padding: 10px 30px 30px 30px;
    border: 1px solid #666666;
  }
  .article p,
  .article span {
    line-height: 1.5;
  }
  .article .title {
    text-align: center;
    display: block;
    font-size: 20px;
    color: #4586FF;
    font-weight: bold;

  }
  .article .download {
    color: #4586FF;
  }
  .article .download:hover {
    cursor: pointer;
  }

  .labInfo {
    /*background-color: #e4e4e4;*/

    padding-top: 20px;
  }
  .labInfo .iconfont-wrap {
    display: inline-block;
    background-color: #5b9bd5;
    padding: 15px;
    padding-bottom: 10px;
  }
  .labInfo .labInfo-head {
    vertical-align: middle;
    padding-bottom: 10px;
    border-bottom: 2px solid #5b9bd5;
  }
  .labInfo .labInfo-head .iconfont {
    font-size: 40px;
    color: #ffffff;
  }
  .labInfo .labInfo-ul {
    background-color: #e4e4e4;
    padding: 20px 0 20px 30px;
    line-height: 1.4;
    height: 100%;
  }
  .labInfo .labInfo-li {
    list-style: none;
    color: #666666;
    font-weight: 300;
    cursor: pointer;
  }
  .labInfo .labInfo-li:hover {
    text-decoration: underline;
  }
</style>
