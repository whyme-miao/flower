<template>
  <div class="register-container" style="height: 100vh">
    <div class="register">
      <!-- logo -->
      <div class="logo">
          <img src="../assets/logo.png">
      </div>
      <!-- content -->
      <el-form :model="registerForm" ref="registerFormRef" :rules="registerFormRules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="女"></el-radio>
            <el-radio label="男"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <!-- action表示上传的接口地址 :headers="getAuthHeader()" -->
          <!-- :on-success="res => $set(registerForm, 'avatar', res.url)" -->
          <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          >
            <img v-if="registerForm.avatar" :src="registerForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="background-color:#666699" @click="register">注册</el-button>
          <el-button type="primary" style="background-color:#666699" @click="toLogin">已有账号？请登录</el-button>
          <el-button type="info" style="background-color:#666699" @click="resetRegisterForm" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^1[34578]\d{9}$/
        if (regMobile.test(value)) {
            return cb()
        }
        //返回一个错误提示
        cb(new Error('请输入合法的手机号码'))
      }
      return {
          // 注册表单对象
          registerForm: {
            name: '',
            username: '',
            password: '',
            sex: '',
            phone: '',
            avatar: ''
          },
          // 表单验证规则对象
          registerFormRules: {
            name: [
              { required: true, message: '请填写姓名', trigger: 'blur'},
              { min: 2, max: 5, message: '姓名长度在2-5个字符之间', trigger: 'blur'}
            ],
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur'},
              { min: 1, max: 20, message: '用户名长度在2-8个字符之间', trigger: 'blur'}
            ],
            sex: [
               { required: true, message: '请选择性别', trigger: 'change' }
            ],
            phone: [
              { required: true, message: '请填写手机号码', trigger: 'blur'},
              { validator: checkMobile, message: '号码格式不正确，请重新输入', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '密码不能为空', trigger: 'blur'},
              { min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'}
            ]
          }
      }
  },
  methods: {
    afterUpload(res) {
      // this.registerForm.avatar = res.url
      this.$set(this.registerForm, 'avatar', res.url)
    },
    async register() {
      this.$refs.registerFormRef.validate(async valid => {
        if(!valid) return false;
        const res =  await this.$http.post('register', this.registerForm)
        this.$message.success('注册成功')
        this.$router.push('/')
      })

    },
    // 跳到登录页面
    toLogin() {
      this.$router.push('/login')
    },
    // 重置表单
    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    }
  }
}

</script>
<style lang="scss" scoped>
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.register-container {
  height: 100%;
  width: 100%;
  background: url(../assets/background.jpg) no-repeat;
  // opacity: 0.5;
  background-size:100% 100%; 
  .register {
    position: absolute;
    width: 45rem;
    // border: 1px solid black;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  width: 500px;
}

.el-button {
  margin-left: 60px;
}


</style>