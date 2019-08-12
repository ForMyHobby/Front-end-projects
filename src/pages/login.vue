<template>
  <el-container>
    <el-header>分销端</el-header>
    <el-main>
      <div class="login">
        <div class="title">
          分销端登录
        </div>
        <div class="input-content">
          <input
            v-model="form.user"
            placeholder="请输入账号"
          >
          <input
            v-model="form.pwd"
            placeholder="请输入密码"
            type="password"
          >
        </div>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          登录
        </el-button>
        <div
          class="reg-link"
          @click="onRegist"
        >
          没有帐号？ 点击注册 >
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { doLogin } from '../common/api'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        user: '',
        pwd: ''
      }
    }
  },
  mounted () {},
  methods: {
    async onSubmit () {
      if (!(this.form.user && this.form.pwd)) {
        return alert('请输入账号密码')
      } else {
        let res = await doLogin(this.form.user, this.form.pwd)
        console.log(res)
        if (res.err_code === 0) {
          const status = res.data.user.status.toUpperCase()
          if (status === 'WAIT' || status === 'FAILED') {
            this.$alert('审核尚未通过', '登录成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/userinfo')
              }
            })
          } else {
            this.$store.commit('login/SET_LOGIN_STATE', true)
            this.$router.push('/')
          }
        } else {
          this.errorMsg(res.msg)
        }
      }
    },
    onRegist () {
      this.$router.push('/regist')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
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
