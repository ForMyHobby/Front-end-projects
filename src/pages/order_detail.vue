<template>
  <el-container v-if="a">
    <el-main>
      <div class="statu">
        <span style="color:gray">已取消</span>
      </div>

      <el-row>
        <el-col :span="24">
          <div>
            <div
              style="height:30px; margin:10px 0;"
            >
              <span style="background-color:rgba(112,128,144,0.3) ;padding:4px;margin-left:5px; ">  {{ fromSegments.length===1? '直飞' : '中转' }}</span>&nbsp;&nbsp;&nbsp;
              <span class="place">{{ fromSegments[0].depAirport }}</span><i
                class="fa fa-long-arrow-right"
                aria-hidden="true"
              /><span class="place">{{ fromSegments[fromSegments.length-1].arrAirport }} </span>
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="background-color:white;  padding-bottom:10px;">
        <div class="orderInformation">
          <orderInformation :data="data" />
        </div>
        <div>
          <div v-if="item.fromSegments && item.fromSegments.length >0">
            <tripTop
              :item="item.fromSegments"
            />
          </div>
          <div v-if="item.retSegments && item.retSegments.length >0">
            <tripTop
              :item="item.retSegments"
            />
          </div>
        </div>
        <div class="orderPassengerInfowhole">
          &nbsp;&nbsp;&nbsp;<span style="font-size:1.4em;">乘客信息</span>
          <orderPassengerInfo
            v-for="(passenger,index) of passengers "
            :key="passenger.index"
            :count="index"
            :passenger="passenger"
            class="orderPassengerInfo"
          />
        </div>
      </div>

      <div class="additionalInfomation">
        <ticketChange class="ticketChange" />&nbsp;&nbsp;
        <baggage />
      </div>

      <div>
        <p>联系人信息</p>
        <el-row class="contact">
          <el-col :span="4">
            <div>
              <p>联系人</p>
              <p>{{ contact.name }} </p>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <p>邮箱</p>
              <p>{{ contact.email }} </p>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <p>手机</p>
              <p>{{ contact.mobile }} </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-aside width="300px">
      <passengerFee
        :routing="information.routing.routing"
        :query="information"
      />
    </el-aside>
  </el-container>
</template>

<script>
import { doOrderDetail } from '../common/api'
import orderInformation from '@/components/order_information'
import tripTop from '@/components/trip_top'
import passengerFee from '@/components/passenger_fee'
import baggage from '@/components/baggage'
import ticketChange from '@/components/rule'
import orderPassengerInfo from '@/components/order_passengerInfo'
import moment from 'moment'

export default {
  name: 'OrderDetail',
  components: {
    orderInformation,
    tripTop,
    passengerFee,
    baggage,
    ticketChange,
    orderPassengerInfo

  },
  data () {
    return {
      a: false,
      data: [],
      information: {},
      item: {},
      fromSegments: [],
      passengers: [],
      contact: {}
    }
  },
  async mounted () {
    const ret = await doOrderDetail({ orderId: this.$route.params.id })
    this.information = ret.data.order
    this.passengers = this.information.routing.passengers
    this.contact = this.information.routing.contact
    const o = this.information
    this.data.push({
      orderNo: o.orderId,
      createdAt: moment(o.createdAt).format('YYYY-MM-DD HH:mm'),
      tripType: this.tripType(o.routing.tripType),
      during: '',
      status: o.status,
      amount: this.people_number(o.adultNumber, o.childNumber),
      totalPrice: o.amount,
      contactInformation: o.routing.contact.mobile
    })
    this.item = this.information.routing.routing
    this.fromSegments = this.item.fromSegments
    this.a = true
  },
  methods: {
    tripType (value) {
      let a
      switch (value) {
        case 1: a = '单程'; break
        case 2: a = '往返'; break
        case 5: a = '多程'; break
      }
      return a
    },
    people_number (a, b) {
      if (b > 0) {
        return a + ' 成人 ' + b + ' 儿童'
      } else {
        return a + ' 成人 '
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.el-container{
  background-color:rgba(245,245,245);
}
.el-aside{
  padding:10px;
  margin-top:30px;
  margin-right:40px;
  margin-left:20px;
  // margin-bottom: 50px;
}
.el-main{
  margin-top:30px;
  margin-left:40px;
}
.place{
  font-size:1.5em;
  font-weight: bold;
}
.contact{
  padding-left:10px;
  background-color:rgba(119,136,153,0.2);
}
.additionalInfomation{
  margin-top:20px;
  display:flex;
  padding-left:30px;
}
.ticketChange{
  margin-right:100px;
}
.statu{
  font-size: 1.3em;
  background-color:white ;
  text-align: left ;
  line-height:70px ;
  padding-left:20px;
  height:70px;
}
.passengerInformation{
     margin:18px 10px;
     border:1px dotted gray;
     padding:20px 10px;
}
.orderPassengerInfowhole{
  margin:0 10px;
  margin-top:30px;
}
.orderInformation{
  background-color: black;
}
</style>
