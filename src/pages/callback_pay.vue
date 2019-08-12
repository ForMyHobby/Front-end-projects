<template>
  <el-container>
    <el-main>
      <div class="m-container loading">
        <div>
          支付结果等待页面
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { doPay } from '@/common/api'
import config from '../config'

export default {
  name: 'Pay',
  data () {
    return {
      query: {},
      channel: ''
    }
  },
  computed: {},
  async mounted () {
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
      try {
        const order = {
          cid: config.FP_CID,
          tripType: this.query.tripType,
          sessionId: this.query.sessionId,
          orderNo: this.query.orderNo,
          pnrCode: this.query.pnrCode,
          routing: this.query.routing
        }
        const param = { pay: { amount: 1, channel: this.channel, pay_type: 'QR_CODE', return_url: '/callback_pay' }, order }
        const ret = await doPay(param)
        console.log('ret:', ret)
      } catch (error) {

      }
      load.close()
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
