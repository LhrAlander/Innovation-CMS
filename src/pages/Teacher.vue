<template>
  <div class="container">
    <teacher-head></teacher-head>
    <div class="wrap">
      <vertical-menu></vertical-menu>
      <TeacherContent></TeacherContent>
    </div>
  </div>
</template>
<script>
  import TeacherHead from  '@/components/Teacher/TeacherHead'
  import VerticalMenu from '@/components/Teacher/VerticalMenu'
  import TeacherContent from '@/components/Teacher/TeacherContent'

  export default {
    components: {
      VerticalMenu,
      TeacherHead,
      TeacherContent
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
