<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key,index) in filter" v-if="value !== ''" class="tag" >{{keyFormater(key)}}({{valueFormater(key,value,valueLabelMap)}})</el-tag>
    </div>
    <el-button class="addInfo" type="success" size="large" @click="enterAdd">添加信息</el-button>
    <el-button class="filter" size="large" @click="enterFilter">筛选信息</el-button>
    <el-button class="exit-filter" size="large" @click="quitFilter">退出筛选</el-button>
    <!--筛选框-->
    <filter-box :dialogVisible="showFilterBox"
                :filter="filter"
                :tmpl = "filterTmpl"
                :valueLabelMap = "valueLabelMap"
                :keyFormatMap = "Object.assign({},keyFormatMap,expandFormatMap)"
                @sendFilter="receiveFilter"></filter-box>
    <info-add :show="showInfoAdd"
              :tmpl = "infoAddTmpl"
              :valueLabelMap = "valueLabelMap"
              :rules = "infoAddRules"
              @sendInfo = "receiveInfo"
    ></info-add>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      border
      :row-key="getRowKeys"
      style="width: 100%;">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="(value, key, index) in expandFormatMap" :label="value">
              <span>{{ props.row[key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
        :resizable="false">
      </el-table-column>
      <el-table-column v-for="(value, key, index) in keyFormatMap"
                       :label="value"
                       :prop = "key"
                       :resizable="false">
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        min-width="150">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleMore(scope.$index, scope.row)">更多</el-button>
          <el-button
            size="small"
            class="edit-btn"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">{{ scope.row.status == '可用' ? '禁用' : '启用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "@/utils/https";
import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
import FilterBox from "components/Admin/Manage/FilterBox";
import InfoAdd from "components/Admin/Manage/InfoAdd";
import * as utils from "utils/utils";
export default {
  components: { ElButton, FilterBox, InfoAdd },
  data() {
    return {
      tableData: [],
      valueLabelMap: {
        unitName: [],
        unitCategory: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        unitName: "单位名称",
        unitCategory: "单位类别",
        leader: "负责人",
        leaderPhone: "负责人联系方式",
        status: '状态'
      },
      expandFormatMap: {
        // 格式化额外信息映射表
        leaderId: "负责人用户名(学号)",
        email: "负责人邮箱",
        address: "单位地址"
      },
      infoAddTmpl: {
        unitName: {
          label: "单位名称",
          inputType: 0 // 0 代表 input
        },
        leaderId: {
          label: "负责人用户名(学号)",
          inputType: 0 // 0 代表 input
        },
        unitCategory: {
          label: "单位类别",
          inputType: 1 // 0 代表 input
        }
      },
      infoAddRules: {
        unitName: [
          { required: true, message: "请输入单位名称", trigger: "blur" }
        ],
        unitCategory: [
          { required: true, message: "请输入单位类别", trigger: "blur" }
        ],
        leaderId: [
          {
            required: true,
            message: "请输入负责人用户名(学号)",
            trigger: "blur"
          }
        ]
      },
      //        获取表格数据的地址
      url: "/api/dependent/dependents",
      filterTmpl: {
        unitName: {
          label: "单位名称",
          inputType: 1 // 0 代表 input
        },
        unitCategory: {
          label: "单位类别",
          inputType: 1 // 0 代表 input
        },
        leader: {
          label: "负责人",
          inputType: 0
        },
        leaderId: {
          label: "负责人用户名(学号)",
          inputType: 0 // 0 代表 input
        }
      },
      filter: {
        //搜索条件
        unitName: "", //单位名称
        unitCategory: "", //单位类别
        leader: "", //负责人
        leaderId: "" //负责人用户名(学号)
      },
      pageSize: 15, //每页大小
      currentPage: 1, //当前页
      start: 1, //查询的页码
      totalCount: 30, //返回的记录总数
      showFilterBox: false, // 是否显示筛选框
      tagEmpty: true, //标签是否为空
      showInfoAdd: false // 是否显示信息添加框
    };
  },
  mounted: function() {
    this.loadData(this.filter, this.currentPage, this.pageSize);
  },
  methods: {
    getRowKeys(row) {
      return row.id;
    },
    //        异步加载数据
    loadData(filter, pageNum, pageSize) {
      axios
        .get(this.url, {
          params: {
            param: filter,
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = [];
          this.tableData = res.data.data;
          this.totalCount = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    unique(array) {
      var r = [];
      for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
      }
      return r;
    },

    handleMore(index, row) {
      this.$router.push(`/check/depUnitInfo/${row.unitId}`);
    },
    //        删除按钮事件
    handleDelete(index, row) {
      console.log(row)
      let state = row.status == "可用" ? "不可用" : "可用";
      axios.post('/api/dependent/del/dependent', {unitId: row.unitId, payload: {unit_state: state}})
        .then(res => {
          console.log(res)
          row.status = state
        })
        .catch(err => {
          console.log(err)
        })
    },
    //        编辑按钮事件
    handleEdit(index, row) {
      this.$router.push({ name: "DependentUnitInfoEdit" });
    },
    //        单页大小改变回调事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    //        当前页改变回调事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    initSelectors() {
      axios
        .get("/api/dependent/choices")
        .then(res => {
          this.valueLabelMap.unitName = res.data.data.map(i => {
            return {
              label: i.unitName,
              value: i.unitName
            };
          });
          return axios.get("/api/category/dependent/categories");
        })
        .then(res => {
          this.valueLabelMap.unitCategory = res.data.data.map(i => {
            return {
              value: i.identity_name,
              label: i.identity_name
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //        点击筛选触发的事件
    async enterFilter() {
      if (this.valueLabelMap.unitName.length < 1) {
        await this.initSelectors();
        this.showFilterBox = true;
      } else {
        this.showFilterBox = true;
      }
    },
    //        接收子组件filterbox传递的筛选条件数据
    receiveFilter(filter) {
      if (filter !== undefined) {
        this.filter = filter;
      }
      this.showFilterBox = false;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    //        标签的key格式化器
    keyFormater: function(value) {
      if (!value) return "";
      value = value.toString();
      return Object.assign({}, this.keyFormatMap, this.expandFormatMap)[value];
    },
    resetObject: utils.resetObject,
    valueFormater: utils.valueFormater,
    quitFilter: function() {
      this.filter = this.resetObject(this.filter, this.filterTmpl);
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    async enterAdd() {
        if (this.valueLabelMap.unitName.length < 1) {
        await this.initSelectors();
        this.showInfoAdd = true;
      } else {
        this.showInfoAdd = true;
      }
    },
    receiveInfo: function(data) {
      if (data) {
        const dependent = {
          unit_name: data.unitName,
          unit_identity: data.unitCategory,
          unit_principal: data.leaderId
        }
        axios.post('/api/dependent/add/dependent', {dependent})
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
      this.showInfoAdd = false;
    }
  },
  watch: {
    filter: {
      handler: function(val) {
        this.tagEmpty = true;
        for (let item in val) {
          if (val[item] !== "") {
            this.tagEmpty = false;
            break;
          }
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.wrap {
  position: relative;
  padding: 40px 50px;
}
.addInfo {
  float: right;
  margin-right: 40px;
  margin-bottom: 20px;
}
.filter {
  float: right;
  margin-right: 20px;
  background-color: #9b59b6;
  color: #ecf0f1;
  outline: 0;
  border: 1px solid #9b59b6;
}
.filter:hover {
  opacity: 0.7;
}
.filter:active {
  opacity: 1;
  background-color: #71468b;
}
.exit-filter {
  float: right;
  margin-right: 20px;
  background-color: #f19500;
  color: #ecf0f1;
  outline: 0;
  border: 1px solid #f19500;
}
.exit-filter:hover {
  opacity: 0.7;
}
.exit-filter:active {
  opacity: 1;
  background-color: #c77800;
}
.pagination {
  float: right;
  margin-top: 20px;
}
.edit-btn {
  background-color: #5cb85c;
  color: #ecf0f1;
  outline: 0;
  border: 1px solid #5cb85c;
}
.edit-btn:hover {
  opacity: 0.7;
}
.edit-btn:active {
  opacity: 1;
  background-color: #4e9b4e;
}

.tagBlock {
  display: inline-block;
  margin-top: 10px;
  margin-left: 20%;
}
.tag {
  margin: 5px;
}
</style>

