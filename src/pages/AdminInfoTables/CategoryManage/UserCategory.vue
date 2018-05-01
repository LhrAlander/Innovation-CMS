<template>
  <categroy
  title="用户类别管理"
  :breadCrumbs="breadCrumbs"
  :exists="exists"
  :addInfo="addInfo"
  :toDelete="toDelete"
  :deleteInfo="deleteInfo"
  :toAdd="toAdd">
    <el-button type="danger" plain class="delBtn" @click="del" slot="delBtn">删除分类</el-button>
    <el-button type="primary" plain class="addOneBtn" @click="addOne" slot="addOneBtn">添加一个分类</el-button>
    <el-button type="primary" plain class="delBtn" @click="submitAdd" slot="addAllBtn">确定添加</el-button>
  </categroy>
</template>

<script>
import Categroy from "components/Admin/InfoOperate/Category/CategoryTemp";
import API from "@/api/categoryApi";
const TODLETE = false;
export default {
  components: {
    Categroy
  },

  data() {
    return {
      breadCrumbs: {
        iconCode: "&#xe6a0;",
        firstLevel: "用户管理",
        otherLevels: ["用户类别管理"]
      },
      exists: {
        iconCode: "&#xe61e;",
        title: "已有用户类别",
        categories: []
      },
      deleteInfo: {
        iconCode: "&#xe604;",
        title: "删除选项展示"
      },
      addInfo: {
        iconCode: "&#xe607;",
        title: "添加用户类别"
      },
      addCategories: []
    };
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    toDelete() {
      let toDelete = [];
      this.exists.categories.forEach(item => {
        if (item.status) toDelete.push(item);
      });
      return toDelete;
    },
    toAdd() {
      let effective = [];
      this.addCategories.forEach(item => {
        if (item.status) effective.push(item);
      });
      return effective;
    }
  },
  methods: {
    // 获取初始化数据
    getCategories() {
      API.getAllUserCategories()
        .then(res => {
          res = res.data;
          console.log(this.exists.categories);
          this.exists.categories = [];
          let _categories = this.exists.categories;
          res.data.forEach(function(category) {
            console.log(category);
            _categories.push({
              label: category.user_identity_name,
              status: TODLETE
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addOne() {
      this.$prompt("请输入类别", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.addCategories.push({
            label: value,
            status: true
          });
        })
        .catch(() => {});
    },
    submitAdd() {
      let effective = [];
      let success = true;

      this.addCategories.forEach(item => {
        if (item.status) {
          effective.push(item);
        }
      });
      this.addCategories = effective;

      this.$confirm("是否确认添加分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning",
        beforeClose: function(action, instance, done) {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "添加中...";
            // 封装数据
            let postData = [];
            effective.forEach(function(obj) {
              postData.push(obj.label);
            });
            API.deleteUserCategory({ categories: postData })
              .then(res => {
                if (res.data.code != 200) {
                  return new Error("删除错误");
                }
                return API.addUserCategory({ categories: postData });
              })
              .then(res => {
                if (res.data.code != 200) {
                  success = false;
                }
                instance.confirmButtonLoading = false;
                done();
              })
              .catch(err => {
                console.log(err);
                success = false;
                instance.confirmButtonLoading = false;
              });
          } 
          else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      })
        .then(() => {
          let message = "添加类别失败";
          let type = "error";
          if (success) {
            type = "success";
            message = "添加成功!";
            effective.forEach(item => (item.status = false));
            this.exists.categories = this.exists.categories.concat(effective);
          }
          this.$message({
            type: type,
            message: message
          });

          this.addCategories = [];
          this.getCategories()
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    del() {
      let delItems = this.toDelete;
      let success = false;
      this.$confirm("是否确认删除分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            // TODO
            let postData = [];
            for (let i = 0; i < this.toDelete.length; i++) {
              postData.push(this.toDelete[i].label);
            }
            API.deleteUserCategory({ categories: postData })
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  success = true;
                }
                instance.confirmButtonLoading = false;
                done();
              })
              .catch(err => {
                console.log(err);
                instance.confirmButtonLoading = false;
                success = false
                done();
              });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      })
        .then(() => {
          let message = "删除类别失败";
          let type = "error";
          if (success) {
            type = "success";
            message = "删除成功!";
            delItems.forEach(item => {
              let index = this.exists.categories.indexOf(item);
              console.log(index);
              this.exists.categories.splice(index, 1);
            });
          }
          this.$message({
            type: type,
            message: message
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.delBtn {
  float: right;
}

.addOneBtn {
  margin: 1rem;
}
</style>
