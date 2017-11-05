<template>
    <div class="admin-check-info-wrapper">

      <h1 class="title">{{ title }}</h1>

      <div class="mode-crumb-box">
        <div class="breadcrumb">
          <i class="iconfont" v-html="breadCrumbs.iconCode"></i>
          {{ breadCrumbs.firstLevel}}&nbsp; >&nbsp;<template v-for="level in breadCrumbs.otherLevels">{{ level }}</template>
        </div>
        <div class="btn-wrapper">
          <el-button type="primary" plain class="modify-mode-btn" @click="goCheckMode">查看信息</el-button>
          <el-button type="warning" plain class="modify-mode-btn" @click="goModifyMode">修改信息</el-button>
          <el-button type="danger" plain class="modify-mode-btn" @click="delUser">删除用户</el-button>
        </div>
      </div>

      <div class="info-wrapper" v-for="block in displayInfo">
        <span class="info-title">
          <i class="iconfont box" v-html="block.iconCode"></i>
          {{ block.infoTitle }}
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(block.items)">
             <el-col :span="block.items[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" v-for="colIndex in 3" v-if="block.items[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ block.items[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <el-input disabled v-model="block.items[getItemIndex(rowIndex, colIndex)].value" v-if="checkMode"></el-input>
              <info-display-temp @clickBtn="btnFunc(block.items[getItemIndex(rowIndex, colIndex)])" v-if="!checkMode" :item="block.items[getItemIndex(rowIndex, colIndex)]"></info-display-temp>
                      <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
              </div>
            </el-col>
          </el-row>
        </span>
      </div>

      <el-button v-if="!checkMode" type="primary" class="submitBtn" @click="alertModify">提交修改</el-button>

    </div>
</template>

<script>
  import InfoDisplayTemp from 'components/Admin/Manage/InfoDisplayTemp'

  const INPUT = 1
  const SELECT = 2
  const RADIO = 3
  const SWITCH = 4
  const BUTTON = 5

    export default {
      props: {
        title: String,
        breadCrumbs: Object,
        displayInfo: Array,
        checkMode: false
      },
      components: {
        InfoDisplayTemp
      },
      methods: {
        getRowCount (arr) {
          return Math.ceil(arr.length / 3)
        },
        getItemIndex (rowIndex, colIndex) {
          return (rowIndex - 1) * 3 + colIndex - 1
        },
        btnFunc (item) {
          switch (item.clickFunName) {
            case 'resetPWD':
              this.resetPWD()
              break
          }
        },
        alertModify () {
          this.$confirm('是否确认提交修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                this.submitModify().then(function () {
                  instance.confirmButtonLoading = false
                  done()
                })
              } else {
                console.log("else")
                done();
              }
            }
          }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        },
        submitModify () {
          return new Promise((res, reject) => {
            // 提交修改后的信息
            setTimeout(() => {
              if (true)
                res()
              else
                reject()
            }, 3000)
          })
        },
        resetPWD () {
          this.$confirm('是否重置该用户密码?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                this.submitModify().then(function () {
                  instance.confirmButtonLoading = false
                  done()
                })
              } else {
                console.log("else")
                done();
              }
            }
          }).then(() => {
            this.$message({
              type: 'success',
              message: '重置密码成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消重置密码'
            })
          })
        },
        goModifyMode () {
          this.$emit("goModifyMode")
        },
        goCheckMode () {
          this.$emit("goCheckMode")
        }
      }
    }
</script>

<style scoped>

  .admin-check-info-wrapper {
    /*background-color: #ECF0F1;*/
    background-color: #fff;
    height: 100%;
    padding: 1.4rem 5rem;
  }

  .mode-crumb-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .iconfont.box {
    font-weight: normal;
    margin-right: .3rem;
  }

  .el-row.info-content {
    margin: 3rem 0;
  }

  .el-input {
    background-color: #ffff00;
    font-size: 1.3rem;
  }

  .info-item {
    display: flex;
    align-items: center;
  }

  .item-name {
    font-size: 1rem;
    width: 5rem;
    margin-right: 1rem;
  }

  .item-content {
    flex: 1;
  }

  .submitBtn {
    float: right;
    margin-right: 3rem;
  }




</style>
