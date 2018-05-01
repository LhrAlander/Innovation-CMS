<template>
  <el-carousel :interval="5000" arrow="outside" indicatorPosition="none">
    <el-carousel-item>
      <img src="/static/img/carousel1.jpg" alt="carousel1">
    </el-carousel-item>
    <el-carousel-item>
      <img src="/static/img/carousel2.jpg" alt="carousel1">
    </el-carousel-item>
    <el-carousel-item>
      <img src="/static/img/carousel3.jpg" alt="carousel1">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {}
</script>

<style scoped>
  .el-carousel {
    width: 100%;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

</style>
