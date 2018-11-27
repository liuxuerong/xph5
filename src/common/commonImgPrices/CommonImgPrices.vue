<template>
  <div class="commonImgPrices">
    <router-link :to="'/details/'+pricesData.id">
      <div class="imgContainer" v-if="img">
        <img v-lazy="imageUrl+img"  alt="">
      </div>
      <p class="name">
        {{pricesData.name}}
      </p>
      <p class="price">¥{{pricesData.minPrice}}</p>
      <div class="promotion" v-if="pricesData.activityLabels&&pricesData.activityLabels.length>0">
        <span class="promotionItem" :class="{gray:item.color==2}" v-for="(item,index) in pricesData.activityLabels" :key="index">{{item.labelName}}</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import { config } from 'util/config'
export default {
  name: 'CommonImgPrices',
  props: {
    pricesData: {
      type: Object,
      default () {
        return {
          pricesData: {
            name: '',
            minPrice: '',
            activityLabel: [],
            coverImage: ''
          }
        }
      }
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      img: null
    }
  },
  methods: {
    getImg (img) {
      if (typeof (img) === 'string') {
        this.img = img.split(',')[0]
      } else {
        this.img = img[0].value
      }
    }
  },
  mounted () {
    if (this.pricesData.goodsPics) {
      this.getImg(this.pricesData.goodsPics)
    } else {
      this.getImg(this.pricesData.goodsImage)
    }

    // if (typeof (this.pricesData.goodsPics) === 'string') {
    //   this.img =
    // }
  }

}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .commonImgPrices
    text-align center
    font-size 40px
    width 382px
    font-weight 600
    display inline-block
    .imgContainer
      width 382px
      height 382px
      img
        width 100%
        height 100%
    .name
      height 98px
      line-height 98px
      ellipsis()
      color #333
    .price
      height 50px
      line-height 50px
      ellipsis()
      color #333
.promotion
  font-size 0
  text-align center
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 0px 20px
    border 1px solid #D54B4B
    display inline-block
    height 50px
    line-height 50px
    margin 0 15px
    margin-top 23px
    font-weight normal
  .promotionItem.gray
    background-color  #F5F5F5
    border none
    color #999999
</style>
