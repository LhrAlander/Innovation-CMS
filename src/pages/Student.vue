<template>
  <div class="container">
    <student-head></student-head>
    <div class="wrap">
      <vertical-menu></vertical-menu>
      <StudentContent></StudentContent>
    </div>
  </div>
</template>
<script>
  import StudentHead from  '@/components/Student/StudentHead'
  import VerticalMenu from '@/components/Student/VerticalMenu'
  import StudentContent from '@/components/Student/StudentContent'

  export default {
    components: {
      VerticalMenu,
      StudentHead,
      StudentContent
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
