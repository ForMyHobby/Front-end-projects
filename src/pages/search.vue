<template>
  <el-container>
    <el-header class="search-panel">
      <div class="container">
        <div class="tabs">
          <el-radio-group v-model="radio">
            <el-radio-button
              label="单程"
              @click.native="oneWay"
            >
              单程&nbsp;<i class="fa fa-arrow-right" />
            </el-radio-button>
            <el-radio-button
              label="往返"
              @click.native="roundTrip"
            >
              <i class="fa fa-arrows-h" />&nbsp;往返
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-col :span="4">
          <div>
            <el-autocomplete
              v-model="search.departureCode"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请输入城市名"
            />
          </div>
        </el-col>

        <el-col :span="0.5">
          <el-button
            @click="transform"
          >
            <img
              alt="交换"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS40MzcgNC41OWEuMzU0LjM1NCAwIDAgMS0uMDQtLjAxYy0uMDI3LS4wMDYtLjAzLS4wMDYtLjAzMy0uMDA4bC0uMDI0LS4wMDctLjAyNC0uMDA5Yy0uMDE2LS4wMDUtLjAyLS4wMDgtLjAyNC0uMDFsLS4wMjMtLjAxMS0uMDIzLS4wMTNjLS4wMTEtLjAwOC0uMDE3LS4wMS0uMDIxLS4wMTNhLjEwNC4xMDQgMCAwIDEtLjAyLS4wMTVjLS4wMTItLjAwOC0uMDE2LS4wMTEtLjAxOS0uMDE2LS4wMTItLjAxMS0uMDE1LS4wMTQtLjAxOC0uMDE1YS40MjIuNDIyIDAgMCAxLS4wMzYtLjAzN2wtLjAxNS0uMDE4YS4wMzkuMDM5IDAgMCAwLS4wMS0uMDEybC0uMDE2LS4wMi0uMDEzLS4wMjItLjAxMy0uMDIxLS4wMTEtLjAyMi0uMDEtLjAyMi0uMDA0LS4wMTEtLjAwNC0uMDEyLS4wMDUtLjAxMy0uMDA3LS4wMjQtLjAwNy0uMDI1LS4wMDQtLjAyNC0uMDA0LS4wMjUtLjAwMy0uMDI2YzAtLjAwNCAwLS4wMDgtLjAwMi0uMDEzbC0uMDAxLS4wMTFhLjMxNi4zMTYgMCAwIDEgMC0uMDUybC4wMDEtLjAxMmMwLS4wMDQgMC0uMDA4LjAwMi0uMDEzbC4wMDEtLjAxNS4wMDQtLjAyNi4wMDUtLjAyNS4wMDUtLjAyNGMuMDA1LS4wMTMuMDA2LS4wMi4wMDctLjAyNGwuMDA4LS4wMjMuMDA0LS4wMTEuMDA0LS4wMTIuMDA2LS4wMTMuMDExLS4wMjEuMDEzLS4wMjMuMDEzLS4wMjJhLjEwNi4xMDYgMCAwIDEgLjAxNC0uMDJjLjAwOS0uMDEyLjAxMS0uMDE2LjAxNi0uMDE5YS4zNzQuMzc0IDAgMCAxIC4wMTctLjAxOWwuMDE3LS4wMTggMi41MjQtMi41NmEuNTA2LjUwNiAwIDAgMSAuNzI0IDBjLjIuMjAzLjIuNTMyIDAgLjczNEwyLjc1IDMuNTZoNy43MzljLjI4MyAwIC41MTIuMjMyLjUxMi41MTkgMCAuMjg3LS4yMjkuNTItLjUxMi41MkgxLjUxM2wtLjAzOC0uMDA1Yy0uMDMxLS4wMDMtLjAzNi0uMDA1LS4wMzgtLjAwNXptOS4xMjUgMi44MThsLjA0LjAwOC4wMzIuMDA5LjAyNS4wMDcuMDI0LjAwOS4wMjQuMDEuMDIzLjAxMS4wMjMuMDEzYy4wMS4wMDguMDE3LjAxLjAyLjAxMy4wMTIuMDA4LjAxNy4wMS4wMi4wMTUuMDEyLjAwOS4wMTYuMDExLjAyLjAxNmwuMDE4LjAxNmEuNDIyLjQyMiAwIDAgMSAuMDM1LjAzNmwuMDE2LjAxOGEuMDM5LjAzOSAwIDAgMCAuMDEuMDEyYy4wMDguMDExLjAxMS4wMTYuMDE2LjAybC4wMTIuMDIyLjAxMy4wMjEuMDEyLjAyMi4wMS4wMjJjMCAuMDA0LjAwMi4wMDcuMDA0LjAxMWwuMDA0LjAxMi4wMDQuMDEzLjAwNy4wMjQuMDA4LjAyNS4wMDQuMDI0LjAwNC4wMjUuMDAzLjAyNi4wMDEuMDEzYS4zMTYuMzE2IDAgMCAxIC4wMDEuMDYzdi4wMTJjMCAuMDA0IDAgLjAwOC0uMDAyLjAxM2wtLjAwMi4wMTZjLS4wMDIuMDE1LS4wMDIuMDIxLS4wMDQuMDI2bC0uMDA0LjAyNC0uMDA2LjAyNS0uMDA3LjAyM2EuNjgyLjY4MiAwIDAgMS0uMDA3LjAyM2wtLjAwNC4wMTEtLjAwNS4wMTJjMCAuMDA0LS4wMDQuMDA4LS4wMDUuMDEzbC0uMDEyLjAyMS0uMDEyLjAyMy0uMDEzLjAyMmEuMTA2LjEwNiAwIDAgMS0uMDE0LjAybC0uMDE2LjAyLS4wMTcuMDE4LS4wMTcuMDE5LTIuNTIzIDIuNTYyYS41MDYuNTA2IDAgMCAxLS43MjQgMCAuNTIzLjUyMyAwIDAgMSAwLS43MzRMOS4yNSA4LjQ0SDEuNTEyQS41MTUuNTE1IDAgMCAxIDEgNy45MjFjMC0uMjg3LjIyOS0uNTIuNTEyLS41Mmg4Ljk3NWMuMDMgMCAuMDM0IDAgLjAzNy4wMDJsLjAzOC4wMDV6IiBzdHJva2U9IiMwMDc4RkYiIGZpbGw9IiMwMDc4RkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
            >
          </el-button>
        </el-col>

        <el-col :span="4">
          <div>
            <el-autocomplete
              v-model="search.arriveCode"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请输入城市名"
            />
          </div>
        </el-col>

        <el-col
          :span="4"
        >
          <div>
            <el-date-picker
              v-model="search.departureDate"
              class="date"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </el-col>

        <el-col
          v-if="back"
          :span="4"
        >
          <div>
            <el-date-picker
              v-model="search.returnDate"
              class="date"
              type="date"
              placeholder="返回日期"
            />
          </div>
        </el-col>

        <el-col :span="4">
          <div>
            <el-select
              v-model="peopleNumber"
              placeholder="请选择人数"
            >
              <i class="fa fa-user-o" />
              <el-option :value="'成人 '+search.adultCount+','+'小孩 '+search.childCount">
                <el-row :gutter="20">
                  <el-col :span="3">
                    <div>
                      成人 &nbsp;12岁以上
                    </div>
                  </el-col>
                  <el-col
                    :span="6"
                    :offset="6"
                  >
                    <div>
                      <el-input-number
                        v-model="search.adultCount"
                        :step="1.0"
                        :min="1"
                        :max="9"
                        label="描述文字"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-option>

              <el-option :value="'成人 '+search.adultCount+','+'小孩 '+search.childCount">
                <el-row :gutter="20">
                  <el-col :span="3">
                    <div>
                      小孩  &nbsp; 2-12
                    </div>
                  </el-col>
                  <el-col
                    :span="6"
                    :offset="6"
                  >
                    <div>
                      <el-input-number
                        v-model="search.childCount"
                        :step="1.0"
                        :min="0"
                        :max="9"
                        label="描述文字"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="2">
          <el-button
            el-icon-refresh
            type="success"
            class="btn-search"
            :disabled="isDisabledFn"
            @click="onSubmit"
          >
            搜索
          </el-button>
        </el-col>
      </div>
    </el-header>

    <el-container>
      <el-aside
        class="left-side"
        width="250px"
      >
        <el-menu
          default-active="2"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-plane" />
              &nbsp;筛选
            </template>
            <el-menu-item-group>
              <template slot="title">
                直达/中转
              </template>
              <el-menu-item index="1-1">
                <el-checkbox>直达</el-checkbox>
              </el-menu-item>
              <el-menu-item index="1-2">
                <el-checkbox>中转</el-checkbox>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu" />&nbsp;航空公司
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-2">
                <el-checkbox v-model="checked">
                  荷兰皇家航空
                </el-checkbox>
              </el-menu-item>

              <el-menu-item index="2-3">
                <el-checkbox v-model="checked">
                  瑞士国际航空
                </el-checkbox>
              </el-menu-item>

              <el-menu-item index="2-4">
                <el-checkbox v-model="checked">
                  汉莎航空
                </el-checkbox>
              </el-menu-item>

              <el-menu-item index="2-5">
                <el-checkbox v-model="checked">
                  芬兰航空
                </el-checkbox>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <div class="side-title">
          选择航班 ——
          <span
            v-if="flightCity"
            class="detail"
          >
            {{ search.departureCode }} - {{ search.arriveCode }} {{ moment(search.departureDate, 'YYYYMMDDHHmmss').format('MM月DD日') }} </span>
          <span class="right-tip">所有起飞/到达时间均为当地时间</span>
        </div>
        <el-col :span="24">
          <div class="plane">
            <div>
              <ticket
                v-for="(item, index) in solutions"
                :key="index"
                :item="item"
                :query="query"
                @doPreOrder="doPreOrder(item)"
              />
            </div>
          </div>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  doSearch
} from '../common/api'
import { Base64 } from 'js-base64'
import moment from 'moment'
import ticket from '@/components/ticket'
import config from '@/config'

