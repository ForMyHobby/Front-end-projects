<template>
  <div>
    <el-row style="padding: 10px">
      <el-row style="font-size: 1.1em;">
        <el-col :span="12">
          <i
            class="fa fa-user-circle"
            aria-hidden="true"
          />
          {{ '成人 X ' + adultPriceDetail.count }}
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ adultPriceDetail.total }} {{ adultPriceDetail.currency }}
        </el-col>
      </el-row>
      <el-row style="padding-left: 10px;">
        <el-col :span="12">
          票价/人
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ adultPriceDetail.ticket }} {{ adultPriceDetail.currency }}
        </el-col>
      </el-row>
      <el-row style="padding-left: 10px;">
        <el-col :span="12">
          税费/人
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ adultPriceDetail.tax }} {{ adultPriceDetail.currency }}
        </el-col>
      </el-row>
    </el-row>
    <el-row
      v-if="childPriceDetail.count"
      style="padding: 10px"
    >
      <el-row style="font-size: 1.1em;">
        <el-col :span="12">
          {{ '儿童 X' + childPriceDetail.count }}
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ childPriceDetail.total }} {{ childPriceDetail.currency }}
        </el-col>
      </el-row>

      <el-row style="padding-left: 10px;">
        <el-col :span="12">
          票价/人
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ childPriceDetail.ticket }} {{ childPriceDetail.currency }}
        </el-col>
      </el-row>
      <el-row style="padding-left: 10px;">
        <el-col :span="12">
          税费/人
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          {{ childPriceDetail.tax }} {{ childPriceDetail.currency }}
        </el-col>
      </el-row>
    </el-row>
    <el-row style="background-color: gray; height: 1px; margin:5px" />
    <el-row>
      <el-row style="font-size: 1.1em;">
        <el-col :span="12">
          订单总价
        </el-col>
        <el-col
          :span="12"
          style="text-align: right;"
        >
          <i
            class="fa fa-money"
            aria-hidden="true"
          />
          {{ adultPriceDetail.total + childPriceDetail.total }} {{ childPriceDetail.currency }}
        </el-col>
      </el-row>
      <el-row style="text-align: right; color: blue;">
        <p>
          <span style="font-size: 2em;"> {{ adultPriceDetail.total + childPriceDetail.total }} </span>
          <small> {{ childPriceDetail.currency }} </small>
        </p>
      </el-row>
      <el-row style="text-align: right;">
        <small>
          不含支付手续费
        </small>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'PassengerFee',
  props: {
    query:
    { type: Object,
      default: function () {
        return { }
      } },
    routing:
    { type: Object,
      default: function () {
        return { }
      } }
  },
  computed: {
    adultPriceDetail () {
      const $ = this
      return {
        currency: $.routing.currency,
        total: $.query.adultNumber * ($.routing.adultPrice + $.routing.adultTax),
        count: $.query.adultNumber,
        ticket: $.routing.adultPrice,
        tax: $.routing.adultTax
      }
    },
    childPriceDetail () {
      const $ = this
      return {
        currency: $.routing.currency,
        total: $.query.childNumber * ($.routing.childPrice + $.routing.childTax),
        count: $.query.childNumber,
        ticket: $.routing.childPrice,
        tax: $.routing.childTax
      }
    }
  }
}
</script>
