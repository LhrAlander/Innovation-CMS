<template>
  <div class="container">
    <admin-head></admin-head>
    <div class="wrap">
      <vertical-menu ref="left" :hight=height></vertical-menu>
      <AdminContent ref="right" @changeHeight='changeHeight'></AdminContent>
    </div>
  </div>
</template>
<script>
import AdminHead from "@/components/Admin/AdminHead";
import VerticalMenu from "@/components/Admin/VerticalMenu";
import AdminContent from "@/components/Admin/AdminContent";

export default {
  components: {
    VerticalMenu,
    AdminHead,
    AdminContent
  },
  data() {
    return {
      height: 0
    }
  },
  methods: {
    changeHeight(value) {
      const left = this.$refs.left
      const right = this.$refs.right
      let height = value.height
      this.height = height
      left.changeHeight(height)
    }
  }
};
</script>
<style scoped>
.container {
  min-height: 100%;
}
.wrap {
  position: absolute;
  width: 100%;
  top: 61px;
  bottom: 0;
}
</style>
