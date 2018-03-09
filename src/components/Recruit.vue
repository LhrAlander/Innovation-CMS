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
              <li class="labInfo-li" v-for="item in labInfos">{{item}}</li>
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
        articleInfo: {
          title: '国务院关于关中平原城市群发展规划的批复',
          author: 'tf',
          uploadTime: '2018-01-09',
          content: '陕西、山西、甘肃省人民政府，国家发展改革委、住房城乡建设部：\n' +
          '\n' +
          '国家发展改革委《关于报送关中平原城市群发展规划（送审稿）的请示》（发改规划〔2017〕2033号）收悉。现批复如下：\n' +
          '\n' +
          '一、原则同意《关中平原城市群发展规划》（以下简称《规划》），请认真组织实施。\n' +
          '\n' +
          '二、《规划》实施要全面贯彻党的十九大精神，以习近平新时代中国特色社会主义思想为指导，统筹推进“五位一体”总体布局和协调推进“四个全面”战略布局，坚持以人民为中心的发展思想，牢固树立和贯彻落实新发展理念，以供给侧结构性改革为主线，加快培育发展新动能，拓展发展新空间，以建设具有国际影响力的国家级城市群为目标，以深度融入“一带一路”建设为统领，以创新驱动发展、军民融合发展为动力，以延续中华文脉、体现中国元素的风貌塑造为特色，加快高端要素和现代产业集聚发展，提升人口和经济集聚水平，打造内陆改革开放新高地，充分发挥关中平原城市群对西北地区发展的核心引领作用和我国向西开放的战略支撑作用。\n' +
          '\n' +
          '三、陕西、山西、甘肃省人民政府要切实加强组织领导，健全协作机制，明确责任分工，制定实施方案，做好与相关专项规划的衔接，确保各项目标任务落到实处。《规划》实施中涉及的重大事项、重大政策和重大项目按规定程序报批。\n' +
          '\n' +
          '四、国务院有关部门要按照职能分工，研究制定支持关中平原城市群发展的具体政策措施，在有关规划编制、体制创新、重大项目建设、优化行政区划设置等方面给予积极支持。国家发展改革委、住房城乡建设部要做好协调指导，加强对《规划》实施情况的跟踪分析，适时组织开展《规划》实施情况督查评估，研究新情况，总结新经验，解决新问题。重大问题及时向国务院报告。',
          linkURL: '/',
        },
        labInfos: [
          'aaaaaaaaaaaaaa',
          'bbbbbbbbbbbbbb',
          'cccccccccccccc',
        ]
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
