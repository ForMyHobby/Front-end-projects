<template>
  <el-container>
    <el-aside width="200px">
      <el-menu class="order">
        <span>订单中心</span>
        <hr>
        <el-submenu index="1">
          <template slot="title">
            &nbsp;机票订单
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="1-1"
            >
              全部订单
            </el-menu-item>
            <el-menu-item
              index="1-2"
            >
              待支付订单
            </el-menu-item>
            <el-menu-item
              index="1-3"
            >
              待审核订单
            </el-menu-item>
            <el-menu-item
              index="1-4"
            >
              处理中订单
            </el-menu-item>
            <el-menu-item
              index="1-5"
            >
              待确定订单
            </el-menu-item>
            <el-menu-item
              index="1-6"
            >
              退款订单
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-main>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.orderNumber"
                placeholder="订单号"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.orderStatus"
                placeholder="订单状态"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.ticketNuber"
                placeholder="票号"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.PNR"
                placeholder="PNR"
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.reservationPerson"
                placeholder="预定人"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.orign"
                placeholder="始发地"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.destination"
                placeholder="目的地"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.largeTicketCode"
                placeholder="航司大编"
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.airlineCompany"
                placeholder="航司"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-input
                v-model="screen.name"
                placeholder="乘客姓/名"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-date-picker
                v-model="screen.timeFrame"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-col>
        </el-row>
        <div>
          <el-button type="primary">
            重置
          </el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="success">
            查询
          </el-button>
        </div>
      </div>
      <hr>
      <div>
        <orderInformation :data="data" />
      </div>
      <div class="page">
        <div
          v-if="data.length!==0"
        >
          <div class="block">
            <el-pagination
              :page-sizes="[5, 10, 15, 20, 50]"
              :page-size="pageSize"
              :current-page="currentPage"
              layout="sizes, prev, pager, next"
              :total="information.data.total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { doOrderList } from '@/common/api'
import orderInformation from '@/components/order_information'
import moment from 'moment'

export default {
  name: 'Order',
  components: {
    orderInformation
  },
  data () {
    return {
      data: [],
      currentPage: 1,
      pageSize: 10,
      information: {},
      screen: {
        orderNumber: '',
        orderStatus: '',
        timeFrame: '',
        ticketNuber: '',
        PNR: '',
        reservationPerson: '',
        orign: '',
        destination: '',
        largeTicketCode: '',
        airlineCompany: '',
        name: ''
      }
    }
  },
  computed: {
    total_page () {
      let a = this.information.data.total_page
      a = parseInt(a / 1 + 1)
      return a
    }
  },
  async mounted () {
    await this.request()
  },
  methods: {
    people_number (a, b) {
      if (b > 0) {
        return a + ' 成人 ' + b + ' 儿童'
      } else {
        return a + ' 成人 '
      }
    },
    tripType (value) {
      let a
      switch (value) {
        case 1: a = '单程'; break
        case 2: a = '往返'; break
        case 5: a = '多程'; break
      }
      return a
    },
    async request () {
      let param = {
        page: this.currentPage,
        size: this.pageSize
      }
      this.information = await doOrderList(param)
      this.data = []
      for (const o of this.information.data.orders) {
        this.data.push({
          orderNo: o.orderId,
          createdAt: moment(o.createdAt).format('YYYY-MM-DD HH:mm'),
          tripType: this.tripType(o.tripType),
          during: '',
          status: o.status,
          amount: this.people_number(o.adultNumber, o.childNumber),
          totalPrice: o.amount,
          contactInformation: `${o.contactName} ${o.contactMobile}`
        })
      }
      this.currentPage = this.information.data.page
      this.pageSize = this.information.data.size
    },
    async handleCurrentChange (val) {
      this.currentPage = val
      await this.request()
    },
    async handleSizeChange (val) {
      this.pageSize = val
      await this.request()
    },
    countTime (time) {
      let condition = false
      let a = moment(time, 'YYYYMMDDHHmmss').format('YYYY/MM/DD hh:mm:ss')
      let past = new Date(a)
      let now = new Date()
      let e = parseInt(now - past)
      if ((e / 1000) / 60 <= 30) {
        condition = true
      }
      return condition
    },
    pay () {
      let data = this.$route.query.data
      this.$router.push({ path: '/pay', query: { data } })
    }
  }
}
</script>
<style scoped>
.el-submenu{
  background-color: rgba(119,136,153,0.3);
}
.order{
  min-width:200px;
  max-width:200px;
  height:100%;
}
.left-side {
    background: #fff;
    padding: 1rem;
}
.page{
  display:flex;
  float:right;
}
.page-pages{
  background-color:rgba(70,130,180,0.8);
  margin-right:10px;
  padding:5px;

}
.page-number{
  background-color:white;
  padding: 5px 10px;
}
.number{
  width:50px;
  flex:1
}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 80px;
    min-width:200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
