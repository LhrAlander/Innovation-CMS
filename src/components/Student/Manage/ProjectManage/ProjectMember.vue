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
                :options = "projectOptions"
                @sendFilter="receiveFilter"></filter-box>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      border
      :row-key="getRowKeys"
      style="width: 100%; margin-top: 40px;">
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
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            v-if="scope.row.leaderId == userId"
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
import axios from "utils/https";
import FilterBox from "components/Admin/Manage/FilterBox";
import InfoAdd from "components/Admin/Manage/InfoAdd";
import utils from '@/utils/utils'
export default {
  components: { FilterBox, InfoAdd },
  data() {
    return {
      userId: '',
      tableData: [],
      projectOptions: [
        {
          value: "depUnit1",
          label: "依托单位1",
          children: [
            {
              value: "group1",
              label: "团队1",
              children: [
                {
                  value: "project1",
                  label: "项目1"
                },
                {
                  value: "project2",
                  label: "项目2"
                }
              ]
            },
            {
              value: "group2",
              label: "团队2",
              children: [
                {
                  value: "project3",
                  label: "项目3"
                },
                {
                  value: "project4",
                  label: "项目4"
                }
              ]
            }
          ]
        },
        {
          value: "depUnit2",
          label: "依托单位2",
          children: [
            {
              value: "group3",
              label: "团队3",
              children: [
                {
                  value: "project5",
                  label: "项目5"
                },
                {
                  value: "project6",
                  label: "项目6"
                }
              ]
            },
            {
              value: "group4",
              label: "团队4",
              children: [
                {
                  value: "project7",
                  label: "项目7"
                },
                {
                  value: "project8",
                  label: "项目8"
                }
              ]
            }
          ]
        }
      ],
      valueLabelMap: {
        projectName: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        projectName: "项目名称",
        userId: "用户名",
        username: "用户姓名",
        contact: "联系方式",
        joinTime: "加入时间"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
      },
      infoAddTmpl: {
        projectName: {
          label: "项目名称",
          inputType: 0 // 0 代表 input
        },
        userId: {
          label: "用户名",
          inputType: 0 // 0 代表 input
        },
        joinTime: {
          label: "加入时间",
          inputType: 2
        }
      },
      infoAddRules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        userId: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        joinTime: [
          { required: true, message: "请输入加入时间", trigger: "blur" }
        ]
      },
      //        获取表格数据的地址
      url: "/api/st/project/users",
      filterTmpl: {
        projectName: {
          label: "项目名称",
          inputType: 4 // 0 代表 input
        },
        userId: {
          label: "用户名",
          inputType: 0 // 0 代表 input
        },
        username: {
          label: "用户姓名",
          inputType: 0 // 0 代表 input
        }
      },
      filter: {
        //搜索条件
        projectName: "", //项目名称
        userId: "", //用户名
        username: "" //用户姓名
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
  computed: {
    deleteAuth(leaderId) {
      // return row.leaderId == this.$store.state.user.userId
      console.log(leaderId, this.$store.state.user.userId)
      return false
    }
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
          this.$store.commit('setLoginUser', res.data.user)
          this.userId = res.data.user.userId
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
      this.$router.push("/check/studentInfo/1");
    },
    //        删除按钮事件
    handleDelete(index, row) {
      let user = {
        joinTime: row.joinTime,
        projectId: row.projectId,
        userId: row.userId,
        teamId: row.teamId,
        del: true
      };
      console.log(user);
      this.$confirm(
        "是否删除该成员记录",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log("yes", user);
          user.del = true;
          axios
            .post("/api/project/del/project/user", { user })
            .then(res => {
              this.loadData(this.filter, this.currentPage, this.pageSize);
            })
            .catch(err => {});
        })
        .catch(() => {
          console.log("catch");
          this.$message.info("取消删除");
        });
    },
    //        编辑按钮事件
    handleEdit(index, row) {
      console.log(index, row);
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
    // 点击筛选触发的事件
    async enterFilter() {
      if (
        !(
          "options" in this.filterTmpl.projectName &&
          this.filterTmpl.projectName.options.length > 0
        )
      ) {
        let res = await this.$store.dispatch("getSelectors");
        this.filterTmpl.projectName.options = res[3];
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
    valueFormater: function(type, value, map) {
      if (type === "projectName") {
        for (var item of map[type]) {
          if (item.value === value[2]) {
            return item.label;
          }
        }
      }
      if (map[type] === undefined) {
        return value;
      }
      for (var item of map[type]) {
        if (item.value === value) {
          return item.label;
        }
      }
    },
    quitFilter: function() {
      this.filter = this.resetObject(this.filter, this.filterTmpl);
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    receiveInfo: function(data) {
      if (data) {
        axios.post("", { data: data }, { emulateJson: true }).then(
          function(res) {
            this.loadData(this.filter, this.currentPage, this.pageSize);
          },
          function() {
            console.log("failed");
          }
        );
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

