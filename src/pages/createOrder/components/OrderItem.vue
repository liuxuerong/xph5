<template>
  <div class="orderItem">
    <router-link :to="'/details/'+pricesData.goodsId">
      <div class="imgContainer">
        <img v-lazy="imageUrl+pricesData.pic" alt="">
      </div>
      <div class="info">
        <div class="left">
          <p class="name">
            {{pricesData.name}}
          </p>
          <div class="promotion" >
            <span class="promotionItem" v-for="(item,index) in pricesData.spec" :key="index">{{item}}</span>
          </div>
          <p class="price">¥{{pricesData.price}}</p>
        </div>
        <div class="num">
          x{{pricesData.num}}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import {
  config
} from 'util/config'
export default {
  name: 'OrderItem',
  props: {
    pricesData: {
      type: Object
      // default () {
      //   return {
      //     pricesData: {
      //       name: '',
      //       minPrice: '',
      //       activityLabel: [],
      //       coverImage: ''
      //     }
      //   }
      // }
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  },
  mounted () {
    console.log(this.pricesData)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.orderItem
  font-size 40px
  width 100%
  a
    display flex
    width 100%
    align-items center
  .imgContainer
    width 286px
    height 286px
    img
      width 100%
      height 100%
  .info
    flex 1
    display flex
    padding-left 50px
    align-items top
    justify-content space-between
  .left
    width 600px
  .name
    flex 1
    height 60px
    line-height 60px
    ellipsis()
    color #262626
  .price
    height 50px
    line-height 50px
    ellipsis()
    font-size 36px
    color #000
  .promotion
    width 100%
    .promotionItem
      font-size 30px
      color #808080
      display inline-block
      margin-right 20px
  .num
    font-size 36px
    color #262626
    height 60px
    line-height 60px
</style>
