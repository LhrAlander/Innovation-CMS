<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              学校文件-内容
            </div>
            <div class="file-article">
              <div class="article-title">国务院关于关中平原城市群发展规划的批复</div>
              <el-row class="article-info"  type="flex" justify="center">
                <el-col :span="6" v-model="author">作者:{{author}}</el-col>
                <el-col :span="6" v-model="uploadTime">上传时间：{{uploadTime}}</el-col>
              </el-row>
              <el-row class="article" v-model="article[0]">
                {{article[0]}}
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="6" class="article-form" v-model="article">{{article[1]}}<br>{{article[2]}}</el-col>
                <el-col :span="6" class="article-download">
                  下载附件
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="../../../static/img/policyc.png" class="right-img"/>
              最近文件
            </div>
            <div class="right-bg">
              <div class="item">
                <img src="../../../static/img/policycTime.png">
                <span>{{recentPolicyc[0]}}</span>
                <p>{{recentPolicyc[1]}}</p>
              </div>
               <div class="item">
                <img src="../../../static/img/policycTime.png">
                <span>{{recentPolicyc[0]}}</span>
                <p>{{recentPolicyc[1]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
     </div>
    <my-footer class='footer'></my-footer>
  </main>
</template>
<script>
import MyHeader from "components/MyHeader";
import MyFooter from "components/MyFooter";


export default {
  components: {
    MyHeader,
    MyFooter,
  },
  data() {
    return {
      author: "教务处",
      uploadTime: "2018年1月9号",
      article: ["陕西、山西、甘肃省人民政府，国家发展改革委、住房城乡建设部：国家发展改革委《关于报送关中平原城市群发展规划（送审稿）的请示》（发改规划〔2017〕2033号）收悉。现批复如下：\n一、原则同意《关中平原城市群发展规划》（以下简称《规划》），请认真组织实施。\n二、《规划》实施要全面贯彻党的十九大精神，以习近平新时代中国特色社会主义思想为指导，统筹推进“五位一体”总体布局和协调推进“四个全面”战略布局，坚持以人民为中心的发展思想，牢固树立和贯彻落实新发展理念，以供给侧结构性改革为主线，加快培育发展新动能，拓展发展新空间，以建设具有国际影响力的国家级城市群为目标，以深度融入“一带一路”建设为统领，以创新驱动发展、军民融合发展为动力，以延续中华文脉、体现中国元素的风貌塑造为特色，加快高端要素和现代产业集聚发展，提升人口和经济集聚水平，打造内陆改革开放新高地，充分发挥关中平原城市群对西北地区发展的核心引领作用和我国向西开放的战略支撑作用。\n三、陕西、山西、甘肃省人民政府要切实加强组织领导，健全协作机制，明确责任分工，制定实施方案，做好与相关专项规划的衔接，确保各项目标任务落到实处。《规划》实施中涉及的重大事项、重大政策和重大项目按规定程序报批。\n四、国务院有关部门要按照职能分工，研究制定支持关中平原城市群发展的具体政策措施，在有关规划编制、体制创新、重大项目建设、优化行政区划设置等方面给予积极支持。国家发展改革委、住房城乡建设部要做好协调指导，加强对《规划》实施情况的跟踪分析，适时组织开展《规划》实施情况督查评估，研究新情况，总结新经验，解决新问题。重大问题及时向国务院报告。","国务院","2018年1月9号"],
      recentPolicyc:["2018.3.22","关于做好2017——2018学年第二学期学位课程警示工作的通知"]
   }
    
  },
  mounted() {
    
  },
  methods: {
  
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.top {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #5394C5;
}
.file-article {
  margin-bottom: 100px;
  padding: 0 20px;
  border: 1px solid #cccccc;
  text-align: center;
  font-size: 14px;
}
.article-title {
  height: 60px;
  line-height: 60px;
  color: #5394C5;
  font-size: 18px;
}
.article-info {
  height: 30px;
  line-height: 30px;
  margin-top: -20px;
}
.article {
  line-height: 25px;
  text-align: left;
}
.article-form {
  height: 60px;
  line-height: 30px;
  text-align: left;
}
.article-download {
  height: 60px;
  line-height: 60px;
  color: #5394C5;
}
.right-img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 10px;
}
.right-bg {
  background-color: #f0f0f0;
  margin-top: 20px;
  height: 75%;
}
.item {
  margin: 0 15px;
  border-bottom:1px solid #cccccc;
  color: #cccccc;
  font-size: 13px;
  padding: 20px 0 5px 0;
}
.item img {
  width: 30px;
  height: 30px;
  margin-top: -10px;
  vertical-align: middle;
}
.item p {
  padding-left: 5px;
  height: 50px;
  color: #000000;
  font-size: 14px;
  line-height: 20px;
}
</style>
