<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter"  :key='key' v-if="value !== ''" class="tag">
        {{keyFormater(key)}}({{valueFormater(key, value, valueLabelMap)}})
      </el-tag>
    </div>
    <el-button class="addInfo" type="success" size="large" @click="enterAdd">添加信息</el-button>
    <el-button class="filter" size="large" @click="enterFilter">筛选信息</el-button>
    <el-button class="exit-filter" size="large" @click="quitFilter">退出筛选</el-button>
    <!--筛选框-->
    <filter-box :dialogVisible="showFilterBox"
                :filter="filter"
                :tmpl="filterTmpl"
                :valueLabelMap="valueLabelMap"
                :keyFormatMap="Object.assign({},keyFormatMap,expandFormatMap)"
                @sendFilter="receiveFilter"></filter-box>
    <info-add :show="showInfoAdd"
              :tmpl="infoAddTmpl"
              :valueLabelMap="valueLabelMap"
              :rules="infoAddRules"
              @sendInfo="receiveInfo"
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
            <el-form-item v-for="(value, key) in expandFormatMap" :key='key' :label="value">
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
      <el-table-column v-for="(value, key) in keyFormatMap"
                       :label="value"
                        :key='key'
                       :prop="key"
                       :resizable="false">
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        min-width="200">
        <template scope="scope">
           <el-button
            size="small"
            class="edit-btn"
            @click="handleSignup(scope.$index, scope.row)">报名
          </el-button>
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
import FilterBox from "@/components/Admin/Manage/FilterBox";
import InfoAdd from "@/components/Admin/Manage/InfoAdd";
import utils from "@/utils/utils";

export default {
  components: { FilterBox, InfoAdd },
  data() {
    var cascaderVal = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择依托单位"));
      } else {
        callback();
      }
    };
    return {
      statusOptions: ["立项申请中", "中期检查中", "结题检查中", "已结题"],
      tableData: [],
      valueLabelMap: {
        projectCategory: [],
        projectLevel: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        projectCategory: "项目类别",
        projectLevel: "项目级别",
        applyYear: "项目申请年份",
        deadlineYear: "项目截至年份",
        status: "状态"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
      },
      infoAddTmpl: {},

      infoAddRules: {},
      //        获取表格数据的地址
      url: "/api/project/pend/all",
      filterTmpl: {
        projectCategory: {
          label: "项目类别",
          inputType: 1 // 0 代表 input
        },
        projectLevel: {
          label: "项目级别",
          inputType: 1
        },
        applyYear: {
          label: "项目申请年份",
          inputType: 3
        },
        deadlineYear: {
          label: "项目截至年份",
          inputType: 3
        }
      },
      filter: {
        //搜索条件
        projectName: "", //项目名称
        projectCategory: "", //项目类别
        projectLevel: "", //项目级别
        dependentUnit: "", //项目依托单位
        applyYear: "", //项目申请年份
        deadlineYear: "" //项目截至年份
      },
      pageSize: 10, //每页大小
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
      if ("team_id" in filter) {
        filter.team_id = filter.team_id.split(",")[1];
      }
      axios
        .post(this.url, {
          filter,
          pageNum,
          pageSize
        })
        .then(res => {
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

    handleSignup(index, row) {
      this.$router.push(`/signup/project/${row.id}`)
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
    // 点击筛选触发的事件
    async enterFilter() {
      if (this.valueLabelMap.projectCategory.length < 1) {
        let res = await this.$store.dispatch("getSelectors");
        console.log(res);
        this.valueLabelMap.projectCategory = res[0];
        this.valueLabelMap.projectLevel = res[1];
        this.filterTmpl.dependentUnit.options = res[2];
        this.infoAddTmpl.dependentUnit.options = res[2];
        this.showFilterBox = true;
      } else {
        this.showFilterBox = true;
      }
    },
    // 接收子组件filterbox传递的筛选条件数据
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
    enterAdd: async function() {
      this.$router.push("/add/pendProjectInfo");
    },
   
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

