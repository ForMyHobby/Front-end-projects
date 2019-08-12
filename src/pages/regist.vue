<template>
  <el-container>
    <el-header>分销端-注册</el-header>
    <el-main>
      <div class="login">
        <div class="title">
          分销端注册
        </div>
        <div class="input-content">
          <input
            v-model="form.user"
            placeholder="请输入邮箱"
          >
          <input
            v-model="form.pwd"
            placeholder="请输入密码"
            type="password"
          >
          <input
            v-model="form.confirmpwd"
            placeholder="请再次输入密码"
            type="password"
          >
        </div>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          确认注册
        </el-button>
        <div
          class="reg-link"
          @click="onToLogin"
        >
          已有账号， 点击登录 >
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  doRegist
} from '../common/api'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        user: '',
        pwd: '',
        confirmpwd: ''
      }
    }
  },
  mounted () {},
  methods: {
    async onSubmit () {
      if (!(this.form.user && this.form.pwd && this.form.confirmpwd)) {
        return alert('请输入完整的注册信息')
      } else {
        if (this.form.pwd !== this.form.confirmpwd) {
          return alert('两次密码不一致')
        }
        let res = await doRegist(this.form.user, this.form.pwd)
        if (res.err_code === 0) {
          this.$message({
            message: '注册成功！2秒后返回登录页',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.$message.error('错误:' + res.msg)
        }
      }
    },
    onToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
    background: #222329;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.el-input {
    line-height: normal !important;
    border: none;
}

.reg-link {
    color: #fff;
    font-size: 14px;
    text-align: right;
    cursor: pointer;
}

.input-content {
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}

.input-content input {
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 24px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
}

.login {
    width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
}

.el-header {
    color: #fff;
    line-height: 60px;
    border-bottom: 1px solid #fff;
}

.el-main {
    color: #fff;
    line-height: 60px;
}

.login .title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 24px;
}
</style>
