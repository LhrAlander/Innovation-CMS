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
        status: [
          {
            value: "可用",
            label: "可用"
          },
          {
            value: "不可用",
            label: "不可用"
          }
        ],
        background: [],
        degree: [],
        specialty: [],
        gender: [
          {
            value: "男",
            label: "男"
          },
          {
            value: "女",
            label: "女"
          }
        ]
      },

      keyFormatMap: {
        // 格式化标签映射表
        teacherId: "工号",
        name: "姓名",
        phone: "手机号码",
        status: "用户状态"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
        background: "学历",
        degree: "学位",
        specialty: "专业",
        gender: "性别",
        email: "邮箱"
      },
      infoAddTmpl: {
        teacherId: {
          label: "工号",
          inputType: 0 // 0 代表 input
        },
        name: {
          label: "姓名",
          inputType: 0 // 0 代表 input
        }
      },
      infoAddRules: {
        teacherId: [{ required: true, message: "请输入工号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //        获取表格数据的地址
      url: "/api/teacher/teachers",
      filterTmpl: {
        teacherId: {
          label: "工号",
          inputType: 0 // 0 代表 input
        },
        name: {
          label: "姓名",
          inputType: 0 // 0 代表 input
        },
        status: {
          label: "用户状态",
          inputType: 1
        },
        background: {
          label: "学历",
          inputType: 1
        },
        degree: {
          label: "学位",
          inputType: 1
        },
        specialty: {
          label: "专业",
          inputType: 1
        },
        gender: {
          label: "性别",
          inputType: 1
        }
      },
      filter: {
        //搜索条件
        teacherId: "", //工号
        name: "", //姓名
        status: "", //用户状态
        background: "", //学历
        degree: "", //学位
        specialty: "", //专业
        gender: "" //性别
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
      console.log(row);
      this.$router.push(`/check/teacherInfo/${row.teacherId}`);
    },
    //        删除按钮事件
    handleDelete(index, row) {
      let state = row.status == "可用" ? "不可用" : "可用";
      console.log(row);
      axios
        .post("/api/user/delUser", { userId: row.teacherId, state })
        .then(res => {
          console.log(res);
          row.status = state;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //        编辑按钮事件
    handleEdit(index, row) {
      this.$router.push("/edit/teacherInfo/1");
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
      axios
        .get("/api/teacher/selectors")
        .then(res => {
          this.valueLabelMap.background = res.data.background;
          this.valueLabelMap.degree = res.data.degree;
          this.valueLabelMap.specialty = res.data.specialty;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //        点击筛选触发的事件
    enterFilter() {
      if (this.valueLabelMap.background.length < 1) {
        this.initSelectors();
      }
      this.showFilterBox = true;
    },
    //        接收子组件filterbox传递的筛选条件数据
    receiveFilter(filter) {
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
    },
    enterAdd: function() {
      this.showInfoAdd = true;
    },
    receiveInfo: function(data) {
      if (data) {
        const user = {
          user_id: data.teacherId,
          user_name: data.name,
          user_identity: "教师"
        };
        this.$store.dispatch("addUserInfo", {
          that: this,
          user
        });
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

