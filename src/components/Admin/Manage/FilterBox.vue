<template>
    <el-dialog
      title="请填写筛选信息"
      :visible.sync = "visible"
      @close = "handleCancel"
      :modal = "false"
      :close-on-click-modal = "false"
      center
      >
      <el-row>
        <el-col :span="12" v-for="(value,key,index) in filter" :key="index" class="col">
          <span style="width: 8rem; display: inline-block;transform: translateY(5px)">
            <span style="float: right;">{{keyFormatMap[key]}}</span>
          </span>
          <el-input v-if="isInput(key)" v-model="filter[key]" :placeholder="placeholderFilter(key)" class="filter-input"></el-input>
          <el-select v-else v-model="filter[key]" clearable :placeholder="placeholderFilter(key)" class="filter-select">
            <el-option v-for="item in valueLabelMap[key]"
                       :key = "item.value"
                       :label = "item.label"
                       :value = "item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
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

  export default {
    props: ["dialogVisible","filter","valueLabelMap", "keyFormatMap"],
    data() {
      return {
        visible: this.dialogVisible,
      }
    },
    computed: {
    },
    methods: {
      handleCancel() {
        this.$emit("sendFilter");
        this.visible = false;
      },
      handleDetermine() {
        this.$emit("sendFilter", this.filter);
        this.visible = false;
      },
      isInput: function (type) { // 如果在valueLabelMap中没有type类，则type为input类型
        return this.valueLabelMap[type] === undefined;
      },
      placeholderFilter: function(key) {
        var str = '';
        if (this.isInput(key)) {
          str = "请输入";
        } else {
          str = "请选择";
        }
        str = str + this.keyFormatMap[key];
        return str;
      }
    },
    components: {
      ElCol,
      ElFormItem,
      ElForm,
      ElDialog},
    watch: {
      dialogVisible(val) {
        this.visible = val;
      }
    },
  }
</script>
<style scoped>
  .col {
    margin-bottom: 10px;
  }
  .filter-input, .filter-select {
    width: 50%;
    margin-left: 2%;
    margin-top: 1%;
  }
</style>
