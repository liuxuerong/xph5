<template>
  <div class="xpDetails" ref="xpDetails" >
    <div class="xpDetailsScroll">
      <common-swiper :swiperData="swiperData" v-if="swiperData!=[]" />
      <details-des :goods="goods" :activityLabel="activityLabel" v-if="goods" />
      <div class="cutOffLine"></div>
      <details-cell :cellInfo="cellInfo[0]" @click.native="changePopupVisible(true)" />

      <div class="cutOffLine"></div>
      <details-service/>
      <div class="cutOffLine"></div>
      <router-link :to="'/comment/'+goodsId" class="commentRouter"> <details-cell :cellInfo="cellInfo[1]" /></router-link>
      <details-comment-swiper/>
      <div class="seeMore">上拉查看更多详情</div>
      <details-img-text-desc class="isDetailsImgTextShow" ref="isDetailsImgTextShow" :desc="desc" v-if="desc.length"/>
    </div>
    <details-operate class="detailsOperate" />
    <details-pop-up :sku="sku" v-if="sku" :goods="goods" />
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
import DetailsImgTextDesc from './components/DetailsImgTextDesc'
import DetailsCommentSwiper from './components/DetailsCommentSwiper'

import BScroll from 'better-scroll'
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
import {
  storage
} from 'util/storage.js'
export default {
  name: 'Details',
  components: {
    CommonSwiper,
    DetailsDes,
    DetailsCell,
    DetailsPopUp,
    DetailsService,
    DetailsOperate,
    DetailsImgTextDesc,
    DetailsCommentSwiper,
    BScroll
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      goodsId: '',
      swiperData: [],
      goods: null,
      activityLabel: [],
      desc: '',
      cellInfo: [{
        title: '规格',
        value: '选择规格数量'
      }, {
        title: '10',
        value: ''
      }],
      sku: null
    }
  },

  computed: {
    ...mapState({
      popupVisible: state => state.details.popupVisible
    })
  },
  watch: {
    popupVisible: function (curval) {
      if (curval) {
        this.scroll.stop()
      } else {
        this.scroll.enable()
      }
    }
  },
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
        sku.keys.push({
          name: key,
          isActive: true,
          value: result[key]
        })
      }
      return sku
    }
  },
  mounted () {
    const _this = this
    this.goodsId = this.$route.params.goodsId
    this.scroll = new BScroll(this.$refs.xpDetails, {
      scrollY: true,
      click: true,
      bounce: {
        bottom: true
      },
      pullUpLoad: {
        threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
      }
    })
    this.scroll.on('pullingUp', function () {
      _this.$refs.isDetailsImgTextShow.$el.style.display = 'block'
      _this.scroll.refresh()
    })
    this.changePopupVisible(false)
    this.$refs.xpDetails.style.height = document.documentElement.clientHeight + 'px'
    // 商品详情
    http(goodsDetail, [this.goodsId])
      .then(res => {
        console.log(res)
        this.goods = res.data.body.goods
        this.desc = res.data.body.goods.desc
        this.keys = res.data.body.activityLabel
        this.sku = this.pushKeys(res.data.body.goodsItems)
        this.swiperData = res.data.body.goodsPic
        this.changeNowPrice(res.data.body.goods.minPrice)
        storage.setLocalStorage('commemt', res.data.body.goodsComments)
        // this.changeComment(res.data.body.goodsComments)
        let totals = res.data.body.goodsComments.totals
        if (totals >= 999) {
          totals = '999+'
        }
        this.cellInfo[1].title = '商品评价（' + totals + '）'
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus" scoped>
.xpDetailsScroll
  padding-bottom 146px
  width 100%
.xpDetails
  padding-bottom 146px
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
.isDetailsImgTextShow
  display none
.commentRouter
  color #262626
</style>
