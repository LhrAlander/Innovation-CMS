<template>
  <div class="userinfo">
    <el-button class="addInfo" type="success" size="large">添加信息</el-button>
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
        prop="name"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="password"
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
    export default {
      data() {
        return {
          tableData: [{
            id: 1,
            name: '林海瑞',
            password: '123456',
            role: '学生',
            status: '禁用',
            single: '单身狗',
            expanded: false
          },{
            id: 2,
            name: '林海瑞',
            password: '123456',
            role: '学生',
            status: '禁用',
            single: '单身狗'
          },{
            id: 3,
            name: '林海瑞',
            password: '123456',
            role: '学生',
            status: '禁用',
            single: '单身狗'
          },{
            id: 4,
            name: '林海瑞',
            password: '123456',
            role: '学生',
            status: '禁用',
            single: '单身狗'
          }
          ],
          url: '',
          criteria:'',//搜索条件
          pageSize: 15,
          currentPage: 1,
          start: 1, //查询的页码
          totalCount: 30,
          expands: []
        }
      },
      mounted: function(){
        this.loadData(this.criteria, this.currentName, this.pageSize);
      },
      methods: {
        getRowKeys(row) {
          return row.id;
        },
        loadData(criteria, pageNum, pageSize) {
          axios.get(this.url, {parameter: criteria, pageNum: pageNum, pageSize: pageSize})
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
                 this.loadData(this.criteria, this.currentPage, this.pageSize);
             }, function () {
                 console.log('failed');
             })
        },
        handleEdit(index, row) {
          console.log(index, row)
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.loadData(this.criteria, this.currentName, this.pageSize);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.loadData(this.criteria, this.currentName, this.pageSize);
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
</style>

