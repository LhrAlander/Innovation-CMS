<template>
  <el-row class="announcement-wrapper">
    <el-col class="date-col" :span="4">
      <h5 class="date">{{announcement.date}}</h5>
      <span class="separate">|</span>
    </el-col>
    <el-col class="announcement-item-col" :span="20">
      <el-row class="announcement-item" :key='item.id' v-for="item in announcement.items"><span @click="itemDetail(item.id)">{{item.title}}</span></el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    announcement: Object
  },
  methods: {
    itemDetail(id) {
      console.log(this.announcement)
      this.$router.push(`/notificationsDetail/${id}`)
    }
  }
};
</script>

<style scoped>
.el-row.announcement-wrapper {
  flex: 1;
  /*text-overflow:ellipsis;*/
  overflow: hidden;
  /*white-space:nowrap;*/
}

h5,
span,
p {
  display: inline-block;
}

span.separate {
  padding: 0 0.4rem;
}

.el-row.announcement-item {
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
</style>
