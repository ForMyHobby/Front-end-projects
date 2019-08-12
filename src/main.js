// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.esm.js'
import ElementUI, { MessageBox } from 'element-ui'
import Vuex from 'vuex'
import store from './store'

import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './less/index.less'
import App from './App'
import router from './router'
Vue.use(Vuex)
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.axios = axios

axios.interceptors.response.use((res) => {
  if (res.data.code === -4) {
    // session 过期
    store.commit('login/CLEAR_LOGIN_STATE', false)
    MessageBox({
      message: '未登录，请先登录',
      title: '错误提示',
      callback: (action) => router.push('/login')
    })
  } else if (res.data.code === 7) {
    // 用户状态未审核通过
    MessageBox({
      message: '账户未审核通过，不能访问此页面',
      title: '错误提示',
      callback: (action) => router.push('/userinfo')
    })
  }
  return res
})

Vue.prototype.errorMsg = function (msg) {
  MessageBox({
    title: '错误提示',
    message: msg,
    type: 'error'
  })
}

Vue.config.productionTip = false
Vue.use(ElementUI)
window.alert = function (msg) {
  return MessageBox(msg)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
