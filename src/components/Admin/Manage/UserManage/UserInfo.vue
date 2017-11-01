<template>
  <div class="userinfo">
    <el-button class="addInfo" type="success" size="large" v-if="!showFilterBox">添加信息</el-button>
    <el-button class="filter" size="large" v-if="!showFilterBox" @click="enterFilter">筛选信息</el-button>
    <div class="filterbox" v-if="showFilterBox">
      <el-input v-model="filter.username" placeholder="用户名" class="filter-input"></el-input>
      <el-input v-model="filter.name" placeholder="姓名" class="filter-input"></el-input>
      <el-select v-model="filter.role" clearable placeholder="用户类别" class="filter-select">
        <el-option v-for="item in roleOptions"
                   :key = "item.value"
                   :label = "item.label"
                   :value = "item.value">
        </el-option>
      </el-select>
      <el-select v-model="filter.status" clearable placeholder="用户状态" class="filter-select">
        <el-option v-for="item in statusOptions"
                   :key = "item.value"
                   :label = "item.label"
                   :value = "item.value">
        </el-option>
      </el-select>
      <!--取消按钮-->
      <i class="iconfont confirm no" @click="filterCancel">&#xe605;</i>
      <!--确认按钮-->
      <i class="iconfont confirm yes" @click="filterConfirm">&#xe606;</i>

    </div>
    <el-table
      :data="tableData"
      stripe
      border
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      style="width: 100%;">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="单身情况">
              <span>{{ props.row.single }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="用户类别"
        prop="role"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="用户状态"
        prop="status"
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
            @click="handleMore(scope.$index, scope.row)" v-html="tableData[scope.$index].expanded ? '收起':'更多'"></el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="small"
            class="edit-btn"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    import axios from 'axios'
    import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
    export default {
      components: {ElButton},
      data() {
        return {
          tableData: [{
            id: 1,
            username: '2015210405043',
            name: '林海瑞',
            role: '学生',
            status: '禁用',
            single: '单身狗',
            expanded: false
          }
          ],
          url: '',
          filter: {//搜索条件
            username: '',
            name: '',
            role: '',
            status: ''
          },
          pageSize: 15,
          currentPage: 1,
          start: 1, //查询的页码
          totalCount: 30,
          expands: [],
          showFilterBox: true, // 是否显示筛选框
          roleOptions: [{
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '学生'
          }, {
            value: 2,
            label: '老师'
          }, {
            value: 3,
            label: '企业'
          }],
          statusOptions: [{
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '可用'
          }, {
            value: 2,
            label: '禁用'
          }, {
            value: 3,
            label: '待审核'
          }],
        }
      },
      mounted: function(){
        this.loadData(this.filter, this.currentName, this.pageSize);
      },
      methods: {
        getRowKeys(row) {
          return row.id;
        },
        loadData(filter, pageNum, pageSize) {
          axios.get(this.url, {parameter: filter, pageNum: pageNum, pageSize: pageSize})
            .then(function (res) {
            this.tableData = res.data.pagestudentdata;
            this.totalCount = res.data.number;
          }, function () {
            console.log('failed')
          }).catch(function (err) {
            console.log(err)
          })
        },
        unique(array) {
          var r = [];
          for(var i = 0, l = array.length; i < l; i++) {
            for(var j = i + 1; j < l; j++)
              if (array[i] === array[j]) j = ++i;
            r.push(array[i]);
          }
          return r;
        },
        handleMore(index, row) {
          console.log(index, row);
          if (!this.tableData[index].expanded){
            this.expands.push(this.tableData[index].id)
            this.tableData[index].expanded = true;
          } else {
            this.expands.pop(this.tableData[index].id)
            this.tableData[index].expanded = false;
          }
          this.unique(this.expands)
        },
        handleDelete(index, row) {
          var array = [];
          array.push(row.id);
          axios.post('',{"array":array},{emulateJson: true})
               .then(function (res) {
                 this.loadData(this.filter, this.currentPage, this.pageSize);
             }, function () {
                 console.log('failed');
             })
        },
        handleEdit(index, row) {
          console.log(index, row)
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.loadData(this.filter, this.currentName, this.pageSize);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.loadData(this.filter, this.currentName, this.pageSize);
        },
        filterConfirm() {
          this.loadData(this.filter, this.currentName, this.pageSize);
        },
        filterCancel() {
          this.showFilterBox = false;
        },
        enterFilter() {
          this.showFilterBox = true;
        }
      }
    }
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

  .userinfo {
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
    background-color: #9B59B6;
    color: #ECF0F1;
    outline: 0;
    border: 1px solid #9B59B6;
  }
  .filter:hover {
    opacity: .7;
  }
  .filter:active {
    opacity: 1;
    background-color: #71468B;
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
  .edit-btn {
    background-color: #5CB85C;
    color: #ECF0F1;
    outline: 0;
    border: 1px solid #5CB85C;
  }
  .edit-btn:hover {
    opacity: .7;
  }
  .edit-btn:active {
    opacity: 1;
    background-color: #4E9B4E;
  }

  .filterbox {
    height: 45px;
    margin-bottom: 15px;
    background-color: #ECF0F1;
    padding-left: 9%;
  }
  .filter-input, .filter-select {
    width: 14%;
    margin-left: 2%;
  }
  i.confirm {
    float: right;
    font-size: 1.5rem;
    margin-left: 20px;
    cursor: pointer;
    opacity: .5;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  i.confirm:hover {
    opacity: 1;
  }
  i.confirm.yes {
    color: green;
  }
  i.confirm.no {
    color: red;
  }
</style>

