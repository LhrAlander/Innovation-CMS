<template>
  <main>
    <div class="wrapper">
      <my-header></my-header>
      <div class="container">
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <div class="top">
              团队展示-内容
              <p v-model="teamTitle">{{teamTitle}}</p>
            </div>
            <div class="team-msg" v-model="teamIntroduction">
              {{teamIntroduction}}
            </div>
            <div class="team-table">
              <table border="1" cellspacing="0">
                <tr>
                  <td>团队名称</td>
                  <td>XXXXXXX</td>
                </tr>
                <tr>
                  <td>团队成员</td>
                  <td>林海瑞，滕飞，杨贺晨吉,吴佳思，余煜淇</td>
                </tr>
                <tr>
                  <td>指导老师</td>
                  <td>石兴民   18606525602</td>
                </tr>
                <tr>
                  <td>负责人</td>
                  <td>林海瑞  13588737694</td>
                </tr>
                <tr>
                  <td>团队名称</td>
                  <td>XXXXXXX</td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="top">
              <img src="../../../static/img/policyc.png" class="right-img"/>
              最近团队
            </div>
            <div class="right-bg">
              <div class="item">
                <img src="../../../static/img/right-icon.png"/>
                <span>Lorem ipsum dolor sit amet</span>
              </div>
              <div class="item">
                <img src="../../../static/img/right-icon.png"/>
                <span>Lorem ipsum dolor sit amet</span>
              </div>
              <div class="item">
                <img src="../../../static/img/right-icon.png"/>
                <span>Lorem ipsum dolor sit amet</span>
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
      teamTitle: "标题标题标题标题标题",
      teamIntroduction: "（团队简介）Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. ",
    
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
  font-size: 14px;
}
.top {
  margin-top: 15px;
  border-bottom: 1px solid #5394C5;
}
.top p{
  margin-top: 15px;
  padding-bottom: 10px;
  font-size: 18px;
}
.team-msg {
  min-height: 200px;
  margin-top: 20px;
  text-align: left;
  line-height: 20px;
}
.team-table {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 100px;
}
.team-table table{
  width: 600px;
}
.team-table table td{ 
  width: 50%;
  height: 40px;
  text-align: center;
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
  padding-top: 20px;
  margin-top: 20px;
  height: 75%;
}
.item {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 0 10px 20px;
  text-align: left;
}
.item img{
  width: 20px;
  height: 20px;
  padding-right: 5px;
}

</style>
