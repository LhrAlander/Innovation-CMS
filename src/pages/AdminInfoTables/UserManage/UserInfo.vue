<template>
    <div class="admin-check-info-wrapper">

      <h1 class="title">基本用户信息查看</h1>

      <div class="breadcrumb">
        <i class="iconfont">&#xe6a0;</i>
        用户管理&nbsp; >&nbsp;基本用户信息查看
      </div>

      <div class="info-wrapper" v-for="block in displayInfo">
        <span class="info-title">
          <i class="iconfont box" v-html="block.iconCode"></i>
          {{ block.infoTitle }}
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(block.items)">
             <el-col :span="8" class="info-item" v-for="colIndex in 3">
              <span class="item-name">{{ block.items[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <el-input disabled v-model="block.items[getItemIndex(rowIndex, colIndex)].value" v-if="checkMode"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
      </div>



    </div>
</template>

<script>
  import INFO from '@/config.js'
    export default {
      data () {
        return {
          displayInfo: [],
          checkMode: true
        }
      },
      created () {
        this.displayInfo = INFO.adminCheckInfo.userBaseInfo
      },
      methods: {
        getRowCount (arr) {
          return Math.ceil(arr.length / 3)
        },
        getItemIndex (rowIndex, colIndex) {
          return (rowIndex - 1) * 3 + colIndex - 1
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
    justify-content: space-between;
  }

  .item-name {
    font-size: 1rem;
  }





</style>
