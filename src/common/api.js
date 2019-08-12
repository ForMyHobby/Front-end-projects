import axios from 'axios'
import config from '../config'
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 发送 POST API
 * @param {String} path 相对 config.host 路径
 * @param {Object} data post 数据对象 默认 {}
 * @param {Object} options post API 默认参数
 * options.host   默认值  config.host
 * options.method 默认值  POST
 * options.cid 默认值  config.FP_CID
 */
async function doFlyPigApi (path, data, options = {}) {
  const {
    host = config.host,
    method = 'POST',
    cid = config.FP_CID
  } = options
  data.cid = cid
  const url = host + path
  console.log(`doFlyPigApi, req: url=${url}, method: ${method}, data=`, data)
  let res = {}
  if (path === '/flight/revalidate') {
    const R = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const R = require('../../docs/sample_revalidate_resp.json')
        resolve(R)
      }, 1000)
    })
    res.data = R
  } else if (path === '/flight/search') {
    const R = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let R = null
        if (data.tripType === 1) {
          R = require('../../docs/sample_search_oneway_resp.json')
        } else if (data.tripType === 2) {
          R = require('../../docs/sample_search_retway_resp.json')
        }
        resolve(R)
      }, 1000)
    })
    res.data = R
  } else if (path === '/flight/order') {
    const R = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let R = require('../../docs/sample_order_resp.json')
        let randPNR = () => {
          const a = []
          for (let index = 0; index < 26; index++) {
            let c = 'a'.charCodeAt() + index
            a.push(String.fromCharCode(c))
          }
          for (let index = 0; index < 26; index++) {
            let c = 'A'.charCodeAt() + index
            a.push(String.fromCharCode(c))
          }

          const b = []
          for (let index = 0; index < 6; index++) {
            b.push(a[Math.floor(Math.random() * a.length)])
          }
          return b.join('')
        }
        R.pnrCode = randPNR()
        resolve(R)
      }, 1000)
    })
    res.data = R
  } else if (path === '/order/list') {
    const R = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const R = require('../../docs/sample_order_list.json')
        resolve(R)
      }, 1000)
    })
    res.data = R
  } else {
    res = await axios({
      url,
      method,
      data,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  console.log(`doFlyPigApi, url=${url}, res.data=${res.data}`)
  return res.data
}

// module.exports = {}

async function doLogin (user, pwd) {
  let res = await axios({
    url: config.host + '/access/login',
    method: 'POST',
    data: {
      email: user,
      pwd: pwd
    }
  })
  return res.data
}
async function doRegist (user, pwd) {
  let res = await axios({
    url: config.host + '/access/register',
    method: 'POST',
    data: {
      email: user,
      pwd: pwd
    }
  })
  return res.data
}
async function doPay (data) {
  let res = await axios({
    url: config.host + '/pay/pay',
    method: 'POST',
    data
  })
  return res.data
}
/**
   *
   * @param {Object} data
   * data.page 1based default 1
   * data.size 10, 20, 30, 40, 50 default 10
   */
async function doOrderList (data) {
  // const {
  //   page = 1,
  //   size = 10
  // } = data
  const ret = await doFlyPigApi('/order/list', data)
  // let res = await axios({
  //   url: config.host + '/order/list',
  //   method: 'POST',
  //   data: { page, size }
  // })
  return ret
}
async function doOrderDetail (data) {
  let res = await axios({
    url: config.host + '/order/detail',
    method: 'POST',
    data
  })
  return res.data
}
async function doSearch (data) {
  const ret = await doFlyPigApi('/flight/search', data)
  return ret
}
async function doGetUserInfo () {
  console.log('doGetUserInfo', 20)
  let res = await axios({
    url: config.host + '/user/user_info',
    method: 'POST'
  })
  console.log('doGetUserInfo', 22)
  return res.data
}
/**
   * 价格校验接口
   * @param {Object} data 接口请求参数
   * 参看 docs/飞猪v2_16_3(1).pdf 价格校验接口(verify)
   */
async function doValidateTicket (data) {
  const ret = await doFlyPigApi('/flight/revalidate', data)
  return ret
}

/**
   * 生单接口
   * @param {Object} data 接口请求参数
   * 参看 docs/飞猪v2_16_3(1).pdf 生单接口(order)
   */
async function doOrder (data) {
  let res = await axios({
    url: config.host + '/flight/create_pnr',
    method: 'POST',
    data: { params: data }
  })
  return res.data
  // const ret = await doFlyPigApi('/flight/order', data)
  // return ret
}
export { doLogin, doRegist, doPay, doOrderList, doOrderDetail, doSearch, doGetUserInfo, doValidateTicket, doOrder }
