<template>
  <div>
    <el-button
      v-popover:popover4
      type="primary"
    >
      退改政策
    </el-button>

    <el-popover
      ref="popover4"
      placement="left"
      width="400"
      trigger="click"
    >
      <div>是否允许退票：<span> {{ rule.hasRefund }}</span>  </div>
      <div>退票规定: <span> {{ rule.Refund }}</span>  </div>
      <div>部分未使用可否退票:  <span> {{ rule.partRefund }}</span>  </div>
      <div>是否允许改期 : <span> {{ rule.hasEndorse }}</span>  </div>
      <div> 改签规定： <span> {{ rule.endorse }}</span>  </div>
      <div>部分改期规则：  <span> {{ rule.partEndorse }}</span>  </div>
      <div>签转规则：  <span> {{ rule.endorsement }}</span>  </div>
      <div>是否提供免费行李额：  <span> {{ rule.hasBaggage }}</span>  </div>
      <div>行李额规定：  <span> {{ rule.baggage }}</span>  </div>
      <div>是否有没有显示的规则：  <span> {{ rule.hasNoShow }}</span>  </div>
      <div>NoShow罚金：  <span> {{ rule.penalty }}</span>  </div>
      <div>Noshow特殊规则:  <span> {{ rule.specialNoShow }}</span>  </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'TicketChange',
  props: {
    rule: {
      type: Object,
      default: function () {
        return { }
      }
    }

  }
}
</script>
