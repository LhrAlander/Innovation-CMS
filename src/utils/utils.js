//        标签的value格式化器根据 映射的字段类型，value的值，映射表来确定value值对应的label
function valueFormater(type, value, map){
  if (map[type] === undefined) {
    return value;
  }
  for (var item of map[type]) {
    if (item.value === value) {
      return item.label;
    }
  }
}
function resetObject(object) {
  for (var key in object) {
    object[key] = '';
  }
  return object;
}

export {
  valueFormater,
  resetObject
}

