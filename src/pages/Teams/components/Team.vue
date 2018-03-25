<template>
  <div class="project-content">
    <header>
      <span class="title">{{team.teamName}}</span>
      <span class="team"> <span class="team-name">更多 >></span></span>
    </header>
    <main>
      <img src="/static/img/defaultProject.png" alt="team" class='project-img'>
      <span class="detail">
          {{team.introduction}}
      </span>
    </main>
  </div>
</template>
<script>
export default {
  props: {
    team: Object
  }
};
</script>
<style scoped>
.project-content {
  width: 300px;
  height: 180px;
}

.icon-card {
  width: 22px;
  height: 22px;
}

header {
  height: 30px;
  border-bottom: 2px solid #5394C5;
  display: flex;
  justify-content: space-between;
}

header .title {
  font-size: 16px;
}

header .team {
  padding-top: 2px;
  font-size: 14px;
  display: flex;
  align-content: flex-start;
}

header .team img {
  margin-right: 7px;
  margin-top: -2px;
}

main {
  padding-top: 20px;
  height: 128px;
  overflow: hidden;
  font-size: 15px;
}

.project-img {
  width: 125px;
  height: 70px;
  margin-bottom: 10px;
  margin-right: 10px;
  float: left;
}

span.detail {
    position:relative;
    line-height: 18px;
    max-height: 128px;
    overflow:hidden;
}
</style>
