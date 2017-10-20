<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader'
  import MyFooter from 'components/MyFooter'
  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style>
</style>
