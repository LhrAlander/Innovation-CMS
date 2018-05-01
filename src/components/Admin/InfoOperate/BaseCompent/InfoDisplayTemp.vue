<!--产生 编辑基本用户信息 时所需的不同的input-->
<template>
  <div>
    <el-input v-if="item.type == INPUT" v-model="item.value" :disabled="item.disabled"></el-input>
    <template v-if="item.type == RADIO">
      <el-radio v-for="radioItem in item.radioItems" v-model="item.value" :key='radioItem.label' :label="radioItem.label">
        {{ radioItem.value }}
      </el-radio>
    </template>
    <el-select v-if="item.type == SELECT" v-model="item.value" @change="selectChange(item.value, item.name)">
      <el-option
        v-for="option in item.options"
        :key="option.value"
        :label="option.label"
        :value="option.value">
      </el-option>
    </el-select>
    <el-button v-if="item.type == BUTTON" type="danger" @click="clickBtn(item)">{{ item.buttonText }}</el-button>
    <el-switch
      v-if="item.type == SWITCH"
      v-model="item.value"
      :active-text="item.activeValue"
      :inactive-text="item.inactiveValue">
    </el-switch>

    <el-input
      v-if="item.type == INPUT_AREA"
      type="textarea"
      :rows="3"
      v-model="item.value">
    </el-input>

    <el-date-picker
      v-if="item.type == DATE_PICKER"
      align="right"
      type="date"
      placeholder="选择日期"
      :rows="3"
      v-model="item.value"
      value-format="yyyy-MM-dd">
    </el-date-picker>


    <el-cascader
      v-if="item.type == MULTI_SELECT"
      :options="item.options"
      :show-all-levels = 'false'
      v-model="item.value"
      >
    </el-cascader>

  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      INPUT: 1,
      SELECT: 2,
      RADIO: 3,
      SWITCH: 4,
      BUTTON: 5,
      INPUT_AREA: 6,
      DATE_PICKER: 7,
      MULTI_SELECT: 8,
      value: []
    };
  },
  methods: {
    clickBtn(item) {
      this.$emit("clickBtn");
    },
    handleCascaderChange(value) {
      console.log('handleCascaderChange', value)
    },
    selectChange(value, name) {
      console.log(value, name)
      let payload = {
        name: name, 
        value: value
      }
      this.$emit('selectChange', payload)
    }
  }
};
</script>

<style scoped>
.el-radio {
  font-size: 1.8rem;
}
</style>
