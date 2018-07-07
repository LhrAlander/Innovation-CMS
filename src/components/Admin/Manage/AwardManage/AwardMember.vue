<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter"  :key='key' v-if="value !== ''" class="tag" >{{keyFormater(key)}}({{valueFormater(key,value,valueLabelMap)}})</el-tag>
    </div> 
    <el-button class="addInfo" type="success" size="large" @click="dialogVisible = true">导入信息</el-button>
    <el-dialog title="导入excel数据" :visible.sync="dialogVisible">
      <input type="file" placeholder="选择导入文件" @change="sendfile" ref="dataFile"/>
    </el-dialog>
    <el-button class="addInfo" type="success" size="large" @click="downloadExcel">导出信息</el-button>
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
                      :key='key'
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
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import utils from "@/utils/utils"
import XLSX from "xlsx";
import XLSX_SAVE from "file-saver";
export default {
  components: { FilterBox, InfoAdd },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      valueLabelMap: {
        name: [],
        awardLevel: [],
        awardSecondLevel: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        awardName: "获奖名称",
        projectName: "项目名称",
        username: "用户姓名",
        contact: "联系方式"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
      },
      infoAddTmpl: {
        awardTime: {
          label: "获奖时间",
          inputType: 2
        },
        name: {
          label: "获奖名称",
          inputType: 1 // 0 代表 input
        },
        awardLevel: {
          label: "获奖级别",
          inputType: 1 // 0 代表 input
        },
        awardSecondLevel: {
          label: "获奖等级",
          inputType: 1 // 0 代表 input
        },
        projectName: {
          label: "项目名称",
          inputType: 4 // 0 代表 input
        },
        username: {
          label: "用户名",
          inputType: 0
        }
      },
      infoAddRules: {
        name: [{ required: true, message: "请输入获奖名称", trigger: "blur" }],
        awardLevel: [
          { required: true, message: "请输入获奖级别", trigger: "blur" }
        ],
        awardSecondLevel: [
          { required: true, message: "请输入获奖等级", trigger: "blur" }
        ],
        awardTime: [
          { required: true, message: "请输入获奖时间", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
        ]
      },
      //        获取表格数据的地址
      url: "/api/award/users",
      filterTmpl: {
        name: {
          label: "获奖名称",
          inputType: 1 // 0 代表 input
        },
        awardLevel: {
          label: "获奖级别",
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
        username: {
          label: "用户姓名",
          inputType: 0
        }
      },
      filter: {
        //搜索条件
        name: "", //获奖名称
        awardLevel: "", //获奖等级
        awardSecondLevel: "", //获奖级别
        projectName: "", //项目名称
        username: "" //用户姓名
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
    downloadExcel() {
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      }
      utils.filter2Mysql(utils.filterName.PROJECT, this.filter);
      console.log(this.filter);
      if (this.filter.projectName == "个人") {
        this.filter.projectId = "个人";
        delete this.filter.projectName;
      }
      axios
        .get(this.url, {
          params: {
            param: this.filter,
            pageNum: 1,
            pageSize: this.totalCount
          }
        })
        .then(res => {
          console.log(res);
          let projects = res.data.data;
          let data = [
            [
              "获奖名称",
              "获奖类别",
              "奖项等级",
              "获奖日期",
              "项目名称",
              "获奖人员",
            ]
          ];
          let members = {}
          for (let i = 0; i < projects.length; i++) {
            let p = projects[i];
            let key = `${p.name}${p.awardLevel}${p.awardSecondLevel}${new Date(p.awardTime).getFullYear()}${p.projectName}`
            if (!members[key]) {
              members[key] = {
                name: p.name,
                awardLevel: p.awardLevel,
                awardSecondLevel: p.awardSecondLevel,
                year: new Date(p.awardTime).getFullYear(),
                projectName: p.projectName,
                members: []
              }
            }
            members[key].members.push(p.username)
          }
          for (let k in members) {
            let p = members[k]
            let _d = [
              p.name,
              p.awardLevel,
              p.awardSecondLevel,
              p.year,
              p.projectName,
              p.members.join('、'),
            ];
            data.push(_d)
          }
          console.log(data)
          const ws = XLSX.utils.aoa_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
          XLSX_SAVE.saveAs(
            new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
            "获奖人员导出.xlsx"
          );
        })
        .catch(err => {
          console.log(err);
        });
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
        console.log(users)
        obj.value = ''
        axios.post('/api/award/insert/awardusersfromexcel', {
          users
        })
        .then(res => {
          console.log(res)
          _this.dialogVisible = false
          obj.value = ''
        })
        .catch(err => {
          console.log(err)
        })
      };
    },
    getRowKeys(row) {
      return row.id;
    },
    //        异步加载数据
    loadData(filter, pageNum, pageSize) {
      if (filter.projectName == "个人") {
        filter.projectId = "个人";
        delete filter.projectName;
      }
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
      this.$router.push(`/check/studentInfo/${row.userId}`);
    },
    //        删除按钮事件
    handleDelete(index, row) {
      console.log(row);
      const award = {
        awardId: row.awardId,
        userId: row.userId
      };
      axios
        .post("/api/award/delete/user", { award })
        .then(res => {
          console.log(res);
          this.loadData(this.filter, this.currentPage, this.pageSize)
        })
        .catch(err => {
          console.log(err);
        });
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
      this.infoAddTmpl.projectName.options = teams[3];
      this.infoAddTmpl.projectName.options.push({
        label: "个人",
        value: "个人"
      });
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
    enterAdd: async function() {
      if (this.valueLabelMap.name.length < 1) {
        await this.initSelectors();
        this.showInfoAdd = true;
      } else {
        this.showInfoAdd = true;
      }
    },
    receiveInfo: function(data) {
      if (data) {
        console.log(data);
        const award = {
          award: {
            award_time: data.awardTime,
            award_name: data.name,
            award_identity: data.awardLevel,
            award_level: data.awardSecondLevel
          },
          user: {
            award_project: data.projectName.pop(),
            user_id: data.username
          }
        };
        axios
          .post("/api/award/add/user", { award })
          .then(res => {
            console.log(res);
            if (res.data.code == 500) {
              this.$message.error('没有该获奖信息')
            }
            else {
              this.loadData(this.filter, this.currentPage, this.pageSize);
            }
          })
          .catch(err => {
            console.log(err);
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

