<template>
  <div class="awards">
    <el-row :gutter="100">
      <el-col :span="12">
        <left-award></left-award>
        <left-award></left-award>
        <left-award></left-award>
      </el-col>
      <el-col :span="12">
        <left-award></left-award>
        <left-award></left-award>
        <left-award></left-award>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LeftAward from './LeftAward'
  import RightAward from './RightAward'
  export default {
    components: {
      LeftAward,
      RightAward
    }
  }
</script>

<style scoped>
  .awards {
    padding: 40px 35px 0;
  }
</style>