export default {
  name: 'Search',
  components: {
    ticket
  },
  data () {
    return {
      moment: moment,
      radio: '单程',
      back: false,
      flightCity: false,
      form: {
        reigon: ''
      },
      isDisabledFn: false,
      checked: false,
      search: {
        tripType: 1,
        departureCode: '北京     BJS',
        arriveCode: '巴黎     PAR',
        departureDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        returnDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        adultCount: 1,
        childCount: 0
      },
      query: {},
      solutions: [],
      result: {},
      lastRequestParam: {},
      restaurants: [],
      state1: ''
    }
  },
  computed: {
    peopleNumber: {
      get () {
        return `成人 ${this.search.adultCount},儿童 ${this.search.childCount}`
      },
      set (v) {}
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    transform () {
      let a
      a = this.search.departureCode
      this.search.departureCode = this.search.arriveCode
      this.search.arriveCode = a
    },
    oneWay () {
      this.back = false
      this.search.tripType = 1
      this.search.returnDate = ''
    },
    roundTrip () {
      this.back = true
      this.search.tripType = 2
    },
    async onSubmit () {
      await this.request()
    },
    async request () {
      // var fs = require('fs')
      // var params = {
      //   'id': 5,
      //   'name': '白眉鹰王'
      // }// 在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
      // // 写入json文件选项
      // function writeJson (params) {
      //   // 现将json文件读出来
      //   fs.readFile('../../docs/person.json', function (err, data) {
      //     if (err) {
      //       return console.error(err)
      //     }
      //     var person = data.toString()// 将二进制的数据转换为字符串
      //     person = JSON.parse(person)// 将字符串转换为json对象
      //     person.data.push(params)// 将传来的对象push进数组对象中
      //     person.total = person.data.length// 定义一下总条数，为以后的分页打基础
      //     console.log(person.data)
      //     var str = JSON.stringify(person)// 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      //     fs.writeFile('./mock/person.json', str, function (err) {
      //       if (err) {
      //         console.error(err)
      //       }
      //       console.log('----------新增成功-------------')
      //     })
      //   })
      // }
      // writeJson(params)// 执行一下;

      this.isDisabledFn = true
      let departureDate = moment(this.search.departureDate).format('YYYYMMDD')
      let returnDate = moment(this.search.returnDate).format('YYYYMMDD')

      const load = this.$loading({
        lock: true,
        text: '加载中',
        fullscreen: 'true',
        target: '.plane',
        spinner: 'el-icon-loading',
        background: 'rgb(0, 0, 0, 0.5)'
      })

      const lastRequestParam = {
        'cid': config.FP_CID,
        'tripType': this.search.tripType,
        'fromCity': this.search.departureCode,
        'toCity': this.search.arriveCode,
        'fromDate': departureDate,
        'retDate': returnDate,
        'adultNumber': this.search.adultCount,
        'childNumber': this.search.childCount
      }
      let res = await doSearch(lastRequestParam)

      load.close()
      this.isDisabledFn = false
      if (res.status === 0) {
        this.result = res
        this._formatResult(this.result)
        this.flightCity = true
        this.lastRequestParam = lastRequestParam
        const data = Base64.encode(JSON.stringify(this.lastRequestParam))
        this.$router.replace(this.$route.path + '?data=' + data)
      } else {
        this.errorMsg(`${res.msg}(${res.status})`)
      }
    },
    async doPreOrder (item) {
      const param = Object.assign({}, this.lastRequestParam)
      param.routing = Object.assign({}, item)
      delete param.routing.rules
      delete param.routing.rule
      for (const s of param.routing.fromSegments) {
        delete s.baggage
        delete s.baggages
      }
      const data = Base64.encode(JSON.stringify(param))
      this.$router.push({ path: '/fillinfo', query: { data } })
    },
    _formatResult (r) {
      this.solutions = r.routings
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    loadAll () {
      return [
        { 'value': '东京  TYO' },
        { 'value': '首尔     SEL' },
        { 'value': '雅典     ATH' },
        { 'value': '莫斯科  MOW' },
        { 'value': '米兰    MIK' },
        { 'value': '洛杉矶   LAX' },
        { 'value': '新加坡  SIN' },
        { 'value': '伦敦    LON' },
        { 'value': '慕尼黑  MUC' },
        { 'value': '巴黎     PAR' },
        { 'value': '北京     BJS' }
      ]
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!to.query.data) {
        return
      }
      try {
        const decrypt = JSON.parse(Base64.decode(to.query.data))
        vm.search.adultCount = decrypt.adultNumber
        vm.search.childCount = decrypt.childNumber
        vm.search.departureCode = decrypt.fromCity
        vm.search.arriveCode = decrypt.toCity
        vm.search.departureDate = moment(decrypt.fromDate).format('YYYY-MM-DD')
        vm.search.returnDate = moment(decrypt.retDate).format('YYYY-MM-DD')
        vm.request()
      } catch (error) {
        vm.search.departureCode = 'PEK'
        vm.search.arriveCode = 'TPE'
        vm.search.departureDate = moment().add(7, 'days').format('YYYY-MM-DD')
        vm.search.returnDate = moment().add(7, 'days').format('YYYY-MM-DD')
        vm.search.adultCount = 1
        vm.search.childCount = 0
        vm.search.cabinClass = 1
        vm.search.airLine = ''
        vm.$router.replace(vm.$route.path)
      } finally {
        next()
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.el-menu{
    min-width: 250px;
    max-width: 250px;
}
.el-aside {
    color: #333;
  }

  .el-col {
    border-radius: 4px;
  }
  .lod{
      margin-bottom: 10px;
  }
.side-title
{
    display: absolute;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.search-panel {
    display: flex;
    background-image: linear-gradient(-180deg, #004eb9, #64adff);
    background-color: #3d98ff;
    height: 7rem !important;
    color: #fff;
    flex-direction: column;

    .container {
        width: 980px;
        margin: auto;
        .tabs {
            display: flex;
            flex-direction: row;

            div {
                margin-right: 2rem;
                cursor: pointer;
            }

            margin-bottom: 1rem;
        }
    }
}

.left-side {
    background: #fff;
    padding: 1rem;
}

.side-title {
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    padding-bottom: .5rem;

    .detail {
        font-size: 12px;
        color: #919191;
    }

    .right-tip {
        float: right;
        font-size: 12px;
        color: #919191;
    }
}

.index_switch_29Zg {
    border: none;
    outline: 0;
    cursor: pointer;
    box-sizing: content-box;
    width: 13px;
    height: 12px;
    padding: 6px 6.5px;
    background: no-repeat 50% url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS40MzcgNC41OWEuMzU0LjM1NCAwIDAgMS0uMDQtLjAxYy0uMDI3LS4wMDYtLjAzLS4wMDYtLjAzMy0uMDA4bC0uMDI0LS4wMDctLjAyNC0uMDA5Yy0uMDE2LS4wMDUtLjAyLS4wMDgtLjAyNC0uMDFsLS4wMjMtLjAxMS0uMDIzLS4wMTNjLS4wMTEtLjAwOC0uMDE3LS4wMS0uMDIxLS4wMTNhLjEwNC4xMDQgMCAwIDEtLjAyLS4wMTVjLS4wMTItLjAwOC0uMDE2LS4wMTEtLjAxOS0uMDE2LS4wMTItLjAxMS0uMDE1LS4wMTQtLjAxOC0uMDE1YS40MjIuNDIyIDAgMCAxLS4wMzYtLjAzN2wtLjAxNS0uMDE4YS4wMzkuMDM5IDAgMCAwLS4wMS0uMDEybC0uMDE2LS4wMi0uMDEzLS4wMjItLjAxMy0uMDIxLS4wMTEtLjAyMi0uMDEtLjAyMi0uMDA0LS4wMTEtLjAwNC0uMDEyLS4wMDUtLjAxMy0uMDA3LS4wMjQtLjAwNy0uMDI1LS4wMDQtLjAyNC0uMDA0LS4wMjUtLjAwMy0uMDI2YzAtLjAwNCAwLS4wMDgtLjAwMi0uMDEzbC0uMDAxLS4wMTFhLjMxNi4zMTYgMCAwIDEgMC0uMDUybC4wMDEtLjAxMmMwLS4wMDQgMC0uMDA4LjAwMi0uMDEzbC4wMDEtLjAxNS4wMDQtLjAyNi4wMDUtLjAyNS4wMDUtLjAyNGMuMDA1LS4wMTMuMDA2LS4wMi4wMDctLjAyNGwuMDA4LS4wMjMuMDA0LS4wMTEuMDA0LS4wMTIuMDA2LS4wMTMuMDExLS4wMjEuMDEzLS4wMjMuMDEzLS4wMjJhLjEwNi4xMDYgMCAwIDEgLjAxNC0uMDJjLjAwOS0uMDEyLjAxMS0uMDE2LjAxNi0uMDE5YS4zNzQuMzc0IDAgMCAxIC4wMTctLjAxOWwuMDE3LS4wMTggMi41MjQtMi41NmEuNTA2LjUwNiAwIDAgMSAuNzI0IDBjLjIuMjAzLjIuNTMyIDAgLjczNEwyLjc1IDMuNTZoNy43MzljLjI4MyAwIC41MTIuMjMyLjUxMi41MTkgMCAuMjg3LS4yMjkuNTItLjUxMi41MkgxLjUxM2wtLjAzOC0uMDA1Yy0uMDMxLS4wMDMtLjAzNi0uMDA1LS4wMzgtLjAwNXptOS4xMjUgMi44MThsLjA0LjAwOC4wMzIuMDA5LjAyNS4wMDcuMDI0LjAwOS4wMjQuMDEuMDIzLjAxMS4wMjMuMDEzYy4wMS4wMDguMDE3LjAxLjAyLjAxMy4wMTIuMDA4LjAxNy4wMS4wMi4wMTUuMDEyLjAwOS4wMTYuMDExLjAyLjAxNmwuMDE4LjAxNmEuNDIyLjQyMiAwIDAgMSAuMDM1LjAzNmwuMDE2LjAxOGEuMDM5LjAzOSAwIDAgMCAuMDEuMDEyYy4wMDguMDExLjAxMS4wMTYuMDE2LjAybC4wMTIuMDIyLjAxMy4wMjEuMDEyLjAyMi4wMS4wMjJjMCAuMDA0LjAwMi4wMDcuMDA0LjAxMWwuMDA0LjAxMi4wMDQuMDEzLjAwNy4wMjQuMDA4LjAyNS4wMDQuMDI0LjAwNC4wMjUuMDAzLjAyNi4wMDEuMDEzYS4zMTYuMzE2IDAgMCAxIC4wMDEuMDYzdi4wMTJjMCAuMDA0IDAgLjAwOC0uMDAyLjAxM2wtLjAwMi4wMTZjLS4wMDIuMDE1LS4wMDIuMDIxLS4wMDQuMDI2bC0uMDA0LjAyNC0uMDA2LjAyNS0uMDA3LjAyM2EuNjgyLjY4MiAwIDAgMS0uMDA3LjAyM2wtLjAwNC4wMTEtLjAwNS4wMTJjMCAuMDA0LS4wMDQuMDA4LS4wMDUuMDEzbC0uMDEyLjAyMS0uMDEyLjAyMy0uMDEzLjAyMmEuMTA2LjEwNiAwIDAgMS0uMDE0LjAybC0uMDE2LjAyLS4wMTcuMDE4LS4wMTcuMDE5LTIuNTIzIDIuNTYyYS41MDYuNTA2IDAgMCAxLS43MjQgMCAuNTIzLjUyMyAwIDAgMSAwLS43MzRMOS4yNSA4LjQ0SDEuNTEyQS41MTUuNTE1IDAgMCAxIDEgNy45MjFjMC0uMjg3LjIyOS0uNTIuNTEyLS41Mmg4Ljk3NWMuMDMgMCAuMDM0IDAgLjAzNy4wMDJsLjAzOC4wMDV6IiBzdHJva2U9IiMwMDc4RkYiIGZpbGw9IiMwMDc4RkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
}
</style>
