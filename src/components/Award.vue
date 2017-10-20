<template>
  <div class="awards">
    <template v-for="item in 4">
      <left-award v-if="item % 2 != 0"></left-award>
      <right-award v-if="item % 2 == 0"></right-award>
    </template>
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
