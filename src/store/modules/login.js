// initial state
// shape: [{ id, quantity }]
const state = {
  isLogin: false,
  session: ''
}

const getters = {
  loginState: (state, getters) => {
    if (window.sessionStorage.getItem('LOGIN_STATE') === 'true') {
      return true
    } else {
      return state.isLogin
    }
  }
}

// mutations
const mutations = {
  SET_LOGIN_STATE (state, status) {
    state.isLogin = status
    window.sessionStorage.setItem('LOGIN_STATE', state.isLogin)
    console.log('SET_LOGIN_STATE')
  },

  CLEAR_LOGIN_STATE (state) {
    state.isLogin = false
    state.session = ''
    window.sessionStorage.removeItem('LOGIN_STATE')
    window.sessionStorage.removeItem('LOGIN_SESSION')
    console.log('CLEAR_LOGIN_STATE')
  },

  SET_LOGIN_SESSION (state, status) {
    state.session = status
    window.sessionStorage.setItem('LOGIN_SESSION', state.session)
    console.log('SET_LOGIN_SESSION')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
