<!--基本用户信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">依托单位基本信息修改</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont">&#xe9e3;</i>
        依托单位管理&nbsp; >&nbsp;依托单位基本信息管理
      </div>
      <div class="btn-wrapper">
        <el-button type="warning" plain class="modify-mode-btn"  @click='confirmChange'>确认修改</el-button>
      </div>
    </div>

    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          依托单位基本信息
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
          <i class="iconfont box">&#xe603;</i>
          依托单位负责人基本信息展示
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


    <!--展示属于该依托单位的所有团队-->
    <div class="info-wrapper">
        <span class="info-title">
          <i class="iconfont box">&#xe62c;</i>
          依托单位下团队信息
          <el-row :gutter="200" class="info-content" v-for="teamRow in teamInfo" :key="temRow">
             <el-col :span="12" class="info-item" v-for="team in teamRow" :key="team">
              <span class="item-name">团队名称</span>
              <div class="item-content">
                <el-input disabled v-model="team.name"></el-input>
              </div>
               <el-button type="primary" class="teacher-info-check info-detail-check">详情查看</el-button>
            </el-col>
          </el-row>
        </span>
    </div>




  </div>
</template>

<script>
import InfoDisplayTemp from "components/Admin/InfoOperate/BaseCompent/InfoDisplayTemp";
import axios from "@/utils/https";
import utils from "@/utils/utils"

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;
const INPUT_AREA = 6;
const DISPLAY_INFO = [
  {
    key: "unitName",
    name: "单位",
    value: "单位名称",
    type: INPUT,
    span: 1,
    disabled: false
  },
  {
    key: "unitType",
    name: "单位类别",
    value: "实验室",
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
    key: "unitPerson",
    name: "单位负责人",
    value: "石兴民",
    type: INPUT,
    span: 1,
    disabled: false
  },
  {
    key: "unitAddress",
    name: "单位地址",
    value: "xxx",
    type: INPUT,
    span: 2,
    disabled: false
  },
  {
    key: "unitPhone",
    name: "单位电话",
    value: "123456",
    type: INPUT,
    span: 1,
    disabled: false
  }
];

export default {
  data() {
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
      teamInfo: [
        [
          {
            name: "team1"
          },
          {
            name: "team2"
          }
        ],
        [
          {
            name: "team3"
          },
          {
            name: "team4"
          }
        ],
        [
          {
            name: "team5"
          }
        ]
      ]
    };
  },
  components: {
    InfoDisplayTemp
  },
  mounted() {
     axios
      .post("/api/auth/unitInfo", { unitId: this.$route.params.id })
      .then(res => {
        console.log(res);
        this.$store.commit("addAuthToken", res.data.authToken);
        this.initData();
      })
      .catch(err => {
        this.$store.commit("clearAuth");
      });
  },
  methods: {
    initData() {
      const unitId = this.$route.params.id;
      axios
        .post("/api/dependent/dependent", {
          unitId
        })
        .then(res => {
          res = res.data
          this.baseInfo.forEach(item => {
            console.log(item.key)
            item.value = res.data.unit[item.key];
          });
          this.teamInfo = res.data.teams;
          this.leader = res.data.user;
          return axios.get('/api/category/dependent/categories')
        })
        .then(res => {
          let options = res.data.data.map(t => {
            return {
              labl: t.identity_name,
              value: t.identity_name
            }
          })
          this.baseInfo.forEach(item => {
            if (item.key == 'unitType') {
              item.options = options
            }
            if (item.key == 'unitPerson') {
              item.value = this.leader.userId
            }
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmChange() {
      let info = utils.displayInfo2MySql(
        utils.filterName.UNIT,
        this.baseInfo
      );
      info.unit_id = this.$route.params.id;
      axios.post('/api/dependent/change/dependent', {
        dependent: info
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    }
  }
};
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
  width: 5rem;
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
</style>
