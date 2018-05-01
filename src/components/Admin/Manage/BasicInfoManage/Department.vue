<!--院系管理-->
<template>
  <div class="wrapper" ref='wrapper'>
    <el-row gutter="100">
      <!--学院展示-->
      <el-col :span="8" class="display-block department">
        <div class="title-wrapper">
          <span class="title">学院</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>
        <div class="cnt-wrapper">
          <div class="academy-cnt">
            <div class="display-item department-item" v-for="a in this.data" :key='a.academy' :class="{active: a.academy == selectedAcademy}" @click="selectAcademy(a)">
              <span class="item-name department-name">{{a.academy}}</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit" @click='editAcademy(a.academy)'>&#xe8af;</i>
                  <i class="iconfont icon-del" @click='delAcademy(a.academy)'>&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini" @click='addAcademy'>添加</el-button>
          </div>
        </div>
      </el-col>
      <!--专业展示-->
      <el-col :span="8" class="display-block major">
        <div class="title-wrapper">
          <span class="title">专业</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>
        <div class="cnt-wrapper">
          <div class="major-cnt">
            <div class="display-item department-item" v-for="m in nMajor" :key='m' :class="{active: m == selectedMajor}" @click="selectedMajor = m">
              <span class="item-name department-name">{{m}}</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-edit" @click='editMajor(m)'>&#xe8af;</i>
                  <i class="iconfont icon-del" @click='delMajor(m)'>&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini" @click="addMajor">添加</el-button>
          </div>
        </div>
      </el-col>
      <!--班级展示-->
      <el-col :span="8" class="display-block class">
        <div class="title-wrapper">
          <span class="title">班级</span>
          <i class="iconfont arrow">&#xe863;</i>
        </div>
        <div class="cnt-wrapper">
          <div class="class-cnt">
            <div class="display-item department-item" v-for="c in nClass" :key='c'>
              <span class="item-name department-name">{{c}}</span>
              <div class="icon-wrapper department-icon-wrapper">
                <div class="icon-cnt">
                  <i class="iconfont icon-del" @click="delClass(c)">&#xe608;</i>
                </div>
              </div>
            </div>
            <el-button class="add-btn" type="success" size="mini" @click="addClass">添加</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "@/utils/https";
