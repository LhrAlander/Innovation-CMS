<template>
  <div class="wrap">
    <!--筛选标签区域-->
    <div class="tagBlock">
      <span v-if="!tagEmpty" style="font-weight: bold; font-size: .9rem;">筛选条件</span>
      <el-tag v-for="(value,key) in filter"  :key='key' v-if="value !== ''" class="tag">
        {{keyFormater(key)}}({{valueFormater(key, value, valueLabelMap)}})
      </el-tag>
    </div>
    <!-- <el-button class="addInfo" type="success" size="large" @click="enterAdd">添加信息</el-button> -->
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
						v-if="!scope.row.isPendingNow"
            size="small"
            type="primary"
            @click="handleMore(scope.$index, scope.row)">更多
          </el-button>
          <el-button
						v-if="!scope.row.isPendingNow"
            size="small"
            class="edit-btn"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
					<el-button
						v-if="!scope.row.isPendingNow && scope.row.status != '已结题'"
            size="small"
						type="warning"
            @click="scope.row.isPendingNow = true">审核
          </el-button>
					 <el-button
					 	v-if="scope.row.isPendingNow"
            size="small"
						type="primary"
            @click="pend(scope.$index, scope.row, true)">审核通过
          </el-button>
					<el-button
					 	v-if="scope.row.isPendingNow"
            size="small"
						type="danger"
            @click="pend(scope.$index, scope.row, false)">审核不通过
          </el-button>
					<el-button
					 	v-if="!scope.row.isPendingNow && !scope.row.status.startsWith('立项')"
            size="small"
						type="info"
            @click="lastLevel(scope.$index, scope.row)">上一阶段
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
      isPendingNow: false,
      tableData: [],
      valueLabelMap: {
        projectCategory: [],
        projectLevel: [],
        guideTeacher: []
      },

      keyFormatMap: {
        // 格式化标签映射表
        projectName: "项目名称",
        projectCategory: "项目类别",
        projectLevel: "项目级别",
        guideTeacher: "指导老师",
        applyYear: "项目申请年份",
        status: "状态"
      },
      expandFormatMap: {
        // 格式化额外信息映射表
        projectId: "项目编号",
        dependentUnit: "项目依托单位",
        applyYear: "项目申请年份",
        beginYear: "项目开始年份",
        deadlineYear: "项目截至年份",
        principalName: "项目负责人用户名",
        guideTeacherName: "指导老师用户名"
      },
      infoAddTmpl: {
        projectName: {
          label: "项目名称",
          inputType: 0 // 0 代表 input
        },
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
          inputType: 2
        },
        projectId: {
          label: "项目编号",
          inputType: 0
        },
        dependentUnit: {
          label: "项目依托单位",
          inputType: 4
        },
        beginYear: {
          label: "项目开始年份",
          inputType: 2
        },
        deadlineYear: {
          label: "项目截至年份",
          inputType: 2
        },
        principalName: {
          label: "项目负责人用户名",
          inputType: 0
        },
        guideTeacher: {
          label: "指导老师用户名",
          inputType: 0
        }
      },

      infoAddRules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projectCategory: [
          { required: true, message: "请输入项目类别", trigger: "blur" }
        ],
        projectLevel: [
          { required: true, message: "请输入项目级别", trigger: "blur" }
        ],
        applyYear: [
          { required: true, message: "请输入项目申请年份", trigger: "blur" }
        ],
        projectId: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        beginYear: [
          { required: true, message: "请输入项目开始年份", trigger: "blur" }
        ],
        deadlineYear: [
          { required: true, message: "请输入项目截至年份", trigger: "blur" }
        ],
        principalName: [
          { required: true, message: "请输入项目负责人用户名", trigger: "blur" }
        ],
        guideTeacherName: [
          { required: true, message: "请输入指导老师用户名", trigger: "blur" }
        ]
      },
      //        获取表格数据的地址
      url: "/api/project/pendProjects",
      filterTmpl: {
        projectName: {
          label: "项目名称",
          inputType: 0
        },
        projectCategory: {
          label: "项目类别",
          inputType: 1
        },
        projectLevel: {
          label: "项目级别",
          inputType: 1
        },
        applyYear: {
          label: "项目申请年份",
          inputType: 3
        },
        pendStatus: {
          label: "状态",
          inputType: 1
        },
        dependentUnit: {
          label: "项目依托单位",
          inputType: 4
        },
        beginYear: {
          label: "项目开始年份",
          inputType: 3
        },
        deadlineYear: {
          label: "项目截至年份",
          inputType: 3
        },
        guideTeacher: {
          label: "指导老师用户名",
          inputType: 1
        },
        principalName: {
          label: "项目负责人用户名",
          inputType: 0
        },
      },
      filter: {
        //搜索条件
        projectName: "", //项目名称
        projectCategory: "", //项目类别
        projectLevel: "", //项目级别
        guideTeacher: "", //指导老师
        pendStatus: "", //项目编号
        dependentUnit: "", //项目依托单位
        applyYear: "", //项目申请年份
        beginYear: "", //项目开始年份
        deadlineYear: "", //项目截至年份
        principalName: "", //项目负责人用户名
        guideTeacher: "" //指导老师用户名
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
    utils.filter2Mysql(utils.filterName.PROJECT, this.filter);
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
      if ("studentName" in filter) {
        filter.studentId = filter.studentName
        delete filter.studentName
      }
      axios.get('/api/teacher/teacher/choices')
      .then(res => {
        this.valueLabelMap.guideTeacher = res.data.names
      })
      .catch(err => {
        console.log(err)
      })
      axios
        .get(this.url, {
          params: {
            param: filter,
            pageNum: pageNum,
            pageSize: pageSize
          }
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

    handleMore(index, row) {
      this.$router.push(`/check/projectinfo/${row.projectId}`);
    },
    //        编辑按钮事件
    handleEdit(index, row) {
      this.$router.push(`/edit/ProjectInfo/${row.projectId}`);
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
        this.valueLabelMap.projectCategory = res[0];
        this.valueLabelMap.projectLevel = res[1];
        this.filterTmpl.dependentUnit.options = res[2];
        this.infoAddTmpl.dependentUnit.options = res[2];
        this.valueLabelMap.pendStatus = [
          {
            label: '立项申请中',
            value: '立项申请中'
          },
          {
            label: '立项失败',
            value: '立项失败'
          },
          {
            label: '中期检查中',
            value: '中期检查中'
          },
          {
            label: '中期审核不通过',
            value: '中期审核不通过'
          },
          {
            label: '结题审查中',
            value: '结题审查中'
          },
          {
            label: '已结题',
            value: '已结题'
          }
        ]
        this.showFilterBox = true;
      } else {
        this.showFilterBox = true;
      }
    },
    // 接收子组件filterbox传递的筛选条件数据
    receiveFilter(filter) {
      if (filter !== undefined) {
        this.filter = filter;
        utils.filter2Mysql(utils.filterName.PROJECT, this.filter);
        this.loadData(this.filter, this.currentPage, this.pageSize);
      }
      this.showFilterBox = false;
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
      utils.filter2Mysql(utils.filterName.PROJECT, this.filter);
      this.loadData(this.filter, this.currentPage, this.pageSize);
    },
    enterAdd: async function() {
      if (this.valueLabelMap.projectCategory.length < 1) {
        let res = await this.$store.dispatch("getSelectors");
        this.valueLabelMap.projectCategory = res[0];
        this.valueLabelMap.projectLevel = res[1];
        this.filterTmpl.dependentUnit.options = res[2];
        this.infoAddTmpl.dependentUnit.options = res[2];
      }
      this.showInfoAdd = true;
    },
    receiveInfo: function(data) {
      if (data) {
        const project = {
          project_id: data.projectId,
          project_status: "可用",
          project_name: data.projectName,
          project_identity: data.projectCategory,
          project_level: data.projectLevel,
          team_id: data.dependentUnit[1],
          project_teacher: data.guideTeacherName,
          project_principal: data.principalName,
          register_year: data.applyYear,
          start_year: data.beginYear,
          finish_year: data.deadlineYear
        };
        axios
          .post("/api/project/add/project", { project })
          .then(res => {
            this.loadData(this.filter, this.currentPage, this.pageSize);
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.showInfoAdd = false;
    },
    pend(index, row, res) {
			let status = row.status
			let st = ''
			if (status.startsWith('立项')) {
				st = res ? '中期检查中' : '立项失败'
			}
			else if (status.startsWith('中期')) {
				st = res ? '结题审查中' : '中期审核不通过'
			}
			else if (status.startsWith('结题')) {
				st = res ? '已结题' : '结题审核不通过'
			}
			this.changeStatus(row, st)
			row.isPendingNow = false
		},
		lastLevel(index, row) {
			let status = row.status
			let st = ''
			if (status.startsWith('中期')) {
				st = '立项申请中'
			}
			else if (status.startsWith('结题')) {
				st = '中期检查中'
			}
			else if (status == '已结题') {
				st = '结题检查中'
			}
			this.changeStatus(row, st)
		},
		changeStatus(row, st) {
			row.status = st
			let project = {
				project_id: row.projectId,
				pend_status: st,
				project_status: st == '已结题' ? '可用' : '不可用'
			}
			axios.post('/api/project/change/project', {
				project
			})
			.then(res => {
			})
			.catch(err => {
				console.log(err)
			})
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

