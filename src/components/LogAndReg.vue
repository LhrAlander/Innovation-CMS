<template>
  <div class="log">
    <el-row class="sub-nav">
      <el-col :span="12" class="sub-nav-item left-border-radius" :class="{active: current}" @click.native="current = true">登录</el-col>
      <el-col :span="12" class="sub-nav-item right-border-radius" :class="{active: !current}" @click.native="current = false">注册</el-col>
    </el-row>
    <el-row class="user-input">
      <el-col :span="6" class="lab">用户名：</el-col>
      <el-col :span="17" :offset="1" class="input-cnt">
        <el-input placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row class="user-input">
      <el-col :span="6" class="lab">密码：</el-col>
      <el-col :span="17" :offset="1" class="input-cnt">
        <el-input placeholder="请输入密码"></el-input>
      </el-col>
    </el-row>
    <el-row class="user-input">
      <el-col :span="6" class="lab">验证码：</el-col>
      <el-col :span="8" :offset="1" class="input-cnt">
        <el-input placeholder="输入验证码"></el-input>
      </el-col>
      <el-col :span="8" :offset="1" class="input-cnt check-code">
        <img src="http://jwgl1.hznu.edu.cn/(jhpywh45jnrr2zindz30hy45)/CheckCode.aspx" alt="验证码">
      </el-col>
    </el-row>
    <el-row class="user-input">
      <el-col :span="6" class="lab">身份：</el-col>
      <el-col :span="17" :offset="1" class="input-cnt">
        <el-select v-model="identify" placeholder="请选择您的身份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="meta">
      <el-col :span="10" class="meta-item">
        <el-checkbox v-model="remember">记住用户密码</el-checkbox>
      </el-col>
      <router-link to="/">
        <el-col :span="7" :offset="1" class="meta-item forget">忘记密码?</el-col>
      </router-link>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6" class="btn-wrap">
        <el-button class="login-btn">
          登录
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: true,
      options: [
        {
          value: "教师",
          label: "教师"
        },
        {
          value: "学生",
          label: "学生"
        },
        {
          value: "系统管理员",
          label: "系统管理员"
        },
        {
          value: "企业人员",
          label: "企业人员"
        }
      ],
      identify: "",
      remember: true
    };
  },
  methods: {
    clickLogin() {
      alert("click login");
    }
  }
};
</script>

<style scoped>
div.log {
  /*background-color: #fff;*/
  /*background: #ebecee;*/
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.sub-nav {
  height: 70px;
  border-bottom: 4px solid #5c99c8;
  margin-bottom: 10px;
}

.sub-nav-item {
  cursor: pointer;
  font-size: 1rem;
  line-height: 70px;
  text-align: center;
}

.sub-nav-item.left-border-radius {
  border-radius: 15px 0 0 0;
}

.sub-nav-item.right-border-radius {
  border-radius: 0 15px 0 0;
}

.sub-nav-item.active {
  background-color: #5c99c8;
  color: #fff;
}

.meta,
.user-input {
  padding: 10px 5px 10px 20px;
}

.user-input .lab,
.user-input .input-cnt {
  height: 100%;
  line-height: 40px;
  font-size: 1rem;
}

.check-code img {
  border-radius: 4px;
  height: 30px;
}

.check-code {
  height: 100%;
  display: flex;
  align-items: center;
}

.user-input {
  height: 55px;
}
.meta-item {
  height: 30px;
  line-height: 30px;
}

.forget {
  color: #5c99c8;
  font-size: 1rem;
}

.btn-wrap {
  margin-top: 8px;
  text-align: center;
}
</style>
