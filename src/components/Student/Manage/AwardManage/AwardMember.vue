<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter" :key="value" v-if="value !== ''" class="tag" >{{keyFormater(key)}}({{valueFormater(key,value,valueLabelMap)}})</el-tag>
    </div>
    <el-button class="filter" size="large" @click="enterFilter">筛选信息</el-button>
    <el-button class="exit-filter" size="large" @click="quitFilter">退出筛选</el-button>
    <!--筛选框-->
    <filter-box :dialogVisible="showFilterBox"
                :filter="filter"
                :tmpl = "filterTmpl"
                :valueLabelMap = "valueLabelMap"
                :keyFormatMap = "Object.assign({},keyFormatMap,expandFormatMap)"
                @sendFilter="receiveFilter"></filter-box>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      border
      :row-key="getRowKeys"
      style="width: 100%; margin-top: 40px;">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="(value, key) in expandFormatMap" :key="value" :label="value">
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
                       :key="value"
                       :prop = "key"
                       :resizable="false">
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        min-width="150">
        
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
import axios from "utils/https";
import FilterBox from "components/Admin/Manage/FilterBox";
import utils from "@/utils/utils";
export default {
  components: { FilterBox },
  data() {
    return {
      tableData: [],
      valueLabelMap: {
        name: [],
        awardLevel: [],
        awardSecondLevel: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        username: "用户姓名",
        awardName: "获奖名称",
        awardCategory: "获奖类别",
        awardLevel: "获奖级别",
        awardTime: "获奖时间",
        projectName: "获奖项目"
      },
      expandFormatMap: {},
      //        获取表格数据的地址
      url: "/api/st/award/awards",
      filterTmpl: {
        name: {
          label: "获奖名称",
          inputType: 1 // 0 代表 input
        },
        awardLevel: {
          label: "获奖等级",
          inputType: 1 // 0 代表 input
        },
        awardSecondLevel: {
          label: "获奖等级",
          inputType: 1 // 0 代表 input
        },
        projectName: {
          label: "项目名称",
          inputType: 0 // 0 代表 input
        },
      },
      filter: {
        //搜索条件
        name: "", //获奖名称
        awardLevel: "", //获奖等级
        awardSecondLevel: "", //获奖级别
        projectName: "" //项目名称
      },
      pageSize: 10, //每页大小
      currentPage: 1, //当前页
      start: 1, //查询的页码
      totalCount: 30, //返回的记录总数
      showFilterBox: false, // 是否显示筛选框
      tagEmpty: true //标签是否为空
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

    handleMore(index, row) {},
    //        删除按钮事件
    handleDelete(index, row) {
      var array = [];
      array.push(row.id);
      axios.post("", { array: array }, { emulateJson: true }).then(
        function(res) {
          this.loadData(this.filter, this.currentPage, this.pageSize);
        },
        function() {
          console.log("failed");
        }
      );
    },
    //        编辑按钮事件
    handleEdit(index, row) {
      console.log(index, row);
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
    async initSelectors() {
      const res = await this.$store.dispatch("getAwards");
      const teams = await this.$store.dispatch("getSelectors");
      this.valueLabelMap.name = res[0].map(i => {
        return {
          label: i,
          value: i
        };
      });
      this.valueLabelMap.awardLevel = res[2].map(i => {
        return {
          label: i.identity_name,
          value: i.identity_name
        };
      });
      this.valueLabelMap.awardSecondLevel = res[1].map(i => {
        return {
          label: i.level_name,
          value: i.level_name
        };
      });
    },
    //        点击筛选触发的事件
    async enterFilter() {
      if (this.valueLabelMap.name.length < 1) {
        await this.initSelectors();
        this.showFilterBox = true;
      } else {
        this.showFilterBox = true;
      }
    },
    //        接收子组件filterbox传递的筛选条件数据
    receiveFilter(filter) {
      console.log("filter");
      if (filter !== undefined) this.filter = filter;
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