export default {
  data() {
    return {
      data: [],
      selectedAcademy: "",
      selectedMajor: "",
      selectedClass: ""
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData(a, m) {
      axios
        .get("/api/baseInfo/academys")
        .then(res => {
          this.data = res.data.data;
          this.selectedAcademy = a || this.data[0].academy;
          this.selectedMajor = m || this.data[0].majors[0].major;
          this.$nextTick(function () {
            let wrapper = this.$refs.wrapper
            this.$emit('changeHeight', wrapper.getBoundingClientRect())
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeHeight() {
      const wrapper = this.$refs.wrapper;
    },
    editAcademy(academy) {
      this.$prompt("修改学院名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: academy
      })
        .then(({ value }) => {
          if (value == null || value == undefined) {
            value = academy;
          }
          axios
            .post("/api/baseInfo/change/academy", {
              old: academy,
              _new: value
            })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                res = res.data;
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                   let selectedAcademy = this.selectedAcademy
                  let selectedClass = this.selectedClass
                  let selectedMajor = this.selectedMajor
                  this.initData(selectedAcademy, selectedMajor);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    editMajor(major) {
      console.log(major);
      this.$prompt("修改专业名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: major
      })
        .then(({ value }) => {
          if (value == null || value == undefined) {
            value = major;
          }
          if (value == major) return;
          axios
            .post("/api/baseInfo/change/major", {
              old: major,
              _new: value
            })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                res = res.data;
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  let selectedAcademy = this.selectedAcademy
                  let selectedClass = this.selectedClass
                  let selectedMajor = this.selectedMajor
                  this.initData(selectedAcademy, selectedMajor);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    delAcademy(academy) {
      axios
        .post("/api/baseInfo/delete/academy", {
          academy
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delMajor(major) {
      axios
        .post("/api/baseInfo/delete/major", {
          major: major,
          academy: this.selectedAcademy
        })
        .then(res => {
          console.log(res);
          let selectedAcademy = this.selectedAcademy;
          let selectedClass = this.selectedClass;
          let selectedMajor = this.selectedMajor;
          this.initData(selectedAcademy, selectedMajor);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delClass(c) {
      axios
        .post("/api/baseInfo/delete/class", {
          major: this.selectedMajor,
          _class: c
        })
        .then(async res => {
          console.log(res);
          let selectedAcademy = this.selectedAcademy;
          let selectedMajor = this.selectedMajor;
          console.log(selectedAcademy, selectedMajor)
          this.initData(selectedAcademy, selectedMajor);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAcademy() {
      this.$prompt("添加学院", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null || value == undefined) {
            return;
          }
          axios
            .post("/api/baseInfo/add/academy", {
              academy: value
            })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                res = res.data;
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  let selectedAcademy = this.selectedAcademy;
                  let selectedClass = this.selectedClass;
                  let selectedMajor = this.selectedMajor;
                 this.initData(selectedAcademy, selectedMajor);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    addMajor() {
      this.$prompt("添加专业", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null || value == undefined) {
            return;
          }
          axios
            .post("/api/baseInfo/add/major", {
              major: value,
              academy: this.selectedAcademy
            })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                res = res.data;
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  let selectedAcademy = this.selectedAcademy;
                  let selectedClass = this.selectedClass;
                  let selectedMajor = this.selectedMajor;
                  this.initData(selectedAcademy, selectedMajor);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    addClass() {
      this.$prompt("添加班级", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null || value == undefined) {
            return;
          }
          axios
            .post("/api/baseInfo/add/class", {
              major: this.selectedMajor,
              _class: value
            })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                res = res.data;
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  let selectedAcademy = this.selectedAcademy;
                  let selectedClass = this.selectedClass;
                  let selectedMajor = this.selectedMajor;
                  this.initData(selectedAcademy, selectedMajor);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    selectAcademy(academy) {
      this.selectedAcademy = academy.academy;
      this.selectedMajor = academy.majors[0].major;
    }
  },
  computed: {
    nMajor() {
      let majors = [];
      for (let i = 0; i < this.data.length; i++) {
        let academy = this.data[i];
        if (academy.academy == this.selectedAcademy) {
          majors = academy.majors.map(m => {
            return m.major;
          });
        }
      }
      return majors;
    },
    nClass() {
      let classes = [];
      for (let i = 0; i < this.data.length; i++) {
        let academy = this.data[i];
        let majors = [];
        if (academy.academy == this.selectedAcademy) {
          majors = academy.majors;
          for (let j = 0; j < majors.length; j++) {
            if (this.selectedMajor == majors[j].major) {
              classes = majors[j].classes.map(c => {
                return c.class;
              });
            }
          }
        }
      }
      return classes;
    }
  }
};
</script>
<style scoped>
.wrapper,
div.icon-wrapper,
div.icon-wrapper .icon-cnt {
  position: relative;
}

.wrapper {
  padding: 40px 50px;
}

.display-block .title-wrapper .title {
  font-size: 1.4rem;
  font-weight: bold;
}

.display-block .title-wrapper .arrow {
  font-size: 1.3rem;
  float: right;
  line-height: 1.7rem;
}

.display-block .cnt-wrapper {
  padding: 2rem 0 0 0.5rem;
}

.academy-cnt,
.department-cnt,
.major-cnt,
.class-cnt {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

div.display-item {
  display: flex;
  min-height: 35px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 1rem 0 1rem 0.5rem;
  border-bottom: 1px solid #ccc;
}

div.display-item:hover {
  background-color: #ccc;
}

div.display-item.active {
  background-color: #ccc;
}

/*设置条目中两个按钮的出现与消失*/
div.icon-wrapper .icon-cnt {
  left: 100%;
  display: none;
}

div.display-item:hover div.icon-wrapper .icon-cnt {
  display: block;
  left: 0;
}

/*设置条目中按钮的样式*/
.icon-edit,
.icon-del {
  cursor: pointer;
  font-size: 1.8rem;
  border-radius: 5px;
  margin-right: 5px;
}

.icon-edit:hover {
  background-color: #67c23a;
}

.icon-del:hover {
  background-color: #fa5555;
}

.display-item .item-name {
  font-size: 1.2rem;
}

.add-btn {
  margin: 1rem;
}
</style>
