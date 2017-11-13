<template>
  <el-dialog
    title="请添加信息"
    :visible.sync = "show"
    @close = "handleCancel"
    :modal = "false"
    :close-on-click-modal = "false"
    center
  >
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-col :span="12" v-for="(value, key, index) in tmpl" :key="index">
        <el-form-item :label="value.label" prop="key" >
          <el-input v-if="value.inputType === 0" v-model="form[key]" :placeholder="placeholderFilter(value.inputType, value.label)"></el-input>
          <el-select v-else-if="value.inputType === 1" v-model="form[key]" clearable :placeholder="placeholderFilter(value.inputType, value.label)" class="infoadd-select">
            <el-option v-for="item in valueLabelMap[key]"
                       :key = "item.value"
                       :label = "item.label"
                       :value = "item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
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
  import ElCol from "element-ui/packages/col/src/col";
  import {resetObject} from "utils/utils"

  export default {
    props: ["show","tmpl","valueLabelMap"],
    data() {
      return {
        form: {},
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      reset() {
        this.form = resetObject(this.form);
      },
      handleCancel() {
        this.$emit("sendInfo");
        this.visible = false;
        this.reset();
      },
      handleDetermine() {
        this.$emit("sendInfo", this.form);
        this.visible = false;
        this.reset();
      },
      placeholderFilter: function(type, label) {
        var str = '';
        switch (type) {
          case 0:
            str = "请输入";
            break;
          case 1:
            str = "请选择";
            break;
          default:
        }
        str = str + label;
        return str;
      }
    },
    components: {
      ElCol,
      ElFormItem,
      ElForm,
      ElDialog},
    watch: {
    },
  }
</script>
<style scoped>
  .infoaddbox {

  }
  /*.infoadd-input, .infoadd-select {*/
    /*width: 50%;*/
    /*margin-left: 2%;*/
    /*margin-top: 1%;*/
  /*}*/
  .el-form-item__label {
    width: 4rem !important;
    display: inline-block !important;
  }
</style>
