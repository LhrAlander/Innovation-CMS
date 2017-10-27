<template>
  <div class="img-wrap">
    <img src="../assets/img/Test.png" alt="teamImg">
    <div class="team-name">
      Team name
    </div>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped>
  .img-wrap {
    position: relative;
    outline: .5rem solid #ddd;
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    height: 100px
  }

  .team-name {
    position: relative;
    width: 100%;
    height: 45px;
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 35px;
    text-align: center;
    margin-top: -45px;
    background: hsla(0,0%,100%,.3);
    overflow: hidden;
  }

  .team-name:before {
    content: "";
    z-index: 2;
    position: absolute;
    top: 0; left: 0;
    bottom: 0;
    right: 0;
    filter: blur(20px);
    margin: -30px;
  }

</style>
