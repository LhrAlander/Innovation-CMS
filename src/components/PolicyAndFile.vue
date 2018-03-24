<template>
  <div class="post-wrapper">
    <router-link to="/">
      <el-row>
        <el-col :span="24"  class="cnt">
          <i class="iconfont file">&#xe64f;</i>
          {{policy.title}}
        </el-col>
      </el-row>
    </router-link>
  </div>
</template>

<script>
import axios from "@/utils/https";
export default {
  props: {
    policy: Object
  }
};
</script>

<style scoped>
i.file {
  font-size: 1.4rem;
  margin-right: 0.4rem;
}

.cnt {
  color: #000;
  font-size: 1.3rem;
  margin-bottom: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
