<template>
  <div class="project-content">
    <header>
      <router-link :to='projectDetail'>
        <span class="title">{{project.projectName}}</span>
      </router-link>
      <span class="team"> <img src="/static/img/card.png" alt="card" class="icon icon-card"> <span class="team-name">{{project.teamName}}</span></span>
    </header>
    <main>
      <img src="/static/img/defaultProject.png" alt="project" class='project-img'>
      <span class="detail">
          {{project.introduce}}
      </span>
    </main>
  </div>
</template>
<script>
export default {
  props: {
    project: Object
  },
  computed: {
    projectDetail () {
      return `/projectdetail/${this.project.projectId}`
    }
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
  color: #454545;
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
