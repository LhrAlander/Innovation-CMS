<template>
  <div class="admin-user-category-wrapper">

    <h1 class="title">用户类别管理</h1>

      <div class="breadcrumb">
        <i class="iconfont">&#xe6a0;</i>
        用户管理&nbsp; >&nbsp;用户类别管理
      </div>

    <div class="info-wrapper">
      <el-row :gutter="100">
        <el-col :span="8">
          <span class="info-title">
            <i class="iconfont people">&#xe61e;</i>
            已有用户类别
          </span>
          <div class="check-box-wrapper">
            <el-checkbox v-for="category in exitCategories" v-model="category.status" :label="category.label" border></el-checkbox>
          </div>
        </el-col>
        <el-col :span="13" :offset="3">
          <el-row>
            <el-col :span="24">
              <span class="info-title">
                <i class="iconfont search">&#xe604;</i>
                删除选项展示
              </span>
              <div class="check-box-wrapper">
                <el-checkbox v-for="category in toDelete" v-model="category.status" :label="category.label" border></el-checkbox>
              </div>
              <el-button type="danger" plain class="delBtn" @click="del">删除分类</el-button>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="24">
              <span class="info-title">
                <i class="iconfont add">&#xe607;</i>
                添加用户类别
              </span>
              <div class="check-box-wrapper">
                <el-checkbox v-for="category in addAreaCategories" v-model="category.status" :label="category.label" border></el-checkbox>
                <el-button type="primary" plain class="addOneBtn" @click="addOne">添加一个分类</el-button>
              </div>
              <el-button type="primary" plain class="delBtn" @click="submitAdd">确定添加</el-button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

    </div>


  </div>
</template>

<script>
  const TODLETE = false
  export default {
    data () {
      return {
        exitCategories: [
          {
            label: "学生",
            status: TODLETE
          },
          {
            label: "教师",
            status: TODLETE
          }, {
            label: "企业",
            status: TODLETE
          }, {
            label: "管理员",
            status: TODLETE
          }
        ],
        addCategories: []
      }
    },
    computed: {
      toDelete () {
        let toDelete = []
        this.exitCategories.forEach(item => {
          if (item.status)
            toDelete.push(item)
        })
        return toDelete
      },
      addAreaCategories () {
        let  effective = []
        this.addCategories.forEach(item => {
          if (item.status)
            effective.push(item)
        })
        return effective
      }
    },
    methods: {
      addOne () {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.addCategories.push({
            label: value,
            status: true
          })
        }).catch(() => {});
      },
      submitAdd () {
        let  effective = []
        this.addCategories.forEach(item => {
          if (item.status) {
            effective.push(item)
          }
        })
        this.addCategories = effective

        this.$confirm('是否确认添加分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '添加中...'
              setTimeout(function () {
                instance.confirmButtonLoading = false
                done()
              }, 1000)
            } else {
              done();
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          effective.forEach(item => item.status = false)
          this.exitCategories = this.exitCategories.concat(effective)
          this.addCategories = []
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      },
      del () {
        let delItems = this.toDelete
        this.$confirm('是否确认删除分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '删除中...'
              // TODO
              setTimeout(function () {
                instance.confirmButtonLoading = false
                done()
              }, 1000)
            } else {
              done();
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          delItems.forEach(item => {
            let index = this.exitCategories.indexOf(item)
            this.exitCategories.splice(index, 1)
            console.log(index)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }

  }
</script>

<style scoped>
  .admin-user-category-wrapper {
    /*background-color: #ECF0F1;*/
    background-color: #fff;
    height: 100%;
    padding: 1.4rem 5rem;
  }




  h1 {
    display: block;
    text-align: center;
    font-size: 1.7rem;
    padding-bottom: 1.4rem;
    border-bottom: .3rem solid #cbcbcb;

  }

  .breadcrumb {
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #2A3F54;
    display: inline-block;
  }


  .breadcrumb .iconfont {
    font-size: 1.5rem;
    margin-right: .3rem;
  }

  .info-wrapper {
    padding: 2rem 3rem;
  }

  .info-title {
    font-size: 1rem;
    color: #2A3F54;
    font-weight: bold;
  }

  .iconfont.people {
    font-weight: normal;
    font-size: 1.6rem;
    margin-right: .5rem;
  }

  .check-box-wrapper {

  }

  .check-box-wrapper {
    display: flex;
    /*flex-direction: column;*/
    flex-wrap: wrap;
    max-height: 360px;
    border: 1px solid #ddd;
    padding: 1.7rem;
    margin: 2rem 0;
    overflow: auto;
  }

  .el-checkbox {
    width: 5rem;
    margin: 1rem;
  }

  i.iconfont.search,
  i.iconfont.add {
    font-size: 1.3rem;
    margin-right: .7rem;
  }

  .delBtn {
    float: right;
  }

  .addOneBtn {
    margin: 1rem;
  }


</style>
