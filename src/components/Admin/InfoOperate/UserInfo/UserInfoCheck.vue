<!--基本用户信息查看模板-->
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
             :span="block.items[getItemIndex(rowIndex, colIndex)].span * 8" 
             class="info-item" 
             v-for="colIndex in 3" 
             :key="colIndex" 
             v-if="block.items[getItemIndex(rowIndex, colIndex)] != null">
              <span class="item-name">{{ block.items[getItemIndex(rowIndex, colIndex)].name }}</span>

              <div class="item-content">
                <el-input disabled v-model="block.items[getItemIndex(rowIndex, colIndex)].value"></el-input>
              </div>
            </el-col>
          </el-row>
        </span>
    </div>


  </div>
</template> 

<script>
import InfoDisplayTemp from "../BaseCompent/InfoDisplayTemp";

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
  components: {
    InfoDisplayTemp
  },
  methods: {
    getRowCount(arr) {
      return Math.ceil(arr.length / 3);
    },
    getItemIndex(rowIndex, colIndex) {
      return (rowIndex - 1) * 3 + colIndex - 1;
    },
    btnFunc(item) {
      switch (item.clickFunName) {
        case "resetPWD":
          this.resetPWD();
          break;
      }
    },
    confirmClick() {
      this.$emit("confirmClick");
    },
    resetPWD() {
      this.$confirm("是否重置该用户密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            this.submitModify().then(function() {
              instance.confirmButtonLoading = false;
              done();
            });
          } else {
            console.log("else");
            done();
          }
        }
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置密码成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
        });
    },
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
  background-color: #fff;
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
