<template>
  <router-link :to="href">
    <div>
      <i class="iconfont icon" v-html="iconCode"></i>
      <h2 class="cnt" v-html="itemName">校园网站</h2>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      href: String,
      iconCode: String,
      itemName: String
    }
  }
</script>

<style scoped>
  div {
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    color: #5c99c8;
    font-size: 4rem;
    margin-bottom: 15px;
  }
</style>
