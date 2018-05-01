<!--获奖基本信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">获奖基本信息修改</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe631;</i>
        获奖管理&nbsp; >&nbsp;获奖基本信息修改
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn">确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          获奖基本信息
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)" :key="rowIndex">
             <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" :key="colIndex" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <info-display-temp @clickBtn="btnFunc(baseInfo[getItemIndex(rowIndex, colIndex)])" :item="baseInfo[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
                <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
              </div>
            </el-col>
          </el-row>
        </span>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          获奖人基本信息
          <el-row :gutter="200" class="info-content" v-for="person in awardPerson" :key="person.userId">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="person.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="person.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <div class="item-content">
                 <el-button>详情查看</el-button>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>


    <!--获奖项目信息-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          获奖项目基本信息展示
          <el-button type="primary" class="project-info-check info-detail-check">详情查看</el-button>
          <el-row :gutter="200" class="info-content">
             <el-col :span="8" class="info-item">
              <span class="item-name">项目名称</span>
              <div class="item-content">
                <el-input disabled v-model="projectInfo.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">项目类别</span>
              <div class="item-content">
                <el-input disabled v-model="projectInfo.category"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">项目级别</span>
              <div class="item-content">
                 <el-input disabled v-model="projectInfo.level"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>
  </div>
</template>

<script>
  import InfoDisplayTemp from 'components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp'

  const INPUT = 1
  const SELECT = 2
  const RADIO = 3
  const SWITCH = 4
  const BUTTON = 5
  const INPUT_AREA = 6
  const DISPLAY_INFO = [
    {
      key: 'awardName',
      name: '获奖名称',
      value: '创新创业大赛',
      type: INPUT,
      span: 1,
      disabled: false
    },
    {
      key: 'awardCategory',
      name: '获奖类别',
      value: '校级',
      type: SELECT,
      span: 1,
      options: [
        {
          value: "国家级",
          label: "国家级"
        },
        {
          value: "省部级",
          label: "省部级"
        }
        ,
        {
          value: "校级",
          label: "校级"
        }
        ,
        {
          value: "院级",
          label: "院级"
        }
      ],
      disabled: false
    },
    {
      key: 'awardLevel',
      name: '获奖级别',
      value: '国家级',
      type: SELECT,
      span: 1,
      options: [
        {
          value: "国家级",
          label: "国家级"
        },
        {
          value: "省部级",
          label: "省部级"
        }
        ,
        {
          value: "校级",
          label: "校级"
        }
        ,
        {
          value: "院级",
          label: "院级"
        }
      ],
      disabled: false
    },
    {
      key: 'awardYear',
      name: '获奖时间',
      value: '2015-10-1',
      type: INPUT,
      span: 1,
      disabled: true
    },
  ]

  export default {
    data () {
      return {
        baseInfo: DISPLAY_INFO,
        awardPerson: [
          {
            userId: 2015210405043,
            name: "林海瑞"
          },
          {
            userId: 2015210405043,
            name: "林海瑞"
          },
          {
            userId: 2015210405043,
            name: "林海瑞"
          },
          {
            userId: 2015210405043,
            name: "林海瑞"
          }
        ],
        projectInfo: {
          name: "创新创业大赛",
          category: "本科生创新能力提升工程项目",
          level: "校级"
        }
      }
    },
    components: {
      InfoDisplayTemp
    },
    methods: {
      getRowCount (arr) {
        return Math.ceil(arr.length / 3)
      },
      getItemIndex (rowIndex, colIndex) {
        return (rowIndex - 1) * 3 + colIndex - 1
      }
    }
  }
</script>

<style scoped>

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
    border-bottom: .3rem solid #cbcbcb;

  }

  .breadcrumb {
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #2A3F54;
    display: inline-block;
  }


  .breadcrumb .iconfont {
    font-size: 1.5rem;
    margin-right: .3rem;
  }

  .info-wrapper {
    padding: 2rem 3rem;
  }

  .info-title {
    font-size: 1rem;
    color: #2A3F54;
    font-weight: bold;
  }

  .iconfont.box {
    font-weight: normal;
    margin-right: .3rem;
  }

  .el-row.info-content {
    margin: 1.5rem 0;
  }

  .el-input {
    background-color: #ffff00;
    font-size: .9rem;
  }

  .info-item {
    display: flex;
    align-items: center;
  }

  .item-name {
    font-size: 1rem;
    width: 5rem;
    margin-right: 1rem;
  }

  .item-content {
    flex: 1;
  }

  .info-detail-check {
    height: 1.8rem;
    padding: .3rem;
    margin-left: 1rem;
  }



</style>
