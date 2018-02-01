<!--基本用户信息查看模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">团队基本信息管理</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe61e;</i>
        团队管理&nbsp; >&nbsp;团队基本信息查看
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn" @click="goForEdit">修改信息</el-button>
      </div>
    </div>


    <!--展示该团队的基本信息-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          团队基本信息
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(baseInfo)">
             <el-col :span="baseInfo[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" v-if="baseInfo[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ baseInfo[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <el-input disabled v-model="baseInfo[getItemIndex(rowIndex, colIndex)].value"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>

    <!--展示该团队的负责人-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe621;</i>
          团队负责人基本信息展示
          <el-button type="primary" class="leader-info-check info-detail-check">详情查看</el-button>
          <el-row :gutter="200" class="info-content">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="leader.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="leader.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="leader.userPhone"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>

    <!--展示该团队的指导老师-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe64b;</i>
          团队指导老师基本信息展示
          <el-button type="primary" class="teacher-info-check info-detail-check">详情查看</el-button>
          <el-row :gutter="200" class="info-content">
             <el-col :span="8" class="info-item">
              <span class="item-name">用户名</span>
              <div class="item-content">
                <el-input disabled v-model="teacher.userId"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">姓名</span>
              <div class="item-content">
                <el-input disabled v-model="teacher.name"></el-input>
              </div>
            </el-col>
            <el-col :span="8" class="info-item">
              <span class="item-name">手机号</span>
              <div class="item-content">
                 <el-input disabled v-model="teacher.userPhone"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>


    <!--展示属于该团队的所有项目-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          团队下项目信息
          <el-row :gutter="200" class="info-content" v-for="proRow in proInfo">
             <el-col :span="12" class="info-item" v-for="pro in proRow">
              <span class="item-name">项目名称</span>
              <div class="item-content">
                <el-input disabled v-model="pro.name"></el-input>
              </div>
               <el-button type="primary" class="teacher-info-check info-detail-check">详情查看</el-button>
            </el-col>
          </el-row>
        </span>
    </div>


  </div>
</template>

<script>
  import InfoDisplayTemp from 'components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp'
  import axios from 'axios'

  const INPUT = 1
  const SELECT = 2
  const RADIO = 3
  const SWITCH = 4
  const BUTTON = 5
  const INPUT_AREA = 6
  const DISPLAY_INFO = [
    {
      key: 'teamName',
      name: '团队名称',
      value: '12345',
      type: INPUT,
      span: 1,
      disabled: true
    },
    {
      key: 'teamLeader',
      name: '团队负责人',
      value: '林海瑞',
      type: SELECT,
      options: [
        {
          value: "林海瑞",
          label: "林海瑞"
        },
        {
          value: "滕飞",
          label: "滕飞"
        }
      ],
      span: 1
    },
    {
      key: 'supportOrg',
      name: '依托单位',
      value: '实验室',
      type: SELECT,
      options: [
        {
          value: "实验室",
          label: "实验室"
        },
        {
          value: "企业1",
          label: "企业1"
        }
      ],
      span: 1
    },
    {
      key: 'teamTeacher',
      name: '指导老师',
      value: '石兴民',
      type: INPUT,
      span: 1
    },
    {
      key: 'leaderMajor',
      name: '负责人专业',
      value: '软件工程',
      type: INPUT,
      span: 1
    },
    {
      key: 'leaderClass',
      name: '负责人班级',
      value: '152',
      type: INPUT,
      span: 1
    },
    {
      key: 'teamInfo',
      name: '团队简介',
      value: '简介',
      type: INPUT_AREA,
      span: 3
    },
  ]

  export default {
    data () {
      return {
        baseInfo: DISPLAY_INFO,
        leader: {
          userId: 2015210405043,
          name: "林海瑞",
          userPhone: 123456789
        },
        teacher: {
          userId: 123456789,
          name: "石兴民",
          userPhone: 123456789
        },
        proInfo: [
          [
            {
              name: "pro1"
            },
            {
              name: "pro2"
            }
          ],
          [
            {
              name: "pro3"
            },
            {
              name: "pro4"
            }
          ],
          [
            {
              name: "pro5"
            }
          ],
        ]
      }
    },
    mounted () {
      axios.post('/api/team/team', {
        teamId: 123
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
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
      },
      // 进入编辑模式
      goForEdit () {
        this.$router.push('/edit/TeamInfo/1')
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
