<template>
  <el-table
    :data="data"
    style="width: 100%"
  >
    <el-table-column
      prop="orderNo"
      label="订单号"
      width="180"
    >
      <template slot-scope="scope">
        <router-link
          target="_blank"
          :to="'/order/detail/'+scope.row.orderNo"
        >
          {{ scope.row.orderNo }}
        </router-link>
      </template>
    </el-table-column>

    <el-table-column
      prop="createdAt"
      label="创建时间"
      width="180"
    />
    <el-table-column
      prop="status"
      label="状态"
    />
    <el-table-column
      prop="tripType"
      label="行程类型"
    />
    <el-table-column
      prop="during"
      label="行程时间"
    >
      <i class="el-icon-time" />
    </el-table-column>
    <el-table-column
      prop="amount"
      label="乘客人数"
    />
    <el-table-column
      prop="totalPrice"
      label="价格"
    />
    <el-table-column
      prop="contactInformation"
      label="联系方式"
    />
    <el-table-column
      prop="status"
      label="支付"
    >
      <template slot-scope="scope">
        <el-button
          :disabled="!(scope.row.status=='PNR' && countTime(scope.row.createdAt))"
          @click="pay"
        >
          支付
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import moment from 'moment'
export default {
  name: 'OrderInformation',
  props: {
    data:
    { type: Array,
      default: function () {
        return []
      } }
  },
  methods: {
    countTime (time) {
      let condition = false
      const a = moment(time, 'YYYYMMDDHHmmss').format('YYYY/MM/DD hh:mm:ss')
      let past = new Date(a)
      const now = new Date()
      const e = parseInt(now - past)
      if ((e / 1000) / 60 <= 30) {
        condition = true
      }
      return condition
    },
    pay () {
      const data = this.$route.query.data
      this.$router.push({ path: '/pay', query: { data } })
    }
  }
}
</script>
