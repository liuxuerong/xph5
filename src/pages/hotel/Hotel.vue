<template>
  <div class="xpHotel">
    <common-nav-header :title="title"/>
      <div ref="wrapper" class="wrapper">
        <div>
          <common-banner :bannerData="fiveStarQuality" :showContent="true" v-if="fiveStarQuality" />
          <common-banner :bannerData="fiveStarHotel"  :showContent="false"  v-if="fiveStarHotel" :linkUrl="hotelDetails" />
          <divider>哎呀！底线到了</divider>
        </div>
      </div>
  </div>
</template>
<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import commonBanner from 'common/commonBanner/CommonBanner'
import {
  Divider
} from 'vux'
import BScroll from 'better-scroll'
import {
  hotel
} from 'util/netApi'
import {
  http
} from 'util/request'
export default {
  name: 'Hotel',
  components: {
    CommonNavHeader,
    commonBanner,
    Divider
  },
  data () {
    return {
      title: '酒店用品',
      fiveStarQuality: null,
      fiveStarHotel: null,
      hotelDetails: '/hotelDetails/'
    }
  },
  methods: {
    getHotelData () {
      http(hotel)
        .then(res => {
          this.fiveStarQuality = res.data.body.fiveStarQuality
          this.fiveStarHotel = res.data.body.fiveStarHotel
          this.scrollInit()
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  created () {
    this.getHotelData()
  }
}
</script>

<style lang="stylus" scoped>
.xpHotel
  height 100%
  padding-top 148px
  .wrapper
    height 100%
</style>
