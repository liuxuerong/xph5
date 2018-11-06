<template>
  <div class="xpDetails">
    <common-nav-header>
      <router-link to="/" class="icon home"></router-link>
      <span class="icon share"></span>
    </common-nav-header>
    <div class="xpDetailsWrap" ref="xpDetailsWrap">
      <div class="xpDetailsScroll">
        <common-swiper :swiperData="swiperData" v-if="swiperData!=[]" />
        <details-des :goods="goods" :activityLabel="activityLabel" v-if="goods" />
        <div class="cutOffLine"></div>
        <details-cell :cellInfo="cellInfo[0]" @click.native="changePopupVisible(true), changeFrom(1)" />
        <div class="cutOffLine"></div>
        <details-service/>
        <div class="cutOffLine"></div>
        <router-link :to="'/comment/'+goodsId" class="commentRouter">
          <details-cell :cellInfo="cellInfo[1]" />
        </router-link>
        <details-comment-swiper/>
        <div class="seeMore">上拉查看更多详情</div>
        <details-img-text-desc class="isDetailsImgTextShow" ref="isDetailsImgTextShow" :desc="desc" v-if="desc.length" />
      </div>
    </div>

    <details-operate class="detailsOperate" :goodsItems="goodsItems" />
    <details-pop-up :sku="sku" v-if="sku" :goods="goods" />
  </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
import CommonSwiper from 'common/commonSwiper/CommonSwiper'
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
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
    CommonNavHeader,
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
      },
      {
        title: '10',
        value: ''
      }
      ],
      sku: null,
      goodsItems: []
    }
  },

  computed: {
    ...mapState({
      popupVisible: state => state.details.popupVisible
    })
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Details') {
        this.initDeatils()
      }
    },
    popupVisible: function (curval) {
      if (curval) {
        this.scroll.stop()
      } else {
        this.scroll.enable()
      }
    }
  },
  methods: {
    ...mapMutations(['changePopupVisible', 'changeNowPrice', 'changeFrom']),
    pushKeys (arr) {
      // 处理返回数据
      let sku = {}
      sku.keys = []
      let temKeys = []
      sku.data = {}
      for (let i = 0; i < arr.length; i++) {
        const spec = JSON.parse(arr[i].spec)
        let dataKey = ''
        let temKeysObj = {}
        for (let j = 0; j < spec.length; j++) {
          let xx = i + '' + j

          spec[j].id = xx
          let flag = true

          if (temKeys.length > 1) {
            for (let k = 0; k < temKeys.length; k++) {
              if (temKeys[k].name === spec[j].key) {
                for (let h = 0; h < temKeys[k].value.length; h++) {
                  if (spec[j].value === temKeys[k].value[h].cname) {
                    xx = temKeys[k].value[h].id
                    flag = false
                    break
                  }
                }
              }
            }
          }
          if (dataKey === '') {
            dataKey = xx
          } else {
            dataKey += ';' + xx
          }
          if (!flag) {
            continue
          }
          temKeysObj = {
            name: spec[j].key,
            isActive: true,
            value: [{
              id: xx,
              cname: spec[j].value,
              isActiveC: false,
              notClick: false,
              pic: arr[i].pic
            }]
          }

          temKeys.push(temKeysObj)
        }
        if (arr[i].stock !== 0) {
          sku.data[dataKey] = {
            price: arr[i].price,
            count: arr[i].stock,
            goodsItemsId: arr[i].id
          }
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
      sku.SKUResult = {}
      return sku
    },
    initDeatils () {
      const _this = this
      this.goodsId = this.$route.params.goodsId
      this.scroll = new BScroll(this.$refs.xpDetailsWrap, {
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
      // this.$refs.xpDetails.style.height =
      //     document.documentElement.clientHeight + 'px'
      // 商品详情
      if (this.goodsId !== '' || this.goodsId !== undefined) {
        http(goodsDetail, [this.goodsId])
          .then(res => {
            this.goods = res.data.body.goods
            this.desc = res.data.body.goods.desc
            this.keys = res.data.body.activityLabel
            this.goodsItems = res.data.body.goodsItems
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
  },
  mounted () {
    this.initDeatils()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.xpDetailsScroll
  padding-bottom 146px
  width 100%
.xpDetails
  height 100%
  padding-top 120px
  padding-bottom 146px
  .icon
    width 60px
    height 60px
    position absolute
    top 24px
  .home
    bgImage("/static/icons/home_icon")
    right 194px
  .share
    bgImage("/static/icons/share_icon")
    right 64px
    &::before
      content:''
      position absolute
      height 60px
      width 3px
      background-color #ccc
      left -38px
.xpDetailsWrap
  height 100%
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
