<template>
    <el-dialog
      title="请填写筛选信息"
      :visible.sync = "visible"
      @close = "handleCancel"
      :modal = "false"
      :close-on-click-modal = "false"
      >
      <el-form :model = "filter">

          <el-input v-model="filter.username" placeholder="用户名" class="filter-input"></el-input>
        <el-input v-model="filter.name" placeholder="姓名" class="filter-input"></el-input>
        <el-select v-model="filter.role" clearable placeholder="用户类别" class="filter-select">
          <el-option v-for="item in roleOptions"
                     :key = "item.value"
                     :label = "item.label"
                     :value = "item.value">
          </el-option>
        </el-select>
        <el-select v-model="filter.status" clearable placeholder="用户状态" class="filter-select">
          <el-option v-for="item in statusOptions"
                     :key = "item.value"
                     :label = "item.label"
                     :value = "item.value">
          </el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleDetermine">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
  import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    props: ["dialogVisible"],
    data() {
      return {
        visible: this.dialogVisible,
        filter: {//搜索条件
          username: '',
          name: '',
          role: '',
          status: ''
        },
        roleOptions: [{
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '学生'
        }, {
          value: 2,
          label: '老师'
        }, {
          value: 3,
          label: '企业'
        }],
        statusOptions: [{
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '可用'
        }, {
          value: 2,
          label: '禁用'
        }, {
          value: 3,
          label: '待审核'
        }],
      }
    },
    methods: {
      handleCancel() {
        this.$emit("sendFilter");
        this.visible = false;
      },
      handleDetermine() {
        this.$emit("sendFilter", this.filter);
        this.visible = false;
      }
    },
    components: {
      ElFormItem,
      ElForm,
      ElDialog},
    watch: {
      dialogVisible(val) {
        this.visible = val;
      }
    }
  }
</script>
<style scoped>
  .filterbox {

  }
  .filter-input, .filter-select {
    width: 25%;
    margin-left: 2%;
    margin-top: 1%;
  }
</style>
