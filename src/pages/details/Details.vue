<template>
  <div class="xpDetails" ref="xpDetails" :class="{noScroll:popupVisible}">
    <common-swiper :swiperData="swiperData" v-if="swiperData!=[]" />
    <details-des :goods="goods" :activityLabel="activityLabel" v-if="goods" />
    <div class="cutOffLine"></div>
    <details-cell :cellInfo="cellInfo[0]" @click.native="changePopupVisible(true)" />
    <details-pop-up
      :sku="sku"
      v-if="sku"
      :goods="goods"
    />
    <div class="cutOffLine"></div>
    <details-service/>
    <div class="cutOffLine"></div>
    <details-cell :cellInfo="cellInfo[1]" />
    <div class="seeMore">上拉查看更多详情</div>
    <details-operate class="detailsOperate" />
  </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
import CommonSwiper from 'common/commonSwiper/CommonSwiper'
import DetailsDes from './components/DetailsDes'
import DetailsCell from './components/DetailsCell'
import DetailsPopUp from './components/DetailsPopUp'
import DetailsService from './components/DetailsService'
import DetailsOperate from './components/DetailsOperate'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  mapMutations,
  mapState
} from 'vuex'
import {
  goodsDetail
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config.js'
export default {
  name: 'Details',
  components: {
    CommonSwiper,
    DetailsDes,
    DetailsCell,
    DetailsPopUp,
    DetailsService,
    DetailsOperate
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperData: [],
      goods: null,
      activityLabel: [],
      cellInfo: [{
        title: '规格',
        value: '选择规格数量'
      }, {
        title: '商品评价(10)',
        value: ''
      }],
      sku: null
      // swiperOption: {
      //   direction: 'vertical',
      //   slidesPerView: 1,
      //   mousewheel: true,
      //   autoHeight: true,
      //   setWrapperSize: true
      //   // height: window.innerHeight // 高度设置，占满设备高度
      // }
    }
  },
  computed: mapState({
    popupVisible: state => state.details.popupVisible
  }),
  methods: {
    ...mapMutations(['changePopupVisible', 'changeNowPrice']),
    pushKeys (arr) { // 处理返回数据
      let sku = {}
      sku.keys = []
      let temKeys = []
      sku.data = {}
      for (let i = 0; i < arr.length; i++) {
        const spec = JSON.parse(arr[i].spec)
        let dataKey = ''
        let temKeysObj = {}
        for (let j = 0; j < spec.length; j++) {
          if (dataKey === '') {
            dataKey = spec[j].value
          } else {
            dataKey += ';' + spec[j].value
          }
          temKeysObj = {
            name: spec[j].key,
            isActive: true,
            value: [{
              id: spec[j].value,
              cname: spec[j].value,
              isActiveC: false,
              notClick: false
            }]
          }
          temKeys.push(temKeysObj)
        }
        sku.data[dataKey] = {
          price: arr[i].price,
          count: arr[i].stock
        }
      }
      let result = {}
      for (let i = 0; i < temKeys.length; i++) {
        if (result[temKeys[i].name]) {
          result[temKeys[i].name].push(temKeys[i].value[0])
        } else {
          result[temKeys[i].name] = temKeys[i].value
        }
      }
      for (let key in result) {
        sku.keys.push({name: key, isActive: true, value: result[key]})
      }
      return sku
    }
  },
  mounted () {
    this.changePopupVisible(false)
    this.$refs.xpDetails.style.height = document.documentElement.clientHeight + 'px'
    // 商品详情
    http(goodsDetail, [this.$route.params.goodsId])
      .then(res => {
        this.goods = res.data.body.goods
        this.keys = res.data.body.activityLabel
        this.sku = this.pushKeys(res.data.body.goodsItems)
        this.swiperData = res.data.body.goodsPic
        this.changeNowPrice(res.data.body.goods.minPrice)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="stylus">
.swiper-slide
  height auto !important
</style>

<style lang="stylus" scoped>
.xpDetails
  padding-bottom 146px
  overflow-y scroll
.xpDetails.noScroll
  overflow-y hidden
.seeMore
  height 198px
  line-height 198px
  color #CCCCCC
  font-size 36px
  text-align center
  background-color #F5F5F5
.detailsOperate
  width 100%
  position fixed
  bottom 0
  background-color #fff
  z-index 1998
</style>
