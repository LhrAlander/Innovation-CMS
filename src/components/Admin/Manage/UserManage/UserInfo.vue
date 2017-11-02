<template>
  <div class="userinfo">
    <div class="tagBlock">
      <el-tag v-for="(value,key,index) in filter" v-if="value != ''" class="tag" >{{key}}</el-tag>
    </div>
    <el-button class="addInfo" type="success" size="large">添加信息</el-button>
    <el-button class="filter" size="large" @click="enterFilter">筛选信息</el-button>
    <filter-box :dialogVisible="showFilterBox" @sendFilter="receiveFilter"></filter-box>
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
    import FilterBox from "components/Admin/Manage/FilterBox"
    export default {
      components: {ElButton, FilterBox},
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
          showFilterBox: false, // 是否显示筛选框
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
      filters: {
        tagFilter: function (value) {
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
        },
        receiveFilter(filter) {
          if (filter != null)
            this.filter = filter;
          this.showFilterBox = false;
          this.loadData(this.filter, this.currentName, this.pageSize);
        },
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
  .tagBlock {
    display: inline-block;
    margin-top: 10px;
    margin-left: 20%;

  }
  .tag {
    margin: 5px;
  }
</style>

