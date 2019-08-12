<template>
  <div>
    <el-button
      v-popover:popover5
      type="primary"
    >
      行李信息
    </el-button>

    <el-popover
      ref="popover5"
      placement="left"
      width="400"
      trigger="click"
    >
      <div>行李总件数：<span> {{ baggage.pc }}</span>  </div>
      <div>行李重量  <span> {{ baggage.weight }}</span>  </div>
      <div>是否所有行李重量  <span> {{ baggage.isAllWeight }}</span>  </div>
      <div>单件行李长度限制  <span> {{ baggage.length }}</span>  </div>
      <div>单件行李宽度限制  <span> {{ baggage.width }}</span>  </div>
      <div>单件行高宽度限制  <span> {{ baggage.height }}</span>  </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'Baggage',
  props: {
    baggage: {
      type: Object,
      default: function () {
        return { }
      }
    }

  },
  mounted () {
    console.log('this is baggage', this.baggage)
  }
}
</script>
