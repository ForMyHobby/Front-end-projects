<template>
  <!--
    这个控件的主要功能：
     显示航班的信息。包括航班的详细信息，如果有中转的话，显示中转路线的信息。
    -->
  <div>
    <div class="top">
      <div class="left logo row-center">
        <img
          src="https://static.pkfare.com/long-term/airline-logo/SU.png"
        >
        <div class="flex-column">
          <div>{{ transformCarrier (item[0].carrier) }}<span>{{ item[0].carrier }} </span></div>
        </div>
      </div>

      <div class="center">
        <div
          class="go"
          align="right"
        >
          <div class="size-big">
            {{ timePart(item[0].depTime) }}
          </div>
          <div
            class="flight-name"
            align="right"
          >
            <span
              class="flightno"
              align="right"
            >{{ item[0].depAirport }}</span>{{ transformAirport (item[0].depAirport) }}
          </div>
        </div>

        <div class="useTime">
          <div class="line">
            <img
              class="index_transfer_-S8_"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAANAgMAAABkwYD/AAAADFBMVEVHcEzz9fne4uvk5+8Wn4soAAAAAXRSTlMAQObYZgAAAD5JREFUCNdjYCARMMEYVatWrQUzGiB8xquhoeEOIJYCRIA5FAgOgFgcDK9WgQBIAMzYhKkCuxkYtmC6Aw8AAGojGDtVTPsbAAAAAElFTkSuQmCC"
              alt="stopover"
            >
          </div>
        </div>

        <div class="back">
          <div class="size-big">
            {{ timePart(item[item.length-1].arrTime) }}
          </div>
          <div class="flight-name">
            <span class="flightno">{{ item[item.length-1].arrAirport }}</span>{{ transformAirport (item[item.length-1].arrAirport) }}
          </div>
        </div>
      </div>

      <div class="right">
        <div>{{ item.length===1? '直飞' : '中转' }}</div>
      </div>
    </div>

    <div class="message">
      <el-collapse
        v-model="activeName"
        accordion
      >
        <el-collapse-item
          title="详细信息"
          name="1"
        >
          <div
            v-for="(items, index) in item"
            :key="items.index"
          >
            <div v-if="item.length!==1">
              <div
                v-if="items!=item[0]"
                class="transfer-message"
              >
              &nbsp;&nbsp;
                <span> <i class="fa fa-circle-o" /> </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>中转 </span>&nbsp;&nbsp; 停留
                {{ calcWaitTime(index) }} 分钟
              </div>
            </div>
            <div
              id="voyage"
              class="top"
            >
              <div class="left little row-center">
                <img src="https://static.pkfare.com/long-term/airline-logo/SU.png">
                <div class="flex-column">
                  <div>{{ transformCarrier (items.carrier) }} <span>{{ items.carrier }}</span> </div>
                </div>
              </div>
              <div class="center">
                <div
                  class="go"
                  align="right"
                >
                  <div
                    class="flight-name"
                    align="right"
                  >
                    <span
                      class="flightno"
                      align="right"
                    >{{ items.depAirport }}</span>{{ transformAirport (items.depAirport) }}
                  </div>
                  <div class="size-small">
                    {{ timeWhole(items.depTime) }} {{ week(items.depTime) }}
                  </div>
                </div>

                <div class="useTime">
                  <div class="line">
                    <img
                      class="index_transfer_3GbT"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAANAQMAAAAjYfovAAAABlBMVEVHcEze4utDrTb1AAAAAXRSTlMAQObYZgAAACJJREFUCNdjYMAFBGAMDhiDBcZgYvgPAX8RIuhqODDMQQAA3yYIM7dnX2wAAAAASUVORK5CYII="
                      alt="direct"
                    >
                  </div>
                </div>

                <div class="back">
                  <div class="flight-name">
                    <span class="flightno">{{ items.arrAirport }}</span>{{ transformAirport (items.arrAirport) }}
                  </div>
                  <div class="size-small">
                    {{ timeWhole(items.arrTime) }} {{ week(items.arrTime) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'TripTop',
  props: {
    item:
    { type: Array,
      default: function () {
        return []
      } }
  },
  data () {
    return {
      activeName: '',
      moment: moment,
      flight: {}
    }
  },
  methods: {
    week (value) {
      let a = moment(value, 'YYYYMMDDHHmmss').format('YYYY/MM/DD hh:mm:ss')
      a = new Date(a).getDay()
      let c
      switch (a) {
        case 1: c = '星期一 '; break
        case 2: c = '星期二 '; break
        case 3: c = '星期三 '; break
        case 4: c = '星期四 '; break
        case 5: c = '星期五 '; break
        case 6: c = '星期六 '; break
        case 7: c = '星期天 '; break
      }
      return c
    },
    timePart (value) {
      return moment(value, 'YYYYMMDDHHmmss').format('hh：mm')
    },
    timeWhole (value) {
      return moment(value, 'YYYYMMDDHHmmss').format('YYYY年MM月DD日HH时mm分')
    },
    calcWaitTime (segmentIdx) {
      if (segmentIdx + 1 === this.item.length + 1) return 0
      const last = this.item[segmentIdx - 1]
      const cur = this.item[segmentIdx]
      const a = moment(last.arrTime, 'YYYYMMDDHHmmss').format('YYYY/MM/DD hh:mm:ss')
      const b = moment(cur.depTime, 'YYYYMMDDHHmmss').format('YYYY/MM/DD hh:mm:ss')
      let c = new Date(a)
      let d = new Date(b)
      const e = parseInt(d - c)
      return (e / 1000) / 60
    },
    transformCarrier (value) {
      let airlineCompany
      switch (value) {
        case 'QR': airlineCompany = '卡塔尔航空'; break
        case 'SU': airlineCompany = '俄罗斯航空'; break
      }
      return airlineCompany
    },
    transformAirport (value) {
      let Airport
      switch (value) {
        case 'PEK': Airport = '首都国际机场'; break
        case 'SVO': Airport = '谢列蔑契娃机场'; break
        case 'CDG': Airport = '戴高乐机场'; break
        case 'DOH': Airport = '哈马德国际机场'; break
      }
      return Airport
    }
  }
}
</script>

<style lang="less" scoped>
#voyage{
  background-color:rgba(224,255,255,0.2)
}
 .message{
              padding:0 20px;
              .center{
                width:600px;
                margin:0 auto;
              }
            }
.top {
            width:100%;
            padding: 1rem;
            display: flex;
            flex-wrap:wrap;
            flex-direction: row;
            .right{
              margin-left:50px;
              margin-top:10px;
            }
            .flight-name{
              margin-right: 50px ;
              position:relative;
            }
            .center{
              display:flex;
              margin: 10px 30px;
              margin-left: 80px;
              .go{
                display:flex;
                align-items: right;
                flex-direction: column;
              }
            }
            .size-big{
              font-size: 1.5em;
              font-weight: bold;
              margin-bottom:8px;
            }
            .date {
                display: flex;
                flex-direction: row;
                font-size: 1em;
                font-weight: bold;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
            }

            .logo {
                display: flex;
                flex-direction: row;

                img {
                    width: 70px;
                    height: 70px;
                    margin-right: 1rem;
                }

            }
            .little{
                  display: flex;
                flex-direction: row;
                margin-left:40px;

                img {
                    width: 50px;
                    height: 50px;
                    margin-right: 1rem;
                }
            }

            .line {
                padding: 0 1rem;
            }

            .flightno {
                right:0;
                color: #215cbb;
                margin-right: .2rem;
            }

            .spend {
                color: #919191;
                padding: 0 1rem;
            }

        }
</style>
