<template>
  <div class="commonImgPrices">
    <router-link :to="'/details/'+pricesData.id">
      <div class="imgContainer">
        <img v-lazy="imageUrl+pricesData.coverImage"  alt="">
      </div>
      <p class="name">
        {{pricesData.name}}
      </p>
      <p class="price">¥{{pricesData.minPrice}}</p>
      <div class="promotion" v-if="pricesData.activityLabel.length>0">
        <span class="promotionItem active">限时特惠</span>
        <span class="promotionItem">满减</span>
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
      imageUrl: config.imageUrl
    }
  },
  mounted () {
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
    padding 22px 20px
    border 1px solid #D54B4B
    display inline-block
    margin 0 15px
    margin-top 23px
  .promotionItem.active
    background-color  #FED9D9
</style>
