<template>
  <div class="flights">
    <div class="flight-card">
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
      <tripPrice
        :item="item"
        @doPreOrder="doPreOrder"
      />
    </div>
  </div>
</template>

<script>
import tripPrice from './trip_price.vue'
import tripTop from './trip_top.vue'
export default {
  name: 'Ticket',
  components: {
    tripPrice,
    tripTop
  },
  props: {
    item:
    { type: Object,
      default: function () {
        return {}
      } }
  },
  methods: {
    doPreOrder (item) {
      this.$emit('doPreOrder', item)
    }
  }
}
</script>

<style  lang="less" scoped>
 .flights {
     padding: 0 4rem;
     margin-top: 1rem;
     .flight-card {
         display: block;
         background: #fff;
         margin-top: 1rem;
         color: #222;
         font-weight: 500;
         font-size: 12px;
         box-shadow: 0 0 8px rgba(14, 5, 10, .04);
         line-height: 1;
         transition: .2s;
     }
 }
</style>
