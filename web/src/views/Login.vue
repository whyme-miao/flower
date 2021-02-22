<template>
<div class="login-container" style="height: 100vh">
    <div class="login">
      <!-- logo -->
      <div class="logo">
          <img src="../assets/logo.png">
      </div>
      <!-- content -->
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" label-width="80px">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input 
          v-model="loginForm.password"
          type="password"
          prefix-icon="el-icon-lock"
          show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="success" style="background-color:#339999" @click="login">登录</el-button>
          <el-button type="success" style="background-color:#339999" @click="toRegister">无账号？请注册</el-button>
          <el-button type="success" style="background-color:#339999" @click="resetLoginForm" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
    data() {
      return {
          // 注册表单对象
          loginForm: {
            username: '',
            password: '',

            // avatar: ''
          },
          // 表单验证规则对象
          loginFormRules: {

            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur'},
              { min: 1, max: 8, message: '用户名长度在2-8个字符之间', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '密码不能为空', trigger: 'blur'},
              { min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'}
            ]
          }
      }
  },
  methods: {

    async login() {
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid) return false;
        const res =  await this.$http.post('login', this.loginForm)

        console.log(res)
        localStorage.token = res.data.token
        this.$message.success('登录成功')
        // this.$message({
        //     type: 'success',
        //     message: '登录成功'
        // })
        this.$router.push('/')
      })

    },

    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 调到登录界面
    toRegister() {
      this.$router.push('/register');
    }
  }
}


</script>


<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background: url(../assets/background.jpg) no-repeat;
  // opacity: 0.5;
  background-size:100% 100%; 
  .login {
    position: absolute;
    width: 45rem;
    // border: 1px solid black;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    background-color: #fff;
    box-shadow: #ddd 0px 0px 15px 10px;
    border-radius: 10px;
    .logo img {
      margin-top: 20px;
      width: 203px;
      margin-left: 240px;
    }
  }
}


.el-form-item {
  margin-left: 30px;
}

.el-input {
  height: 50px !important;
  line-height: 50px;
  width: 500px;
}
.el-button {
  margin-bottom: 100px;
  margin-left: 60px;
}

</style>