<template>
  <el-container
    v-if="a"
    class="loading"
  >
    <el-main>
      <div class="m-container">
        <div class="title">
          {{ flight.departureCity }} -> {{ flight.arrivalCity }}
        </div>

        <div class="box mg-top10 flex-column just-center">
          <div v-if="query.routing.fromSegments && query.routing.fromSegments.length >0">
            <tripTop
              :item="query.routing.fromSegments"
            />
          </div>
          <div v-if="query.routing.retSegments && query.routing.retSegments.length >0">
            <tripTop
              :item="query.routing.retSegments"
            />
          </div>
        </div>

        <div class="title">
          请选择您的舱位
        </div>
        <div class="flex-row mg-top10 seats">
          <div class="box active seat">
            <span class="mark">标准服务</span>
            <div class="money">
              <span class="hilight"> {{ flight.totalPrice }} </span> {{ flight.totalPriceCurrency }}
            </div>baggage
          </div>
        </div>

        <div
          class="title"
          style="position: relative;"
        >
          <h2>乘客信息</h2> <div
            style="right: 0;bottom: 0;position: absolute;  display:flex"
          >
            <baggage :baggage="baggage" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <ticketChange :rule="rule" />
          </div>
        </div>

        <PassangerInfoCard
          v-for="(item, index) in query.adultNumber"
          :key="index+'p-adult'"
          :label="index + 1 + '.成人'"
          :passenger="passengers[index]"
        />
        <!-- 这里会给所有的 key值后面都加上 小写英文字母，是防止key值相同，而引发错误。 -->
        <PassangerInfoCard
          v-for="(item, index) in query.childNumber"
          :key="index+'p-child'"
          :label="index + 1 + '.儿童'"
          :passenger="passengers[index+query.adultNumber]"
        />
        <div class="title">
          联系信息
        </div>

        <ContactInformation
          :contact="contact"
        />
        <div class="mg-top10">
          <el-button
            class="btn-submit"
            type="primary"
            @click="onSubmitOrder"
          >
            提交订单
          </el-button>
        </div>
      </div>
    </el-main>
    <el-aside
      class="aside box "
      width="400px"
      style="display: block;"
    >
      <PassengerFee
        :rule="rule"
        :routing="routing"
        :query="query"
      />
      <el-row class="additionalInformation">
        <span>注意事项</span>
        <p>
          PKFARE将在订单成功支付后120分钟内完成出票， 若由于航空公司座位变化等原因影响未能在120分钟内完成出票，将在成功支付后60分钟内通知您并无条件退款。请准确填写乘客信息和证件信息，并确保最后一个航段起飞日期比证件有效期至少早6个月。如需预订婴儿乘客机票，请联系客服。订单支付可能需要收取支付手续费，具体费用根据选择的支付方式会有差异。请务必取消除了PKFARE以外所有渠道的相同旅客相同行程的预订，因部分航空公司会根据重复预订取消所有座位，PKFARE不承担该风险。
        </p>
      </el-row>
    </el-aside>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64'
import { doValidateTicket } from '../common/api'
import moment from 'moment'
import config from '@/config'
import PassangerInfoCard from '@/components/passanger_info_card'
import tripTop from '@/components/trip_top'
import ContactInformation from '@/components/contact_information'
import PassengerFee from '@/components/passenger_fee'
import baggage from '@/components/baggage'
import ticketChange from '@/components/rule'

