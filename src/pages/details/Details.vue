<template>
  <div class="xpDetails">
    <div v-show="goodsStatus!==4">
      <common-nav-header>
      <router-link to="/" class="icon home" ></router-link>
      <span class="icon share"></span>
    </common-nav-header>
    <div class="xpDetailsWrap" ref="xpDetailsWrap">
      <div class="xpDetailsScroll">
        <common-swiper :swiperData="swiperData" v-if="swiperData.length" />
        <details-des :goods="goods" :activityLabel="activityLabel" v-if="goods" />
        <div class="cutOffLine"></div>
        <details-cell :cellInfo="cellInfo[0]" v-if="showCoupon" @click.native="changeCoupponVisible(true)"/>
        <div class="cutOffLine"></div>

        <details-cell :cellInfo="cellInfo[1]" @click.native="changePopupVisible(true), changeFrom(1)" />
        <div class="cutOffLine"></div>
        <details-service/>
        <div class="cutOffLine"></div>
        <router-link :to="'/comment/'+goodsId" class="commentRouter">
          <details-cell :cellInfo="cellInfo[2]" />
        </router-link>
        <details-comment-swiper :goodsComment="goodsComment" v-if="goodsComment"/>
        <div class="seeMore">上拉查看更多详情</div>
        <details-img-text-desc class="isDetailsImgTextShow" ref="isDetailsImgTextShow" :desc="desc" v-if="desc.length" />
      </div>
    </div>
    <div class="goodsStatus" v-if="goodsStatus!=1">商品已经{{goodsStatusText}}</div>
    <details-operate class="detailsOperate" :goodsItems="goodsItems" :goodsStatus="goodsStatus"/>
    <details-pop-up :sku="sku" v-if="sku" :goods="goods" :goodsStatus="goodsStatus"/>
    <details-coupon :couponData = "couponData"></details-coupon>
    </div>
    <div v-show="goodsStatus===4">
      <common-nav-header :title="emptyTitle"/>
     <common-empty  :emptyObj="emptyObj" />
    </div>
  </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
import CommonSwiper from 'common/commonSwiper/CommonSwiper'
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import DetailsDes from './components/DetailsDes'
import DetailsCell from './components/DetailsCell'
import DetailsPopUp from './components/DetailsPopUp'
import DetailsService from './components/DetailsService'
import DetailsOperate from './components/DetailsOperate'
import DetailsImgTextDesc from './components/DetailsImgTextDesc'
import DetailsCommentSwiper from './components/DetailsCommentSwiper'
import DetailsCoupon from './components/DetailsCoupon'

import BScroll from 'better-scroll'
import {
  mapMutations,
  mapState
} from 'vuex'
import {
  comment
} from 'util/const'
import {
  goodsDetail,
  listUseCouponByGoodsId
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
    CommonEmpty,
    CommonNavHeader,
    DetailsDes,
    DetailsCell,
    DetailsPopUp,
    DetailsService,
    DetailsOperate,
    DetailsImgTextDesc,
    DetailsCommentSwiper,
    BScroll,
    DetailsCoupon
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      goodsId: '',
      swiperData: [],
      goods: null,
      activityLabel: [],
      desc: '',
      goodsStatus: 1,
      goodsStatusText: '',
      goodsComment: null,
      emptyTitle: '商品过期不存在',
      emptyObj: {
        emptyImg: '/static/images/commentEmptyGoods.png',
        emptyBold: '商品过期不存在',
        emptyP: '哇噢~商品过期了哦~快去找新商品吧',
        buttonText: '回到首页',
        buttonRouter: '/'
      },
      cellInfo: [
        {
          title: '领券',
          value: '领取优惠券'
        }, {
          title: '规格',
          value: '选择规格数量'
        },
        {
          title: '',
          value: ''
        }
      ],
      sku: null,
      goodsItems: [],
      showCoupon: false,
      coupponVisible: false,
      couponData: []
    }
  },

  computed: {
    ...mapState({
      popupVisible: state => state.details.popupVisible
    })
  },
  watch: {
    $route (to, from) {
      this.scroll.refresh()
      // if (to.name === 'Details') {
      //   this.initDeatils()
      // }
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
    ...mapMutations(['changePopupVisible', 'changeNowPrice', 'changeFrom', 'changeMaxCount', 'changeCoupponVisible']),
    pushKeys (arr) {
      if (arr.length === 1) {
        this.changeMaxCount(arr[0].stock)
      }
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
              notClick: false
            }]
          }

          temKeys.push(temKeysObj)
        }
        if (arr[i].pic === '') {
          arr[i].pic = this.goods.coverImage
        }
        if (arr[i].stock !== 0) {
          sku.data[dataKey] = {
            price: arr[i].price,
            count: arr[i].stock,
            goodsItemsId: arr[i].id,
            name: arr[i].name,
            pic: arr[i].pic
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
    initScroll () {
      if (!this.scroll) {
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
      } else {
        this.scroll.refresh()
      }

      let _this = this
      this.scroll.on('pullingUp', function () {
        if (_this.desc !== '') {
          _this.$refs.isDetailsImgTextShow.$el.style.display = 'block'
          _this.scroll.refresh()
        }
      })
    },
    initDeatils () {
      this.goodsId = this.$route.params.goodsId
      this.changePopupVisible(false)
      // 商品详情
      if (this.goodsId !== '' || this.goodsId !== undefined) {
        http(goodsDetail, [this.goodsId])
          .then(res => {
            console.log(res)
            this.goodsStatus = res.data.body.status
            if (this.goodsStatus === 2) {
              this.goodsStatusText = '下架'
            } else if (this.goodsStatus === 3) {
              this.goodsStatusText = '卖光了'
            } else if (this.goodsStatus === 4) {
              // this.$router.push('/detailsEmpty')
            }
            this.goods = res.data.body.goods
            this.desc = res.data.body.goods.desc
            this.keys = res.data.body.activityLabel
            this.goodsItems = res.data.body.goodsItems
            this.sku = this.pushKeys(res.data.body.goodsItems)
            this.swiperData = res.data.body.goodsPic
            this.goodsComment = res.data.body.goodsComments
            this.changeNowPrice(res.data.body.goods.minPrice)
            storage.setLocalStorage(comment, res.data.body.goodsComments)
            console.log(comment)
            let totals = res.data.body.goodsComments.totals
            if (totals >= 999) {
              totals = '999+'
            }
            this.cellInfo[2].title = `商品评价（ ${totals} ）`
            this.initScroll()
            this.scroll.scrollTo(0, 0)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 领取优惠券
    receiveCellInfo () {
      let params = {
        goodsId: this.$route.params.goodsId
      }
      http(listUseCouponByGoodsId, params).then((response) => {
        if (response.data.code === 0) {
          let data = response.data.body
          if (data.length > 0) {
            this.showCoupon = true
            this.couponData = data
            console.log(this.couponData)
          }
        }
      })
    }
  },
  mounted () {
    this.initDeatils()
    this.receiveCellInfo()
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
.xpDetails>div
    height 100%
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
    background-size 110% 110%
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
.goodsStatus
  height 146px
  line-height  146px
  background #E4B492
  font-size 46px
  color #ffffff
  text-align center
  position fixed
  z-index 1999
  width 100%
  bottom 146px
</style>
