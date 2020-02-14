<template>
    <div class="login_container">
        <!-- 登录区域 -->
      <div class="login_box">
          <!-- 头像区域 -->
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>
          <!-- 登录表单区域 -->
          <!-- 用ref属性获取登录表单的实例对象 -->
          <el-form :model="loginForm" label-width="0px" :rules="loginFormRules"
          ref="loginFormRef" class="login_form">
              <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username"
                prefix-icon="iconfont icon-user">
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password"
                prefix-icon="iconfont icon-3702mima" type="password">
                </el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          // 必填项，提示消息，失去焦点时触发验证
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          // 必填项，提示消息，失去焦点时触发验证
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   点击重置按钮，重置登录表单
    resetLoginForm () {
      // this是当前的登录组件实例对象
      // this.$refs.loginFormRef是表单实例对象
      // resetFields()函数是element ui 提供的表单重置函数
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // validate()函数是element ui提供的整个表单校验函数
      this.$refs.loginFormRef.validate(async valid => {
        // 如果输入合法结果valid就是true
        // 输入不合法，不发送登录请求，直接return
        if (!valid) return
        // 结果原本是一个Promise对象，用了async和await后获得的是一个具体的响应对象,再解构赋值出data
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 登录成功后后端颁发一个token，将其保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b3b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width:130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    // 弹性盒模型
    display: flex;
    // 横轴上尾部对齐
    justify-content: flex-end;
}
</style>
