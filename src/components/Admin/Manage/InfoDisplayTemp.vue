<template>
  <div>
    <el-input v-if="item.type == INPUT" v-model="item.value"></el-input>
    <template v-if="item.type == RADIO">
      <el-radio v-for="radioItem in item.radioItems" v-model="item.value" :label="radioItem.label">
        {{ radioItem.value }}
      </el-radio>
    </template>
    <el-select v-if="item.type == SELECT" v-model="item.value">
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
      BUTTON: 5
    };
  },
  methods: {
    clickBtn(item) {
      this.$emit("clickBtn");
    }
  }
};
</script>

<style scoped>
.el-radio {
  font-size: 1.8rem;
}
</style>
