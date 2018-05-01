<!--基本用户信息编辑模板-->
<template>
  <div class="admin-check-info-wrapper">

    <h1 class="title">{{ title }}</h1>

    <div class="mode-crumb-box">
      <div class="breadcrumb">
        <i class="iconfont" v-html="breadCrumbs.iconCode"></i>
        {{ breadCrumbs.firstLevel}}&nbsp; >&nbsp;<template v-for="level in breadCrumbs.otherLevels">{{ level }}</template>
      </div>
      <div class="btn-wrapper">
        <slot name="header-btn-wrapper"></slot>
      </div>
    </div>

    <div class="info-wrapper" v-for="block in displayInfo" :key='block'>
        <span class="info-title">
          <i class="iconfont box" v-html="block.iconCode"></i>
          {{ block.infoTitle }}
          <el-row :gutter="200" class="info-content" v-for="rowIndex in getRowCount(block.items)" :key="rowIndex">
             <el-col 
             :span="block.items[getItemIndex(rowIndex, colIndex)].span * 8" class="info-item" 
             v-for="colIndex in 3" 
             :key='colIndex' 
             v-if="block.items[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ block.items[getItemIndex(rowIndex, colIndex)].name }}</span>
              <div class="item-content">
              <info-display-temp @clickBtn="btnFunc(block.items[getItemIndex(rowIndex, colIndex)])" :item="block.items[getItemIndex(rowIndex, colIndex)]" @selectChange='selectChange'></info-display-temp>
                <!--{{ block.items[getItemIndex(rowIndex, colIndex)].value }}-->
              </div>
            </el-col>
          </el-row>
        </span>
    </div>


  </div>
</template>

<script>
import InfoDisplayTemp from "../BaseCompent/InfoDisplayTemp";
import axios from "@/utils/https";

const INPUT = 1;
const SELECT = 2;
const RADIO = 3;
const SWITCH = 4;
const BUTTON = 5;

export default {
  props: {
    title: String,
    breadCrumbs: Object,
    displayInfo: Array
  },
  data() {
    return {
      selectedAcademy: "",
      selectedMajor: "",
      data: []
    };
  },
  components: {
    InfoDisplayTemp
  },
  mounted() {
    if (this.title == "学生信息查看") {
      axios
        .get("/api/baseInfo/academys")
        .then(res => {
          this.data = res.data.data;
          this.selectedAcademy = this.displayInfo[1].items[0].value
          this.selectedMajor = this.displayInfo[1].items[1].value;
          this.changeAcademyOptions()
          this.changeMajorOptions()
          this.changeClassOptions()
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    changeAcademyOptions() {
      let options = this.data.map(a => {
        return {
          label: a.academy,
          value: a.academy
        }
      })
      this.displayInfo[1].items[0].options = options
    },
    changeMajorOptions() {
      let majors = this.nMajor()
      this.displayInfo[1].items[1].options = majors.map(m => {
        return {
          label: m,
          value: m
        }
      })
    },
    changeClassOptions() {
      let classes = this.nClass()
      this.displayInfo[1].items[2].options = classes.map(c => {
        return {
          label: c,
          value: c
        }
      })
    },
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
    },
    selectChange(value) {
      if (value.name == '学院') {
        this.selectedAcademy = value.value
        this.changeMajorOptions()
        this.displayInfo[1].items[1].value = this.displayInfo[1].items[1].options[0].value
        this.displayInfo[1].items[2].value = this.displayInfo[1].items[2].options[0].value
        this.selectedMajor = this.displayInfo[1].items[1].value
        this.changeClassOptions()
      }
      if (value.name == '专业') {
        this.selectedMajor = value.value
        this.changeClassOptions()
        this.displayInfo[1].items[2].value = this.displayInfo[1].items[2].options[0].value
      }
    },
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    btnFunc(item) {
      switch (item.clickFunName) {
        case "resetPWD":
          this.$emit("resetPWD");
          break;
      }
    },
    confirmClick() {
      this.$emit("confirmClick");
    },
    resetPWD() {},
    goModifyMode() {
      this.$emit("goModifyMode");
    },
    goCheckMode() {
      this.$emit("goCheckMode");
    }
  }
};
</script>

<style scoped>
.admin-check-info-wrapper {
  /*background-color: #ECF0F1;*/
  background-color: #fff;
  height: 100%;
  padding: 1.4rem 5rem;
}

.mode-crumb-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  display: block;
  text-align: center;
  font-size: 1.7rem;
  padding-bottom: 1.4rem;
  border-bottom: 0.3rem solid #cbcbcb;
}

.breadcrumb {
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #2a3f54;
  display: inline-block;
}

.breadcrumb .iconfont {
  font-size: 1.5rem;
  margin-right: 0.3rem;
}

.info-wrapper {
  padding: 2rem 3rem;
}

.info-title {
  font-size: 1rem;
  color: #2a3f54;
  font-weight: bold;
}

.iconfont.box {
  font-weight: normal;
  margin-right: 0.3rem;
}

.el-row.info-content {
  margin: 1.5rem 0;
}

.el-input {
  background-color: #ffff00;
  font-size: 0.9rem;
}

.info-item {
  display: flex;
  align-items: center;
}

.item-name {
  font-size: 1rem;
  width: 5rem;
  margin-right: 1rem;
}

.item-content {
  flex: 1;
}
</style>
