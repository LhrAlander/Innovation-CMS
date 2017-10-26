<template>
  <div class="container">
    <admin-head></admin-head>
    <div class="wrap">
      <vertical-menu></vertical-menu>
      <AdminContent></AdminContent>
    </div>
  </div>
</template>
<script>
  import AdminHead from  '@/components/Admin/AdminHead'
  import VerticalMenu from '@/components/Admin/VerticalMenu'
  import AdminContent from '@/components/Admin/AdminContent'

  export default {
    components: {
      VerticalMenu,
      AdminHead,
      AdminContent
    }
  }
</script>
<style scoped>
  .container {
    height: 100%;
  }
  .wrap {
    position: absolute;
    width: 100%;
    top: 61px;
    bottom: 0;
  }

</style>
