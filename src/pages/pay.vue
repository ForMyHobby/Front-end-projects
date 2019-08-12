<template>
  <el-container>
    <el-main>
      <div class="m-container loading">
        <div v-if="query">
          订单信息展示区
          <PassengerFee
            :query="query.query"
            :routing="query.routing"
          />
        </div>
        <div class="mg-top10">
          <div>
            请选择支付方式
            <div class="box mg-top10">
              <el-radio-group v-model="channel">
                <el-radio label="ali">
                  支付宝
                </el-radio>
                <el-radio label="wx">
                  微信
                </el-radio>
                <el-radio label="uni">
                  银联
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-html="rawPayHtml" />
          <el-button
            class="btn-submit"
            type="primary"
            @click="onSubmitPay"
          >
            支付
          </el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64'
import { doPay } from '@/common/api'
import config from '../config'
import PassengerFee from '@/components/passenger_fee'

export default {
  name: 'Pay',
  components: {
    PassengerFee
  },
  data () {
    return {
      query: {},
      channel: 'ali',
      qrcode: '',
      rawPayHtml: ''
    }
  },
  computed: {},
  watch: {
    rawPayHtml (n, old) {
      setTimeout(() => {
        document.forms[0].submit()
      }, 1000)
    }
  },
  async mounted () {
    this.query = JSON.parse(Base64.decode(this.$route.query.data))
  },
  methods: {
    async onSubmitPay () {
      const load = this.$loading({
        lock: true,
        text: '加载中',
        fullscreen: 'true',
        target: '.loading',
        spinner: 'el-icon-loading',
        background: 'rgb(0, 0, 0, 0.5)'
      })
      const order = {
        cid: config.FP_CID,
        tripType: this.query.tripType,
        sessionId: this.query.sessionId,
        orderNo: this.query.orderNo,
        pnrCode: this.query.pnrCode,
        routing: this.query.routing
      }

      const adultPrice = this.query.routing.adultPrice ? this.query.routing.adultPrice : 0
      const adultTax = this.query.routing.adultTax ? this.query.routing.adultTax : 0
      const childNumber = this.query.childNumber ? this.query.childNumber : 0
      const childPrice = this.query.routing.childPrice ? this.query.routing.childPrice : 0
      const childTax = this.query.routing.childTax ? this.query.routing.childTax : 0
      let amount = this.query.query.adultNumber * (adultPrice + adultTax)
      if (childNumber > 0) {
        amount += childNumber * (childPrice + childTax)
      }
      const pay = {
        amount,
        channel: this.channel,
        pay_type: 'PAGE',
        return_url: `http://${window.location.host}/#/callback_pay`
      }
      const param = { pay, order }
      const ret = await doPay(param)
      console.log('doPay', ret)
      load.close()
      if (ret.err_code !== 0) {
        this.errorMsg(ret.msg)
      } else if (ret.data.status && ret.data.status !== '0') {
        this.errorMsg(ret.data.msg)
      } else {
        this.rawPayHtml = ret.data.html
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  padding: 0 20px;
  margin-top: 20px;
}

.bold {
  font-weight: bold;
}

.aside {
  margin-left: 20px;
  margin: 20px;
}

.flight-no {
  font-size: 12px;

  .highlight {
    color: #2678f6;
  }
}

.time {
  margin-left: 20px;
  line-height: 24px;

  i {
    line-height: 24px;
  }
}

.detail {
  background: #fbfbfb;
  padding: 10px;

  .highlight {
    color: #2678f6;
  }

  .timedetail {
    margin-top: 20px;
    color: #919191;

    .bold {
      color: #000;
    }

    > * {
      margin-right: 50px;
    }
  }
}

.seats {
  flex-wrap: wrap;
  justify-content: space-between;

  .seat {
    width: 49%;
    border-radius: 0;
    cursor: pointer;
    font-size: 14px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;

    .mark {
      font-size: 12px;
      background: #eee;
      padding: 0 5px;
      line-height: 24px;
      box-sizing: border-box;
    }

    .hilight {
      color: #2678f6;
      font-size: 18px;
    }
  }

  .active {
    border: 2px solid #2678f6;
    box-shadow: none;
  }
}

.passenger {
  .label {
    font-size: 14px;
    color: rgb(145, 145, 145);
  }

  .input-area {
    .label {
      font-size: 12px;
      color: #000;
      margin-bottom: 10px;
    }

    width: 48%;
  }

  .input-line {
    margin-top: 20px;
  }
}

.btn-submit {
  width: 100%;
}
</style>