export default {
  name: 'FillInfo',
  components: {
    tripTop,
    PassangerInfoCard,
    ContactInformation,
    PassengerFee,
    baggage,
    ticketChange
  },
  data () {
    return {
      a: false,
      baggage: {},
      contact: {
        name: '',
        mobile: '',
        email: ''
      },
      passengers: [],
      gridData: [],
      flight: {
        departureCity: '',
        departureCityCode: '',
        departureDate: '',
        departureTime: '',
        departureDayOfWeek: '',
        departureAirPort: '',

        arrivalCity: '',
        arrivalCityCode: '',
        arrivalDate: '',
        arrivalTime: '',
        arrivalDayOfWeek: '',
        arrivalAirPort: '',
        during: '',
        totalPrice: '',
        totalPriceCurrency: '',

        segments: [
        ]
      },
      query: {},
      routing: {},
      rule: {}
    }
  },
  computed: {
  },
  async mounted () {
    const load = this.$loading({
      lock: true,
      text: '加载中',
      fullscreen: 'true',
      target: '.loading',
      spinner: 'el-icon-loading',
      background: 'rgb(0, 0, 0, 0.5)'
    })
    this.query = JSON.parse(Base64.decode(this.$route.query.data))
    console.log('this.query', this.query)
    if (this.passengers.length === 0) {
      for (let index = 0; index < this.query.adultNumber; index++) {
        this.passengers.push({ ageType: 0 })
      }
      for (let index = 0; index < this.query.childNumber; index++) {
        this.passengers.push({ ageType: 1 })
      }
    }
    const revalidateResp = await doValidateTicket(this.query)

    load.close()
    const fromSegments = this.query.routing.fromSegments
    for (const s of fromSegments) {
      const depTime = moment(s.depTime, 'YYYYMMDDHHmm')
      const arrTime = moment(s.arrTime, 'YYYYMMDDHHmm')
      this.flight.segments.push({
        airlineCode: s.carrier,
        airlineCodeName: '中文',
        flightNo: s.flightNumber,
        cabinName: s.cabin,
        departureAirPort: s.depAirport,
        departureTerminor: s.departureTerminal,
        departureDate: depTime.format('YYYY-MM-DD'),
        departureTime: depTime.format('HH:mm'),
        arrivalAirPort: s.arrAirport,
        arrivalTerminor: s.arrivingTerminal,
        arrivalDate: arrTime.format('YYYY-MM-DD'),
        arrivalTime: arrTime.format('HH:mm')
      })
    }

    const startSegment = this.flight.segments[0]
    const lastSegment = this.flight.segments[this.flight.segments.length - 1]
    this.flight.departureCity = startSegment.departureAirPort
    this.flight.departureCityCode = startSegment.departureAirPort
    this.flight.departureDate = startSegment.departureDate
    this.flight.departureTime = startSegment.departureTime
    this.flight.departureDayOfWeek = '1'
    this.flight.departureAirPort = startSegment.departureAirPort

    this.flight.arrivalCity = lastSegment.arrivalAirPort
    this.flight.arrivalCityCode = lastSegment.arrivalAirPort
    this.flight.arrivalDate = lastSegment.arrivalDate
    this.flight.arrivalTime = lastSegment.arrivalTime
    this.flight.arrivalAirPort = lastSegment.arrivalAirPort

    const routing = this.routing = revalidateResp.routing
    this.baggage = this.routing.fromSegments[0].baggage
    console.log('this.baggage', this.baggage)
    this.rule = revalidateResp.rule

    const searchAdultPrice = (this.query.routing.adultPrice + this.query.routing.adultTax) * this.query.adultNumber
    const searchChildPrice = (this.query.routing.childPrice + this.query.routing.childTax) * this.query.childNumber

    const revalidateAdultPrice = (routing.adultPrice + routing.adultTax) * this.query.adultNumber
    const revalidateChildPrice = (routing.childPrice + routing.childTax) * this.query.childNumber

    this.flight.totalPrice = revalidateAdultPrice + revalidateChildPrice
    this.flight.totalPriceCurrency = routing.currency

    if (revalidateAdultPrice + revalidateChildPrice - searchAdultPrice - searchChildPrice > config.priceDeltaRange) {
      const text = `价格相差巨大，请重新搜索
      原价: ${searchAdultPrice + searchChildPrice}
      现价: ${revalidateAdultPrice + revalidateChildPrice}`
      this.$alert(text, '价格变动通知', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.back()
        }
      }
      )
    }
    this.a = true
  },
  methods: {
    openRefundInfo () {

    },
    openBaggageInfo () {

    },
    async onSubmitOrder () {
      const param = {
        tripType: this.query.tripType,
        routing: {
          data: this.query.routing.data,
          fromSegments: this.query.routing.fromSegments,
          retSegments: this.query.routing.retSegments
        },
        passengers: [],
        contact: {
          name: this.contact.name,
          address: '',
          postcode: '',
          email: this.contact.email,
          mobile: this.contact.mobile
        }
      }
      var m = 1
      for (const p of this.passengers) {
        const o = Object.assign({}, p, { name: `${p.familyName}/${p.givenName}` })
        o.birthday = moment(o.birthday).format('YYYYMMDD')
        o.cardExpired = moment(o.cardExpired).format('YYYYMMDD')
        param.passengers.push(o)
      }
      for (let b of param.passengers) {
        if (!b.familyName || !b.givenName || !b.gender || !b.birthday || !b.nationality || !b.cardType || !b.cardNum || !b.cardExpired || !param.contact.name || !param.contact.email || !param.contact.mobile) {
          m = 0
        }
      }
      if (m === 0) {
        alert('请完善所有的信息')
        return false
      }
      const load = this.$loading({
        lock: true,
        text: '订票中，请稍后 ... ',
        fullscreen: 'true',
        target: '.loading',
        spinner: 'el-icon-loading',
        background: 'rgb(0, 0, 0, 0.5)'
      })
      console.log('param', param)
      load.close()
      const text = '订票成功，请30分钟内付款'
      this.$alert(text, '订票成功', {
        confirmButtonText: '确定',
        callback: action => {
          let o = {}
          o.routing = this.routing
          o.query = this.query
          const data = Base64.encode(JSON.stringify(o))
          this.$router.push({ path: '/order', query: { data } })
          this.$router.push({ path: '/pay', query: { data } })
        }
      }
      )
    },
    getDoOrderErrorText (ret) {
      switch (ret.status) {
        case 1: return '舱位已售完'
        case 2: return '舱位数不足'
        case 3: return '旅客重复在多个平台系统使用同样客户信息预订相同的航班舱位信息,导致订位失败'
        case 4: return '价格变化, 请重新搜索'
        case 999: return '其他失败原因:' + ret.msg
        default:
          return `未知失败原因:${ret.msg}(${ret.status})`
      }
    }
  }
}

</script>

<style lang="less" scoped>
.additionalInformation{
  background-color:rgba(119,136,153,0.2);
  font-size:0.75em;
  padding:30px 10px 30px 10px;
  margin-top:60px;
}
.title {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding: 0 20px;
    margin-top: 20px;
}

.aside {
    margin-left: 20px;
    margin: 20px;
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
.btn-submit {
    width: 100%;
}
</style>
