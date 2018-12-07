<template>
  <div class="indexGoodsLabel">
    <h4>口碑爆款</h4>
    <img :src="imageUrl+goodsLabel.appImage" alt="" class="banner">
    <div class="goodsContainer">
      <common-img-prices class="goodsItem" v-for="(item,index) in goodsLabel.goodsDetails" :key="item.id" :pricesData="item" v-if="bestChoiceGoods.length&&index<5"/>
      <div class="moreGoods">
        <router-link to="/hotGoods" v-if="bestChoiceGoods.length">查看<br>更多商品</router-link>
      </div>
      <div class="emptyBox"></div>
    </div>
  </div>
</template>

<script>
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import {
  recommend,
  timeLimit
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config.js'
export default {
  name: 'IndexGoodsLabel',
  components: {
    CommonImgPrices
  },
  props: {
    goodsLabel: Object
  },
  data () {
    return {
      indexRecomondData: {},
      imageUrl: config.imageUrl,
      bestChoiceGoods: [],
      hotelDetails: '/hotelDetails/'
    }
  },

  methods: {
    getRecommendData () {
      http(recommend)
        .then(res => {
          for (let key in res.data.body) {
            this.indexRecomondData[key] = res.data.body[key]
          }
          this.bestChoiceGoods = this.indexRecomondData.bestChoice.articles[0].goodsItems
        })
        .catch(err => {
          console.log(err)
        })
        // this.scrollInit()
    },
    getTimeLimitData () {
      http(timeLimit).then(res => {
        // console.log(res)
      })
    }
  },
  mounted () {
    this.getRecommendData()
    this.getTimeLimitData()
  }

}
</script>

<style lang="stylus" scoped>
.indexGoodsLabel
  padding 0 50px
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    font-weight 600
  .banner
    width 100%
    height 350px
    margin-bottom 84px
.goodsContainer
  display flex
  justify-content space-around
  flex-wrap wrap
  .goodsItem
    margin-bottom 140px
  .moreGoods
    width 382px
    min-height 500px
    a
      display block
      width 252px
      height 252px
      border 12px solid #808080
      font-size 40px
      color #808080
      line-height 56px
      text-align center
      margin 0 auto
      margin-top 157px
      padding-top 60px
.emptyBox
  width 3.395556rem !important
</style>
