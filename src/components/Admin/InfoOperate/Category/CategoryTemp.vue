<template>
  <div class="admin-user-category-wrapper">
    <h1 class="title">{{ title }}</h1>
    <div class="breadcrumb">
      <i class="iconfont" v-html="breadCrumbs.iconCode"></i>
      {{ breadCrumbs.firstLevel}}&nbsp; >&nbsp;<template v-for="level in breadCrumbs.otherLevels">{{ level }}</template>
    </div>
    <div class="info-wrapper">
      <el-row :gutter="100">
        <el-col :span="8">
          <span class="info-title">
            <i class="iconfont exist" v-html="exists.iconCode"></i>
            {{ exists.title }}
          </span>
          <div class="check-box-wrapper">
            <el-checkbox v-for="category in exists.categories" v-model="category.status" :label="category.label" border></el-checkbox>
          </div>
        </el-col>
        <el-col :span="13" :offset="3">
          <el-row>
            <el-col :span="24">
              <span class="info-title">
                <i class="iconfont delete" v-html="deleteInfo.iconCode"></i>
                {{ deleteInfo.title }}
              </span>
              <div class="check-box-wrapper">
                <el-checkbox v-for="category in toDelete" v-model="category.status" :label="category.label" border></el-checkbox>
              </div>
              <slot name="delBtn"></slot>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="info-title">
                <i class="iconfont add" v-html="addInfo.iconCode"></i>
                {{ addInfo.title }}
              </span>
              <div class="check-box-wrapper">
                <el-checkbox v-for="category in toAdd" v-model="category.status" :label="category.label" border></el-checkbox>
                <slot name="addOneBtn"></slot>
              </div>
              <slot name="addAllBtn"></slot>
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
    props: {
      title: String,
      breadCrumbs: Object,
      exists: Object,
      deleteInfo: Object,
      toDelete: Array,
      addInfo: Object,
      toAdd: Array
    },

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

  .iconfont.exist {
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
    margin: 1rem;
  }

  i.iconfont.delete,
  i.iconfont.add {
    font-size: 1.3rem;
    margin-right: .7rem;
  }




</style>
