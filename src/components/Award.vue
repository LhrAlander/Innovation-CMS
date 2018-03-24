<template>
  <div class="awards">
    <el-row :gutter="100">
      <el-col :span="12">
        <left-award
        v-for="(item, index) in teams"
        :key="item.teamId"
        v-if="index % 2 == 0"
        :team='item'></left-award>
      </el-col>
      <el-col :span="12">
       <left-award
        v-for="(item, index) in teams"
        :key="item.teamId"
        v-if="index % 2 != 0"
        :team='item'></left-award>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftAward from "./LeftAward";
import RightAward from "./RightAward";
import axios from '@/utils/https'
export default {
  components: {
    LeftAward,
    RightAward
  },
  mounted() {
     axios
      .get("/api/front/index/teams")
      .then(res => {
        this.teams = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  data() {
    return {
      teams: []
    }
  }
};
</script>

<style scoped>
.awards {
  padding: 40px 35px 0;
}
</style>
