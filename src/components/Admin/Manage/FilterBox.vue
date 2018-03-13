<template>
    <el-dialog
      class="dialog"
      title="请填写筛选信息"
      :visible.sync = "visible"
      @close = "handleCancel"
      :modal = "false"
      :close-on-click-modal = "false"
      >
      <el-form :inline="true" ref="form" :model="filter" label-width="9rem">
        <el-row>
          <el-col :span="12" v-for="(value, key, index) in tmpl" :key="index">
          <el-form-item :label="value.label" :prop="key" >
            <el-input 
              v-if="value.inputType === 0" 
              v-model="filter[key]" 
              :placeholder="placeholderFilter(value.inputType, value.label)">
            </el-input>
            <el-select 
              v-else-if="value.inputType === 1" 
              v-model="filter[key]" 
              clearable 
              :placeholder="placeholderFilter(value.inputType, value.label)" 
              class="infoadd-select"
              :disabled="value.disabled"
              @change="handleSelectChange(filter[key], value)"
              @clear="handleClear(value)">
              <el-option v-for="item in valueLabelMap[key]"
                         :key = "item.value"
                         :label = "item.label"
                         :value = "item.value">
              </el-option>
            </el-select>
            <el-date-picker v-else-if="value.inputType === 2"
                            style="width: 11.5rem"
                            v-model="filter[key]"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="datePickerOptions">
            </el-date-picker>
            <el-date-picker
              v-else-if="value.inputType === 3"
              v-model="filter[key]"
              align="right"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
              clearable>
            </el-date-picker>
            <el-cascader
              v-else-if="value.inputType === 4"
              expand-trigger="hover"
              :options="value.options"
              :show-all-levels="false"
              v-model="filter[key]">
            </el-cascader>
          </el-form-item>
        </el-col>
        </el-row>
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

export default {
  props: [
    "dialogVisible",
    "filter",
    "tmpl",
    "valueLabelMap",
    "keyFormatMap",
    "options"
  ],
  data() {
    return {
      visible: this.dialogVisible,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  computed: {},
  methods: {
    handleCancel() {
      // this.$emit("sendFilter");
      this.visible = false;
    },
    handleDetermine() {
      this.$emit("sendFilter", this.filter);
      this.visible = false;
    },
    placeholderFilter: function(type, label) {
      var str = "";
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
    },
    handleSelectChange () {
      console.log('change')
      this.$emit('inputChange', arguments[0], arguments[1])
    },
    handleClear(res) {
      console.log('clear')
      this.$emit('inputClear', res.label)
    }
  },
  components: {
    ElCol,
    ElFormItem,
    ElForm,
    ElDialog
  },
  watch: {
    dialogVisible(val) {
      console.log('筛选框可见状态改变',val)
      this.visible = val;
    }
  }
};
</script>
<style scoped>
.col {
  margin-bottom: 10px;
}
.filter-input,
.filter-select {
  width: 50%;
  margin-left: 2%;
  margin-top: 1%;
}
.el-dialog {
}
.footer {
  display: block;
}
</style>
<style>
.el-dialog {
  padding-bottom: 40px;
}
</style>
