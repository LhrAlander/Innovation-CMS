<template>
  <el-dialog
    title="请添加信息"
    :visible.sync = "show"
    @close = "handleCancel"
    :modal = "false"
    :close-on-click-modal = "false"
  >
    <el-form :inline="true" ref="form" :model="form" label-width="9rem" :rules = "rules">
      <el-row>
        <el-col :span="12" v-for="(value, key, index) in tmpl" :key="index">
          <el-form-item :label="value.label" :prop="key" >
            <el-input v-if="value.inputType === 0" v-model="form[key]" :placeholder="placeholderFilter(value.inputType, value.label)"></el-input>
            <el-select v-else-if="value.inputType === 1" v-model="form[key]" clearable :placeholder="placeholderFilter(value.inputType, value.label)" class="infoadd-select">
              <el-option v-for="item in valueLabelMap[key]"
                         :key = "item.value"
                         :label = "item.label"
                         :value = "item.value">
              </el-option>
            </el-select>
            <el-date-picker v-else-if="value.inputType === 2"
                            style="width: 11.5rem"
                            v-model="form[key]"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            clearable
                            :picker-options="datePickerOptions">
            </el-date-picker>
            <el-date-picker
              v-else-if="value.inputType === 3"
              v-model="form[key]"
              align="right"
              type="year"
              placeholder="选择年"
              clearable>
            </el-date-picker>
            <el-cascader
              v-else-if="value.inputType === 4"
              expand-trigger="hover"
              :options="value.options"
              :show-all-levels="false"
              v-model="form[key]">
            </el-cascader>
            <!--<el-input-->
              <!--v-else-if="value.inputType === 97"-->
              <!--type="textarea"-->
              <!--autosize-->
              <!--placeholder="请输入内容"-->
              <!--v-model="form[key]">-->
            <!--</el-input>-->
            <!--<el-upload-->
              <!--v-else-if="value.inputType === 98"-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--:on-preview="handlePreview"-->
              <!--:on-remove="handleRemove"-->
              <!--multiple-->
              <!--:limit="3"-->
              <!--:on-exceed="handleExceed"-->
              <!--:file-list="fileList"-->
              <!--style="width: 12rem;">-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--</el-upload>-->
            <el-input
              v-else-if="value.inputType === 99"
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="form[key]">
            </el-input>
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
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    props: ["show","tmpl","valueLabelMap","rules","options"],
    data() {
      return {
        form: {},
        datePickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        ]
      }
    },
    created() {
//      console.log(this.rules)
    },
    computed: {
    },
    methods: {
      handleCancel() {
        // this.$emit("sendInfo");
        this.visible = false;
        this.$refs.form.resetFields();
      },
      handleDetermine() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let _form = JSON.parse(JSON.stringify(this.form))
            this.$emit("sendInfo", _form);
            this.visible = false;
            this.$refs.form.resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      },

      // 上传控件的钩子
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
    },
    components: {
      ElInput,
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
