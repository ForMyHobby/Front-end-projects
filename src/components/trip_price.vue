<template>
  <!--这个组件的主要功能：
     提供乘客的票价信息，通过购票按钮，进行乘客信息填写页面的跳转。
    -->
  <div class="bottom">
    <div
      v-for="items in item.fromSegments"
      :key="items.index"
      class="left"
    >
      <span class="cabin">{{ items.cabin }}</span>
    </div>
    <div class="center row-center">
      {{ item.fromSegments[0].cabinClass }}
    </div>
    <div class="right buy">
      <div class="price">
        {{ oneAdtPrice }}<span>{{ item.currency }}</span>
      </div>
      <el-button
        size="mini"
        type="success"
        @click="doPreOrder"
      >
        订票
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TripPrice',
  props: {
    item:
    { type: Object,
      default: function () {
        return { message: '单程航线信息' }
      } }

  },
  computed: {
    oneAdtPrice () {
      return this.item.adultPrice + this.item.adultTax
    }
  },
  methods: {
    doPreOrder (item) {
      this.$emit('doPreOrder', item)
    }
  }
}
</script>
<style lang="less" scoped>
.cabin{
  background-color: #D3D3D3;
  padding: 5px;
}
 .bottom {
            background: #f1f1f1;
            display: flex;
            padding: .5rem;
            align-items: center;
            .left{
              margin-left: 20px;
            }
            .center{
              align-items: center;
              flex:1;
            }
            .buy {
              flex:1;
               margin:0 50px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;

                .price {
                    font-size: 20px;
                    margin-right: 1rem;
                    span {
                        font-size: 12px;
                        color: #919191;
                        margin-left: .2rem;
                    }
                }
            }
        }
</style>
