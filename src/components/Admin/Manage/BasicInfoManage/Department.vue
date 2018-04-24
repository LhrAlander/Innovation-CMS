<!--院系管理-->
<template>
  <div class="wrapper">
    <el-row gutter="100">
      <!--学院展示-->
      <el-col :span="6" class="display-block department">
        <div class="title-wrapper">
          <span class="title">学院</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>

        <div class="cnt-wrapper">
          <div class="academy-cnt">
            <div class="display-item department-item" v-for="i in 10" :key='i'>
              <span class="item-name department-name">杭州国际服务工程学院</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit">&#xe8af;</i>
                  <i class="iconfont icon-del">&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini">添加</el-button>
          </div>
        </div>

      </el-col>
      <!--系部展示-->
      <el-col :span="6" class="display-block institute">
        <div class="title-wrapper">
          <span class="title">系部</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>

        <div class="cnt-wrapper">
          <div class="department-cnt">
            <div class="display-item department-item" v-for="i in 10" :key='i'>
              <span class="item-name department-name">杭州国际服务工程学院</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit">&#xe8af;</i>
                  <i class="iconfont icon-del">&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini">添加</el-button>
          </div>
        </div>
      </el-col>
      <!--专业展示-->
      <el-col :span="6" class="display-block major">
        <div class="title-wrapper">
          <span class="title">专业</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>

        <div class="cnt-wrapper">
          <div class="major-cnt">
            <div class="display-item department-item" v-for="i in 10" :key='i'>
              <span class="item-name department-name">杭州国际服务工程学院</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit">&#xe8af;</i>
                  <i class="iconfont icon-del">&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini">添加</el-button>
          </div>
        </div>
      </el-col>
      <!--班级展示-->
      <el-col :span="6" class="display-block class">
        <div class="title-wrapper">
          <span class="title">班级</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>

        <div class="cnt-wrapper">
          <div class="class-cnt">
            <div class="display-item department-item" v-for="i in 10" :key='i'>
              <span class="item-name department-name">杭州国际服务工程学院</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit">&#xe8af;</i>
                  <i class="iconfont icon-del">&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini">添加</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


</template>
<script>
  export default {}
</script>
<style scoped>


  .wrapper,
  div.icon-wrapper,
  div.icon-wrapper .icon-cnt {
    position: relative;
  }

  .wrapper {
    padding: 40px 50px;
  }




  .display-block .title-wrapper .title {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .display-block .title-wrapper .arrow {
    font-size: 1.3rem;
    float: right;
    line-height: 1.7rem;
  }


  .display-block .cnt-wrapper {
    padding: 2rem 0 0 .5rem;
  }

  .academy-cnt,
  .department-cnt,
  .major-cnt,
  .class-cnt {
    padding: .5rem;
    border: 1px solid #ccc;
  }

  div.display-item {
    display: flex;
    min-height: 35px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 1rem 0 1rem .5rem;
    border-bottom: 1px solid #ccc;
  }

  div.display-item:hover {
    background-color: #ccc;
  }



  /*设置条目中两个按钮的出现与消失*/
  div.icon-wrapper .icon-cnt {
    left: 100%;
    display: none;
  }

  div.display-item:hover div.icon-wrapper .icon-cnt {
    display: block;
    left: 0;
  }


  /*设置条目中按钮的样式*/
  .icon-edit,
  .icon-del {
    cursor: pointer;
    font-size: 1.8rem;
    border-radius: 5px;
    margin-right: 5px;
  }

  .icon-edit:hover {
    background-color: #67C23A;
  }

  .icon-del:hover {
    background-color: #FA5555;
  }


  .display-item .item-name {
    font-size: 1.2rem;
  }


  .add-btn {
    margin: 1rem;
  }

</style>
