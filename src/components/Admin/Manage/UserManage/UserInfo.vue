<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter" :key='key' v-if="value !== ''" class="tag" >{{keyFormater(key)}}({{valueFormater(key,value,valueLabelMap)}})</el-tag>
    </div>
    
    <el-button class="addInfo" type="success" size="large" @click="dialogVisible = true">导入信息</el-button>
    <el-dialog title="导入excel数据" :visible.sync="dialogVisible">
      <el-row style="margin-bottom: 20px">
        <el-col :span="24">
        <el-button type="success" size="large" @click="downloadExcelModel">下载表格模板填入信息</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <input type="file" placeholder="选择导入文件" @change="sendfile" ref="dataFile"/>
        </el-col>
      </el-row>
    </el-dialog>
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
import axios from "@/utils/https.js";
import FilterBox from "components/Admin/Manage/FilterBox";
import InfoAdd from "components/Admin/Manage/InfoAdd";
import utils from "@/utils/utils";
import XLSX from "xlsx";
import XLSX_SAVE from "file-saver";
export default {
  components: { FilterBox, InfoAdd },
  data() {
    return {
      dialogVisible: false,
      excelFile: [],
      tableData: [],
      valueLabelMap: {
        role: [
          {
            value: "学生",
            label: "学生"
          },
          {
            value: "教师",
            label: "教师"
          }
          // {
          //   value: 2,
          //   label: "企业"
          // }
        ]
      },

      keyFormatMap: {
        // 格式化标签映射表
        username: "用户名",
        name: "姓名",
        role: "用户类别",
        status: "用户状态"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
        phone: "手机号",
        email: "邮箱"
      },
      infoAddTmpl: {
        username: {
          label: "用户名",
          inputType: 0 // 0 代表 input
        },
        name: {
          label: "姓名",
          inputType: 0 // 0 代表 input
        },
        role: {
          label: "用户类别",
          inputType: 1 // 1 代表下拉框
        }
      },
      infoAddRules: {
        groupName: [
          { required: true, message: "请输入团队名称", trigger: "blur" }
        ],
        leaderName: [
          { required: true, message: "请输入依托单位", trigger: "blur" }
        ],
        leaderId: [
          {
            required: true,
            message: "请输入负责人用户名(学号)",
            trigger: "blur"
          }
        ],
        teacherId: [
          { required: true, message: "请输入指导教师用户名", trigger: "blur" }
        ]
      },
      //        获取表格数据的地址
      url: "/api/user/users",
      filterTmpl: {
        username: {
          label: "用户名",
          inputType: 0 // 0 代表 input
        },
        name: {
          label: "姓名",
          inputType: 0 // 0 代表 input
        },
        role: {
          label: "用户类别",
          inputType: 1
        }
      },
      filter: {
        //搜索条件
        username: "", //用户名
        name: "", //姓名
        role: "", //用户类别
        status: "" //用户状态
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
    // utils.filter2Mysql(utils.filterName.USER, this.filter);
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
          this.tableData = res.data.data;
          this.totalCount = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    downloadExcelModel() {
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      }
      let data = [
        [
          "学号/工号",
          "姓名",
          "性别",
          "账号类别（仅限学生、教师、企业）"
        ]
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
      XLSX_SAVE.saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "用户信息模板.xlsx"
      );
    },
    sendfile(t) {
      let obj = this.$refs.dataFile;
      let _this = this;
      if (!obj.files) {
        return;
      }
      let f = obj.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(f);
      reader.onload = function(e) {
        let data = e.target.result;
        let wb = XLSX.read(data, { type: "binary" });
        let users = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        axios
          .post("/api/user/insert/usersfromexcel", {
            users
          })
          .then(res => {
            console.log(res);
            _this.dialogVisible = false;
            obj.value = "";
          })
          .catch(err => {
            console.log(err);
          });
      };
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
      this.$router.push(`/check/userInfo/${row.username}`);
    },
    //        删除按钮事件
    handleDelete(index, row) {
      let state = row.status == "可用" ? "不可用" : "可用";
      axios
        .post("/api/user/delUser", { userId: row.username, state })
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
      this.$router.push(`/edit/userInfo/${row.username}`);
    },
    // 单页大小改变回调事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData(this.filter, this.currentName, this.pageSize);
    },
    // 当前页改变回调事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    // 点击筛选触发的事件
    enterFilter() {
      this.showFilterBox = true;
    },
    // 接收子组件filterbox传递的筛选条件数据
    receiveFilter(filter) {
      if (filter !== undefined) this.filter = filter;
      this.showFilterBox = false;
      this.currentPage = 1;
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },

    // 标签的key格式化器
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
        console.log(data);
        const user = {
          user_id: data.username,
          user_name: data.name,
          user_identity: data.role
        };
        console.log(user);
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

