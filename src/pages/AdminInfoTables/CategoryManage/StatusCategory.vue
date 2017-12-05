<!--政策类别管理-->
<template>
  <categroy
    title="状态管理"
    :breadCrumbs="breadCrumbs"
    :exists="exists"
    :addInfo="addInfo"
    :toDelete="toDelete"
    :deleteInfo="deleteInfo"
    :toAdd="toAdd">
    <el-button type="danger" plain class="delBtn" @click="del" slot="delBtn">删除状态</el-button>
    <el-button type="primary" plain class="addOneBtn" @click="addOne" slot="addOneBtn">添加一个状态</el-button>
    <el-button type="primary" plain class="delBtn" @click="submitAdd" slot="addAllBtn">确定添加</el-button>
  </categroy>
</template>

<script>
  import Categroy from "components/Admin/InfoOperate/Category/CategoryTemp"
  const TODLETE = false
  export default {
    components: {
      Categroy
    },
    data () {
      return {
        breadCrumbs: {
          iconCode: "&#xe624;",
          firstLevel: "基本信息管理",
          otherLevels: ["状态管理"]
        },
        exists: {
          iconCode: "&#xe624;",
          title: "已有状态",
          categories: [
            {
              label: "可用",
              status: TODLETE
            },
            {
              label: "不可用",
              status: TODLETE
            },
            {
              label: "待审核",
              status: TODLETE
            }
          ],
        },
        deleteInfo: {
          iconCode: "&#xe604;",
          title: "删除选项展示",
        },
        addInfo: {
          iconCode: "&#xe607;",
          title: "添加学院",
        },
        addCategories: []
      }
    },
    computed: {
      toDelete () {
        let toDelete = []
        this.exists.categories.forEach(item => {
          if (item.status)
            toDelete.push(item)
        })
        return toDelete
      },
      toAdd () {
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
          this.exists.categories = this.exists.categories.concat(effective)
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
            let index = this.exists.categories.indexOf(item)
            console.log(index)
            this.exists.categories.splice(index, 1)
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
  .delBtn {
    float: right;
  }

  .addOneBtn {
    margin: 1rem;
  }
</style>
