<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader'
export default {
  components: {
      MyHeader
  }
}
</script>

<style>
</style>
