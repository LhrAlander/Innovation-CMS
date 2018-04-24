<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter" :key='key' v-if="value !== ''" class="tag" >{{keyFormater(key)}}({{valueFormater(key,value,valueLabelMap)}})</el-tag>
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
                @sendFilter="receiveFilter"
                @inputChange='inputChange'
                @handleClear='inputClear'></filter-box>
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
import FilterBox from "components/Admin/Manage/FilterBox";
import InfoAdd from "components/Admin/Manage/InfoAdd";
import * as utils from "utils/utils";
export default {
  components: { FilterBox, InfoAdd },
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
        institute: [],
        specialty: [],
        class: [],
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
        studentId: "用户名",
        name: "姓名",
        phone: "手机号码",
        status: "用户状态"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
        institute: "学院",
        specialty: "专业",
        class: "班级",
        gender: "性别",
        email: "邮箱"
      },
      infoAddTmpl: {
        studentId: {
          label: "用户名",
          inputType: 0 // 0 代表 input
        },
        name: {
          label: "姓名",
          inputType: 0 // 0 代表 input
        }
      },
      infoAddRules: {
        studentId: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //        获取表格数据的地址
      url: "/api/student/students",
      filterTmpl: {
        studentId: {
          label: "用户名",
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
        institute: {
          label: "学院",
          inputType: 1
        },
        specialty: {
          label: "专业",
          inputType: 1,
          disabled: true
        },
        class: {
          label: "班级",
          inputType: 1,
          disabled: true
        },
        gender: {
          label: "性别",
          inputType: 1
        }
      },
      filter: {
        //搜索条件
        studentId: "", //用户名
        name: "", //姓名
        status: "", //用户状态
        institute: "", //学院
        specialty: "", //专业
        class: "", //班级
        gender: "" //性别
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
    console.log(this.filter);
    this.loadData(this.filter, this.currentPage, this.pageSize);
  },
  methods: {
    getRowKeys(row) {
      return row.id;
    },
    // 异步加载数据
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
      this.$router.push(`/check/studentInfo/${row.studentId}`);
    },
    // 删除按钮事件
    handleDelete(index, row) {
      let state = row.status == "可用" ? "不可用" : "可用";
      console.log(row);
      axios
        .post("/api/user/delUser", { userId: row.studentId, state })
        .then(res => {
          console.log(res);
          row.status = state;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑按钮事件
    handleEdit(index, row) {
      this.$router.push("/edit/studentInfo/1");
    },
    // 单页大小改变回调事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    // 当前页改变回调事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    initSelectors(url) {
      axios
        .get("/api/baseInfo/academys")
        .then(res => {
          console.log(res);
          this.valueLabelMap.institute = res.data.data.map(i => {
            return {
              label: i.academy,
              value: i.academy
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    inputClear(type) {
      if (type == "学院") {
        console.log(this.filterTmpl.specialty);
        console.log(type == "学院");
        this.filterTmpl.specialty.disabled = true;
        this.filterTmpl.class.disabled = true;
      } else if (type == "专业") {
        console.log(type);
        this.filterTmpl.class.disabled = true;
      }
    },
    async inputChange() {
      const value = arguments[0];
      const type = arguments[1].label;
      console.log(value, type);
      switch (type) {
        case "学院":
          axios
            .post("/api/baseInfo/majors", { academy: value })
            .then(res => {
              if (res.data.code == 200) {
                this.valueLabelMap.specialty = res.data.data.map(i => {
                  return {
                    label: i.major,
                    value: i.major
                  };
                });
                this.filterTmpl.specialty.disabled = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case "专业":
          axios
            .post("/api/baseInfo/classes", { major: value })
            .then(res => {
              if (res.data.code == 200) {
                console.log(res);
                this.valueLabelMap.class = res.data.data.map(i => {
                  return {
                    label: i._class,
                    value: i._class
                  };
                });
                this.filterTmpl.class.disabled = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
          break;
      }
    },
    // 点击筛选触发的事件
    async enterFilter() {
      if (this.valueLabelMap.institute.length < 1) {
        await this.initSelectors();
      }
      this.showFilterBox = true;
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
      utils.filter2Mysql(utils.filterName.STUDENT, this.filter);
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    enterAdd: function() {
      this.showInfoAdd = true;
    },
    receiveInfo: function(data) {
      if (data) {
        const user = {
          user_id: data.studentId,
          user_name: data.name,
          user_identity: "学生"
        };
        console.log(data, user);
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

